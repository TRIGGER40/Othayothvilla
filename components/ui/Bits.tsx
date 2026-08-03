import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/Icon";
import { logo } from "@/lib/images";

export function Badge({
  children,
  tone = "brass",
  className,
}: {
  children: ReactNode;
  tone?: "brass" | "palm" | "neutral";
  className?: string;
}) {
  const tones = {
    brass: "bg-brass-100 text-brass-500",
    palm: "bg-palm-500/12 text-palm-500",
    neutral: "bg-stone-200/40 text-stone-400",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A thin brass line divider with the villa's blossom mark, used between sections. */
export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-brass-300", className)}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-brass-300/70" />
      <Image src={logo.mark.src} alt="" width={logo.mark.width} height={logo.mark.height} className="h-5 w-5" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-brass-300/70" />
    </div>
  );
}

export function StarRating({ value = 5, className }: { value?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5 text-brass-400", className)} aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" size={16} fill={i < value ? "currentColor" : "none"} stroke="currentColor" />
      ))}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl text-palm-600 sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm uppercase tracking-widest text-stone-300">{label}</div>
    </div>
  );
}
