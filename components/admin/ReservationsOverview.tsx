"use client";

import { useMemo, useState } from "react";
import { ReservationsTable, type Row } from "@/components/admin/ReservationsTable";

type Filter = "all" | "upcoming" | "past";

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function ReservationsOverview({ rows }: { rows: Row[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const today = todayStr();

  const { upcoming, past } = useMemo(() => {
    const upcoming: Row[] = [];
    const past: Row[] = [];
    for (const row of rows) {
      if (row.reservation.checkOut >= today) upcoming.push(row);
      else past.push(row);
    }
    return { upcoming, past };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const counters: { key: Filter; label: string; count: number }[] = [
    { key: "upcoming", label: "Upcoming stays", count: upcoming.length },
    { key: "past", label: "Past stays", count: past.length },
    { key: "all", label: "Total stays", count: rows.length },
  ];

  const filteredRows = filter === "upcoming" ? upcoming : filter === "past" ? past : rows;
  const emptyMessage =
    filter === "upcoming"
      ? "No upcoming stays."
      : filter === "past"
        ? "No past stays yet."
        : "No reservations yet. Add one to give a guest access to the stay portal.";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {counters.map((c) => {
          const selected = filter === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setFilter(c.key)}
              className={`rounded-2xl border p-6 text-left transition-colors ${
                selected
                  ? "border-brass-400 bg-palm-600 text-linen-50 shadow-lift"
                  : "border-stone-200/60 bg-linen-50 text-palm-600 hover:border-brass-300/60"
              }`}
            >
              <span
                className={`block font-serif text-4xl ${selected ? "text-linen-50" : "text-palm-600"}`}
              >
                {c.count}
              </span>
              <span
                className={`mt-1 block text-sm uppercase tracking-widest ${
                  selected ? "text-linen-100/80" : "text-stone-400"
                }`}
              >
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      <ReservationsTable rows={filteredRows} emptyMessage={emptyMessage} />
    </div>
  );
}
