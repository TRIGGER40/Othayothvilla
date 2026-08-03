"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/Icon";

export function WifiCard({ network, password }: { network: string; password: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard may be unavailable; the password stays visible to type.
    }
  }

  return (
    <div className="rounded-2xl border border-stone-200/70 bg-linen-50 p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-palm-500/10 text-palm-500">
          <Icon name="wifi" size={20} />
        </span>
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-300">Wi-Fi network</p>
          <p className="font-medium text-palm-600">{network}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-palm-500/6 px-4 py-3">
        <span className="font-mono text-palm-600">{password}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full bg-palm-600 px-3 py-1.5 text-xs font-medium text-linen-50 transition-colors hover:bg-palm-500"
        >
          <Icon name={copied ? "check" : "receipt"} size={14} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
