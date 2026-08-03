"use client";

import { useState } from "react";
import { services } from "@/lib/portal";
import { Textarea, Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

/**
 * Service request tiles that expand into a short form. Submissions are a
 * placeholder here; wire each to a CSRF-protected endpoint (or your messaging
 * backend) at integration. Kept low-typing and thumb-friendly for mobile.
 */
export function RequestForm() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [doneId, setDoneId] = useState<string | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {services.map((s) => {
        const isOpen = openId === s.id;
        const isDone = doneId === s.id;
        return (
          <div
            key={s.id}
            className={cn(
              "rounded-2xl border bg-linen-50 shadow-soft transition-colors",
              isOpen ? "border-brass-300/70" : "border-stone-200/70",
              isDone && "border-palm-300/60",
            )}
          >
            <button
              type="button"
              onClick={() => {
                setOpenId(isOpen ? null : s.id);
                setDoneId(null);
              }}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 p-5 text-left"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-palm-500/10 text-palm-500">
                <Icon name={s.icon as IconName} size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-palm-600">{s.title}</span>
                <span className="block text-sm text-stone-400">{s.blurb}</span>
              </span>
              <Icon
                name="chevron-down"
                size={18}
                className={cn("shrink-0 text-brass-400 transition-transform", isOpen && "rotate-180")}
              />
            </button>

            {isOpen && !isDone && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDoneId(s.id);
                  setOpenId(null);
                }}
                className="space-y-4 border-t border-stone-200/60 p-5"
              >
                <Field label="When would you like this?" htmlFor={`${s.id}-when`}>
                  <Input id={`${s.id}-when`} name="when" placeholder="e.g. this evening, around 7 PM" />
                </Field>
                <Field label="Any details?" htmlFor={`${s.id}-notes`}>
                  <Textarea id={`${s.id}-notes`} name="notes" placeholder="Tell us anything that helps." className="min-h-20" />
                </Field>
                <Button type="submit" icon="arrow-right" className="w-full">
                  {s.cta}
                </Button>
              </form>
            )}

            {isDone && (
              <div className="flex items-center gap-3 border-t border-stone-200/60 p-5 text-sm text-palm-600">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-palm-500/12 text-palm-500">
                  <Icon name="check" size={16} />
                </span>
                Request sent. Your host will confirm shortly.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
