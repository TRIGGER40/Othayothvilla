import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listBookingRequests } from "@/lib/booking-requests";
import { RequestsTable } from "@/components/admin/RequestsTable";
import { Icon } from "@/components/icons/Icon";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminRequestsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const requests = await listBookingRequests();

  return (
    <main className="min-h-screen bg-linen-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-palm-600">
          <Icon name="arrow-right" size={14} className="rotate-180" /> Reservations
        </Link>
        <h1 className="mt-3 font-serif text-3xl text-palm-600">Booking requests</h1>
        <p className="mt-1 text-sm text-stone-400">
          Inquiries from the website. Reply, then add a reservation once you confirm the dates.
        </p>

        <div className="mt-8">
          <RequestsTable requests={requests} />
        </div>
      </div>
    </main>
  );
}
