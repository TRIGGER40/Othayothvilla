"use client";

import { useState, type FormEvent } from "react";
import { Field, Input, Textarea, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { nightsBetween } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;

/**
 * Booking inquiry form. Validates entirely client-side for UX, but a real
 * submission must be re-validated server-side. Marked as a placeholder submit;
 * wire `onSubmit` to POST to your booking endpoint (with a CSRF token and
 * server-side validation) when the backend is ready.
 */
export function BookingForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const today = new Date().toISOString().slice(0, 10);

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const ci = String(data.get("checkIn") ?? "");
    const co = String(data.get("checkOut") ?? "");

    if (name.length < 2) next.name = "Please tell us your name.";
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (!PHONE_RE.test(phone)) next.phone = "Enter a valid phone number.";
    if (!ci) next.checkIn = "Choose a check-in date.";
    if (!co) next.checkOut = "Choose a check-out date.";
    if (ci && co && nightsBetween(ci, co) < 1) next.checkOut = "Check-out must be after check-in.";
    return next;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate(e.currentTarget);
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // Placeholder: replace with a server POST (CSRF-protected) at integration.
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-brass-300/50 bg-linen-50 p-10 text-center shadow-soft">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-palm-500/12 text-palm-500">
          <Icon name="check" size={28} />
        </span>
        <h3 className="mt-6 text-2xl text-palm-600">Your request is in</h3>
        <p className="mx-auto mt-3 max-w-md text-stone-400">
          Thank you. We will check the dates and reply the same day, usually within
          a few hours, with availability and next steps.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-brass-500 underline underline-offset-4 hover:text-brass-400"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-stone-200/60 bg-linen-50 p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" required error={errors.name} className="sm:col-span-2">
          <Input id="name" name="name" autoComplete="name" placeholder="Ananya Menon" />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        </Field>
        <Field label="Phone / WhatsApp" htmlFor="phone" required error={errors.phone}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98470 00000" />
        </Field>
        <Field label="Check-in" htmlFor="checkIn" required error={errors.checkIn}>
          <Input
            id="checkIn"
            name="checkIn"
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </Field>
        <Field label="Check-out" htmlFor="checkOut" required error={errors.checkOut}>
          <Input
            id="checkOut"
            name="checkOut"
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </Field>
        <Field label="Adults" htmlFor="adults">
          <Select id="adults" name="adults" defaultValue="2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </Select>
        </Field>
        <Field label="Children" htmlFor="children">
          <Select id="children" name="children" defaultValue="0">
            {[0, 1, 2, 3].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </Select>
        </Field>
        <Field label="Occasion (optional)" htmlFor="occasion" className="sm:col-span-2">
          <Select id="occasion" name="occasion" defaultValue="">
            <option value="">A regular getaway</option>
            <option value="anniversary">Anniversary</option>
            <option value="birthday">Birthday</option>
            <option value="family">Family reunion</option>
            <option value="friends">Friends trip</option>
            <option value="honeymoon">Honeymoon</option>
          </Select>
        </Field>
        <Field label="Special requests" htmlFor="requests" hint="Dietary needs, celebration setup, early arrival." className="sm:col-span-2">
          <Textarea id="requests" name="requests" placeholder="Tell us anything that would make your stay better." />
        </Field>
      </div>

      {nights > 0 && (
        <p className="mt-5 flex items-center gap-2 rounded-xl bg-palm-500/8 px-4 py-3 text-sm text-palm-600">
          <Icon name="calendar" size={18} className="text-brass-400" />
          {nights} {nights === 1 ? "night" : "nights"} selected
        </p>
      )}

      <Button type="submit" size="lg" icon="arrow-right" className="mt-6 w-full">
        Request availability
      </Button>
      <p className="mt-4 text-center text-xs text-stone-300">
        No payment is taken now. We reply with availability and a simple hold.
      </p>
    </form>
  );
}
