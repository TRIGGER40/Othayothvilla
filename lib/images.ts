/**
 * Registry of real Othayoth Villa photography, compressed to WebP in
 * /public/images (originals kept outside public/ in source-photos/). Import
 * from here rather than hardcoding paths, so a future photo swap is one edit.
 *
 * Not every section of the site has a matching photo yet. Where there is no
 * good match, the calling component falls back to the abstract <Scene />
 * placeholder rather than force-fitting an unrelated image.
 */

export const villaPhotos = {
  exteriorDusk: {
    src: "/images/villa-exterior-dusk.webp",
    alt: "Othayoth Villa private pool villa in Kannur, Kerala, tiled roofline and pool lit at dusk",
  },
  mainGate: {
    src: "/images/villa-main-gate.webp",
    alt: "Gated private entrance of Othayoth Villa in Kannur, lit and framed by bamboo at dusk",
  },
  gardenWalkway: {
    src: "/images/villa-garden-walkway.webp",
    alt: "Lantern-lit garden walkway beside the private villa at dusk in Kannur, Kerala",
  },
  privateSitout: {
    src: "/images/villa-private-sitout.webp",
    alt: "Private evening sitout with low seating at Othayoth Villa, Kannur",
  },
  poolYoga: {
    src: "/images/villa-pool-yoga.webp",
    alt: "Yoga on the private pool deck at dusk at Othayoth pool villa, Kannur, Kerala",
  },
  livingDining: {
    src: "/images/villa-living-dining.webp",
    alt: "Open living and dining area opening to the garden at Othayoth Villa, Kannur",
  },
  livingRoom: {
    src: "/images/villa-living-room.webp",
    alt: "Living room with sofas and smart TV at the luxury villa in Kannur, Kerala",
  },
  kitchen: {
    src: "/images/villa-kitchen.webp",
    alt: "Fully equipped modern kitchen at Othayoth private villa in Kannur, Kerala",
  },
  welcomeBasket: {
    src: "/images/amenities-welcome-basket.webp",
    alt: "Welcome basket of Kerala snacks in the living room at Othayoth Villa, private pool villa in Kannur",
  },
  windowDetail: {
    src: "/images/faq-window-detail.webp",
    alt: "Wooden window and tiled awning detail at Othayoth Villa, private pool villa in Kannur, Kerala",
  },
  exteriorPalms: {
    src: "/images/gallery-villa-exterior.webp",
    alt: "Othayoth Villa exterior at dusk framed by coconut palms, private pool villa in Kannur, Kerala",
  },
  poolsideDinner: {
    src: "/images/experience-poolside-dinner.webp",
    alt: "Candlelight table set poolside for a private dinner at Othayoth Villa, Kannur",
  },
  seafood: {
    src: "/images/experience-seafood.webp",
    alt: "Malabar seafood, banana-leaf grilled fish and curry, at Othayoth Villa, Kannur",
  },
  keralaSadya: {
    src: "/images/experience-kerala-sadya.webp",
    alt: "Traditional Kerala sadya laid on banana leaves at Othayoth Villa, Kannur",
  },
  localDiscovery: {
    src: "/images/experience-local-discovery.webp",
    alt: "A Theyyam ritual performance in the forest near Othayoth Villa, Kannur, Kerala",
  },
  celebration: {
    src: "/images/experience-celebration.webp",
    alt: "Candlelit anniversary celebration setup at Othayoth Villa, private pool villa in Kannur",
  },
  gardenGames: {
    src: "/images/experience-hero-garden-games.webp",
    alt: "A carrom board and beanbags set along the lantern-lit garden path at Othayoth Villa, Kannur",
  },
  northKeralaCoast: {
    src: "/images/location-north-kerala-coast.webp",
    alt: "A quiet, unspoiled beach on the North Kerala coast near Kannur",
  },
  satelliteMap: {
    src: "/images/location-satellite-map.webp",
    alt: "Satellite map showing Othayoth House in Varam, near Kannur, Kerala",
  },
  bookCalendar: {
    src: "/images/book-hero-calendar.webp",
    alt: "An Othayoth Villa branded calendar on the coffee table, pool visible through the glass doors beyond",
  },
  privatePool: {
    src: "/images/stay-experience-private-pool.webp",
    alt: "Close-up of the private pool at dusk with lantern reflections at Othayoth Villa, Kannur",
  },
} as const;

export type VillaPhotoKey = keyof typeof villaPhotos;

/**
 * The Othayoth Villa brand mark: a brass blossom, paired with an "Othayoth"
 * serif + "Villa" script wordmark. Two colour lockups cover light and dark
 * backgrounds; the mark alone is used as a small decorative flourish.
 */
export const logo = {
  horizontalLight: {
    src: "/logo/logo-horizontal-light.webp",
    alt: "Othayoth Villa",
    width: 560,
    height: 196,
  },
  horizontalDark: {
    src: "/logo/logo-horizontal-dark.webp",
    alt: "Othayoth Villa",
    width: 560,
    height: 196,
  },
  mark: {
    src: "/logo/logo-mark.webp",
    alt: "The Othayoth Villa blossom mark",
    width: 320,
    height: 322,
  },
  verticalLight: {
    src: "/logo/logo-vertical-light.webp",
    alt: "Othayoth Villa",
    width: 640,
    height: 835,
  },
} as const;
