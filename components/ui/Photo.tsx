import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Real villa photography, sized and rounded to match <Scene>'s placeholder API
 * so either can drop into the same layout slot. Images are compressed WebP
 * served from /public/images (see source-photos/ for the originals).
 */
export function Photo({
  src,
  alt,
  label,
  aspect = "aspect-[4/3]",
  rounded = "rounded-2xl",
  className,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  label?: string;
  aspect?: string;
  rounded?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={cn("relative overflow-hidden bg-stone-200", aspect, rounded, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {label && (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-palm-700/70 to-transparent" />
          <figcaption className="absolute bottom-3 left-4 z-10 text-xs font-medium tracking-wide text-linen-50/90">
            {label}
          </figcaption>
        </>
      )}
    </figure>
  );
}
