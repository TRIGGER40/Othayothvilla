import { redirect } from "next/navigation";
import { getCurrentReservation } from "@/lib/auth";
import { PortalHeading, PortalCard } from "@/components/guest/PortalBits";
import { Icon } from "@/components/icons/Icon";
import { emergencyContacts, outageGuidance } from "@/lib/portal";

export default async function EmergencyPage() {
  const r = await getCurrentReservation();
  if (!r) redirect("/guest/login");

  return (
    <div className="space-y-8">
      <PortalHeading
        eyebrow="Emergency info"
        title="Help, any hour"
        intro="Save your host's number now. In any emergency, call your host first, then the services below."
        backHref="/guest/dashboard"
      />

      {/* Contacts */}
      <section>
        <h2 className="mb-4 text-sm uppercase tracking-widest text-brass-500">Who to call</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {emergencyContacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-stone-200/70 bg-linen-50 p-5 shadow-soft transition-colors hover:border-brass-300/60"
            >
              <span className="min-w-0">
                <span className="block font-medium text-palm-600">{c.label}</span>
                <span className="block font-mono text-sm text-stone-400">{c.value}</span>
                {c.note && <span className="mt-0.5 block text-xs text-stone-300">{c.note}</span>}
              </span>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-palm-600 text-linen-50 transition-colors group-hover:bg-palm-500">
                <Icon name="phone" size={20} />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Outage guidance */}
      <section>
        <h2 className="mb-4 text-sm uppercase tracking-widest text-brass-500">If something goes out</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {outageGuidance.map((g) => (
            <PortalCard key={g.title}>
              <div className="flex items-center gap-2">
                <Icon name="bolt" size={18} className="text-brass-500" />
                <h3 className="font-serif text-lg text-palm-600">{g.title}</h3>
              </div>
              <p className="mt-2 text-sm text-stone-400">{g.body}</p>
            </PortalCard>
          ))}
        </div>
      </section>

      <PortalCard className="flex items-center gap-4 bg-palm-600 text-linen-100">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brass-400 text-palm-700">
          <Icon name="phone" size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-linen-100/80">Your host, {r.hostName}</p>
          <p className="font-serif text-xl text-linen-50">{r.hostPhone}</p>
        </div>
        <a
          href={`tel:${r.hostPhone.replace(/\s/g, "")}`}
          className="rounded-full bg-linen-50 px-5 py-2.5 text-sm font-medium text-palm-700 transition-colors hover:bg-linen-100"
        >
          Call now
        </a>
      </PortalCard>
    </div>
  );
}
