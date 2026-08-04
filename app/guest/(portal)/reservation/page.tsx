import { redirect } from "next/navigation";
import { getCurrentReservation } from "@/lib/auth";
import { PortalHeading, PortalCard } from "@/components/guest/PortalBits";
import { Icon } from "@/components/icons/Icon";
import { formatDate, nightsBetween, inr } from "@/lib/utils";

export default async function ReservationPage() {
  const r = await getCurrentReservation();
  if (!r) redirect("/guest/login");

  const nights = nightsBetween(r.checkIn, r.checkOut);
  const roomTotal = nights * r.nightlyRate;
  const addOnTotal = r.addOns
    .filter((a) => a.status === "confirmed")
    .reduce((sum, a) => sum + a.price, 0);
  const total = roomTotal + addOnTotal;

  const details: { label: string; value: string }[] = [
    { label: "Booking reference", value: r.bookingRef },
    { label: "Package", value: r.packageName },
    { label: "Check-in", value: `${formatDate(r.checkIn)}, from ${r.checkInTime}` },
    { label: "Check-out", value: `${formatDate(r.checkOut)}, by ${r.checkOutTime}` },
    { label: "Guests", value: `${r.guests.adults} adults, ${r.guests.children} children` },
    { label: "Nights", value: String(nights) },
  ];

  return (
    <div className="space-y-8">
      <PortalHeading
        eyebrow="My reservation"
        title="Your booking details"
        intro="A full summary of your stay, add-ons and payments. Receipts are available on request."
        backHref="/guest/dashboard"
      />

      {/* Details */}
      <PortalCard className="divide-y divide-stone-200/60 p-0">
        {details.map((d) => (
          <div key={d.label} className="flex flex-wrap items-center justify-between gap-2 px-6 py-4">
            <span className="text-sm uppercase tracking-widest text-stone-300">{d.label}</span>
            <span className="font-medium text-palm-600">{d.value}</span>
          </div>
        ))}
      </PortalCard>

      {/* Add-ons */}
      {r.addOns.length > 0 && (
        <section>
          <h2 className="mb-4 text-sm uppercase tracking-widest text-brass-500">Add-ons</h2>
          <PortalCard className="divide-y divide-stone-200/60 p-0">
            {r.addOns.map((ao) => (
              <div key={ao.id} className="flex items-center justify-between gap-4 px-6 py-4">
                <span className="flex items-center gap-2 text-palm-600">
                  <Icon
                    name={ao.status === "confirmed" ? "check" : "bell"}
                    size={16}
                    className="text-brass-500"
                  />
                  {ao.label}
                </span>
                <span className="text-sm text-stone-400">{inr(ao.price)}</span>
              </div>
            ))}
          </PortalCard>
        </section>
      )}

      {/* Payment summary */}
      <section>
        <h2 className="mb-4 text-sm uppercase tracking-widest text-brass-500">Payment</h2>
        <PortalCard className="space-y-3">
          <Row label={`Villa · ${nights} nights`} value={inr(roomTotal)} />
          {addOnTotal > 0 && <Row label="Confirmed add-ons" value={inr(addOnTotal)} />}
          <div className="border-t border-stone-200/60 pt-3">
            <Row label="Total" value={inr(total)} strong />
          </div>
          <Row label="Paid" value={inr(r.amountPaid)} />
          <div className="border-t border-stone-200/60 pt-3">
            <Row
              label="Balance due"
              value={r.balanceDue > 0 ? inr(r.balanceDue) : "Fully paid"}
              strong
              accent={r.balanceDue > 0}
            />
          </div>
          {r.balanceDue > 0 && (
            <p className="rounded-xl bg-brass-100/60 p-3 text-xs text-stone-500">
              The balance is settled with your host during your stay. Secure payment
              options will appear here once connected.
            </p>
          )}
        </PortalCard>
      </section>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-full border border-palm-600/25 py-3 text-sm font-medium text-palm-600 transition-colors hover:bg-palm-500/8"
      >
        <Icon name="receipt" size={18} className="text-brass-400" />
        Request a receipt
      </button>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
  accent,
}: {
  label: string;
  value: string;
  strong?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? "font-medium text-palm-600" : "text-stone-400"}>{label}</span>
      <span className={accent ? "font-serif text-lg text-brass-500" : strong ? "font-serif text-lg text-palm-600" : "text-stone-400"}>
        {value}
      </span>
    </div>
  );
}
