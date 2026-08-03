"use client";

import { useState, type FormEvent } from "react";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (String(data.get("name") ?? "").trim().length < 2) next.name = "Please tell us your name.";
    if (!EMAIL_RE.test(String(data.get("email") ?? ""))) next.email = "Enter a valid email.";
    if (String(data.get("message") ?? "").trim().length < 5) next.message = "A short message helps us help you.";
    setErrors(next);
    // Placeholder: POST to a CSRF-protected endpoint at integration time.
    if (Object.keys(next).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-brass-300/50 bg-linen-50 p-10 text-center shadow-soft">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-palm-500/12 text-palm-500">
          <Icon name="check" size={28} />
        </span>
        <h3 className="mt-6 text-2xl text-palm-600">Message sent</h3>
        <p className="mx-auto mt-3 max-w-md text-stone-400">
          Thank you for reaching out. We will reply personally, usually within a
          few hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-stone-200/60 bg-linen-50 p-6 shadow-soft sm:p-8">
      <div className="grid gap-5">
        <Field label="Your name" htmlFor="c-name" required error={errors.name}>
          <Input id="c-name" name="name" autoComplete="name" placeholder="Your name" />
        </Field>
        <Field label="Email" htmlFor="c-email" required error={errors.email}>
          <Input id="c-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        </Field>
        <Field label="Phone (optional)" htmlFor="c-phone">
          <Input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98470 00000" />
        </Field>
        <Field label="How can we help?" htmlFor="c-message" required error={errors.message}>
          <Textarea id="c-message" name="message" placeholder="Your question or message" />
        </Field>
      </div>
      <Button type="submit" size="lg" icon="arrow-right" className="mt-6 w-full">
        Send message
      </Button>
    </form>
  );
}
