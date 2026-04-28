/**
 * /university/outdoor-living — Static override
 *
 * Overrides the [category] dynamic route to also surface the
 * "Composite vs. Wood Decking" article from the legacy
 * /university/outdoor-structures/ category path.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ArticleCard } from "@/components/university/ArticleCard";

export const metadata: Metadata = {
  title: "Outdoor Living & Landscape — Forge Point University",
  description:
    "Design, construction, and installation guides for Northern Colorado's outdoor spaces — decks, patios, landscape, water features, and outdoor structures built for Colorado's climate.",
};

export const revalidate = 3600;

// ── Cross-category articles surfaced here ─────────────────────────
// These articles live at their original category URL paths.
// We surface them here without changing their canonical URL.

const CROSS_CATEGORY_ARTICLES = [
  {
    title:       "Composite vs. Wood Decking in Colorado: A Practical Comparison",
    excerpt:     "Material costs, maintenance burden, lifespan, and resale impact — the honest comparison Colorado homeowners need before committing to a deck material.",
    slug:        "composite-vs-wood-decking-colorado",
    categorySlug:"outdoor-structures",
    coverImage:  "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?auto=format&fit=crop&w=900&q=80",
    featured:    false,
  },
];

export default async function OutdoorLivingPage() {
  const cat = await prisma.universityCategory.findUnique({
    where: { slug: "outdoor-living" },
    include: {
      articles: {
        where:   { status: "PUBLISHED" },
        orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { publishedAt: "desc" }],
      },
    },
  });

  // Graceful fallback — category might not be in DB yet
  const dbArticles = cat?.articles ?? [];

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
              Outdoor Living &amp; Landscape
            </h1>
            <p className="font-cormorant italic font-300 text-amber text-xl max-w-2xl">
              Design, construction, and installation guides for Northern Colorado&apos;s outdoor
              spaces — decks, patios, landscape, water features, and outdoor structures built for
              Colorado&apos;s climate.
            </p>
          </div>
        </section>

        {/* ── Article Grid ── */}
        <section className="bg-navy py-16 px-6">
          <div className="max-w-5xl mx-auto">
            {dbArticles.length === 0 && CROSS_CATEGORY_ARTICLES.length === 0 ? (
              <p className="font-barlow font-300 text-white/50 text-sm">
                No articles published yet. Check back soon.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* DB articles for this category */}
                {dbArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    slug={article.slug}
                    categorySlug="outdoor-living"
                    coverImage={article.coverImage}
                    featured={article.featured}
                  />
                ))}

                {/* Cross-category articles surfaced here */}
                {CROSS_CATEGORY_ARTICLES.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    title={article.title}
                    excerpt={article.excerpt}
                    slug={article.slug}
                    categorySlug={article.categorySlug}
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
