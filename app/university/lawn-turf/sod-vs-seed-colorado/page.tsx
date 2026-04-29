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
  title: "Sod vs. Seed: Which Is Right for Your Colorado Yard? — Forge Point University",
  description:
    "Both work — but not for every yard. Here's how to choose based on your timeline, budget, and site conditions.",
};

export const revalidate = 3600;

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const ARTICLE = {
  title: "Sod vs. Seed: Which Is Right for Your Colorado Yard?",
  categoryName: "Lawn & Turf",
  categorySlug: "lawn-turf",
  coverImage: img("1517022812379-23952977f6e7"),
  authorName: "Forge Point Team",
  publishDate: "March 2025",
  readMinutes: 4,
};

const CONTENT = `## The Real Difference Between Sod and Seed

When Colorado homeowners want a new lawn, the first question is always sod or seed. The answer depends on your timeline, budget, soil conditions, and how much babysitting you're willing to do in the first few weeks.

![Freshly installed sod on a Northern Colorado property](https://images.unsplash.com/photo-1517022812379-23952977f6e7?auto=format&fit=crop&w=900&q=80)

### Why Sod Wins on Speed

Sod gives you an established lawn in 2–3 weeks. You're laying mature turf that was grown under controlled conditions, and as long as you keep it watered and stay off it, it knits into your soil fast. For front yards with HOA pressure, properties going on the market, or homeowners who just want results now — sod is the right call.

The tradeoff is cost. Sod typically runs $1.50–$2.50 per square foot installed in Northern Colorado. For a 3,000 square foot yard, you're looking at $4,500–$7,500 depending on access, grade prep, and grass type.

> **Pro Tip:** Sod should never be installed over existing dead grass or weeds. The decomposing layer underneath creates a barrier that prevents root penetration. Always strip and prep the soil first.

### Why Seed Makes Sense for Large Areas

Seed costs 70–80% less than sod, and the root system that develops from seed is generally stronger because it grows downward from day one rather than having to transition from a nursery growing environment.

The catch: seed requires 6–10 weeks to establish and needs consistent moisture throughout germination. Miss a few days of watering in a hot Colorado August and you lose your germination window entirely.

Seed works best for large properties where budget is a real factor, fall installs where temps cooperate, and areas that will be naturally irrigated or receive consistent rainfall.

[VIDEO:-ddh4hC5x0o]

### Colorado-Specific Considerations

Our clay-heavy soils don't drain well, which affects both options differently. With sod, poor drainage can cause the seams to hold too much moisture and develop rot. With seed, standing water after rain washes seed before it germinates.

Either way, proper grading and soil amendment before installation is the single biggest factor in outcome — more than which product you choose.

### Grass Types That Work in Northern Colorado

For sod: **Kentucky bluegrass** is the standard — dense, dark green, and handles traffic well. **Turf-type tall fescue** is a better option for shaded areas or properties with water restrictions.

For seed: same species apply, but you can also blend fescue and bluegrass for a hardier mix that handles Northern Colorado's climate variability.

### Bottom Line

- **Choose sod** if you need results fast, your yard is under 5,000 sq ft, or HOA timelines demand it.
- **Choose seed** if you're covering a large area, installing in fall, or working within a tight budget.

Either way, prep work determines the outcome more than the product. Invest in the grade and soil before you buy either.`;

const RELATED = [
  {
    title: "Dealing with Clay Soil in Northern Colorado",
    excerpt:
      "Front Range soil is some of the most difficult in the country for landscaping. Here's what you're working with — and how to actually fix it.",
    slug: "clay-soil-northern-colorado",
    categorySlug: "lawn-turf",
    coverImage: img("1416879595882-3373a0480b5b"),
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
      "Northern Colorado municipalities have tiered water pricing and seasonal restrictions. Native plants require 50–75% less water after establishment. Here's how to design a landscape that looks great and costs less to maintain.",
    slug: "water-smart-landscaping-northern-colorado",
    categorySlug: "outdoor-living",
    coverImage: img("1558618047-6e3b4b1ae965"),
  },
];

export default async function SodVsSeedPage() {
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
                    articleSlug="sod-vs-seed-colorado"
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
