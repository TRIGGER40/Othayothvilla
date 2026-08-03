import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Public routes only. Priority/frequency reflect commercial intent: the home,
 * booking and contact pages change and convert most, so they rank highest.
 */
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/book", priority: 0.9, changeFrequency: "weekly" },
  { path: "/villa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/location", priority: 0.8, changeFrequency: "monthly" },
  { path: "/stay-experience", priority: 0.8, changeFrequency: "monthly" },
  { path: "/rooms", priority: 0.8, changeFrequency: "monthly" },
  { path: "/amenities", priority: 0.7, changeFrequency: "monthly" },
  { path: "/experiences", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: path === "" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
