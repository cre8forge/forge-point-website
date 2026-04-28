/**
 * Forge Point University — v2 seed
 * Upserts 8 categories and 23 articles.
 *
 * Run with:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed-university-v2.ts
 *
 * Safe to re-run — all operations are upserts keyed on slug.
 */

import { PrismaClient } from "@prisma/client";
import { ARTICLES_A } from "./university-articles-a";
import { ARTICLES_B } from "./university-articles-b";

const prisma = new PrismaClient();

// ── Category definitions ─────────────────────────────────────────

const CATEGORIES = [
  {
    name:        "Investment Strategy & BRRRR",
    slug:        "investment-strategy",
    sortOrder:   1,
    description: "The playbook for building wealth through Northern Colorado real estate — acquisition analysis, BRRRR execution, rental property ROI, 1031 exchanges, and portfolio strategy. Written for investors, not textbooks.",
  },
  {
    name:        "Property Management",
    slug:        "property-management",
    sortOrder:   2,
    description: "How professional property management actually works — from physical operations and tenant relations to commercial portfolio oversight. The gap between administrative and operational management explained.",
  },
  {
    name:        "Renovation & Rehab ROI",
    slug:        "renovation-rehab",
    sortOrder:   3,
    description: "Which renovations return their cost, which ones don't, and how to scope a rehab for maximum rent or resale value in Northern Colorado's market. For homeowners and investors.",
  },
  {
    name:        "Outdoor Living & Landscape",
    slug:        "outdoor-living",
    sortOrder:   4,
    description: "Design, construction, and installation guides for Northern Colorado's outdoor spaces — decks, patios, landscape, water features, and outdoor structures built for Colorado's climate.",
  },
  {
    name:        "Property Maintenance",
    slug:        "property-maintenance",
    sortOrder:   5,
    description: "Practical seasonal and ongoing maintenance guides for residential and commercial properties — what to do, when to do it, and what it costs to defer.",
  },
  {
    name:        "Lawn, Turf & Grounds",
    slug:        "lawn-turf",
    sortOrder:   6,
    description: "Growing and maintaining healthy turf in Northern Colorado's clay soils, semi-arid climate, and water-restriction environment. Guides for homeowners, HOAs, and commercial properties.",
  },
  {
    name:        "HOA & Commercial",
    slug:        "hoa-commercial",
    sortOrder:   7,
    description: "Guides for HOA boards and commercial property managers — contractor selection, maintenance standards, compliance, and building long-term vendor relationships.",
  },
  {
    name:        "Colorado Property Guide",
    slug:        "colorado-living",
    sortOrder:   8,
    description: "Understanding what makes Colorado's property market different — climate, soils, regulations, building codes, and the conditions that affect every property decision in this region.",
  },
];

// ── Main seed function ───────────────────────────────────────────

async function seedUniversityV2() {
  console.log("🌱 Seeding Forge Point University v2…\n");

  // 1. Upsert all categories and build a slug→id map
  const categoryMap: Record<string, string> = {};

  for (const cat of CATEGORIES) {
    const result = await prisma.universityCategory.upsert({
      where:  { slug: cat.slug },
      update: {
        name:        cat.name,
        description: cat.description,
        sortOrder:   cat.sortOrder,
      },
      create: {
        name:        cat.name,
        slug:        cat.slug,
        description: cat.description,
        sortOrder:   cat.sortOrder,
      },
    });
    categoryMap[cat.slug] = result.id;
    console.log(`  ✓ Category: ${cat.name}`);
  }

  console.log(`\n  ${CATEGORIES.length} categories upserted.\n`);

  // 2. Upsert all articles from both part files
  const allArticles = [...ARTICLES_A, ...ARTICLES_B];
  let count = 0;

  for (const article of allArticles) {
    const categoryId = categoryMap[article.categorySlug];
    if (!categoryId) {
      console.warn(`  ⚠ Unknown categorySlug "${article.categorySlug}" for article "${article.slug}" — skipping`);
      continue;
    }

    await prisma.universityArticle.upsert({
      where:  { slug: article.slug },
      update: {
        title:       article.title,
        excerpt:     article.excerpt,
        coverImage:  article.coverImage,
        content:     article.content,
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
        content:     article.content,
        featured:    article.featured,
        sortOrder:   article.sortOrder,
        categoryId,
        status:      "PUBLISHED",
        publishedAt: new Date("2026-04-01"),
        authorName:  "Forge Point Team",
      },
    });

    count++;
    console.log(`  ✓ Article [${article.categorySlug}]: ${article.title.slice(0, 60)}…`);
  }

  console.log(`\n  ${count} articles upserted.`);
  console.log("\n✅ Forge Point University v2 seed complete.\n");
}

// ── Runner ───────────────────────────────────────────────────────

seedUniversityV2()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
