"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/Icon";

export type AccordionItem = { q: string; a: string };

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-stone-200/60 rounded-2xl border border-stone-200/60 bg-linen-50", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
              >
                <span className="font-serif text-lg text-palm-600">{item.q}</span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-palm-500/10 text-palm-500 transition-transform duration-300 ease-gentle",
                    isOpen && "rotate-180 bg-brass-100 text-brass-500",
                  )}
                >
                  <Icon name="chevron-down" size={18} />
                </span>
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-all duration-500 ease-gentle",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-stone-400 sm:px-7 sm:pr-16">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
