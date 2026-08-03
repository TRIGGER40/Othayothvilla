# Othayoth Villa · Private Pool Stay, Kannur

A production-shaped website for a boutique private pool villa in Kannur, Kerala.
It has two parts:

1. A **public marketing site** to help visitors understand the property, build
   trust, and book with confidence.
2. A **stay-only guest portal** that confirmed guests can access around their
   stay dates for everything they need before, during and just after checkout.

Built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS**.

## Getting started

```bash
npm install
cp .env.example .env.local   # then set GUEST_SESSION_SECRET
npm run dev
```

Open http://localhost:3000.

### Environment

| Variable | Purpose |
| --- | --- |
| `GUEST_SESSION_SECRET` | HMAC secret for signing the guest session cookie. Min 32 chars. Required in production. |
| `NEXT_PUBLIC_SITE_URL` | Absolute base URL, used for metadata, sitemap and magic links. |

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

## Site map

**Public**
`/` · `/villa` · `/stay-experience` · `/rooms` · `/amenities` · `/gallery` ·
`/location` · `/experiences` · `/faq` · `/contact` · `/book`

**Guest portal** (stay-only)
`/guest/login` · `/guest/dashboard` · `/guest/check-in` · `/guest/house-guide` ·
`/guest/services` · `/guest/recommendations` · `/guest/emergency` ·
`/guest/reservation`

## Guest access model (stay-only, no permanent accounts)

```
Reservation confirmed
      → secure access sent (magic link, or booking-ref + phone fallback)
      → guest logs in  (access opens ~72h before check-in)
      → guest sees the stay dashboard
      → access ends automatically after checkout + grace period
```

- Every reservation carries an **opaque, high-entropy access token** (the
  magic-link secret). There is no username/password and no permanent account.
- Login issues an **HMAC-signed session** stored in an **HttpOnly, Secure,
  SameSite=Strict cookie**. No token is ever placed in `localStorage`.
- Session expiry is clamped to the reservation's access window and an absolute
  cap, so a session can never outlive the stay.
- `middleware.ts` short-circuits unauthenticated navigation at the edge; the
  `(portal)` server layout does the authoritative signature + access-window
  check on every request via `getCurrentReservation()`.
- Fallback login (booking ref + last 4 of phone) is rate-limited and returns a
  single generic error so it cannot be used to enumerate reservations.

### Try the portal

On `/guest/login`, use booking reference **`OTV-4821`** with phone digits
**`7788`**. (This demo reservation's dates are centred on today so the portal is
immediately explorable.)

## Where to plug in a backend

Everything real is isolated behind small, typed modules:

| Concern | File | What to do |
| --- | --- | --- |
| Reservations / lookup | `lib/reservations.ts` | Replace the in-memory array with your PMS/DB. Keep the return types and the `findReservationByToken` / `findReservationByRef` signatures. |
| Session signing | `lib/auth.ts` | Already production-shaped. Swap the rate limiter for a shared store if multi-instance. |
| Marketing content | `lib/content.ts` | Move to a CMS if desired; components take plain data. |
| Portal content | `lib/portal.ts` | House guide, services, recommendations, emergency info. |
| Booking / contact forms | `components/marketing/BookingForm.tsx`, `ContactForm.tsx` | Replace the placeholder submit with a CSRF-protected POST and server-side validation. |
| Service requests | `components/guest/RequestForm.tsx` | Wire to your messaging/ops backend. |
| Photography | `lib/images.ts`, `components/ui/Photo.tsx` | Real villa photos live here (compressed WebP in `public/images`, originals in `source-photos/`, not shipped). Sections without a matching photo still fall back to the abstract `<Scene>` placeholder; add a key to `villaPhotos` and wire it in as more photography arrives. |

## Design system

Defined in `tailwind.config.ts` and `app/globals.css`:

- Warm neutral base (linen / sand / stone), deep-palm greens, brass accents and
  a monsoon slate.
- Typography: **Fraunces** (serif display) + **Inter** (sans), via `next/font`.
- Soft shadows, generous radii, subtle scroll-reveal motion that respects
  `prefers-reduced-motion`.

## Security notes

- Static security headers (`X-Frame-Options`, `X-Content-Type-Options`, etc.)
  are set in `next.config.mjs`. The Content-Security-Policy is set per request
  in `middleware.ts` with a fresh nonce, so no inline script or style can run
  unless Next.js itself emitted it (`frame-ancestors 'none'`,
  `form-action 'self'`).
- The portal and API are excluded from indexing (`app/robots.ts`) and the login
  page is `noindex`.
- Forms validate client-side for UX; re-validate server-side at integration.
- `next` is pinned to an exact version (no `^` range) in `package.json`. Every
  `15.5.x` release tested in this environment extracted with core framework
  files missing (broken hydration, broken RSC), while `15.3.9` installs
  complete and clean. Before bumping the pin, verify a fresh `npm install`
  actually produces a complete `node_modules/next` (compare file count against
  `find node_modules/next/dist -type f | wc -l`, expect ~7200+) and that
  `npm audit` is clean, rather than trusting the version number alone.
