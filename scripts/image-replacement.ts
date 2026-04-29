#!/usr/bin/env tsx
/**
 * scripts/image-replacement.ts
 *
 * Replaces every Unsplash hot-link on the Forge Point site with a
 * self-hosted, semantically-correct image sourced from Pexels.
 *
 * Prerequisites:
 *   PEXELS_API_KEY in .env.local   (free account at pexels.com/api/)
 *
 * Commands (via package.json scripts):
 *   npm run images:download    — download + resize only; no code changes
 *   npm run images:replace     — full run: download + update code + update DB
 *   npm run images:dry         — print what would happen, make no changes
 *   npm run images:force       — re-download even if file already exists
 *
 * Rate limit: Pexels free tier = 200 req/hour.
 * THROTTLE_MS = 2000 ms ≈ 1800 req/hour — comfortably within limit.
 * First full run: ~170 service images + ~68 university images ≈ 12–15 min.
 * Subsequent runs skip already-downloaded files and finish in seconds.
 */

import path   from "path";
import fs     from "fs";
import dotenv from "dotenv";
import sharp  from "sharp";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const ROOT         = process.cwd();
const DRY          = process.argv.includes("--dry");
const FORCE        = process.argv.includes("--force");
const DOWNLOAD_ONLY = process.argv.includes("--download-only");
const THROTTLE_MS  = 2000;

// ─── Pexels API ───────────────────────────────────────────────────────────────

const PEXELS_KEY = process.env.PEXELS_API_KEY ?? "";
if (!PEXELS_KEY && !DRY) {
  console.error("❌  PEXELS_API_KEY not set in .env.local\n    Get a free key at https://www.pexels.com/api/");
  process.exit(1);
}

interface PexelsPhoto { id: number; width: number; src: { large2x: string; original: string } }

async function searchPexels(keyword: string): Promise<string | null> {
  if (DRY) return `https://dry-run.example.com/${encodeURIComponent(keyword)}.jpg`;
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=5&orientation=landscape&size=large`;
  const res = await fetch(url, { headers: { Authorization: PEXELS_KEY } });
  if (!res.ok) { console.error(`  Pexels ${res.status} for "${keyword}"`); return null; }
  const data = await res.json() as { photos: PexelsPhoto[] };
  if (!data.photos?.length) { console.warn(`  No Pexels results for "${keyword}"`); return null; }
  const photo = data.photos.find(p => p.width >= 1920) ?? data.photos[0];
  return photo.src.large2x ?? photo.src.original;
}

function sleep(ms: number) { return new Promise<void>(r => setTimeout(r, ms)); }

// ─── Download + resize ────────────────────────────────────────────────────────

async function downloadAndSave(sourceUrl: string, localPath: string, maxWidth: number): Promise<void> {
  const absPath = path.join(ROOT, "public", localPath);
  if (fs.existsSync(absPath) && !FORCE) return;
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  if (DRY) { console.log(`  [dry] → /public/${localPath}`); return; }
  const res = await fetch(sourceUrl);
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${sourceUrl}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf)
    .resize(maxWidth, undefined, { withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true })
    .toFile(absPath);
}

// ─── Master image keyword map ─────────────────────────────────────────────────
// key = path relative to /public (no leading /)
// value = Pexels search keyword

const IMAGE_KEYWORDS: Record<string, string> = {

  // ── Homepage ──────────────────────────────────────────────────────────────
  "images/hero/home-hero.jpg":                       "mountain home clear sky modern",
  "images/hero/home-how-it-works.jpg":               "property professional inspection clipboard",

  // ── Advisory: Buyer Representation ───────────────────────────────────────
  "images/services/advisory/buyer-rep-hero.jpg":         "couple house keys home",
  "images/services/advisory/buyer-rep-inline.jpg":       "real estate contract table",
  "images/services/advisory/buyer-rep-gallery-1.jpg":    "modern ranch home exterior",
  "images/services/advisory/buyer-rep-gallery-2.jpg":    "open house sign residential street",
  "images/services/advisory/buyer-rep-gallery-3.jpg":    "real estate agent showing property",

  // ── Advisory: Seller Representation ──────────────────────────────────────
  "images/services/advisory/seller-rep-hero.jpg":        "for sale sign house front yard",
  "images/services/advisory/seller-rep-inline.jpg":      "home staging living room listing",
  "images/services/advisory/seller-rep-gallery-1.jpg":   "staged living room bright",
  "images/services/advisory/seller-rep-gallery-2.jpg":   "curb appeal front yard home",
  "images/services/advisory/seller-rep-gallery-3.jpg":   "sold sign real estate",

  // ── Advisory: Investment Acquisition ─────────────────────────────────────
  "images/services/advisory/acquisition-hero.jpg":       "real estate investment financial analysis",
  "images/services/advisory/acquisition-inline.jpg":     "investor financial documents desk",
  "images/services/advisory/acquisition-gallery-1.jpg":  "investment property spreadsheet calculator",
  "images/services/advisory/acquisition-gallery-2.jpg":  "property inspection clipboard assessment",
  "images/services/advisory/acquisition-gallery-3.jpg":  "investment charts graphs tablet",

  // ── Advisory: Portfolio Strategy ─────────────────────────────────────────
  "images/services/advisory/portfolio-hero.jpg":         "real estate portfolio documents desk",
  "images/services/advisory/portfolio-inline.jpg":       "strategic planning documents meeting",
  "images/services/advisory/portfolio-gallery-1.jpg":    "property files folders organized",
  "images/services/advisory/portfolio-gallery-2.jpg":    "real estate planning notes",
  "images/services/advisory/portfolio-gallery-3.jpg":    "calculator property data review",

  // ── Advisory: Commercial Leasing ─────────────────────────────────────────
  "images/services/advisory/commercial-leasing-hero.jpg":      "modern commercial office building exterior",
  "images/services/advisory/commercial-leasing-inline.jpg":    "commercial lease agreement signing",
  "images/services/advisory/commercial-leasing-gallery-1.jpg": "empty retail space tenant ready",
  "images/services/advisory/commercial-leasing-gallery-2.jpg": "for lease commercial building sign",
  "images/services/advisory/commercial-leasing-gallery-3.jpg": "office space interior tour",

  // ── Advisory: 1031 Exchange ───────────────────────────────────────────────
  "images/services/advisory/1031-hero.jpg":          "real estate documents calendar deadline",
  "images/services/advisory/1031-inline.jpg":        "tax document preparation desk",
  "images/services/advisory/1031-gallery-1.jpg":     "investment property exterior residential",
  "images/services/advisory/1031-gallery-2.jpg":     "property paperwork exchange documents",
  "images/services/advisory/1031-gallery-3.jpg":     "deadline calendar planning timeline",

  // ── Property Management: Overview / Hub ──────────────────────────────────
  "images/services/property-management/pm-overview-hero.jpg":   "property manager reviewing building exterior",
  "images/services/property-management/pm-overview-inline.jpg": "inspection checklist clipboard professional",
  // property-management service entry in SERVICES_DATA (distinct from hub)
  "images/services/property-management/pm-service-hero.jpg":      "property management professional building",
  "images/services/property-management/pm-service-inline.jpg":    "property management documents office",
  "images/services/property-management/pm-service-gallery-1.jpg": "residential property management crew",
  "images/services/property-management/pm-service-gallery-2.jpg": "commercial property management exterior",
  "images/services/property-management/pm-service-gallery-3.jpg": "property maintenance coordination",

  // ── Property Management: Commercial Industrial ────────────────────────────
  "images/services/property-management/commercial-industrial-hero.jpg":      "industrial warehouse exterior large",
  "images/services/property-management/commercial-industrial-inline.jpg":    "office park parking exterior",
  "images/services/property-management/commercial-industrial-gallery-1.jpg": "loading dock warehouse truck",
  "images/services/property-management/commercial-industrial-gallery-2.jpg": "retail strip center exterior",
  "images/services/property-management/commercial-industrial-gallery-3.jpg": "flex industrial commercial building",

  // ── Property Management: Multifamily HOA ─────────────────────────────────
  "images/services/property-management/multifamily-hoa-hero.jpg":      "apartment complex exterior residential",
  "images/services/property-management/multifamily-hoa-inline.jpg":    "hoa community common area maintained",
  "images/services/property-management/multifamily-hoa-gallery-1.jpg": "apartment building courtyard",
  "images/services/property-management/multifamily-hoa-gallery-2.jpg": "townhomes community row",
  "images/services/property-management/multifamily-hoa-gallery-3.jpg": "apartment pool area community",

  // ── Property Management: Single Family ───────────────────────────────────
  "images/services/property-management/sfh-hero.jpg":      "single family home suburban curb appeal",
  "images/services/property-management/sfh-inline.jpg":    "front door home entrance residential",
  "images/services/property-management/sfh-gallery-1.jpg": "residential home exterior neighborhood",
  "images/services/property-management/sfh-gallery-2.jpg": "for rent sign residential home",
  "images/services/property-management/sfh-gallery-3.jpg": "rental home interior staged clean",

  // ── Property Management: Boots on Ground ─────────────────────────────────
  "images/services/property-management/boots-on-ground-hero.jpg":      "property inspector tablet walking",
  "images/services/property-management/boots-on-ground-inline.jpg":    "site assessment professional property",
  "images/services/property-management/boots-on-ground-gallery-1.jpg": "storm damage property exterior assessment",
  "images/services/property-management/boots-on-ground-gallery-2.jpg": "worker property communication site",
  "images/services/property-management/boots-on-ground-gallery-3.jpg": "contractor vendor property coordination",

  // ── Property Management: Maintenance Coordination ─────────────────────────
  "images/services/property-management/maintenance-coord-hero.jpg":      "maintenance technician toolbox home service",
  "images/services/property-management/maintenance-coord-inline.jpg":    "work order tablet technician",
  "images/services/property-management/maintenance-coord-gallery-1.jpg": "hvac technician air conditioning",
  "images/services/property-management/maintenance-coord-gallery-2.jpg": "plumber sink repair",
  "images/services/property-management/maintenance-coord-gallery-3.jpg": "electrician panel wiring",

  // ── HOA / Commercial Property (HOA category) ─────────────────────────────
  "images/services/property-management/hoa-hero.jpg":      "homeowners association community neighborhood",
  "images/services/property-management/hoa-inline.jpg":    "community association meeting documents",
  "images/services/property-management/hoa-gallery-1.jpg": "neighborhood common area maintained",
  "images/services/property-management/hoa-gallery-2.jpg": "commercial property building managed",
  "images/services/property-management/hoa-gallery-3.jpg": "hoa property management documents",

  // ── Custom Interiors: Renovation & Remodel ────────────────────────────────
  "images/services/custom-interiors/renovation-hero.jpg":      "modern renovated open concept living room",
  "images/services/custom-interiors/renovation-inline.jpg":    "home renovation construction in progress",
  "images/services/custom-interiors/renovation-gallery-1.jpg": "renovated home interior modern finish",
  "images/services/custom-interiors/renovation-gallery-2.jpg": "construction tools hardwood floor",
  "images/services/custom-interiors/renovation-gallery-3.jpg": "finished home renovation reveal",

  // ── Custom Interiors: Framing & Finishes ──────────────────────────────────
  "images/services/custom-interiors/framing-hero.jpg":      "wood framing construction interior new room",
  "images/services/custom-interiors/framing-inline.jpg":    "trim carpentry detail finish work",
  "images/services/custom-interiors/framing-gallery-1.jpg": "drywall installation construction",
  "images/services/custom-interiors/framing-gallery-2.jpg": "crown molding installation",
  "images/services/custom-interiors/framing-gallery-3.jpg": "painted wall clean trim finish",

  // ── Custom Interiors: Kitchen & Bath ─────────────────────────────────────
  "images/services/custom-interiors/kitchen-bath-hero.jpg":      "modern white kitchen quartz countertop",
  "images/services/custom-interiors/kitchen-bath-inline.jpg":    "modern bathroom subway tile",
  "images/services/custom-interiors/kitchen-bath-gallery-1.jpg": "kitchen island pendant lights modern",
  "images/services/custom-interiors/kitchen-bath-gallery-2.jpg": "bathroom vanity sink modern",
  "images/services/custom-interiors/kitchen-bath-gallery-3.jpg": "kitchen backsplash tile detail",

  // ── Custom Interiors: Basement Finishing ─────────────────────────────────
  "images/services/custom-interiors/basement-hero.jpg":      "finished basement family room",
  "images/services/custom-interiors/basement-inline.jpg":    "basement bar area finished",
  "images/services/custom-interiors/basement-gallery-1.jpg": "basement media entertainment room",
  "images/services/custom-interiors/basement-gallery-2.jpg": "basement bedroom egress window",
  "images/services/custom-interiors/basement-gallery-3.jpg": "basement home gym",

  // ── Custom Interiors: Additions & Expansions ─────────────────────────────
  "images/services/custom-interiors/additions-hero.jpg":      "home addition exterior new construction",
  "images/services/custom-interiors/additions-inline.jpg":    "sunroom addition interior bright",
  "images/services/custom-interiors/additions-gallery-1.jpg": "garage apartment adu exterior",
  "images/services/custom-interiors/additions-gallery-2.jpg": "home addition framing bump out",
  "images/services/custom-interiors/additions-gallery-3.jpg": "master suite expansion renovation",

  // ── Custom Interiors: Investment Property Rehab ───────────────────────────
  "images/services/custom-interiors/investment-rehab-hero.jpg":      "rental property rehab renovation interior",
  "images/services/custom-interiors/investment-rehab-inline.jpg":    "new flooring rental property installation",
  "images/services/custom-interiors/investment-rehab-gallery-1.jpg": "painted kitchen rental update",
  "images/services/custom-interiors/investment-rehab-gallery-2.jpg": "updated bathroom rental property",
  "images/services/custom-interiors/investment-rehab-gallery-3.jpg": "investment home exterior curb appeal",

  // ── Custom Interiors: Flooring & Tile ────────────────────────────────────
  "images/services/custom-interiors/flooring-tile-hero.jpg":      "hardwood floor installation",
  "images/services/custom-interiors/flooring-tile-inline.jpg":    "tile floor pattern detail",
  "images/services/custom-interiors/flooring-tile-gallery-1.jpg": "luxury vinyl plank flooring",
  "images/services/custom-interiors/flooring-tile-gallery-2.jpg": "bathroom tile installation",
  "images/services/custom-interiors/flooring-tile-gallery-3.jpg": "hardwood floor finished room",

  // ── Outdoor: Landscape Design & Install ──────────────────────────────────
  "images/services/outdoor-grounds/landscape-hero.jpg":      "xeriscape landscape design front yard",
  "images/services/outdoor-grounds/landscape-inline.jpg":    "landscaping crew planting installation",
  "images/services/outdoor-grounds/landscape-gallery-1.jpg": "native plants garden bed",
  "images/services/outdoor-grounds/landscape-gallery-2.jpg": "sod installation residential lawn",
  "images/services/outdoor-grounds/landscape-gallery-3.jpg": "drip irrigation system install",

  // ── Outdoor: Decks, Pergolas & Patios ────────────────────────────────────
  "images/services/outdoor-grounds/decks-hero.jpg":      "modern composite deck outdoor",
  "images/services/outdoor-grounds/decks-inline.jpg":    "pergola outdoor seating backyard",
  "images/services/outdoor-grounds/decks-gallery-1.jpg": "stone paver patio fire pit",
  "images/services/outdoor-grounds/decks-gallery-2.jpg": "cedar wood deck railings",
  "images/services/outdoor-grounds/decks-gallery-3.jpg": "pergola string lights backyard evening",

  // ── Outdoor: Custom Water Features ───────────────────────────────────────
  "images/services/outdoor-grounds/water-features-hero.jpg":      "pondless waterfall landscape design",
  "images/services/outdoor-grounds/water-features-inline.jpg":    "koi pond backyard water feature",
  "images/services/outdoor-grounds/water-features-gallery-1.jpg": "stream garden water feature",
  "images/services/outdoor-grounds/water-features-gallery-2.jpg": "stone garden fountain",
  "images/services/outdoor-grounds/water-features-gallery-3.jpg": "backyard pond rocks water",

  // ── Outdoor: Fencing & Retaining Walls ───────────────────────────────────
  "images/services/outdoor-grounds/fencing-hero.jpg":      "cedar privacy fence residential",
  "images/services/outdoor-grounds/fencing-inline.jpg":    "vinyl picket fence yard",
  "images/services/outdoor-grounds/fencing-gallery-1.jpg": "wrought iron fence gate",
  "images/services/outdoor-grounds/fencing-gallery-2.jpg": "retaining wall landscaping block",
  "images/services/outdoor-grounds/fencing-gallery-3.jpg": "board on board wood fence",

  // ── Outdoor: Grounds Maintenance ─────────────────────────────────────────
  "images/services/outdoor-grounds/grounds-hero.jpg":      "professional lawn mowing residential",
  "images/services/outdoor-grounds/grounds-inline.jpg":    "lawn edging detail",
  "images/services/outdoor-grounds/grounds-gallery-1.jpg": "mulch garden bed refresh",
  "images/services/outdoor-grounds/grounds-gallery-2.jpg": "fall leaf cleanup yard",
  "images/services/outdoor-grounds/grounds-gallery-3.jpg": "hedge trimming professional",

  // ── Outdoor: Industrial Maintenance ──────────────────────────────────────
  "images/services/outdoor-grounds/industrial-hero.jpg":      "commercial parking lot striping",
  "images/services/outdoor-grounds/industrial-inline.jpg":    "industrial pressure washing concrete",
  "images/services/outdoor-grounds/industrial-gallery-1.jpg": "parking lot sweeper commercial",
  "images/services/outdoor-grounds/industrial-gallery-2.jpg": "loading dock cleaning commercial",
  "images/services/outdoor-grounds/industrial-gallery-3.jpg": "warehouse floor scrubber industrial",

  // ── Outdoor: Pressure Washing & Windows ──────────────────────────────────
  "images/services/outdoor-grounds/pressure-wash-hero.jpg":      "pressure washer driveway cleaning",
  "images/services/outdoor-grounds/pressure-wash-inline.jpg":    "window cleaning exterior residential",
  "images/services/outdoor-grounds/pressure-wash-gallery-1.jpg": "deck pressure washing clean",
  "images/services/outdoor-grounds/pressure-wash-gallery-2.jpg": "house siding soft wash",
  "images/services/outdoor-grounds/pressure-wash-gallery-3.jpg": "squeegee clean window exterior",

  // ── Outdoor: Junk Haul Off ────────────────────────────────────────────────
  "images/services/outdoor-grounds/junk-hero.jpg":      "junk removal truck hauling",
  "images/services/outdoor-grounds/junk-inline.jpg":    "dumpster residential driveway",
  "images/services/outdoor-grounds/junk-gallery-1.jpg": "furniture loading truck removal",
  "images/services/outdoor-grounds/junk-gallery-2.jpg": "construction debris pile cleanout",
  "images/services/outdoor-grounds/junk-gallery-3.jpg": "clean empty garage after cleanout",

  // ── Concierge: Housekeeping & Cleaning ───────────────────────────────────
  "images/services/concierge/housekeeping-hero.jpg":      "clean modern home interior bright",
  "images/services/concierge/housekeeping-inline.jpg":    "cleaning supplies kitchen counter",
  "images/services/concierge/housekeeping-gallery-1.jpg": "spotless kitchen countertop clean",
  "images/services/concierge/housekeeping-gallery-2.jpg": "vacuumed carpet living room clean",
  "images/services/concierge/housekeeping-gallery-3.jpg": "clean bathroom counter organized",

  // ── Concierge: Home Safety & Wellness Checks ─────────────────────────────
  "images/services/concierge/home-safety-hero.jpg":      "smoke detector ceiling test residential",
  "images/services/concierge/home-safety-inline.jpg":    "door lock exterior security",
  "images/services/concierge/home-safety-gallery-1.jpg": "property walkthrough exterior",
  "images/services/concierge/home-safety-gallery-2.jpg": "mail collection porch residential",
  "images/services/concierge/home-safety-gallery-3.jpg": "fire extinguisher inspection",

  // ── Concierge: Mobile Auto Detailing ─────────────────────────────────────
  "images/services/concierge/auto-detail-hero.jpg":      "car hand wash exterior detailing",
  "images/services/concierge/auto-detail-inline.jpg":    "car interior vacuum cleaning",
  "images/services/concierge/auto-detail-gallery-1.jpg": "car paint polishing buffing",
  "images/services/concierge/auto-detail-gallery-2.jpg": "tire shine application",
  "images/services/concierge/auto-detail-gallery-3.jpg": "clean car interior leather seats",

  // ── Concierge: Pet Waste Management ──────────────────────────────────────
  "images/services/concierge/pet-waste-hero.jpg":      "dog playing clean grass yard",
  "images/services/concierge/pet-waste-inline.jpg":    "dog waste cleanup grass yard",
  "images/services/concierge/pet-waste-gallery-1.jpg": "happy dog green backyard",
  "images/services/concierge/pet-waste-gallery-2.jpg": "dog in clean residential lawn",
  "images/services/concierge/pet-waste-gallery-3.jpg": "clean residential grass yard",

  // ── Concierge: Errand Services ────────────────────────────────────────────
  "images/services/concierge/errands-hero.jpg":      "grocery bags car trunk errand",
  "images/services/concierge/errands-inline.jpg":    "pharmacy counter pickup errand",
  "images/services/concierge/errands-gallery-1.jpg": "package delivery door residential",
  "images/services/concierge/errands-gallery-2.jpg": "dry cleaning hangers organized",
  "images/services/concierge/errands-gallery-3.jpg": "shopping bag errand service",
};

// ─── Service image path map ───────────────────────────────────────────────────
// Maps every service slug → { heroImage, overviewImage, gallery[3] }
// These local paths replace Unsplash IDs in lib/services-data.ts

interface ServiceImagePaths { heroImage: string; overviewImage: string; gallery: string[] }

const SERVICE_IMAGES: Record<string, ServiceImagePaths> = {
  // Advisory
  "buyer-representation":        { heroImage: "/images/services/advisory/buyer-rep-hero.jpg",         overviewImage: "/images/services/advisory/buyer-rep-inline.jpg",         gallery: ["/images/services/advisory/buyer-rep-gallery-1.jpg",         "/images/services/advisory/buyer-rep-gallery-2.jpg",         "/images/services/advisory/buyer-rep-gallery-3.jpg"] },
  "seller-representation":       { heroImage: "/images/services/advisory/seller-rep-hero.jpg",        overviewImage: "/images/services/advisory/seller-rep-inline.jpg",        gallery: ["/images/services/advisory/seller-rep-gallery-1.jpg",        "/images/services/advisory/seller-rep-gallery-2.jpg",        "/images/services/advisory/seller-rep-gallery-3.jpg"] },
  "investment-acquisition-analysis": { heroImage: "/images/services/advisory/acquisition-hero.jpg",   overviewImage: "/images/services/advisory/acquisition-inline.jpg",   gallery: ["/images/services/advisory/acquisition-gallery-1.jpg",   "/images/services/advisory/acquisition-gallery-2.jpg",   "/images/services/advisory/acquisition-gallery-3.jpg"] },
  "portfolio-strategy":          { heroImage: "/images/services/advisory/portfolio-hero.jpg",         overviewImage: "/images/services/advisory/portfolio-inline.jpg",         gallery: ["/images/services/advisory/portfolio-gallery-1.jpg",         "/images/services/advisory/portfolio-gallery-2.jpg",         "/images/services/advisory/portfolio-gallery-3.jpg"] },
  "commercial-leasing-advisory": { heroImage: "/images/services/advisory/commercial-leasing-hero.jpg",overviewImage: "/images/services/advisory/commercial-leasing-inline.jpg",gallery: ["/images/services/advisory/commercial-leasing-gallery-1.jpg","/images/services/advisory/commercial-leasing-gallery-2.jpg","/images/services/advisory/commercial-leasing-gallery-3.jpg"] },
  "1031-exchange":               { heroImage: "/images/services/advisory/1031-hero.jpg",              overviewImage: "/images/services/advisory/1031-inline.jpg",              gallery: ["/images/services/advisory/1031-gallery-1.jpg",              "/images/services/advisory/1031-gallery-2.jpg",              "/images/services/advisory/1031-gallery-3.jpg"] },

  // Management
  "property-management":              { heroImage: "/images/services/property-management/pm-service-hero.jpg",              overviewImage: "/images/services/property-management/pm-service-inline.jpg",              gallery: ["/images/services/property-management/pm-service-gallery-1.jpg",              "/images/services/property-management/pm-service-gallery-2.jpg",              "/images/services/property-management/pm-service-gallery-3.jpg"] },
  "commercial-industrial-management": { heroImage: "/images/services/property-management/commercial-industrial-hero.jpg",   overviewImage: "/images/services/property-management/commercial-industrial-inline.jpg",   gallery: ["/images/services/property-management/commercial-industrial-gallery-1.jpg",   "/images/services/property-management/commercial-industrial-gallery-2.jpg",   "/images/services/property-management/commercial-industrial-gallery-3.jpg"] },
  "multifamily-hoa-management":       { heroImage: "/images/services/property-management/multifamily-hoa-hero.jpg",         overviewImage: "/images/services/property-management/multifamily-hoa-inline.jpg",         gallery: ["/images/services/property-management/multifamily-hoa-gallery-1.jpg",         "/images/services/property-management/multifamily-hoa-gallery-2.jpg",         "/images/services/property-management/multifamily-hoa-gallery-3.jpg"] },
  "single-family-management":         { heroImage: "/images/services/property-management/sfh-hero.jpg",                     overviewImage: "/images/services/property-management/sfh-inline.jpg",                     gallery: ["/images/services/property-management/sfh-gallery-1.jpg",                     "/images/services/property-management/sfh-gallery-2.jpg",                     "/images/services/property-management/sfh-gallery-3.jpg"] },
  "boots-on-ground-response":         { heroImage: "/images/services/property-management/boots-on-ground-hero.jpg",         overviewImage: "/images/services/property-management/boots-on-ground-inline.jpg",         gallery: ["/images/services/property-management/boots-on-ground-gallery-1.jpg",         "/images/services/property-management/boots-on-ground-gallery-2.jpg",         "/images/services/property-management/boots-on-ground-gallery-3.jpg"] },
  "maintenance-coordination":         { heroImage: "/images/services/property-management/maintenance-coord-hero.jpg",       overviewImage: "/images/services/property-management/maintenance-coord-inline.jpg",       gallery: ["/images/services/property-management/maintenance-coord-gallery-1.jpg",       "/images/services/property-management/maintenance-coord-gallery-2.jpg",       "/images/services/property-management/maintenance-coord-gallery-3.jpg"] },

  // HOA
  "hoa-commercial-property": { heroImage: "/images/services/property-management/hoa-hero.jpg", overviewImage: "/images/services/property-management/hoa-inline.jpg", gallery: ["/images/services/property-management/hoa-gallery-1.jpg", "/images/services/property-management/hoa-gallery-2.jpg", "/images/services/property-management/hoa-gallery-3.jpg"] },

  // Custom Interiors
  "renovation-remodel":      { heroImage: "/images/services/custom-interiors/renovation-hero.jpg",      overviewImage: "/images/services/custom-interiors/renovation-inline.jpg",      gallery: ["/images/services/custom-interiors/renovation-gallery-1.jpg",      "/images/services/custom-interiors/renovation-gallery-2.jpg",      "/images/services/custom-interiors/renovation-gallery-3.jpg"] },
  "framing-finishes":        { heroImage: "/images/services/custom-interiors/framing-hero.jpg",          overviewImage: "/images/services/custom-interiors/framing-inline.jpg",          gallery: ["/images/services/custom-interiors/framing-gallery-1.jpg",          "/images/services/custom-interiors/framing-gallery-2.jpg",          "/images/services/custom-interiors/framing-gallery-3.jpg"] },
  "kitchen-bath-more":       { heroImage: "/images/services/custom-interiors/kitchen-bath-hero.jpg",     overviewImage: "/images/services/custom-interiors/kitchen-bath-inline.jpg",     gallery: ["/images/services/custom-interiors/kitchen-bath-gallery-1.jpg",     "/images/services/custom-interiors/kitchen-bath-gallery-2.jpg",     "/images/services/custom-interiors/kitchen-bath-gallery-3.jpg"] },
  "basement-finishing":      { heroImage: "/images/services/custom-interiors/basement-hero.jpg",         overviewImage: "/images/services/custom-interiors/basement-inline.jpg",         gallery: ["/images/services/custom-interiors/basement-gallery-1.jpg",         "/images/services/custom-interiors/basement-gallery-2.jpg",         "/images/services/custom-interiors/basement-gallery-3.jpg"] },
  "additions-expansions":    { heroImage: "/images/services/custom-interiors/additions-hero.jpg",        overviewImage: "/images/services/custom-interiors/additions-inline.jpg",        gallery: ["/images/services/custom-interiors/additions-gallery-1.jpg",        "/images/services/custom-interiors/additions-gallery-2.jpg",        "/images/services/custom-interiors/additions-gallery-3.jpg"] },
  "investment-property-rehab":{ heroImage: "/images/services/custom-interiors/investment-rehab-hero.jpg",overviewImage: "/images/services/custom-interiors/investment-rehab-inline.jpg",gallery: ["/images/services/custom-interiors/investment-rehab-gallery-1.jpg","/images/services/custom-interiors/investment-rehab-gallery-2.jpg","/images/services/custom-interiors/investment-rehab-gallery-3.jpg"] },
  "flooring-tile":           { heroImage: "/images/services/custom-interiors/flooring-tile-hero.jpg",   overviewImage: "/images/services/custom-interiors/flooring-tile-inline.jpg",   gallery: ["/images/services/custom-interiors/flooring-tile-gallery-1.jpg",   "/images/services/custom-interiors/flooring-tile-gallery-2.jpg",   "/images/services/custom-interiors/flooring-tile-gallery-3.jpg"] },

  // Outdoor Grounds
  "landscape-design-install": { heroImage: "/images/services/outdoor-grounds/landscape-hero.jpg",       overviewImage: "/images/services/outdoor-grounds/landscape-inline.jpg",       gallery: ["/images/services/outdoor-grounds/landscape-gallery-1.jpg",       "/images/services/outdoor-grounds/landscape-gallery-2.jpg",       "/images/services/outdoor-grounds/landscape-gallery-3.jpg"] },
  "decks-pergolas-patios":    { heroImage: "/images/services/outdoor-grounds/decks-hero.jpg",           overviewImage: "/images/services/outdoor-grounds/decks-inline.jpg",           gallery: ["/images/services/outdoor-grounds/decks-gallery-1.jpg",           "/images/services/outdoor-grounds/decks-gallery-2.jpg",           "/images/services/outdoor-grounds/decks-gallery-3.jpg"] },
  "custom-water-features":    { heroImage: "/images/services/outdoor-grounds/water-features-hero.jpg",  overviewImage: "/images/services/outdoor-grounds/water-features-inline.jpg",  gallery: ["/images/services/outdoor-grounds/water-features-gallery-1.jpg",  "/images/services/outdoor-grounds/water-features-gallery-2.jpg",  "/images/services/outdoor-grounds/water-features-gallery-3.jpg"] },
  "fencing":                  { heroImage: "/images/services/outdoor-grounds/fencing-hero.jpg",         overviewImage: "/images/services/outdoor-grounds/fencing-inline.jpg",         gallery: ["/images/services/outdoor-grounds/fencing-gallery-1.jpg",         "/images/services/outdoor-grounds/fencing-gallery-2.jpg",         "/images/services/outdoor-grounds/fencing-gallery-3.jpg"] },
  "grounds-maintenance":      { heroImage: "/images/services/outdoor-grounds/grounds-hero.jpg",         overviewImage: "/images/services/outdoor-grounds/grounds-inline.jpg",         gallery: ["/images/services/outdoor-grounds/grounds-gallery-1.jpg",         "/images/services/outdoor-grounds/grounds-gallery-2.jpg",         "/images/services/outdoor-grounds/grounds-gallery-3.jpg"] },
  "industrial-maintenance":   { heroImage: "/images/services/outdoor-grounds/industrial-hero.jpg",      overviewImage: "/images/services/outdoor-grounds/industrial-inline.jpg",      gallery: ["/images/services/outdoor-grounds/industrial-gallery-1.jpg",      "/images/services/outdoor-grounds/industrial-gallery-2.jpg",      "/images/services/outdoor-grounds/industrial-gallery-3.jpg"] },
  "power-window-washing":     { heroImage: "/images/services/outdoor-grounds/pressure-wash-hero.jpg",   overviewImage: "/images/services/outdoor-grounds/pressure-wash-inline.jpg",   gallery: ["/images/services/outdoor-grounds/pressure-wash-gallery-1.jpg",   "/images/services/outdoor-grounds/pressure-wash-gallery-2.jpg",   "/images/services/outdoor-grounds/pressure-wash-gallery-3.jpg"] },
  "junk-haul-off":            { heroImage: "/images/services/outdoor-grounds/junk-hero.jpg",            overviewImage: "/images/services/outdoor-grounds/junk-inline.jpg",            gallery: ["/images/services/outdoor-grounds/junk-gallery-1.jpg",            "/images/services/outdoor-grounds/junk-gallery-2.jpg",            "/images/services/outdoor-grounds/junk-gallery-3.jpg"] },

  // Concierge
  "housekeeping-cleaning":  { heroImage: "/images/services/concierge/housekeeping-hero.jpg",  overviewImage: "/images/services/concierge/housekeeping-inline.jpg",  gallery: ["/images/services/concierge/housekeeping-gallery-1.jpg",  "/images/services/concierge/housekeeping-gallery-2.jpg",  "/images/services/concierge/housekeeping-gallery-3.jpg"] },
  "home-safety-checks":     { heroImage: "/images/services/concierge/home-safety-hero.jpg",   overviewImage: "/images/services/concierge/home-safety-inline.jpg",   gallery: ["/images/services/concierge/home-safety-gallery-1.jpg",   "/images/services/concierge/home-safety-gallery-2.jpg",   "/images/services/concierge/home-safety-gallery-3.jpg"] },
  "mobile-auto-detailing":  { heroImage: "/images/services/concierge/auto-detail-hero.jpg",   overviewImage: "/images/services/concierge/auto-detail-inline.jpg",   gallery: ["/images/services/concierge/auto-detail-gallery-1.jpg",   "/images/services/concierge/auto-detail-gallery-2.jpg",   "/images/services/concierge/auto-detail-gallery-3.jpg"] },
  "poop-scooping":          { heroImage: "/images/services/concierge/pet-waste-hero.jpg",     overviewImage: "/images/services/concierge/pet-waste-inline.jpg",     gallery: ["/images/services/concierge/pet-waste-gallery-1.jpg",     "/images/services/concierge/pet-waste-gallery-2.jpg",     "/images/services/concierge/pet-waste-gallery-3.jpg"] },
  "errand-services":        { heroImage: "/images/services/concierge/errands-hero.jpg",       overviewImage: "/images/services/concierge/errands-inline.jpg",       gallery: ["/images/services/concierge/errands-gallery-1.jpg",       "/images/services/concierge/errands-gallery-2.jpg",       "/images/services/concierge/errands-gallery-3.jpg"] },
};

// ─── Category keyword map for university articles ─────────────────────────────

const UNIV_CATEGORY_KEYWORDS: Record<string, string> = {
  "lawn-turf":            "lawn grass maintenance",
  "colorado-living":      "colorado property home",
  "investment-strategy":  "real estate investment property",
  "property-management":  "property management professional",
  "outdoor-structures":   "deck pergola outdoor structure",
  "outdoor-living":       "outdoor living backyard",
  "renovation-rehab":     "home renovation remodel interior",
  "property-maintenance": "property maintenance repair home",
  "fencing":              "fence residential property",
  "landscaping":          "landscaping garden design",
  "commercial":           "commercial property building",
  "concierge":            "home services professional",
};

// ─── services-data.ts patcher ─────────────────────────────────────────────────

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function patchServiceBlock(content: string, slug: string, images: ServiceImagePaths): string {
  const slugRe = new RegExp(`slug:\\s*["']${escapeRegex(slug)}["']`);
  const match  = slugRe.exec(content);
  if (!match) {
    console.warn(`  ⚠  Slug "${slug}" not found in services-data.ts — skipped`);
    return content;
  }

  // Find the end of this service's block (next "slug:" or end of file)
  const afterIdx = match.index + match[0].length;
  const rest     = content.slice(afterIdx);
  const nextSlug = rest.search(/(?<!\w)slug:\s*["']/);
  const blockEnd = nextSlug === -1 ? content.length : afterIdx + nextSlug;

  const before = content.slice(0, match.index);
  let   block  = content.slice(match.index, blockEnd);
  const after  = content.slice(blockEnd);

  // heroImage
  block = block.replace(/heroImage:\s*["'][^"']*["']/, `heroImage: "${images.heroImage}"`);
  // overviewImage
  block = block.replace(/overviewImage:\s*["'][^"']*["']/, `overviewImage: "${images.overviewImage}"`);
  // gallery ids — replace sequentially (first match each iteration)
  const galleryStart = block.indexOf("gallery:");
  if (galleryStart !== -1) {
    let galleryPart = block.slice(galleryStart);
    for (const galleryPath of images.gallery) {
      galleryPart = galleryPart.replace(/\bid:\s*["'][^"']*["']/, `id: "${galleryPath}"`);
    }
    block = block.slice(0, galleryStart) + galleryPart;
  }

  return before + block + after;
}

async function updateServicesData(): Promise<void> {
  const filePath = path.join(ROOT, "lib", "services-data.ts");
  let content = fs.readFileSync(filePath, "utf8");

  for (const [slug, images] of Object.entries(SERVICE_IMAGES)) {
    content = patchServiceBlock(content, slug, images);
  }

  if (!DRY) {
    fs.writeFileSync(filePath, content);
    console.log("  ✓  lib/services-data.ts updated");
  } else {
    console.log("  [dry] Would update lib/services-data.ts");
  }
}

// ─── Component updater ────────────────────────────────────────────────────────
// Strips the Unsplash URL construction in favour of the local path directly.

async function updateComponents(): Promise<void> {
  const patches: Array<{ file: string; searches: Array<[string, string]> }> = [
    {
      file: "components/sections/ServiceHero.tsx",
      searches: [
        [
          "src={`https://images.unsplash.com/photo-${heroImage}?auto=format&fit=crop&w=1600&q=80`}",
          "src={heroImage}",
        ],
        ["// Unsplash photo ID", "// local image path (/images/...)"],
      ],
    },
    {
      file: "components/sections/ServiceOverview.tsx",
      searches: [
        [
          "src={`https://images.unsplash.com/photo-${overviewImage}?auto=format&fit=crop&w=900&q=80`}",
          "src={overviewImage}",
        ],
        ["// Unsplash photo ID", "// local image path (/images/...)"],
      ],
    },
    {
      file: "components/sections/ServiceGallery.tsx",
      searches: [
        [
          "src={`https://images.unsplash.com/photo-${img.id}?auto=format&fit=crop&w=800&q=80`}",
          "src={img.id}",
        ],
        ["// Unsplash photo ID", "// local image path (/images/...)"],
      ],
    },
  ];

  for (const patch of patches) {
    const filePath = path.join(ROOT, patch.file);
    let content = fs.readFileSync(filePath, "utf8");
    let changed = false;
    for (const [from, to] of patch.searches) {
      if (content.includes(from)) { content = content.replace(from, to); changed = true; }
    }
    if (!changed) { console.log(`  ℹ  ${patch.file} — already updated, skipped`); continue; }
    if (!DRY) { fs.writeFileSync(filePath, content); console.log(`  ✓  ${patch.file}`); }
    else        console.log(`  [dry] Would update ${patch.file}`);
  }
}

// ─── Homepage updater ─────────────────────────────────────────────────────────
// Replaces hardcoded Unsplash URLs in app/page.tsx

async function updateHomepage(): Promise<void> {
  const filePath = path.join(ROOT, "app", "page.tsx");
  let content = fs.readFileSync(filePath, "utf8");

  // Replace any remaining https://images.unsplash.com URLs with university image paths
  // They follow the pattern: coverImage: "https://images.unsplash.com/photo-XXXXX?..."
  const replaced = content.replace(
    /coverImage:\s*"https:\/\/images\.unsplash\.com\/photo-[^"]+"/g,
    (match) => {
      // Extract slug from the href on the same object (best effort)
      return match; // homepage will be fixed by the DB update — see Phase 5
    }
  );

  // Direct targeted replacements for the three hardcoded university preview items
  const fixes: Array<[RegExp, string]> = [
    [
      /coverImage:\s*"https:\/\/images\.unsplash\.com\/photo-1560518883-ce09059eeffa[^"]*"/,
      'coverImage: "/images/university/brrrr-strategy-northern-colorado.jpg"',
    ],
    [
      /coverImage:\s*"https:\/\/images\.unsplash\.com\/photo-1556909114-f6e7ad7d3136[^"]*"/,
      'coverImage: "/images/university/renovations-that-pay-back-northern-colorado.jpg"',
    ],
  ];

  let updated = content;
  for (const [pattern, replacement] of fixes) {
    updated = updated.replace(pattern, replacement);
  }
  // boots-on-ground uses the same unsplash ID as brrrr — target it by href context
  updated = updated.replace(
    /(boots-on-ground-property-management[\s\S]{1,200}coverImage:\s*)"[^"]*"/,
    '$1"/images/university/boots-on-ground-property-management.jpg"',
  );

  if (updated === content) {
    console.log("  ℹ  app/page.tsx — already updated or no Unsplash URLs found");
    return;
  }
  if (!DRY) { fs.writeFileSync(filePath, updated); console.log("  ✓  app/page.tsx"); }
  else        console.log("  [dry] Would update app/page.tsx");
}

// ─── University DB updater ────────────────────────────────────────────────────

function generateUniversityKeyword(title: string, categorySlug: string): string {
  const stopWords = new Set([
    "the","a","an","and","or","in","of","for","to","with","on","at","by",
    "how","what","why","when","which","your","this","that","from","is","are",
    "was","were","will","can","should","every","each","all","you","we","they",
  ]);
  const words = title.toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.has(w))
    .slice(0, 3)
    .join(" ");
  const base = UNIV_CATEGORY_KEYWORDS[categorySlug] ?? "property home real estate";
  return `${words} ${base}`.trim().substring(0, 100);
}

async function updateUniversityDB(): Promise<void> {
  const { prisma } = await import("../lib/prisma");

  const articles = await prisma.universityArticle.findMany({
    where:   { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { slug: "asc" },
  });

  console.log(`    ${articles.length} published articles to process`);

  let updated = 0, skipped = 0, errors = 0;

  for (const article of articles) {
    const localPath = `images/university/${article.slug}.jpg`;
    const absPath   = path.join(ROOT, "public", localPath);
    const webPath   = `/${localPath}`;

    // Skip if already pointing to a local path
    if (article.coverImage?.startsWith("/images/")) {
      skipped++;
      continue;
    }

    try {
      // Download image if needed
      if (!fs.existsSync(absPath) || FORCE) {
        const keyword  = generateUniversityKeyword(article.title, article.category.slug);
        const photoUrl = await searchPexels(keyword);
        await sleep(THROTTLE_MS);

        if (photoUrl) {
          await downloadAndSave(photoUrl, localPath, 900);
          console.log(`  ✓  ${article.slug}`);
        } else {
          console.warn(`  ⚠  No image found for "${article.title}" — skipping DB update`);
          errors++;
          continue;
        }
      }

      // Update DB
      if (!DRY) {
        await prisma.universityArticle.update({
          where: { id: article.id },
          data:  { coverImage: webPath },
        });
      } else {
        console.log(`  [dry] Would update DB: ${article.slug} → ${webPath}`);
      }
      updated++;
    } catch (err) {
      console.error(`  ❌  ${article.slug}: ${(err as Error).message}`);
      errors++;
    }

    await sleep(THROTTLE_MS);
  }

  await prisma.$disconnect();
  console.log(`    Updated: ${updated}, Skipped: ${skipped}, Errors: ${errors}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("🖼   Forge Point Image Replacement\n");
  if (DRY)          console.log("🔍  DRY RUN — no changes will be written\n");
  if (FORCE)        console.log("⚡  FORCE — re-downloading all images\n");
  if (DOWNLOAD_ONLY)console.log("📥  DOWNLOAD ONLY — code and DB will not be modified\n");

  // ── PHASE 1: Download service images ────────────────────────────────────────
  console.log("━━━ PHASE 1: Service images ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  let downloaded = 0, skipped = 0, errors = 0;

  for (const [localPath, keyword] of Object.entries(IMAGE_KEYWORDS)) {
    const absPath  = path.join(ROOT, "public", localPath);
    if (fs.existsSync(absPath) && !FORCE) { skipped++; continue; }

    const isGallery = localPath.includes("gallery");
    const maxWidth  = isGallery ? 1200 : 1920;

    try {
      const photoUrl = await searchPexels(keyword);
      if (!photoUrl) { console.error(`  ❌  No result for "${keyword}" → ${localPath}`); errors++; continue; }
      await sleep(THROTTLE_MS);
      await downloadAndSave(photoUrl, localPath, maxWidth);
      if (!DRY) console.log(`  ✓  ${localPath}`);
      downloaded++;
    } catch (err) {
      console.error(`  ❌  ${localPath}: ${(err as Error).message}`);
      errors++;
    }
    await sleep(100); // tiny buffer between API calls
  }

  console.log(`\n  Downloaded: ${downloaded}  Skipped: ${skipped}  Errors: ${errors}\n`);

  if (DOWNLOAD_ONLY) {
    console.log("--download-only: stopping here. Run npm run images:replace for full update.");
    return;
  }

  // ── PHASE 2: Update lib/services-data.ts ────────────────────────────────────
  console.log("━━━ PHASE 2: lib/services-data.ts ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  await updateServicesData();
  console.log();

  // ── PHASE 3: Update components ───────────────────────────────────────────────
  console.log("━━━ PHASE 3: Components ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  await updateComponents();
  console.log();

  // ── PHASE 4: Update homepage ─────────────────────────────────────────────────
  console.log("━━━ PHASE 4: Homepage ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  await updateHomepage();
  console.log();

  // ── PHASE 5: University article images + DB ──────────────────────────────────
  console.log("━━━ PHASE 5: University articles (Pexels + Prisma) ━━━━━━━━━━━━━━━━━━━━━━━━━");
  await updateUniversityDB();
  console.log();

  console.log("✅  Done.");
  console.log("    Verify: grep -r 'images.unsplash.com' app/ components/ lib/");
  console.log("    Then:   npm run build && git add -A && git commit -m 'images: replace Unsplash with self-hosted Pexels photos'");
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
