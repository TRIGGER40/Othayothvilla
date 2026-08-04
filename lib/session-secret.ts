import "server-only";
import { createHmac } from "node:crypto";

/**
 * Shared HMAC signing secret for the site's signed-cookie sessions (guest
 * stay portal and admin panel). Both share one secret since both are
 * short-lived, server-verified tokens; a compromised secret means re-issuing
 * one env var, not migrating two.
 */
function getSessionSecret(): string {
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

export function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

export function signPayload(payloadB64: string): string {
  return createHmac("sha256", getSessionSecret()).update(payloadB64).digest("base64url");
}
