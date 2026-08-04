import "server-only";
import { randomBytes } from "node:crypto";
import { sql } from "@/lib/db";

/**
 * Reservation store, backed by Postgres (Neon). Reservations are entered by
 * the owner through the admin panel (see app/admin) and looked up here for
 * the stay-only guest portal. Nothing here is a permanent guest account:
 * access is gated to the stay's access window (see `isWithinAccessWindow`).
 */

export type AddOn = {
  id: string;
  label: string;
  price: number;
  status: "confirmed" | "requested";
};

export type Reservation = {
  id: string;
  bookingRef: string;
  guestName: string;
  email: string;
  /** Last 4 digits of the phone on file — used for the booking-ref fallback. */
  phoneLast4: string;
  /** Opaque magic-link secret. Server-issued, never guessable. */
  accessToken: string;
  status: "confirmed";
  packageName: string;
  guests: { adults: number; children: number };
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  checkInTime: string;
  checkOutTime: string;
  nightlyRate: number;
  amountPaid: number;
  addOns: AddOn[];
  specialRequests?: string;
  hostName: string;
  hostPhone: string;
};

type ReservationRow = {
  id: string;
  booking_ref: string;
  guest_name: string;
  email: string;
  phone_last4: string;
  access_token: string;
  status: string;
  package_name: string;
  guests_adults: number;
  guests_children: number;
  check_in: string;
  check_out: string;
  check_in_time: string;
  check_out_time: string;
  nightly_rate: number;
  amount_paid: number;
  add_ons: AddOn[];
  special_requests: string | null;
  host_name: string;
  host_phone: string;
};

function rowToReservation(row: ReservationRow): Reservation {
  return {
    id: row.id,
    bookingRef: row.booking_ref,
    guestName: row.guest_name,
    email: row.email,
    phoneLast4: row.phone_last4,
    accessToken: row.access_token,
    status: "confirmed",
    packageName: row.package_name,
    guests: { adults: row.guests_adults, children: row.guests_children },
    checkIn: row.check_in,
    checkOut: row.check_out,
    checkInTime: row.check_in_time,
    checkOutTime: row.check_out_time,
    nightlyRate: row.nightly_rate,
    amountPaid: row.amount_paid,
    addOns: row.add_ons ?? [],
    specialRequests: row.special_requests ?? undefined,
    hostName: row.host_name,
    hostPhone: row.host_phone,
  };
}

const GRACE_HOURS_AFTER_CHECKOUT = 24;
const EARLY_ACCESS_HOURS = 72;

export type AccessWindow = {
  opensAt: Date;
  closesAt: Date;
};

/** The window during which the stay portal is reachable for a reservation. */
export function accessWindow(r: Reservation): AccessWindow {
  const opensAt = new Date(r.checkIn + "T00:00:00");
  opensAt.setHours(opensAt.getHours() - EARLY_ACCESS_HOURS);
  const closesAt = new Date(r.checkOut + "T00:00:00");
  closesAt.setHours(closesAt.getHours() + GRACE_HOURS_AFTER_CHECKOUT);
  return { opensAt, closesAt };
}

export function isWithinAccessWindow(r: Reservation, now = new Date()): boolean {
  const { opensAt, closesAt } = accessWindow(r);
  return now >= opensAt && now <= closesAt;
}

// check_in/check_out are DATE columns; the driver otherwise hands back JS
// Date objects that shift under non-UTC timezones. to_char keeps them as the
// plain "YYYY-MM-DD" strings the rest of this module (and accessWindow) expects.
const SELECT_FIELDS = `
  id, booking_ref, guest_name, email, phone_last4, access_token, status,
  package_name, guests_adults, guests_children,
  to_char(check_in, 'YYYY-MM-DD') AS check_in,
  to_char(check_out, 'YYYY-MM-DD') AS check_out,
  check_in_time, check_out_time, nightly_rate, amount_paid,
  add_ons, special_requests, host_name, host_phone
`;

/** Look up by magic-link token. */
export async function findReservationByToken(token: string): Promise<Reservation | null> {
  if (!token) return null;
  const rows = (await sql`
    SELECT ${sql.unsafe(SELECT_FIELDS)} FROM reservations WHERE access_token = ${token} LIMIT 1
  `) as ReservationRow[];
  return rows[0] ? rowToReservation(rows[0]) : null;
}

/** Fallback lookup: booking reference + last 4 of phone. */
export async function findReservationByRef(
  bookingRef: string,
  phoneLast4: string,
): Promise<Reservation | null> {
  const ref = bookingRef.trim().toUpperCase();
  const last4 = phoneLast4.trim();
  const rows = (await sql`
    SELECT ${sql.unsafe(SELECT_FIELDS)} FROM reservations
    WHERE UPPER(booking_ref) = ${ref} AND phone_last4 = ${last4}
    LIMIT 1
  `) as ReservationRow[];
  return rows[0] ? rowToReservation(rows[0]) : null;
}

export async function getReservationById(id: string): Promise<Reservation | null> {
  const rows = (await sql`
    SELECT ${sql.unsafe(SELECT_FIELDS)} FROM reservations WHERE id = ${id} LIMIT 1
  `) as ReservationRow[];
  return rows[0] ? rowToReservation(rows[0]) : null;
}

/** All reservations, newest first — for the admin panel. */
export async function listReservations(): Promise<Reservation[]> {
  const rows = (await sql`
    SELECT ${sql.unsafe(SELECT_FIELDS)} FROM reservations ORDER BY created_at DESC
  `) as ReservationRow[];
  return rows.map(rowToReservation);
}

export type NewReservationInput = {
  bookingRef: string;
  guestName: string;
  email: string;
  phoneLast4: string;
  packageName: string;
  guestsAdults: number;
  guestsChildren: number;
  checkIn: string;
  checkOut: string;
  checkInTime: string;
  checkOutTime: string;
  nightlyRate: number;
  amountPaid: number;
  specialRequests?: string;
  hostName: string;
  hostPhone: string;
};

/** Creates a reservation with a freshly generated id and magic-link token. */
export async function createReservation(input: NewReservationInput): Promise<Reservation> {
  const id = `res_${randomBytes(8).toString("hex")}`;
  const accessToken = randomBytes(32).toString("base64url");

  const rows = (await sql`
    INSERT INTO reservations (
      id, booking_ref, guest_name, email, phone_last4, access_token, status,
      package_name, guests_adults, guests_children, check_in, check_out,
      check_in_time, check_out_time, nightly_rate, amount_paid,
      special_requests, host_name, host_phone
    ) VALUES (
      ${id}, ${input.bookingRef.trim().toUpperCase()}, ${input.guestName}, ${input.email},
      ${input.phoneLast4}, ${accessToken}, 'confirmed',
      ${input.packageName}, ${input.guestsAdults}, ${input.guestsChildren},
      ${input.checkIn}, ${input.checkOut},
      ${input.checkInTime}, ${input.checkOutTime}, ${input.nightlyRate}, ${input.amountPaid},
      ${input.specialRequests ?? null}, ${input.hostName}, ${input.hostPhone}
    )
    RETURNING ${sql.unsafe(SELECT_FIELDS)}
  `) as ReservationRow[];

  return rowToReservation(rows[0]);
}

/** Updates an existing reservation's details. Id and access token are unchanged, so any link already sent to the guest keeps working. */
export async function updateReservation(id: string, input: NewReservationInput): Promise<Reservation | null> {
  const rows = (await sql`
    UPDATE reservations SET
      booking_ref = ${input.bookingRef.trim().toUpperCase()},
      guest_name = ${input.guestName},
      email = ${input.email},
      phone_last4 = ${input.phoneLast4},
      package_name = ${input.packageName},
      guests_adults = ${input.guestsAdults},
      guests_children = ${input.guestsChildren},
      check_in = ${input.checkIn},
      check_out = ${input.checkOut},
      check_in_time = ${input.checkInTime},
      check_out_time = ${input.checkOutTime},
      nightly_rate = ${input.nightlyRate},
      amount_paid = ${input.amountPaid},
      special_requests = ${input.specialRequests ?? null},
      host_name = ${input.hostName},
      host_phone = ${input.hostPhone}
    WHERE id = ${id}
    RETURNING ${sql.unsafe(SELECT_FIELDS)}
  `) as ReservationRow[];

  return rows[0] ? rowToReservation(rows[0]) : null;
}

export async function deleteReservation(id: string): Promise<void> {
  await sql`DELETE FROM reservations WHERE id = ${id}`;
}
