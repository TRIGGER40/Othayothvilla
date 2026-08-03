import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session-config";

/**
 * Middleware does two things on every request:
 *
 * 1. Sets a strict, nonce-based Content-Security-Policy. The nonce is generated
 *    per request (Web Crypto, edge-safe) and passed on the request headers so
 *    Next.js applies it to its own inline bootstrap scripts. 'strict-dynamic'
 *    lets those nonced scripts load the app chunks without an allowlist.
 *    'unsafe-eval' is added only in development for React Fast Refresh / HMR.
 *
 * 2. Guards the stay-only portal. This is a lightweight presence check;
 *    authoritative validation (HMAC signature + access window) happens in the
 *    (portal) server layout via getCurrentReservation().
 */
function buildCsp(nonce: string): string {
  const dev = process.env.NODE_ENV !== "production";
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    // 'self' covers same-origin HMR websockets in development.
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function middleware(req: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce);
  const { pathname } = req.nextUrl;

  // Guard authenticated portal pages. Login and the /guest index stay public.
  const isProtected =
    pathname.startsWith("/guest") && pathname !== "/guest/login" && pathname !== "/guest";

  if (isProtected && !req.cookies.get(SESSION_COOKIE)?.value) {
    const loginUrl = new URL("/guest/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    const redirect = NextResponse.redirect(loginUrl);
    redirect.headers.set("Content-Security-Policy", csp);
    return redirect;
  }

  // Pass the nonce to the app so Next.js can nonce its scripts.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set("Content-Security-Policy", csp);
  return res;
}

export const config = {
  // Run on all routes except static assets, so the CSP nonce is present
  // wherever Next renders HTML.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|logo/).*)",
  ],
};
