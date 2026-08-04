import { NextResponse, type NextRequest } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createReservation, listReservations, type NewReservationInput } from "@/lib/reservations";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
  }
  const reservations = await listReservations();
  return NextResponse.json({ ok: true, reservations });
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function num(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  const bookingRef = str(b.bookingRef);
  const guestName = str(b.guestName);
  const email = str(b.email);
  const phoneLast4 = str(b.phoneLast4);
  const checkIn = str(b.checkIn);
  const checkOut = str(b.checkOut);
  const wifiNetwork = str(b.wifiNetwork) || "Othayoth_Villa";
  const wifiPassword = str(b.wifiPassword);
  const hostName = str(b.hostName) || "Midhun";
  const hostPhone = str(b.hostPhone);

  if (!bookingRef || !guestName || !phoneLast4 || !checkIn || !checkOut) {
    return NextResponse.json(
      { ok: false, error: "Booking reference, guest name, phone last 4, check-in and check-out are required." },
      { status: 400 },
    );
  }
  if (!/^\d{4}$/.test(phoneLast4)) {
    return NextResponse.json({ ok: false, error: "Phone last 4 must be exactly 4 digits." }, { status: 400 });
  }

  const input: NewReservationInput = {
    bookingRef,
    guestName,
    email,
    phoneLast4,
    packageName: str(b.packageName) || "The Whole Villa",
    guestsAdults: num(b.guestsAdults) || 1,
    guestsChildren: num(b.guestsChildren) || 0,
    checkIn,
    checkOut,
    checkInTime: str(b.checkInTime) || "2:00 PM",
    checkOutTime: str(b.checkOutTime) || "11:00 AM",
    nightlyRate: num(b.nightlyRate),
    amountPaid: num(b.amountPaid),
    balanceDue: num(b.balanceDue),
    specialRequests: str(b.specialRequests) || undefined,
    wifiNetwork,
    wifiPassword,
    hostName,
    hostPhone,
  };

  try {
    const reservation = await createReservation(input);
    return NextResponse.json({ ok: true, reservation });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("duplicate key") || message.includes("unique constraint")) {
      return NextResponse.json({ ok: false, error: "That booking reference is already in use." }, { status: 409 });
    }
    return NextResponse.json({ ok: false, error: "Could not create the reservation." }, { status: 500 });
  }
}
