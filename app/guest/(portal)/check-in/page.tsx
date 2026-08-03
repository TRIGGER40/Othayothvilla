import { redirect } from "next/navigation";
import Image from "next/image";
import { getCurrentReservation } from "@/lib/auth";
import { PortalHeading, PortalCard, InfoRow } from "@/components/guest/PortalBits";
import { Icon } from "@/components/icons/Icon";
import { checkInSteps } from "@/lib/portal";
import { site } from "@/lib/content";
import { villaPhotos } from "@/lib/images";

export default async function CheckInPage() {
  const r = await getCurrentReservation();
  if (!r) redirect("/guest/login");

  return (
    <div className="space-y-8">
      <PortalHeading
        eyebrow="Check-in"
        title="Arriving at Othayoth Villa"
        intro="A calm arrival, step by step. Your host will meet you at the gate."
      />

      {/* Key facts */}
      <div className="grid gap-4 sm:grid-cols-3">
        <PortalCard>
          <InfoRow icon="key" label="Check-in from" value={r.checkInTime} />
        </PortalCard>
        <PortalCard>
          <InfoRow icon="car" label="Parking" value="2 to 3 cars, on site" />
        </PortalCard>
        <PortalCard>
          <InfoRow icon="phone" label="Meet at gate" value={r.hostName} href={`tel:${r.hostPhone.replace(/\s/g, "")}`} />
        </PortalCard>
      </div>

      {/* Steps */}
      <section>
        <h2 className="mb-4 text-sm uppercase tracking-widest text-brass-500">On arrival</h2>
        <ol className="space-y-4">
          {checkInSteps.map((step, i) => (
            <li key={step.title}>
              <PortalCard className="flex gap-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-palm-600 font-serif text-linen-50">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-palm-600">{step.title}</h3>
                  <p className="mt-1 text-stone-400">{step.body}</p>
                </div>
              </PortalCard>
            </li>
          ))}
        </ol>
      </section>

      {/* Location / directions */}
      <div className="relative overflow-hidden rounded-2xl border border-stone-200/70 bg-palm-600 text-linen-100 shadow-soft">
        <Image
          src={villaPhotos.mainGate.src}
          alt={villaPhotos.mainGate.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-palm-700/90 via-palm-700/60 to-palm-700/20" />
        <div className="relative flex items-start gap-3 p-6">
          <Icon name="pin" size={22} className="mt-0.5 shrink-0 text-brass-300" />
          <div>
            <h3 className="font-serif text-lg text-linen-50">Getting to the gate</h3>
            <p className="mt-1 text-sm text-linen-100/80">{site.address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brass-400 px-4 py-2 text-sm font-medium text-palm-700 transition-colors hover:bg-brass-300"
            >
              <Icon name="map" size={16} /> Open live location
            </a>
          </div>
        </div>
      </div>

      <p className="flex items-center gap-2 text-sm text-stone-400">
        <Icon name="hand" size={16} className="text-brass-400" />
        Arriving early or after dark? Message your host so we can be ready for you.
      </p>
    </div>
  );
}
