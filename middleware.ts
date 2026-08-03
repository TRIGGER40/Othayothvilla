import { NextResponse, type NextRequest } from "next/server";

// Inlined rather than imported from lib/session-config: Vercel's Edge Function
// bundler flags a module shared with the Node-runtime lib/auth.ts import graph
// as "unsupported" for the edge, even though this constant itself is trivial.
// Keep this value in sync with lib/session-config.ts's SESSION_COOKIE.
const SESSION_COOKIE = "othayoth_stay";

/**
 * Middleware does two things on every request:
 *
 * 1. Sets a Content-Security-Policy header.
 *
 *    A per-request nonce with 'strict-dynamic' was tried first, but Next.js
 *    does not attach that nonce to the inline flight-data/hydration scripts
 *    it emits on statically-rendered pages (those are pre-rendered once at
 *    build time, before any request-scoped nonce exists) — 'strict-dynamic'
 *    then blocks every script on the page, silently breaking hydration.
 *    'self' 'unsafe-inline' is the pragmatic tradeoff Next.js's own CSP docs
 *    fall back to for this case: script-src is still restricted to
 *    same-origin files, this app never uses dangerouslySetInnerHTML, and React
 *    escapes rendered text by default, so the residual inline-script risk is
 *    low relative to fighting the framework's static-generation model.
 *
 * 2. Guards the stay-only portal. This is a lightweight presence check;
 *    authoritative validation (HMAC signature + access window) happens in the
 *    (portal) server layout via getCurrentReservation().
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Guard authenticated portal pages. Login and the /guest index stay public.
  const isProtected =
    pathname.startsWith("/guest") && pathname !== "/guest/login" && pathname !== "/guest";

  if (isProtected && !req.cookies.get(SESSION_COOKIE)?.value) {
    const loginUrl = new URL("/guest/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    const redirect = NextResponse.redirect(loginUrl);
    redirect.headers.set("Content-Security-Policy", CSP);
    return redirect;
  }

  const res = NextResponse.next();
  res.headers.set("Content-Security-Policy", CSP);
  return res;
}

export const config = {
  // Run on all routes except static assets, so the CSP is present wherever
  // Next renders HTML.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|logo/).*)",
  ],
};
