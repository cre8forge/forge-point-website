import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SERVICES_DATA } from "@/lib/services-data";

const BASE_URL = "https://cre8forge.com";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                 priority: 1.0, changeFrequency: "weekly"  },
  { url: `${BASE_URL}/services`,   priority: 0.9, changeFrequency: "monthly" },
  { url: `${BASE_URL}/estimate`,   priority: 0.9, changeFrequency: "monthly" },
  { url: `${BASE_URL}/contact`,    priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE_URL}/university`, priority: 0.8, changeFrequency: "weekly"  },
  { url: `${BASE_URL}/faq`,        priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE_URL}/privacy`,    priority: 0.3, changeFrequency: "yearly"  },
  { url: `${BASE_URL}/terms`,      priority: 0.3, changeFrequency: "yearly"  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((s) => ({
    url:             `${BASE_URL}/services/${s.slug}`,
    priority:        0.85,
    changeFrequency: "monthly",
  }));

  // DB queries are wrapped in a try/catch so a transient Railway connectivity
  // issue during Vercel's build doesn't kill the entire deployment.
  // In the worst case the sitemap omits article/category URLs for that build
  // and they get picked up on the next successful deploy.
  let articleRoutes:  MetadataRoute.Sitemap = [];
  let categoryRoutes: MetadataRoute.Sitemap = [];

  try {
    const [articles, categories] = await Promise.all([
      prisma.universityArticle.findMany({
        where:   { status: "PUBLISHED" },
        select:  { slug: true, updatedAt: true, category: { select: { slug: true } } },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.universityCategory.findMany({
        select: { slug: true },
      }),
    ]);

    articleRoutes = articles.map((a) => ({
      url:             `${BASE_URL}/university/${a.category.slug}/${a.slug}`,
      lastModified:    a.updatedAt,
      priority:        0.7,
      changeFrequency: "monthly",
    }));

    categoryRoutes = categories.map((c) => ({
      url:             `${BASE_URL}/university/${c.slug}`,
      priority:        0.75,
      changeFrequency: "weekly",
    }));
  } catch (err) {
    console.warn("[sitemap] DB unreachable — article/category URLs omitted:", err);
  }

  return [...STATIC_ROUTES, ...serviceRoutes, ...categoryRoutes, ...articleRoutes];
}
