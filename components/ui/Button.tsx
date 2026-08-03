import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/icons/Icon";

type Variant = "primary" | "secondary" | "ghost" | "brass" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-palm-600 text-linen-50 hover:bg-palm-500 shadow-soft hover:shadow-lift ring-offset-linen-100",
  brass:
    "bg-brass-400 text-palm-700 hover:bg-brass-300 shadow-brass hover:shadow-lift ring-offset-linen-100",
  secondary:
    "border border-palm-600/25 text-palm-600 bg-linen-50/60 hover:bg-linen-50 hover:border-palm-600/40 ring-offset-linen-100",
  ghost:
    "text-palm-600 hover:bg-palm-500/10 ring-offset-linen-100",
  // For dark/photo backgrounds. Kept as its own variant rather than an
  // override className on `secondary`: Tailwind's generated CSS order (not
  // the className string order) decides which conflicting utility wins, so
  // layering light-on-dark colors on top of secondary's dark-on-light
  // defaults was silently rendering invisible dark-on-dark text/borders.
  outline:
    "border border-linen-100/30 bg-linen-50/10 text-linen-50 backdrop-blur-sm hover:bg-linen-50/20 ring-offset-palm-600",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-[0.95rem] px-6 py-3",
  lg: "text-base px-8 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {icon && iconPosition === "left" && <Icon name={icon} size={18} />}
      {children}
      {icon && iconPosition === "right" && <Icon name={icon} size={18} />}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  external,
}: CommonProps & { href: string; external?: boolean }) {
  const classes = cn(base, variants[variant], sizes[size], "group", className);
  const content = (
    <>
      {icon && iconPosition === "left" && <Icon name={icon} size={18} />}
      {children}
      {icon && iconPosition === "right" && (
        <Icon
          name={icon}
          size={18}
          className="transition-transform duration-300 ease-gentle group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
