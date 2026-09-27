import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/panier/", "/commande/"],
    },
    sitemap: "https://www.ayhabo.com/sitemap.xml",
  };
}
