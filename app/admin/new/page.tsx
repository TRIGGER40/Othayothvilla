"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";

type Errors = Partial<Record<string, string>>;

export default function NewReservationPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [magicLink, setMagicLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const data = new FormData(e.currentTarget);
    const bookingRef = String(data.get("bookingRef") ?? "").trim();
    const guestName = String(data.get("guestName") ?? "").trim();
    const phoneLast4 = String(data.get("phoneLast4") ?? "").trim();
    const checkIn = String(data.get("checkIn") ?? "");
    const checkOut = String(data.get("checkOut") ?? "");

    const next: Errors = {};
    if (!bookingRef) next.bookingRef = "Required, e.g. OTV-4821.";
    if (!guestName) next.guestName = "Required.";
    if (!/^\d{4}$/.test(phoneLast4)) next.phoneLast4 = "Exactly 4 digits.";
    if (!checkIn) next.checkIn = "Required.";
    if (!checkOut) next.checkOut = "Required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingRef,
          guestName,
          email: String(data.get("email") ?? "").trim(),
          phoneLast4,
          packageName: String(data.get("packageName") ?? "").trim(),
          guestsAdults: Number(data.get("guestsAdults") ?? 1),
          guestsChildren: Number(data.get("guestsChildren") ?? 0),
          checkIn,
          checkOut,
          checkInTime: String(data.get("checkInTime") ?? "").trim(),
          checkOutTime: String(data.get("checkOutTime") ?? "").trim(),
          nightlyRate: Number(data.get("nightlyRate") ?? 0),
          amountPaid: Number(data.get("amountPaid") ?? 0),
          balanceDue: Number(data.get("balanceDue") ?? 0),
          specialRequests: String(data.get("specialRequests") ?? "").trim(),
          wifiNetwork: String(data.get("wifiNetwork") ?? "").trim(),
          wifiPassword: String(data.get("wifiPassword") ?? "").trim(),
          hostName: String(data.get("hostName") ?? "").trim(),
          hostPhone: String(data.get("hostPhone") ?? "").trim(),
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        setServerError(result.error ?? "Could not create the reservation.");
        setSubmitting(false);
        return;
      }
      setMagicLink(`${window.location.origin}/guest/login?token=${result.reservation.accessToken}`);
    } catch {
      setServerError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  async function copyLink() {
    if (!magicLink) return;
    await navigator.clipboard.writeText(magicLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (magicLink) {
    return (
      <main className="min-h-screen bg-linen-100 px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-lg rounded-3xl border border-stone-200/60 bg-linen-50 p-8 text-center shadow-soft">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-palm-500/12 text-palm-500">
            <Icon name="check" size={28} />
          </span>
          <h1 className="mt-6 font-serif text-2xl text-palm-600">Reservation added</h1>
          <p className="mt-3 text-stone-400">
            Send this stay link to the guest. It signs them straight in when the portal is active.
          </p>
          <div className="mt-5 break-all rounded-xl bg-palm-500/8 p-4 text-left text-sm text-palm-600">
            {magicLink}
          </div>
          <Button onClick={copyLink} icon="link" iconPosition="left" className="mt-5 w-full">
            {copied ? "Copied" : "Copy link"}
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

        <form onSubmit={handleSubmit} noValidate className="mt-8 rounded-3xl border border-stone-200/60 bg-linen-50 p-6 shadow-soft sm:p-8">
          {serverError && (
            <p className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
              {serverError}
            </p>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Booking reference" htmlFor="bookingRef" required error={errors.bookingRef}>
              <Input id="bookingRef" name="bookingRef" placeholder="OTV-4821" autoCapitalize="characters" />
            </Field>
            <Field label="Guest name" htmlFor="guestName" required error={errors.guestName}>
              <Input id="guestName" name="guestName" placeholder="Ananya & Rohan" />
            </Field>
            <Field label="Email" htmlFor="email">
              <Input id="email" name="email" type="email" placeholder="guest@example.com" />
            </Field>
            <Field label="Phone (last 4 digits)" htmlFor="phoneLast4" required error={errors.phoneLast4} hint="Guest uses this to sign in without the link.">
              <Input id="phoneLast4" name="phoneLast4" inputMode="numeric" maxLength={4} placeholder="7788" />
            </Field>
            <Field label="Check-in" htmlFor="checkIn" required error={errors.checkIn}>
              <Input id="checkIn" name="checkIn" type="date" />
            </Field>
            <Field label="Check-out" htmlFor="checkOut" required error={errors.checkOut}>
              <Input id="checkOut" name="checkOut" type="date" />
            </Field>
            <Field label="Check-in time" htmlFor="checkInTime">
              <Input id="checkInTime" name="checkInTime" defaultValue="2:00 PM" />
            </Field>
            <Field label="Check-out time" htmlFor="checkOutTime">
              <Input id="checkOutTime" name="checkOutTime" defaultValue="11:00 AM" />
            </Field>
            <Field label="Adults" htmlFor="guestsAdults">
              <Input id="guestsAdults" name="guestsAdults" type="number" min={1} defaultValue={2} />
            </Field>
            <Field label="Children" htmlFor="guestsChildren">
              <Input id="guestsChildren" name="guestsChildren" type="number" min={0} defaultValue={0} />
            </Field>
            <Field label="Package name" htmlFor="packageName" className="sm:col-span-2">
              <Input id="packageName" name="packageName" placeholder="The Whole Villa · Weekend" />
            </Field>
            <Field label="Nightly rate (₹)" htmlFor="nightlyRate">
              <Input id="nightlyRate" name="nightlyRate" type="number" min={0} defaultValue={24500} />
            </Field>
            <Field label="Amount paid (₹)" htmlFor="amountPaid">
              <Input id="amountPaid" name="amountPaid" type="number" min={0} defaultValue={0} />
            </Field>
            <Field label="Balance due (₹)" htmlFor="balanceDue">
              <Input id="balanceDue" name="balanceDue" type="number" min={0} defaultValue={0} />
            </Field>
            <Field label="Wi-Fi network" htmlFor="wifiNetwork">
              <Input id="wifiNetwork" name="wifiNetwork" defaultValue="Othayoth_Villa" />
            </Field>
            <Field label="Wi-Fi password" htmlFor="wifiPassword">
              <Input id="wifiPassword" name="wifiPassword" defaultValue="coconut-grove-42" />
            </Field>
            <Field label="Host name" htmlFor="hostName">
              <Input id="hostName" name="hostName" defaultValue="Midhun" />
            </Field>
            <Field label="Host phone" htmlFor="hostPhone">
              <Input id="hostPhone" name="hostPhone" placeholder="+91 98470 00000" />
            </Field>
            <Field label="Special requests" htmlFor="specialRequests" className="sm:col-span-2">
              <Textarea id="specialRequests" name="specialRequests" placeholder="Celebrating an anniversary, dietary notes, etc." />
            </Field>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
            {submitting ? "Adding…" : "Add reservation"}
          </Button>
        </form>
      </div>
    </main>
  );
}
