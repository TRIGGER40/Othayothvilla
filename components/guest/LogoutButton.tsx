"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

export function LogoutButton({ className, compact = false }: { className?: string; compact?: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/guest/logout", { method: "POST", headers: { "X-Requested-With": "fetch" } });
    } finally {
      router.replace("/guest/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      className={cn(
        "inline-flex items-center gap-2 rounded-full text-sm text-stone-400 transition-colors hover:text-palm-600 disabled:opacity-50",
        compact ? "px-3 py-2" : "px-4 py-2.5",
        className,
      )}
    >
      <Icon name="logout" size={18} />
      {busy ? "Signing out" : "Logout"}
    </button>
  );
}
