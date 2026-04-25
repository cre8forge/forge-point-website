// ================================================================
// FORGE POINT — Database seed
// Run: npm run db:seed
// Safe to re-run: uses upsert throughout.
// Pricing uses override_low/override_high per unit.
// Aaron updates prices from the admin panel (Step 11).
// ================================================================

import { PrismaClient } from "@prisma/client";
import { seedUniversity } from "./seed-university";

const prisma = new PrismaClient();

// ── Admin settings ────────────────────────────────────────────────
const SETTINGS = [
  { key: "MATERIAL_MARKUP",   value: "1.50", label: "Material markup multiplier" },
  { key: "LABOR_RATE",        value: "85.00", label: "Labor rate ($/hr)" },
  { key: "MARKET_MULTIPLIER", value: "1.10", label: "Northern CO market multiplier" },
];

// ── Categories + services ─────────────────────────────────────────
// override_low / override_high = price per unit in dollars
// unit = the unit label shown to the customer
const CATALOG = [
  {
    name: "Landscape Design & Install",
    slug: "landscape-design-install",
    sortOrder: 1,
    services: [
      { name: "Landscape Design Consultation",  unit: "hour",       sortOrder:  1, override_low:  150, override_high:  250 },
      { name: "Site Assessment & Grading",       unit: "sq ft",      sortOrder:  2, override_low: 0.50, override_high: 1.20 },
      { name: "Sod Installation",                unit: "sq ft",      sortOrder:  3, override_low: 1.50, override_high: 2.50 },
      { name: "Hydroseeding",                    unit: "sq ft",      sortOrder:  4, override_low: 0.30, override_high: 0.65 },
      { name: "Seed & Straw Installation",       unit: "sq ft",      sortOrder:  5, override_low: 0.15, override_high: 0.35 },
      { name: "Native Plant Install (1-gal)",    unit: "each",       sortOrder:  6, override_low:   25, override_high:   45 },
      { name: "Ornamental Shrub Install (5-gal)",unit: "each",       sortOrder:  7, override_low:   65, override_high:  120 },
      { name: "Tree Install — Small (under 6 ft)",unit: "each",      sortOrder:  8, override_low:  200, override_high:  350 },
      { name: "Tree Install — Medium (6–12 ft)", unit: "each",       sortOrder:  9, override_low:  450, override_high:  800 },
      { name: "Tree Install — Large (over 12 ft)",unit: "each",      sortOrder: 10, override_low:  900, override_high: 1800 },
      { name: "Mulch Installation",              unit: "cubic yard", sortOrder: 11, override_low:   65, override_high:   95 },
      { name: "Decorative Rock Installation",    unit: "sq ft",      sortOrder: 12, override_low: 3.50, override_high: 7.00 },
      { name: "Retaining Wall — Block",          unit: "sq ft (face)",sortOrder:13, override_low:   35, override_high:   65 },
      { name: "Concrete Patio / Walkway",        unit: "sq ft",      sortOrder: 14, override_low: 8.00, override_high: 15.00 },
      { name: "Flagstone Patio / Walkway",       unit: "sq ft",      sortOrder: 15, override_low:   18, override_high:   35 },
      { name: "Outdoor Lighting — Per Fixture",  unit: "each",       sortOrder: 16, override_low:   85, override_high:  175 },
    ],
  },
  {
    name: "Grounds Maintenance",
    slug: "grounds-maintenance",
    sortOrder: 2,
    services: [
      { name: "Mowing — Per Visit",              unit: "1,000 sq ft",sortOrder:  1, override_low: 9.00, override_high: 15.00 },
      { name: "Edging — Hard Surfaces",          unit: "linear ft",  sortOrder:  2, override_low: 0.50, override_high: 1.00 },
      { name: "Trimming & String Work",          unit: "hour",       sortOrder:  3, override_low:   55, override_high:   75 },
      { name: "Leaf Removal",                    unit: "hour",       sortOrder:  4, override_low:   55, override_high:   75 },
      { name: "Spring Clean-Up",                 unit: "sq ft",      sortOrder:  5, override_low: 0.08, override_high: 0.18 },
      { name: "Fall Clean-Up",                   unit: "sq ft",      sortOrder:  6, override_low: 0.08, override_high: 0.18 },
      { name: "Fertilization Application",       unit: "sq ft",      sortOrder:  7, override_low: 0.04, override_high: 0.08 },
      { name: "Pre-Emergent Weed Control",       unit: "sq ft",      sortOrder:  8, override_low: 0.06, override_high: 0.12 },
      { name: "Post-Emergent Weed Control",      unit: "sq ft",      sortOrder:  9, override_low: 0.06, override_high: 0.12 },
      { name: "Lawn Aeration",                   unit: "sq ft",      sortOrder: 10, override_low: 0.06, override_high: 0.12 },
      { name: "Overseeding",                     unit: "sq ft",      sortOrder: 11, override_low: 0.12, override_high: 0.25 },
    ],
  },
  {
    name: "Fencing",
    slug: "fencing",
    sortOrder: 3,
    services: [
      { name: "Wood Privacy Fence — 6 ft",       unit: "linear ft",  sortOrder:  1, override_low:   28, override_high:   45 },
      { name: "Wood Privacy Fence — 8 ft",       unit: "linear ft",  sortOrder:  2, override_low:   35, override_high:   58 },
      { name: "Board-on-Board Cedar — 6 ft",     unit: "linear ft",  sortOrder:  3, override_low:   32, override_high:   52 },
      { name: "Vinyl Privacy Fence — 6 ft",      unit: "linear ft",  sortOrder:  4, override_low:   38, override_high:   65 },
      { name: "Vinyl Picket Fence — 4 ft",       unit: "linear ft",  sortOrder:  5, override_low:   22, override_high:   38 },
      { name: "Chain Link Fence — 4 ft",         unit: "linear ft",  sortOrder:  6, override_low:   18, override_high:   32 },
      { name: "Ornamental Iron Fence — 4 ft",    unit: "linear ft",  sortOrder:  7, override_low:   45, override_high:   85 },
      { name: "Gate — Wood",                     unit: "each",       sortOrder:  8, override_low:  280, override_high:  550 },
      { name: "Gate — Metal / Iron",             unit: "each",       sortOrder:  9, override_low:  350, override_high:  750 },
      { name: "Fence Repair / Board Replacement",unit: "linear ft",  sortOrder: 10, override_low: 8.00, override_high: 18.00 },
    ],
  },
  {
    name: "Power & Window Washing",
    slug: "power-window-washing",
    sortOrder: 4,
    services: [
      { name: "Driveway Pressure Washing",       unit: "sq ft",      sortOrder:  1, override_low: 0.15, override_high: 0.35 },
      { name: "House Soft Wash — Exterior",      unit: "sq ft",      sortOrder:  2, override_low: 0.20, override_high: 0.45 },
      { name: "Deck Pressure Washing",           unit: "sq ft",      sortOrder:  3, override_low: 0.25, override_high: 0.55 },
      { name: "Patio / Concrete Wash",           unit: "sq ft",      sortOrder:  4, override_low: 0.15, override_high: 0.30 },
      { name: "Window Cleaning — Exterior Only", unit: "window",     sortOrder:  5, override_low: 8.00, override_high: 15.00 },
      { name: "Window Cleaning — Interior & Exterior",unit: "window",sortOrder:  6, override_low:   12, override_high:   22 },
      { name: "Gutter Cleaning & Flush",         unit: "linear ft",  sortOrder:  7, override_low: 1.50, override_high: 3.50 },
      { name: "Commercial Sidewalk Cleaning",    unit: "sq ft",      sortOrder:  8, override_low: 0.10, override_high: 0.25 },
      { name: "Roof Soft Wash",                  unit: "sq ft",      sortOrder:  9, override_low: 0.35, override_high: 0.75 },
      { name: "Graffiti Removal",                unit: "sq ft",      sortOrder: 10, override_low: 2.50, override_high: 6.00 },
    ],
  },
  {
    name: "Industrial Maintenance",
    slug: "industrial-maintenance",
    sortOrder: 5,
    services: [
      { name: "Parking Lot Sweeping",            unit: "sq ft",      sortOrder:  1, override_low: 0.010, override_high: 0.030 },
      { name: "Parking Lot Blowing",             unit: "sq ft",      sortOrder:  2, override_low: 0.005, override_high: 0.015 },
      { name: "Commercial Building Wash",        unit: "sq ft",      sortOrder:  3, override_low: 0.15,  override_high: 0.35  },
      { name: "Loading Dock Cleaning",           unit: "sq ft",      sortOrder:  4, override_low: 0.25,  override_high: 0.65  },
      { name: "Loading Dock Degreasing",         unit: "sq ft",      sortOrder:  5, override_low: 0.35,  override_high: 0.85  },
      { name: "Concrete Sealing",                unit: "sq ft",      sortOrder:  6, override_low: 0.45,  override_high: 0.90  },
      { name: "Large Surface Pressure Washing",  unit: "sq ft",      sortOrder:  7, override_low: 0.10,  override_high: 0.25  },
      { name: "Dumpster Area Cleaning",          unit: "each",       sortOrder:  8, override_low:   85,  override_high:  175  },
    ],
  },
  {
    name: "HOA & Commercial Property",
    slug: "hoa-commercial-property",
    sortOrder: 6,
    services: [
      { name: "Common Area Mowing",              unit: "1,000 sq ft",sortOrder:  1, override_low: 8.00, override_high: 14.00 },
      { name: "Common Area Edging",              unit: "linear ft",  sortOrder:  2, override_low: 0.45, override_high: 0.90  },
      { name: "Common Area Fertilization",       unit: "sq ft",      sortOrder:  3, override_low: 0.04, override_high: 0.08  },
      { name: "Annual Color Install",            unit: "flat (48 plants)", sortOrder: 4, override_low: 45, override_high: 95 },
      { name: "Mulch Refresh",                   unit: "cubic yard", sortOrder:  5, override_low:   65, override_high:   95  },
      { name: "Seasonal Grounds Clean-Up",       unit: "sq ft",      sortOrder:  6, override_low: 0.08, override_high: 0.18  },
      { name: "Property Inspection Report",      unit: "visit",      sortOrder:  7, override_low:   85, override_high:  175  },
      { name: "Entry Feature Maintenance",       unit: "month",      sortOrder:  8, override_low:  125, override_high:  275  },
    ],
  },
  {
    name: "Irrigation & Drainage",
    slug: "irrigation-drainage",
    sortOrder: 7,
    services: [
      { name: "Irrigation System Design",        unit: "zone",       sortOrder:  1, override_low:   65, override_high:  125  },
      { name: "Irrigation System Installation",  unit: "zone",       sortOrder:  2, override_low:  350, override_high:  650  },
      { name: "Drip System Installation",        unit: "linear ft",  sortOrder:  3, override_low: 2.50, override_high: 5.50  },
      { name: "Irrigation Winterization",        unit: "zone",       sortOrder:  4, override_low:   65, override_high:  110  },
      { name: "Irrigation Spring Startup",       unit: "zone",       sortOrder:  5, override_low:   65, override_high:  110  },
      { name: "Irrigation Repair",               unit: "hour",       sortOrder:  6, override_low:   85, override_high:  145  },
      { name: "French Drain Installation",       unit: "linear ft",  sortOrder:  7, override_low:   25, override_high:   55  },
      { name: "Dry Creek Bed",                   unit: "linear ft",  sortOrder:  8, override_low:   18, override_high:   40  },
    ],
  },
  {
    name: "Renovation & Remodel",
    slug: "renovation-remodel",
    sortOrder: 9,
    services: [
      { name: "Full Room Renovation",              unit: "room",       sortOrder:  1, override_low:  2500, override_high:  8000 },
      { name: "Basement Finish",                   unit: "sq ft",      sortOrder:  2, override_low:    35, override_high:    75 },
      { name: "Room Addition — Per Sq Ft",         unit: "sq ft",      sortOrder:  3, override_low:   150, override_high:   275 },
      { name: "Demolition Labor",                  unit: "hour",       sortOrder:  4, override_low:    65, override_high:   100 },
      { name: "Debris Haul Away",                  unit: "load",       sortOrder:  5, override_low:   250, override_high:   550 },
      { name: "Trade Coordination (Elec/Plumb/HVAC)", unit: "hour",   sortOrder:  6, override_low:    75, override_high:   125 },
    ],
  },
  {
    name: "Framing & Finishes",
    slug: "framing-finishes",
    sortOrder: 10,
    services: [
      { name: "Partition Wall Framing",            unit: "linear ft",  sortOrder:  1, override_low:    18, override_high:    38 },
      { name: "Drywall Hang & Finish",             unit: "sq ft",      sortOrder:  2, override_low:  2.50, override_high:  5.50 },
      { name: "Interior Paint — Walls",            unit: "sq ft",      sortOrder:  3, override_low:  1.50, override_high:  3.00 },
      { name: "Interior Paint — Trim & Doors",     unit: "linear ft",  sortOrder:  4, override_low:  2.00, override_high:  4.50 },
      { name: "Baseboard & Casing Install",        unit: "linear ft",  sortOrder:  5, override_low:  3.50, override_high:  7.00 },
      { name: "Crown Molding Install",             unit: "linear ft",  sortOrder:  6, override_low:  5.00, override_high: 12.00 },
      { name: "LVP / Engineered Hardwood",         unit: "sq ft",      sortOrder:  7, override_low:  4.50, override_high:  9.00 },
      { name: "Tile Flooring Install",             unit: "sq ft",      sortOrder:  8, override_low:  7.00, override_high: 15.00 },
    ],
  },
  {
    name: "Kitchen, Bath & More",
    slug: "kitchen-bath-more",
    sortOrder: 11,
    services: [
      { name: "Cabinet Installation",              unit: "linear ft",  sortOrder:  1, override_low:   125, override_high:   350 },
      { name: "Cabinet Refinishing",               unit: "linear ft",  sortOrder:  2, override_low:    55, override_high:   120 },
      { name: "Countertop Install — Quartz/Granite",unit: "sq ft",     sortOrder:  3, override_low:    65, override_high:   145 },
      { name: "Backsplash / Wall Tile",            unit: "sq ft",      sortOrder:  4, override_low:    18, override_high:    38 },
      { name: "Floor Tile — Kitchen or Bath",      unit: "sq ft",      sortOrder:  5, override_low:    12, override_high:    28 },
      { name: "Vanity & Fixture Install",          unit: "each",       sortOrder:  6, override_low:   350, override_high:   850 },
      { name: "Shower or Tub Surround",            unit: "each",       sortOrder:  7, override_low:  1800, override_high:  5500 },
      { name: "Full Kitchen Remodel",              unit: "project",    sortOrder:  8, override_low: 15000, override_high: 55000 },
      { name: "Full Bathroom Remodel",             unit: "project",    sortOrder:  9, override_low:  8000, override_high: 28000 },
    ],
  },
  {
    name: "Decks, Pergolas & Patios",
    slug: "decks-pergolas-patios",
    sortOrder: 12,
    services: [
      { name: "Composite Decking — Material & Labor",unit: "sq ft",   sortOrder:  1, override_low:    28, override_high:    55 },
      { name: "Pressure-Treated Wood Deck",        unit: "sq ft",      sortOrder:  2, override_low:    18, override_high:    38 },
      { name: "Deck Railing System",               unit: "linear ft",  sortOrder:  3, override_low:    45, override_high:    95 },
      { name: "Pergola — Freestanding",            unit: "sq ft",      sortOrder:  4, override_low:    35, override_high:    75 },
      { name: "Pergola — Attached",                unit: "sq ft",      sortOrder:  5, override_low:    40, override_high:    85 },
      { name: "Concrete Patio — Poured",           unit: "sq ft",      sortOrder:  6, override_low:  8.00, override_high: 16.00 },
      { name: "Paver Patio — Concrete Paver",      unit: "sq ft",      sortOrder:  7, override_low:    18, override_high:    38 },
      { name: "Natural Stone Patio",               unit: "sq ft",      sortOrder:  8, override_low:    25, override_high:    55 },
      { name: "Deck Staining & Sealing",           unit: "sq ft",      sortOrder:  9, override_low:  1.50, override_high:  3.50 },
    ],
  },
  {
    name: "Custom Water Features",
    slug: "custom-water-features",
    sortOrder: 13,
    services: [
      { name: "Pondless Waterfall — Small",        unit: "project",    sortOrder:  1, override_low:  3500, override_high:  6500 },
      { name: "Pondless Waterfall — Large",        unit: "project",    sortOrder:  2, override_low:  6500, override_high: 14000 },
      { name: "Koi Pond — Small (up to 500 gal)",  unit: "project",    sortOrder:  3, override_low:  6000, override_high: 12000 },
      { name: "Koi Pond — Large (500+ gal)",       unit: "project",    sortOrder:  4, override_low: 12000, override_high: 28000 },
      { name: "Stream Feature",                    unit: "linear ft",  sortOrder:  5, override_low:   125, override_high:   275 },
      { name: "Decorative Fountain",               unit: "project",    sortOrder:  6, override_low:  1500, override_high:  5500 },
      { name: "Pump & Filter Upgrade",             unit: "project",    sortOrder:  7, override_low:   650, override_high:  1800 },
      { name: "Annual Winterization",              unit: "visit",      sortOrder:  8, override_low:   175, override_high:   350 },
    ],
  },
  {
    name: "Junk Haul Off",
    slug: "junk-haul-off",
    sortOrder: 14,
    services: [
      { name: "Minimum Load (¼ truck)",            unit: "load",       sortOrder:  1, override_low:   125, override_high:   200 },
      { name: "Half Truck Load",                   unit: "load",       sortOrder:  2, override_low:   225, override_high:   350 },
      { name: "Full Truck Load",                   unit: "load",       sortOrder:  3, override_low:   375, override_high:   550 },
      { name: "Estate / Full Property Cleanout",   unit: "project",    sortOrder:  4, override_low:   750, override_high:  2500 },
      { name: "Appliance Removal",                 unit: "each",       sortOrder:  5, override_low:    65, override_high:   125 },
      { name: "Construction Debris — Heavy",       unit: "cubic yard", sortOrder:  6, override_low:    75, override_high:   150 },
      { name: "Yard Waste / Storm Debris",         unit: "cubic yard", sortOrder:  7, override_low:    45, override_high:    95 },
    ],
  },
  {
    name: "Property Management",
    slug: "property-management",
    sortOrder: 8,
    services: [
      { name: "Monthly Property Management",     unit: "unit/month", sortOrder:  1, override_low:   95, override_high:  175  },
      { name: "Move-In Inspection",              unit: "unit",       sortOrder:  2, override_low:  125, override_high:  225  },
      { name: "Move-Out Inspection",             unit: "unit",       sortOrder:  3, override_low:  125, override_high:  225  },
      { name: "Maintenance Coordination",        unit: "hour",       sortOrder:  4, override_low:   55, override_high:   85  },
      { name: "Vendor Coordination",             unit: "hour",       sortOrder:  5, override_low:   45, override_high:   75  },
      { name: "Monthly Financial Report",        unit: "unit/month", sortOrder:  6, override_low:   45, override_high:   85  },
      { name: "Lease Renewal Coordination",      unit: "unit",       sortOrder:  7, override_low:  175, override_high:  350  },
      { name: "Emergency Response",              unit: "incident",   sortOrder:  8, override_low:  150, override_high:  350  },
    ],
  },
] as const;

// ── Main ──────────────────────────────────────────────────────────
async function main() {
  console.log("🌱 Seeding Forge Point database…\n");

  // Admin settings
  console.log("  Admin settings…");
  for (const s of SETTINGS) {
    await prisma.adminSetting.upsert({
      where:  { key: s.key },
      update: { value: s.value, label: s.label },
      create: { key: s.key, value: s.value, label: s.label },
    });
  }

  // Categories + services
  let totalServices = 0;
  for (const cat of CATALOG) {
    console.log(`  Category: ${cat.name}`);

    const category = await prisma.estimateCategory.upsert({
      where:  { slug: cat.slug },
      update: { name: cat.name, sortOrder: cat.sortOrder },
      create: { name: cat.name, slug: cat.slug, sortOrder: cat.sortOrder },
    });

    for (const svc of cat.services) {
      const existing = await prisma.estimateService.findFirst({
        where: { name: svc.name, categoryId: category.id },
        select: { id: true },
      });

      const data = {
        unit:          svc.unit,
        sortOrder:     svc.sortOrder,
        override_low:  svc.override_low,
        override_high: svc.override_high,
        active:        true,
      };

      if (existing) {
        await prisma.estimateService.update({ where: { id: existing.id }, data });
      } else {
        await prisma.estimateService.create({
          data: { ...data, name: svc.name, categoryId: category.id },
        });
      }
      totalServices++;
    }
  }

  console.log(`\n✅ Seeded ${CATALOG.length} categories and ${totalServices} services.`);

  // University
  console.log("\n  Forge Point University…");
  await seedUniversity(prisma);

  console.log("\n   Run 'npm run db:seed' again at any time — it's safe to repeat.\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
