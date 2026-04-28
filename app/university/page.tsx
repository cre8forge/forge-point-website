import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { UniversitySearchBar } from "@/components/university/UniversitySearchBar";

export const metadata: Metadata = {
  title: "Forge Point University",
  description:
    "Practical knowledge for Northern Colorado property owners and investors — from BRRRR strategy and rental property management to renovation ROI and landscape value. Written by the people doing the work.",
};

export const revalidate = 3600;

// ── Types ─────────────────────────────────────────────────────────

type ArticleItem = {
  title:       string;
  excerpt:     string;
  slug:        string;
  categorySlug: string;
  coverImage:  string;
};

type SectionData = {
  id:          string;
  label:       string;
  heading:     string;
  description: string;
  ctaText:     string;
  ctaHref:     string;
  articles:    ArticleItem[];
};

// ── Helper ────────────────────────────────────────────────────────

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

// ── Section definitions (8 reader-identity sections) ─────────────

const SECTIONS: SectionData[] = [
  // ── 1. New to Northern Colorado Real Estate ──────────────────
  {
    id:          "first-rental",
    label:       "Investment Strategy",
    heading:     "New to Northern Colorado Real Estate?",
    description: "The fundamentals of rental property ownership in Northern Colorado — financing, market analysis, and what the first year really looks like.",
    ctaText:     "Talk to a Buyer's Rep →",
    ctaHref:     "/services/buyer-representation",
    articles: [
      {
        title:       "Buying Your First Rental Property in Northern Colorado: What Nobody Tells You",
        excerpt:     "The YouTube math on rental property investing leaves out vacancy, capex, property management, and the learning curve of being a landlord. Here's what the real first year looks like.",
        slug:        "first-rental-property-northern-colorado",
        categorySlug:"investment-strategy",
        coverImage:  img("1560518883-ce09059eeffa"),
      },
      {
        title:       "How to Analyze a Rental Property in Northern Colorado: Cap Rate, Cash-on-Cash, and What Actually Matters",
        excerpt:     "Cap rate tells you what the market thinks the property is worth. Cash-on-cash tells you what it does for your bank account. Here's how to use both — and what investors consistently miss.",
        slug:        "how-to-analyze-rental-property-northern-colorado",
        categorySlug:"investment-strategy",
        coverImage:  img("1486325212027-8081e485255e"),
      },
      {
        title:       "Northern Colorado Rental Market: What Investors Need to Know in 2026",
        excerpt:     "Erie, Longmont, and the I-25 corridor are among the strongest rental markets in Colorado. Here's what the numbers look like — and what out-of-state investors consistently get wrong.",
        slug:        "northern-colorado-rental-market-2026",
        categorySlug:"investment-strategy",
        coverImage:  img("1560185893-a55b8a6f7e89"),
      },
    ],
  },

  // ── 2. The BRRRR Playbook ────────────────────────────────────
  {
    id:          "brrrr",
    label:       "BRRRR Strategy",
    heading:     "The BRRRR Playbook",
    description: "The BRRRR cycle from acquisition to refinance — how to run the numbers, evaluate properties, and know when to hold, sell, or recycle your capital.",
    ctaText:     "Get a BRRRR Rehab Estimate →",
    ctaHref:     "/services/investment-property-rehab",
    articles: [
      {
        title:       "The BRRRR Strategy in Northern Colorado: A Complete Field Guide",
        excerpt:     "Buy, Rehab, Rent, Refinance, Repeat — how the strategy actually works in Colorado's Front Range market, what it costs, and where investors get it wrong.",
        slug:        "brrrr-strategy-northern-colorado",
        categorySlug:"investment-strategy",
        coverImage:  img("1560518883-ce09059eeffa"),
      },
      {
        title:       "What Makes a Good BRRRR Property in Northern Colorado? A Pre-Purchase Checklist",
        excerpt:     "Not every distressed property is a BRRRR candidate. Here's how to evaluate a potential deal before you make an offer — and what kills the math before you even get started.",
        slug:        "brrrr-property-checklist-northern-colorado",
        categorySlug:"investment-strategy",
        coverImage:  img("1560185893-a55b8a6f7e89"),
      },
      {
        title:       "Hold, Sell, or Refinance? How to Evaluate Your Rental Property Portfolio",
        excerpt:     "Every investment property owner eventually faces the hold-sell-refinance question. Here's how to build the analysis — and how to avoid making a $200,000 decision based on emotion.",
        slug:        "hold-sell-refinance-rental-property",
        categorySlug:"investment-strategy",
        coverImage:  img("1560518883-ce09059eeffa"),
      },
    ],
  },

  // ── 3. Managing Your Rental Property ────────────────────────
  {
    id:          "property-management",
    label:       "Property Management",
    heading:     "Managing Your Rental Property",
    description: "What professional property management actually delivers — operations vs. administration, the real cost breakdown, and how to keep good tenants longer.",
    ctaText:     "Learn About Our Management →",
    ctaHref:     "/services/property-management",
    articles: [
      {
        title:       "The Boots-on-Ground Model: What Real Property Management Actually Looks Like",
        excerpt:     "Administrative management and operational management are not the same thing. Here's what it means to have a team physically at your property — and why it matters.",
        slug:        "boots-on-ground-property-management",
        categorySlug:"property-management",
        coverImage:  img("1560518883-ce09059eeffa"),
      },
      {
        title:       "What Does Property Management Actually Cost? A Northern Colorado Breakdown",
        excerpt:     "The 10% management fee doesn't tell the whole story. Leasing fees, maintenance markups, and renewal charges add up. Here's what management actually costs — and when the math clearly favors hiring a professional.",
        slug:        "property-management-cost-northern-colorado",
        categorySlug:"property-management",
        coverImage:  img("1486325212027-8081e485255e"),
      },
      {
        title:       "The Tenant Turnover Problem: How Professional Management Reduces Vacancy Costs",
        excerpt:     "One month of vacancy on a $2,000/month rental costs more than most owners realize — lost rent plus turnover rehab. Here's how professional management changes the math.",
        slug:        "reduce-tenant-turnover-rental-property",
        categorySlug:"property-management",
        coverImage:  img("1560518883-ce09059eeffa"),
      },
    ],
  },

  // ── 4. Maintenance & Seasonal Care ──────────────────────────
  {
    id:          "maintenance",
    label:       "Property Maintenance",
    heading:     "Maintenance & Seasonal Care",
    description: "Colorado's climate demands a specific maintenance rhythm. These guides cover renovation planning, the seasonal calendar, and winterization before the freeze.",
    ctaText:     "Explore Maintenance Coordination →",
    ctaHref:     "/services/maintenance-coordination",
    articles: [
      {
        title:       "How to Plan a Home Renovation: A Northern Colorado Homeowner's Guide",
        excerpt:     "A well-planned renovation delivers results on budget and on schedule. A poorly planned one delivers surprises. Here's how to scope, budget, and manage a renovation from start to finish.",
        slug:        "how-to-plan-home-renovation-colorado",
        categorySlug:"renovation-rehab",
        coverImage:  img("1503387762-592deb58ef4e"),
      },
      {
        title:       "The Northern Colorado Property Maintenance Calendar: What to Do Every Month",
        excerpt:     "Fall is the single most important maintenance window in Colorado. Deferred maintenance costs 3–5× more when it fails. Here's a practical month-by-month guide for residential and rental property owners.",
        slug:        "northern-colorado-property-maintenance-calendar",
        categorySlug:"property-maintenance",
        coverImage:  img("1558981403-c5f9899a28bc"),
      },
      {
        title:       "Winterizing Your Northern Colorado Property: The Checklist That Prevents Expensive Failures",
        excerpt:     "Burst irrigation pipes cost $2,000–$8,000. Winterization costs $85–$150. Colorado's freeze season can start in October. Here's everything that needs to happen before the first hard freeze.",
        slug:        "winterizing-northern-colorado-property",
        categorySlug:"property-maintenance",
        coverImage:  img("1558981403-c5f9899a28bc"),
      },
    ],
  },

  // ── 5. Renovation & Rehab ROI ────────────────────────────────
  {
    id:          "renovation",
    label:       "Renovation & Rehab",
    heading:     "Renovation & Rehab ROI",
    description: "Which renovations come back at resale or lease-up, which ones don't, and how to scope a fix-and-flip before the numbers get away from you.",
    ctaText:     "Get a Renovation Estimate →",
    ctaHref:     "/services/renovation-remodel",
    articles: [
      {
        title:       "Which Renovations Actually Pay Back in Northern Colorado? A Landlord's Guide",
        excerpt:     "Not every renovation dollar comes back at resale or lease-up. Here's what Northern Colorado buyers and tenants actually pay for — and what's vanity spending.",
        slug:        "renovations-that-pay-back-northern-colorado",
        categorySlug:"renovation-rehab",
        coverImage:  img("1556909114-f6e7ad7d3136"),
      },
      {
        title:       "Basement Finishing in Northern Colorado: What It Costs and What It Returns",
        excerpt:     "A finished basement adds 10–15% to appraised value in Northern Colorado. Here's what it costs, what the bank recognizes, and why the permit question matters more than most owners think.",
        slug:        "basement-finishing-cost-roi-northern-colorado",
        categorySlug:"renovation-rehab",
        coverImage:  img("1600585154340-be6161a56a0c"),
      },
      {
        title:       "How to Scope a Fix-and-Flip in Northern Colorado: What the Numbers Need to Look Like",
        excerpt:     "The 70% rule is a starting point, not a complete analysis. Here's how to estimate ARV, scope the rehab, account for holding costs, and determine whether the deal actually works.",
        slug:        "fix-flip-scope-northern-colorado",
        categorySlug:"renovation-rehab",
        coverImage:  img("1503387762-592deb58ef4e"),
      },
    ],
  },

  // ── 6. Commercial & Portfolio Strategy ──────────────────────
  {
    id:          "commercial",
    label:       "Commercial & Portfolio",
    heading:     "Commercial & Portfolio Strategy",
    description: "Understanding the commercial market, evaluating contractors for larger assets, and using the 1031 exchange to defer gains and reposition your portfolio.",
    ctaText:     "Commercial & Industrial Management →",
    ctaHref:     "/services/commercial-industrial-management",
    articles: [
      {
        title:       "Commercial vs Residential Investment Property: What's Right for Northern Colorado Investors?",
        excerpt:     "Commercial real estate is valued differently, financed differently, and managed differently. Here's what experienced residential investors need to understand before making their first commercial acquisition.",
        slug:        "commercial-vs-residential-investment-colorado",
        categorySlug:"investment-strategy",
        coverImage:  img("1486325212027-8081e485255e"),
      },
      {
        title:       "How to Evaluate and Hire a Commercial Property Maintenance Contractor",
        excerpt:     "Commercial properties require contractors who understand CAM charges, triple net obligations, and tenant expectations. Here's what to look for and what to put in the contract.",
        slug:        "hiring-commercial-property-maintenance-contractor",
        categorySlug:"hoa-commercial",
        coverImage:  img("1486325212027-8081e485255e"),
      },
      {
        title:       "The 1031 Exchange: What Every Colorado Investment Property Owner Needs to Know",
        excerpt:     "The 1031 exchange lets you sell an investment property and defer capital gains taxes — but the timeline is unforgiving and the rules have teeth. Here's what you need to know before you list.",
        slug:        "1031-exchange-colorado-guide",
        categorySlug:"investment-strategy",
        coverImage:  img("1486325212027-8081e485255e"),
      },
    ],
  },

  // ── 7. Outdoor Living & Landscape ───────────────────────────
  {
    id:          "outdoor-living",
    label:       "Outdoor Living",
    heading:     "Outdoor Living & Landscape",
    description: "Decks, landscape ROI, and water-smart design for Northern Colorado's semi-arid climate — what improves resale value and what eats maintenance budget.",
    ctaText:     "Get a Landscape Design Estimate →",
    ctaHref:     "/services/landscape-design-install",
    articles: [
      {
        title:       "Composite vs. Wood Decking in Colorado: A Practical Comparison",
        excerpt:     "Material costs, maintenance burden, lifespan, and resale impact — the honest comparison Colorado homeowners need before committing to a deck material.",
        slug:        "composite-vs-wood-decking-colorado",
        categorySlug:"outdoor-structures",
        coverImage:  img("1533090161-9d2efb8c5897"),
      },
      {
        title:       "Landscape ROI: What Outdoor Improvements Actually Add to Your Northern Colorado Home's Value",
        excerpt:     "Landscaping returns 5–15% of investment at resale in most Colorado markets. Tenants will pay $50–$150/month more for a well-maintained exterior. Here's how to make the investment count.",
        slug:        "landscape-roi-northern-colorado-home-value",
        categorySlug:"outdoor-living",
        coverImage:  img("1558618666-fcd25c85cd64"),
      },
      {
        title:       "Water-Smart Landscaping for Northern Colorado: Beauty Without the Water Bill",
        excerpt:     "Northern Colorado municipalities have tiered water pricing and seasonal restrictions. Native plants require 50–75% less water after establishment. Here's how to design a landscape that looks great and costs less to maintain.",
        slug:        "water-smart-landscaping-northern-colorado",
        categorySlug:"outdoor-living",
        coverImage:  img("1558618047-6e3b4b1ae965"),
      },
    ],
  },

  // ── 8. Lawn, Turf & Grounds ──────────────────────────────────
  {
    id:          "lawn-turf",
    label:       "Lawn & Turf",
    heading:     "Lawn, Turf & Grounds",
    description: "Colorado's clay soils, semi-arid climate, and water restrictions make lawn care here distinctly different from the rest of the country.",
    ctaText:     "Explore Lawn Care Services →",
    ctaHref:     "/services/lawn-care",
    articles: [
      {
        title:       "Sod vs. Seed: Which Is Right for Your Colorado Yard?",
        excerpt:     "Both work — but not for every yard. Here's how to choose based on your timeline, budget, and site conditions.",
        slug:        "sod-vs-seed-colorado",
        categorySlug:"lawn-turf",
        coverImage:  img("1517022812379-23952977f6e7"),
      },
      {
        title:       "Dealing with Clay Soil in Northern Colorado",
        excerpt:     "Front Range soil is some of the most difficult in the country for landscaping. Here's what you're working with — and how to actually fix it.",
        slug:        "clay-soil-northern-colorado",
        categorySlug:"lawn-turf",
        coverImage:  img("1416879595882-3373a0480b5b"),
      },
      {
        title:       "Why Your Front Range Lawn Looks Terrible in August",
        excerpt:     "Heat stress, drought dormancy, and fungal disease all peak in August. Here's how to tell them apart and what to do about each.",
        slug:        "august-lawn-problems-colorado",
        categorySlug:"lawn-turf",
        coverImage:  img("1558618666-fcd25c85cd64"),
      },
    ],
  },
];

// Flat list of all slugs for DB check
const ALL_ARTICLE_SLUGS = SECTIONS.flatMap((s) => s.articles.map((a) => a.slug));

// ── Page ──────────────────────────────────────────────────────────

export default async function UniversityHubPage() {
  // Single query: which of our 24 articles are live in the DB?
  const existingArticles = await prisma.universityArticle.findMany({
    where:  { slug: { in: ALL_ARTICLE_SLUGS }, status: "PUBLISHED" },
    select: { slug: true },
  });
  const existingSlugs = new Set(existingArticles.map((a) => a.slug));

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

        {/* ── Search Bar ── */}
        <section className="border-b border-white/8 py-10 px-6">
          <div className="max-w-2xl mx-auto">
            <p className="font-barlow font-300 text-sm text-white/55 text-center mb-4">
                Over 40 articles, guides, and how-tos — search by topic or scroll by reader type below.
            </p>
            <UniversitySearchBar />
          </div>
        </section>

        {/* ── Reader-Identity Sections ── */}
          {SECTIONS.map((section, sectionIndex) => (
            <div key={section.id}>

              {/* Amber rule between sections (not before first) */}
              {sectionIndex > 0 && (
                <div className="px-6">
                  <div className="max-w-5xl mx-auto border-t border-[#D4981A]/20" />
                </div>
              )}

              <section className="py-14 px-6">
                <div className="max-w-5xl mx-auto">

                  {/* Section header */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                      <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-[#C85A00] mb-2">
                        {section.label}
                      </p>
                      <h2 className="font-cinzel font-700 text-white text-2xl md:text-3xl normal-case leading-tight mb-3">
                        {section.heading}
                      </h2>
                      <p className="font-barlow font-300 text-sm text-white/55 leading-relaxed max-w-xl">
                        {section.description}
                      </p>
                    </div>
                    <Link
                      href={section.ctaHref}
                      className="font-condensed font-600 text-xs uppercase tracking-widest text-[#C85A00] hover:text-[#D4981A] transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      {section.ctaText}
                    </Link>
                  </div>

                  {/* Article cards */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {section.articles.map((article) => {
                      const isLive = existingSlugs.has(article.slug);
                      const href   = `/university/${article.categorySlug}/${article.slug}`;

                      if (isLive) {
                        return (
                          <Link
                            key={article.slug}
                            href={href}
                            className="group flex flex-col bg-card border border-white/8 hover:border-orange/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                          >
                            <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={article.coverImage}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex flex-col flex-1 p-5">
                              <p className="font-condensed font-600 text-[10px] uppercase tracking-[0.2em] text-[#C85A00] mb-2">
                                {section.label}
                              </p>
                              <h3 className="font-cinzel font-700 text-white text-sm leading-snug mb-3 normal-case group-hover:text-orange transition-colors">
                                {article.title}
                              </h3>
                              <p className="font-barlow font-300 text-xs text-white/60 leading-relaxed line-clamp-3 flex-1">
                                {article.excerpt}
                              </p>
                              <p className="font-condensed text-xs uppercase tracking-wide text-[#C85A00] mt-4 group-hover:text-[#D4981A] transition-colors">
                                Read Article →
                              </p>
                            </div>
                          </Link>
                        );
                      }

                      // Coming soon — not yet in DB
                      return (
                        <div
                          key={article.slug}
                          className="flex flex-col bg-card border border-white/5 overflow-hidden opacity-50"
                        >
                          <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={article.coverImage}
                              alt={article.title}
                              className="w-full h-full object-cover opacity-50"
                            />
                          </div>
                          <div className="flex flex-col flex-1 p-5">
                            <p className="font-condensed font-600 text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">
                              {section.label}
                            </p>
                            <h3 className="font-cinzel font-700 text-white/30 text-sm leading-snug mb-3 normal-case">
                              {article.title}
                            </h3>
                            <p className="font-barlow font-300 text-xs text-white/20 leading-relaxed line-clamp-3 flex-1">
                              {article.excerpt}
                            </p>
                            <p className="font-condensed text-xs uppercase tracking-wide text-white/30 mt-4">
                              Coming Soon
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </section>
            </div>
          ))}

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
