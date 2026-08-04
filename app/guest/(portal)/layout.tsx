import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentReservation } from "@/lib/auth";
import { PortalSidebar, PortalTabBar } from "@/components/guest/PortalNav";
import { LogoutButton } from "@/components/guest/LogoutButton";
import { Wordmark } from "@/components/marketing/Wordmark";
import { Icon } from "@/components/icons/Icon";
import { formatDate } from "@/lib/utils";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  // Authoritative, server-side guard: verifies the signed cookie and the
  // live access window. A tampered or expired session lands back at login.
  const reservation = await getCurrentReservation();
  if (!reservation) redirect("/guest/login");

  return (
    <div className="min-h-screen bg-linen-100">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-stone-200/70 bg-linen-50/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/guest/dashboard" aria-label="Stay dashboard">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-right sm:block">
              <span className="block text-xs uppercase tracking-widest text-stone-300">Guest</span>
              <span className="block text-sm font-medium text-palm-600">{reservation.guestName}</span>
            </span>
            <LogoutButton compact className="border border-stone-200/70 hover:bg-palm-500/10" />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-4 pb-28 pt-6 sm:px-6 lg:pb-12 lg:pt-10">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border border-stone-200/70 bg-linen-50 p-5 shadow-soft">
              <p className="text-xs uppercase tracking-widest text-brass-500">Your stay</p>
              <p className="mt-2 text-sm text-stone-400">
                {formatDate(reservation.checkIn)}
              </p>
              <p className="text-sm text-stone-400">to {formatDate(reservation.checkOut)}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-palm-500/10 px-2.5 py-1 text-xs font-medium text-palm-600">
                <Icon name="check" size={13} className="text-brass-500" /> Confirmed
              </p>
            </div>
            <PortalSidebar />
            <a
              href={`tel:${reservation.hostPhone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-2xl bg-palm-600 p-4 text-linen-50 transition-colors hover:bg-palm-500"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brass-400 text-palm-700">
                <Icon name="phone" size={18} />
              </span>
              <span className="text-sm">
                <span className="block text-linen-100/70">Call your host</span>
                <span className="font-medium">{reservation.hostName}</span>
              </span>
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      {/* Mobile sticky support + bottom nav */}
      <a
        href={`tel:${reservation.hostPhone.replace(/\s/g, "")}`}
        className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-palm-600 py-3 pl-3 pr-4 text-sm font-medium text-linen-50 shadow-lift lg:hidden"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brass-400 text-palm-700">
          <Icon name="phone" size={16} />
        </span>
        Host
      </a>
      <PortalTabBar />
    </div>
  );
}
