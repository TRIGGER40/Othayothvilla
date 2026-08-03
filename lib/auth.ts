import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import {
  accessWindow,
  getReservationById,
  isWithinAccessWindow,
  type Reservation,
} from "@/lib/reservations";
import { SESSION_COOKIE } from "@/lib/session-config";

export { SESSION_COOKIE };

/**
 * Stay-only session handling.
 *
 * The session is a compact, HMAC-signed token (payload.signature) stored in an
 * HttpOnly, Secure, SameSite=Strict cookie. There is no server-side session
 * store to compromise and no token in localStorage. The signature binds the
 * reservation id and expiry; tampering invalidates it.
 *
 * Expiry is clamped to the end of the reservation's access window, so a session
 * can never outlive the stay (plus grace), and to an absolute cap.
 */

const ABSOLUTE_TIMEOUT_HOURS = 8;

type SessionPayload = {
  /** reservation id */
  rid: string;
  /** issued-at (epoch seconds) */
  iat: number;
  /** expiry (epoch seconds) */
  exp: number;
};

function getSecret(): string {
  const secret = process.env.GUEST_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    // Fail loudly in production; allow a clearly-marked dev fallback locally.
    if (process.env.NODE_ENV === "production") {
      throw new Error("GUEST_SESSION_SECRET must be set (>= 32 chars) in production.");
    }
    return "dev-only-insecure-secret-do-not-use-in-production-0000";
  }
  return secret;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(payloadJson: string): string {
  return createHmac("sha256", getSecret()).update(payloadJson).digest("base64url");
}

/** Build a signed session token for a reservation, clamped to its access window. */
export function issueSessionToken(r: Reservation): string {
  const now = Math.floor(Date.now() / 1000);
  const windowEnd = Math.floor(accessWindow(r).closesAt.getTime() / 1000);
  const absoluteCap = now + ABSOLUTE_TIMEOUT_HOURS * 3600;
  const exp = Math.min(windowEnd, absoluteCap);

  const payload: SessionPayload = { rid: r.id, iat: now, exp };
  const payloadB64 = b64url(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

/** Verify signature + expiry and return the payload, or null. */
export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token || !token.includes(".")) return null;
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  const expected = sign(payloadB64);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString()) as SessionPayload;
    if (typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Cookie options for the stay session. Non-persistent (session cookie). */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/guest",
  };
}

/**
 * Resolve the current guest from the session cookie. Re-checks the access
 * window on every request so access ends cleanly after checkout even if the
 * signed token has not yet expired.
 */
export async function getCurrentReservation(): Promise<Reservation | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const payload = verifySessionToken(token);
  if (!payload) return null;

  const reservation = getReservationById(payload.rid);
  if (!reservation) return null;
  if (!isWithinAccessWindow(reservation)) return null;

  return reservation;
}

/** Generate a fresh opaque access token (for issuing new magic links). */
export function generateAccessToken(): string {
  return randomBytes(32).toString("base64url");
}
