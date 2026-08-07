import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { FeatureCard } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/icons/Icon";
import { villaPhotos } from "@/lib/images";

export const metadata: Metadata = pageMeta("villa", {
  title: "The Villa | Private Pool Villa in Kannur, Kerala",
  description:
    "Discover Othayoth Villa, a boutique 2-bedroom private pool villa in Kannur. Natural materials, total privacy and a whole home for couples, families and friends.",
});

const idealGuests: { icon: IconName; title: string; body: string }[] = [
  { icon: "leaf", title: "Couples", body: "A private, romantic retreat for slow days and candlelit nights by the pool." },
  { icon: "users", title: "Families", body: "Room for grandparents and children alike, with a garden and pool to roam." },
  { icon: "sparkle", title: "Friends", body: "A whole home for a gathering, with space to be together and to slip away." },
  { icon: "star", title: "Celebrations", body: "Anniversaries, birthdays and reunions, set with care and left to you." },
];

export default function VillaPage() {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Home", path: "/" }, { name: "The Villa", path: "/villa" }])} />
      <PageHero
        eyebrow="The Villa"
        title="A home built around water, light and quiet"
        intro="Othayoth Villa was made slowly, the way the coast likes things. Natural materials, generous shade, and a pool at its heart."
        photo="gardenWalkway"
      />

      {/* Story */}
      <Section tone="linen" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-5">Our story</p>
            <h2 className="text-display-md text-balance text-palm-600">
              A name this land has always carried
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-400">
              <p>
                Othayoth is our family&rsquo;s tharavad name. We are a
                prestigious, traditional Nair landed gentry (tharavad) deeply
                rooted in the socio-cultural and ritualistic heritage of North
                Malabar. Under the historical matrilineal (Marumakkathayam)
                system, we managed extensive ancestral estates across the Varam
                and Kadangode regions, serving as respected community
                administrators and village-level leaders. Our ancestral
                tharavadu stands right next to this villa, built in the 1950s,
                and the older family home, a kilometre up the road, dates back
                to the 1800s. We still gather there every year for our Theyyam
                ritual.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="grid gap-4">
            <Photo
              src={villaPhotos.familyArchive1930s.src}
              alt={villaPhotos.familyArchive1930s.alt}
              label="Our great-grandmother, 1930s"
              aspect="aspect-[5/4]"
            />
            <div className="grid grid-cols-2 gap-4">
              <Photo
                src={villaPhotos.familyArchive1935.src}
                alt={villaPhotos.familyArchive1935.alt}
                label="Our grandmother, 1935"
                aspect="aspect-square"
              />
              <Photo
                src={villaPhotos.familyArchive1970s.src}
                alt={villaPhotos.familyArchive1970s.alt}
                label="Two generations, 1970s"
                aspect="aspect-square"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Design & atmosphere */}
      <Section tone="palm" size="lg">
        <SectionHeading
          eyebrow="Design & atmosphere"
          title="Natural materials, unhurried spaces"
          intro="Every room is designed to feel calm and cool, to hold the light gently and to open toward the green."
          invert
          className="mb-14"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "leaf" as IconName, title: "Teak, cane & linen", body: "Honest materials that age beautifully and feel good to the touch." },
            { icon: "pool" as IconName, title: "Water at the centre", body: "The pool and its reflections anchor the whole home." },
            { icon: "wind" as IconName, title: "Cool and cross-lit", body: "High ceilings, deep verandas and shutters that catch the sea breeze." },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-linen-100/15 bg-linen-50/5 p-7 backdrop-blur-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brass-400/20 text-brass-200">
                  <Icon name={f.icon} size={20} />
                </span>
                <h3 className="mt-5 text-xl text-linen-50">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-linen-100/75">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Privacy */}
      <Section tone="linen" size="lg">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Photo
              src={villaPhotos.mainGate.src}
              alt={villaPhotos.mainGate.alt}
              label="Screened and private"
              aspect="aspect-[4/3]"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mb-5">Privacy & exclusivity</p>
            <h2 className="text-display-md text-balance text-palm-600">
              The whole villa, only ever yours
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-400">
              Othayoth is never shared. When you book, the entire home, garden and
              pool belong to your group alone. The property is gated and screened
              by planting, so the pool deck and veranda stay completely private.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Sole use of the entire villa and grounds",
                "Gated entry with private, secure parking",
                "Pool and garden screened from every side",
                "Staff who help when needed and stay out of sight",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-stone-400">
                  <Icon name="check" size={18} className="mt-1 shrink-0 text-brass-400" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Ideal guests */}
      <Section tone="cream" size="lg">
        <SectionHeading
          eyebrow="Who it is for"
          title="Made for the people you bring"
          align="center"
          className="mb-14"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {idealGuests.map((g, i) => (
            <Reveal key={g.title} delay={i * 90}>
              <FeatureCard icon={g.icon} title={g.title}>
                {g.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
