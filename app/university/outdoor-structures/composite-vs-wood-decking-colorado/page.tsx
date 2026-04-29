import type { Metadata } from "next";
import Link from "next/link";
import { User, Calendar } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ArticleRenderer } from "@/components/university/ArticleRenderer";
import { ArticleCard } from "@/components/university/ArticleCard";
import { UniversityContentUpgrade } from "@/components/university/UniversityContentUpgrade";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Composite vs. Wood Decking in Colorado: A Practical Comparison — Forge Point University",
  description:
    "Colorado's UV, freeze-thaw, and low humidity make this choice more consequential than in other climates. Here's the honest breakdown.",
};

export const revalidate = 3600;

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const ARTICLE = {
  title: "Composite vs. Wood Decking in Colorado: A Practical Comparison",
  categoryName: "Outdoor Structures",
  categorySlug: "outdoor-structures",
  coverImage: img("1533090161-9d2efb8c5897"),
  authorName: "Forge Point Team",
  publishDate: "March 2025",
  readMinutes: 4,
};

const CONTENT = `## The Colorado Climate Changes the Math on Decking Materials

Most homeowners approach the composite-vs.-wood decision based on what they've heard generally. In Colorado specifically, the climate creates conditions that make composite decking a much stronger choice for most applications than it would be in, say, the Midwest or Southeast.

![Composite deck with pergola in a Colorado backyard](https://images.unsplash.com/photo-1533090161-9d2efb8c5897?auto=format&fit=crop&w=900&q=80)

### What Colorado Does to Wood Decks

Colorado's combination of intense UV at elevation, low humidity, and dramatic temperature swings creates the worst possible conditions for untreated or undertreated wood decking.

**UV degradation** — at 5,000+ feet, UV radiation is approximately 25% more intense than at sea level. Pressure-treated pine grays out and checks (surface cracks) within 1–2 seasons without a protective finish. Even cedar, which holds up better, requires more frequent restaining than in lower-elevation climates.

**Freeze-thaw cycling** — the Front Range goes through 40–50+ freeze-thaw cycles in a typical winter. Each cycle forces water in and out of wood grain. Over time, this causes checking, cupping, and accelerated degradation of both the wood and the fasteners.

**Low humidity** — Colorado's dry air draws moisture from wood continuously. New wood decks installed in summer can shrink significantly by winter, opening gaps between boards. This is part of normal installation planning (expansion gaps are installed at specific widths for this reason), but it's a dynamic that wood products require management for.

### What This Means for Maintenance

A wood deck in Northern Colorado needs:
- Annual cleaning and inspection
- Restaining or resealing every 2–3 years (vs. 4–6 years in lower-elevation, higher-humidity climates)
- Fastener inspection and replacement as screws back out through freeze-thaw cycling
- Board replacement for any boards that develop significant checking or structural degradation

A composite deck in Northern Colorado needs:
- Annual cleaning (soap and water or composite-specific cleaner)
- Inspection of fasteners and structural framing (the composite surface doesn't rot, but wood framing underneath still does)
- No staining, sealing, or painting — ever

### The Cost Comparison Over 15 Years

On a 400 square foot deck, initial costs:
- **Pressure-treated wood:** $7,500–$15,000 installed
- **Composite (Trex Enhance / TimberTech Pro):** $11,000–$22,000 installed

Over 15 years, accounting for maintenance costs (staining labor and materials every 2–3 years, board replacements):
- **Wood:** Add $4,000–$8,000 in maintenance
- **Composite:** Add $500–$1,500 in cleaning supplies

Total 15-year cost of ownership is often within 10–20% — with composite requiring significantly less time and attention.

### When Wood Still Makes Sense

**Budget is the primary constraint** — if the upfront cost difference is a genuine barrier, wood is perfectly viable with proper maintenance discipline.

**The deck is temporary** — if you're planning to sell in 2–3 years and want to show a new deck at lowest cost, pressure-treated is a reasonable choice.

**Specific aesthetic** — some homeowners strongly prefer the look and feel of real wood. Cumaru and ipe (tropical hardwoods) are the most durable natural wood deck options for Colorado and require less maintenance than pine or cedar, but at higher initial cost.

> **Pro Tip:** Regardless of material, the structural framing (joists, posts, beams) should be pressure-treated lumber or steel in Colorado. The frame outlasts the deck surface in most installations — build it to last.`;

const RELATED = [
  {
    title: "Landscape ROI: What Outdoor Improvements Actually Add to Your Northern Colorado Home's Value",
    excerpt:
      "Landscaping returns 5–15% of investment at resale in most Colorado markets. Tenants will pay $50–$150/month more for a well-maintained exterior. Here's how to make the investment count.",
    slug: "landscape-roi-northern-colorado-home-value",
    categorySlug: "outdoor-living",
    coverImage: img("1558618666-fcd25c85cd64"),
  },
  {
    title: "Water-Smart Landscaping for Northern Colorado: Beauty Without the Water Bill",
    excerpt:
      "Northern Colorado municipalities have tiered water pricing and seasonal restrictions. Native plants require 50–75% less water after establishment. Here's how to design a landscape that looks great and costs less to maintain.",
    slug: "water-smart-landscaping-northern-colorado",
    categorySlug: "outdoor-living",
    coverImage: img("1558618047-6e3b4b1ae965"),
  },
  {
    title: "Why Colorado Properties Need Different Maintenance Than Other States",
    excerpt:
      "Elevation, UV, freeze-thaw, clay soil, and wind create conditions that national maintenance guides don't account for.",
    slug: "why-colorado-properties-different",
    categorySlug: "colorado-living",
    coverImage: img("1560185893-a55b8a6f7e89"),
  },
];

export default async function CompositeWoodDeckingPage() {
  const allCategories = await prisma.universityCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { articles: { where: { status: "PUBLISHED" } } } },
    },
  });

  return (
    <>
      <Nav />
      <main className="bg-navy min-h-screen">
        {/* Breadcrumb */}
        <div className="pt-28 pb-0 px-6 border-b border-white/8">
          <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs font-condensed font-600 uppercase tracking-widest text-white/40 pb-4">
            <Link href="/university" className="hover:text-orange transition-colors">
              University
            </Link>
            <span>/</span>
            <Link
              href={`/university/${ARTICLE.categorySlug}`}
              className="hover:text-orange transition-colors"
            >
              {ARTICLE.categoryName}
            </Link>
            <span>/</span>
            <span className="text-white/60 truncate">{ARTICLE.title}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-[1fr_280px] gap-12">
          <article>
            <div className="aspect-video overflow-hidden mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ARTICLE.coverImage}
                alt={ARTICLE.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="font-cinzel font-900 text-white text-3xl md:text-4xl uppercase tracking-widest leading-tight mb-5">
              {ARTICLE.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-white/8 text-white/40">
              <div className="flex items-center gap-1.5">
                <User size={13} />
                <span className="font-barlow font-300 text-xs">{ARTICLE.authorName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={13} />
                <span className="font-barlow font-300 text-xs">{ARTICLE.publishDate}</span>
              </div>
              <span className="font-barlow font-300 text-xs">{ARTICLE.readMinutes} min read</span>
            </div>

            <ArticleRenderer
                content={CONTENT}
                upgradePanel={
                  <UniversityContentUpgrade
                    category="outdoor-structures"
                    articleSlug="composite-vs-wood-decking-colorado"
                  />
                }
              />
          </article>

          <aside className="space-y-8">
            {RELATED.length > 0 && (
              <div>
                <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-4 border-l-2 border-orange pl-3">
                  Related Articles
                </h2>
                <div className="space-y-4">
                  {RELATED.map((r) => (
                    <ArticleCard
                      key={r.slug}
                      title={r.title}
                      excerpt={r.excerpt}
                      slug={r.slug}
                      categorySlug={r.categorySlug}
                      coverImage={r.coverImage}
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-4 border-l-2 border-orange pl-3">
                Browse Topics
              </h2>
              <nav className="space-y-1">
                {allCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/university/${cat.slug}`}
                    className="flex items-center justify-between px-3 py-2 border border-white/8 hover:border-orange/40 hover:bg-white/3 transition-all group"
                  >
                    <span className="font-barlow font-300 text-sm text-white/70 group-hover:text-white transition-colors">
                      {cat.name}
                    </span>
                    <span className="font-condensed font-600 text-xs text-white/30 group-hover:text-orange transition-colors">
                      {cat._count.articles}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-5 bg-card border border-orange/30">
              <p className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-2">
                Get a Free Estimate
              </p>
              <p className="font-barlow font-300 text-white/60 text-sm mb-4">
                Ready to put this knowledge to work? We serve Erie, Boulder County,
                and Northern Colorado.
              </p>
              <Link
                href="/estimate"
                className="inline-block font-condensed font-600 text-xs uppercase tracking-widest bg-orange text-white px-4 py-2 hover:bg-amber transition-colors"
              >
                Start Estimate →
              </Link>
            </div>
          </aside>
        </div>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
