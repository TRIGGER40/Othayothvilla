"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons/Icon";
import { ReservationForm, type ReservationFormValues } from "@/components/admin/ReservationForm";
import type { Reservation } from "@/lib/reservations";

export function EditReservationModal({
  reservation,
  onClose,
}: {
  reservation: Reservation;
  onClose: () => void;
}) {
  const router = useRouter();

  async function handleSubmit(values: ReservationFormValues) {
    try {
      const res = await fetch(`/api/admin/reservations/${reservation.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        return { ok: false, error: result.error ?? "Could not save the changes." };
      }
      router.refresh();
      onClose();
      return { ok: true };
    } catch {
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-palm-700/50 px-4 py-10 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-xl text-linen-50">Edit {reservation.bookingRef}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-linen-50/15 text-linen-50 hover:bg-linen-50/25"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
        <ReservationForm
          initialValues={{
            bookingRef: reservation.bookingRef,
            guestName: reservation.guestName,
            email: reservation.email,
            phoneLast4: reservation.phoneLast4,
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
            checkInTime: reservation.checkInTime,
            checkOutTime: reservation.checkOutTime,
            guestsAdults: reservation.guests.adults,
            guestsChildren: reservation.guests.children,
            packageName: reservation.packageName,
            nightlyRate: reservation.nightlyRate,
            amountPaid: reservation.amountPaid,
            hostName: reservation.hostName,
            hostPhone: reservation.hostPhone,
            specialRequests: reservation.specialRequests ?? "",
          }}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
