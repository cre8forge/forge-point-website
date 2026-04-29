/**
 * /university/colorado-living — Static override
 *
 * Surfaces the three Colorado Living static article pages while
 * also including any DB-published articles for this category.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ArticleCard } from "@/components/university/ArticleCard";

export const metadata: Metadata = {
  title: "Colorado Living — Forge Point University",
  description:
    "Understanding Colorado's unique climate, regulations, property conditions, and what makes Front Range real estate different from the rest of the country.",
};

export const revalidate = 3600;

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

// ── Static articles surfaced here ─────────────────────────────────
// These articles exist as static page files rather than DB entries.
// Surfaced here to populate the category page.

const STATIC_ARTICLES = [
  {
    title:       "Colorado Climate & Your Property: What Every Front Range Owner Should Know",
    excerpt:     "Hail, freeze-thaw cycles, intense UV, and altitude combine to put unique stress on Front Range properties. Here's what you're actually managing — and why it matters.",
    slug:        "colorado-climate-property-guide",
    categorySlug:"colorado-living",
    coverImage:  img("1560185893-a55b8a6f7e89"),
    featured:    true,
  },
  {
    title:       "Property Insurance in Colorado: Why Rates Are Rising and What You Can Do",
    excerpt:     "Colorado leads the country in hail-related insurance claims. Understanding what's driving your rates — and what mitigation actually helps — is the first step toward controlling costs.",
    slug:        "colorado-property-insurance-guide",
    categorySlug:"colorado-living",
    coverImage:  img("1486325212027-8081e485255e"),
    featured:    false,
  },
  {
    title:       "What Makes Colorado Real Estate Different: A Guide for Out-of-State Investors",
    excerpt:     "Water rights, HOA prevalence, clay soils, altitude construction costs, and a supply-constrained market — here's what out-of-state investors consistently get wrong about Northern Colorado.",
    slug:        "what-makes-colorado-real-estate-different",
    categorySlug:"colorado-living",
    coverImage:  img("1558618047-6e3b4b1ae965"),
    featured:    false,
  },
];

export default async function ColoradoLivingPage() {
  const cat = await prisma.universityCategory.findUnique({
    where: { slug: "colorado-living" },
    include: {
      articles: {
        where:   { status: "PUBLISHED" },
        orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { publishedAt: "desc" }],
      },
    },
  });

  // Graceful fallback — category might not be in DB yet
  const dbArticles = cat?.articles ?? [];

  // Deduplicate: skip DB articles whose slugs are already in STATIC_ARTICLES
  const staticSlugs = new Set(STATIC_ARTICLES.map((a) => a.slug));
  const uniqueDbArticles = dbArticles.filter((a) => !staticSlugs.has(a.slug));

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
              Colorado Living
            </h1>
            <p className="font-cormorant italic font-300 text-amber text-xl max-w-2xl">
              Understanding Colorado&apos;s unique climate, regulations, property conditions, and what
              makes Front Range real estate different from the rest of the country.
            </p>
          </div>
        </section>

        {/* ── Article Grid ── */}
        <section className="bg-navy py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Static articles always shown */}
              {STATIC_ARTICLES.map((article) => (
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

              {/* Additional DB articles for this category */}
              {uniqueDbArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  slug={article.slug}
                  categorySlug="colorado-living"
                  coverImage={article.coverImage}
                  featured={article.featured}
                />
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
