import type { SVGProps } from "react";

/**
 * A small, curated set of minimal line icons drawn to feel premium and calm.
 * All use currentColor and a consistent 1.5 stroke. Add new glyphs here rather
 * than pulling a heavy icon dependency.
 */
export type IconName =
  | "pool"
  | "key"
  | "leaf"
  | "hand"
  | "wifi"
  | "utensils"
  | "shield"
  | "home"
  | "book"
  | "bell"
  | "map"
  | "receipt"
  | "wind"
  | "flame"
  | "tv"
  | "recycle"
  | "bolt"
  | "sparkle"
  | "car"
  | "wrench"
  | "wave"
  | "phone"
  | "whatsapp"
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "star"
  | "menu"
  | "close"
  | "calendar"
  | "users"
  | "pin"
  | "mail"
  | "chevron-down"
  | "logout";

const paths: Record<IconName, React.ReactNode> = {
  pool: (
    <>
      <path d="M4 15c1.5 1 3 1 4.5 0S11.5 14 13 15s3 1 4.5 0S20.5 14 22 15" />
      <path d="M4 19c1.5 1 3 1 4.5 0S11.5 18 13 19s3 1 4.5 0S20.5 18 22 19" />
      <path d="M7 15V5.5A1.5 1.5 0 0 1 8.5 4h0A1.5 1.5 0 0 1 10 5.5" />
      <path d="M15 14V5.5A1.5 1.5 0 0 1 16.5 4h0A1.5 1.5 0 0 1 18 5.5" />
      <path d="M7 9h8" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="m10.8 10.8 8.2 8.2" />
      <path d="m16 16 2-2" />
      <path d="m18.5 18.5 2-2" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20c0-8 6-14 16-14 0 10-6 14-16 14Z" />
      <path d="M4 20c4-6 8-8 12-9" />
    </>
  ),
  hand: (
    <>
      <path d="M18 11V6.5a1.5 1.5 0 0 0-3 0V11" />
      <path d="M15 10.5V4.5a1.5 1.5 0 0 0-3 0V11" />
      <path d="M12 10.5V5.5a1.5 1.5 0 0 0-3 0V12" />
      <path d="M9 12V8.5a1.5 1.5 0 0 0-3 0v6a6 6 0 0 0 6 6h1a6 6 0 0 0 6-6V11" />
    </>
  ),
  wifi: (
    <>
      <path d="M2 8.5C7.5 4 16.5 4 22 8.5" />
      <path d="M5 12c4-3.2 10-3.2 14 0" />
      <path d="M8.5 15.5c2.2-1.7 4.8-1.7 7 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  utensils: (
    <>
      <path d="M6 3v8a2 2 0 0 0 4 0V3" />
      <path d="M8 11v10" />
      <path d="M17 3c-1.7 0-3 2-3 5s1 4 3 4v9" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  home: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  book: (
    <>
      <path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" />
      <path d="M17 20a3 3 0 0 1 3-3V6" />
      <path d="M9 8h5M9 11h5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V10a6 6 0 0 1 12 0v6l2 2H4l2-2Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  map: (
    <>
      <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21V3Z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  wind: (
    <>
      <path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M3 12h15a2.5 2.5 0 1 1-2.5 2.5" />
      <path d="M3 16h8a2 2 0 1 1-2 2" />
    </>
  ),
  flame: (
    <>
      <path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1.5.5-2.5 1-3 .5 1 1.5 1.5 2 1.5-1-2 0-4 1-6.5Z" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  recycle: (
    <>
      <path d="M7 8 5 11l3 1" />
      <path d="M7.5 9.5 10 5.5a2 2 0 0 1 3.5 0l1.5 2.5" />
      <path d="m17 9 1.5 3-3 .5" />
      <path d="M18 12.5 16 16a2 2 0 0 1-1.7 1H11" />
      <path d="m9 20 2-3-3-.5" />
    </>
  ),
  bolt: <path d="M13 3 5 13h5l-1 8 8-11h-5l1-7Z" />,
  sparkle: (
    <>
      <path d="M12 4v16M4 12h16" opacity="0" />
      <path d="M12 5c.6 3.4 1.6 4.4 5 5-3.4.6-4.4 1.6-5 5-.6-3.4-1.6-4.4-5-5 3.4-.6 4.4-1.6 5-5Z" />
    </>
  ),
  car: (
    <>
      <path d="M4 15v-2l2-5a2 2 0 0 1 1.9-1.4h8.2A2 2 0 0 1 18 8l2 5v2" />
      <path d="M3 15h18v3h-2M5 18H3v-3" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="16.5" cy="18" r="1.5" />
    </>
  ),
  wrench: (
    <>
      <path d="M15 4a4 4 0 0 0-1.5 7.7L5 20l-1 -1 8.3-8.5A4 4 0 1 0 15 4Z" />
    </>
  ),
  wave: (
    <>
      <path d="M3 12c1.5 1.5 3 1.5 4.5 0S10.5 10.5 12 12s3 1.5 4.5 0S19.5 10.5 21 12" />
      <path d="M3 17c1.5 1.5 3 1.5 4.5 0S10.5 15.5 12 17s3 1.5 4.5 0S19.5 15.5 21 17" />
    </>
  ),
  phone: (
    <path d="M6 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4 5a2 2 0 0 1 2-2Z" />
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.4-4A8 8 0 1 1 8 18.6L4 20Z" />
      <path d="M9 9c0 3 3 6 6 6 .8 0 1.4-1 1-1.6l-1.4-.7-1 1a5 5 0 0 1-2.3-2.3l1-1L11.6 9C11 8.6 9 9 9 9Z" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
  star: (
    <path d="M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 16.9 7.2 18.8l.9-5.3L4.2 9.7l5.4-.8L12 4Z" />
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 6a3 3 0 0 1 0 6M15 20a6 6 0 0 1 6 0" opacity="0.6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c5-5 7-8.5 7-11a7 7 0 1 0-14 0c0 2.5 2 6 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  logout: (
    <>
      <path d="M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" />
      <path d="M10 12h9M16 8l4 4-4 4" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
