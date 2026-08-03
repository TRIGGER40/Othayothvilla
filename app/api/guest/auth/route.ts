import { NextResponse, type NextRequest } from "next/server";
import { findReservationByRef, findReservationByToken, isWithinAccessWindow } from "@/lib/reservations";
import { SESSION_COOKIE, issueSessionToken, sessionCookieOptions } from "@/lib/auth";

// This route touches node:crypto (via lib/auth) and must run on the Node runtime.
export const runtime = "nodejs";

/**
 * Very small in-memory rate limiter. Good enough to blunt brute-forcing the
 * booking-ref fallback in a single-instance deployment. For multi-instance,
 * back this with a shared store (Redis) at integration time.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

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

// Generic message: never reveal whether the ref, phone, or token was the problem.
const GENERIC_ERROR =
  "We could not verify those details. Please check your link or booking reference and try again.";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const token = typeof data.token === "string" ? data.token.trim() : "";
  const bookingRef = typeof data.bookingRef === "string" ? data.bookingRef.trim() : "";
  const phoneLast4 = typeof data.phoneLast4 === "string" ? data.phoneLast4.trim() : "";

  // Basic input shape validation before any lookup.
  const validToken = token.length > 0 && token.length <= 256;
  const validFallback = /^[A-Za-z0-9-]{4,20}$/.test(bookingRef) && /^\d{4}$/.test(phoneLast4);

  if (!validToken && !validFallback) {
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 400 });
  }

  const reservation = validToken
    ? findReservationByToken(token)
    : findReservationByRef(bookingRef, phoneLast4);

  if (!reservation) {
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 });
  }

  // Access is stay-only: activates ~72h before check-in, ends after checkout + grace.
  if (!isWithinAccessWindow(reservation)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Your stay portal is not active right now. Access opens shortly before check-in and closes after checkout.",
      },
      { status: 403 },
    );
  }

  const sessionToken = issueSessionToken(reservation);
  const res = NextResponse.json({ ok: true, redirect: "/guest/dashboard" });
  res.cookies.set(SESSION_COOKIE, sessionToken, sessionCookieOptions());
  return res;
}
