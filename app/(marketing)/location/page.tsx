import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Scene } from "@/components/ui/Scene";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/icons/Icon";
import { nearby, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Location",
  description:
    "Othayoth Villa is minutes from Thottada Beach in Kannur, north Kerala. Nearby beaches, culture, how to reach and transport access.",
};

const reach: { icon: IconName; title: string; body: string }[] = [
  { icon: "map", title: "By air", body: "Kannur International Airport (CNN) is about 30 km away, a smooth 50-minute drive. Calicut (CCJ) is roughly 2.5 hours." },
  { icon: "arrow-right", title: "By train", body: "Kannur railway station is around 8 km away, well connected along the coastal line. We can arrange a pickup." },
  { icon: "car", title: "By road", body: "An easy drive along NH66. Secure parking for two to three cars is right at the villa gate." },
];

export default function LocationPage() {
  return (
    <>
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
