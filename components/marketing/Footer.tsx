import Link from "next/link";
import { footerNav, site } from "@/lib/content";
import { Icon } from "@/components/icons/Icon";
import { Wordmark } from "@/components/marketing/Wordmark";

export function Footer() {
  return (
    <footer className="bg-palm-700 text-linen-100">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Wordmark invert />
            <p className="mt-5 leading-relaxed text-linen-100/70">
              A private pool villa in Kannur, booked whole for the people you love.
              Warm, quiet and rooted in the north-Kerala coast.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-linen-100/20 px-4 py-2 text-sm text-linen-100 transition-colors hover:border-brass-300 hover:text-brass-200"
              >
                <Icon name="whatsapp" size={18} /> WhatsApp
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex items-center gap-2 rounded-full border border-linen-100/20 px-4 py-2 text-sm text-linen-100 transition-colors hover:border-brass-300 hover:text-brass-200"
              >
                <Icon name="phone" size={18} /> Call us
              </a>
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm uppercase tracking-widest text-brass-200">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="link-underline text-linen-100/80 transition-colors hover:text-linen-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-linen-100/15 pt-8 text-sm text-linen-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <Icon name="pin" size={16} /> {site.address}
          </p>
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Made with care in Kerala.
          </p>
        </div>
      </div>
    </footer>
  );
}
