import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Scene } from "@/components/ui/Scene";
import { Photo } from "@/components/ui/Photo";
import { Icon, type IconName } from "@/components/icons/Icon";
import { villaPhotos, type VillaPhotoKey } from "@/lib/images";

export const metadata: Metadata = pageMeta("stay-experience", {
  title: "Stay Experience | Pool Villa in Kannur, Kerala",
  description:
    "The Othayoth stay experience in Kannur: a private pool, indoor-outdoor living, Kerala dining, wellness and rainy-day calm. Days that ask nothing of you.",
});

const moments: {
  icon: IconName;
  title: string;
  body: string;
  tone: "palm" | "monsoon" | "sand" | "brass";
  motif: "palms" | "water" | "arch" | "sun";
  /** Real photo key, when one exists that is not already used elsewhere on this page. */
  photo?: VillaPhotoKey;
}[] = [
  {
    icon: "pool",
    title: "The private pool",
    body: "The heart of the home. Swim at dawn, drift through the afternoon, or sit at the water's edge as the light softens. It is only ever yours.",
    tone: "monsoon",
    motif: "water",
    photo: "privatePool",
  },
  {
    icon: "leaf",
    title: "Indoor and outdoor living",
    body: "Cool teak-and-linen living rooms flow to shaded verandas and a walled garden, so you are always a step from the open air.",
    tone: "palm",
    motif: "palms",
    photo: "livingDining",
  },
  {
    icon: "utensils",
    title: "Dining moments",
    body: "Sadya on banana leaf, Malabar seafood, breakfast by the pool. Cook in the full kitchen or let us arrange it for you.",
    tone: "brass",
    motif: "sun",
    photo: "kitchen",
  },
  {
    icon: "wind",
    title: "Relaxation and wellness",
    body: "Yoga on the deck, an in-villa Ayurvedic massage, and the deep quiet that lets you actually rest.",
    tone: "sand",
    motif: "arch",
    photo: "poolYoga",
  },
  {
    icon: "sparkle",
    title: "Celebration-ready",
    body: "Tell us the occasion and we will set the scene with flowers, lights and a cake, then leave the evening to you.",
    tone: "brass",
    motif: "sun",
    photo: "celebration",
  },
  {
    icon: "book",
    title: "Rainy-day comfort",
    body: "When the monsoon arrives, the villa is at its most beautiful. Rain on the tiles, warm light inside, and nowhere you need to be.",
    tone: "monsoon",
    motif: "water",
    photo: "livingRoom",
  },
];

export default function StayExperiencePage() {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Home", path: "/" }, { name: "Stay Experience", path: "/stay-experience" }])} />
      <PageHero
        eyebrow="Stay Experience"
        title="Days that ask nothing of you"
        intro="From the first filter coffee to the last brass lamp at night, the day is yours to shape, or simply to let drift."
        photo="poolYoga"
      />

      <Section tone="linen" size="lg">
        <div className="space-y-16 sm:space-y-24">
          {moments.map((m, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={m.title}>
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className={flip ? "lg:order-2" : ""}>
                    {m.photo ? (
                      <Photo
                        src={villaPhotos[m.photo].src}
                        alt={villaPhotos[m.photo].alt}
                        label={m.title}
                        aspect="aspect-[4/3]"
                      />
                    ) : (
                      <Scene tone={m.tone} motif={m.motif} label={m.title} aspect="aspect-[4/3]" />
                    )}
                  </div>
                  <div className={flip ? "lg:order-1" : ""}>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-palm-500/10 text-palm-500">
                      <Icon name={m.icon} size={22} />
                    </span>
                    <h2 className="mt-5 text-display-md text-palm-600">{m.title}</h2>
                    <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-400">{m.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Local cultural touches */}
      <Section tone="palm" size="lg">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Local cultural touches"
              title="North Kerala, woven gently in"
              intro="Small, honest details that place you firmly in Kannur, never staged, never touristy."
              invert
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Kannur handloom linens and throws",
              "Brass lamps lit at dusk along the veranda",
              "Filter coffee and banana-leaf breakfasts",
              "Theyyam season guidance when it falls",
              "Toddy-shop seafood, if you are curious",
              "Coir, cane and terracotta throughout",
            ].map((item, i) => (
              <Reveal key={item} delay={i * 70}>
                <div className="flex items-start gap-3 rounded-2xl border border-linen-100/15 bg-linen-50/5 p-5 text-linen-100/85 backdrop-blur-sm">
                  <Icon name="leaf" size={18} className="mt-0.5 shrink-0 text-brass-300" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
