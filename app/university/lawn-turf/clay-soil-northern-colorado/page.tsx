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
  title: "Dealing with Clay Soil in Northern Colorado — Forge Point University",
  description:
    "Front Range soil is some of the most difficult in the country for landscaping. Here's what you're working with and how to fix it.",
};

export const revalidate = 3600;

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const ARTICLE = {
  title: "Dealing with Clay Soil in Northern Colorado",
  categoryName: "Lawn & Turf",
  categorySlug: "lawn-turf",
  coverImage: img("1416879595882-3373a0480b5b"),
  authorName: "Forge Point Team",
  publishDate: "February 2025",
  readMinutes: 3,
};

const CONTENT = `## The Problem with Front Range Soil

Northern Colorado sits on a band of Pleistocene-era clay soils that formed from ancient lake and river deposits. This clay is high in montmorillonite — a mineral that swells when wet and cracks when dry, creating the characteristic surface cracks you see in dry Colorado summers.

For landscaping, this creates three persistent problems: poor drainage, compaction, and restricted root growth.

### Why Clay Drains So Slowly

Clay particles are extremely fine — roughly 1,000 times smaller than sand particles. When wet, they pack tightly and allow almost no water movement. After a heavy rain or irrigation cycle, Front Range clay can hold surface water for hours, suffocating roots and creating conditions for fungal disease.

> **Pro Tip:** If you can't push a standard screwdriver 6 inches into your soil by hand when it's dry, your soil is compacted enough to restrict root growth. This is extremely common along the Front Range.

### Amendment vs. Replacement

Amending clay is a long-term project, not a one-season fix. The mistake most homeowners make is adding a thin layer of compost to the surface — enough to grow weeds but not enough to change the drainage behavior of the underlying clay.

**Effective amendment requires:**
- Tilling 4–6 inches deep
- Adding 3–4 inches of compost or aged manure to each tilled area
- Blending thoroughly before seeding or sodding

For new landscape beds, we often recommend 6–8 inches of amended soil on top of graded native clay, which gives plants enough root zone to establish before they hit the limiting layer.

### What Actually Works Long-Term

**Organic matter over time** — annual compost applications and leaving grass clippings on the lawn builds organic content slowly but permanently.

**Aeration** — annual core aeration breaks up surface compaction and channels water deeper into the profile.

**Native and adapted plants** — deep-rooted natives like blue grama, buffalo grass, and yarrow can penetrate clay that stops ornamental plants cold.

**Raised beds** — for vegetable gardens and specialty plantings, raised beds with imported soil are far more productive than fighting the native clay.

### Drainage Solutions

If you have standing water after rain or irrigation, the problem is usually a combination of clay and improper grading. Water follows grade — it doesn't care about soil type. French drains, dry creek beds, and swales redirect water away from structures and low points. These are engineering solutions, not soil solutions, and they're often necessary regardless of what amendments you make.`;

const RELATED = [
  {
    title: "Sod vs. Seed: Which Is Right for Your Colorado Yard?",
    excerpt:
      "Both work — but not for every yard. Here's how to choose based on your timeline, budget, and site conditions.",
    slug: "sod-vs-seed-colorado",
    categorySlug: "lawn-turf",
    coverImage: img("1517022812379-23952977f6e7"),
  },
  {
    title: "Why Your Front Range Lawn Looks Terrible in August",
    excerpt:
      "Heat stress, drought dormancy, and fungal disease all peak in August. Here's how to tell them apart and what to do about each.",
    slug: "august-lawn-problems-colorado",
    categorySlug: "lawn-turf",
    coverImage: img("1558618666-fcd25c85cd64"),
  },
  {
    title: "Water-Smart Landscaping for Northern Colorado: Beauty Without the Water Bill",
    excerpt:
      "Northern Colorado municipalities have tiered water pricing and seasonal restrictions. Native plants require 50–75% less water after establishment.",
    slug: "water-smart-landscaping-northern-colorado",
    categorySlug: "outdoor-living",
    coverImage: img("1558618047-6e3b4b1ae965"),
  },
];

export default async function ClaySoilPage() {
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
                    category="lawn-turf"
                    articleSlug="clay-soil-northern-colorado"
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
