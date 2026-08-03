import { site } from "@/lib/content";
import { Icon } from "@/components/icons/Icon";

/** Floating WhatsApp action, always within thumb reach on mobile. */
export function StickyContact() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
        "Hello, I would like to check availability at Othayoth Villa.",
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-palm-600 py-3 pl-3 pr-4 text-linen-50 shadow-lift transition-all duration-300 ease-gentle hover:bg-palm-500"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brass-400 text-palm-700">
        <Icon name="whatsapp" size={18} />
      </span>
      <span className="hidden text-sm font-medium sm:inline">Chat with us</span>
    </a>
  );
}
