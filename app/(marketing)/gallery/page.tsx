import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/marketing/GalleryGrid";

export const metadata: Metadata = pageMeta("gallery", {
  title: "Gallery | Othayoth Pool Villa in Kannur, Kerala",
  description:
    "Photo gallery of Othayoth Villa in Kannur: the private pool, gardens, living spaces, kitchen and dusk-lit exteriors of this boutique Kerala pool villa.",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])} />
      <PageHero
        eyebrow="Gallery"
        title="The villa, in its many moods"
        intro="Morning light on the water, teak and cane inside, lamps along the garden wall at night. Filter by what you would like to see."
        tone="brass"
        motif="sun"
      />

      <Section tone="linen" size="lg">
        <p className="mx-auto mb-10 max-w-2xl text-center leading-relaxed text-stone-400">
          A look inside Othayoth Villa, our private pool villa in Kannur, Kerala. From the
          dusk-lit exterior and gated entrance to the living spaces, kitchen and the private
          pool, these are real photographs of the home you book whole. Explore the{" "}
          <Link href="/rooms" className="text-palm-600 underline decoration-brass-300 underline-offset-4 hover:decoration-brass-400">
            rooms and spaces
          </Link>{" "}
          and{" "}
          <Link href="/amenities" className="text-palm-600 underline decoration-brass-300 underline-offset-4 hover:decoration-brass-400">
            amenities
          </Link>{" "}
          in more detail.
        </p>
        <GalleryGrid filterable />
      </Section>

      <BookingCTA />
    </>
  );
}
