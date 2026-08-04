import { nightsBetween } from "@/lib/utils";
import type { Reservation } from "@/lib/reservations";

/**
 * Single source of truth for money math. Balance due is always derived from
 * the room total, confirmed add-ons and amount paid — never stored — so it
 * can't drift out of sync the way a separately-entered field can.
 */
export function reservationTotals(r: Reservation) {
  const nights = nightsBetween(r.checkIn, r.checkOut);
  const roomTotal = nights * r.nightlyRate;
  const addOnTotal = r.addOns
    .filter((a) => a.status === "confirmed")
    .reduce((sum, a) => sum + a.price, 0);
  const total = roomTotal + addOnTotal;
  const balanceDue = Math.max(0, total - r.amountPaid);

  return { nights, roomTotal, addOnTotal, total, balanceDue };
}
