import type { NewReservationInput } from "@/lib/reservations";

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function num(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

/** Parses and validates a create/edit reservation request body, shared by POST and PATCH. */
export function parseReservationInput(
  body: Record<string, unknown>,
): { ok: true; input: NewReservationInput } | { ok: false; error: string } {
  const bookingRef = str(body.bookingRef);
  const guestName = str(body.guestName);
  const email = str(body.email);
  const phoneLast4 = str(body.phoneLast4);
  const checkIn = str(body.checkIn);
  const checkOut = str(body.checkOut);
  const hostName = str(body.hostName) || "Midhun";
  const hostPhone = str(body.hostPhone);

  if (!bookingRef || !guestName || !phoneLast4 || !checkIn || !checkOut) {
    return { ok: false, error: "Booking reference, guest name, phone last 4, check-in and check-out are required." };
  }
  if (!/^\d{4}$/.test(phoneLast4)) {
    return { ok: false, error: "Phone last 4 must be exactly 4 digits." };
  }

  return {
    ok: true,
    input: {
      bookingRef,
      guestName,
      email,
      phoneLast4,
      packageName: str(body.packageName) || "The Whole Villa",
      guestsAdults: num(body.guestsAdults) || 1,
      guestsChildren: num(body.guestsChildren) || 0,
      checkIn,
      checkOut,
      checkInTime: str(body.checkInTime) || "2:00 PM",
      checkOutTime: str(body.checkOutTime) || "11:00 AM",
      nightlyRate: num(body.nightlyRate),
      amountPaid: num(body.amountPaid),
      specialRequests: str(body.specialRequests) || undefined,
      hostName,
      hostPhone,
    },
  };
}
