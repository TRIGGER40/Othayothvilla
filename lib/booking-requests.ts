import "server-only";
import { randomBytes } from "node:crypto";
import { sql } from "@/lib/db";

/** An inquiry from the public "check availability" form, awaiting a reply from the owner. */
export type BookingRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guestsAdults: number;
  guestsChildren: number;
  occasion?: string;
  specialRequests?: string;
  status: "new" | "contacted" | "dismissed";
  createdAt: string;
};

type BookingRequestRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  guests_adults: number;
  guests_children: number;
  occasion: string | null;
  special_requests: string | null;
  status: string;
  created_at: string;
};

const SELECT_FIELDS = `
  id, name, email, phone,
  to_char(check_in, 'YYYY-MM-DD') AS check_in,
  to_char(check_out, 'YYYY-MM-DD') AS check_out,
  guests_adults, guests_children, occasion, special_requests, status, created_at
`;

function rowToRequest(row: BookingRequestRow): BookingRequest {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    checkIn: row.check_in,
    checkOut: row.check_out,
    guestsAdults: row.guests_adults,
    guestsChildren: row.guests_children,
    occasion: row.occasion ?? undefined,
    specialRequests: row.special_requests ?? undefined,
    status: row.status as BookingRequest["status"],
    createdAt: row.created_at,
  };
}

export type NewBookingRequestInput = {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guestsAdults: number;
  guestsChildren: number;
  occasion?: string;
  specialRequests?: string;
};

export async function createBookingRequest(input: NewBookingRequestInput): Promise<BookingRequest> {
  const id = `req_${randomBytes(8).toString("hex")}`;
  const rows = (await sql`
    INSERT INTO booking_requests (
      id, name, email, phone, check_in, check_out,
      guests_adults, guests_children, occasion, special_requests
    ) VALUES (
      ${id}, ${input.name}, ${input.email}, ${input.phone}, ${input.checkIn}, ${input.checkOut},
      ${input.guestsAdults}, ${input.guestsChildren}, ${input.occasion ?? null}, ${input.specialRequests ?? null}
    )
    RETURNING ${sql.unsafe(SELECT_FIELDS)}
  `) as BookingRequestRow[];
  return rowToRequest(rows[0]);
}

export async function listBookingRequests(): Promise<BookingRequest[]> {
  const rows = (await sql`
    SELECT ${sql.unsafe(SELECT_FIELDS)} FROM booking_requests ORDER BY created_at DESC
  `) as BookingRequestRow[];
  return rows.map(rowToRequest);
}

export async function setBookingRequestStatus(
  id: string,
  status: BookingRequest["status"],
): Promise<void> {
  await sql`UPDATE booking_requests SET status = ${status} WHERE id = ${id}`;
}

export async function deleteBookingRequest(id: string): Promise<void> {
  await sql`DELETE FROM booking_requests WHERE id = ${id}`;
}
