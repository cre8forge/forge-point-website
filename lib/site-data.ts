// ================================================================
// Static site data — content that lives in code rather than the DB.
// Photos are Unsplash IDs; swap them from the admin panel (Step 11).
// ================================================================

// ── Services (homepage grid) ──────────────────────────────────────
export const SERVICES = [
  {
    category: "Landscaping",
    title: "Landscape Design & Install",
    description:
      "Custom design, grading, sod, plants, and irrigation — full turnkey from concept to completion.",
    href: "/services/landscape-design-install",
  },
  {
    category: "Grounds",
    title: "Grounds Maintenance",
    description:
      "Weekly or bi-weekly mowing, edging, trimming, blowing, and seasonal clean-ups.",
    href: "/services/grounds-maintenance",
  },
  {
    category: "Fencing",
    title: "Fencing",
    description:
      "Wood, vinyl, chain link, and ornamental iron — supply & install or install-only.",
    href: "/services/fencing",
  },
  {
    category: "Washing",
    title: "Power & Window Washing",
    description:
      "Driveways, decks, siding, patios, and windows — restoring curb appeal fast.",
    href: "/services/power-window-washing",
  },
  {
    category: "Industrial",
    title: "Industrial Maintenance",
    description:
      "Parking lots, warehouses, and commercial facilities — large-scale property upkeep.",
    href: "/services/industrial-maintenance",
  },
  {
    category: "HOA",
    title: "HOA & Commercial Property",
    description:
      "Full-service HOA and commercial property management for communities and complexes.",
    href: "/services/hoa-commercial-property",
  },
  {
    category: "Management",
    title: "Property Management",
    description:
      "End-to-end property management — tenant relations, maintenance, and inspections.",
    href: "/services/property-management",
  },
  {
    category: "Custom Living",
    title: "Renovation & Remodel",
    description:
      "Whole-home and targeted renovations — from gut-and-rebuild to investment property rehab.",
    href: "/services/renovation-remodel",
  },
  {
    category: "Custom Living",
    title: "Framing & Finishes",
    description:
      "Structural framing, drywall, paint, trim carpentry, and flooring — from bones to beauty.",
    href: "/services/framing-finishes",
  },
  {
    category: "Custom Living",
    title: "Kitchen, Bath & More",
    description:
      "Cabinet installation, countertops, tile, fixtures, and full room transformations.",
    href: "/services/kitchen-bath-more",
  },
  {
    category: "Outdoor Living",
    title: "Decks, Pergolas & Patios",
    description:
      "Custom composite and wood decks, pergolas, and paver or concrete patios built for Colorado.",
    href: "/services/decks-pergolas-patios",
  },
  {
    category: "Outdoor Living",
    title: "Custom Water Features",
    description:
      "Pondless waterfalls, koi ponds, stream features, and fountains custom-built for your property.",
    href: "/services/custom-water-features",
  },
  {
    category: "Grounds & Estates",
    title: "Junk Haul Off",
    description:
      "Fast property cleanouts — furniture, appliances, construction debris, and estate cleanouts.",
    href: "/services/junk-haul-off",
  },
] as const;

// ── How It Works ──────────────────────────────────────────────────
export const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Request Your Estimate",
    description:
      "Tell us about your property and the work you need. Use our online estimator or call us directly. We respond within 24 hours.",
  },
  {
    number: "02",
    title: "We Plan & Schedule",
    description:
      "We visit your property, assess the scope, provide a detailed written quote, and lock in a schedule that works for you.",
  },
  {
    number: "03",
    title: "You Enjoy the Results",
    description:
      "Our crew shows up on time, delivers on budget, and leaves your property looking better than you imagined.",
  },
] as const;

// ── Why Forge Point ───────────────────────────────────────────────
export const DIFFERENTIATORS = [
  {
    title: "Bonded & Insured",
    description:
      "We carry full general liability and workers' compensation on every job. Your property and investment are fully protected.",
  },
  {
    title: "Northern Colorado Specialists",
    description:
      "We know Northern Colorado — the soil, the climate, HOA requirements, and local codes. No learning curve on your dime.",
  },
  {
    title: "Transparent Pricing",
    description:
      "We give you a clear range estimate before scheduling a visit. No surprise invoices. No hidden fees. Ever.",
  },
  {
    title: "HOA & Commercial Expertise",
    description:
      "Trusted by HOA boards and commercial property managers across Northern Colorado for reliable, professional service.",
  },
] as const;

// ── Project Showcase ──────────────────────────────────────────────
// Unsplash photo IDs — update these from the admin Unsplash panel (Step 11)
export const SHOWCASE_PROJECTS = [
  {
    id: "landscaping",
    label: "Landscaping",
    location: "Erie, CO",
    before: {
      id: "1560518883-ce09059eeffa",
      alt: "Before: overgrown yard needing landscape design",
    },
    after: {
      id: "1416879595882-3373a0480b5b",
      alt: "After: professionally landscaped garden",
    },
  },
  {
    id: "fencing",
    label: "Fencing",
    location: "Longmont, CO",
    before: {
      id: "1558618047-6e3b4b1ae965",
      alt: "Before: yard without fence",
    },
    after: {
      id: "1570129477492-61a28b2f9e3f",
      alt: "After: beautiful new wooden privacy fence installed",
    },
  },
  {
    id: "power-washing",
    label: "Power Washing",
    location: "Lafayette, CO",
    before: {
      id: "1558618666-fcd25c85cd64",
      alt: "Before: dirty, stained driveway",
    },
    after: {
      id: "1599686102-9a4af6b85e49",
      alt: "After: clean bright driveway after power washing",
    },
  },
] as const;

// ── Placeholder Reviews (Phase 1) ─────────────────────────────────
// Replace with live Google Places API data in Phase 2
export const PLACEHOLDER_REVIEWS = [
  {
    name: "Jennifer M.",
    rating: 5,
    date: "November 2024",
    text: "Forge Point completely transformed our backyard. The crew was professional, on time, and the quality exceeded our expectations. Our neighbors keep asking who did it!",
  },
  {
    name: "David T.",
    rating: 5,
    date: "October 2024",
    text: "We hired Forge Point for our HOA's grounds maintenance and it's been a game changer. Responsive, reliable, and the properties have never looked better.",
  },
  {
    name: "Sarah K.",
    rating: 5,
    date: "September 2024",
    text: "Had them do power washing and a full fence install. Two completely different jobs and both were done perfectly. Transparent pricing and great communication throughout.",
  },
] as const;

// ── Service Area Map ──────────────────────────────────────────────
export const SERVICE_ZIP_CODES = [
  { zip: "80501", name: "Longmont",        lat: 40.1672, lng: -105.1019 },
  { zip: "80516", name: "Erie",            lat: 40.0505, lng: -105.0419 },
  { zip: "80520", name: "Firestone",       lat: 40.1522, lng: -104.9506 },
  { zip: "80530", name: "Frederick",       lat: 40.1006, lng: -104.9281 },
  { zip: "80514", name: "Dacono",          lat: 40.0852, lng: -104.9422 },
  { zip: "80301", name: "Boulder",         lat: 40.0150, lng: -105.2705 },
  { zip: "80503", name: "Gunbarrel",       lat: 40.0753, lng: -105.1558 },
  { zip: "80026", name: "Lafayette",       lat: 39.9939, lng: -105.0894 },
  { zip: "80027", name: "Louisville",      lat: 39.9778, lng: -105.1442 },
  { zip: "80023", name: "Broomfield",      lat: 39.9241, lng: -105.0866 },
  { zip: "80602", name: "Thornton",        lat: 39.9033, lng: -104.9719 },
  { zip: "80234", name: "Northglenn",      lat: 39.9094, lng: -104.9897 },
  { zip: "80229", name: "Westminster",     lat: 39.8614, lng: -104.9803 },
  { zip: "80003", name: "Arvada",          lat: 39.8353, lng: -105.0844 },
  { zip: "80603", name: "Brighton",        lat: 40.0247, lng: -104.8089 },
  { zip: "80022", name: "Commerce City",   lat: 39.8083, lng: -104.9339 },
  { zip: "80031", name: "Westminster N",   lat: 39.8967, lng: -105.0372 },
] as const;

export const MAP_CENTER = { lat: 39.98, lng: -105.04 };
export const MAP_ZOOM   = 10;
