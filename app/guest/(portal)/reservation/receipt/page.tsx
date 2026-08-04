import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentReservation } from "@/lib/auth";
import { ReceiptView } from "@/components/receipt/ReceiptView";
import { PrintButton } from "@/components/receipt/PrintButton";
import { Icon } from "@/components/icons/Icon";

export default async function GuestReceiptPage() {
  const r = await getCurrentReservation();
  if (!r) redirect("/guest/login");

  return (
    <div className="space-y-6">
      <Link
        href="/guest/reservation"
        className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-palm-600 print:hidden"
      >
        <Icon name="arrow-right" size={14} className="rotate-180" /> Back to your reservation
      </Link>
      <ReceiptView reservation={r} />
      <div className="flex justify-center print:hidden">
        <PrintButton />
      </div>
    </div>
  );
}
