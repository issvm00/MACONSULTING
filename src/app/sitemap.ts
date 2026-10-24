import type { MetadataRoute } from "next";
import { SITE_URL, DESTINATIONS_SEO } from "@/lib/seo-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const destinationEntries: MetadataRoute.Sitemap = DESTINATIONS_SEO.map(
    (dest) => ({
      url: `${SITE_URL}/postuler?destination=${dest.code}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/postuler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/llms-full.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...destinationEntries,
  ];
}
