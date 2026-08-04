"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons/Icon";
import { buildStayMessage } from "@/lib/guest-message";
import { reservationTotals } from "@/lib/reservation-totals";
import { inr } from "@/lib/utils";
import { EditReservationModal } from "@/components/admin/EditReservationModal";
import type { Reservation } from "@/lib/reservations";

export type Row = {
  reservation: Reservation;
  active: boolean;
  magicLink: string;
};

export function ReservationsTable({
  rows,
  emptyMessage = "No reservations yet. Add one to give a guest access to the stay portal.",
}: {
  rows: Row[];
  emptyMessage?: string;
}) {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Reservation | null>(null);

  async function copyMessage(id: string, reservation: Reservation, magicLink: string) {
    await navigator.clipboard.writeText(buildStayMessage(reservation, magicLink));
    setCopiedId(id);
    setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 2000);
  }

  async function handleDelete(id: string, bookingRef: string) {
    if (!window.confirm(`Remove reservation ${bookingRef}? This cannot be undone.`)) return;
    setDeletingId(id);
    await fetch(`/api/admin/reservations/${id}`, { method: "DELETE" });
    router.refresh();
    setDeletingId(null);
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-linen-50 p-10 text-center text-stone-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-stone-200/60 bg-linen-50 shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-palm-500/5 text-xs uppercase tracking-widest text-stone-400">
            <tr>
              <th className="px-5 py-3">Booking</th>
              <th className="px-5 py-3">Guest</th>
              <th className="px-5 py-3">Dates</th>
              <th className="px-5 py-3">Nights</th>
              <th className="px-5 py-3">Payment</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Message</th>
              <th className="px-5 py-3">Receipt</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/60">
            {rows.map(({ reservation: r, active, magicLink }) => {
              const { nights, total, balanceDue } = reservationTotals(r);
              const fullyPaid = balanceDue === 0;
              return (
                <tr key={r.id}>
                  <td className="px-5 py-4 font-mono text-palm-600">{r.bookingRef}</td>
                  <td className="px-5 py-4">
                    <div className="font-medium text-ink">{r.guestName}</div>
                    <div className="text-xs text-stone-300">•••• {r.phoneLast4}</div>
                  </td>
                  <td className="px-5 py-4 text-stone-400">
                    {r.checkIn} → {r.checkOut}
                  </td>
                  <td className="px-5 py-4 text-stone-400">{nights}</td>
                  <td className="px-5 py-4">
                    {fullyPaid ? (
                      <span className="font-medium text-emerald-700">{inr(total)}</span>
                    ) : (
                      <span className="font-medium text-red-700">{inr(balanceDue)} due</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        active ? "bg-palm-500/10 text-palm-600" : "bg-stone-200/60 text-stone-400"
                      }`}
                    >
                      {active ? "Portal open" : "Not active"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => copyMessage(r.id, r, magicLink)}
                      className="inline-flex items-center gap-1.5 text-brass-500 hover:text-brass-400"
                    >
                      <Icon name={copiedId === r.id ? "check" : "link"} size={16} />
                      {copiedId === r.id ? "Copied" : "Copy message"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/reservations/${r.id}/receipt`}
                      className="inline-flex items-center gap-1.5 text-brass-500 hover:text-brass-400"
                    >
                      <Icon name="receipt" size={16} />
                      View
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setEditing(r)}
                        className="text-stone-300 hover:text-palm-600"
                        aria-label={`Edit reservation ${r.bookingRef}`}
                      >
                        <Icon name="edit" size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(r.id, r.bookingRef)}
                        disabled={deletingId === r.id}
                        className="text-stone-300 hover:text-red-700 disabled:opacity-50"
                        aria-label={`Remove reservation ${r.bookingRef}`}
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editing && <EditReservationModal reservation={editing} onClose={() => setEditing(null)} />}
    </>
  );
}
