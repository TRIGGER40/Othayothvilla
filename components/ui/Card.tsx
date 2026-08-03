import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/icons/Icon";

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stone-200/50 bg-linen-50 shadow-soft",
        interactive &&
          "transition-all duration-500 ease-gentle hover:-translate-y-1 hover:shadow-lift hover:border-brass-300/50",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IconBadge({ name, className }: { name: IconName; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full bg-palm-500/10 text-palm-500",
        className,
      )}
    >
      <Icon name={name} size={20} />
    </span>
  );
}

export function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card interactive className="h-full p-7">
      <IconBadge name={icon} />
      <h3 className="mt-5 text-xl text-palm-600">{title}</h3>
      <p className="mt-3 leading-relaxed text-stone-400">{children}</p>
    </Card>
  );
}
