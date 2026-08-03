import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Scene } from "@/components/ui/Scene";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/icons/Icon";
import { nearby, site } from "@/lib/content";

const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`;

/**
 * Distances/times for the first six entries come from the owner's own
 * illustrated local map (Varam Kadavu, Kattampally, Parassinikadavu,
 * Payyambalam, St. Angelo Fort, Muzhappilangad, Neeliyar Kottam). Airport
 * and railway distances are not on that map and are marked approximate below
 * until confirmed against an actual drive.
 */
const attractions: { name: string; distance: string; duration?: string; body: string }[] = [
  {
    name: "Varam Kadavu",
    distance: "≈ 2.5 km",
    duration: "4 min",
    body: "A scenic ferry crossing and riverside walk on the Valapattanam, right by the villa. The easiest way to feel the backwater side of Kannur before you have even unpacked.",
  },
  {
    name: "Kattampally Backwater Kayaking",
    distance: "≈ 8.5 km",
    duration: "16 min",
    body: "Quiet paddy-fringed canals just outside Kannur town, best explored slowly by kayak. A gentle, uncrowded way to spend a morning on the water.",
  },
  {
    name: "Parassinikadavu Sri Muthappan Temple",
    distance: "≈ 14.8 km",
    duration: "20 min",
    body: "A riverside shrine on the Valapattanam famed for its daily rituals and the Theyyam-inspired worship of Muthappan. One of North Kerala's most distinctive living traditions, and open to visitors year-round.",
  },
  {
    name: "Payyambalam Beach",
    distance: "≈ 10.5 km",
    duration: "20 min",
    body: "Kannur's much-loved promenade beach, with landscaped lawns, a sculpture garden and one of the finest sunset views in North Kerala.",
  },
  {
    name: "St. Angelo Fort",
    distance: "≈ 10.5 km",
    duration: "20 min",
    body: "A 16th-century Portuguese laterite fort standing over the Arabian Sea, close to Payyambalam, with sweeping views of the fishing harbour and coastline.",
  },
  {
    name: "Muzhappilangad Drive-in Beach",
    distance: "≈ 16 km",
    duration: "30 min",
    body: "Asia's longest drive-in beach, a four-kilometre ribbon of firm golden sand you can actually drive along. Come for the novelty, stay for the sunset.",
  },
  {
    name: "Neeliyar Kottam",
    distance: "≈ 20 km",
    duration: "36 min",
    body: "A Theyyam performance shrine, where performers embody deities in vivid costume and firelight. The season runs roughly October to May and is one of the most moving things you can witness in Kerala. Ask us and we will help you time a visit around a real ritual.",
  },
];

export const metadata: Metadata = pageMeta("location", {
  title: "Location | Riverside Villa Near Kannur, Kerala",
  description:
    "Othayoth Villa sits on the Valapattanam riverside in Varam, near Kannur. Minutes from backwater kayaking, Theyyam shrines, Payyambalam and Muzhappilangad beaches.",
});

const reach: { icon: IconName; title: string; body: string }[] = [
  // TODO: confirm these against an actual drive; the owner's local map does
  // not cover the airport or railway station.
  { icon: "map", title: "By air", body: "Kannur International Airport (CNN) is roughly 19 km away, an approximate 30-minute drive. We can help arrange a pickup." },
  { icon: "arrow-right", title: "By train", body: "Kannur railway station is roughly 10 km away, well connected along the coastal line. We can arrange a pickup." },
  { icon: "car", title: "By road", body: "Reached via Varam-Kadangode Road, near O V Madhavan Stupam. Secure parking for two to three cars is right at the villa gate." },
];

export default function LocationPage() {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Home", path: "/" }, { name: "Location", path: "/location" }])} />
      <PageHero
        eyebrow="Location"
        title="Varam, Kannur, at the pace of the backwaters"
        intro="Othayoth sits on the Valapattanam riverside in Varam, north of Kannur town. Close to kayaking canals, Theyyam shrines and quiet beaches, yet a world away from the crowds."
        photo="mainGate"
      />

      {/* Map + address */}
      <Section tone="linen" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          <Reveal>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-3xl border border-stone-200/60"
            >
              <Scene tone="palm" motif="palms" aspect="aspect-[16/10]" label="" rounded="" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex flex-col items-center gap-2 rounded-2xl bg-linen-50/90 px-6 py-4 text-center shadow-lift backdrop-blur-sm transition-colors group-hover:bg-linen-50">
                  <Icon name="pin" size={24} className="text-brass-500" />
                  <span className="font-serif text-palm-600">Varam, near Kannur</span>
                  <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-brass-500">
                    Open in Google Maps <Icon name="arrow-up-right" size={14} />
                  </span>
                </span>
              </div>
            </a>
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
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-palm-600 hover:text-palm-500">
                  <Icon name="whatsapp" size={18} className="text-brass-400" /> WhatsApp us
                </a>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-palm-600 hover:text-palm-500">
                  <Icon name="map" size={18} className="text-brass-400" /> Get directions
                </a>
              </div>
              <p className="mt-6 rounded-xl bg-palm-500/8 p-4 text-sm leading-relaxed text-stone-400">
                Exact gate directions and a live location link are shared with
                confirmed guests in the stay portal.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Nearby */}
      <Section tone="cream" size="lg">
        <SectionHeading
          eyebrow="Around the villa"
          title="Backwaters, beaches and Theyyam heritage, close by"
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
                <span className="shrink-0 rounded-full bg-brass-100 px-3 py-1 text-right text-xs font-medium text-brass-500">
                  {p.distance}
                  {p.duration && <span className="mt-0.5 block text-brass-400">{p.duration}</span>}
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
            intro="One of the quiet joys of staying in Varam is how much sits within easy reach. Backwater canals, Theyyam shrines and some of Kerala's best beaches are all close by, without the crowds of the south."
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
                  <span className="shrink-0 rounded-full bg-brass-100 px-3 py-1 text-right text-xs font-medium text-brass-500">
                    {a.distance}
                    {a.duration && <span className="mt-0.5 block text-brass-400">{a.duration}</span>}
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
