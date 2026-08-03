"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { primaryNav, site } from "@/lib/content";
import { Icon } from "@/components/icons/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/marketing/Wordmark";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-500 ease-gentle",
        scrolled
          ? "border-b border-stone-200/60 bg-linen-100/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                  active ? "text-palm-600" : "text-stone-400 hover:text-palm-600",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/guest/login"
            className="rounded-full px-3.5 py-2 text-sm text-stone-400 transition-colors hover:text-palm-600"
          >
            Guest portal
          </Link>
          <ButtonLink href="/book" size="sm" variant="primary" icon="arrow-right">
            Check dates
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-palm-600 hover:bg-palm-500/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "fixed inset-x-0 top-16 z-40 origin-top border-b border-stone-200/60 bg-linen-50 shadow-lift transition-all duration-400 ease-gentle sm:top-20",
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          <nav aria-label="Mobile" className="container-page grid gap-1 py-6">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-lg text-palm-600 hover:bg-palm-500/5"
              >
                {item.label}
                <Icon name="arrow-right" size={18} className="text-brass-400" />
              </Link>
            ))}
            <div className="mt-4 grid gap-3 border-t border-stone-200/60 pt-6">
              <ButtonLink href="/book" variant="primary" icon="arrow-right">
                Check availability
              </ButtonLink>
              <ButtonLink href="/guest/login" variant="secondary" icon="key" iconPosition="left">
                Guest portal
              </ButtonLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
