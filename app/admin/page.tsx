import type { Metadata } from "next";
import Link from "next/link";
import { isWithinAccessWindow, listReservations } from "@/lib/reservations";
import { ReservationsTable } from "@/components/admin/ReservationsTable";
import { Button } from "@/components/ui/Button";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const reservations = await listReservations();
  const rows = reservations.map((r) => ({
    reservation: r,
    active: isWithinAccessWindow(r),
    magicLink: `${SITE_URL}/guest/login?token=${r.accessToken}`,
  }));

  return (
    <main className="min-h-screen bg-linen-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-palm-600">Reservations</h1>
            <p className="mt-1 text-sm text-stone-400">
              Add a booking here to give a guest access to the stay portal.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/new">
              <Button icon="key" iconPosition="left">Add reservation</Button>
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-8">
          <ReservationsTable rows={rows} />
        </div>
      </div>
    </main>
  );
}
