import { formatDate, inr } from "@/lib/utils";
import { reservationTotals } from "@/lib/reservation-totals";
import { CANCELLATION_POLICY } from "@/lib/policies";
import { site } from "@/lib/content";
import type { Reservation } from "@/lib/reservations";

/**
 * Printable stay + payment receipt. Shared by the guest portal and the admin
 * panel so both sides always see identical numbers. Rendered for screen and
 * print (see print: utility classes); "download" is the browser's own
 * print-to-PDF, so there is no PDF library to maintain.
 */
export function ReceiptView({ reservation: r }: { reservation: Reservation }) {
  const { nights, roomTotal, total, balanceDue } = reservationTotals(r);

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-stone-200/60 bg-linen-50 p-8 shadow-soft print:border-0 print:shadow-none sm:p-10">
      <div className="flex items-start justify-between gap-4 border-b border-stone-200/60 pb-6">
        <div>
          <p className="font-serif text-2xl text-palm-600">{site.name}</p>
          <p className="mt-1 text-sm text-stone-400">{site.address}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-stone-300">Receipt</p>
          <p className="mt-1 font-mono text-palm-600">{r.bookingRef}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Detail label="Guest" value={r.guestName} />
        <Detail label="Package" value={r.packageName} />
        <Detail label="Check-in" value={`${formatDate(r.checkIn)}, from ${r.checkInTime}`} />
        <Detail label="Check-out" value={`${formatDate(r.checkOut)}, by ${r.checkOutTime}`} />
        <Detail label="Guests" value={`${r.guests.adults} adults, ${r.guests.children} children`} />
        <Detail label="Nights" value={String(nights)} />
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm uppercase tracking-widest text-brass-500">Payment</h2>
        <div className="space-y-2.5 rounded-2xl border border-stone-200/60 p-5">
          <Row label={`Villa · ${nights} night${nights === 1 ? "" : "s"} × ${inr(r.nightlyRate)}`} value={inr(roomTotal)} />
          {r.addOns
            .filter((a) => a.status === "confirmed")
            .map((a) => <Row key={a.id} label={a.label} value={inr(a.price)} />)}
          <div className="border-t border-stone-200/60 pt-2.5">
            <Row label="Total" value={inr(total)} strong />
          </div>
          <Row label="Paid" value={inr(r.amountPaid)} />
          <div className="border-t border-stone-200/60 pt-2.5">
            <Row label="Balance due" value={inr(balanceDue)} strong accent={balanceDue > 0} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm uppercase tracking-widest text-brass-500">Cancellation & refund policy</h2>
        <p className="rounded-2xl bg-palm-500/8 p-4 text-sm leading-relaxed text-stone-500">{CANCELLATION_POLICY}</p>
      </div>

      <p className="mt-8 text-center text-xs text-stone-300">
        Questions about this receipt? Call {site.phoneDisplay}.
      </p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-stone-300">{label}</dt>
      <dd className="mt-1 font-medium text-palm-600">{value}</dd>
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
