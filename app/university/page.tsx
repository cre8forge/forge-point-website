import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Forge Point University",
  description:
    "Practical knowledge for Northern Colorado property owners and investors — from BRRRR strategy and rental property management to renovation ROI and landscape value. Written by the people doing the work.",
};

export const revalidate = 3600;

// ── Canonical category slugs (filter out legacy/old categories) ───

const CANONICAL_SLUGS = [
  "investment-strategy",
  "property-management",
  "renovation-rehab",
  "outdoor-living",
  "property-maintenance",
  "lawn-turf",
  "hoa-commercial",
  "colorado-living",
];

// ── Static featured articles ──────────────────────────────────────

const STATIC_FEATURED = [
  {
    title:      "The BRRRR Strategy in Northern Colorado: A Complete Field Guide",
    excerpt:    "Buy, Rehab, Rent, Refinance, Repeat — how the strategy actually works in Colorado's Front Range market, what it costs, and where investors get it wrong.",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
    label:      "Investment Strategy",
    href:       "/university/investment-strategy/brrrr-strategy-northern-colorado",
  },
  {
    title:      "The Boots-on-Ground Model: What Real Property Management Actually Looks Like",
    excerpt:    "Administrative management and operational management are not the same thing. Here's what it means to have a team physically at your property — and why it matters.",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
    label:      "Property Management",
    href:       "/university/property-management/boots-on-ground-property-management",
  },
  {
    title:      "Which Renovations Actually Pay Back in Northern Colorado? A Landlord's Guide",
    excerpt:    "Not every renovation dollar comes back at resale or lease-up. Here's what Northern Colorado buyers and tenants actually pay for — and what's vanity spending.",
    coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
    label:      "Renovation & Rehab ROI",
    href:       "/university/renovation-rehab/renovations-that-pay-back-northern-colorado",
  },
];

// ── Start Here articles ───────────────────────────────────────────

const START_HERE = [
  {
    title: "The BRRRR Strategy in Northern Colorado: A Complete Field Guide",
    href:  "/university/investment-strategy/brrrr-strategy-northern-colorado",
    label: "Investment Strategy",
  },
  {
    title: "How to Analyze a Rental Property: Cap Rate, Cash-on-Cash, and What Actually Matters",
    href:  "/university/investment-strategy/how-to-analyze-rental-property-northern-colorado",
    label: "Investment Strategy",
  },
  {
    title: "Buying Your First Rental Property in Northern Colorado: What Nobody Tells You",
    href:  "/university/investment-strategy/first-rental-property-northern-colorado",
    label: "Investment Strategy",
  },
];

// ── Page ──────────────────────────────────────────────────────────

export default async function UniversityHubPage() {
  const categories = await prisma.universityCategory.findMany({
    where:   { slug: { in: CANONICAL_SLUGS } },
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { articles: { where: { status: "PUBLISHED" } } } },
    },
  });

  return (
    <>
      <Nav />
      <main>

        {/* ── Hero ── */}
        <section className="bg-navy pt-36 pb-16 px-6 border-b border-white/8">
          <div className="max-w-5xl mx-auto">
            <p className="font-condensed font-600 text-sm uppercase tracking-[0.2em] text-orange mb-4">
              Knowledge Center
            </p>
            <h1 className="font-cinzel font-900 text-white text-4xl md:text-5xl uppercase tracking-widest mb-5 leading-tight">
              Forge Point University
            </h1>
            <p className="font-barlow font-300 text-white/60 text-base leading-relaxed max-w-2xl">
              Practical knowledge for Northern Colorado property owners and investors — from BRRRR
              strategy and rental property management to renovation ROI and landscape value. Written
              by the people doing the work.
            </p>
          </div>
        </section>

        {/* ── Featured Articles ── */}
        <section className="bg-navy py-16 px-6 border-b border-white/8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-8 border-l-2 border-orange pl-4">
              Featured Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {STATIC_FEATURED.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group bg-card border border-white/8 hover:border-orange/30 transition-all duration-200 overflow-hidden flex flex-col hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-navy/50">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="font-condensed font-600 text-xs uppercase tracking-[0.15em] text-orange mb-2">
                      {article.label}
                    </p>
                    <h3 className="font-cinzel font-700 text-white text-base leading-snug mb-3 normal-case group-hover:text-amber transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-barlow font-300 text-sm text-muted leading-relaxed flex-1 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <p className="font-condensed text-xs uppercase tracking-wide text-orange mt-4 group-hover:text-amber transition-colors">
                      Read Article →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Start Here — Investor Section ── */}
        <section className="bg-[#0D1B2A] py-14 px-6 border-b border-amber/10">
          <div className="max-w-5xl mx-auto">
            <h3 className="font-cinzel font-700 text-white text-sm uppercase tracking-widest mb-2 normal-case">
              New to Investing in Northern Colorado? Start Here.
            </h3>
            <p className="font-barlow font-300 text-white/55 text-sm leading-relaxed mb-8">
              Three articles that give you the foundation before anything else.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {START_HERE.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-4 p-5 border border-amber/15 hover:border-amber/35 bg-navy/40 transition-all duration-200"
                >
                  <span className="font-cinzel font-700 text-amber/40 text-2xl leading-none flex-shrink-0 mt-0.5">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-condensed font-600 text-[10px] uppercase tracking-[0.2em] text-amber/60 mb-1.5">
                      {item.label}
                    </p>
                    <p className="font-barlow font-400 text-sm text-white/75 leading-snug group-hover:text-white transition-colors">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <p className="font-barlow font-300 text-sm text-white/40">
              Or skip the reading and{" "}
              <Link href="/contact" className="text-amber hover:text-white transition-colors underline underline-offset-2">
                talk to us directly →
              </Link>
            </p>
          </div>
        </section>

        {/* ── Category Grid ── */}
        <section className="bg-navy py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-8 border-l-2 border-orange pl-4">
              Browse by Topic
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/university/${cat.slug}`}
                  className="group p-6 bg-card border border-white/8 hover:border-orange/40 transition-all duration-200"
                >
                  <h3 className="font-cinzel font-700 text-white text-sm uppercase tracking-wide mb-2 normal-case group-hover:text-orange transition-colors">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="font-barlow font-300 text-white/50 text-sm leading-relaxed mb-4">
                      {cat.description}
                    </p>
                  )}
                  <p className="font-condensed font-600 text-xs uppercase tracking-widest text-orange">
                    {cat._count.articles}{" "}
                    {cat._count.articles === 1 ? "article" : "articles"} →
                  </p>
                </Link>
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
