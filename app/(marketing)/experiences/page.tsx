import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Scene } from "@/components/ui/Scene";
import { Photo } from "@/components/ui/Photo";
import { experiences } from "@/lib/content";
import { villaPhotos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Private Kerala meals, candlelight dinners, seafood evenings, celebrations, wellness and local discovery at Othayoth Villa, Kannur.",
};

const toneFor: Record<string, "palm" | "monsoon" | "sand" | "brass"> = {
  palm: "palm",
  monsoon: "monsoon",
  sand: "sand",
  brass: "brass",
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="Kerala hospitality, arranged around you"
        intro="Curated, unhurried and entirely optional. Add what you like when you book, or decide once you have settled in."
        photo="privateSitout"
      />

      <Section tone="linen" size="lg">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, i) => (
            <Reveal key={exp.title} delay={i * 80}>
              <article className="group h-full overflow-hidden rounded-2xl border border-stone-200/60 bg-linen-50 shadow-soft transition-all duration-500 ease-gentle hover:-translate-y-1 hover:shadow-lift">
                {exp.photo ? (
                  <Photo
                    src={villaPhotos[exp.photo].src}
                    alt={villaPhotos[exp.photo].alt}
                    aspect="aspect-[16/10]"
                    rounded=""
                    className="transition-transform duration-700 ease-gentle group-hover:scale-105"
                  />
                ) : (
                  <Scene
                    tone={toneFor[exp.tone]}
                    label=""
                    aspect="aspect-[16/10]"
                    rounded=""
                    className="transition-transform duration-700 ease-gentle group-hover:scale-105"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl text-palm-600">{exp.title}</h3>
                  <p className="mt-2 leading-relaxed text-stone-400">{exp.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="cream" size="md">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Slow travel"
            title="No fixed schedule, ever"
            intro="Everything here bends to your pace. Book experiences ahead so we can prepare, or simply ask your host once you arrive. Nothing is compulsory, and nothing is rushed."
            align="center"
          />
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
