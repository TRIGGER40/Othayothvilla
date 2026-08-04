import { formatDate, inr } from "@/lib/utils";
import { reservationTotals } from "@/lib/reservation-totals";
import { CANCELLATION_POLICY } from "@/lib/policies";
import type { Reservation } from "@/lib/reservations";

/**
 * The message an owner sends a guest (WhatsApp/email) alongside their stay
 * link: confirms dates, states where money stands, and links the portal.
 */
export function buildStayMessage(r: Reservation, magicLink: string): string {
  const { nights, total, balanceDue } = reservationTotals(r);
  const nightsLabel = `${nights} night${nights === 1 ? "" : "s"}`;
  const firstName = r.guestName.split(/[\s&]/)[0];

  return [
    `Hello ${firstName},`,
    "",
    `Your stay at Othayoth Villa, Kannur is confirmed from ${formatDate(r.checkIn)} to ${formatDate(r.checkOut)} (${nightsLabel}).`,
    "",
    `Total: ${inr(total)} · Paid: ${inr(r.amountPaid)} · Balance due: ${inr(balanceDue)}${balanceDue > 0 ? " (please settle this once you check in)" : ""}`,
    "",
    CANCELLATION_POLICY,
    "",
    `Log in to your guest portal for amenities, check-in details and your receipt:`,
    magicLink,
  ].join("\n");
}
