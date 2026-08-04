"use client";

import { useState, type FormEvent } from "react";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export type ReservationFormValues = {
  bookingRef: string;
  guestName: string;
  email: string;
  phoneLast4: string;
  checkIn: string;
  checkOut: string;
  checkInTime: string;
  checkOutTime: string;
  guestsAdults: number;
  guestsChildren: number;
  packageName: string;
  nightlyRate: number;
  amountPaid: number;
  hostName: string;
  hostPhone: string;
  specialRequests: string;
};

type Errors = Partial<Record<string, string>>;

const DEFAULTS: ReservationFormValues = {
  bookingRef: "",
  guestName: "",
  email: "",
  phoneLast4: "",
  checkIn: "",
  checkOut: "",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  guestsAdults: 2,
  guestsChildren: 0,
  packageName: "",
  nightlyRate: 24500,
  amountPaid: 0,
  hostName: "Midhun",
  hostPhone: "",
  specialRequests: "",
};

/** Shared by "add a reservation" and the edit modal, so both stay in sync. */
export function ReservationForm({
  initialValues,
  onSubmit,
  submitLabel,
  onCancel,
}: {
  initialValues?: Partial<ReservationFormValues>;
  onSubmit: (values: ReservationFormValues) => Promise<{ ok: boolean; error?: string }>;
  submitLabel: string;
  onCancel?: () => void;
}) {
  const values = { ...DEFAULTS, ...initialValues };
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
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
    const result = await onSubmit({
      bookingRef,
      guestName,
      email: String(data.get("email") ?? "").trim(),
      phoneLast4,
      checkIn,
      checkOut,
      checkInTime: String(data.get("checkInTime") ?? "").trim(),
      checkOutTime: String(data.get("checkOutTime") ?? "").trim(),
      guestsAdults: Number(data.get("guestsAdults") ?? 1),
      guestsChildren: Number(data.get("guestsChildren") ?? 0),
      packageName: String(data.get("packageName") ?? "").trim(),
      nightlyRate: Number(data.get("nightlyRate") ?? 0),
      amountPaid: Number(data.get("amountPaid") ?? 0),
      hostName: String(data.get("hostName") ?? "").trim(),
      hostPhone: String(data.get("hostPhone") ?? "").trim(),
      specialRequests: String(data.get("specialRequests") ?? "").trim(),
    });

    if (!result.ok) {
      setServerError(result.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-stone-200/60 bg-linen-50 p-6 shadow-soft sm:p-8">
      {serverError && (
        <p className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          {serverError}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Booking reference" htmlFor="bookingRef" required error={errors.bookingRef}>
          <Input id="bookingRef" name="bookingRef" defaultValue={values.bookingRef} placeholder="OTV-4821" autoCapitalize="characters" />
        </Field>
        <Field label="Guest name" htmlFor="guestName" required error={errors.guestName}>
          <Input id="guestName" name="guestName" defaultValue={values.guestName} placeholder="Ananya & Rohan" />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" defaultValue={values.email} placeholder="guest@example.com" />
        </Field>
        <Field label="Phone (last 4 digits)" htmlFor="phoneLast4" required error={errors.phoneLast4} hint="Guest uses this to sign in without the link.">
          <Input id="phoneLast4" name="phoneLast4" defaultValue={values.phoneLast4} inputMode="numeric" maxLength={4} placeholder="7788" />
        </Field>
        <Field label="Check-in" htmlFor="checkIn" required error={errors.checkIn}>
          <Input id="checkIn" name="checkIn" type="date" defaultValue={values.checkIn} />
        </Field>
        <Field label="Check-out" htmlFor="checkOut" required error={errors.checkOut}>
          <Input id="checkOut" name="checkOut" type="date" defaultValue={values.checkOut} />
        </Field>
        <Field label="Check-in time" htmlFor="checkInTime">
          <Input id="checkInTime" name="checkInTime" defaultValue={values.checkInTime} />
        </Field>
        <Field label="Check-out time" htmlFor="checkOutTime">
          <Input id="checkOutTime" name="checkOutTime" defaultValue={values.checkOutTime} />
        </Field>
        <Field label="Adults" htmlFor="guestsAdults">
          <Input id="guestsAdults" name="guestsAdults" type="number" min={1} defaultValue={values.guestsAdults} />
        </Field>
        <Field label="Children" htmlFor="guestsChildren">
          <Input id="guestsChildren" name="guestsChildren" type="number" min={0} defaultValue={values.guestsChildren} />
        </Field>
        <Field label="Package name" htmlFor="packageName" className="sm:col-span-2">
          <Input id="packageName" name="packageName" defaultValue={values.packageName} placeholder="The Whole Villa · Weekend" />
        </Field>
        <Field label="Nightly rate (₹)" htmlFor="nightlyRate">
          <Input id="nightlyRate" name="nightlyRate" type="number" min={0} defaultValue={values.nightlyRate} />
        </Field>
        <Field label="Amount paid (₹)" htmlFor="amountPaid" hint="Balance due is calculated automatically from nights × rate.">
          <Input id="amountPaid" name="amountPaid" type="number" min={0} defaultValue={values.amountPaid} />
        </Field>
        <Field label="Host name" htmlFor="hostName">
          <Input id="hostName" name="hostName" defaultValue={values.hostName} />
        </Field>
        <Field label="Host phone" htmlFor="hostPhone">
          <Input id="hostPhone" name="hostPhone" defaultValue={values.hostPhone} placeholder="+91 98470 00000" />
        </Field>
        <Field label="Special requests" htmlFor="specialRequests" className="sm:col-span-2">
          <Textarea id="specialRequests" name="specialRequests" defaultValue={values.specialRequests} placeholder="Celebrating an anniversary, dietary notes, etc." />
        </Field>
      </div>

      <div className="mt-6 flex gap-3">
        {onCancel && (
          <Button type="button" variant="secondary" className="flex-1" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" size="lg" className="flex-1" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
