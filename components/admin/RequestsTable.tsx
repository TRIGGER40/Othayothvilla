"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons/Icon";
import type { BookingRequest } from "@/lib/booking-requests";

export function RequestsTable({ requests }: { requests: BookingRequest[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function setStatus(id: string, status: BookingRequest["status"]) {
    setBusyId(id);
    await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setBusyId(null);
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Remove the request from ${name}? This cannot be undone.`)) return;
    setBusyId(id);
    await fetch(`/api/admin/requests/${id}`, { method: "DELETE" });
    router.refresh();
    setBusyId(null);
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-linen-50 p-10 text-center text-stone-400">
        No booking requests yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200/60 bg-linen-50 shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="bg-palm-500/5 text-xs uppercase tracking-widest text-stone-400">
          <tr>
            <th className="px-5 py-3">Guest</th>
            <th className="px-5 py-3">Dates</th>
            <th className="px-5 py-3">Guests</th>
            <th className="px-5 py-3">Occasion</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200/60">
          {requests.map((r) => (
            <tr key={r.id}>
              <td className="px-5 py-4">
                <div className="font-medium text-ink">{r.name}</div>
                <div className="text-xs text-stone-300">{r.email} · {r.phone}</div>
                {r.specialRequests && <div className="mt-1 text-xs text-stone-400">{r.specialRequests}</div>}
              </td>
              <td className="px-5 py-4 text-stone-400">{r.checkIn} → {r.checkOut}</td>
              <td className="px-5 py-4 text-stone-400">{r.guestsAdults} adults, {r.guestsChildren} children</td>
              <td className="px-5 py-4 text-stone-400">{r.occasion || "—"}</td>
              <td className="px-5 py-4">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    r.status === "new"
                      ? "bg-brass-100 text-brass-500"
                      : r.status === "contacted"
                        ? "bg-palm-500/10 text-palm-600"
                        : "bg-stone-200/60 text-stone-400"
                  }`}
                >
                  {r.status === "new" ? "New" : r.status === "contacted" ? "Contacted" : "Dismissed"}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/new?${new URLSearchParams({
                      guestName: r.name,
                      email: r.email,
                      checkIn: r.checkIn,
                      checkOut: r.checkOut,
                      guestsAdults: String(r.guestsAdults),
                      guestsChildren: String(r.guestsChildren),
                      specialRequests: [r.occasion, r.specialRequests].filter(Boolean).join(" — "),
                    }).toString()}`}
                    className="inline-flex items-center gap-1.5 text-brass-500 hover:text-brass-400"
                    onClick={() => setStatus(r.id, "contacted")}
                  >
                    <Icon name="key" size={16} />
                    Add reservation
                  </Link>
                  {r.status !== "dismissed" && (
                    <button
                      type="button"
                      onClick={() => setStatus(r.id, "dismissed")}
                      disabled={busyId === r.id}
                      className="text-stone-300 hover:text-palm-600 disabled:opacity-50"
                      aria-label={`Dismiss request from ${r.name}`}
                    >
                      <Icon name="close" size={16} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(r.id, r.name)}
                    disabled={busyId === r.id}
                    className="text-stone-300 hover:text-red-700 disabled:opacity-50"
                    aria-label={`Remove request from ${r.name}`}
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
