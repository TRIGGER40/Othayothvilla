"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import type { Reservation } from "@/lib/reservations";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function ymd(year: number, monthIndex: number, day: number): string {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}

type DayCell = {
  day: number;
  date: string;
  inMonth: boolean;
  bookings: Reservation[];
};

export function BookingCalendar({ reservations }: { reservations: Reservation[] }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [monthIndex, setMonthIndex] = useState(today.getMonth());

  function bookingsOn(date: string): Reservation[] {
    // checkIn is occupied, checkOut morning is departure (not occupied), matching nightsBetween.
    return reservations.filter((r) => date >= r.checkIn && date < r.checkOut);
  }

  const cells = useMemo<DayCell[]>(() => {
    const firstOfMonth = new Date(year, monthIndex, 1);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const startWeekday = firstOfMonth.getDay();

    const list: DayCell[] = [];
    // Leading days from the previous month, for a full first week.
    const prevMonthDays = new Date(year, monthIndex, 0).getDate();
    for (let i = startWeekday - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const prevMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1;
      const prevYear = monthIndex === 0 ? year - 1 : year;
      const date = ymd(prevYear, prevMonthIndex, day);
      list.push({ day, date, inMonth: false, bookings: bookingsOn(date) });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = ymd(year, monthIndex, day);
      list.push({ day, date, inMonth: true, bookings: bookingsOn(date) });
    }
    // Trailing days to complete the final week.
    while (list.length % 7 !== 0) {
      const day = list.length - (startWeekday + daysInMonth) + 1;
      const nextMonthIndex = monthIndex === 11 ? 0 : monthIndex + 1;
      const nextYear = monthIndex === 11 ? year + 1 : year;
      const date = ymd(nextYear, nextMonthIndex, day);
      list.push({ day, date, inMonth: false, bookings: bookingsOn(date) });
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, monthIndex, reservations]);

  const todayStr = ymd(today.getFullYear(), today.getMonth(), today.getDate());

  function goPrev() {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear((y) => y - 1);
    } else {
      setMonthIndex((m) => m - 1);
    }
  }

  function goNext() {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear((y) => y + 1);
    } else {
      setMonthIndex((m) => m + 1);
    }
  }

  return (
    <div className="rounded-2xl border border-stone-200/60 bg-linen-50 p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-xl text-palm-600">
          {MONTH_NAMES[monthIndex]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous month"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200/70 text-palm-600 hover:bg-palm-500/8"
          >
            <Icon name="arrow-right" size={16} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next month"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200/70 text-palm-600 hover:bg-palm-500/8"
          >
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {WEEKDAY_LABELS.map((w) => (
          <div key={w} className="pb-1 text-center text-xs uppercase tracking-widest text-stone-300">
            {w}
          </div>
        ))}
        {cells.map((cell) => {
          const booked = cell.bookings.length > 0;
          const isToday = cell.date === todayStr;
          return (
            <div
              key={cell.date}
              className={`min-h-[4.5rem] rounded-xl border p-1.5 text-xs ${
                cell.inMonth ? "border-stone-200/60 bg-linen-100" : "border-transparent bg-transparent opacity-40"
              } ${isToday ? "ring-2 ring-brass-400" : ""}`}
            >
              <span className={cell.inMonth ? "text-stone-400" : "text-stone-300"}>{cell.day}</span>
              {booked && (
                <div className="mt-1 space-y-1">
                  {cell.bookings.map((b) => (
                    <Link
                      key={b.id}
                      href={`/admin/reservations/${b.id}/receipt`}
                      title={`${b.guestName} · ${b.bookingRef}`}
                      className="block truncate rounded-md bg-palm-500/15 px-1.5 py-0.5 text-[0.65rem] font-medium text-palm-600 hover:bg-palm-500/25"
                    >
                      {b.guestName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
