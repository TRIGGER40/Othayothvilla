import "server-only";

/**
 * Placeholder reservation store.
 *
 * In production this module would be backed by your PMS / booking database.
 * The shape here is what the guest portal and auth layer depend on, so the
 * backend integration is a drop-in: implement `findReservationByToken` and
 * `findReservationByRef` against your data source and keep the return type.
 *
 * Access is STAY-ONLY. Every reservation carries an opaque, high-entropy
 * access token (the magic-link secret). Nothing here is a permanent account.
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
  /** Last 4 digits of the phone on file — used for the OTP-style fallback. */
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
  balanceDue: number;
  addOns: AddOn[];
  specialRequests?: string;
  wifi: { network: string; password: string };
  hostName: string;
  hostPhone: string;
};

/**
 * Demo reservations. The access window for the first record is centred on
 * "today" so the portal is explorable out of the box.
 */
function isoDaysFromNow(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const RESERVATIONS: Reservation[] = [
  {
    id: "res_othayoth_001",
    bookingRef: "OTV-4821",
    guestName: "Ananya & Rohan",
    email: "guest@example.com",
    phoneLast4: "7788",
    // Demo token. Real tokens are issued by the server as 32+ random bytes.
    accessToken: "demo-stay-token-a1b2c3d4e5f6",
    status: "confirmed",
    packageName: "The Whole Villa · Monsoon Retreat",
    guests: { adults: 4, children: 2 },
    checkIn: isoDaysFromNow(-1),
    checkOut: isoDaysFromNow(2),
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    nightlyRate: 24500,
    amountPaid: 36750,
    balanceDue: 36750,
    addOns: [
      { id: "ao1", label: "Welcome Kerala sadya on arrival", price: 3200, status: "confirmed" },
      { id: "ao2", label: "In-villa dining · 2 dinners", price: 8600, status: "confirmed" },
      { id: "ao3", label: "Candlelight poolside dinner", price: 4500, status: "requested" },
    ],
    specialRequests: "Celebrating an anniversary on the second night.",
    wifi: { network: "Othayoth_Villa", password: "coconut-grove-42" },
    hostName: "Midhun",
    hostPhone: "+91 98470 00000",
  },
  {
    id: "res_othayoth_002",
    bookingRef: "OTV-5104",
    guestName: "The Menon Family",
    email: "menon@example.com",
    phoneLast4: "3390",
    accessToken: "demo-stay-token-9z8y7x6w5v4u",
    status: "confirmed",
    packageName: "The Whole Villa · Family Long Weekend",
    guests: { adults: 6, children: 3 },
    checkIn: isoDaysFromNow(20),
    checkOut: isoDaysFromNow(23),
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    nightlyRate: 24500,
    amountPaid: 73500,
    balanceDue: 0,
    addOns: [{ id: "ao4", label: "Airport pickup · Kannur (CNN)", price: 2600, status: "confirmed" }],
    wifi: { network: "Othayoth_Villa", password: "coconut-grove-42" },
    hostName: "Midhun",
    hostPhone: "+91 98470 00000",
  },
];

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

/** Look up by magic-link token (constant work regardless of match). */
export function findReservationByToken(token: string): Reservation | null {
  if (!token) return null;
  return RESERVATIONS.find((r) => safeEquals(r.accessToken, token)) ?? null;
}

/** Fallback lookup: booking reference + last 4 of phone. */
export function findReservationByRef(bookingRef: string, phoneLast4: string): Reservation | null {
  const ref = bookingRef.trim().toUpperCase();
  const last4 = phoneLast4.trim();
  return (
    RESERVATIONS.find(
      (r) => safeEquals(r.bookingRef.toUpperCase(), ref) && safeEquals(r.phoneLast4, last4),
    ) ?? null
  );
}

export function getReservationById(id: string): Reservation | null {
  return RESERVATIONS.find((r) => r.id === id) ?? null;
}

/** Length-independent, timing-safe string comparison. */
function safeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}
