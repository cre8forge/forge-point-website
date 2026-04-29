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
  title: "The Boots-on-Ground Model: What Real Property Management Actually Looks Like — Forge Point University",
  description:
    "Administrative management and operational management are not the same thing. Here's what it means to have a team physically at your property — and why it matters.",
};

export const revalidate = 3600;

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const ARTICLE = {
  title: "The Boots-on-Ground Model: What Real Property Management Actually Looks Like",
  categoryName: "Property Management",
  categorySlug: "property-management",
  coverImage: img("1560518883-ce09059eeffa"),
  authorName: "Forge Point Team",
  publishDate: "April 2025",
  readMinutes: 4,
};

const CONTENT = `## The Gap Between Administration and Operations

Most people think of property management as a coordination service — someone who answers the phone, schedules vendors, collects rent, and sends reports. That's administrative property management, and it's genuinely useful. But it has a structural limitation: it depends entirely on the vendor network and response times of the third parties being coordinated.

Boots-on-ground management is something different. It means the management team has people in the field — real crew members who physically go to your property, observe conditions, perform work, and respond to problems directly.

![Property manager conducting a physical walkthrough and inspection](https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80)

### What Happens When You Call at 11 PM

In an administrative management model, an after-hours emergency triggers a call to a vendor dispatch system. That system contacts a contractor on an approved list. The contractor returns the call within some window. They assess whether it's an emergency worth a late-night trip. They arrive when they decide to arrive.

In a boots-on-ground model, the call goes to the management team that has its own crew. Someone with knowledge of your specific property — its layout, access points, shutoffs, quirks — is dispatched. The response is faster, the cost is controlled, and the person showing up knows your property.

For owners with properties they're not physically close to, this distinction is the difference between peace of mind and anxiety.

### The On-Call Supplement Model

One of the most effective property management arrangements is a hybrid: you keep your existing property management company for administrative functions (tenant screening, lease management, financial reporting, legal compliance) and you add Forge Point as the boots-on-ground operational layer.

Your PM company handles the paperwork. Forge Point handles the physical:

- Scheduled property walkthroughs with documented reports
- Routine maintenance and grounds upkeep
- 24/7 emergency response (month-to-month retainer + per-incident rate)
- Tenant maintenance request coordination and completion
- Before/after photo documentation for every service event

This model is particularly valuable for property owners who have a PM company they trust administratively but find that vendor response times, maintenance quality, or physical presence are lacking.

> **The key metric:** How quickly does someone physically show up at your property when something is wrong? That answer tells you everything about the operational quality of your property management.

### What Regular Walkthroughs Actually Catch

Properties that are visited regularly and documented consistently have dramatically better maintenance outcomes than properties where someone only shows up when something is broken.

What regular physical presence catches before it becomes expensive:

- Irrigation heads that are watering the sidewalk instead of the lawn (water waste + higher bills)
- A gutter that has separated and is directing water against the foundation
- Fence posts that have heaved slightly — easy to reset, expensive to replace
- A crawlspace vent that has been blocked, creating moisture buildup underneath
- Exterior lighting that's burned out, creating a security gap
- Tenant modifications that are outside the lease agreement

None of these show up in a monthly financial report. They show up during a walkthrough.

### Documentation That Protects Ownership

Every Forge Point property visit generates a written report with:

- Date, time, and crew member(s) on-site
- Conditions observed across the property
- Maintenance items identified
- Actions taken
- Photo documentation of before and after for any work performed

This documentation exists for the property owner's protection. At lease renewal disputes, insurance claims, or any ownership transition, a documented record of maintenance history has real value. Properties that can demonstrate consistent, professional maintenance retain value better and carry lower risk.`;

const RELATED = [
  {
    title: "What Does Property Management Actually Cost? A Northern Colorado Breakdown",
    excerpt:
      "The 10% management fee doesn't tell the whole story. Leasing fees, maintenance markups, and renewal charges add up. Here's what management actually costs — and when the math clearly favors hiring a professional.",
    slug: "property-management-cost-northern-colorado",
    categorySlug: "property-management",
    coverImage: img("1486325212027-8081e485255e"),
  },
  {
    title: "The Tenant Turnover Problem: How Professional Management Reduces Vacancy Costs",
    excerpt:
      "One month of vacancy on a $2,000/month rental costs more than most owners realize — lost rent plus turnover rehab. Here's how professional management changes the math.",
    slug: "reduce-tenant-turnover-rental-property",
    categorySlug: "property-management",
    coverImage: img("1560518883-ce09059eeffa"),
  },
  {
    title: "How to Evaluate and Hire a Commercial Property Maintenance Contractor",
    excerpt:
      "Commercial properties require contractors who understand CAM charges, triple net obligations, and tenant expectations. Here's what to look for and what to put in the contract.",
    slug: "hiring-commercial-property-maintenance-contractor",
    categorySlug: "hoa-commercial",
    coverImage: img("1486325212027-8081e485255e"),
  },
];

export default async function BootsOnGroundPage() {
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
                    category="property-management"
                    articleSlug="boots-on-ground-property-management"
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
