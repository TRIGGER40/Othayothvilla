import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/icons/Icon";
import { nearby, site } from "@/lib/content";
import { villaPhotos } from "@/lib/images";

const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`;

export const metadata: Metadata = pageMeta("location", {
  title: "Location | Riverside Villa Near Kannur, Kerala",
  description:
    "Othayoth Villa sits on the Valapattanam riverside in Varam, near Kannur. Minutes from backwater kayaking, Theyyam shrines, Payyambalam and Muzhappilangad beaches.",
});

const reach: { icon: IconName; title: string; body: string }[] = [
  // TODO: confirm these against an actual drive; the owner's local map does
  // not cover the airport or railway station.
  { icon: "map", title: "By air", body: "Kannur International Airport (CNN), roughly 19 km away. We can help arrange a pickup." },
  { icon: "arrow-right", title: "By train", body: "Kannur railway station, roughly 10 km away on the coastal line." },
  { icon: "car", title: "By road", body: "Via Varam-Kadangode Road, near O V Madhavan Stupam, with secure parking at the gate." },
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
              <div className="relative aspect-[16/10]">
                <Image
                  src={villaPhotos.satelliteMap.src}
                  alt={villaPhotos.satelliteMap.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-gentle group-hover:scale-105"
                />
              </div>
              {/* Corner badge, not centered, so the real pin and labels on the map stay visible */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-palm-700/70 via-palm-700/10 to-transparent p-4 sm:p-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-linen-50/95 px-4 py-2 text-sm shadow-lift backdrop-blur-sm transition-colors group-hover:bg-linen-50">
                  <Icon name="pin" size={16} className="shrink-0 text-brass-500" />
                  <span className="font-medium text-palm-600">Varam, near Kannur</span>
                  <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-brass-500">
                    Open in Maps <Icon name="arrow-up-right" size={12} />
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
              <p className="mt-4 text-sm leading-relaxed text-stone-400">
                See{" "}
                <Link href="/experiences" className="text-palm-600 underline decoration-brass-300 underline-offset-4 hover:decoration-brass-400">
                  curated experiences
                </Link>{" "}
                or{" "}
                <Link href="/book" className="text-palm-600 underline decoration-brass-300 underline-offset-4 hover:decoration-brass-400">
                  check availability
                </Link>
                .
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
