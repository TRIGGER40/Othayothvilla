"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons/Icon";
import type { Reservation } from "@/lib/reservations";

type Row = {
  reservation: Reservation;
  active: boolean;
  magicLink: string;
};

export function ReservationsTable({ rows }: { rows: Row[] }) {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function copyLink(id: string, link: string) {
    await navigator.clipboard.writeText(link);
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
        No reservations yet. Add one to give a guest access to the stay portal.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200/60 bg-linen-50 shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="bg-palm-500/5 text-xs uppercase tracking-widest text-stone-400">
          <tr>
            <th className="px-5 py-3">Booking</th>
            <th className="px-5 py-3">Guest</th>
            <th className="px-5 py-3">Dates</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Stay link</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200/60">
          {rows.map(({ reservation: r, active, magicLink }) => (
            <tr key={r.id}>
              <td className="px-5 py-4 font-mono text-palm-600">{r.bookingRef}</td>
              <td className="px-5 py-4">
                <div className="font-medium text-ink">{r.guestName}</div>
                <div className="text-xs text-stone-300">•••• {r.phoneLast4}</div>
              </td>
              <td className="px-5 py-4 text-stone-400">
                {r.checkIn} → {r.checkOut}
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
                  onClick={() => copyLink(r.id, magicLink)}
                  className="inline-flex items-center gap-1.5 text-brass-500 hover:text-brass-400"
                >
                  <Icon name={copiedId === r.id ? "check" : "link"} size={16} />
                  {copiedId === r.id ? "Copied" : "Copy link"}
                </button>
              </td>
              <td className="px-5 py-4 text-right">
                <button
                  type="button"
                  onClick={() => handleDelete(r.id, r.bookingRef)}
                  disabled={deletingId === r.id}
                  className="text-stone-300 hover:text-red-700 disabled:opacity-50"
                  aria-label={`Remove reservation ${r.bookingRef}`}
                >
                  <Icon name="trash" size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
