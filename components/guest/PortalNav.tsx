"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { portalNav } from "@/lib/portal";
import { Icon, type IconName } from "@/components/icons/Icon";

/** Desktop sidebar navigation for the portal. */
export function PortalSidebar() {
  const pathname = usePathname();
  return (
    <nav aria-label="Portal" className="space-y-1">
      {portalNav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200",
              active
                ? "bg-palm-500/12 font-medium text-palm-600"
                : "text-stone-400 hover:bg-palm-500/6 hover:text-palm-600",
            )}
          >
            <Icon name={item.icon as IconName} size={20} className={active ? "text-brass-500" : "text-stone-300"} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Mobile bottom tab bar. Large tap targets, thumb-friendly. */
export function PortalTabBar() {
  const pathname = usePathname();
  // Show the five most-used destinations on the bar.
  const tabs = portalNav.filter((i) =>
    ["/guest/dashboard", "/guest/check-in", "/guest/house-guide", "/guest/services", "/guest/emergency"].includes(i.href),
  );
  return (
    <nav
      aria-label="Portal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200/70 bg-linen-50/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {tabs.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium transition-colors",
                active ? "text-palm-600" : "text-stone-300",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                  active ? "bg-palm-500/12 text-brass-500" : "text-stone-400",
                )}
              >
                <Icon name={item.icon as IconName} size={20} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
