import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Clears the stay session. Uses POST so it cannot be triggered by a simple
 * cross-site GET. The cookie is expired immediately.
 */
export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  // Absolute redirect target for clients that follow it.
  void req;
  return res;
}
