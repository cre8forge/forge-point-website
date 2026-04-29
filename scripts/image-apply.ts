#!/usr/bin/env tsx
/**
 * scripts/image-apply.ts — Forge Point Image Apply v2
 *
 * Reads scripts/.image-selections.json (exported from the review HTML page).
 *
 * Phase 1 — Downloads & resizes each approved image to its local path
 *            under public/. Uses sharp (already installed).
 *
 * Phase 2 — Patches lib/services-data.ts:
 *            Replaces Unsplash photo IDs with /<localPath> strings for
 *            heroImage, overviewImage, and gallery[N].id fields.
 *
 * Phase 3 — Patches the three service-image components:
 *            ServiceHero.tsx    → src={heroImage}      (was Unsplash template literal)
 *            ServiceOverview.tsx→ src={overviewImage}  (was Unsplash template literal)
 *            ServiceGallery.tsx → src={img.id}         (was Unsplash template literal)
 *
 * Phase 4 — Updates Prisma UniversityArticle.coverImage for university slots.
 *
 * Phase 5 — Runs `npm run build` to verify nothing broke.
 *
 * Run:   npm run images:apply
 */

import "dotenv/config";
import fs              from "fs";
import path            from "path";
import { execSync }    from "child_process";
import sharp           from "sharp";
import { SERVICES_DATA } from "../lib/services-data";

// ── Constants ─────────────────────────────────────────────────────────────────

const SELECTIONS_FILE = path.join("scripts", ".image-selections.json");

const WIDTHS: Record<string, number> = {
  hero:    1920,
  inline:  1200,
  gallery:  800,
};

// ── Types ─────────────────────────────────────────────────────────────────────

interface SelectionEntry {
  rank:         number | "REJECT";
  downloadUrl:  string | null;
  photographer: string | null;
  source:       string | null;
  localPath:    string;    // e.g. "images/services/advisory/buyer-rep-hero.jpg"
  sizeType:     string;    // "hero" | "inline" | "gallery"
}

interface SelectionsFile {
  exportedAt: string;
  totalSlots: number;
  selections: Record<string, SelectionEntry>;
}

// ── Service slug → slot ID mapping ───────────────────────────────────────────
// Keys must exactly match slug fields in lib/services-data.ts.
// Values are slot IDs from image-source.ts.

const SLUG_TO_SLOTS: Record<string, {
  hero:    string;
  inline:  string;
  gallery: string[];
}> = {
  "buyer-representation": {
    hero:    "advisory/buyer-rep-hero",
    inline:  "advisory/buyer-rep-inline",
    gallery: ["advisory/buyer-rep-gallery-1","advisory/buyer-rep-gallery-2","advisory/buyer-rep-gallery-3"],
  },
  "seller-representation": {
    hero:    "advisory/seller-rep-hero",
    inline:  "advisory/seller-rep-inline",
    gallery: ["advisory/seller-rep-gallery-1","advisory/seller-rep-gallery-2","advisory/seller-rep-gallery-3"],
  },
  "investment-acquisition-analysis": {
    hero:    "advisory/acquisition-hero",
    inline:  "advisory/acquisition-inline",
    gallery: ["advisory/acquisition-gallery-1","advisory/acquisition-gallery-2","advisory/acquisition-gallery-3"],
  },
  "commercial-leasing-advisory": {
    hero:    "advisory/commercial-leasing-hero",
    inline:  "advisory/commercial-leasing-inline",
    gallery: ["advisory/commercial-leasing-gallery-1","advisory/commercial-leasing-gallery-2","advisory/commercial-leasing-gallery-3"],
  },
  "portfolio-strategy": {
    hero:    "advisory/portfolio-hero",
    inline:  "advisory/portfolio-inline",
    gallery: ["advisory/portfolio-gallery-1","advisory/portfolio-gallery-2","advisory/portfolio-gallery-3"],
  },
  "1031-exchange": {
    hero:    "advisory/1031-hero",
    inline:  "advisory/1031-inline",
    gallery: ["advisory/1031-gallery-1","advisory/1031-gallery-2","advisory/1031-gallery-3"],
  },
  "property-management": {
    hero:    "pm/overview-hero",
    inline:  "pm/overview-inline",
    gallery: [],
  },
  "commercial-industrial-management": {
    hero:    "pm/commercial-industrial-hero",
    inline:  "pm/commercial-industrial-inline",
    gallery: ["pm/commercial-industrial-gallery-1","pm/commercial-industrial-gallery-2","pm/commercial-industrial-gallery-3"],
  },
  "multifamily-hoa-management": {
    hero:    "pm/multifamily-hoa-hero",
    inline:  "pm/multifamily-hoa-inline",
    gallery: ["pm/multifamily-hoa-gallery-1","pm/multifamily-hoa-gallery-2","pm/multifamily-hoa-gallery-3"],
  },
  "single-family-management": {
    hero:    "pm/sfh-hero",
    inline:  "pm/sfh-inline",
    gallery: ["pm/sfh-gallery-1","pm/sfh-gallery-2","pm/sfh-gallery-3"],
  },
  "boots-on-ground-response": {
    hero:    "pm/boots-on-ground-hero",
    inline:  "pm/boots-on-ground-inline",
    gallery: ["pm/boots-on-ground-gallery-1","pm/boots-on-ground-gallery-2","pm/boots-on-ground-gallery-3"],
  },
  "maintenance-coordination": {
    hero:    "pm/maintenance-coord-hero",
    inline:  "pm/maintenance-coord-inline",
    gallery: ["pm/maintenance-coord-gallery-1","pm/maintenance-coord-gallery-2","pm/maintenance-coord-gallery-3"],
  },
  "renovation-remodel": {
    hero:    "interiors/renovation-hero",
    inline:  "interiors/renovation-inline",
    gallery: ["interiors/renovation-gallery-1","interiors/renovation-gallery-2","interiors/renovation-gallery-3"],
  },
  "framing-finishes": {
    hero:    "interiors/framing-hero",
    inline:  "interiors/framing-inline",
    gallery: ["interiors/framing-gallery-1","interiors/framing-gallery-2","interiors/framing-gallery-3"],
  },
  "kitchen-bath-more": {
    hero:    "interiors/kitchen-bath-hero",
    inline:  "interiors/kitchen-bath-inline",
    gallery: ["interiors/kitchen-bath-gallery-1","interiors/kitchen-bath-gallery-2","interiors/kitchen-bath-gallery-3"],
  },
  "basement-finishing": {
    hero:    "interiors/basement-hero",
    inline:  "interiors/basement-inline",
    gallery: ["interiors/basement-gallery-1","interiors/basement-gallery-2","interiors/basement-gallery-3"],
  },
  "additions-expansions": {
    hero:    "interiors/additions-hero",
    inline:  "interiors/additions-inline",
    gallery: ["interiors/additions-gallery-1","interiors/additions-gallery-2","interiors/additions-gallery-3"],
  },
  "investment-property-rehab": {
    hero:    "interiors/investment-rehab-hero",
    inline:  "interiors/investment-rehab-inline",
    gallery: ["interiors/investment-rehab-gallery-1","interiors/investment-rehab-gallery-2","interiors/investment-rehab-gallery-3"],
  },
  "flooring-tile": {
    hero:    "interiors/flooring-tile-hero",
    inline:  "interiors/flooring-tile-inline",
    gallery: ["interiors/flooring-tile-gallery-1","interiors/flooring-tile-gallery-2","interiors/flooring-tile-gallery-3"],
  },
  "landscape-design-install": {
    hero:    "outdoor/landscape-hero",
    inline:  "outdoor/landscape-inline",
    gallery: ["outdoor/landscape-gallery-1","outdoor/landscape-gallery-2","outdoor/landscape-gallery-3"],
  },
  "decks-pergolas-patios": {
    hero:    "outdoor/decks-hero",
    inline:  "outdoor/decks-inline",
    gallery: ["outdoor/decks-gallery-1","outdoor/decks-gallery-2","outdoor/decks-gallery-3"],
  },
  "custom-water-features": {
    hero:    "outdoor/water-features-hero",
    inline:  "outdoor/water-features-inline",
    gallery: ["outdoor/water-features-gallery-1","outdoor/water-features-gallery-2","outdoor/water-features-gallery-3"],
  },
  "fencing": {
    hero:    "outdoor/fencing-hero",
    inline:  "outdoor/fencing-inline",
    gallery: ["outdoor/fencing-gallery-1","outdoor/fencing-gallery-2","outdoor/fencing-gallery-3"],
  },
  "grounds-maintenance": {
    hero:    "outdoor/grounds-hero",
    inline:  "outdoor/grounds-inline",
    gallery: ["outdoor/grounds-gallery-1","outdoor/grounds-gallery-2","outdoor/grounds-gallery-3"],
  },
  "industrial-maintenance": {
    hero:    "outdoor/industrial-hero",
    inline:  "outdoor/industrial-inline",
    gallery: ["outdoor/industrial-gallery-1","outdoor/industrial-gallery-2","outdoor/industrial-gallery-3"],
  },
  "power-window-washing": {
    hero:    "outdoor/pressure-wash-hero",
    inline:  "outdoor/pressure-wash-inline",
    gallery: ["outdoor/pressure-wash-gallery-1","outdoor/pressure-wash-gallery-2","outdoor/pressure-wash-gallery-3"],
  },
  "junk-haul-off": {
    hero:    "outdoor/junk-hero",
    inline:  "outdoor/junk-inline",
    gallery: ["outdoor/junk-gallery-1","outdoor/junk-gallery-2","outdoor/junk-gallery-3"],
  },
  "housekeeping-cleaning": {
    hero:    "concierge/housekeeping-hero",
    inline:  "concierge/housekeeping-inline",
    gallery: ["concierge/housekeeping-gallery-1","concierge/housekeeping-gallery-2","concierge/housekeeping-gallery-3"],
  },
  "home-safety-checks": {
    hero:    "concierge/home-safety-hero",
    inline:  "concierge/home-safety-inline",
    gallery: ["concierge/home-safety-gallery-1","concierge/home-safety-gallery-2","concierge/home-safety-gallery-3"],
  },
  "mobile-auto-detailing": {
    hero:    "concierge/auto-detail-hero",
    inline:  "concierge/auto-detail-inline",
    gallery: ["concierge/auto-detail-gallery-1","concierge/auto-detail-gallery-2","concierge/auto-detail-gallery-3"],
  },
  "poop-scooping": {
    hero:    "concierge/pet-waste-hero",
    inline:  "concierge/pet-waste-inline",
    gallery: ["concierge/pet-waste-gallery-1","concierge/pet-waste-gallery-2","concierge/pet-waste-gallery-3"],
  },
  "errand-services": {
    hero:    "concierge/errands-hero",
    inline:  "concierge/errands-inline",
    gallery: ["concierge/errands-gallery-1","concierge/errands-gallery-2","concierge/errands-gallery-3"],
  },
  // "hoa-commercial-property" — no image slots defined in image-source.ts; skipped
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Download a URL to a Buffer using the built-in fetch */
async function downloadBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

/** Download, resize, and write an image to disk */
async function downloadAndResize(
  downloadUrl: string,
  localPath:   string,
  sizeType:    string,
): Promise<void> {
  const destPath = path.join("public", localPath);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  const buf      = await downloadBuffer(downloadUrl);
  const width    = WIDTHS[sizeType] ?? 1200;

  await sharp(buf)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(destPath);
}

// ── Phase 2: Patch services-data.ts ──────────────────────────────────────────

/**
 * Replaces photo IDs within a specific service's block of text.
 * Works by finding the service block between its slug marker and
 * the next slug marker (or end of array).
 */
function patchServicesData(
  fileText:  string,
  slug:      string,
  heroPath:  string | null,
  inlinePath: string | null,
  galleryPaths: Array<string | null>,
): string {
  // Locate this service's block. slugs use either 4 or 5 spaces of indent.
  const slugPattern = new RegExp(`slug:\\s*"${escapeRegex(slug)}"`, "g");
  const slugMatch   = slugPattern.exec(fileText);
  if (!slugMatch) {
    console.warn(`  ⚠ Could not locate slug "${slug}" in services-data.ts — skipping`);
    return fileText;
  }

  const blockStart = slugMatch.index;
  // Find next slug to bound the block; fall back to end-of-array bracket
  const nextSlugIdx = fileText.indexOf("slug:", blockStart + slugMatch[0].length);
  const blockEnd    = nextSlugIdx === -1 ? fileText.length : nextSlugIdx;

  let block = fileText.slice(blockStart, blockEnd);

  // ── Replace heroImage ───────────────────────────────────────────
  if (heroPath) {
    const prev = block;
    block = block.replace(/heroImage:\s*"[^"]*"/, `heroImage:       "${heroPath}"`);
    if (block === prev) console.warn(`  ⚠ heroImage not found in block for "${slug}"`);
  }

  // ── Replace overviewImage ───────────────────────────────────────
  if (inlinePath) {
    const prev = block;
    block = block.replace(/overviewImage:\s*"[^"]*"/, `overviewImage: "${inlinePath}"`);
    if (block === prev) console.warn(`  ⚠ overviewImage not found in block for "${slug}"`);
  }

  // ── Replace gallery IDs positionally ───────────────────────────
  // Gallery entries look like: { id: "PHOTO_ID",
  // We replace the Nth occurrence within this block.
  for (let gi = 0; gi < galleryPaths.length; gi++) {
    const gPath = galleryPaths[gi];
    if (!gPath) continue;
    let count = 0;
    const target = gi;
    block = block.replace(/\{ id: "[^"]*",/g, (match) => {
      if (count === target) {
        count++;
        return `{ id: "${gPath}",`;
      }
      count++;
      return match;
    });
  }

  return fileText.slice(0, blockStart) + block + fileText.slice(blockEnd);
}

// ── Phase 3: Patch component files ───────────────────────────────────────────

function patchComponentFiles(): void {
  // ── ServiceHero.tsx ─────────────────────────────────────────────
  const heroPath = path.join("components", "sections", "ServiceHero.tsx");
  let heroText   = fs.readFileSync(heroPath, "utf-8");

  // Replace the Unsplash template literal src with direct {heroImage}
  const heroOld = "src={`https://images.unsplash.com/photo-${heroImage}?auto=format&fit=crop&w=1600&q=80`}";
  const heroNew = "src={heroImage}";
  if (heroText.includes(heroOld)) {
    heroText = heroText.replace(heroOld, heroNew);
    // Also update the prop comment
    heroText = heroText.replace(
      "heroImage: string; // Unsplash photo ID",
      "heroImage: string; // local image path (e.g. /images/services/advisory/buyer-rep-hero.jpg)",
    );
    fs.writeFileSync(heroPath, heroText, "utf-8");
    console.log("  ✅  Patched ServiceHero.tsx");
  } else if (!heroText.includes(heroNew)) {
    console.warn("  ⚠ ServiceHero.tsx: expected Unsplash template not found (already patched?)");
  } else {
    console.log("  ⟳  ServiceHero.tsx already patched");
  }

  // ── ServiceOverview.tsx ─────────────────────────────────────────
  const ovPath = path.join("components", "sections", "ServiceOverview.tsx");
  let ovText   = fs.readFileSync(ovPath, "utf-8");

  const ovOld = "src={`https://images.unsplash.com/photo-${overviewImage}?auto=format&fit=crop&w=900&q=80`}";
  const ovNew = "src={overviewImage}";
  if (ovText.includes(ovOld)) {
    ovText = ovText.replace(ovOld, ovNew);
    ovText = ovText.replace(
      "overviewImage: string; // Unsplash photo ID",
      "overviewImage: string; // local image path",
    );
    fs.writeFileSync(ovPath, ovText, "utf-8");
    console.log("  ✅  Patched ServiceOverview.tsx");
  } else if (!ovText.includes(ovNew)) {
    console.warn("  ⚠ ServiceOverview.tsx: expected Unsplash template not found");
  } else {
    console.log("  ⟳  ServiceOverview.tsx already patched");
  }

  // ── ServiceGallery.tsx ──────────────────────────────────────────
  const galPath = path.join("components", "sections", "ServiceGallery.tsx");
  let galText   = fs.readFileSync(galPath, "utf-8");

  const galOld = "src={`https://images.unsplash.com/photo-${img.id}?auto=format&fit=crop&w=800&q=80`}";
  const galNew = "src={img.id}";
  if (galText.includes(galOld)) {
    galText = galText.replace(galOld, galNew);
    galText = galText.replace(
      "id:  string; // Unsplash photo ID",
      "id:  string; // local image path",
    );
    fs.writeFileSync(galPath, galText, "utf-8");
    console.log("  ✅  Patched ServiceGallery.tsx");
  } else if (!galText.includes(galNew)) {
    console.warn("  ⚠ ServiceGallery.tsx: expected Unsplash template not found");
  } else {
    console.log("  ⟳  ServiceGallery.tsx already patched");
  }
}

// ── Phase 4: Update Prisma university coverImages ─────────────────────────────

async function patchPrismaUniversity(
  selections: Record<string, SelectionEntry>,
): Promise<void> {
  const uniEntries = Object.entries(selections).filter(([id]) =>
    id.startsWith("university/"),
  );
  if (!uniEntries.length) {
    console.log("  (no university slots in selections)");
    return;
  }

  let prismaClient: any;
  try {
    const mod     = await import("../lib/prisma");
    prismaClient  = mod.prisma;
  } catch (e) {
    console.warn(`  ⚠ Could not import Prisma — university updates skipped: ${e}`);
    return;
  }

  let updated = 0;
  for (const [slotId, sel] of uniEntries) {
    if (sel.rank === "REJECT" || !sel.downloadUrl) continue;
    const slug      = slotId.replace("university/", "");
    const newPath   = `/${sel.localPath}`;
    try {
      const result = await prismaClient.universityArticle.updateMany({
        where: { slug },
        data:  { coverImage: newPath },
      });
      if (result.count > 0) {
        updated++;
        console.log(`  ✅  ${slotId} → ${newPath}`);
      } else {
        console.warn(`  ⚠ No article found with slug "${slug}"`);
      }
    } catch (e) {
      console.warn(`  ⚠ Could not update article "${slug}": ${e}`);
    }
  }

  await prismaClient.$disconnect().catch(() => {});
  console.log(`  Updated ${updated} university article(s).`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n── Forge Point Image Apply v2 ──────────────────────────────");

  // ── Read selections ───────────────────────────────────────────────────────
  if (!fs.existsSync(SELECTIONS_FILE)) {
    console.error(`\n❌  ${SELECTIONS_FILE} not found.`);
    console.error("    Run images:source, review the HTML, export selections,");
    console.error("    and place the file at scripts/.image-selections.json\n");
    process.exit(1);
  }

  const selFile = JSON.parse(
    fs.readFileSync(SELECTIONS_FILE, "utf-8"),
  ) as SelectionsFile;
  const selections = selFile.selections;

  const allSlots    = Object.keys(selections).length;
  const approved    = Object.values(selections).filter(s => s.rank !== "REJECT" && s.downloadUrl).length;
  const rejected    = Object.values(selections).filter(s => s.rank === "REJECT").length;
  const unreviewed  = (selFile.totalSlots ?? 0) - allSlots;

  console.log(`   Exported    : ${selFile.exportedAt}`);
  console.log(`   Total slots : ${selFile.totalSlots ?? "?"}`);
  console.log(`   Approved    : ${approved}`);
  console.log(`   Rejected    : ${rejected}`);
  console.log(`   Unreviewed  : ${unreviewed}`);

  if (unreviewed > 0) {
    console.warn(`\n⚠  ${unreviewed} slot(s) were never reviewed. Run images:source to fill them in.`);
  }

  console.log("\n────────────────────────────────────────────────────────────\n");

  // ── Phase 1: Download + resize ────────────────────────────────────────────
  console.log("Phase 1 — Downloading & resizing images…\n");

  let downloaded = 0;
  let skipped    = 0;
  let failed     = 0;

  for (const [slotId, sel] of Object.entries(selections)) {
    if (sel.rank === "REJECT" || !sel.downloadUrl) {
      skipped++;
      continue;
    }

    const destPath = path.join("public", sel.localPath);

    // Skip if already downloaded (idempotent)
    if (fs.existsSync(destPath)) {
      process.stdout.write(`  ⟳ already exists — ${sel.localPath}\n`);
      skipped++;
      continue;
    }

    process.stdout.write(`  ↓ [${downloaded + 1}/${approved}] ${slotId}…\n`);
    try {
      await downloadAndResize(sel.downloadUrl, sel.localPath, sel.sizeType);
      downloaded++;
    } catch (e) {
      console.error(`  ✗ FAILED ${slotId}: ${e}`);
      failed++;
    }
  }

  console.log(`\n  Downloaded: ${downloaded}  Skipped/existing: ${skipped}  Failed: ${failed}\n`);

  if (failed > 0) {
    console.error(`❌  ${failed} download(s) failed. Fix errors above before patching code.\n`);
    process.exit(1);
  }

  // ── Phase 2: Patch services-data.ts ──────────────────────────────────────
  console.log("Phase 2 — Patching lib/services-data.ts…\n");

  const sdFilePath = path.join("lib", "services-data.ts");
  let sdText       = fs.readFileSync(sdFilePath, "utf-8");

  // Update header comment
  sdText = sdText.replace(
    "// One entry per service page. Photos are Unsplash IDs.",
    "// One entry per service page. Photos are local paths under public/ (e.g. /images/services/…).",
  );
  sdText = sdText.replace(
    "// Swap photos from the admin Unsplash panel (Step 11).",
    "// Images were migrated from Unsplash to local files by image-apply.ts.",
  );

  // Update interface comment for heroImage, overviewImage, gallery id
  sdText = sdText.replace(
    "heroImage:         string;     // Unsplash photo ID",
    "heroImage:         string;     // local image path (from public/)",
  );
  sdText = sdText.replace(
    "overviewImage:     string;     // Unsplash photo ID",
    "overviewImage:     string;     // local image path (from public/)",
  );
  sdText = sdText.replace(
    "id:  string; // Unsplash photo ID",
    "id:  string; // local image path (from public/)",
  );

  let sdPatched = 0;
  let sdMissed  = 0;

  for (const svc of SERVICES_DATA) {
    const mapping = SLUG_TO_SLOTS[svc.slug];
    if (!mapping) {
      console.log(`  — No slot mapping for "${svc.slug}" (skipped)`);
      continue;
    }

    const heroSel    = selections[mapping.hero];
    const inlineSel  = selections[mapping.inline];
    const galSels    = mapping.gallery.map(id => selections[id] ?? null);

    const heroPath   = (heroSel?.rank   !== "REJECT" && heroSel?.downloadUrl)
                       ? `/${heroSel.localPath}`   : null;
    const inlinePath = (inlineSel?.rank !== "REJECT" && inlineSel?.downloadUrl)
                       ? `/${inlineSel.localPath}` : null;
    const galPaths   = galSels.map(s =>
      (s && s.rank !== "REJECT" && s.downloadUrl) ? `/${s.localPath}` : null,
    );

    const before = sdText;
    sdText = patchServicesData(sdText, svc.slug, heroPath, inlinePath, galPaths);
    if (sdText !== before) {
      sdPatched++;
      console.log(`  ✅  ${svc.slug}`);
    } else {
      sdMissed++;
    }
  }

  fs.writeFileSync(sdFilePath, sdText, "utf-8");
  console.log(`\n  Patched: ${sdPatched}  Unchanged/missing: ${sdMissed}\n`);

  // ── Phase 3: Patch component files ───────────────────────────────────────
  console.log("Phase 3 — Patching service image components…\n");
  patchComponentFiles();

  // ── Phase 4: Prisma university articles ──────────────────────────────────
  console.log("\nPhase 4 — Updating university article coverImages in Prisma…\n");
  await patchPrismaUniversity(selections);

  // ── Phase 5: Build verification ───────────────────────────────────────────
  console.log("\nPhase 5 — Running npm run build to verify…\n");
  try {
    execSync("npm run build", { stdio: "inherit" });
    console.log("\n✅  Build passed.\n");
  } catch {
    console.error("\n❌  Build FAILED. Review the errors above.\n");
    console.error("   The code patches and downloaded images are already written to disk.");
    console.error("   Fix any TypeScript/Next.js errors, then re-run `npm run build`.\n");
    process.exit(1);
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log("====================================================");
  console.log("Image Apply Complete.");
  console.log(`  Images downloaded : ${downloaded}`);
  console.log(`  Services patched  : ${sdPatched}`);
  console.log(`  Build             : PASSED`);
  console.log("");
  console.log("Remaining manual steps:");
  console.log("  • Update public/images in ServicesSection.tsx (homepage cards)");
  console.log("  • Update homepage hero image if referenced outside services-data.ts");
  console.log("  • Run: git add public/images lib/services-data.ts components/sections/Service*.tsx");
  console.log("  • git commit -m \"feat: migrate service images to local files\"");
  console.log("====================================================\n");
}

main().catch(err => {
  console.error("\n❌  Unexpected error:", err);
  process.exit(1);
});
