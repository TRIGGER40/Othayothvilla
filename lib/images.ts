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
    alt: "Othayoth Villa's tiled roofline and courtyard, lit at dusk with the pool beyond",
  },
  mainGate: {
    src: "/images/villa-main-gate.webp",
    alt: "The main gate of Othayoth Villa, lit in the evening and framed by bamboo",
  },
  gardenWalkway: {
    src: "/images/villa-garden-walkway.webp",
    alt: "A lantern-lit garden walkway along the side of the villa at dusk",
  },
  privateSitout: {
    src: "/images/villa-private-sitout.webp",
    alt: "A private sitout at Othayoth Villa with low seating, ready for the evening",
  },
  poolYoga: {
    src: "/images/villa-pool-yoga.webp",
    alt: "A guided yoga session on the pool deck at dusk, Othayoth Villa",
  },
  livingDining: {
    src: "/images/villa-living-dining.webp",
    alt: "The open living and dining space at Othayoth Villa, opening onto the garden",
  },
  livingRoom: {
    src: "/images/villa-living-room.webp",
    alt: "A living room at Othayoth Villa with sofas, a television console and Kannur artwork",
  },
  kitchen: {
    src: "/images/villa-kitchen.webp",
    alt: "The fully equipped kitchen at Othayoth Villa",
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
