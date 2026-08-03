import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/marketing/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual tour of Othayoth Villa, a private pool villa in Kannur: exteriors, the pool, interiors, dining, details and ambience.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The villa, in its many moods"
        intro="Morning light on the water, teak and cane inside, lamps along the garden wall at night. Filter by what you would like to see."
        tone="brass"
        motif="sun"
      />

      <Section tone="linen" size="lg">
        <GalleryGrid filterable />
        <p className="mt-10 text-center text-sm text-stone-300">
          Placeholder visuals shown during build. Replace with photography before launch.
        </p>
      </Section>

      <BookingCTA />
    </>
  );
}
