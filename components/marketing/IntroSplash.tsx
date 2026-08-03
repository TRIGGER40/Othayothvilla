"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { logo } from "@/lib/images";

const STORAGE_KEY = "othayoth-intro-shown";
const ENTER_MS = 1200;
const HOLD_MS = 3000;
const FADE_MS = 800;

/**
 * A brief branded intro on first load: the vertical logo lockup fades and
 * settles in slowly on a plain ivory field, holds still for a few seconds,
 * then the whole overlay fades to reveal the site underneath (which has
 * already rendered, so the fade *is* the reveal). Shown once per browser
 * session via sessionStorage, never on in-app navigation (this component
 * mounts once in the root layout).
 */
export function IntroSplash() {
  const [phase, setPhase] = useState<"enter" | "hold" | "fade" | "done">("enter");
  const [logoIn, setLogoIn] = useState(false);

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Storage unavailable (e.g. private mode) — showing the intro once is harmless.
    }

    if (alreadyShown) {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";
    // Defer to the next frame so the opacity/scale transition actually animates
    // from its initial state instead of snapping straight to visible.
    const raf = requestAnimationFrame(() => setLogoIn(true));
    const enterTimer = setTimeout(() => setPhase("hold"), ENTER_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(enterTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "hold") return;
    const holdTimer = setTimeout(() => setPhase("fade"), HOLD_MS);
    return () => clearTimeout(holdTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "fade") return;
    const fadeTimer = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Nothing to persist; the intro will simply show again next load.
      }
    }, FADE_MS);
    return () => clearTimeout(fadeTimer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      id="site-intro-splash"
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-linen-50 transition-opacity ease-gentle",
        phase === "fade" ? "opacity-0" : "opacity-100",
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <Image
        src={logo.verticalLight.src}
        alt=""
        width={logo.verticalLight.width}
        height={logo.verticalLight.height}
        priority
        className={cn(
          "h-auto w-44 sm:w-56 transition-all ease-gentle",
          logoIn ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
        style={{ transitionDuration: `${ENTER_MS}ms` }}
      />
      {/* Without JS this timer never fires; hide immediately rather than block the page. */}
      <noscript>
        <style>{"#site-intro-splash{display:none!important}"}</style>
      </noscript>
    </div>
  );
}
