import { redirect } from "next/navigation";
import { getCurrentReservation } from "@/lib/auth";
import { PortalHeading, PortalCard } from "@/components/guest/PortalBits";
import { RequestForm } from "@/components/guest/RequestForm";
import { Icon } from "@/components/icons/Icon";

export default async function ServicesPage() {
  const r = await getCurrentReservation();
  if (!r) redirect("/guest/login");

  return (
    <div className="space-y-8">
      <PortalHeading
        eyebrow="Services & requests"
        title="Anything you need, just ask"
        intro="Send a request and your host will confirm shortly. Most things can be arranged the same day."
        backHref="/guest/dashboard"
      />

      <RequestForm />

      {r.addOns.length > 0 && (
        <section>
          <h2 className="mb-4 text-sm uppercase tracking-widest text-brass-500">Already on your stay</h2>
          <PortalCard className="divide-y divide-stone-200/60 p-0">
            {r.addOns.map((ao) => (
              <div key={ao.id} className="flex items-center justify-between gap-4 p-5">
                <span className="flex items-center gap-3">
                  <Icon name="check" size={18} className="text-brass-500" />
                  <span className="text-palm-600">{ao.label}</span>
                </span>
                <span
                  className={
                    ao.status === "confirmed"
                      ? "rounded-full bg-palm-500/10 px-3 py-1 text-xs font-medium text-palm-600"
                      : "rounded-full bg-brass-100 px-3 py-1 text-xs font-medium text-brass-500"
                  }
                >
                  {ao.status === "confirmed" ? "Confirmed" : "Requested"}
                </span>
              </div>
            ))}
          </PortalCard>
        </section>
      )}

      <p className="flex items-center gap-2 text-sm text-stone-400">
        <Icon name="phone" size={16} className="text-brass-400" />
        For anything urgent, it is always quickest to call your host directly.
      </p>
    </div>
  );
}
