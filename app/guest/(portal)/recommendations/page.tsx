import { redirect } from "next/navigation";
import { getCurrentReservation } from "@/lib/auth";
import { PortalHeading, PortalCard } from "@/components/guest/PortalBits";
import { Icon, type IconName } from "@/components/icons/Icon";
import { recommendations } from "@/lib/portal";

export default async function RecommendationsPage() {
  const r = await getCurrentReservation();
  if (!r) redirect("/guest/login");

  return (
    <div className="space-y-8">
      <PortalHeading
        eyebrow="Around the villa"
        title="Our local favourites"
        intro="Hand-picked places we love, close to home. Ask your host to book a table or arrange a car."
        backHref="/guest/dashboard"
      />

      <div className="space-y-8">
        {recommendations.map((group) => (
          <section key={group.category}>
            <h2 className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-brass-500">
              <Icon name={group.icon as IconName} size={18} className="text-brass-400" />
              {group.category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.places.map((p) => (
                <PortalCard key={p.name} className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg text-palm-600">{p.name}</h3>
                    <p className="mt-1 text-sm text-stone-400">{p.note}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-brass-100 px-2.5 py-1 text-xs font-medium text-brass-500">
                    {p.distance}
                  </span>
                </PortalCard>
              ))}
            </div>
          </section>
        ))}
      </div>

      <PortalCard className="flex items-start gap-3 bg-palm-500/6">
        <Icon name="map" size={20} className="mt-0.5 shrink-0 text-brass-500" />
        <p className="text-sm text-stone-500">
          Want a recommendation for something specific, a quiet beach, a Theyyam
          ritual in season, the best fish curry nearby? Just ask your host.
        </p>
      </PortalCard>
    </div>
  );
}
