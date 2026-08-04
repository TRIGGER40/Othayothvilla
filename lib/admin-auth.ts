import "server-only";
import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { b64url, signPayload } from "@/lib/session-secret";

/**
 * Admin session handling: a single shared password (ADMIN_PASSWORD), guarding
 * a signed, HttpOnly cookie session. There is only ever one admin (the
 * owner), so this is intentionally simpler than the guest stay-portal auth.
 */

export const ADMIN_SESSION_COOKIE = "otv_admin_session";
const SESSION_HOURS = 12;

type AdminSessionPayload = {
  adm: true;
  iat: number;
  exp: number;
};

function sign(payloadB64: string): string {
  return signPayload(payloadB64);
}

export function checkAdminPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function issueAdminSessionToken(): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = { adm: true, iat: now, exp: now + SESSION_HOURS * 3600 };
  const payloadB64 = b64url(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token || !token.includes(".")) return false;
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return false;

  const expected = sign(payloadB64);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString()) as AdminSessionPayload;
    return typeof payload.exp === "number" && payload.exp * 1000 >= Date.now();
  } catch {
    return false;
  }
}

export function adminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    // Not scoped to /admin: the admin API lives under /api/admin, a sibling
    // path the cookie must also reach.
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  };
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminSessionToken(store.get(ADMIN_SESSION_COOKIE)?.value);
}
