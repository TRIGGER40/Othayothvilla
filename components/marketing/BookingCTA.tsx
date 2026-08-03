import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Bits";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/content";

export function BookingCTA() {
  return (
    <section className="bg-palm-600 text-linen-100">
      <div className="container-page py-20 text-center sm:py-28">
        <Reveal>
          <Divider className="mb-8 text-brass-300" />
          <p className="eyebrow mx-auto mb-5 justify-center text-brass-200">Reserve your dates</p>
          <h2 className="mx-auto max-w-2xl text-display-md text-balance text-linen-50">
            The whole villa, kept quietly for you
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-linen-100/80">
            Tell us your dates and who is coming. We will hold the home, plan the
            details and reply the same day.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/book" variant="brass" size="lg" icon="arrow-right">
              Check availability
            </ButtonLink>
            <ButtonLink
              href={`https://wa.me/${site.whatsapp}`}
              external
              variant="secondary"
              size="lg"
              icon="whatsapp"
              iconPosition="left"
              className="border-linen-100/25 bg-transparent text-linen-50 hover:bg-linen-50/10"
            >
              Message on WhatsApp
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
