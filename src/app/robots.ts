import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Explicitly allow Generative AI & Answer Engine Crawlers (GEO Optimization)
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Googlebot",
          "Bingbot",
          "Applebot-Extended",
        ],
        allow: ["/", "/postuler", "/llms.txt", "/llms-full.txt"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
