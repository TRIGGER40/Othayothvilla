import type { Metadata } from "next";
import { site } from "@/lib/content";

/**
 * Single source of truth for SEO. `pageMeta()` builds a complete, unique
 * Metadata object (title, description, canonical, Open Graph, Twitter,
 * keywords) for any page so every route ships correct, non-duplicated tags.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://othayothvilla.com").replace(/\/$/, "");

export const OG_IMAGE = {
  url: "/og/othayoth-villa-og.jpg",
  width: 1200,
  height: 630,
  alt: "Othayoth Villa, a private pool villa in Kannur, Kerala",
};

/** Brand-level keywords carried on every page. */
const BASE_KEYWORDS = [
  "villa stay in Kannur",
  "pool villa Kannur",
  "private pool villa Kannur",
  "luxury villa Kannur",
  "best villa in Kannur",
  "villa with swimming pool Kannur",
  "private villa Kerala",
  "villa near Kannur Airport",
  "holiday villa Kerala",
];

export type PageKey =
  | "home"
  | "villa"
  | "stay-experience"
  | "rooms"
  | "amenities"
  | "gallery"
  | "location"
  | "experiences"
  | "faq"
  | "contact"
  | "book";

/** Per-page keyword focus, layered on top of BASE_KEYWORDS. */
export const PAGE_KEYWORDS: Record<PageKey, string[]> = {
  home: ["luxury stay Kannur", "premium villa Kannur", "villa with private swimming pool", "best pool villa in Kannur", "staycation Kannur"],
  villa: ["private villa for family in Kannur", "couple friendly villa Kannur", "luxury private pool villa Kerala", "whole villa booking Kannur", "peaceful villa stay Kannur"],
  "stay-experience": ["luxury stay in North Kerala", "romantic stay Kannur", "weekend getaway Kannur", "monsoon villa stay Kerala", "slow travel Kerala"],
  rooms: ["4 bedroom villa Kannur", "villa with kitchen Kannur", "family villa Kannur", "air conditioned villa Kannur", "villa rooms Kannur"],
  amenities: ["villa with private swimming pool", "villa with kitchen Kannur", "villa amenities Kannur", "private chef villa Kerala", "Wi-Fi villa Kannur"],
  gallery: ["Othayoth Villa photos", "pool villa Kannur photos", "luxury villa Kannur gallery", "Kerala villa interiors"],
  location: ["villa near Payyambalam Beach", "villa near Muzhappilangad Beach", "villa near Thottada Beach", "villa near Kannur Airport", "best place to stay in Kannur", "luxury stay in North Kerala"],
  experiences: ["Kerala villa vacation", "candlelight dinner Kannur", "private chef Kannur", "Ayurveda villa Kerala", "Theyyam Kannur"],
  faq: ["villa booking Kannur", "pool villa rules Kannur", "villa check-in Kannur", "family villa Kannur FAQ"],
  contact: ["book villa Kannur", "contact Othayoth Villa", "villa enquiry Kannur", "villa phone Kannur"],
  book: ["book pool villa Kannur", "check availability villa Kannur", "reserve villa Kannur", "direct villa booking Kannur"],
};

const PATHS: Record<PageKey, string> = {
  home: "/",
  villa: "/villa",
  "stay-experience": "/stay-experience",
  rooms: "/rooms",
  amenities: "/amenities",
  gallery: "/gallery",
  location: "/location",
  experiences: "/experiences",
  faq: "/faq",
  contact: "/contact",
  book: "/book",
};

export function canonical(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * Build a full Metadata object for a page.
 * `title` here is the raw <title> text; it is used verbatim (no template) so we
 * can hold each page to the 50–60 character sweet spot deliberately.
 */
export function pageMeta(page: PageKey, opts: {
  title: string;
  description: string;
  /** Extra page-specific keywords beyond the standard per-page set. */
  keywords?: string[];
}): Metadata {
  const path = PATHS[page];
  const url = canonical(path);
  const keywords = Array.from(new Set([...(opts.keywords ?? []), ...PAGE_KEYWORDS[page], ...BASE_KEYWORDS]));

  return {
    // `absolute` bypasses the layout's title template so each page holds its
    // deliberately length-tuned 50–60 char title verbatim.
    title: { absolute: opts.title },
    description: opts.description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      url,
      title: opts.title,
      description: opts.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [OG_IMAGE.url],
    },
  };
}
