import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Scene } from "@/components/ui/Scene";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons/Icon";
import { nearby, site } from "@/lib/content";

const attractions: { name: string; distance: string; body: string }[] = [
  {
    name: "Thottada Beach",
    distance: "≈ 1.5 km",
    body: "Your closest stretch of coast: a quiet, cliff-backed cove of soft sand where locals still outnumber visitors. It is a beautiful spot for a slow sunrise walk, and swimmable in the calmer months. From the villa it is a short drive or a gentle cycle away.",
  },
  {
    name: "Muzhappilangad Drive-in Beach",
    distance: "≈ 15 km",
    body: "Asia's longest drive-in beach, a four-kilometre ribbon of firm golden sand you can actually drive along, and a Blue Flag beach known for its clean water. Come for the novelty, stay for the sunset and the fresh coconut water from the shacks.",
  },
  {
    name: "Payyambalam Beach",
    distance: "≈ 9 km",
    body: "Kannur's much-loved promenade beach, with landscaped lawns, a sculpture garden and one of the finest sunset views in North Kerala. An easy evening outing if you want a little more life around you.",
  },
  {
    name: "St. Angelo Fort",
    distance: "≈ 10 km",
    body: "A 16th-century Portuguese laterite fort standing over the Arabian Sea, with sweeping views of the fishing harbour and coastline. One of the most atmospheric heritage sites in the region and an easy half-day trip.",
  },
  {
    name: "Theyyam ritual (in season)",
    distance: "Seasonal",
    body: "North Kerala's ancient ritual theatre, where performers embody deities in vivid costume and firelight. The season runs roughly October to May, and it is one of the most moving things you can witness in Kerala. Ask us and we will help you find an authentic kavu (shrine) nearby.",
  },
  {
    name: "Kannur handloom & weavers",
    distance: "≈ 9 km",
    body: "Kannur is one of India's great handloom towns. Visit a working weaving society to watch the looms in motion and pick up genuine Kannur cotton, then wander the town's markets, cafes and the Arakkal Museum, home to Kerala's only former Muslim royal family.",
  },
];

export const metadata: Metadata = pageMeta("location", {
  title: "Location | Villa Near Kannur Beaches & Airport",
  description:
    "Othayoth Villa is minutes from Thottada and Payyambalam beaches and 30 km from Kannur Airport. See nearby North Kerala attractions and how to reach us.",
});

const reach: { icon: IconName; title: string; body: string }[] = [
  { icon: "map", title: "By air", body: "Kannur International Airport (CNN) is about 30 km away, a smooth 50-minute drive. Calicut (CCJ) is roughly 2.5 hours." },
  { icon: "arrow-right", title: "By train", body: "Kannur railway station is around 8 km away, well connected along the coastal line. We can arrange a pickup." },
  { icon: "car", title: "By road", body: "An easy drive along NH66. Secure parking for two to three cars is right at the villa gate." },
];

export default function LocationPage() {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Home", path: "/" }, { name: "Location", path: "/location" }])} />
      <PageHero
        eyebrow="Location"
        title="Kannur, at the pace of the backwaters"
        intro="North Kerala is the state before the crowds. Othayoth sits close to quiet beaches and living traditions, yet feels a world away."
        photo="mainGate"
      />

      {/* Map + address */}
      <Section tone="linen" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-stone-200/60">
              <Scene tone="palm" motif="palms" aspect="aspect-[16/10]" label="" rounded="" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex flex-col items-center gap-2 rounded-2xl bg-linen-50/90 px-6 py-4 text-center shadow-lift backdrop-blur-sm">
                  <Icon name="pin" size={24} className="text-brass-500" />
                  <span className="font-serif text-palm-600">Near Thottada Beach, Kannur</span>
                  <span className="text-xs text-stone-300">Map embed goes here at launch</span>
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Card className="h-full p-7">
              <p className="eyebrow mb-4">Find us</p>
              <p className="flex items-start gap-3 text-stone-400">
                <Icon name="pin" size={20} className="mt-0.5 shrink-0 text-brass-400" />
                {site.address}
              </p>
              <div className="mt-6 space-y-3 border-t border-stone-200/60 pt-6 text-sm">
                <a href={`tel:${site.phoneHref}`} className="flex items-center gap-3 text-palm-600 hover:text-palm-500">
                  <Icon name="phone" size={18} className="text-brass-400" /> {site.phoneDisplay}
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-palm-600 hover:text-palm-500">
                  <Icon name="mail" size={18} className="text-brass-400" /> {site.email}
                </a>
              </div>
              <p className="mt-6 rounded-xl bg-palm-500/8 p-4 text-sm leading-relaxed text-stone-400">
                The exact pin and gate directions are shared with confirmed guests
                in the stay portal, along with a live location link.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Nearby */}
      <Section tone="cream" size="lg">
        <SectionHeading
          eyebrow="Around the villa"
          title="Beaches, culture and calm, close by"
          align="center"
          className="mb-14"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <Card interactive className="flex h-full items-start justify-between gap-4 p-6">
                <div>
                  <h3 className="font-serif text-lg text-palm-600">{p.name}</h3>
                  <p className="mt-1 text-sm text-stone-400">{p.detail}</p>
                </div>
                <span className="shrink-0 rounded-full bg-brass-100 px-3 py-1 text-xs font-medium text-brass-500">
                  {p.distance}
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Explore North Kerala */}
      <Section tone="linen" size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Explore North Kerala"
            title="The best of Kannur, a short drive away"
            intro="One of the quiet joys of a villa stay in Kannur is how much sits within easy reach. Some of Kerala's best beaches, oldest rituals and warmest food are all close by, without the crowds of the south."
            align="center"
            className="mx-auto"
          />
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {attractions.map((a, i) => (
            <Reveal key={a.name} delay={i * 70}>
              <article className="h-full rounded-2xl border border-stone-200/60 bg-linen-50 p-6 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl text-palm-600">{a.name}</h3>
                  <span className="shrink-0 rounded-full bg-brass-100 px-3 py-1 text-xs font-medium text-brass-500">
                    {a.distance}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-stone-400">{a.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center leading-relaxed text-stone-400">
          Want the coast served at your own table instead? Our{" "}
          <Link href="/experiences" className="text-palm-600 underline decoration-brass-300 underline-offset-4 hover:decoration-brass-400">
            curated experiences
          </Link>{" "}
          bring a private chef, Malabar seafood and candlelight dinners to the villa, so you can
          explore North Kerala by day and come home to a quiet, private evening. When you are
          ready,{" "}
          <Link href="/book" className="text-palm-600 underline decoration-brass-300 underline-offset-4 hover:decoration-brass-400">
            check availability for your dates
          </Link>
          .
        </p>
      </Section>

      {/* How to reach */}
      <Section tone="palm" size="lg">
        <SectionHeading
          eyebrow="Getting here"
          title="Easy to reach, hard to leave"
          invert
          className="mb-14"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {reach.map((r, i) => (
            <Reveal key={r.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-linen-100/15 bg-linen-50/5 p-7 backdrop-blur-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brass-400/20 text-brass-200">
                  <Icon name={r.icon} size={20} />
                </span>
                <h3 className="mt-5 text-xl text-linen-50">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-linen-100/75">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
