import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";
import { siteGraph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} · Private Pool Villa in Kannur, Kerala`,
    template: `%s · ${site.name}`,
  },
  description:
    "Othayoth Villa is a boutique private pool villa in Kannur, Kerala. Book the whole four-bedroom home near Thottada Beach, with a private pool, a Kerala table and warm, personal hospitality.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "villa stay in Kannur",
    "private pool villa Kannur",
    "luxury villa Kannur",
    "best villa in Kannur",
    "villa with swimming pool Kannur",
    "private villa Kerala",
    "villa near Kannur Airport",
    "luxury stay in North Kerala",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: SITE_URL,
    title: `${site.name} · Private Pool Villa in Kannur, Kerala`,
    description:
      "A private pool villa where the coast slows down. Book the whole home in Kannur, Kerala.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Private Pool Villa in Kannur`,
    description:
      "A boutique private pool villa in Kannur, Kerala. Book the whole home near Thottada Beach.",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "travel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={siteGraph()} />
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
