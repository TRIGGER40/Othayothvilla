import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbList, faqPage } from "@/lib/schema";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { faqs, site } from "@/lib/content";

export const metadata: Metadata = pageMeta("faq", {
  title: "FAQ | Booking a Pool Villa in Kannur, Kerala",
  description:
    "Answers on check-in, the private pool, food, extra guests, children, pets, cancellation, parking and power backup at Othayoth Villa in Kannur.",
});

const order = ["Stay", "Pool", "Food", "Guests", "Booking", "Practical"];

export default function FAQPage() {
  const groups = order
    .map((g) => ({ group: g, items: faqs.filter((f) => f.group === g) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])} />
      <JsonLd data={faqPage()} />
      <PageHero
        eyebrow="FAQ"
        title="Everything you might want to ask"
        intro="The practical details, answered simply. If anything is still unclear, we are a message away."
        photo="windowDetail"
      />

      <Section tone="linen" size="lg">
        <div className="mx-auto max-w-3xl space-y-12">
          {groups.map((g, i) => (
            <Reveal key={g.group} delay={i * 60}>
              <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-brass-500">
                <span className="h-px w-6 bg-brass-300" />
                {g.group}
              </h2>
              <Accordion items={g.items.map((f) => ({ q: f.q, a: f.a }))} />
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-stone-200/60 bg-linen-50 p-8 text-center shadow-soft">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-palm-500/10 text-palm-500">
            <Icon name="hand" size={22} />
          </span>
          <h3 className="mt-5 text-2xl text-palm-600">Still have a question?</h3>
          <p className="mt-3 text-stone-400">
            We are happy to help you plan. Reach us any way that suits you.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" icon="arrow-right">
              Contact us
            </ButtonLink>
            <ButtonLink
              href={`https://wa.me/${site.whatsapp}`}
              external
              variant="secondary"
              icon="whatsapp"
              iconPosition="left"
            >
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
