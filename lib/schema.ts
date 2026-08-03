import { SITE_URL, OG_IMAGE, canonical } from "@/lib/seo";
import { site, amenityGroups, reviews, faqs } from "@/lib/content";
import { villaPhotos } from "@/lib/images";

/**
 * JSON-LD builders. All URLs are absolute (Google requires this for structured
 * data). The site-wide graph combines Organization, WebSite and the primary
 * LodgingBusiness entity; per-page helpers add BreadcrumbList and FAQPage.
 */

const abs = (p: string) => `${SITE_URL}${p}`;
const ORG_ID = `${SITE_URL}/#organization`;
const BUSINESS_ID = `${SITE_URL}/#lodging`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const allPhotoUrls = Object.values(villaPhotos).map((p) => abs(p.src));

function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: abs("/logo/logo-horizontal-light.webp"),
      width: 560,
      height: 196,
    },
    image: abs(OG_IMAGE.url),
    email: site.email,
    telephone: site.phoneDisplay,
    address: postalAddress(),
    areaServed: "Kannur, Kerala, India",
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: site.postalAddress.street,
    addressLocality: site.postalAddress.locality,
    addressRegion: site.postalAddress.region,
    postalCode: site.postalAddress.postalCode,
    addressCountry: site.postalAddress.country,
  };
}

function aggregateRating() {
  const count = reviews.length;
  const avg = reviews.reduce((s, r) => s + r.stars, 0) / count;
  return {
    "@type": "AggregateRating",
    ratingValue: avg.toFixed(1),
    reviewCount: count,
    bestRating: 5,
    worstRating: 1,
  };
}

function reviewList() {
  return reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: r.stars, bestRating: 5, worstRating: 1 },
    reviewBody: r.quote,
  }));
}

function amenityFeatures() {
  return amenityGroups
    .flatMap((g) => g.items)
    .map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true }));
}

function lodgingBusiness() {
  return {
    "@type": ["LodgingBusiness", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: site.name,
    description:
      "Othayoth Villa is a boutique private pool villa in Kannur, Kerala, booked as a whole four-bedroom home for couples, families and small groups on the Valapattanam riverside in Varam.",
    url: SITE_URL,
    telephone: site.phoneDisplay,
    email: site.email,
    image: [abs(OG_IMAGE.url), ...allPhotoUrls],
    logo: abs("/logo/logo-horizontal-light.webp"),
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`,
    numberOfRooms: site.bedrooms,
    petsAllowed: false,
    smokingAllowed: false,
    checkinTime: site.checkInTime,
    checkoutTime: site.checkOutTime,
    amenityFeature: amenityFeatures(),
    areaServed: ["Kannur", "Varam", "North Kerala"],
    parentOrganization: { "@id": ORG_ID },
    aggregateRating: aggregateRating(),
    review: reviewList(),
  };
}

/** Site-wide graph, rendered once in the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), lodgingBusiness()],
  };
}

/** Breadcrumb trail. Pass ordered [label, path] pairs (path relative to root). */
export function breadcrumbList(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: canonical(t.path),
    })),
  };
}

/** FAQ rich-result schema built from the shared FAQ content. */
export function faqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
