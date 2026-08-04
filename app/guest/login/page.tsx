import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import { LoginForm } from "@/components/guest/LoginForm";
import { Wordmark } from "@/components/marketing/Wordmark";
import { Icon } from "@/components/icons/Icon";
import { site } from "@/lib/content";
import { villaPhotos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Guest Portal Sign-in",
  description: "Secure, stay-only access to your Othayoth Villa guest portal.",
  robots: { index: false, follow: false },
};

export default function GuestLoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Brand / scene side */}
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src={villaPhotos.exteriorDusk.src}
          alt={villaPhotos.exteriorDusk.alt}
          fill
          sizes="50vw"
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-palm-700/80 via-palm-600/40 to-palm-600/20" />
        <div className="relative flex h-full flex-col justify-between p-12 text-linen-100">
          <Link href="/" aria-label={`${site.name} home`}>
            <Wordmark invert />
          </Link>
          <div>
            <p className="eyebrow text-brass-200">Your stay, in your pocket</p>
            <h1 className="mt-4 max-w-md text-display-md text-linen-50">
              Welcome. Everything for your stay is a tap away.
            </h1>
            <ul className="mt-8 space-y-3 text-linen-100/85">
              {["Check-in guide and access", "How everything in the house works", "Requests, dining and local tips", "Emergency contacts, any hour"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Icon name="check" size={18} className="text-brass-300" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex flex-col justify-center bg-linen-100 px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden">
            <Link href="/" aria-label={`${site.name} home`}>
              <Wordmark />
            </Link>
          </div>
          <div className="mt-8 lg:mt-0">
            <p className="eyebrow mb-3">Guest portal</p>
            <h1 className="text-display-md text-palm-600">Open your stay</h1>
            <p className="mt-3 text-stone-400">
              Access is private to your reservation and available only around your
              stay dates.
            </p>
          </div>

          <div className="mt-8">
            <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-linen-200/60" />}>
              <LoginForm />
            </Suspense>
          </div>

          <div className="mt-8 rounded-2xl bg-palm-500/8 p-4 text-sm text-stone-400">
            <p className="flex items-center gap-2 font-medium text-palm-600">
              <Icon name="key" size={16} className="text-brass-400" /> Demo access
            </p>
            <p className="mt-1.5">
              Try booking reference <span className="font-mono text-palm-600">OTV-4821</span> with phone digits{" "}
              <span className="font-mono text-palm-600">7788</span>.
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-stone-400">
            Not a guest yet?{" "}
            <Link href="/book" className="text-brass-500 underline underline-offset-4 hover:text-brass-400">
              Check availability
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-stone-300">
            Need help? Call{" "}
            <a href={`tel:${site.phoneHref}`} className="underline underline-offset-2">
              {site.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
