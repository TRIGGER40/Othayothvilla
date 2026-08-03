import Image from "next/image";
import type { ReactNode } from "react";
import { Scene } from "@/components/ui/Scene";
import { Reveal } from "@/components/ui/Reveal";
import { villaPhotos, type VillaPhotoKey } from "@/lib/images";

/**
 * Interior-page hero: a calm banner with a photo backdrop when a real photo
 * matches the page, otherwise the abstract Scene placeholder.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  tone = "palm",
  motif = "auto",
  photo,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  tone?: "palm" | "monsoon" | "sand" | "brass";
  motif?: "palms" | "water" | "arch" | "sun" | "auto";
  /** Real photo key. When present, replaces the abstract Scene backdrop. */
  photo?: VillaPhotoKey;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      {photo ? (
        <Image
          src={villaPhotos[photo].src}
          alt={villaPhotos[photo].alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
      ) : (
        <Scene
          tone={tone}
          motif={motif}
          aspect=""
          rounded=""
          className="absolute inset-0 h-full w-full"
          label=""
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-palm-700/70 via-palm-600/30 to-transparent" />
      <div className="container-page relative flex min-h-[52vh] flex-col justify-end pb-14 pt-28 sm:min-h-[58vh] sm:pb-20 sm:pt-36">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4 text-brass-200">{eyebrow}</p>
          <h1 className="text-display-lg text-balance text-linen-50">{title}</h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-linen-100/85 text-pretty">
              {intro}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
