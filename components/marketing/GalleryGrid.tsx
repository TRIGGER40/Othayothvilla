"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { gallery, type GalleryImage } from "@/lib/content";
import { villaPhotos } from "@/lib/images";
import { cn } from "@/lib/utils";

// A gentle mosaic rhythm so the grid does not feel like uniform tiles.
const spans = ["", "sm:row-span-2", "", "sm:col-span-2", "", "", "sm:row-span-2", "", "", "sm:col-span-2", "", ""];

export function GalleryGrid({ filterable = true, limit }: { filterable?: boolean; limit?: number }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(gallery.map((g) => g.category)))],
    [],
  );
  const [active, setActive] = useState<string>("All");

  const items: GalleryImage[] = useMemo(() => {
    const base = active === "All" ? gallery : gallery.filter((g) => g.category === active);
    return limit ? base.slice(0, limit) : base;
  }, [active, limit]);

  return (
    <div>
      {filterable && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-all duration-300",
                active === c
                  ? "border-palm-600 bg-palm-600 text-linen-50"
                  : "border-stone-200 text-stone-400 hover:border-palm-500/40 hover:text-palm-600",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((img, i) => {
          const photo = villaPhotos[img.photo];
          return (
            <figure
              key={img.id}
              className={cn("group relative overflow-hidden rounded-2xl", spans[i % spans.length])}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-gentle group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-palm-700/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4 text-linen-50">
                <span className="text-sm">{img.caption}</span>
                <span className="rounded-full bg-linen-50/15 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-widest backdrop-blur-sm">
                  {img.category}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
