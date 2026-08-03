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
