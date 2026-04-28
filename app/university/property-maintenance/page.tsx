/**
 * /university/property-maintenance — Static override
 *
 * Overrides the [category] dynamic route to also surface articles
 * from the legacy /university/seasonal-guides/ category path,
 * keeping both old and new URLs functional.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ArticleCard } from "@/components/university/ArticleCard";

export const metadata: Metadata = {
  title: "Property Maintenance — Forge Point University",
  description:
    "Practical seasonal and ongoing maintenance guides for residential and commercial properties — what to do, when to do it, and what it costs to defer.",
};

export const revalidate = 3600;

export default async function PropertyMaintenancePage() {
  // Query both property-maintenance and seasonal-guides categories
  const [pmCat, sgCat] = await Promise.all([
    prisma.universityCategory.findUnique({
      where: { slug: "property-maintenance" },
      include: {
        articles: {
          where:   { status: "PUBLISHED" },
          orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { publishedAt: "desc" }],
        },
      },
    }),
    prisma.universityCategory.findUnique({
      where: { slug: "seasonal-guides" },
      include: {
        articles: {
          where:   { status: "PUBLISHED" },
          orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { publishedAt: "desc" }],
        },
      },
    }),
  ]);

  const pmArticles = pmCat?.articles ?? [];
  const sgArticles = sgCat?.articles ?? [];
  const hasArticles = pmArticles.length > 0 || sgArticles.length > 0;

  return (
    <>
      <Nav />
      <main>
        {/* ── Header ── */}
        <section className="bg-navy pt-36 pb-16 px-6 border-b border-white/8">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/university"
              className="font-condensed font-600 text-xs uppercase tracking-widest text-orange hover:text-amber transition-colors mb-6 inline-block"
            >
              ← University
            </Link>
            <h1 className="font-cinzel font-900 text-white text-4xl md:text-5xl uppercase tracking-widest mb-4 leading-tight">
              Property Maintenance
            </h1>
            <p className="font-cormorant italic font-300 text-amber text-xl max-w-2xl">
              Practical seasonal and ongoing maintenance guides for residential and commercial
              properties — what to do, when to do it, and what it costs to defer.
            </p>
          </div>
        </section>

        {/* ── Article Grid ── */}
        <section className="bg-navy py-16 px-6">
          <div className="max-w-5xl mx-auto">
            {!hasArticles ? (
              <p className="font-barlow font-300 text-white/50 text-sm">
                No articles published yet. Check back soon.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Primary property-maintenance articles */}
                {pmArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    slug={article.slug}
                    categorySlug="property-maintenance"
                    coverImage={article.coverImage}
                    featured={article.featured}
                  />
                ))}

                {/* Legacy seasonal-guides articles surfaced here */}
                {sgArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    slug={article.slug}
                    categorySlug="seasonal-guides"
                    coverImage={article.coverImage}
                    featured={article.featured}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
