import { redirect } from "next/navigation";
import { getCurrentReservation } from "@/lib/auth";
import { PortalHeading, PortalCard } from "@/components/guest/PortalBits";
import { WifiCard } from "@/components/guest/WifiCard";
import { Icon, type IconName } from "@/components/icons/Icon";
import { houseGuide } from "@/lib/portal";
import { site } from "@/lib/content";

export default async function HouseGuidePage() {
  const r = await getCurrentReservation();
  if (!r) redirect("/guest/login");

  return (
    <div className="space-y-8">
      <PortalHeading
        eyebrow="House guide"
        title="How everything works"
        intro="A quick guide to living in the villa. Everything is where you would expect, and your host is a call away if not."
        backHref="/guest/dashboard"
      />

      <WifiCard network={site.wifi.network} password={site.wifi.password} />

      <div className="grid gap-4 md:grid-cols-2">
        {houseGuide.map((item) => (
          <PortalCard key={item.title}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-palm-500/10 text-palm-500">
                <Icon name={item.icon as IconName} size={20} />
              </span>
              <h2 className="font-serif text-lg text-palm-600">{item.title}</h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {item.steps.map((step) => (
                <li key={step} className="flex items-start gap-2.5 text-sm text-stone-400">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brass-400" />
                  {step}
                </li>
              ))}
            </ul>
          </PortalCard>
        ))}
      </div>

      <PortalCard className="flex items-start gap-3 bg-brass-100/50">
        <Icon name="shield" size={20} className="mt-0.5 shrink-0 text-brass-500" />
        <p className="text-sm text-stone-500">
          <span className="font-medium text-palm-600">A gentle reminder: </span>
          the pool has no lifeguard. Please keep children supervised at all times
          and glassware away from the water.
        </p>
      </PortalCard>
    </div>
  );
}
