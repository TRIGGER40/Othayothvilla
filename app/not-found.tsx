import Link from "next/link";
import { Wordmark } from "@/components/marketing/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { Scene } from "@/components/ui/Scene";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linen-100 px-6">
      <Scene tone="palm" motif="palms" aspect="" rounded="" className="absolute inset-0 h-full w-full opacity-25" label="" />
      <div className="relative text-center">
        <Link href="/" className="mx-auto inline-block">
          <Wordmark />
        </Link>
        <p className="mt-10 font-serif text-display-lg text-palm-600">404</p>
        <h1 className="mt-2 text-2xl text-palm-600">This path leads nowhere</h1>
        <p className="mx-auto mt-3 max-w-sm text-stone-400">
          The page you are looking for has drifted off. Let us walk you back to the villa.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" icon="arrow-right">Back to home</ButtonLink>
          <ButtonLink href="/book" variant="secondary">Check availability</ButtonLink>
        </div>
      </div>
    </main>
  );
}
