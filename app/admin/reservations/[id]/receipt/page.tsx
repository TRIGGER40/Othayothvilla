import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getReservationById } from "@/lib/reservations";
import { ReceiptView } from "@/components/receipt/ReceiptView";
import { PrintButton } from "@/components/receipt/PrintButton";
import { Icon } from "@/components/icons/Icon";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const { id } = await params;
  const reservation = await getReservationById(id);
  if (!reservation) redirect("/admin");

  return (
    <main className="min-h-screen bg-linen-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-palm-600 print:hidden"
        >
          <Icon name="arrow-right" size={14} className="rotate-180" /> Back to reservations
        </Link>
        <ReceiptView reservation={reservation} />
        <div className="flex justify-center print:hidden">
          <PrintButton />
        </div>
      </div>
    </main>
  );
}
