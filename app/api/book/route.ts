import { NextResponse, type NextRequest } from "next/server";
import { createBookingRequest } from "@/lib/booking-requests";
import { sendBookingRequestNotification } from "@/lib/mailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 6;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const rec = attempts.get(key);
  if (!rec || rec.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_ATTEMPTS;
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const name = str(b.name);
  const email = str(b.email);
  const phone = str(b.phone);
  const checkIn = str(b.checkIn);
  const checkOut = str(b.checkOut);
  const adults = Number(b.adults) || 1;
  const children = Number(b.children) || 0;
  const occasion = str(b.occasion) || undefined;
  const specialRequests = str(b.specialRequests) || undefined;

  if (name.length < 2 || !EMAIL_RE.test(email) || !PHONE_RE.test(phone) || !checkIn || !checkOut) {
    return NextResponse.json({ ok: false, error: "Please check the form and try again." }, { status: 400 });
  }
  if (new Date(checkOut).getTime() <= new Date(checkIn).getTime()) {
    return NextResponse.json({ ok: false, error: "Check-out must be after check-in." }, { status: 400 });
  }

  const request = await createBookingRequest({
    name,
    email,
    phone,
    checkIn,
    checkOut,
    guestsAdults: adults,
    guestsChildren: children,
    occasion,
    specialRequests,
  });

  try {
    await sendBookingRequestNotification(request);
  } catch (err) {
    // The request is already saved and visible in the admin panel either way;
    // don't fail the guest's submission just because the email didn't send.
    console.error("Failed to send booking request notification email:", err);
  }

  return NextResponse.json({ ok: true });
}
