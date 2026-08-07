import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { HomeHero } from "@/components/marketing/HomeHero";
import { Reviews } from "@/components/marketing/Reviews";
import { GalleryGrid } from "@/components/marketing/GalleryGrid";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Bits";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/icons/Icon";
import { highlights, experienceHighlights, faqs, nearby } from "@/lib/content";
import { villaPhotos } from "@/lib/images";

export const metadata: Metadata = pageMeta("home", {
  title: "Private Pool Villa in Kannur, Kerala | Othayoth Villa",
  description:
    "Othayoth Villa is a boutique private pool villa in Kannur, Kerala. Book the whole 2-bedroom home in Varam for families and couples. Same-day availability.",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Quick facts strip */}
      <Section tone="cream" size="sm">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center">
          {[
            { icon: "pool", label: "Private pool" },
            { icon: "key", label: "Whole villa, exclusively" },
            { icon: "users", label: "Sleeps 6" },
            { icon: "pin", label: "9 km from Kannur town" },
            { icon: "map", label: "Near beaches & forts" },
            { icon: "wifi", label: "Wi-Fi" },
            { icon: "car", label: "Free parking" },
            { icon: "sparkle", label: "Curated experiences" },
          ].map((f) => (
            <li key={f.label} className="flex items-center gap-2 text-sm font-medium text-palm-600">
              <Icon name={f.icon as IconName} size={16} className="text-brass-400" />
              {f.label}
            </li>
          ))}
        </ul>
      </Section>

      {/* Intro / summary */}
      <Section tone="linen" size="lg">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-5">Welcome to Othayoth</p>
            <h2 className="text-display-md text-balance text-palm-600">
              A quiet home by the coast, kept for one group at a time
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-400">
              <p>
                Othayoth Villa is a two-bedroom{" "}
                <Link href="/rooms" className="text-palm-600 underline decoration-brass-300 underline-offset-4 hover:decoration-brass-400">
                  private pool villa in Kannur
                </Link>
                , in Varam near Kannur. Book the whole home, garden and pool for
                your group alone, couples, families or friends.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/villa" variant="secondary" icon="arrow-right">
                The story of the villa
              </ButtonLink>
              <ButtonLink href="/amenities" variant="ghost">
                See amenities
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <Photo
              src={villaPhotos.poolYoga.src}
              alt={villaPhotos.poolYoga.alt}
              label="The private pool"
              className="col-span-2"
              aspect="aspect-[16/10]"
            />
            <Photo
              src={villaPhotos.livingRoom.src}
              alt={villaPhotos.livingRoom.alt}
              label="Living room"
              aspect="aspect-square"
            />
            <Photo
              src={villaPhotos.gardenWalkway.src}
              alt={villaPhotos.gardenWalkway.alt}
              label="Garden"
              aspect="aspect-square"
            />
          </Reveal>
        </div>
      </Section>

      {/* Highlights */}
      <Section tone="cream" size="lg">
        <SectionHeading
          eyebrow="Why guests choose us"
          title="Small things, done with real care"
          intro="Everything here is designed for privacy, comfort and a genuine sense of place."
          align="center"
          className="mb-14"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 90}>
              <FeatureCard icon={h.icon as IconName} title={h.title}>
                {h.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Local SEO / context prose */}
      <Section tone="linen" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why Othayoth"
              title="A private pool villa in Kannur, made for the people you bring"
            />
            <ul className="mt-6 space-y-3 text-stone-400">
              <li>
                In Varam, near Kannur, minutes from{" "}
                <Link href="/location" className="text-palm-600 underline decoration-brass-300 underline-offset-4 hover:decoration-brass-400">
                  backwater kayaking, Theyyam shrines and Payyambalam beach
                </Link>
                , ≈19 km from Kannur Airport (CNN).
              </li>
              <li>
                Hosted, never crowded. Sadya, seafood dinners and candlelight
                evenings, arranged through{" "}
                <Link href="/stay-experience" className="text-palm-600 underline decoration-brass-300 underline-offset-4 hover:decoration-brass-400">
                  the stay experience
                </Link>{" "}
                and{" "}
                <Link href="/experiences" className="text-palm-600 underline decoration-brass-300 underline-offset-4 hover:decoration-brass-400">
                  curated experiences
                </Link>
                .
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-stone-200/60 bg-linen-50 p-7 shadow-soft">
              <h3 className="text-sm uppercase tracking-widest text-brass-500">At a glance</h3>
              <dl className="mt-5 space-y-3 text-sm">
                {[
                  ["Property", "Whole 2-bedroom pool villa"],
                  ["Sleeps", "Up to 6 guests"],
                  ["Pool", "Private, screened, yours only"],
                  ["Payyambalam Beach", "≈ 10.5 km"],
                  ["Kannur Airport (CNN)", "≈ 19 km"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4 border-b border-stone-200/50 pb-3 last:border-0 last:pb-0">
                    <dt className="text-stone-400">{k}</dt>
                    <dd className="text-right font-medium text-palm-600">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6">
                <ButtonLink href="/book" variant="primary" icon="arrow-right" className="w-full">
                  Check availability
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Featured gallery */}
      <Section tone="cream" size="lg">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="A first look"
            title="Light, water, teak and green"
            intro="A glimpse of the villa and its moods. See the full gallery for more."
          />
          <ButtonLink href="/gallery" variant="ghost" icon="arrow-right" className="shrink-0">
            View full gallery
          </ButtonLink>
        </div>
        <GalleryGrid filterable={false} limit={6} />
      </Section>

      {/* Experience highlights */}
      <Section tone="palm" size="lg">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="The stay experience"
              title="Days that ask nothing of you"
              intro="From the first coffee to the last lamp lit at night, the day is yours to shape or to let drift."
              invert
            />
            <div className="mt-8">
              <ButtonLink
                href="/stay-experience"
                variant="brass"
                icon="arrow-right"
              >
                Explore the experience
              </ButtonLink>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {experienceHighlights.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-linen-100/15 bg-linen-50/5 p-6 backdrop-blur-sm">
                  <Icon name="leaf" size={20} className="text-brass-300" />
                  <h3 className="mt-4 text-lg text-linen-50">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-linen-100/75">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Reviews */}
      <Section tone="cream" size="lg">
        <SectionHeading
          eyebrow="From our guests"
          title="Kind words, quietly earned"
          align="center"
          className="mb-14"
        />
        <Reviews />
      </Section>

      {/* Location teaser */}
      <Section tone="linen" size="lg">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <Photo
              src={villaPhotos.northKeralaCoast.src}
              alt={villaPhotos.northKeralaCoast.alt}
              label="North Kerala coast"
              aspect="aspect-[4/3]"
            />
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <p className="eyebrow mb-5">Where you are</p>
            <h2 className="text-display-md text-balance text-palm-600">
              Kannur, at the pace of the backwaters
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-400">
              North Kerala is the state before the crowds. Quiet beaches, living
              traditions and warm, unhurried people. Othayoth sits close to it all,
              yet feels a world away.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {nearby.slice(0, 4).map((p) => (
                <li key={p.name} className="flex items-start gap-3 rounded-xl border border-stone-200/60 bg-linen-50 p-3">
                  <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-brass-400" />
                  <span>
                    <span className="block text-sm font-medium text-ink">{p.name}</span>
                    <span className="text-xs text-stone-300">{p.distance}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/location" variant="secondary" icon="arrow-right">
                Explore the location
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ teaser */}
      <Section tone="cream" size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Divider className="mb-8" />
          <SectionHeading
            eyebrow="Good to know"
            title="Questions, answered simply"
            align="center"
            className="mb-10"
          />
          <ul className="mx-auto grid max-w-2xl gap-3 text-left">
            {faqs.slice(0, 3).map((f) => (
              <li key={f.q}>
                <Link
                  href="/faq"
                  className="flex items-center justify-between gap-4 rounded-xl border border-stone-200/60 bg-linen-50 px-5 py-4 transition-colors hover:border-brass-300/60"
                >
                  <span className="font-serif text-palm-600">{f.q}</span>
                  <Icon name="arrow-up-right" size={18} className="shrink-0 text-brass-400" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href="/faq" variant="ghost" icon="arrow-right">
              Read all FAQs
            </ButtonLink>
          </div>
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
