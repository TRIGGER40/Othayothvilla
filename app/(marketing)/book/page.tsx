import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingForm } from "@/components/marketing/BookingForm";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/icons/Icon";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Check Availability",
  description:
    "Request dates for Othayoth, a private pool villa in Kannur. Tell us your dates and guests and we will reply the same day.",
};

const assurances: { icon: IconName; title: string; body: string }[] = [
  { icon: "check", title: "Same-day reply", body: "We confirm availability the same day, usually within a few hours." },
  { icon: "shield", title: "No payment now", body: "Request first. We hold your dates and share simple, secure payment after." },
  { icon: "hand", title: "A real person", body: "You will speak with your host, not a call centre. We plan the details with you." },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Check Availability"
        title="Tell us your dates"
        intro="Share when you would like to come and who is joining. We will hold the villa and reply the same day."
        tone="monsoon"
        motif="water"
      />

      <Section tone="linen" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <BookingForm />
          </Reveal>

          <Reveal delay={120}>
            <div className="lg:sticky lg:top-28">
              <h2 className="text-display-md text-palm-600">Booking, made simple</h2>
              <p className="mt-4 text-lg leading-relaxed text-stone-400">
                Othayoth is booked as a whole villa. Once your dates are confirmed,
                the entire home is yours.
              </p>

              <ul className="mt-8 space-y-4">
                {assurances.map((a) => (
                  <li key={a.title} className="flex items-start gap-4 rounded-2xl border border-stone-200/60 bg-linen-50 p-5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-palm-500/10 text-palm-500">
                      <Icon name={a.icon} size={18} />
                    </span>
                    <span>
                      <span className="block font-medium text-ink">{a.title}</span>
                      <span className="text-sm text-stone-400">{a.body}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl bg-palm-600 p-6 text-linen-100">
                <p className="text-sm uppercase tracking-widest text-brass-200">Prefer to talk?</p>
                <div className="mt-4 flex flex-col gap-3">
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-linen-50 hover:text-brass-200">
                    <Icon name="whatsapp" size={20} className="text-brass-300" /> WhatsApp us
                  </a>
                  <a href={`tel:${site.phoneHref}`} className="flex items-center gap-3 text-linen-50 hover:text-brass-200">
                    <Icon name="phone" size={20} className="text-brass-300" /> {site.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
