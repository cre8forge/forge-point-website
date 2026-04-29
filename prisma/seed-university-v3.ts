/**
 * Forge Point University — v3 seed
 *
 * Adds 8 articles that are served as static page files but still need
 * DB records so the /university hub recognizes them as PUBLISHED.
 *
 * - 5 articles fix "Coming Soon" cards on the hub
 * - 3 articles populate the colorado-living category page (DB fallback)
 *
 * Safe to re-run — all operations are upserts keyed on slug.
 *
 * Run with:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed-university-v3.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

// ── Articles to seed ─────────────────────────────────────────────
// content is a placeholder — these articles render from static page files.
// The DB record only needs to exist for the hub slug check and category pages.

const ARTICLES = [
  // ── Hub fixes (Coming Soon → live) ─────────────────────────────

  {
    slug:        "boots-on-ground-property-management",
    title:       "The Boots-on-Ground Model: What Real Property Management Actually Looks Like",
    excerpt:     "Administrative management and operational management are not the same thing. Here's what it means to have a team physically at your property — and why it matters.",
    coverImage:  img("1560518883-ce09059eeffa"),
    categorySlug:"property-management",
    featured:    true,
    sortOrder:   1,
  },
  {
    slug:        "composite-vs-wood-decking-colorado",
    title:       "Composite vs. Wood Decking in Colorado: A Practical Comparison",
    excerpt:     "Colorado's UV, freeze-thaw, and low humidity make this choice more consequential than in other climates. Here's the honest breakdown.",
    coverImage:  img("1533090161-9d2efb8c5897"),
    categorySlug:"outdoor-living",
    featured:    true,
    sortOrder:   10,
  },
  {
    slug:        "sod-vs-seed-colorado",
    title:       "Sod vs. Seed: Which Is Right for Your Colorado Yard?",
    excerpt:     "Both work — but not for every yard. Here's how to choose based on your timeline, budget, and site conditions.",
    coverImage:  img("1517022812379-23952977f6e7"),
    categorySlug:"lawn-turf",
    featured:    true,
    sortOrder:   1,
  },
  {
    slug:        "clay-soil-northern-colorado",
    title:       "Dealing with Clay Soil in Northern Colorado",
    excerpt:     "Front Range soil is some of the most difficult in the country for landscaping. Here's what you're working with and how to fix it.",
    coverImage:  img("1416879595882-3373a0480b5b"),
    categorySlug:"lawn-turf",
    featured:    false,
    sortOrder:   2,
  },
  {
    slug:        "august-lawn-problems-colorado",
    title:       "Why Your Front Range Lawn Looks Terrible in August",
    excerpt:     "Heat stress, drought dormancy, and fungal disease all peak in August. Here's how to tell them apart and what to do.",
    coverImage:  img("1558618666-fcd25c85cd64"),
    categorySlug:"lawn-turf",
    featured:    false,
    sortOrder:   3,
  },

  // ── Colorado Living articles (populate category page) ───────────

  {
    slug:        "colorado-climate-property-guide",
    title:       "Colorado Climate & Your Property: What Every Front Range Owner Should Know",
    excerpt:     "Hail, freeze-thaw cycles, intense UV, and altitude combine to put unique stress on Front Range properties. Here's what you're actually managing — and why it matters.",
    coverImage:  img("1560185893-a55b8a6f7e89"),
    categorySlug:"colorado-living",
    featured:    true,
    sortOrder:   10,
  },
  {
    slug:        "colorado-property-insurance-guide",
    title:       "Property Insurance in Colorado: Why Rates Are Rising and What You Can Do",
    excerpt:     "Colorado leads the country in hail-related insurance claims. Understanding what's driving your rates — and what mitigation actually helps — is the first step toward controlling costs.",
    coverImage:  img("1486325212027-8081e485255e"),
    categorySlug:"colorado-living",
    featured:    false,
    sortOrder:   11,
  },
  {
    slug:        "what-makes-colorado-real-estate-different",
    title:       "What Makes Colorado Real Estate Different: A Guide for Out-of-State Investors",
    excerpt:     "Water rights, HOA prevalence, clay soils, altitude construction costs, and a supply-constrained market — here's what out-of-state investors consistently get wrong about Northern Colorado.",
    coverImage:  img("1558618047-6e3b4b1ae965"),
    categorySlug:"colorado-living",
    featured:    false,
    sortOrder:   12,
  },
];

// ── Placeholder content ──────────────────────────────────────────
// These articles are rendered by static page files at their URL paths.
// The DB content field is never shown to users for these articles.
const STATIC_PLACEHOLDER = "This article is rendered by a static page file. See app/university for the full content.";

// ── Main seed function ───────────────────────────────────────────

async function seedUniversityV3() {
  console.log("🌱 Seeding Forge Point University v3…\n");

  // Build category slug → id map from existing categories
  const categories = await prisma.universityCategory.findMany({
    select: { id: true, slug: true },
  });
  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    categoryMap[cat.slug] = cat.id;
  }

  console.log(`  Found ${categories.length} existing categories.\n`);

  let count = 0;
  let skipped = 0;

  for (const article of ARTICLES) {
    const categoryId = categoryMap[article.categorySlug];

    if (!categoryId) {
      console.warn(
        `  ⚠ Category "${article.categorySlug}" not found for "${article.slug}" — skipping`
      );
      skipped++;
      continue;
    }

    await prisma.universityArticle.upsert({
      where:  { slug: article.slug },
      update: {
        title:       article.title,
        excerpt:     article.excerpt,
        coverImage:  article.coverImage,
        featured:    article.featured,
        sortOrder:   article.sortOrder,
        categoryId,
        status:      "PUBLISHED",
        publishedAt: new Date("2026-04-01"),
        authorName:  "Forge Point Team",
      },
      create: {
        slug:        article.slug,
        title:       article.title,
        excerpt:     article.excerpt,
        coverImage:  article.coverImage,
        content:     STATIC_PLACEHOLDER,
        featured:    article.featured,
        sortOrder:   article.sortOrder,
        categoryId,
        status:      "PUBLISHED",
        publishedAt: new Date("2026-04-01"),
        authorName:  "Forge Point Team",
      },
    });

    count++;
    console.log(`  ✓ [${article.categorySlug}] ${article.title.slice(0, 65)}…`);
  }

  console.log(`\n  ${count} articles upserted.`);
  if (skipped > 0) {
    console.log(`  ${skipped} skipped (missing category in DB — run v2 seed first).`);
  }
  console.log("\n✅ Forge Point University v3 seed complete.\n");
  console.log("   Hub cards that are now live:");
  console.log("   • boots-on-ground-property-management");
  console.log("   • composite-vs-wood-decking-colorado");
  console.log("   • sod-vs-seed-colorado");
  console.log("   • clay-soil-northern-colorado");
  console.log("   • august-lawn-problems-colorado");
}

// ── Runner ───────────────────────────────────────────────────────

seedUniversityV3()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
