import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { IntroSplash } from "@/components/marketing/IntroSplash";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} · A Private Pool Stay in Kannur, Kerala`,
    template: `%s · ${site.name}`,
  },
  description:
    "Othayoth Villa is a boutique private pool villa in Kannur, Kerala. Book the whole home for your people, with a private pool, a Kerala table and quiet, warm hospitality.",
  keywords: [
    "private pool villa Kannur",
    "boutique villa Kerala",
    "whole villa stay Kannur",
    "Thottada beach villa",
    "luxury villa Kerala",
  ],
  openGraph: {
    title: `${site.name} · A Private Pool Stay in Kannur`,
    description:
      "A private pool villa where the coast slows down. Book the whole home in Kannur, Kerala.",
    type: "website",
    locale: "en_IN",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <IntroSplash />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-palm-600 focus:px-5 focus:py-2 focus:text-linen-50"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
