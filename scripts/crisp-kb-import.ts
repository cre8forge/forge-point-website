#!/usr/bin/env tsx
/**
 * scripts/crisp-kb-import.ts
 *
 * Pushes Forge Point site content to the Crisp Helpdesk Knowledge Base
 * at help.cre8forge.com.  Content is sourced directly from the Next.js
 * codebase — no separate CMS, no manual copy-paste.
 *
 * Usage (via npm scripts):
 *   npm run kb:import   — sync changed articles only
 *   npm run kb:dry      — dry run: print what would happen, make no API calls
 *   npm run kb:force    — force-update all articles regardless of content hash
 *
 * Requires in .env.local:
 *   CRISP_WEBSITE_ID   — your Crisp website ID
 *   CRISP_PLUGIN_ID    — plugin URN / identifier
 *   CRISP_PLUGIN_KEY   — plugin secret key
 */

import path   from "path";
import fs     from "fs";
import crypto from "crypto";
import dotenv from "dotenv";
import fg     from "fast-glob";

// Dynamic imports for local lib files (avoids Next.js module resolution issues)
import { SERVICES_DATA } from "../lib/services-data";
import { FAQ_CATEGORIES } from "../lib/faq-data";

// ─── Bootstrap ────────────────────────────────────────────────────────────────

const ROOT = process.cwd();
dotenv.config({ path: path.join(ROOT, ".env.local") });

const DRY   = process.argv.includes("--dry");
const FORCE = process.argv.includes("--force");

if (DRY)   console.log("🔍  DRY RUN — no API calls will be made\n");
if (FORCE) console.log("⚡  FORCE — all articles will be re-synced\n");

// ─── Env validation ───────────────────────────────────────────────────────────

const WEBSITE_ID = process.env.CRISP_WEBSITE_ID ?? "";
const PLUGIN_ID  = process.env.CRISP_PLUGIN_ID  ?? "";
const PLUGIN_KEY = process.env.CRISP_PLUGIN_KEY  ?? "";

if (!WEBSITE_ID || !PLUGIN_ID || !PLUGIN_KEY) {
  console.error(
    "❌  Missing environment variables.\n" +
    "    Add CRISP_WEBSITE_ID, CRISP_PLUGIN_ID, and CRISP_PLUGIN_KEY to .env.local"
  );
  process.exit(1);
}

// ─── Crisp API client ─────────────────────────────────────────────────────────

const BASE   = "https://api.crisp.chat/v1";
const LOCALE = "en";
const BASIC  = Buffer.from(`${PLUGIN_ID}:${PLUGIN_KEY}`).toString("base64");

async function crisp<T = Record<string, unknown>>(
  method:   string,
  endpoint: string,
  body?:    unknown,
): Promise<T> {
  const url = `${BASE}${endpoint}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization:  `Basic ${BASIC}`,
      "X-Crisp-Tier": "plugin",
      "Content-Type": "application/json",
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "(no body)");
    throw new Error(`Crisp ${method} ${endpoint} → HTTP ${res.status}\n${text}`);
  }

  const json = (await res.json()) as { data: T };
  return json.data;
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

// 200 ms between every API call ≈ 5 req/s, well within Crisp rate limits
const THROTTLE = 200;

// ─── Manifest ─────────────────────────────────────────────────────────────────
// The manifest is a local JSON file that tracks:
//   - Crisp IDs of categories and sections we've already created
//   - SHA-256 hashes of each article so we only push changes

const MANIFEST_PATH = path.join(ROOT, "scripts", ".crisp-kb-manifest.json");

interface ManifestEntry {
  id:   string;
  hash: string;
}

interface Manifest {
  categories: Record<string, string>;          // displayName → crisp category_id
  sections:   Record<string, string>;          // "KBCat::SectionName" → crisp section_id
  articles:   Record<string, ManifestEntry>;   // article_key → { id, hash }
}

function loadManifest(): Manifest {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as Manifest;
  } catch {
    return { categories: {}, sections: {}, articles: {} };
  }
}

function saveManifest(m: Manifest): void {
  if (!DRY) {
    fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(m, null, 2) + "\n");
  }
}

function sha256(s: string): string {
  return crypto.createHash("sha256").update(s, "utf8").digest("hex");
}

// ─── KB structure definition ──────────────────────────────────────────────────

type KBCat =
  | "Forge Point Advisory"
  | "Property & Portfolio Management"
  | "Custom Interiors"
  | "Outdoor Living & Grounds"
  | "Concierge & Estate Services"
  | "University"
  | "Company & FAQ";

// Order matters — Crisp displays categories in creation order
const KB_CATS: KBCat[] = [
  "Forge Point Advisory",
  "Property & Portfolio Management",
  "Custom Interiors",
  "Outdoor Living & Grounds",
  "Concierge & Estate Services",
  "University",
  "Company & FAQ",
];

// Map service.category field → KB category
const SVC_TO_KB: Record<string, KBCat> = {
  "Advisory":          "Forge Point Advisory",
  "Management":        "Property & Portfolio Management",
  "HOA":               "Property & Portfolio Management",
  "Custom Living":     "Custom Interiors",
  "Landscaping":       "Outdoor Living & Grounds",
  "Grounds":           "Outdoor Living & Grounds",
  "Fencing":           "Outdoor Living & Grounds",
  "Washing":           "Outdoor Living & Grounds",
  "Industrial":        "Outdoor Living & Grounds",
  "Outdoor Living":    "Outdoor Living & Grounds",
  "Grounds & Estates": "Outdoor Living & Grounds",
  "Domestic Services": "Concierge & Estate Services",
};

// Map university categorySlug → KB section name
// (sections are only created when a category has >1 article)
const UNIV_SECTIONS: Record<string, string> = {
  "investment-strategy":  "Investment Strategy",
  "property-management":  "Property Management",
  "lawn-turf":            "Lawn & Turf",
  "colorado-living":      "Colorado Living",
  "outdoor-structures":   "Outdoor Structures",
  "outdoor-living":       "Outdoor Living",
  "renovation-rehab":     "Renovation & Rehab",
  "property-maintenance": "Property Maintenance",
};

// ─── Article shape ────────────────────────────────────────────────────────────

interface KBArticle {
  key:         string;    // stable unique key, used as manifest key
  title:       string;
  description: string;    // subtitle / excerpt shown in KB listing
  content:     string;    // markdown body
  category:    KBCat;
  section?:    string;    // section name within the KB category (optional)
}

// ─── Content builders ─────────────────────────────────────────────────────────

/** One KB article per service page. */
function buildServiceArticles(): KBArticle[] {
  return SERVICES_DATA.map(svc => {
    const cat = SVC_TO_KB[svc.category];
    if (!cat) {
      throw new Error(`Unknown service category: "${svc.category}" on service slug "${svc.slug}"`);
    }

    const lines: string[] = [];

    // Lead with the tagline
    lines.push(`_${svc.tagline}_`, "");

    // Overview section
    lines.push(`## ${svc.overviewHeading}`, "");
    for (const para of svc.overviewBody) {
      lines.push(para, "");
    }

    // What's included
    lines.push("## What's Included", "");
    for (const item of svc.includes) {
      lines.push(`**${item.title}**`, item.description, "");
    }

    // Pull quote
    if (svc.pullQuote) {
      lines.push(`> ${svc.pullQuote}`, "");
    }

    // CTA panel
    if (svc.ctaPanel) {
      lines.push(
        `## ${svc.ctaPanel.heading}`,
        "",
        svc.ctaPanel.body,
        "",
        `[${svc.ctaPanel.ctaLabel}](https://forgepointproperties.com${svc.ctaPanel.ctaHref})`,
        "",
      );
    }

    // Regulatory disclaimer (Advisory services only)
    if (svc.disclaimer) {
      lines.push("---", "", `_${svc.disclaimer}_`, "");
    }

    // Footer contact CTA
    lines.push(
      "---",
      "",
      "**Get in touch:** [forgepointproperties.com/contact](https://forgepointproperties.com/contact) · **(720) 419-1961**",
    );

    return {
      key:         `service::${svc.slug}`,
      title:       svc.name,
      description: svc.tagline.substring(0, 200),
      content:     lines.join("\n"),
      category:    cat,
    };
  });
}

/** One KB article per FAQ category, containing all Q&As for that category. */
function buildFaqArticles(): KBArticle[] {
  return (FAQ_CATEGORIES as unknown as Array<{ slug: string; label: string; questions: Array<{ question: string; answer: string }> }>).map(cat => {
    const lines: string[] = [];
    for (const q of cat.questions) {
      lines.push(`### ${q.question}`, "", q.answer, "");
    }

    return {
      key:         `faq::${cat.slug}`,
      title:       cat.label,
      description: `Frequently asked questions about ${cat.label.toLowerCase()}.`,
      content:     lines.join("\n").trim(),
      category:    "Company & FAQ" as KBCat,
    };
  });
}

/**
 * One KB article per static university article page.
 * Content is extracted from the CONTENT template literal in each page.tsx.
 * Dynamic routes ([category]/[slug]) are excluded.
 */
function buildUniversityArticles(): KBArticle[] {
  const files = fg.sync("app/university/*/*/page.tsx", {
    cwd:      ROOT,
    absolute: true,
  }).filter(f => !f.includes("["));

  // Count articles per categorySlug to determine whether to use sections
  const catCounts: Record<string, number> = {};
  for (const f of files) {
    const catSlug = f.replace(/\\/g, "/").split("/").slice(-3)[0];
    catCounts[catSlug] = (catCounts[catSlug] ?? 0) + 1;
  }

  const articles: KBArticle[] = [];

  for (const f of files) {
    const segments  = f.replace(/\\/g, "/").split("/");
    const artSlug   = segments[segments.length - 2];
    const catSlug   = segments[segments.length - 3];
    const src       = fs.readFileSync(f, "utf8");

    // Extract title from Next.js metadata block
    const titleM  = src.match(/title:\s*\n?\s*"([^"]+)"/);
    const rawTitle = titleM?.[1] ?? artSlug.replace(/-/g, " ");
    const title    = rawTitle.replace(/\s*[—–-]+\s*Forge Point University.*$/i, "").trim();

    // Extract description from Next.js metadata block
    const descM  = src.match(/description:\s*\n?\s*"([^"]+)"/);
    const desc   = (descM?.[1] ?? "").replace(/\s*[—–-]+\s*Forge Point University.*$/i, "").trim();

    // Extract the CONTENT backtick template literal
    const contentM = src.match(/const CONTENT\s*=\s*`([\s\S]*?)`;/);
    if (!contentM) {
      console.warn(`  ⚠  No CONTENT constant in ${path.relative(ROOT, f)} — skipped`);
      continue;
    }
    const content = contentM[1].trim();

    // Only use a section if this categorySlug has multiple articles
    const section = catCounts[catSlug] > 1
      ? (UNIV_SECTIONS[catSlug] ?? catSlug)
      : undefined;

    articles.push({
      key:         `university::${catSlug}::${artSlug}`,
      title,
      description: desc,
      content,
      category:    "University",
      section,
    });
  }

  return articles;
}

/** A single "About Forge Point" article placed in Company & FAQ. */
function buildAboutArticle(): KBArticle {
  const content = `\
Forge Point is a property services and advisory company based in Erie, Colorado, serving Northern Colorado and Boulder County.

## Who We Are

Founded by Aaron Dolph — a licensed Colorado Real Estate Broker (License #FA100100755) with 15+ years of Front Range property experience — Forge Point combines licensed real estate brokerage, full-service property management, and a complete property services division under one roof.

## What We Do

**Forge Point Advisory** — Licensed real estate brokerage for buyers, sellers, investors, and commercial clients. We offer Broker's Opinions of Value (BOVs) as a complimentary introductory service, and provide honest market analysis and transaction representation grounded in real property management experience.

**Property & Portfolio Management** — Residential, commercial, and HOA management delivered by a team with direct field presence. We have managed over 4 million sq ft of commercial and industrial space, and portfolios with up to 115 tenants simultaneously.

**Custom Interiors** — Full renovation services including kitchen and bath remodels, basement finishing, room additions, investment property rehab, framing, and finish carpentry. We self-perform most work and coordinate licensed trades for electrical, plumbing, and HVAC.

**Outdoor Living & Grounds** — Landscape design and installation, grounds maintenance, fencing, power and window washing, deck and pergola construction, custom water features, and property cleanouts.

**Concierge & Estate Services** — Mobile auto detailing, estate housekeeping, home safety and wellness checks, errand services, and pet waste removal. Professional, consistent property care for owners who want everything handled.

## Service Area

Erie (home base) · Longmont · Boulder · Lafayette · Louisville · Broomfield · Firestone · Frederick · Dacono · Windsor · Brighton — and surrounding Northern Colorado and Boulder County communities.

We serve 15+ zip codes across the Front Range. If you're not sure whether your property is in our area, reach out — we may still be able to help.

## Contact

- **Phone:** (720) 419-1961
- **Contact form:** [forgepointproperties.com/contact](https://forgepointproperties.com/contact)
- **Free estimate:** [forgepointproperties.com/estimate](https://forgepointproperties.com/estimate)
- **Free BOV:** [forgepointproperties.com/estimate](https://forgepointproperties.com/estimate)

We respond to all inquiries within one business day.`;

  return {
    key:         "about::forge-point",
    title:       "About Forge Point",
    description: "Who we are, what we do, and where we serve — Northern Colorado property services and advisory.",
    content,
    category:    "Company & FAQ",
  };
}

// ─── Crisp API operations ─────────────────────────────────────────────────────

async function ensureCat(m: Manifest, name: string): Promise<string> {
  if (m.categories[name]) return m.categories[name];

  if (DRY) {
    const id = `dry::cat::${name}`;
    console.log(`  [dry] Would CREATE category: "${name}"`);
    m.categories[name] = id;
    return id;
  }

  console.log(`  Creating category: "${name}"...`);
  const res = await crisp<{ category_id?: string }>(
    "POST",
    `/website/${WEBSITE_ID}/helpdesk/locale/${LOCALE}/category`,
    { name, description: "" },
  );
  await sleep(THROTTLE);

  const id = res.category_id;
  if (!id) throw new Error(`No category_id in response: ${JSON.stringify(res)}`);
  m.categories[name] = id;
  return id;
}

async function ensureSec(
  m:       Manifest,
  catId:   string,
  catName: string,
  secName: string,
): Promise<string> {
  const key = `${catName}::${secName}`;
  if (m.sections[key]) return m.sections[key];

  if (DRY) {
    const id = `dry::sec::${key}`;
    console.log(`  [dry] Would CREATE section: "${secName}" in "${catName}"`);
    m.sections[key] = id;
    return id;
  }

  console.log(`  Creating section: "${secName}" in "${catName}"...`);
  const res = await crisp<{ section_id?: string }>(
    "POST",
    `/website/${WEBSITE_ID}/helpdesk/locale/${LOCALE}/category/${catId}/section`,
    { name: secName },
  );
  await sleep(THROTTLE);

  const id = res.section_id;
  if (!id) throw new Error(`No section_id in response: ${JSON.stringify(res)}`);
  m.sections[key] = id;
  return id;
}

/**
 * Sets the article body and publishes it.
 * Used for both newly created articles and updates.
 */
async function publishContent(
  articleId:   string,
  title:       string,
  description: string,
  content:     string,
): Promise<void> {
  // PUT replaces the article body (markdown)
  await crisp(
    "PUT",
    `/website/${WEBSITE_ID}/helpdesk/locale/${LOCALE}/article/${articleId}`,
    { content },
  );
  await sleep(THROTTLE);

  // PATCH updates metadata and status
  await crisp(
    "PATCH",
    `/website/${WEBSITE_ID}/helpdesk/locale/${LOCALE}/article/${articleId}`,
    { title, description, status: "published" },
  );
  await sleep(THROTTLE);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const manifest = loadManifest();

  // ── Build all article objects ────────────────────────────────────────────────
  console.log("📦  Building article content...");
  let articles: KBArticle[];
  try {
    articles = [
      ...buildServiceArticles(),
      ...buildFaqArticles(),
      ...buildUniversityArticles(),
      buildAboutArticle(),
    ];
  } catch (err) {
    console.error("❌  Error building content:", (err as Error).message);
    process.exit(1);
  }
  console.log(`    ${articles.length} articles prepared.\n`);

  // ── Pre-create KB categories (in display order) ──────────────────────────────
  console.log("🗂   Ensuring KB categories exist...");
  for (const name of KB_CATS) {
    if (!manifest.categories[name]) {
      await ensureCat(manifest, name);
      saveManifest(manifest);
    } else if (DRY) {
      console.log(`  [dry] Category already exists: "${name}"`);
    }
  }
  console.log("    Categories ready.\n");

  // ── Sync articles ────────────────────────────────────────────────────────────
  let created = 0, updated = 0, skipped = 0, errors = 0;

  for (const art of articles) {
    const hash    = sha256(`${art.title}\n${art.description}\n${art.content}`);
    const prev    = manifest.articles[art.key];
    const changed = !prev || prev.hash !== hash;

    if (!changed && !FORCE) {
      skipped++;
      continue;
    }

    const action   = prev ? "UPDATE" : "CREATE";
    const locLabel = art.section
      ? `"${art.category}" / "${art.section}"`
      : `"${art.category}"`;

    try {
      // Ensure category + section IDs are available
      const catId = await ensureCat(manifest, art.category);
      const secId = art.section
        ? await ensureSec(manifest, catId, art.category, art.section)
        : undefined;

      if (DRY) {
        console.log(`  [dry] ${action}: "${art.title}"  →  ${locLabel}`);
        manifest.articles[art.key] = { id: prev?.id ?? `dry::art::${art.key}`, hash };
        action === "CREATE" ? created++ : updated++;
        continue;
      }

      if (prev) {
        // ── Update existing article ──────────────────────────────────────────
        console.log(`  ↺  Updating  "${art.title}"...`);
        await publishContent(prev.id, art.title, art.description, art.content);
        manifest.articles[art.key] = { id: prev.id, hash };
        updated++;
      } else {
        // ── Create new article ───────────────────────────────────────────────
        console.log(`  +  Creating  "${art.title}"  →  ${locLabel}...`);

        const createBody: Record<string, unknown> = {
          title:       art.title,
          description: art.description,
          category_id: catId,
        };
        if (secId) createBody.section_id = secId;

        const res = await crisp<{ article_id?: string }>(
          "POST",
          `/website/${WEBSITE_ID}/helpdesk/locale/${LOCALE}/article`,
          createBody,
        );
        await sleep(THROTTLE);

        const artId = res.article_id;
        if (!artId) throw new Error(`No article_id in response: ${JSON.stringify(res)}`);

        await publishContent(artId, art.title, art.description, art.content);
        manifest.articles[art.key] = { id: artId, hash };
        created++;
      }

      saveManifest(manifest);
    } catch (err) {
      console.error(`  ❌  Error on "${art.title}": ${(err as Error).message}`);
      errors++;
    }
  }

  // ── Summary ──────────────────────────────────────────────────────────────────
  console.log(`
✅  Sync complete
    Created  ${created}
    Updated  ${updated}
    Skipped  ${skipped}
    Errors   ${errors}
`);

  if (errors > 0) process.exit(1);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
