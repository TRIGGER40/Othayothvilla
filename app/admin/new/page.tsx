"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { ReservationForm, type ReservationFormValues } from "@/components/admin/ReservationForm";
import { buildStayMessage } from "@/lib/guest-message";
import type { Reservation } from "@/lib/reservations";

export default function NewReservationPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(values: ReservationFormValues) {
    try {
      const res = await fetch("/api/admin/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        return { ok: false, error: result.error ?? "Could not create the reservation." };
      }
      const reservation = result.reservation as Reservation;
      const magicLink = `${window.location.origin}/guest/login?token=${reservation.accessToken}`;
      setMessage(buildStayMessage(reservation, magicLink));
      return { ok: true };
    } catch {
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  }

  async function copyMessage() {
    if (!message) return;
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (message) {
    return (
      <main className="min-h-screen bg-linen-100 px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-lg rounded-3xl border border-stone-200/60 bg-linen-50 p-8 text-center shadow-soft">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-palm-500/12 text-palm-500">
            <Icon name="check" size={28} />
          </span>
          <h1 className="mt-6 font-serif text-2xl text-palm-600">Reservation added</h1>
          <p className="mt-3 text-stone-400">
            Send this message to the guest over WhatsApp or email. It includes their stay link.
          </p>
          <div className="mt-5 whitespace-pre-line rounded-xl bg-palm-500/8 p-4 text-left text-sm text-palm-600">
            {message}
          </div>
          <Button onClick={copyMessage} icon="link" iconPosition="left" className="mt-5 w-full">
            {copied ? "Copied" : "Copy message"}
          </Button>
          <Link href="/admin" className="mt-4 block text-sm text-brass-500 underline underline-offset-4 hover:text-brass-400">
            Back to reservations
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linen-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/admin" className="text-sm text-stone-400 underline underline-offset-4 hover:text-palm-600">
          ← Reservations
        </Link>
        <h1 className="mt-3 font-serif text-3xl text-palm-600">Add a reservation</h1>
        <p className="mt-1 text-sm text-stone-400">
          This gives the guest a private stay link, active from 72 hours before check-in to 24 hours after checkout.
        </p>

        <div className="mt-8">
          <ReservationForm onSubmit={handleSubmit} submitLabel="Add reservation" />
        </div>
      </div>
    </main>
  );
}
