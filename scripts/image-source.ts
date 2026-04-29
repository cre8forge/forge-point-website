#!/usr/bin/env tsx
/**
 * scripts/image-source.ts — Forge Point Image Sourcing v2
 *
 * Searches Pexels (+ Pixabay fallback) for all 227 image slots.
 * Applies anti-glamour pre-filtering and documentary scoring.
 * Generates scripts/.image-review.html for Aaron to review.
 * Does NOT download any images. That is image-apply.ts's job.
 *
 * Run:   npm run images:source
 * Resume: re-run the same command — already-sourced slots are skipped.
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true }); // .env.local wins (gitignored secrets)

import fs   from "fs";
import path from "path";

// ── Config ────────────────────────────────────────────────────────────────────

const PEXELS_KEY   = process.env.PEXELS_API_KEY  ?? "";
const PIXABAY_KEY  = process.env.PIXABAY_API_KEY ?? "";
const THROTTLE_MS  = 20_000; // 20 s → stays comfortably under 200 req/hr
const PER_PAGE     = 15;    // Pexels supports up to 80; 15 gives filter more to work with

const LOG_FILE        = path.join("scripts", ".image-sourcing.log");
const CANDIDATES_FILE = path.join("scripts", ".image-candidates.json");
const REVIEW_HTML     = path.join("scripts", ".image-review.html");

if (!PEXELS_KEY) {
  console.error("\n❌  PEXELS_API_KEY not set in .env.local\n");
  process.exit(1);
}

// ── Types ─────────────────────────────────────────────────────────────────────

type SizeType = "hero" | "inline" | "gallery";

interface SlotDef {
  id:           string;
  localPath:    string;
  description:  string;
  section:      string;
  query:        string;
  antiKeywords: string[];
  mustShow:     string;
  sizeType:     SizeType;
}

interface Candidate {
  url:             string;   // medium thumbnail URL (for review)
  downloadUrl:     string;   // large URL (for apply step)
  photographer:    string;
  photographerUrl: string;
  sourceUrl:       string;   // Pexels/Pixabay page URL
  width:           number;
  height:          number;
  avgColor:        string;
  altText:         string;
  source:          "pexels" | "pixabay";
  docScore:        number;   // higher = more documentary/authentic
}

interface SlotResult {
  slot:          SlotDef;
  candidates:    Candidate[];
  algorithmPick: number;   // 1-indexed from candidates[]
  needsManual:   boolean;  // true if fewer than 3 candidates passed filtering
  fallbackUsed:  boolean;  // true if Pixabay was needed
}

// ── Universal anti-keywords (every slot) ─────────────────────────────────────

const UNIVERSAL_ANTI = [
  "model", "posing", "posed", "studio", "business meeting",
  "handshake", "smiling", "happy", "success", "corporate",
  // Extended anti-glamour terms
  "perfect", "stunning", "beautiful", "elegant", "sophisticated", "upscale",
  "five star", "resort", "spa", "tropical", "palm", "mediterranean", "tuscan",
  "ocean", "beach", "coastal", "manhattan", "skyscraper", "dubai",
  "magazine cover", "editorial fashion", "wedding", "event venue",
];

// ── Slot definitions (159 static slots) ──────────────────────────────────────

function slot(
  id: string, lp: string, desc: string, section: string,
  query: string, anti: string[], must: string, size: SizeType,
): SlotDef {
  return { id, localPath: lp, description: desc, section, query, antiKeywords: anti, mustShow: must, sizeType: size };
}

const SLOTS: SlotDef[] = [
  // ── Homepage ──────────────────────────────────────────────────────────────
  slot("homepage/home-hero",       "images/hero/home-hero.jpg",         "Colorado ranch home exterior", "Homepage",
       "front range foothills home exterior morning",  ["mansion","palm","ocean","tropical","pool","beach","mediterranean"],  "Single-family home, dry-climate landscape", "hero"),
  slot("homepage/how-it-works",    "images/hero/home-how-it-works.jpg", "Contractor walking property with clipboard", "Homepage",
       "property inspector tablet exterior walkway",   ["office","desk","meeting","handshake","model smiling","corporate"],   "Worker outdoors, eyes-down on property", "inline"),

  // ── Advisory / Buyer Representation ──────────────────────────────────────
  slot("advisory/buyer-rep-hero",      "images/services/advisory/buyer-rep-hero.jpg",      "House keys on wooden surface",          "Forge Point Real Estate", "house keys close up wooden surface",         ["model holding keys smiling","business"],   "Keys on real surface, no human or hands at edge", "hero"),
  slot("advisory/buyer-rep-inline",    "images/services/advisory/buyer-rep-inline.jpg",    "Real estate document signing with pen", "Forge Point Real Estate", "real estate document signing pen",           ["model","corporate","handshake"],           "Documents, pen, signing in progress, top-down", "inline"),
  slot("advisory/buyer-rep-gallery-1", "images/services/advisory/buyer-rep-gallery-1.jpg", "Colorado suburban home with yard sign",  "Forge Point Real Estate", "for sale sign suburban front yard",          ["mansion","palm","luxury home","tropical"],  "House with yard sign, residential", "gallery"),
  slot("advisory/buyer-rep-gallery-2", "images/services/advisory/buyer-rep-gallery-2.jpg", "Home inspector with clipboard",          "Forge Point Real Estate", "home inspector tape measure foundation",      ["model","smiling","corporate","handshake"],  "Inspector looking at home feature, not at camera", "gallery"),
  slot("advisory/buyer-rep-gallery-3", "images/services/advisory/buyer-rep-gallery-3.jpg", "Front door knob detail",                 "Forge Point Real Estate", "residential front door wood entry detail",    ["christmas","wreath","holiday","mansion"],   "Door close-up, real residential entry", "gallery"),

  // ── Advisory / Seller Representation ─────────────────────────────────────
  slot("advisory/seller-rep-hero",      "images/services/advisory/seller-rep-hero.jpg",      "Home for sale sign in yard",           "Forge Point Real Estate", "real estate yard sign sunset residential",    ["palm","mansion","beachfront","luxury","tropical"],  "Real yard sign, lawn, suburban context", "hero"),
  slot("advisory/seller-rep-inline",    "images/services/advisory/seller-rep-inline.jpg",    "Living room interior, natural light",  "Forge Point Real Estate", "living room interior natural light",          ["staged","model","luxury","mansion"],        "Lived-in tidy room, natural light, no people", "inline"),
  slot("advisory/seller-rep-gallery-1", "images/services/advisory/seller-rep-gallery-1.jpg", "Front yard curb appeal",               "Forge Point Real Estate", "front yard curb appeal residential home",    ["mansion","palm"],                          "House front, walkway, modest landscaping", "gallery"),
  slot("advisory/seller-rep-gallery-2", "images/services/advisory/seller-rep-gallery-2.jpg", "Kitchen interior daylight",             "Forge Point Real Estate", "kitchen interior daylight",                  ["model","staged","luxury"],                 "Real kitchen, mid-range, daylight", "gallery"),
  slot("advisory/seller-rep-gallery-3", "images/services/advisory/seller-rep-gallery-3.jpg", "Sold real estate sign in yard",         "Forge Point Real Estate", "sold sign red residential yard",             ["model","smiling","corporate","handshake"], "Sold sign on real yard", "gallery"),

  // ── Advisory / Investment Acquisition ────────────────────────────────────
  slot("advisory/acquisition-hero",      "images/services/advisory/acquisition-hero.jpg",      "Financial docs, calculator, desk",     "Forge Point Real Estate", "real estate financial documents calculator desk", ["model","business meeting","handshake"],  "Top-down spreadsheet/docs/calculator, no faces", "hero"),
  slot("advisory/acquisition-inline",    "images/services/advisory/acquisition-inline.jpg",    "Investment analysis paperwork",        "Forge Point Real Estate", "investment property analysis paperwork",          ["model smiling","team meeting"],           "Documents on desk, working materials visible", "inline"),
  slot("advisory/acquisition-gallery-1", "images/services/advisory/acquisition-gallery-1.jpg", "Cap rate calculation worksheet",       "Forge Point Real Estate", "cap rate calculation worksheet",                  ["model","corporate stock"],               "Spreadsheet, calculator, written notes", "gallery"),
  slot("advisory/acquisition-gallery-2", "images/services/advisory/acquisition-gallery-2.jpg", "Person assessing property, notepad",   "Forge Point Real Estate", "property exterior assessment with notepad",       ["model","posed"],                         "Person from behind, looking at property, taking notes", "gallery"),
  slot("advisory/acquisition-gallery-3", "images/services/advisory/acquisition-gallery-3.jpg", "Investment duplex exterior",           "Forge Point Real Estate", "investment property duplex exterior",             ["mansion","luxury","palm"],               "Duplex or small multi-unit residential building", "gallery"),

  // ── Advisory / Portfolio Strategy ────────────────────────────────────────
  slot("advisory/portfolio-hero",      "images/services/advisory/portfolio-hero.jpg",      "Real estate folders, top-down",        "Forge Point Real Estate", "real estate folders documents desk top down", ["model","meeting","team"],               "Stack of folders/files, no people", "hero"),
  slot("advisory/portfolio-inline",    "images/services/advisory/portfolio-inline.jpg",    "Strategy planning notes",              "Forge Point Real Estate", "strategy planning notes whiteboard",          ["corporate team","model"],               "Notes, plans, written materials", "inline"),
  slot("advisory/portfolio-gallery-1", "images/services/advisory/portfolio-gallery-1.jpg", "Property file folder stack",            "Forge Point Real Estate", "property file folder stack",                  ["model","office worker smiling"],        "Documents in folders, top-down", "gallery"),
  slot("advisory/portfolio-gallery-2", "images/services/advisory/portfolio-gallery-2.jpg", "Calculator and data sheet",             "Forge Point Real Estate", "calculator property data sheet",              ["model","corporate"],                    "Calculator, paper, real working materials", "gallery"),
  slot("advisory/portfolio-gallery-3", "images/services/advisory/portfolio-gallery-3.jpg", "Commercial or multifamily exterior",   "Forge Point Real Estate", "commercial property exterior multifamily",     ["mansion","luxury","palm"],              "Commercial or multifamily building exterior", "gallery"),

  // ── Advisory / Commercial Leasing ────────────────────────────────────────
  slot("advisory/commercial-leasing-hero",      "images/services/advisory/commercial-leasing-hero.jpg",      "Mid-rise commercial building",         "Forge Point Real Estate", "mid rise commercial office building exterior", ["skyscraper Manhattan","dubai","palm"],   "3-6 story commercial building, suburban/small-city", "hero"),
  slot("advisory/commercial-leasing-inline",    "images/services/advisory/commercial-leasing-inline.jpg",    "Commercial lease document",            "Forge Point Real Estate", "commercial lease document with pen",           ["model","handshake"],                    "Lease paperwork, real document", "inline"),
  slot("advisory/commercial-leasing-gallery-1", "images/services/advisory/commercial-leasing-gallery-1.jpg", "Vacant retail storefront for lease",   "Forge Point Real Estate", "empty commercial space windows for lease",     ["mall","crowded","tourist","luxury retail"],  "Empty retail space with for-lease signage", "gallery"),
  slot("advisory/commercial-leasing-gallery-2", "images/services/advisory/commercial-leasing-gallery-2.jpg", "Office park exterior parking lot",      "Forge Point Real Estate", "office park exterior parking lot",            ["skyscraper","palm","dubai"],            "Suburban office park, parking visible", "gallery"),
  slot("advisory/commercial-leasing-gallery-3", "images/services/advisory/commercial-leasing-gallery-3.jpg", "Commercial building entry sign",        "Forge Point Real Estate", "office building entrance signage suburban",    ["skyscraper","dubai","palm","crowded"],  "Generic commercial building entrance", "gallery"),

  // ── Advisory / 1031 Exchange ──────────────────────────────────────────────
  slot("advisory/1031-hero",      "images/services/advisory/1031-hero.jpg",      "Tax documents with calendar deadline",  "Forge Point Real Estate", "tax documents calendar deadline",        ["model","corporate"],       "Documents with calendar visible", "hero"),
  slot("advisory/1031-inline",    "images/services/advisory/1031-inline.jpg",    "Tax preparation paperwork on desk",     "Forge Point Real Estate", "tax preparation paperwork desk",          ["model","team meeting"],     "Documents on desk, no people", "inline"),
  slot("advisory/1031-gallery-1", "images/services/advisory/1031-gallery-1.jpg", "Investment rental property exterior",   "Forge Point Real Estate", "investment rental property exterior",     ["mansion","palm"],           "Modest residential investment property", "gallery"),
  slot("advisory/1031-gallery-2", "images/services/advisory/1031-gallery-2.jpg", "Real estate closing documents",         "Forge Point Real Estate", "real estate exchange closing documents",  ["model","handshake"],        "Stack of documents", "gallery"),
  slot("advisory/1031-gallery-3", "images/services/advisory/1031-gallery-3.jpg", "Calendar with deadline notes",          "Forge Point Real Estate", "calendar deadline marked notes",          ["holiday","model"],          "Calendar with notes/markings", "gallery"),

  // ── Property Management / Overview ────────────────────────────────────────
  slot("pm/overview-hero",   "images/services/pm/pm-overview-hero.jpg",   "Property manager walking past building", "Property & Portfolio Management", "property manager walking apartment building", ["model","posed"],   "Person from behind walking toward/past building", "hero"),
  slot("pm/overview-inline", "images/services/pm/pm-overview-inline.jpg", "Inspection clipboard pen detail",        "Property & Portfolio Management", "inspection clipboard pen detail",             ["model","corporate"],"Clipboard close-up, hands at edge OK", "inline"),

  // ── Property Management / Commercial & Industrial ─────────────────────────
  slot("pm/commercial-industrial-hero",      "images/services/pm/commercial-industrial-hero.jpg",      "Industrial warehouse exterior morning",  "Property & Portfolio Management", "warehouse loading dock exterior gray sky",     ["dubai","port containers","factory china","skyscraper","palm"], "Suburban or rural warehouse, low-rise", "hero"),
  slot("pm/commercial-industrial-inline",    "images/services/pm/commercial-industrial-inline.jpg",    "Suburban office park exterior",          "Property & Portfolio Management", "office park exterior parking lot suburban", ["skyscraper","palm","dubai"],              "Office park, low-rise, suburban", "inline"),
  slot("pm/commercial-industrial-gallery-1", "images/services/pm/commercial-industrial-gallery-1.jpg", "Loading dock with truck at warehouse",   "Property & Portfolio Management", "loading dock truck warehouse",             ["port","cargo ship","container yard"],     "Single warehouse with truck at dock", "gallery"),
  slot("pm/commercial-industrial-gallery-2", "images/services/pm/commercial-industrial-gallery-2.jpg", "Retail strip mall exterior daylight",    "Property & Portfolio Management", "retail strip mall exterior daylight",       ["tourist","crowded","palm"],               "Suburban strip mall", "gallery"),
  slot("pm/commercial-industrial-gallery-3", "images/services/pm/commercial-industrial-gallery-3.jpg", "Flex space industrial building",         "Property & Portfolio Management", "flex space industrial building",            ["factory china","port"],                  "Single-tenant industrial flex building", "gallery"),

  // ── Property Management / Multifamily & HOA ──────────────────────────────
  slot("pm/multifamily-hoa-hero",      "images/services/pm/multifamily-hoa-hero.jpg",      "Apartment complex exterior residential",  "Property & Portfolio Management", "apartment complex exterior daylight residential", ["dubai","mansion","mediterranean palm"],  "2-3 story apartment building, walkable", "hero"),
  slot("pm/multifamily-hoa-inline",    "images/services/pm/multifamily-hoa-inline.jpg",    "Apartment courtyard maintained",          "Property & Portfolio Management", "apartment community courtyard maintained",        ["pool resort","tourist"],                  "Common area with planters, walkways", "inline"),
  slot("pm/multifamily-hoa-gallery-1", "images/services/pm/multifamily-hoa-gallery-1.jpg", "Townhome row community",                  "Property & Portfolio Management", "townhome row residential community",             ["mansion","luxury","palm"],               "Row of townhomes, modest scale", "gallery"),
  slot("pm/multifamily-hoa-gallery-2", "images/services/pm/multifamily-hoa-gallery-2.jpg", "Apartment building entrance walkway",     "Property & Portfolio Management", "apartment building entrance walkway",             ["model","palm","tropical"],               "Building entry, walkway, plantings", "gallery"),
  slot("pm/multifamily-hoa-gallery-3", "images/services/pm/multifamily-hoa-gallery-3.jpg", "Condo community common area",             "Property & Portfolio Management", "condo community common area",                    ["pool resort","palm","mediterranean"],    "Common area, residential scale", "gallery"),

  // ── Property Management / Single Family Home ──────────────────────────────
  slot("pm/sfh-hero",      "images/services/pm/sfh-hero.jpg",      "Suburban single family home",           "Property & Portfolio Management", "suburban single family home residential street", ["mansion","luxury","palm"],              "Modest 3-4 bed home, suburban", "hero"),
  slot("pm/sfh-inline",    "images/services/pm/sfh-inline.jpg",    "Front porch entry home daylight",       "Property & Portfolio Management", "front porch entry home daylight",               ["victorian decoration","holiday"],       "Real porch, real home, no people", "inline"),
  slot("pm/sfh-gallery-1", "images/services/pm/sfh-gallery-1.jpg", "Colorado suburban home neighborhood",   "Property & Portfolio Management", "colorado suburban home neighborhood",           ["mansion","palm","mediterranean"],       "Modest home in real neighborhood", "gallery"),
  slot("pm/sfh-gallery-2", "images/services/pm/sfh-gallery-2.jpg", "For rent sign residential lawn",        "Property & Portfolio Management", "for rent sign residential lawn",                ["model holding sign","palm"],            "Yard sign, lawn, suburban", "gallery"),
  slot("pm/sfh-gallery-3", "images/services/pm/sfh-gallery-3.jpg", "Home exterior backyard fenced",         "Property & Portfolio Management", "home exterior backyard fenced",                 ["pool resort","palm","luxury"],          "Modest backyard with fence visible", "gallery"),

  // ── Property Management / Boots on Ground ────────────────────────────────
  slot("pm/boots-on-ground-hero",      "images/services/pm/boots-on-ground-hero.jpg",      "Worker walking property with tablet",      "Property & Portfolio Management", "worker walking property tablet inspection",   ["model smiling","corporate"],            "Worker outdoors with tablet, eyes on property", "hero"),
  slot("pm/boots-on-ground-inline",    "images/services/pm/boots-on-ground-inline.jpg",    "Property assessment exterior",             "Property & Portfolio Management", "property manager hardhat exterior inspection", ["disaster news","tornado","model smiling","corporate"], "Worker examining building feature", "inline"),
  slot("pm/boots-on-ground-gallery-1", "images/services/pm/boots-on-ground-gallery-1.jpg", "Storm damage assessment at house",         "Property & Portfolio Management", "hail damage roof shingles inspection",         ["disaster news","tornado","flooding","catastrophic"],   "Visible weather damage, contractor assessing", "gallery"),
  slot("pm/boots-on-ground-gallery-2", "images/services/pm/boots-on-ground-gallery-2.jpg", "Contractor on phone at jobsite",            "Property & Portfolio Management", "property manager phone notebook outdoor",       ["office","corporate","model smiling","handshake"],      "Worker on phone outdoors at property", "gallery"),
  slot("pm/boots-on-ground-gallery-3", "images/services/pm/boots-on-ground-gallery-3.jpg", "Service truck at residential property",    "Property & Portfolio Management", "service van pickup truck residential driveway", ["delivery package","amazon","model smiling"],           "Service truck or van at residential property", "gallery"),

  // ── Property Management / Maintenance Coordination ────────────────────────
  slot("pm/maintenance-coord-hero",      "images/services/pm/maintenance-coord-hero.jpg",      "Maintenance tech with toolbox at entry",  "Property & Portfolio Management", "toolbox open tools residential porch",             ["model smiling","corporate","commercial ad","staged"], "Worker at door with tools, from side or behind", "hero"),
  slot("pm/maintenance-coord-inline",    "images/services/pm/maintenance-coord-inline.jpg",    "Tradesman hands on tablet work order",   "Property & Portfolio Management", "work order tablet greasy hands jobsite",            ["office desk","model","corporate","clean hands"],      "Hands holding tablet, work order on screen", "inline"),
  slot("pm/maintenance-coord-gallery-1", "images/services/pm/maintenance-coord-gallery-1.jpg", "HVAC tech at outdoor unit",              "Property & Portfolio Management", "hvac technician at outdoor unit",                  ["model","corporate ad"],       "Worker servicing AC unit", "gallery"),
  slot("pm/maintenance-coord-gallery-2", "images/services/pm/maintenance-coord-gallery-2.jpg", "Plumber under sink with wrench",         "Property & Portfolio Management", "plumber wrench pipe under sink real",              ["model smiling","staged","commercial ad"], "Plumber working, hands on pipes", "gallery"),
  slot("pm/maintenance-coord-gallery-3", "images/services/pm/maintenance-coord-gallery-3.jpg", "Electrician at electrical panel",        "Property & Portfolio Management", "electrician electrical panel work",                ["model","safety ad"],          "Electrician at panel, real work in progress", "gallery"),

  // ── Custom Interiors / Renovation & Remodel ──────────────────────────────
  slot("interiors/renovation-hero",      "images/services/interiors/renovation-hero.jpg",      "Home renovation in progress, exposed framing",  "Custom Interiors", "gut renovation exposed studs drywall dust",         ["staged finished","luxury","magazine","model"],  "Mid-renovation interior, exposed framing", "hero"),
  slot("interiors/renovation-inline",    "images/services/interiors/renovation-inline.jpg",    "Construction tools on floor",                   "Custom Interiors", "renovation tools sawdust hardwood floor",            ["staged","magazine","luxury","model"],           "Tools on floor, work-in-progress", "inline"),
  slot("interiors/renovation-gallery-1", "images/services/interiors/renovation-gallery-1.jpg", "Gut renovation exposed studs",                   "Custom Interiors", "interior demolition exposed studs partial",         ["staged","luxury","magazine cover","finished room"], "Studs visible, drywall removed", "gallery"),
  slot("interiors/renovation-gallery-2", "images/services/interiors/renovation-gallery-2.jpg", "Worker installing drywall",                      "Custom Interiors", "drywall sheet installation screws tools",           ["model","posed","commercial ad","luxury"],       "Worker holding/installing drywall sheet", "gallery"),
  slot("interiors/renovation-gallery-3", "images/services/interiors/renovation-gallery-3.jpg", "Finished interior, modest",                       "Custom Interiors", "home renovation finished interior simple",          ["luxury","mansion","magazine"],                  "Modest finished space, not over-styled", "gallery"),

  // ── Custom Interiors / Framing & Finishes ────────────────────────────────
  slot("interiors/framing-hero",      "images/services/interiors/framing-hero.jpg",      "Wood framing house construction",        "Custom Interiors", "wood framing house construction",          ["model","commercial"],        "New wood framing, sun through studs", "hero"),
  slot("interiors/framing-inline",    "images/services/interiors/framing-inline.jpg",    "Trim carpentry crown molding install",   "Custom Interiors", "trim carpentry crown molding installation", ["staged","magazine"],          "Hands installing trim, real work", "inline"),
  slot("interiors/framing-gallery-1", "images/services/interiors/framing-gallery-1.jpg", "Drywall installation at wall corner",    "Custom Interiors", "drywall installation wall corner",          ["model","staged"],             "Drywall going up, screws/tools visible", "gallery"),
  slot("interiors/framing-gallery-2", "images/services/interiors/framing-gallery-2.jpg", "Crown molding corner detail",            "Custom Interiors", "baseboard trim installation hammer nail",    ["staged","magazine","luxury","model"], "Trim detail, real installation", "gallery"),
  slot("interiors/framing-gallery-3", "images/services/interiors/framing-gallery-3.jpg", "Paint roller on wall",                   "Custom Interiors", "paint roller drop cloth ladder room",        ["model","commercial ad","staged","luxury"], "Roller on wall, paint can visible", "gallery"),

  // ── Custom Interiors / Kitchen & Bath ────────────────────────────────────
  slot("interiors/kitchen-bath-hero",      "images/services/interiors/kitchen-bath-hero.jpg",      "Kitchen renovation new cabinets",    "Custom Interiors", "kitchen renovation new cabinets",          ["magazine luxury","dream kitchen"],   "Modest renovated kitchen, real materials", "hero"),
  slot("interiors/kitchen-bath-inline",    "images/services/interiors/kitchen-bath-inline.jpg",    "Bathroom renovation tile install",   "Custom Interiors", "bathroom renovation tile installation",     ["luxury spa","magazine"],             "Bathroom mid-renovation or recent", "inline"),
  slot("interiors/kitchen-bath-gallery-1", "images/services/interiors/kitchen-bath-gallery-1.jpg", "Kitchen island countertop cabinets", "Custom Interiors", "kitchen island countertop cabinets",        ["luxury","magazine","dream"],         "Real kitchen, mid-range finishes", "gallery"),
  slot("interiors/kitchen-bath-gallery-2", "images/services/interiors/kitchen-bath-gallery-2.jpg", "Bathroom vanity sink fixture",       "Custom Interiors", "bathroom vanity sink fixture",              ["luxury spa","magazine"],             "Real bathroom vanity", "gallery"),
  slot("interiors/kitchen-bath-gallery-3", "images/services/interiors/kitchen-bath-gallery-3.jpg", "Kitchen backsplash tile detail",     "Custom Interiors", "kitchen backsplash tile detail",            ["luxury","magazine"],                 "Backsplash close-up, real install", "gallery"),

  // ── Custom Interiors / Basement Finishing ────────────────────────────────
  slot("interiors/basement-hero",      "images/services/interiors/basement-hero.jpg",      "Finished basement family room",       "Custom Interiors", "basement framing in progress concrete walls", ["luxury","mansion","magazine","staged finished"], "Real basement living space, modest scale", "hero"),
  slot("interiors/basement-inline",    "images/services/interiors/basement-inline.jpg",    "Basement bar installation",           "Custom Interiors", "basement bar installation",                ["luxury","mansion"],             "Basement bar, real materials", "inline"),
  slot("interiors/basement-gallery-1", "images/services/interiors/basement-gallery-1.jpg", "Basement media room couch TV",        "Custom Interiors", "basement drywall installation framing",     ["luxury home theater","magazine","staged"], "Modest basement TV area", "gallery"),
  slot("interiors/basement-gallery-2", "images/services/interiors/basement-gallery-2.jpg", "Basement bedroom egress window",      "Custom Interiors", "basement bedroom egress window",           ["luxury","magazine"],             "Basement bedroom, regular finishes", "gallery"),
  slot("interiors/basement-gallery-3", "images/services/interiors/basement-gallery-3.jpg", "Home gym in basement",                "Custom Interiors", "home gym basement equipment",              ["commercial gym","luxury"],       "Modest home gym setup", "gallery"),

  // ── Custom Interiors / Additions & Expansions ────────────────────────────
  slot("interiors/additions-hero",      "images/services/interiors/additions-hero.jpg",      "Home addition new construction",      "Custom Interiors", "home addition framing wrap exposed sheathing", ["mansion","luxury","palm","completed"],  "New addition under construction or recent", "hero"),
  slot("interiors/additions-inline",    "images/services/interiors/additions-inline.jpg",    "Sunroom interior windows daylight",   "Custom Interiors", "sunroom interior windows daylight",      ["luxury","magazine"],          "Modest sunroom, real", "inline"),
  slot("interiors/additions-gallery-1", "images/services/interiors/additions-gallery-1.jpg", "Home expansion framing exterior",     "Custom Interiors", "second story addition framing house",    ["mansion","luxury","completed","palm"],  "Addition framing visible", "gallery"),
  slot("interiors/additions-gallery-2", "images/services/interiors/additions-gallery-2.jpg", "Master bedroom addition large window","Custom Interiors", "master bedroom addition large window",   ["luxury suite","mansion"],     "Bedroom with addition feel", "gallery"),
  slot("interiors/additions-gallery-3", "images/services/interiors/additions-gallery-3.jpg", "Garage apartment exterior",           "Custom Interiors", "garage apartment exterior",              ["mansion","luxury"],           "Above-garage living space exterior", "gallery"),

  // ── Custom Interiors / Investment Property Rehab ──────────────────────────
  slot("interiors/investment-rehab-hero",      "images/services/interiors/investment-rehab-hero.jpg",      "Rental property renovation empty",     "Custom Interiors", "rental property renovation interior empty", ["luxury","magazine","staged"], "Empty interior mid-renovation", "hero"),
  slot("interiors/investment-rehab-inline",    "images/services/interiors/investment-rehab-inline.jpg",    "New flooring installation rental",     "Custom Interiors", "new flooring installation rental",          ["luxury","magazine"],          "Floor going down, tools visible", "inline"),
  slot("interiors/investment-rehab-gallery-1", "images/services/interiors/investment-rehab-gallery-1.jpg", "Painted rental kitchen white cabinets","Custom Interiors", "painted rental kitchen white cabinets",     ["luxury","magazine"],          "Modest rental kitchen, fresh paint", "gallery"),
  slot("interiors/investment-rehab-gallery-2", "images/services/interiors/investment-rehab-gallery-2.jpg", "Updated rental bathroom basic",        "Custom Interiors", "updated rental bathroom basic",             ["luxury spa","magazine"],      "Basic refreshed bathroom", "gallery"),
  slot("interiors/investment-rehab-gallery-3", "images/services/interiors/investment-rehab-gallery-3.jpg", "Investment home exterior fresh paint",  "Custom Interiors", "investment home exterior fresh paint",      ["mansion","luxury"],           "Modest home, exterior refresh", "gallery"),

  // ── Custom Interiors / Flooring & Tile ───────────────────────────────────
  slot("interiors/flooring-tile-hero",      "images/services/interiors/flooring-tile-hero.jpg",      "Hardwood floor installation in progress","Custom Interiors", "hardwood plank installation tools tongue groove", ["luxury","magazine","staged room","mansion"], "Floor partially installed, tools/cuts visible", "hero"),
  slot("interiors/flooring-tile-inline",    "images/services/interiors/flooring-tile-inline.jpg",    "Tile floor pattern installation",        "Custom Interiors", "tile spacers grout floor installation hands",    ["luxury","magazine","mansion","commercial ad"], "Tile being laid, spacers visible", "inline"),
  slot("interiors/flooring-tile-gallery-1", "images/services/interiors/flooring-tile-gallery-1.jpg", "Luxury vinyl plank installation",        "Custom Interiors", "luxury vinyl plank installation",          ["magazine","staged room"],     "LVP installation in progress", "gallery"),
  slot("interiors/flooring-tile-gallery-2", "images/services/interiors/flooring-tile-gallery-2.jpg", "Bathroom tile installation with grout",  "Custom Interiors", "bathroom tile installation grout",         ["magazine","staged"],          "Bathroom tile work in progress", "gallery"),
  slot("interiors/flooring-tile-gallery-3", "images/services/interiors/flooring-tile-gallery-3.jpg", "Finished hardwood floor empty room",     "Custom Interiors", "hardwood floor partial install row",        ["luxury","magazine","mansion","staged"], "Empty room with finished floor", "gallery"),

  // ── Outdoor / Landscape Design & Install ─────────────────────────────────
  slot("outdoor/landscape-hero",      "images/services/outdoor/landscape-hero.jpg",      "Xeriscape Colorado front yard",          "Outdoor Living & Grounds", "front range xeriscape gravel native grasses",  ["tropical","english garden","palm","manicured lawn"], "Xeriscape with rocks, native plants", "hero"),
  slot("outdoor/landscape-inline",    "images/services/outdoor/landscape-inline.jpg",    "Landscaper installing plants",           "Outdoor Living & Grounds", "landscaper installing plants shovel",         ["model","posed"],                   "Worker planting, hands or back to camera", "inline"),
  slot("outdoor/landscape-gallery-1", "images/services/outdoor/landscape-gallery-1.jpg", "Native plants garden bed with mulch",    "Outdoor Living & Grounds", "prairie grass blue grama native bed",         ["tropical","english garden","palm"], "Native plantings, mulch visible", "gallery"),
  slot("outdoor/landscape-gallery-2", "images/services/outdoor/landscape-gallery-2.jpg", "Sod installation lawn rolls",            "Outdoor Living & Grounds", "sod installation residential lawn",           ["model","staged"],                  "Sod rolls being laid", "gallery"),
  slot("outdoor/landscape-gallery-3", "images/services/outdoor/landscape-gallery-3.jpg", "Drip irrigation tubing installation",   "Outdoor Living & Grounds", "drip line emitter mulch garden install",       ["model","commercial ad","sprinkler","tropical"],  "Irrigation lines visible at install", "gallery"),

  // ── Outdoor / Decks, Pergolas & Patios ───────────────────────────────────
  slot("outdoor/decks-hero",      "images/services/outdoor/decks-hero.jpg",      "Composite deck with mountain view",     "Outdoor Living & Grounds", "deck construction joists boards backyard",  ["tropical","oceanfront","palm","resort"],  "Real deck, mountain or open view", "hero"),
  slot("outdoor/decks-inline",    "images/services/outdoor/decks-inline.jpg",    "Pergola wood structure backyard",       "Outdoor Living & Grounds", "pergola wood structure backyard",          ["tropical","wedding","magazine"],  "Pergola in real backyard", "inline"),
  slot("outdoor/decks-gallery-1", "images/services/outdoor/decks-gallery-1.jpg", "Paver patio fire pit backyard",         "Outdoor Living & Grounds", "paver patio fire pit backyard",            ["luxury resort","tropical"],       "Patio with fire pit, real backyard", "gallery"),
  slot("outdoor/decks-gallery-2", "images/services/outdoor/decks-gallery-2.jpg", "Cedar deck railing installation",       "Outdoor Living & Grounds", "cedar deck railing installation",          ["magazine","staged"],              "Deck under construction or recent", "gallery"),
  slot("outdoor/decks-gallery-3", "images/services/outdoor/decks-gallery-3.jpg", "Pergola with string lights evening",    "Outdoor Living & Grounds", "pergola wood beams backyard residential",   ["wedding","event venue","tropical","resort"], "Real pergola, simple string lights", "gallery"),

  // ── Outdoor / Custom Water Features ──────────────────────────────────────
  slot("outdoor/water-features-hero",      "images/services/outdoor/water-features-hero.jpg",      "Pondless waterfall garden rocks",     "Outdoor Living & Grounds", "natural stone waterfall backyard pond",    ["tropical resort","commercial fountain","mall","mansion"],  "Waterfall in real garden setting", "hero"),
  slot("outdoor/water-features-inline",    "images/services/outdoor/water-features-inline.jpg",    "Koi pond residential backyard",       "Outdoor Living & Grounds", "backyard pond stones water plants",        ["commercial garden","tropical resort","mansion"],    "Real koi pond, residential scale", "inline"),
  slot("outdoor/water-features-gallery-1", "images/services/outdoor/water-features-gallery-1.jpg", "Garden stream feature with rocks",    "Outdoor Living & Grounds", "stream rocks landscape backyard",          ["commercial","tropical resort","mountain wild"],    "Stream in landscape", "gallery"),
  slot("outdoor/water-features-gallery-2", "images/services/outdoor/water-features-gallery-2.jpg", "Stone fountain in garden basin",      "Outdoor Living & Grounds", "stone basin water bubbler garden",          ["commercial fountain","mall","mansion","tropical"],  "Real residential fountain", "gallery"),
  slot("outdoor/water-features-gallery-3", "images/services/outdoor/water-features-gallery-3.jpg", "Backyard pond with water lilies",     "Outdoor Living & Grounds", "backyard pond water lilies",           ["commercial","tropical resort"],    "Backyard pond, residential scale", "gallery"),

  // ── Outdoor / Fencing & Retaining Walls ──────────────────────────────────
  slot("outdoor/fencing-hero",      "images/services/outdoor/fencing-hero.jpg",      "Cedar privacy fence backyard",         "Outdoor Living & Grounds", "cedar fence boards installation residential", ["mansion","luxury","tropical","white picket"],    "New cedar fence, real backyard", "hero"),
  slot("outdoor/fencing-inline",    "images/services/outdoor/fencing-inline.jpg",    "Wood fence installation post visible", "Outdoor Living & Grounds", "fence post hole concrete shovel",              ["model","staged","mansion","white picket"],       "Fence going in, post visible", "inline"),
  slot("outdoor/fencing-gallery-1", "images/services/outdoor/fencing-gallery-1.jpg", "Wrought iron fence gate residential",  "Outdoor Living & Grounds", "wrought iron fence gate residential",      ["mansion","victorian decoration"], "Iron fence section, real property", "gallery"),
  slot("outdoor/fencing-gallery-2", "images/services/outdoor/fencing-gallery-2.jpg", "Block retaining wall landscape",       "Outdoor Living & Grounds", "stacked block retaining wall residential",  ["commercial","parking lot","mansion","tropical"],  "Retaining wall in residential context", "gallery"),
  slot("outdoor/fencing-gallery-3", "images/services/outdoor/fencing-gallery-3.jpg", "Board on board wood fence detail",     "Outdoor Living & Grounds", "board on board cedar fence detail",         ["mansion","luxury","white picket","tropical"],    "Wood fence detail", "gallery"),

  // ── Outdoor / Grounds Maintenance ────────────────────────────────────────
  slot("outdoor/grounds-hero",      "images/services/outdoor/grounds-hero.jpg",      "Commercial lawn mower on lawn",        "Outdoor Living & Grounds", "push mower stripes residential lawn",      ["model smiling","commercial ad","golf course","perfect lawn"], "Mower on lawn, worker behind/side", "hero"),
  slot("outdoor/grounds-inline",    "images/services/outdoor/grounds-inline.jpg",    "Lawn edging tool in progress",         "Outdoor Living & Grounds", "lawn edging tool work in progress",       ["model","staged"],                 "Edger in use, real work", "inline"),
  slot("outdoor/grounds-gallery-1", "images/services/outdoor/grounds-gallery-1.jpg", "Fresh mulch installed in garden bed",  "Outdoor Living & Grounds", "wheelbarrow mulch garden bed shovel",      ["staged","magazine","commercial ad","model"],  "Fresh mulch in bed", "gallery"),
  slot("outdoor/grounds-gallery-2", "images/services/outdoor/grounds-gallery-2.jpg", "Fall leaf cleanup with rake",          "Outdoor Living & Grounds", "fall leaves cleanup rake yard",           ["staged kids playing","model"],    "Real leaf cleanup, tools visible", "gallery"),
  slot("outdoor/grounds-gallery-3", "images/services/outdoor/grounds-gallery-3.jpg", "Hedge trimmer work landscaping",       "Outdoor Living & Grounds", "hedge trimmer cutting shrub residential",  ["model","staged","commercial ad","golf course"], "Trimmer in use on hedges", "gallery"),

  // ── Outdoor / Industrial Maintenance ─────────────────────────────────────
  slot("outdoor/industrial-hero",      "images/services/outdoor/industrial-hero.jpg",      "Parking lot striping line painting",   "Outdoor Living & Grounds", "freshly painted parking lines lot",         ["airport","racetrack","commercial ad","tourist"],  "Real parking lot with fresh striping", "hero"),
  slot("outdoor/industrial-inline",    "images/services/outdoor/industrial-inline.jpg",    "Concrete pressure washing",            "Outdoor Living & Grounds", "concrete loading dock pressure spray",       ["model","commercial ad","staged","new concrete"],  "Concrete being cleaned, water spray", "inline"),
  slot("outdoor/industrial-gallery-1", "images/services/outdoor/industrial-gallery-1.jpg", "Parking lot sweeper truck",            "Outdoor Living & Grounds", "sweeper truck parking lot pavement",        ["airport","news media","tourist"],             "Sweeper truck on lot", "gallery"),
  slot("outdoor/industrial-gallery-2", "images/services/outdoor/industrial-gallery-2.jpg", "Loading dock cleaning concrete",       "Outdoor Living & Grounds", "warehouse loading dock concrete pad",        ["model","staged","port containers"],           "Loading dock area being maintained", "gallery"),
  slot("outdoor/industrial-gallery-3", "images/services/outdoor/industrial-gallery-3.jpg", "Warehouse floor scrubber machine",     "Outdoor Living & Grounds", "floor scrubber industrial concrete in use",  ["commercial ad","model","new floor"],          "Floor scrubbing equipment in use", "gallery"),

  // ── Outdoor / Pressure Washing & Windows ─────────────────────────────────
  slot("outdoor/pressure-wash-hero",      "images/services/outdoor/pressure-wash-hero.jpg",      "Pressure washer cleaning driveway",      "Outdoor Living & Grounds", "pressure washer driveway streak before after", ["model","commercial ad","new concrete"],  "Pressure washer in use, before-after visible", "hero"),
  slot("outdoor/pressure-wash-inline",    "images/services/outdoor/pressure-wash-inline.jpg",    "Window cleaning with squeegee",          "Outdoor Living & Grounds", "window squeegee streak water residential",     ["model","commercial ad","skyscraper","mansion"],  "Squeegee on window, real work", "inline"),
  slot("outdoor/pressure-wash-gallery-1", "images/services/outdoor/pressure-wash-gallery-1.jpg", "Deck pressure washing wood boards",      "Outdoor Living & Grounds", "pressure washer wand wood deck spray",         ["model","commercial ad","new deck"],   "Pressure washer on deck boards", "gallery"),
  slot("outdoor/pressure-wash-gallery-2", "images/services/outdoor/pressure-wash-gallery-2.jpg", "House siding soft wash with wand",       "Outdoor Living & Grounds", "vinyl siding wash before after streaks",        ["model","commercial ad","mansion","new house"],  "Wand on siding, water visible", "gallery"),
  slot("outdoor/pressure-wash-gallery-3", "images/services/outdoor/pressure-wash-gallery-3.jpg", "Window squeegee detail, clean glass",    "Outdoor Living & Grounds", "window squeegee close up water",               ["model","magazine","skyscraper"],      "Squeegee on glass, real work", "gallery"),

  // ── Outdoor / Junk Haul Off ───────────────────────────────────────────────
  slot("outdoor/junk-hero",      "images/services/outdoor/junk-hero.jpg",      "Junk removal truck loaded",           "Outdoor Living & Grounds", "loaded box truck junk hauling residential", ["model","news media","commercial ad","disaster"],  "Truck with junk loaded, real work", "hero"),
  slot("outdoor/junk-inline",    "images/services/outdoor/junk-inline.jpg",    "Dumpster in residential driveway",    "Outdoor Living & Grounds", "roll off dumpster house driveway",           ["news media","commercial waste","disaster site"],  "Dumpster on real driveway", "inline"),
  slot("outdoor/junk-gallery-1", "images/services/outdoor/junk-gallery-1.jpg", "Furniture loading onto truck",        "Outdoor Living & Grounds", "furniture loading truck hauling",        ["model smiling","commercial ad"],   "Furniture being moved to truck", "gallery"),
  slot("outdoor/junk-gallery-2", "images/services/outdoor/junk-gallery-2.jpg", "Construction debris pile cleanout",   "Outdoor Living & Grounds", "construction debris pile drywall lumber", ["disaster news","tornado","flooding"],  "Real debris pile, contractor context", "gallery"),
  slot("outdoor/junk-gallery-3", "images/services/outdoor/junk-gallery-3.jpg", "Empty cleared garage before-after",  "Outdoor Living & Grounds", "empty garage swept concrete residential", ["magazine","staged","luxury","commercial"],  "Cleared garage, before-after feel", "gallery"),

  // ── Concierge / Housekeeping ──────────────────────────────────────────────
  slot("concierge/housekeeping-hero",      "images/services/concierge/housekeeping-hero.jpg",      "Clean kitchen counter daylight",       "Concierge & Estate Services", "kitchen counter morning sunlight modest",   ["luxury","magazine","staged","mansion"],  "Real clean kitchen, modest", "hero"),
  slot("concierge/housekeeping-inline",    "images/services/concierge/housekeeping-inline.jpg",    "Cleaning supplies bucket and gloves",  "Concierge & Estate Services", "yellow gloves spray bottle counter",        ["model","commercial ad","staged","luxury"], "Real cleaning supplies on counter", "inline"),
  slot("concierge/housekeeping-gallery-1", "images/services/concierge/housekeeping-gallery-1.jpg", "Vacuum on carpet living room",         "Concierge & Estate Services", "upright vacuum carpet residential simple",  ["model","commercial ad","staged","luxury"], "Vacuum in use or staged on carpet", "gallery"),
  slot("concierge/housekeeping-gallery-2", "images/services/concierge/housekeeping-gallery-2.jpg", "Clean bathroom counter sink fixture",  "Concierge & Estate Services", "bathroom counter sink soap natural light",  ["luxury spa","magazine","mansion","resort"], "Modest clean bathroom", "gallery"),
  slot("concierge/housekeeping-gallery-3", "images/services/concierge/housekeeping-gallery-3.jpg", "Mopping hardwood floor",               "Concierge & Estate Services", "mop bucket hardwood floor real",            ["model","commercial ad","staged","luxury"], "Mop on floor, real work", "gallery"),

  // ── Concierge / Home Safety & Wellness Checks ────────────────────────────
  slot("concierge/home-safety-hero",      "images/services/concierge/home-safety-hero.jpg",      "Smoke detector ceiling test",          "Concierge & Estate Services", "smoke detector ceiling close up button",   ["commercial ad","model","staged","new construction"], "Smoke detector close-up, hands testing", "hero"),
  slot("concierge/home-safety-inline",    "images/services/concierge/home-safety-inline.jpg",    "Door lock check exterior home",        "Concierge & Estate Services", "door lock check exterior home",        ["commercial ad","model"],        "Door lock detail, hand on knob", "inline"),
  slot("concierge/home-safety-gallery-1", "images/services/concierge/home-safety-gallery-1.jpg", "Home walkthrough checklist clipboard", "Concierge & Estate Services", "clipboard pen residential porch entry",    ["model smiling","corporate","staged","commercial ad"], "Worker with clipboard outside home", "gallery"),
  slot("concierge/home-safety-gallery-2", "images/services/concierge/home-safety-gallery-2.jpg", "Mail and packages on front porch",     "Concierge & Estate Services", "mail packages porch front door",       ["holiday","christmas"],          "Packages or mail on real porch", "gallery"),
  slot("concierge/home-safety-gallery-3", "images/services/concierge/home-safety-gallery-3.jpg", "Fire extinguisher inspection",         "Concierge & Estate Services", "fire extinguisher inspection check",   ["commercial ad","model"],        "Extinguisher with hands or alone", "gallery"),

  // ── Concierge / Mobile Auto Detailing ────────────────────────────────────
  slot("concierge/auto-detail-hero",      "images/services/concierge/auto-detail-hero.jpg",      "Car hand washing exterior detail",     "Concierge & Estate Services", "car hand washing exterior detail",     ["commercial ad","model smiling"], "Hands on car with sponge/cloth", "hero"),
  slot("concierge/auto-detail-inline",    "images/services/concierge/auto-detail-inline.jpg",    "Vacuuming car interior seat",          "Concierge & Estate Services", "vacuuming car interior seat",          ["commercial ad","model"],         "Vacuum nozzle in real car interior", "inline"),
  slot("concierge/auto-detail-gallery-1", "images/services/concierge/auto-detail-gallery-1.jpg", "Polishing car paint orbital polisher", "Concierge & Estate Services", "polishing car paint hand orbital",     ["commercial ad","model"],         "Polisher on paint, real detailing", "gallery"),
  slot("concierge/auto-detail-gallery-2", "images/services/concierge/auto-detail-gallery-2.jpg", "Tire shine application",               "Concierge & Estate Services", "tire shine application detail",        ["commercial ad","model"],         "Tire being dressed", "gallery"),
  slot("concierge/auto-detail-gallery-3", "images/services/concierge/auto-detail-gallery-3.jpg", "Clean car interior leather seats",     "Concierge & Estate Services", "clean car interior leather seats",     ["luxury car","magazine","commercial ad"], "Modest clean car interior", "gallery"),

  // ── Concierge / Yard & Pet Waste Management ──────────────────────────────
  slot("concierge/pet-waste-hero",      "images/services/concierge/pet-waste-hero.jpg",      "Dog playing in backyard grass",          "Concierge & Estate Services", "dog playing backyard grass",              ["commercial ad","staged"],   "Real dog in real yard", "hero"),
  slot("concierge/pet-waste-inline",    "images/services/concierge/pet-waste-inline.jpg",    "Picking up after dog in yard",           "Concierge & Estate Services", "picking up after dog yard",               ["commercial ad","model"],    "Real cleanup, hands or tool only", "inline"),
  slot("concierge/pet-waste-gallery-1", "images/services/concierge/pet-waste-gallery-1.jpg", "Dog in backyard grass Colorado",         "Concierge & Estate Services", "dog backyard grass green colorado",       ["commercial ad"],            "Dog in yard, residential", "gallery"),
  slot("concierge/pet-waste-gallery-2", "images/services/concierge/pet-waste-gallery-2.jpg", "Lawn with dog toys residential yard",    "Concierge & Estate Services", "lawn dog toys yard residential",          ["commercial ad"],            "Lawn with toys, real backyard", "gallery"),
  slot("concierge/pet-waste-gallery-3", "images/services/concierge/pet-waste-gallery-3.jpg", "Green grass lawn maintained residential","Concierge & Estate Services", "green grass lawn residential maintained", ["commercial ad","magazine"], "Plain lawn, real residential", "gallery"),

  // ── Concierge / Concierge Errands ────────────────────────────────────────
  slot("concierge/errands-hero",      "images/services/concierge/errands-hero.jpg",      "Grocery bags loading into car trunk",   "Concierge & Estate Services", "grocery bags car trunk loading",           ["commercial ad","model smiling"], "Bags going into trunk, real", "hero"),
  slot("concierge/errands-inline",    "images/services/concierge/errands-inline.jpg",    "Pharmacy counter prescription pickup",  "Concierge & Estate Services", "pharmacy bag prescription bottle counter",  ["commercial ad","model","staged","tourist"],  "Real pharmacy counter context", "inline"),
  slot("concierge/errands-gallery-1", "images/services/concierge/errands-gallery-1.jpg", "Package delivery on porch doorstep",    "Concierge & Estate Services", "package porch delivery doorstep",          ["holiday","christmas","model"],   "Package on real porch", "gallery"),
  slot("concierge/errands-gallery-2", "images/services/concierge/errands-gallery-2.jpg", "Dry cleaning hangers at shop",          "Concierge & Estate Services", "dry cleaning hangers shop",                ["commercial ad","model"],         "Hangers with bagged clothes", "gallery"),
  slot("concierge/errands-gallery-3", "images/services/concierge/errands-gallery-3.jpg", "Shopping bags delivery residential",    "Concierge & Estate Services", "shopping bags handed delivery residential", ["commercial ad","model"],        "Bags being handed off", "gallery"),
];

// ── University slug-level overrides (priority over regex patterns) ──────────
// One entry per article slug that needs targeted imagery.
// These match exactly and run BEFORE the UNI_PATTERNS regexes.

interface UniversityOverride {
  slug: string;
  query: string;
  antiKeywords: string[];
}

const UNI_SLUG_OVERRIDES: UniversityOverride[] = [
  // Lawn, Turf & Grounds
  { slug: "mowing-height-colorado",
    query: "tall grass blade close up macro mower",
    antiKeywords: ["commercial ad","model","golf course","perfect lawn"] },

  { slug: "aerate-overseed-colorado",
    query: "lawn core aeration plugs holes",
    antiKeywords: ["commercial ad","model","new sod"] },

  { slug: "colorado-lawn-fertilization-schedule",
    query: "fertilizer granules grass close up",
    antiKeywords: ["commercial ad","model","spreader product shot"] },

  { slug: "august-lawn-problems-colorado",
    query: "drought stressed lawn brown patches",
    antiKeywords: ["commercial ad","model","irrigation product"] },

  { slug: "clay-soil-northern-colorado",
    query: "cracked dry clay soil ground texture",
    antiKeywords: ["commercial ad","tropical","muddy puddle"] },

  // Landscape & Design
  { slug: "native-plants-northern-colorado",
    query: "blue grama grass native prairie plants",
    antiKeywords: ["tropical","palm","english garden","manicured"] },

  { slug: "drip-vs-spray-irrigation",
    query: "drip irrigation emitter line garden",
    antiKeywords: ["commercial product shot","model","sprinkler"] },

  { slug: "yard-grading-drainage",
    query: "french drain trench gravel pipe",
    antiKeywords: ["commercial ad","flooding","disaster"] },

  { slug: "outdoor-lighting-colorado",
    query: "landscape path lighting evening dusk",
    antiKeywords: ["holiday christmas","wedding","commercial venue"] },

  { slug: "designing-for-water-restrictions",
    query: "xeriscape drought tolerant garden rocks",
    antiKeywords: ["tropical","palm","english garden"] },

  // Fencing
  { slug: "annual-fence-maintenance-colorado",
    query: "weathered cedar fence wood grain",
    antiKeywords: ["commercial ad","new fence","model"] },

  { slug: "repair-leaning-fence-post",
    query: "leaning fence post failed concrete",
    antiKeywords: ["commercial ad","new fence","model"] },

  { slug: "fence-post-depth-colorado",
    query: "fence post hole depth concrete digging",
    antiKeywords: ["commercial ad","model"] },

  { slug: "cedar-vinyl-metal-fence-colorado",
    query: "cedar wood fence detail close up grain",
    antiKeywords: ["mansion","luxury","tropical"] },

  // Property Maintenance
  { slug: "winterize-irrigation-colorado",
    query: "sprinkler head frost ice frozen",
    antiKeywords: ["commercial ad","summer","model"] },

  { slug: "spring-property-checklist",
    query: "rake fallen branches yard cleanup",
    antiKeywords: ["staged kids","commercial ad","model"] },

  { slug: "clean-concrete-driveway",
    query: "oil stain concrete driveway weathered",
    antiKeywords: ["commercial ad","new concrete","model"] },

  { slug: "gutter-maintenance-colorado",
    query: "clogged gutter leaves debris roofline",
    antiKeywords: ["commercial ad","new gutter","model"] },

  // Seasonal Guides
  { slug: "spring-yard-prep-colorado",
    query: "early spring lawn dormant tools",
    antiKeywords: ["staged kids","commercial ad","perfect lawn"] },

  { slug: "colorado-summer-landscape-survival",
    query: "drought stressed plants harsh sun",
    antiKeywords: ["tropical","commercial ad","perfect lawn"] },

  { slug: "winter-property-prep-colorado",
    query: "snow covered house exterior mountain",
    antiKeywords: ["holiday christmas","ski resort","tourist"] },

  // Colorado Property Guide
  { slug: "why-colorado-properties-different",
    query: "front range foothills home exterior",
    antiKeywords: ["mansion","tourist","ski resort","palm"] },

  { slug: "colorado-water-restrictions-xeriscape",
    query: "xeriscape gravel succulents native",
    antiKeywords: ["tropical","palm","english garden"] },

  { slug: "front-range-wind-property-effects",
    query: "wind damaged fence broken board",
    antiKeywords: ["disaster news","tornado","tropical storm"] },

  { slug: "colorado-climate-property-guide",
    query: "colorado home hailstorm sky",
    antiKeywords: ["mansion","tourist","ski resort"] },

  { slug: "what-makes-colorado-real-estate-different",
    query: "front range foothills neighborhood aerial",
    antiKeywords: ["mansion","tourist","ski resort","palm"] },

  // HOA & Commercial
  { slug: "document-maintenance-hoa-board",
    query: "clipboard inspection notes property",
    antiKeywords: ["model smiling","corporate meeting","handshake"] },

  { slug: "commercial-industrial-property-management",
    query: "industrial warehouse exterior overhead doors",
    antiKeywords: ["dubai","skyscraper","port containers","palm"] },

  { slug: "hoa-landscaping-standards",
    query: "townhome community common area landscaping",
    antiKeywords: ["mansion","luxury resort","palm","tropical"] },

  { slug: "hiring-commercial-property-maintenance-contractor",
    query: "contractor commercial building inspection",
    antiKeywords: ["model smiling","handshake","corporate"] },

  // Outdoor Structures
  { slug: "composite-vs-wood-decking-colorado",
    query: "composite deck board sample wood",
    antiKeywords: ["tropical","oceanfront","resort"] },

  { slug: "junk-haul-off-vs-dumpster-rental",
    query: "roll off dumpster residential driveway",
    antiKeywords: ["commercial waste site","disaster","model"] },

  { slug: "retaining-walls-colorado",
    query: "stacked stone retaining wall residential",
    antiKeywords: ["commercial","parking lot","mansion"] },

  // Property Management
  { slug: "boots-on-ground-property-management",
    query: "property manager walking tablet building",
    antiKeywords: ["corporate office","model smiling","handshake"] },

  { slug: "reduce-tenant-turnover-rental-property",
    query: "for rent sign duplex residential exterior",
    antiKeywords: ["mansion","luxury","palm","tropical"] },

  // Investment Strategy & BRRRR
  { slug: "brrrr-property-checklist-northern-colorado",
    query: "distressed house exterior peeling paint",
    antiKeywords: ["mansion","luxury","tropical","abandoned ruins"] },

  // Renovation & Rehab ROI
  { slug: "renovations-that-pay-back-northern-colorado",
    query: "renovation tools paint cans drop cloth",
    antiKeywords: ["luxury","magazine cover","staged"] },

  { slug: "kitchen-bath-remodel-roi-northern-colorado",
    query: "kitchen renovation new cabinets midrange",
    antiKeywords: ["luxury","magazine","mansion","dream kitchen"] },

  { slug: "flooring-rental-property-northern-colorado",
    query: "luxury vinyl plank flooring installation",
    antiKeywords: ["luxury home","magazine","mansion"] },

  // Outdoor Living & Landscape
  { slug: "landscape-roi-northern-colorado-home-value",
    query: "front yard mature landscape colorado home",
    antiKeywords: ["mansion","luxury resort","palm","tropical"] },

  { slug: "deck-patio-cost-roi-colorado",
    query: "wood deck backyard residential simple",
    antiKeywords: ["tropical","oceanfront","resort","mansion"] },

  { slug: "water-smart-landscaping-northern-colorado",
    query: "drought tolerant native garden colorado",
    antiKeywords: ["tropical","palm","english garden","manicured"] },
];

function getUniversityOverride(slug: string): { query: string; antiKeywords: string[] } | null {
  const match = UNI_SLUG_OVERRIDES.find(o => o.slug === slug);
  return match ? { query: match.query, antiKeywords: match.antiKeywords } : null;
}

// ── University slug → query mapping ──────────────────────────────────────────

interface UniversityPattern {
  test:         RegExp;
  query:        string;
  antiKeywords: string[];
}

const UNI_PATTERNS: UniversityPattern[] = [
  { test: /lawn|mow|turf/,              query: "lawn mower residential grass green",         antiKeywords: ["commercial ad","model smiling"] },
  { test: /sod|seed/,                   query: "sod installation lawn rolls",                antiKeywords: ["commercial ad","model"] },
  { test: /clay.soil/,                  query: "clay soil garden hand",                      antiKeywords: ["commercial","model"] },
  { test: /aerat|overseed/,             query: "lawn aerator core plug",                     antiKeywords: ["commercial ad","model"] },
  { test: /fertiliz/,                   query: "lawn fertilizer spreader",                   antiKeywords: ["commercial ad","model"] },
  { test: /landscape|xeriscape/,        query: "xeriscape colorado front yard",              antiKeywords: ["tropical","palm"] },
  { test: /native.plant/,               query: "native plants garden colorado",              antiKeywords: ["tropical","palm"] },
  { test: /irrigat|drip|spray|winterize.irr/, query: "drip irrigation install garden",       antiKeywords: ["commercial","model"] },
  { test: /fence|cedar|vinyl.fence|metal.fence|fence.post/, query: "wood fence residential property", antiKeywords: ["mansion","luxury"] },
  { test: /hoa|commercial|industrial.prop/, query: "apartment community courtyard",           antiKeywords: ["dubai","palm","luxury"] },
  { test: /winter(iz)?/,               query: "colorado winter snow home exterior",          antiKeywords: ["staged christmas","model"] },
  { test: /fall|leaf/,                  query: "fall leaves residential yard rake",           antiKeywords: ["staged kids","model"] },
  { test: /spring.prep|spring.clean/,   query: "spring yard cleanup garden",                 antiKeywords: ["staged kids","model"] },
  { test: /summer/,                     query: "colorado summer landscape dry",              antiKeywords: ["tropical","palm"] },
  { test: /colorado.climate|colorado.real.estate|why.colorado|front.range.wind/, query: "colorado front range mountains landscape", antiKeywords: ["tourist","crowded"] },
  { test: /insurance/,                  query: "home insurance documents calculator",         antiKeywords: ["model","commercial ad"] },
  { test: /1031|tax|exchange/,          query: "tax document calendar deadline",             antiKeywords: ["commercial","model"] },
  { test: /brrrr|investment|investor|rental.market|analyz|first.rental/, query: "rental property duplex exterior", antiKeywords: ["mansion","luxury","palm"] },
  { test: /commercial.vs|commercial.prop/, query: "office park exterior parking",             antiKeywords: ["dubai","palm","skyscraper"] },
  { test: /boots.on.ground|property.manager|find.property/, query: "property manager walking building", antiKeywords: ["corporate","model smiling"] },
  { test: /single.family|tenant.turnover|reduce.tenant|document.maint/, query: "rental property exterior front", antiKeywords: ["mansion","luxury"] },
  { test: /hold.sell|refinanc/,         query: "real estate strategy documents desk",        antiKeywords: ["corporate","model"] },
  { test: /composite|decking|deck.patio/, query: "composite deck mountain view",              antiKeywords: ["tropical","oceanfront"] },
  { test: /pergola|patio|outdoor.light/, query: "pergola backyard residential",               antiKeywords: ["wedding","commercial"] },
  { test: /water.feature|pond|waterfall/, query: "pondless waterfall garden",                 antiKeywords: ["commercial","tropical resort"] },
  { test: /retaining.wall/,             query: "retaining wall stone landscape colorado",    antiKeywords: ["commercial","parking lot"] },
  { test: /kitchen|bath|remodel.roi|renovation|plan.home.reno/, query: "kitchen renovation in progress", antiKeywords: ["luxury","magazine"] },
  { test: /basement.finish/,            query: "finished basement living modest",             antiKeywords: ["luxury","magazine"] },
  { test: /flooring/,                   query: "hardwood floor installation",                antiKeywords: ["luxury","magazine"] },
  { test: /fix.flip|investment.rehab|renovations.pay/, query: "home renovation flip in progress", antiKeywords: ["luxury","magazine"] },
  { test: /concrete.driveway|clean.concrete/, query: "concrete driveway pressure wash",     antiKeywords: ["model","commercial ad"] },
  { test: /pressure|soft.wash/,         query: "pressure washer house siding",               antiKeywords: ["commercial","model"] },
  { test: /gutter/,                     query: "gutter cleaning leaves ladder",              antiKeywords: ["model","commercial ad"] },
  { test: /junk.haul|dumpster/,         query: "dumpster residential driveway",              antiKeywords: ["commercial","model"] },
  { test: /yard.grad|drainage/,         query: "yard grading drainage soil",                 antiKeywords: ["commercial","model"] },
  { test: /fence.maint|repair.lean|annual.fence/, query: "wood fence repair post hand tools", antiKeywords: ["model","commercial"] },
  { test: /landscape.roi|home.value|prop.maint.calendar/, query: "colorado home exterior front yard", antiKeywords: ["mansion","luxury","palm"] },
  { test: /water.restrict|xeriscape.design/, query: "xeriscape rocks plants dry colorado", antiKeywords: ["tropical","palm"] },
  { test: /hiring|cost.northern|property.management.cost/, query: "contractor estimate paperwork", antiKeywords: ["model smiling","corporate"] },
];

function getUniversityQuery(slug: string): { query: string; antiKeywords: string[] } {
  // 1. Check exact slug overrides first (highest priority)
  const override = getUniversityOverride(slug);
  if (override) return override;

  // 2. Fall back to regex patterns
  const s = slug.toLowerCase().replace(/_/g, "-");
  for (const p of UNI_PATTERNS) {
    if (p.test.test(s)) return { query: p.query, antiKeywords: p.antiKeywords };
  }

  // 3. Generic fallback
  return { query: "colorado property residential", antiKeywords: ["tropical","palm","commercial"] };
}

// ── API functions ─────────────────────────────────────────────────────────────

let lastApiCall = 0;
async function throttle() {
  const wait = THROTTLE_MS - (Date.now() - lastApiCall);
  if (wait > 0) {
    process.stdout.write(`  ⏳ throttle ${Math.ceil(wait / 1000)}s…\r`);
    await new Promise(r => setTimeout(r, wait));
  }
  lastApiCall = Date.now();
}

async function fetchPexels(query: string): Promise<Candidate[]> {
  await throttle();
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${PER_PAGE}&orientation=landscape`;
  let res: Response;
  try {
    res = await fetch(url, { headers: { Authorization: PEXELS_KEY } });
  } catch (e) {
    console.error(`  [Pexels] network error: ${e}`);
    return [];
  }
  if (res.status === 429) {
    console.warn("  [Pexels] rate limited — waiting 60s…");
    await new Promise(r => setTimeout(r, 60_000));
    return fetchPexels(query);
  }
  if (!res.ok) { console.error(`  [Pexels] ${res.status} for "${query}"`); return []; }
  const data = await res.json() as {
    photos: Array<{
      url: string; photographer: string; photographer_url: string;
      avg_color: string; width: number; height: number; alt: string;
      src: { medium: string; large2x: string };
    }>;
  };
  return (data.photos ?? []).map(p => ({
    url:             p.src.medium,
    downloadUrl:     p.src.large2x,
    photographer:    p.photographer,
    photographerUrl: p.photographer_url,
    sourceUrl:       p.url,
    width:           p.width,
    height:          p.height,
    avgColor:        p.avg_color ?? "#000000",
    altText:         p.alt ?? "",
    source:          "pexels" as const,
    docScore:        0,
  }));
}

async function fetchPixabay(query: string): Promise<Candidate[]> {
  if (!PIXABAY_KEY) return [];
  await throttle();
  const q   = encodeURIComponent(query.replace(/\s+/g, "+"));
  const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${q}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}&safesearch=true`;
  let res: Response;
  try { res = await fetch(url); }
  catch (e) { console.error(`  [Pixabay] network error: ${e}`); return []; }
  if (!res.ok) { console.error(`  [Pixabay] ${res.status} for "${query}"`); return []; }
  const data = await res.json() as {
    hits: Array<{
      pageURL: string; tags: string; user: string;
      imageWidth: number; imageHeight: number;
      webformatURL: string; largeImageURL: string;
    }>;
  };
  return (data.hits ?? []).map(h => ({
    url:             h.webformatURL,
    downloadUrl:     h.largeImageURL,
    photographer:    h.user,
    photographerUrl: `https://pixabay.com/users/${h.user}/`,
    sourceUrl:       h.pageURL,
    width:           h.imageWidth,
    height:          h.imageHeight,
    avgColor:        "#888888",
    altText:         h.tags ?? "",
    source:          "pixabay" as const,
    docScore:        0,
  }));
}

// ── Curation functions ────────────────────────────────────────────────────────

function isOverBright(hex: string): boolean {
  if (hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r > 0xC0 && g > 0xC0 && b > 0xC0;
}

function isSquareCrop(w: number, h: number): boolean {
  if (!h) return false;
  const r = w / h;
  return r >= 0.95 && r <= 1.05;
}

function hasAntiKeyword(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some(kw => lower.includes(kw.toLowerCase()));
}

const DOC_TERMS = ["worker","crew","installing","repairing","building","working on","during","progress","in progress","mid-job","tradesman","contractor at","technician"];

function calcDocScore(c: Candidate): number {
  let score = 0;
  const desc = (c.altText + " " + c.photographer).toLowerCase();
  DOC_TERMS.forEach(t => { if (desc.includes(t)) score += 2; });
  if (c.width > 4000 && c.width > c.height) score += 1;
  return score;
}

function filterAndScore(
  candidates: Candidate[],
  slotAnti:   string[],
): { passing: Candidate[]; rejected: Array<{ c: Candidate; reason: string }> } {
  const passing:  Candidate[] = [];
  const rejected: Array<{ c: Candidate; reason: string }> = [];
  const combined = [...UNIVERSAL_ANTI, ...slotAnti];

  for (const c of candidates) {
    if (hasAntiKeyword(c.altText, combined)) { rejected.push({ c, reason: `anti-keyword in alt: "${c.altText.slice(0, 60)}"` }); continue; }
    if (isSquareCrop(c.width, c.height))     { rejected.push({ c, reason: `square crop ${c.width}×${c.height}` }); continue; }
    if (isOverBright(c.avgColor))             { rejected.push({ c, reason: `over-bright avg_color ${c.avgColor}` }); continue; }
    c.docScore = calcDocScore(c);
    passing.push(c);
  }
  return { passing, rejected };
}

// ── Log file helpers ──────────────────────────────────────────────────────────

interface LogEntry { slotId: string; ts: string; result: SlotResult }

function loadLog(): Map<string, SlotResult> {
  const map = new Map<string, SlotResult>();
  if (!fs.existsSync(LOG_FILE)) return map;
  for (const line of fs.readFileSync(LOG_FILE, "utf-8").split("\n").filter(Boolean)) {
    try {
      const e = JSON.parse(line) as LogEntry;
      map.set(e.slotId, e.result);
    } catch {}
  }
  return map;
}

function appendLog(slotId: string, result: SlotResult) {
  const entry: LogEntry = { slotId, ts: new Date().toISOString(), result };
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n", "utf-8");
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Remove duplicate photos by downloadUrl (same photo can appear across passes). */
function dedup(candidates: Candidate[]): Candidate[] {
  const seen = new Set<string>();
  return candidates.filter(c => {
    if (seen.has(c.downloadUrl)) return false;
    seen.add(c.downloadUrl);
    return true;
  });
}

// ── Source a single slot ──────────────────────────────────────────────────────

async function sourceSlot(s: SlotDef, cached?: SlotResult): Promise<SlotResult> {
  if (cached) {
    process.stdout.write(`  ⟳ ${s.id} (cached)\n`);
    return cached;
  }
  process.stdout.write(`  → ${s.id}\n`);

  // ── Pass 1: primary query ─────────────────────────────────────────────────
  let raw = await fetchPexels(s.query);
  const { passing: pass1, rejected } = filterAndScore(raw, s.antiKeywords);
  let fallbackUsed = false;
  let candidates: Candidate[] = pass1;

  // Pixabay supplement if Pexels pass 1 is thin
  if (candidates.length < 3 && PIXABAY_KEY) {
    const pb = await fetchPixabay(s.query);
    const { passing: pbPass } = filterAndScore(pb, s.antiKeywords);
    candidates = dedup([...candidates, ...pbPass]);
    fallbackUsed = pbPass.length > 0;
  }

  // ── Pass 2: broader fallback query if still under 3 ─────────────────────
  if (candidates.length < 3) {
    const words = s.query.split(" ");
    // Drop the last 2 words — keeps subject, drops the most specific modifiers
    const broaderQuery = words.slice(0, Math.max(2, words.length - 2)).join(" ");
    if (broaderQuery !== s.query) {
      process.stdout.write(`    ↳ broader retry: "${broaderQuery}"\n`);
      const raw2 = await fetchPexels(broaderQuery);
      const { passing: pass2 } = filterAndScore(raw2, s.antiKeywords);
      candidates = dedup([...candidates, ...pass2]);
      if (candidates.length < 3 && PIXABAY_KEY) {
        const pb2 = await fetchPixabay(broaderQuery);
        const { passing: pbPass2 } = filterAndScore(pb2, s.antiKeywords);
        candidates = dedup([...candidates, ...pbPass2]);
        if (pbPass2.length > 0) fallbackUsed = true;
      }
    }
  }

  // Sort by docScore descending (most documentary first), cap at 3
  candidates.sort((a, b) => b.docScore - a.docScore);
  candidates = candidates.slice(0, 3);

  const needsManual = candidates.length < 3;
  if (needsManual) {
    console.warn(`  ⚠ ${s.id}: only ${candidates.length} candidate(s) after filtering (needs manual review)`);
    if (rejected.length) console.warn(`    Rejected: ${rejected.map(r => r.reason).join("; ")}`);
  }

  // Algorithm pick: index 0 (highest documentary score = least polished)
  const result: SlotResult = { slot: s, candidates, algorithmPick: 0, needsManual, fallbackUsed };
  appendLog(s.id, result);
  return result;
}

// ── University article slots ──────────────────────────────────────────────────

async function buildUniversitySlots(): Promise<SlotDef[]> {
  let articles: Array<{ slug: string; title: string; categoryName?: string }> = [];
  try {
    const { prisma } = await import("../lib/prisma");
    const rows = await prisma.universityArticle.findMany({
      where:   { status: "PUBLISHED" },
      select:  { slug: true, title: true, category: { select: { name: true } } },
    });
    articles = rows.map(r => ({ slug: r.slug, title: r.title, categoryName: r.category.name }));
    await prisma.$disconnect();
    console.log(`  📚 ${articles.length} published university articles found`);
  } catch (e) {
    console.warn(`  ⚠ Could not query Prisma for university articles: ${e}`);
    console.warn(`    University slots will be skipped. Run with DATABASE_URL set to include them.`);
    return [];
  }
  return articles.map(a => {
    const { query, antiKeywords } = getUniversityQuery(a.slug);
    const isDefault = query === "colorado property residential";
    if (isDefault) console.warn(`  ⚠ University FALLBACK for slug: ${a.slug}`);
    return slot(
      `university/${a.slug}`,
      `images/university/${a.slug}.jpg`,
      a.title,
      "University",
      query,
      antiKeywords,
      isDefault ? "FALLBACK: manual review recommended" : a.title,
      "inline",
    );
  });
}

// ── HTML generation ───────────────────────────────────────────────────────────

function buildHtml(results: SlotResult[]): string {
  const sections = [...new Set(results.map(r => r.slot.section))];

  const slotRows = results.map((r, idx) => {
    const thumbs = r.candidates.map((c, ci) => {
      const checked = ci === r.algorithmPick ? "checked" : "";
      return `
        <div class="candidate${ci === r.algorithmPick ? " algo-pick" : ""}">
          <a href="${c.sourceUrl}" target="_blank" rel="noreferrer">
            <img src="${c.url}" alt="${c.altText.replace(/"/g, "&quot;").slice(0, 120)}" loading="lazy">
          </a>
          <div class="cand-meta">
            <span class="source-badge ${c.source}">${c.source}</span>
            <a href="${c.photographerUrl}" target="_blank" rel="noreferrer" class="photo-credit">📷 ${c.photographer}</a>
            ${c.docScore > 0 ? `<span class="doc-score">doc:${c.docScore}</span>` : ""}
          </div>
          <label class="radio-label">
            <input type="radio" name="slot-${idx}" value="${ci}" ${checked} onchange="saveSelection(${idx},${ci})">
            Select #${ci + 1}
          </label>
        </div>`;
    }).join("");

    const rejectChecked = r.candidates.length === 0 ? "checked" : "";
    const warnBadge = r.needsManual
      ? `<span class="badge-warn">⚠ ${r.candidates.length}/3 candidates — manual sourcing may be needed</span>` : "";

    return `
      <div class="slot" id="slot-${idx}" data-section="${r.slot.section}">
        <div class="slot-header">
          <code class="slot-id">${r.slot.id}</code>
          <span class="slot-desc">${r.slot.description}</span>
          <span class="size-badge">${r.slot.sizeType}</span>
          ${warnBadge}
        </div>
        <div class="must-show">Must show: <em>${r.slot.mustShow}</em></div>
        <div class="candidates-row">
          ${thumbs || '<p class="no-cands">No candidates found — please source manually.</p>'}
          <div class="candidate reject-opt">
            <div class="reject-spacer"></div>
            <label class="radio-label reject">
              <input type="radio" name="slot-${idx}" value="REJECT" ${rejectChecked} onchange="saveSelection(${idx},'REJECT')">
              ⊗ Reject all — Re-source
            </label>
          </div>
        </div>
      </div>`;
  }).join("\n");

  const navLinks = sections.map(s => `<a href="#section-${s.replace(/[^a-z0-9]/gi, "-")}">${s}</a>`).join(" · ");

  const candidatesJson = JSON.stringify(results.map((r, idx) => ({
    idx,
    slotId:    r.slot.id,
    localPath: r.slot.localPath,
    sizeType:  r.slot.sizeType,
    candidates: r.candidates,
    algorithmPick: r.algorithmPick,
  })));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Forge Point — Image Review</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a111a; --card: #111c28; --border: #1e2d3d; --text: #c8d8e8;
    --muted: #5a7a9a; --amber: #d4981a; --orange: #c85a00; --green: #2a7a2a;
    --red: #8a1a1a; --blue: #1a4a8a;
  }
  body { background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; font-size: 14px; line-height: 1.5; }
  a { color: var(--amber); text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* Sticky header */
  .top-bar { position: sticky; top: 0; z-index: 100; background: var(--card); border-bottom: 1px solid var(--border); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .top-bar h1 { font-size: 15px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--amber); }
  .stats { color: var(--muted); font-size: 12px; }
  .export-btn { background: var(--orange); color: #fff; border: none; cursor: pointer; padding: 8px 18px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 3px; }
  .export-btn:hover { background: var(--amber); }

  /* Section nav */
  .section-nav { padding: 10px 24px; background: var(--card); border-bottom: 1px solid var(--border); font-size: 12px; color: var(--muted); display: flex; flex-wrap: wrap; gap: 8px; }
  .section-nav a { color: var(--muted); }
  .section-nav a:hover { color: var(--amber); }

  /* Section headings */
  .section-heading { padding: 20px 24px 4px; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--orange); border-top: 1px solid var(--border); margin-top: 8px; }

  /* Slot rows */
  .slot { border-bottom: 1px solid var(--border); padding: 16px 24px; }
  .slot:hover { background: rgba(255,255,255,0.01); }
  .slot.approved { border-left: 3px solid var(--green); padding-left: 21px; }
  .slot.rejected { border-left: 3px solid var(--red); padding-left: 21px; }

  .slot-header { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; margin-bottom: 4px; }
  .slot-id { font-family: monospace; font-size: 12px; color: var(--muted); background: rgba(255,255,255,0.05); padding: 1px 6px; border-radius: 3px; }
  .slot-desc { font-size: 13px; font-weight: 600; }
  .size-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; background: var(--border); padding: 1px 5px; border-radius: 2px; color: var(--muted); }
  .badge-warn { font-size: 11px; color: #e0a000; background: rgba(224,160,0,0.1); padding: 1px 6px; border-radius: 2px; }
  .must-show { font-size: 11px; color: var(--muted); margin-bottom: 10px; font-style: italic; }

  /* Candidates */
  .candidates-row { display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start; }
  .candidate { width: 280px; border: 1px solid var(--border); background: var(--card); border-radius: 4px; overflow: hidden; flex-shrink: 0; }
  .candidate.algo-pick { border-color: var(--amber); }
  .candidate img { width: 100%; height: 160px; object-fit: cover; display: block; }
  .cand-meta { padding: 6px 8px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .source-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; padding: 1px 5px; border-radius: 2px; text-transform: uppercase; }
  .source-badge.pexels   { background: #2a4a6a; color: #8ac8f0; }
  .source-badge.pixabay  { background: #2a5a2a; color: #8af08a; }
  .photo-credit { font-size: 11px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 160px; }
  .doc-score { font-size: 10px; color: var(--green); margin-left: auto; }
  .radio-label { display: flex; align-items: center; gap: 6px; padding: 6px 8px; font-size: 12px; font-weight: 600; cursor: pointer; border-top: 1px solid var(--border); }
  .radio-label:hover { background: rgba(255,255,255,0.03); }
  .radio-label.reject { color: var(--orange); }
  .reject-opt { border: 1px dashed var(--border) !important; background: transparent !important; }
  .reject-spacer { height: 160px; display: flex; align-items: center; justify-content: center; color: var(--border); font-size: 11px; }
  .no-cands { color: var(--orange); font-size: 12px; padding: 8px 0; }
</style>
</head>
<body>

<div class="top-bar">
  <div>
    <h1>Forge Point Image Review</h1>
    <div class="stats" id="stats">Loading…</div>
  </div>
  <div style="display:flex;gap:10px;align-items:center">
    <span style="font-size:12px;color:var(--muted)">Selections auto-save in browser. Click Export when done.</span>
    <button class="export-btn" onclick="exportSelections()">Export Selections (.json)</button>
  </div>
</div>

<nav class="section-nav">
  <span>Jump to:</span>
  ${navLinks}
</nav>

<div id="slots-container">
${(() => {
  let currentSection = "";
  return results.map((r, idx) => {
    let heading = "";
    if (r.slot.section !== currentSection) {
      currentSection = r.slot.section;
      const anchorId = `section-${currentSection.replace(/[^a-z0-9]/gi, "-")}`;
      heading = `<div class="section-heading" id="${anchorId}">${currentSection}</div>`;
    }
    return heading;
  }).join("\n");
})()}
${slotRows}
</div>

<script>
const CANDIDATES = ${candidatesJson};

// Load saved selections from localStorage
const STORE_KEY = "fp-image-selections";
function loadSelections() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); } catch { return {}; }
}
function saveSelection(idx, value) {
  const sel = loadSelections();
  sel[CANDIDATES[idx].slotId] = {
    rank:        value,
    downloadUrl: value !== "REJECT" ? CANDIDATES[idx].candidates[Number(value)]?.downloadUrl : null,
    photographer:value !== "REJECT" ? CANDIDATES[idx].candidates[Number(value)]?.photographer : null,
    source:      value !== "REJECT" ? CANDIDATES[idx].candidates[Number(value)]?.source : null,
    localPath:   CANDIDATES[idx].localPath,
    sizeType:    CANDIDATES[idx].sizeType,
  };
  localStorage.setItem(STORE_KEY, JSON.stringify(sel));
  updateSlotStyle(idx, value);
  updateStats();
}

// Restore selections on load
function restoreSelections() {
  const sel = loadSelections();
  CANDIDATES.forEach((c, idx) => {
    if (sel[c.slotId]) {
      const val = sel[c.slotId].rank;
      const radios = document.querySelectorAll(\`input[name="slot-\${idx}"]\`);
      radios.forEach(r => { if (r.value == val) r.checked = true; });
      updateSlotStyle(idx, val);
    }
  });
  updateStats();
}

function updateSlotStyle(idx, value) {
  const el = document.getElementById(\`slot-\${idx}\`);
  if (!el) return;
  el.classList.remove("approved", "rejected");
  if (value === "REJECT") el.classList.add("rejected");
  else if (value !== undefined) el.classList.add("approved");
}

function updateStats() {
  const sel  = loadSelections();
  const keys = Object.keys(sel);
  const approved = keys.filter(k => sel[k].rank !== "REJECT").length;
  const rejected = keys.filter(k => sel[k].rank === "REJECT").length;
  const total = CANDIDATES.length;
  document.getElementById("stats").textContent =
    \`\${total} slots · \${approved} approved · \${rejected} to re-source · \${total - keys.length} unreviewed\`;
}

function exportSelections() {
  const sel  = loadSelections();
  const data = { exportedAt: new Date().toISOString(), totalSlots: CANDIDATES.length, selections: sel };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a    = document.createElement("a");
  a.href     = URL.createObjectURL(blob);
  a.download = ".image-selections.json";
  a.click();
  URL.revokeObjectURL(a.href);
  alert("Downloaded .image-selections.json\\n\\nPlace it in the scripts/ folder, then run:\\n  npm run images:apply");
}

// Insert section headings before the first slot of each section
function insertSectionHeadings() {
  let currentSection = "";
  CANDIDATES.forEach((c, idx) => {
    if (c.slotId.split("/")[0] === "university") c.section = "University";
    const section = CANDIDATES[idx]?.section || "";
    if (section && section !== currentSection) {
      currentSection = section;
    }
  });
}

window.addEventListener("DOMContentLoaded", restoreSelections);
</script>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n── Forge Point Image Sourcing v2 ───────────────────────────");
  console.log(`   Static slots : ${SLOTS.length}`);
  console.log(`   Throttle     : ${THROTTLE_MS / 1000}s between API calls`);
  console.log(`   Pexels key   : ${PEXELS_KEY.slice(0, 8)}…`);
  console.log(`   Pixabay key  : ${PIXABAY_KEY ? PIXABAY_KEY.slice(0, 8) + "…" : "(not set — Pexels only)"}`);
  console.log("────────────────────────────────────────────────────────────\n");

  const logCache = loadLog();
  const results:  SlotResult[] = [];

  // ── University slots
  console.log("Loading university articles from DB…");
  const uniSlots = await buildUniversitySlots();
  const allSlots = [...SLOTS, ...uniSlots];
  console.log(`\nTotal slots: ${allSlots.length} (${SLOTS.length} service + ${uniSlots.length} university)\n`);

  const alreadySourced = allSlots.filter(s => logCache.has(s.id)).length;
  const toSource       = allSlots.length - alreadySourced;
  if (alreadySourced > 0) {
    console.log(`Resuming: ${alreadySourced} already sourced, ${toSource} remaining`);
    const estMins = Math.ceil((toSource * THROTTLE_MS) / 60_000);
    if (toSource > 0) console.log(`Estimated time: ~${estMins} min at ${THROTTLE_MS / 1000}s/request\n`);
  }

  for (let i = 0; i < allSlots.length; i++) {
    const s = allSlots[i];
    const progress = `[${i + 1}/${allSlots.length}]`;
    process.stdout.write(`${progress} `);
    const result = await sourceSlot(s, logCache.get(s.id));
    results.push(result);
  }

  // ── Write candidates JSON
  const candidatesData = {
    generatedAt: new Date().toISOString(),
    totalSlots:  results.length,
    slots: results.map(r => ({
      slotId:        r.slot.id,
      localPath:     r.slot.localPath,
      description:   r.slot.description,
      section:       r.slot.section,
      sizeType:      r.slot.sizeType,
      needsManual:   r.needsManual,
      fallbackUsed:  r.fallbackUsed,
      algorithmPick: r.algorithmPick,
      candidates:    r.candidates,
    })),
  };
  fs.mkdirSync("scripts", { recursive: true });
  fs.writeFileSync(CANDIDATES_FILE, JSON.stringify(candidatesData, null, 2), "utf-8");
  console.log(`\n✅  Wrote ${CANDIDATES_FILE}`);

  // ── Write review HTML
  const html = buildHtml(results);
  fs.writeFileSync(REVIEW_HTML, html, "utf-8");
  console.log(`✅  Wrote ${REVIEW_HTML}`);

  const needsManual = results.filter(r => r.needsManual);
  if (needsManual.length) {
    console.log(`\n⚠  ${needsManual.length} slots need manual sourcing:`);
    needsManual.forEach(r => console.log(`   • ${r.slot.id}`));
  }

  console.log(`
====================================================
REVIEW REQUIRED before proceeding.

1. Open scripts/.image-review.html in your browser
2. Scroll through all ${results.length} slots
3. For each: confirm the default (no action needed),
   pick a different candidate, or mark "Reject all"
4. Click "Export Selections" at the top
5. Place the downloaded file at scripts/.image-selections.json
6. Run: npm run images:apply

The script will NOT download or modify any code until you do this.
====================================================
`);
}

main().catch(err => { console.error(err); process.exit(1); });
