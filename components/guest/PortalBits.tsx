import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/icons/Icon";

export function PortalHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="text-display-md text-palm-600">{title}</h1>
      {intro && <p className="mt-3 max-w-2xl text-stone-400">{intro}</p>}
    </div>
  );
}

export function PortalCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-stone-200/70 bg-linen-50 p-6 shadow-soft", className)}>
      {children}
    </div>
  );
}

/** Large, tappable quick-action tile for the dashboard. */
export function QuickAction({
  href,
  icon,
  label,
  blurb,
}: {
  href: string;
  icon: IconName;
  label: string;
  blurb: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-stone-200/70 bg-linen-50 p-4 shadow-soft transition-all duration-300 ease-gentle hover:-translate-y-0.5 hover:border-brass-300/60 hover:shadow-lift sm:flex-col sm:items-start sm:gap-3 sm:p-5"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-palm-500/10 text-palm-500 transition-colors group-hover:bg-brass-100 group-hover:text-brass-500">
        <Icon name={icon} size={22} />
      </span>
      <span className="min-w-0">
        <span className="block font-medium text-palm-600">{label}</span>
        <span className="block truncate text-sm text-stone-400">{blurb}</span>
      </span>
      <Icon name="arrow-right" size={18} className="ml-auto text-brass-400 sm:hidden" />
    </Link>
  );
}

export function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: IconName;
  label: string;
  value: ReactNode;
  href?: string;
}) {
  const body = (
    <>
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-palm-500/10 text-palm-500">
        <Icon name={icon} size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-widest text-stone-300">{label}</span>
        <span className="block truncate font-medium text-palm-600">{value}</span>
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-palm-500/5">
        {body}
      </a>
    );
  }
  return <div className="flex items-center gap-3 p-2">{body}</div>;
}
