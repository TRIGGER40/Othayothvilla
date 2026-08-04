import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentReservation } from "@/lib/auth";
import { PortalHeading, PortalCard, QuickAction, InfoRow } from "@/components/guest/PortalBits";
import { WifiCard } from "@/components/guest/WifiCard";
import { Icon } from "@/components/icons/Icon";
import { formatDate, nightsBetween } from "@/lib/utils";
import { portalNav } from "@/lib/portal";
import { site } from "@/lib/content";

export default async function DashboardPage() {
  const r = await getCurrentReservation();
  if (!r) redirect("/guest/login");

  const nights = nightsBetween(r.checkIn, r.checkOut);
  const guests = r.guests.adults + r.guests.children;
  const firstName = r.guestName.split(/[\s&]/)[0];

  const quickActions = portalNav.filter((i) =>
    ["/guest/check-in", "/guest/house-guide", "/guest/services", "/guest/recommendations"].includes(i.href),
  );

  return (
    <div className="space-y-8">
      <PortalHeading
        eyebrow="Your stay"
        title={`Welcome, ${firstName}`}
        intro="Everything you need before, during and just after your stay is here. Take your time."
      />

      {/* Reservation summary */}
      <PortalCard className="bg-palm-600 text-linen-100">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-brass-200">{r.packageName}</p>
            <p className="mt-2 font-serif text-2xl text-linen-50">
              {formatDate(r.checkIn)}
            </p>
            <p className="text-linen-100/80">to {formatDate(r.checkOut)}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-linen-50/12 px-3 py-1.5 text-xs font-medium text-linen-50">
            <Icon name="check" size={14} className="text-brass-300" /> Confirmed
          </span>
        </div>
        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-linen-100/15 pt-5 text-center">
          <div>
            <dt className="text-xs uppercase tracking-widest text-linen-100/60">Nights</dt>
            <dd className="mt-1 font-serif text-2xl text-linen-50">{nights}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-linen-100/60">Guests</dt>
            <dd className="mt-1 font-serif text-2xl text-linen-50">{guests}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-linen-100/60">Ref</dt>
            <dd className="mt-1 font-serif text-2xl text-linen-50">{r.bookingRef}</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-3 border-t border-linen-100/15 pt-5 text-sm">
          <span className="inline-flex items-center gap-2 text-linen-100/85">
            <Icon name="key" size={16} className="text-brass-300" /> Check-in {r.checkInTime}
          </span>
          <span className="inline-flex items-center gap-2 text-linen-100/85">
            <Icon name="logout" size={16} className="text-brass-300" /> Check-out {r.checkOutTime}
          </span>
        </div>
      </PortalCard>

      {/* Quick actions */}
      <section>
        <h2 className="mb-4 text-sm uppercase tracking-widest text-brass-500">Quick actions</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {quickActions.map((a) => (
            <QuickAction key={a.href} href={a.href} icon={a.icon as never} label={a.label} blurb={a.blurb} />
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Wi-Fi */}
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-brass-500">Wi-Fi</h2>
          <WifiCard network={site.wifi.network} password={site.wifi.password} />
        </div>

        {/* Host & help */}
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-brass-500">Your host</h2>
          <PortalCard className="space-y-1">
            <InfoRow icon="phone" label={`Call ${r.hostName}`} value={r.hostPhone} href={`tel:${r.hostPhone.replace(/\s/g, "")}`} />
            <InfoRow icon="whatsapp" label="WhatsApp" value="Message your host" href={`https://wa.me/${r.hostPhone.replace(/[^0-9]/g, "")}`} />
            <Link
              href="/guest/emergency"
              className="mt-2 flex items-center justify-between rounded-xl bg-palm-500/6 px-4 py-3 text-sm text-palm-600 transition-colors hover:bg-palm-500/10"
            >
              <span className="flex items-center gap-2">
                <Icon name="shield" size={18} className="text-brass-500" /> Emergency info
              </span>
              <Icon name="arrow-right" size={16} className="text-brass-400" />
            </Link>
          </PortalCard>
        </div>
      </div>

      {/* Special request note */}
      {r.specialRequests && (
        <PortalCard className="flex items-start gap-3 bg-brass-100/50">
          <Icon name="sparkle" size={20} className="mt-0.5 shrink-0 text-brass-500" />
          <p className="text-sm text-stone-500">
            <span className="font-medium text-palm-600">We noted: </span>
            {r.specialRequests}
          </p>
        </PortalCard>
      )}
    </div>
  );
}
