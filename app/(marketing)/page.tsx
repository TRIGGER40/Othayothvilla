import Link from "next/link";
import { HomeHero } from "@/components/marketing/HomeHero";
import { Reviews } from "@/components/marketing/Reviews";
import { GalleryGrid } from "@/components/marketing/GalleryGrid";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Bits";
import { Scene } from "@/components/ui/Scene";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/icons/Icon";
import { highlights, experienceHighlights, faqs, nearby } from "@/lib/content";
import { villaPhotos } from "@/lib/images";

export default function HomePage() {
  return (
    <>
      <HomeHero />

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
                Behind a green wall of coconut and areca, minutes from Thottada&rsquo;s
                soft-sand coves, Othayoth Villa is a four-bedroom home built around a
                private pool and a slow way of being.
              </p>
              <p>
                It is yours entirely for the length of your stay. Whether you come
                as a couple, a family or a gathering of friends, the door closes
                on the world and the coast takes over.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink href="/villa" variant="secondary" icon="arrow-right">
                The story of the villa
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

      {/* Featured gallery */}
      <Section tone="linen" size="lg">
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
            <Scene tone="brass" motif="sun" label="North Kerala coast" aspect="aspect-[4/3]" />
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
            {faqs.slice(0, 4).map((f) => (
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
