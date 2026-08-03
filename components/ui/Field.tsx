import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border border-stone-200 bg-linen-50 px-4 py-3 text-ink placeholder:text-stone-300 transition-colors duration-200 focus:border-brass-400 focus:outline-none focus:ring-2 focus:ring-brass-300/40";

export function Field({
  label,
  htmlFor,
  hint,
  required,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-palm-600">
        {label}
        {required && <span className="ml-1 text-brass-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-stone-300">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldBase, "min-h-28 resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldBase, "appearance-none bg-[length:1rem] pr-10", className)} {...props}>
      {children}
    </select>
  );
}
