"use client";

import { useEffect } from "react";

/**
 * Smoothly brings the booking form into view shortly after the page loads.
 * On a visitor's very first page ever (see IntroSplash), the body scroll is
 * locked for a few seconds during the branded intro; if that overlaps this
 * timer, wait it out rather than firing a scroll that silently does nothing.
 */
export function ScrollToForm({ targetId }: { targetId: string }) {
  useEffect(() => {
    let cancelled = false;

    function attemptScroll() {
      if (cancelled) return;
      if (getComputedStyle(document.body).overflow === "hidden") {
        setTimeout(attemptScroll, 200);
        return;
      }
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const timer = setTimeout(attemptScroll, 1000);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [targetId]);

  return null;
}
