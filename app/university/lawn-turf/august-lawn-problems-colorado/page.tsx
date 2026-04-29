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
  title: "Why Your Front Range Lawn Looks Terrible in August — Forge Point University",
  description:
    "Heat stress, drought dormancy, and fungal disease all peak in August. Here's how to tell them apart and what to do.",
};

export const revalidate = 3600;

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const ARTICLE = {
  title: "Why Your Front Range Lawn Looks Terrible in August",
  categoryName: "Lawn & Turf",
  categorySlug: "lawn-turf",
  coverImage: img("1558618666-fcd25c85cd64"),
  authorName: "Forge Point Team",
  publishDate: "July 2025",
  readMinutes: 3,
};

const CONTENT = `## August Is the Hardest Month for Colorado Lawns

If your lawn looked great in June and terrible by mid-August, you're not alone. Front Range lawns go through a predictable stress cycle every summer, and most homeowners misdiagnose what's happening — which leads to the wrong fix.

![Dry summer lawn in Northern Colorado](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80)

### The Three Things That Kill Colorado Lawns in August

**1. Heat Stress**
Kentucky bluegrass goes dormant when soil temperatures consistently exceed 85°F. The lawn turns tan or straw-colored but is not dead — it's protecting itself. You'll know it's dormancy rather than death if the crowns (the base of the grass plant just above soil level) are still firm and slightly green. Water deeply once a week to keep the crown alive, and don't fertilize. The lawn will recover when temperatures drop.

**2. Drought Stress**
Looks similar to heat dormancy but happens faster and in patches near impervious surfaces (driveways, sidewalks, south-facing slopes). Drought-stressed turf doesn't recover from dormancy as cleanly. If you can't irrigate consistently through July and August, prepare for thin spots that need overseeding in fall.

**3. Fungal Disease**
This is where homeowners get fooled. Dollar spot, brown patch, and necrotic ring spot all peak in hot, humid late-summer conditions — especially when irrigation runs at night and leaves turf wet for extended periods. Unlike dormancy, fungal damage shows as irregular brown patches with defined edges, often with a gray or white cast at patch margins in the morning.

> **Pro Tip:** Switch your irrigation schedule to early morning (4–6 AM) if you're running it at night. Turf that dries out by 10 AM has dramatically lower disease pressure than turf that stays wet overnight.

### What Not to Do

- **Don't scalp the lawn** trying to remove brown turf. Mowing below 2.5 inches in August compounds stress.
- **Don't fertilize** dormant or stressed turf with high-nitrogen products. You'll burn the root system and trigger aggressive top growth the plant can't sustain.
- **Don't overwater** hoping to green it back up. Saturated soil in heat promotes root rot and fungal disease.

### The Recovery Plan

August stress resolves itself in September when temperatures drop and soil cools. The real window for repair is **late August through mid-September** — seed germinates well, aeration opens the soil, and the grass has 6–8 weeks to establish before first frost.

Plan for your fall renovation in August, even if you can't execute it until September. Order materials, schedule aeration, and get your overseed ready to go.`;

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
    title: "Dealing with Clay Soil in Northern Colorado",
    excerpt:
      "Front Range soil is some of the most difficult in the country for landscaping. Here's what you're working with — and how to actually fix it.",
    slug: "clay-soil-northern-colorado",
    categorySlug: "lawn-turf",
    coverImage: img("1416879595882-3373a0480b5b"),
  },
  {
    title: "The Northern Colorado Property Maintenance Calendar: What to Do Every Month",
    excerpt:
      "Fall is the single most important maintenance window in Colorado. Deferred maintenance costs 3–5× more when it fails. A practical month-by-month guide.",
    slug: "northern-colorado-property-maintenance-calendar",
    categorySlug: "property-maintenance",
    coverImage: img("1558981403-c5f9899a28bc"),
  },
];

export default async function AugustLawnProblemsPage() {
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
                    articleSlug="august-lawn-problems-colorado"
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
