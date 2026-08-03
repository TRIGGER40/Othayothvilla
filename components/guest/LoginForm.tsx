"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";

type Status = "idle" | "verifying" | "error";

// Only allow internal, same-path redirects to avoid open-redirect abuse.
function safeNext(next: string | null): string {
  if (next && next.startsWith("/guest/") && !next.startsWith("//")) return next;
  return "/guest/dashboard";
}

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [showFallback, setShowFallback] = useState(false);
  const autoTried = useRef(false);

  async function authenticate(payload: Record<string, string>) {
    setStatus("verifying");
    setError("");
    try {
      const res = await fetch("/api/guest/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Requested-With": "fetch" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; redirect?: string };
      if (data.ok) {
        router.replace(next || data.redirect || "/guest/dashboard");
        router.refresh();
        return;
      }
      setStatus("error");
      setError(data.error ?? "Something went wrong. Please try again.");
      setShowFallback(true);
    } catch {
      setStatus("error");
      setError("We could not reach the server. Please check your connection and try again.");
    }
  }

  // Magic-link: if a token is present, verify it once and strip it from the URL.
  useEffect(() => {
    const token = params.get("token");
    if (token && !autoTried.current) {
      autoTried.current = true;
      // Remove the token from the visible URL / history to limit exposure.
      window.history.replaceState(null, "", window.location.pathname);
      void authenticate({ token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifying = status === "verifying";

  return (
    <div className="w-full">
      {status === "error" && error && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
          <Icon name="shield" size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!showFallback ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200/70 bg-linen-50 p-6 text-center">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-palm-500/10 text-palm-500">
              <Icon name={verifying ? "key" : "mail"} size={22} />
            </span>
            <h2 className="mt-4 font-serif text-xl text-palm-600">
              {verifying ? "Verifying your link" : "Use your stay link"}
            </h2>
            <p className="mt-2 text-sm text-stone-400">
              {verifying
                ? "One moment while we open your stay."
                : "Open the secure link we sent to your email or WhatsApp when your booking was confirmed."}
            </p>
            {verifying && (
              <div className="mt-4 flex justify-center">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-palm-200 border-t-palm-500" />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFallback(true)}
            className="w-full text-center text-sm text-brass-500 underline underline-offset-4 hover:text-brass-400"
          >
            I do not have the link
          </button>
        </div>
      ) : (
        <FallbackForm verifying={verifying} onSubmit={authenticate} onBack={() => setShowFallback(false)} />
      )}
    </div>
  );
}

function FallbackForm({
  verifying,
  onSubmit,
  onBack,
}: {
  verifying: boolean;
  onSubmit: (p: Record<string, string>) => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const bookingRef = String(data.get("bookingRef") ?? "").trim();
    const phoneLast4 = String(data.get("phoneLast4") ?? "").trim();
    const next: Record<string, string> = {};
    if (!/^[A-Za-z0-9-]{4,20}$/.test(bookingRef)) next.bookingRef = "Enter your booking reference, e.g. OTV-4821.";
    if (!/^\d{4}$/.test(phoneLast4)) next.phoneLast4 = "Enter the last 4 digits of your phone.";
    setErrors(next);
    if (Object.keys(next).length === 0) onSubmit({ bookingRef, phoneLast4 });
  }

  return (
    <form onSubmit={handle} noValidate className="space-y-5 rounded-2xl border border-stone-200/70 bg-linen-50 p-6">
      <div>
        <h2 className="font-serif text-xl text-palm-600">Sign in with your booking</h2>
        <p className="mt-1 text-sm text-stone-400">
          Use your booking reference and the last four digits of the phone number on your reservation.
        </p>
      </div>
      <Field label="Booking reference" htmlFor="bookingRef" required error={errors.bookingRef}>
        <Input id="bookingRef" name="bookingRef" placeholder="OTV-4821" autoCapitalize="characters" autoComplete="off" />
      </Field>
      <Field label="Phone (last 4 digits)" htmlFor="phoneLast4" required error={errors.phoneLast4}>
        <Input id="phoneLast4" name="phoneLast4" inputMode="numeric" maxLength={4} placeholder="7788" autoComplete="off" />
      </Field>
      <Button type="submit" size="lg" icon="arrow-right" className="w-full" disabled={verifying}>
        {verifying ? "Verifying" : "Open my stay"}
      </Button>
      <button
        type="button"
        onClick={onBack}
        className="w-full text-center text-sm text-stone-400 underline underline-offset-4 hover:text-palm-600"
      >
        Back to stay link
      </button>
    </form>
  );
}
