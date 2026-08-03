import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/icons/Icon";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Othayoth Villa, a boutique private pool villa in Kannur, Kerala. Call, WhatsApp or email us to plan your stay.",
};

const channels: { icon: IconName; label: string; value: string; href: string; external?: boolean }[] = [
  { icon: "whatsapp", label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${site.whatsapp}`, external: true },
  { icon: "phone", label: "Call", value: site.phoneDisplay, href: `tel:${site.phoneHref}` },
  { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you"
        intro="Planning a stay, or simply have a question. Reach us any way that suits you, and a real person will reply."
        tone="palm"
        motif="palms"
      />

      <Section tone="linen" size="lg">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-display-md text-palm-600">Get in touch</h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-400">
              For the fastest reply, message us on WhatsApp. We are happy to help
              with dates, planning and any special requests.
            </p>

            <div className="mt-8 grid gap-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-stone-200/60 bg-linen-50 p-5 transition-colors hover:border-brass-300/60"
                >
                  <span className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-palm-500/10 text-palm-500">
                      <Icon name={c.icon} size={20} />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-widest text-stone-300">{c.label}</span>
                      <span className="font-medium text-palm-600">{c.value}</span>
                    </span>
                  </span>
                  <Icon name="arrow-up-right" size={20} className="text-brass-400 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-palm-500/8 p-5 text-sm text-stone-400">
              <Icon name="pin" size={20} className="mt-0.5 shrink-0 text-brass-400" />
              {site.address}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
