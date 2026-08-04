"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const password = new FormData(e.currentTarget).get("password");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Incorrect password.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linen-100 px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm rounded-3xl border border-stone-200/60 bg-linen-50 p-8 shadow-soft"
      >
        <h1 className="font-serif text-2xl text-palm-600">Admin</h1>
        <p className="mt-1 text-sm text-stone-400">Othayoth Villa reservations.</p>
        <Field label="Password" htmlFor="password" error={error ?? undefined} className="mt-6">
          <Input id="password" name="password" type="password" autoComplete="current-password" autoFocus />
        </Field>
        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "Checking…" : "Sign in"}
        </Button>
      </form>
    </main>
  );
}
