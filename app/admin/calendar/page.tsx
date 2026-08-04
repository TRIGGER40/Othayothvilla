import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listReservations } from "@/lib/reservations";
import { BookingCalendar } from "@/components/admin/BookingCalendar";
import { Icon } from "@/components/icons/Icon";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminCalendarPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const reservations = await listReservations();

  return (
    <main className="min-h-screen bg-linen-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-palm-600"
        >
          <Icon name="arrow-right" size={14} className="rotate-180" /> Reservations
        </Link>
        <h1 className="mt-3 font-serif text-3xl text-palm-600">Booking calendar</h1>
        <p className="mt-1 text-sm text-stone-400">Every booked date, at a glance.</p>

        <div className="mt-8">
          <BookingCalendar reservations={reservations} />
        </div>
      </div>
    </main>
  );
}
