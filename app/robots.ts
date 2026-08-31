import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /api has nothing crawlable. (/alt is gitignored and never deployed,
      // so it needs no rule here.)
      disallow: ["/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
