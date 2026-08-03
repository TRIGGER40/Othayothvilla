import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Card, IconBadge } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/icons/Icon";
import { amenityGroups } from "@/lib/content";

export const metadata: Metadata = pageMeta("amenities", {
  title: "Amenities | Private Pool Villa in Kannur, Kerala",
  description:
    "Private pool, air-conditioning, smart TV, full kitchen, private chef, power backup, parking and daily housekeeping at Othayoth Villa in Kannur.",
});

export default function AmenitiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Home", path: "/" }, { name: "Amenities", path: "/amenities" }])} />
      <PageHero
        eyebrow="Amenities"
        title="Everything taken care of, quietly"
        intro="The comforts you expect and the small touches you do not, all in place before you arrive."
        tone="palm"
        motif="palms"
      />

      <Section tone="linen" size="lg">
        <SectionHeading
          eyebrow="What is included"
          title="Comfort in every corner"
          intro="Included with the whole-villa booking. Anything extra, just ask and we will arrange it."
          align="center"
          className="mb-14"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {amenityGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <Card interactive className="h-full p-7">
                <IconBadge name={group.icon as IconName} />
                <h3 className="mt-5 text-xl text-palm-600">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-stone-400">
                      <Icon name="check" size={17} className="mt-0.5 shrink-0 text-brass-400" />
                      <span className="text-[0.95rem]">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="cream" size="md">
        <div className="mx-auto max-w-2xl rounded-3xl border border-brass-300/40 bg-linen-50 p-8 text-center shadow-soft sm:p-12">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-brass-100 text-brass-500">
            <Icon name="hand" size={22} />
          </span>
          <h3 className="mt-5 text-2xl text-palm-600">Need something specific?</h3>
          <p className="mt-3 text-stone-400">
            A baby cot, a particular dietary need, an early arrival. Tell us ahead
            of time and we will have it ready and waiting.
          </p>
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
