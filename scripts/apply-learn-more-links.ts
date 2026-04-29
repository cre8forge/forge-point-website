#!/usr/bin/env tsx
/**
 * scripts/apply-learn-more-links.ts — Forge Point Learn More Links
 *
 * 1. Queries the DB to resolve every article slug → categorySlug
 * 2. Validates every slug in SERVICE_TO_ARTICLES exists & is PUBLISHED
 * 3. Writes scripts/.learn-more-mapping.json for review
 * 4. With --auto flag: patches lib/services-data.ts in-place
 *
 * Run:       npm run learn-more-links
 * Auto-apply: npm run learn-more-links -- --auto
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

import fs   from "fs";
import path from "path";

// ── Requested mapping ────────────────────────────────────────────────────────
// Maps service slug → ordered list of article slugs + display titles.
// categorySlug is resolved at runtime from the DB.

const SERVICE_TO_ARTICLES: Record<string, Array<{ slug: string; title: string }>> = {
  // ── Advisory ──────────────────────────────────────────────────────────────
  "buyer-representation": [
    { slug: "how-to-analyze-rental-property-northern-colorado", title: "How to Analyze a Rental Property in Northern Colorado" },
    { slug: "what-makes-colorado-real-estate-different",        title: "What Makes Colorado Real Estate Different" },
    { slug: "colorado-property-insurance-guide",               title: "Colorado Property Insurance Guide" },
  ],
  "seller-representation": [
    { slug: "kitchen-bath-remodel-roi-northern-colorado",       title: "Kitchen & Bath Remodel ROI in Northern Colorado" },
    { slug: "landscape-roi-northern-colorado-home-value",       title: "Landscape ROI and Home Value in Northern Colorado" },
    { slug: "renovations-that-pay-back-northern-colorado",      title: "Renovations That Pay Back in Northern Colorado" },
  ],
  "investment-acquisition-analysis": [
    { slug: "how-to-analyze-rental-property-northern-colorado", title: "How to Analyze a Rental Property in Northern Colorado" },
    { slug: "commercial-vs-residential-investment-colorado",    title: "Commercial vs Residential Investment in Colorado" },
    { slug: "northern-colorado-rental-market-2026",            title: "Northern Colorado Rental Market 2026" },
  ],
  "commercial-leasing-advisory": [
    { slug: "commercial-vs-residential-investment-colorado",    title: "Commercial vs Residential Investment in Colorado" },
    { slug: "commercial-industrial-property-management",        title: "Commercial & Industrial Property Management" },
    { slug: "hiring-commercial-property-maintenance-contractor",title: "Hiring a Commercial Property Maintenance Contractor" },
  ],
  "portfolio-strategy": [
    { slug: "hold-sell-refinance-rental-property",             title: "Hold, Sell, or Refinance a Rental Property" },
    { slug: "brrrr-strategy-northern-colorado",                title: "BRRRR Strategy in Northern Colorado" },
    { slug: "northern-colorado-rental-market-2026",            title: "Northern Colorado Rental Market 2026" },
  ],
  "1031-exchange": [
    { slug: "1031-exchange-colorado-guide",                    title: "1031 Exchange Colorado Guide" },
    { slug: "hold-sell-refinance-rental-property",             title: "Hold, Sell, or Refinance a Rental Property" },
  ],

  // ── Property Management ───────────────────────────────────────────────────
  "property-management": [
    { slug: "boots-on-ground-property-management",             title: "The Boots-on-Ground Model" },
    { slug: "how-to-find-property-manager-northern-colorado",  title: "How to Find a Property Manager in Northern Colorado" },
    { slug: "property-management-cost-northern-colorado",      title: "Property Management Cost in Northern Colorado" },
  ],
  "commercial-industrial-management": [
    { slug: "commercial-industrial-property-management",       title: "Commercial & Industrial Property Management" },
    { slug: "hiring-commercial-property-maintenance-contractor",title: "Hiring a Commercial Property Maintenance Contractor" },
    { slug: "northern-colorado-property-maintenance-calendar", title: "Northern Colorado Property Maintenance Calendar" },
  ],
  "multifamily-hoa-management": [
    { slug: "hoa-grounds-maintenance-contractor",              title: "HOA Grounds Maintenance Contractor" },
    { slug: "document-maintenance-hoa-board",                  title: "Documenting Maintenance for an HOA Board" },
    { slug: "hoa-landscaping-standards",                       title: "HOA Landscaping Standards" },
  ],
  "single-family-management": [
    { slug: "single-family-property-management",               title: "Single-Family Property Management" },
    { slug: "reduce-tenant-turnover-rental-property",          title: "Reduce Tenant Turnover" },
    { slug: "first-rental-property-northern-colorado",         title: "Your First Rental Property in Northern Colorado" },
  ],
  "boots-on-ground-response": [
    { slug: "boots-on-ground-property-management",             title: "The Boots-on-Ground Model" },
    { slug: "northern-colorado-property-maintenance-calendar", title: "Northern Colorado Property Maintenance Calendar" },
  ],
  "maintenance-coordination": [
    { slug: "northern-colorado-property-maintenance-calendar", title: "Northern Colorado Property Maintenance Calendar" },
    { slug: "hiring-commercial-property-maintenance-contractor",title: "Hiring a Commercial Property Maintenance Contractor" },
    { slug: "winter-property-prep-colorado",                   title: "Winter Property Prep in Colorado" },
  ],

  // ── Custom Interiors ──────────────────────────────────────────────────────
  "renovation-remodel": [
    { slug: "how-to-plan-home-renovation-colorado",            title: "How to Plan a Home Renovation in Colorado" },
    { slug: "renovations-that-pay-back-northern-colorado",     title: "Renovations That Pay Back in Northern Colorado" },
    { slug: "flooring-colorado-homes-guide",                   title: "Flooring for Colorado Homes" },
  ],
  "framing-finishes": [
    { slug: "how-to-plan-home-renovation-colorado",            title: "How to Plan a Home Renovation in Colorado" },
    { slug: "renovations-that-pay-back-northern-colorado",     title: "Renovations That Pay Back in Northern Colorado" },
  ],
  "kitchen-bath-more": [
    { slug: "kitchen-bath-remodel-roi-northern-colorado",      title: "Kitchen & Bath Remodel ROI in Northern Colorado" },
    { slug: "kitchen-remodel-roi-colorado",                    title: "Kitchen Remodel ROI in Colorado" },
    { slug: "flooring-colorado-homes-guide",                   title: "Flooring for Colorado Homes" },
  ],
  "basement-finishing": [
    { slug: "basement-finishing-cost-roi-northern-colorado",   title: "Basement Finishing Cost & ROI in Northern Colorado" },
    { slug: "flooring-colorado-homes-guide",                   title: "Flooring for Colorado Homes" },
    { slug: "renovations-that-pay-back-northern-colorado",     title: "Renovations That Pay Back in Northern Colorado" },
  ],
  "additions-expansions": [
    { slug: "how-to-plan-home-renovation-colorado",            title: "How to Plan a Home Renovation in Colorado" },
    { slug: "renovations-that-pay-back-northern-colorado",     title: "Renovations That Pay Back in Northern Colorado" },
  ],
  "investment-property-rehab": [
    { slug: "brrrr-property-checklist-northern-colorado",      title: "BRRRR Property Checklist for Northern Colorado" },
    { slug: "fix-flip-scope-northern-colorado",                title: "Fix and Flip Scope in Northern Colorado" },
    { slug: "flooring-rental-property-northern-colorado",      title: "Flooring a Rental Property in Northern Colorado" },
  ],
  "flooring-tile": [
    { slug: "flooring-colorado-homes-guide",                   title: "Flooring for Colorado Homes" },
    { slug: "flooring-rental-property-northern-colorado",      title: "Flooring a Rental Property in Northern Colorado" },
  ],

  // ── Outdoor Living & Grounds ──────────────────────────────────────────────
  "landscape-design-install": [
    { slug: "plan-colorado-landscape",                         title: "Planning a Colorado Landscape" },
    { slug: "native-plants-northern-colorado",                 title: "Native Plants for Northern Colorado" },
    { slug: "water-smart-landscaping-northern-colorado",       title: "Water-Smart Landscaping for Northern Colorado" },
  ],
  "decks-pergolas-patios": [
    { slug: "composite-vs-wood-decking-colorado",              title: "Composite vs Wood Decking in Colorado" },
    { slug: "deck-patio-cost-roi-colorado",                    title: "Deck & Patio Cost and ROI in Colorado" },
    { slug: "outdoor-lighting-colorado",                       title: "Outdoor Lighting in Colorado" },
  ],
  "custom-water-features": [
    { slug: "adding-water-feature-colorado-guide",             title: "Adding a Water Feature in Colorado" },
    { slug: "colorado-water-restrictions-xeriscape",           title: "Colorado Water Restrictions and Xeriscape" },
    { slug: "designing-for-water-restrictions",                title: "Designing for Water Restrictions" },
  ],
  "fencing": [
    { slug: "cedar-vinyl-metal-fence-colorado",                title: "Cedar vs Vinyl vs Metal Fence in Colorado" },
    { slug: "fence-post-depth-colorado",                       title: "Fence Post Depth in Colorado" },
    { slug: "annual-fence-maintenance-colorado",               title: "Annual Fence Maintenance in Colorado" },
  ],
  "grounds-maintenance": [
    { slug: "colorado-lawn-fertilization-schedule",            title: "Colorado Lawn Fertilization Schedule" },
    { slug: "mowing-height-colorado",                          title: "Mowing Height in Colorado" },
    { slug: "northern-colorado-property-maintenance-calendar", title: "Northern Colorado Property Maintenance Calendar" },
  ],
  "industrial-maintenance": [
    { slug: "commercial-industrial-property-management",       title: "Commercial & Industrial Property Management" },
    { slug: "hiring-commercial-property-maintenance-contractor",title: "Hiring a Commercial Property Maintenance Contractor" },
    { slug: "pressure-vs-soft-wash",                          title: "Pressure vs Soft Wash" },
  ],
  "power-window-washing": [
    { slug: "pressure-vs-soft-wash",                          title: "Pressure vs Soft Wash" },
    { slug: "clean-concrete-driveway",                        title: "How to Clean a Concrete Driveway" },
    { slug: "gutter-maintenance-colorado",                    title: "Gutter Maintenance in Colorado" },
  ],
  "junk-haul-off": [
    { slug: "junk-haul-off-vs-dumpster-rental",               title: "Junk Haul Off vs Dumpster Rental" },
  ],

  // ── Concierge ─────────────────────────────────────────────────────────────
  "housekeeping-cleaning": [
    { slug: "northern-colorado-property-maintenance-calendar", title: "Northern Colorado Property Maintenance Calendar" },
  ],
  "home-safety-checks": [
    { slug: "winterizing-northern-colorado-property",          title: "Winterizing a Northern Colorado Property" },
    { slug: "northern-colorado-property-maintenance-calendar", title: "Northern Colorado Property Maintenance Calendar" },
    { slug: "winter-property-prep-colorado",                   title: "Winter Property Prep in Colorado" },
  ],
  // mobile-auto-detailing, poop-scooping, errand-services — intentionally omitted
};

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const autoApply = process.argv.includes("--auto");

  console.log("\n── Forge Point Learn More Links ────────────────────────────");
  console.log(`   Services mapped : ${Object.keys(SERVICE_TO_ARTICLES).length}`);
  console.log(`   Mode            : ${autoApply ? "validate + auto-apply" : "validate only (add --auto to patch services-data.ts)"}`);
  console.log("────────────────────────────────────────────────────────────\n");

  // ── 1. Query DB ────────────────────────────────────────────────────────────
  let prismaClient: any;
  try {
    const mod    = await import("../lib/prisma");
    prismaClient = mod.prisma;
  } catch (e) {
    console.error(`❌  Could not import Prisma: ${e}`);
    process.exit(1);
  }

  const allSlugs = new Set<string>();
  Object.values(SERVICE_TO_ARTICLES).forEach(arr => arr.forEach(a => allSlugs.add(a.slug)));

  const articles = await prismaClient.universityArticle.findMany({
    where:   { slug: { in: [...allSlugs] } },
    include: { category: { select: { slug: true } } },
    select:  { slug: true, title: true, status: true, category: true },
  });

  await prismaClient.$disconnect().catch(() => {});

  // Build lookup: article slug → { categorySlug, title, status }
  const lookup: Record<string, { categorySlug: string; title: string; status: string }> = {};
  for (const a of articles) {
    lookup[a.slug] = { categorySlug: a.category.slug, title: a.title, status: a.status };
  }

  // ── 2. Validate ────────────────────────────────────────────────────────────
  const missing:     string[] = [];
  const unpublished: string[] = [];

  for (const slug of allSlugs) {
    if (!lookup[slug]) { missing.push(slug); continue; }
    if (lookup[slug].status !== "PUBLISHED") unpublished.push(slug);
  }

  if (missing.length > 0) {
    console.warn(`⚠  ${missing.length} article slug(s) NOT FOUND in DB (will be skipped):`);
    missing.forEach(s => console.warn(`   - ${s}`));
    console.warn("");
  }
  if (unpublished.length > 0) {
    console.warn(`⚠  ${unpublished.length} article(s) NOT PUBLISHED (will be skipped):`);
    unpublished.forEach(s => console.warn(`   - ${s} [${lookup[s]?.status}]`));
    console.warn("");
  }

  // ── 3. Build enriched mapping ──────────────────────────────────────────────
  const enriched: Record<string, Array<{ title: string; slug: string; categorySlug: string }>> = {};

  for (const [serviceSlug, links] of Object.entries(SERVICE_TO_ARTICLES)) {
    const valid = links.filter(l => lookup[l.slug]?.status === "PUBLISHED");
    if (!valid.length) continue;
    enriched[serviceSlug] = valid.map(l => ({
      title:        lookup[l.slug].title,      // DB title is source of truth
      slug:         l.slug,
      categorySlug: lookup[l.slug].categorySlug,
    }));
  }

  // ── 4. Write review JSON ───────────────────────────────────────────────────
  const reviewPath = path.join("scripts", ".learn-more-mapping.json");
  fs.mkdirSync("scripts", { recursive: true });
  fs.writeFileSync(reviewPath, JSON.stringify(enriched, null, 2), "utf-8");
  console.log(`✅  Wrote ${reviewPath}`);
  console.log(`   ${Object.keys(enriched).length} services with valid links\n`);

  if (!autoApply) {
    console.log("Review the JSON, then run with --auto to patch services-data.ts:");
    console.log("  npm run learn-more-links -- --auto\n");
    return;
  }

  // ── 5. Auto-patch services-data.ts ────────────────────────────────────────
  console.log("Patching lib/services-data.ts…\n");

  const sdPath = path.join("lib", "services-data.ts");
  let   sdText = fs.readFileSync(sdPath, "utf-8");

  let patched = 0;
  let skipped = 0;

  for (const [serviceSlug, links] of Object.entries(enriched)) {
    // Build the learnMoreLinks array literal
    const lines = links.map(l =>
      `    { title: "${l.title.replace(/"/g, '\\"')}",\n` +
      `      slug: "${l.slug}", categorySlug: "${l.categorySlug}" }`,
    );
    const field = `  learnMoreLinks: [\n${lines.join(",\n")},\n  ],`;

    // If already present, skip
    if (sdText.includes(`learnMoreLinks`) && new RegExp(`slug:\\s*"${serviceSlug}"[\\s\\S]*?learnMoreLinks`).test(sdText.slice(0, sdText.length))) {
      // Check if THIS service already has it
      const slugIdx = sdText.indexOf(`slug:     "${serviceSlug}"`);
      const nextSlugIdx = sdText.indexOf("slug:", slugIdx + 10);
      const block = slugIdx >= 0 ? sdText.slice(slugIdx, nextSlugIdx >= 0 ? nextSlugIdx : undefined) : "";
      if (block.includes("learnMoreLinks")) {
        console.log(`  ⟳ ${serviceSlug} (already has learnMoreLinks — skipped)`);
        skipped++;
        continue;
      }
    }

    // Find insertion point: after `category:` line, before `disclaimer:` or closing `},`
    const slugEsc   = serviceSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const slugMatch = new RegExp(`slug:\\s*"${slugEsc}"`).exec(sdText);
    if (!slugMatch) {
      console.warn(`  ⚠ slug "${serviceSlug}" not found — skipped`);
      skipped++;
      continue;
    }

    const blockStart = slugMatch.index;
    const nextSlug   = sdText.indexOf("slug:", blockStart + slugMatch[0].length);
    const blockEnd   = nextSlug >= 0 ? nextSlug : sdText.length;
    const block      = sdText.slice(blockStart, blockEnd);

    // Find `category:` line end in this block
    const catMatch = /category:\s*"[^"]*",\n/.exec(block);
    if (!catMatch) {
      console.warn(`  ⚠ category field not found for "${serviceSlug}" — skipped`);
      skipped++;
      continue;
    }

    const insertAt = blockStart + catMatch.index + catMatch[0].length;
    sdText = sdText.slice(0, insertAt) + field + "\n" + sdText.slice(insertAt);
    console.log(`  ✅  ${serviceSlug}`);
    patched++;
  }

  fs.writeFileSync(sdPath, sdText, "utf-8");
  console.log(`\n  Patched: ${patched}  Skipped: ${skipped}\n`);

  // ── 6. Build check ─────────────────────────────────────────────────────────
  console.log("Running tsc --noEmit to type-check…\n");
  try {
    const { execSync } = await import("child_process");
    execSync("npx tsc --noEmit", { stdio: "inherit" });
    console.log("\n✅  Type check passed.\n");
  } catch {
    console.error("\n❌  Type errors found. Review the output above.\n");
    process.exit(1);
  }

  console.log("====================================================");
  console.log("Learn More Links applied.");
  console.log(`  Services patched : ${patched}`);
  console.log("");
  console.log("Spot-check these pages:");
  console.log("  /services/decks-pergolas-patios  (3 links)");
  console.log("  /services/buyer-representation   (3 links)");
  console.log("  /services/mobile-auto-detailing  (no links)");
  console.log("  /services/property-management    (3 links)");
  console.log("====================================================\n");
}

main().catch(err => { console.error(err); process.exit(1); });
