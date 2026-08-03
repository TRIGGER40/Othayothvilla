import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { site } from "@/lib/content";
import { villaPhotos } from "@/lib/images";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Photo backdrop */}
      <div className="absolute inset-0">
        <Image
          src={villaPhotos.exteriorDusk.src}
          alt={villaPhotos.exteriorDusk.alt}
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-palm-700/85 via-palm-600/45 to-palm-600/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-palm-700/50 to-transparent" />
      </div>

      <div className="container-page relative flex min-h-[92vh] flex-col justify-center pb-16 pt-28 sm:min-h-screen">
        <div className="max-w-3xl animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-linen-100/25 bg-linen-50/10 px-4 py-1.5 text-xs uppercase tracking-widest text-linen-100 backdrop-blur-sm">
            <Icon name="pin" size={14} className="text-brass-200" /> {site.location}
          </p>
          <h1 className="mt-6 text-display-xl text-balance text-linen-50">
            A private pool villa where the coast slows down
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-linen-100/90 sm:text-xl">
            Othayoth is a boutique home in Kannur, booked whole for your people
            alone. Palm-shaded water, a Kerala table, and the quiet you came for.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/book" variant="brass" size="lg" icon="arrow-right">
              Check availability
            </ButtonLink>
            <ButtonLink
              href="/villa"
              variant="secondary"
              size="lg"
              className="border-linen-100/30 bg-linen-50/10 text-linen-50 backdrop-blur-sm hover:bg-linen-50/20"
            >
              Discover the villa
            </ButtonLink>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-linen-100/20 pt-8">
            {[
              { v: "4", l: "Bedrooms" },
              { v: "9", l: "Guests" },
              { v: "1", l: "Private pool" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd className="font-serif text-3xl text-linen-50 sm:text-4xl">{s.v}</dd>
                <dd className="mt-1 text-xs uppercase tracking-widest text-linen-100/70">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-linen-100/70 sm:flex">
        <span className="text-[0.65rem] uppercase tracking-widest">Scroll</span>
        <Icon name="chevron-down" size={18} className="animate-fade-in" />
      </div>
    </section>
  );
}
