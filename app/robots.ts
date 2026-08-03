import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The stay-only portal and its API must never be indexed.
      disallow: ["/guest/", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
