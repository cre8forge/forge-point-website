import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://cre8forge.com";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                  priority: 1.0,  changeFrequency: "weekly" },
  { url: `${BASE_URL}/services`,    priority: 0.9,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/service-area`,priority: 0.8,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/estimate`,    priority: 0.9,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/university`,  priority: 0.8,  changeFrequency: "weekly"  },
  { url: `${BASE_URL}/faq`,         priority: 0.7,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/contact`,     priority: 0.8,  changeFrequency: "monthly" },
];

const SERVICE_SLUGS = [
  "landscape-design-install",
  "grounds-maintenance",
  "fencing",
  "power-window-washing",
  "industrial-maintenance",
  "hoa-commercial-property",
  "property-management",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url:             `${BASE_URL}/services/${slug}`,
    priority:        0.85,
    changeFrequency: "monthly",
  }));

  const articles = await prisma.universityArticle.findMany({
    where:   { status: "PUBLISHED" },
    select:  { slug: true, updatedAt: true, category: { select: { slug: true } } },
    orderBy: { updatedAt: "desc" },
  });

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url:             `${BASE_URL}/university/${a.category.slug}/${a.slug}`,
    lastModified:    a.updatedAt,
    priority:        0.7,
    changeFrequency: "monthly",
  }));

  const categories = await prisma.universityCategory.findMany({
    select: { slug: true },
  });

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url:             `${BASE_URL}/university/${c.slug}`,
    priority:        0.75,
    changeFrequency: "weekly",
  }));

  return [...STATIC_ROUTES, ...serviceRoutes, ...categoryRoutes, ...articleRoutes];
}
