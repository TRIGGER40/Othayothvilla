import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "linen" | "palm" | "sand" | "cream";
  size?: "sm" | "md" | "lg";
};

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  linen: "bg-linen-100 text-ink",
  cream: "bg-linen-50 text-ink",
  sand: "bg-sand-100/60 text-ink",
  palm: "bg-palm-600 text-linen-100",
};

const spacing: Record<NonNullable<SectionProps["size"]>, string> = {
  sm: "py-14 sm:py-16",
  md: "py-20 sm:py-24",
  lg: "py-24 sm:py-32",
};

export function Section({ children, className, id, tone = "linen", size = "md" }: SectionProps) {
  return (
    <section id={id} className={cn(tones[tone], spacing[size], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  invert = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-4", invert && "text-brass-200")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "text-display-md text-balance",
          invert ? "text-linen-50" : "text-palm-600",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty",
            invert ? "text-linen-100/80" : "text-stone-400",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
