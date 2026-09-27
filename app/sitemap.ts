import type { MetadataRoute } from "next";

import { products } from "@/lib/products";

const baseUrl = "https://www.ayhabo.com";

const staticPages = [
  { path: "/", priority: 1, changeFrequency: "daily" as const },
  { path: "/catalogue", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/livraison", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/annulation", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/retours-et-echanges", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/remboursement", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/protection-achat", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/confidentialite", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/suivi", priority: 0.8, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/produits/${product.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
