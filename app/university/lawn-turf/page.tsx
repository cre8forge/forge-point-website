/**
 * /university/lawn-turf — Static override
 *
 * Surfaces the three Lawn & Turf static article pages while
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
  title: "Lawn & Turf — Forge Point University",
  description:
    "Everything you need to know about growing and maintaining a healthy lawn in Northern Colorado — sod vs. seed, clay soil, summer stress, and seasonal care.",
};

export const revalidate = 3600;

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

// ── Static articles surfaced here ─────────────────────────────────
// These articles exist as static page files rather than DB entries.
// Surfaced here to populate the category page.

const STATIC_ARTICLES = [
  {
    title:       "Sod vs. Seed: Which Is Right for Your Colorado Yard?",
    excerpt:     "Both work — but not for every yard. Here's how to choose based on your timeline, budget, and site conditions.",
    slug:        "sod-vs-seed-colorado",
    categorySlug:"lawn-turf",
    coverImage:  img("1517022812379-23952977f6e7"),
    featured:    true,
  },
  {
    title:       "Dealing with Clay Soil in Northern Colorado",
    excerpt:     "Front Range soil is some of the most difficult in the country for landscaping. Here's what you're working with — and how to actually fix it.",
    slug:        "clay-soil-northern-colorado",
    categorySlug:"lawn-turf",
    coverImage:  img("1416879595882-3373a0480b5b"),
    featured:    false,
  },
  {
    title:       "Why Your Front Range Lawn Looks Terrible in August",
    excerpt:     "Heat stress, drought dormancy, and fungal disease all peak in August. Here's how to tell them apart and what to do about each.",
    slug:        "august-lawn-problems-colorado",
    categorySlug:"lawn-turf",
    coverImage:  img("1558618666-fcd25c85cd64"),
    featured:    false,
  },
];

export default async function LawnTurfPage() {
  const cat = await prisma.universityCategory.findUnique({
    where: { slug: "lawn-turf" },
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
              Lawn &amp; Turf
            </h1>
            <p className="font-cormorant italic font-300 text-amber text-xl max-w-2xl">
              Everything you need to know about growing and maintaining a healthy lawn in Northern
              Colorado — sod vs. seed, clay soil, summer stress, and seasonal care.
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
                  categorySlug="lawn-turf"
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
