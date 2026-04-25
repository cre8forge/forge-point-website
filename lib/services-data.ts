// ================================================================
// FORGE POINT — Service page definitions
// One entry per service page. Photos are Unsplash IDs.
// Swap photos from the admin Unsplash panel (Step 11).
// ================================================================

export interface ServiceIncludesItem {
  title:       string;
  description: string;
}

export interface ServiceGalleryImage {
  id:  string; // Unsplash photo ID
  alt: string;
}

export interface ServiceData {
  slug:              string;
  name:              string;
  shortName:         string;     // used in nav dropdown, related cards
  tagline:           string;     // Cormorant italic under H1
  metaDescription:   string;
  heroImage:         string;     // Unsplash photo ID
  overviewHeading:   string;     // H2 with orange left-bar
  overviewBody:      string[];   // paragraphs
  overviewImage:     string;     // Unsplash photo ID
  includes:          ServiceIncludesItem[];
  gallery:           ServiceGalleryImage[];
  estimatorCategory: string;     // matches EstimateCategory slug
  related:           string[];   // up to 3 other slugs
  category:          string;     // badge label
}

export const SERVICES_DATA: ServiceData[] = [

  // ── 1. Landscape Design & Install ───────────────────────────
  {
    slug:     "landscape-design-install",
    name:     "Landscape Design & Install",
    shortName:"Landscaping",
    tagline:  "Design through completion — turnkey outdoor transformations for Northern Colorado properties.",
    metaDescription:
      "Professional landscape design and installation serving Erie, Longmont, Boulder, and Northern Colorado. Custom sod, plantings, irrigation, hardscaping, and grading.",
    heroImage:       "1416879595882-3373a0480b5b",
    overviewHeading: "Full-Service Landscape Design & Installation",
    overviewBody: [
      "A great landscape isn't just grass and plants — it's a thoughtful system of design, drainage, soil, and materials working together. Forge Point handles every phase from initial site assessment and grading through final planting and irrigation commissioning.",
      "We specialize in properties across Northern Colorado where clay soils, high wind, and freeze-thaw cycles demand materials and techniques built for the region. Whether you're starting from scratch on a new build or refreshing an aging yard, we deliver designs that look great and actually hold up.",
      "Every project includes a detailed written proposal with a clear price range before we ever break ground."
    ],
    overviewImage: "1558618047-6e3b4b1ae965",
    includes: [
      { title: "Site Assessment & Custom Design",   description: "Full property walkthrough, drainage evaluation, and a design plan tailored to your soil, sun, and HOA requirements." },
      { title: "Grading & Drainage Prep",           description: "Proper grading protects your foundation and ensures water moves away from structures — critical in Colorado's clay-heavy soils." },
      { title: "Sod & Seed Installation",           description: "Bluegrass, fescue, and buffalo grass options selected for Northern Colorado's climate and water restrictions." },
      { title: "Native & Ornamental Plantings",     description: "Low-water Colorado native plants, ornamental grasses, perennials, and shrubs that thrive in our region's conditions." },
      { title: "Irrigation System Design & Install",description: "Smart drip and spray systems designed to zone correctly from day one, with seasonal startup and winterization support." },
      { title: "Mulching, Edging & Rock Work",      description: "Defined bed edges, organic and inorganic mulch options, decorative rock borders, and ground cover installation." },
      { title: "Retaining Walls & Hardscaping",     description: "Block, boulder, and timber retaining walls, plus patios, walkways, and step construction in natural stone or concrete." },
      { title: "Outdoor Lighting",                  description: "Low-voltage landscape lighting to highlight plantings, illuminate pathways, and add security after dark." },
    ],
    gallery: [
      { id: "1416879595882-3373a0480b5b", alt: "Professionally landscaped backyard with lush plantings" },
      { id: "1558618047-6e3b4b1ae965",   alt: "Garden bed with native Colorado plantings and stone edging" },
      { id: "1517022812379-23952977f6e7", alt: "Newly installed sod lawn with clean edging" },
    ],
    estimatorCategory: "landscape-design-install",
    related:  ["grounds-maintenance", "power-window-washing", "fencing"],
    category: "Landscaping",
  },

  // ── 2. Grounds Maintenance ───────────────────────────────────
  {
    slug:     "grounds-maintenance",
    name:     "Grounds Maintenance",
    shortName:"Grounds",
    tagline:  "Consistent, reliable care that keeps your property looking its best — week after week.",
    metaDescription:
      "Professional grounds maintenance for residential, HOA, and commercial properties in Northern Colorado. Weekly mowing, edging, fertilization, seasonal clean-ups, and weed control.",
    heroImage:       "1558618666-fcd25c85cd64",
    overviewHeading: "Professional Grounds Maintenance You Can Count On",
    overviewBody: [
      "A well-maintained property doesn't happen by accident — it takes consistent, skilled care on a reliable schedule. Forge Point provides weekly and bi-weekly grounds maintenance programs for homeowners, HOAs, and commercial properties across Northern Colorado.",
      "Every visit follows the same high-standard checklist: mow at the correct height for the season, edge all hard surfaces, trim around obstacles, blow all clippings from driveways and walks, and leave the property looking sharp. No shortcuts.",
      "We handle the work that needs doing whether you're there or not. Communicate any adjustments through our client portal, and we'll take care of the rest."
    ],
    overviewImage: "1571954411453-2fc3f4f8c26d",
    includes: [
      { title: "Weekly & Bi-Weekly Mowing",  description: "Mowed at the correct seasonal height using commercial-grade equipment. We never scalp, never rush." },
      { title: "Edging All Hard Surfaces",   description: "Crisp edges along driveways, sidewalks, curbs, and beds — the detail that separates maintained from professional." },
      { title: "Trimming & String Work",     description: "Around trees, fences, posts, beds, and structures where mowers can't reach." },
      { title: "Blow-Down & Cleanup",        description: "All clippings blown from hard surfaces after every visit. We leave nothing behind." },
      { title: "Seasonal Fertilization",     description: "Targeted fertilizer applications timed to Northern Colorado's growing seasons for a healthy, dense turf." },
      { title: "Weed Control",               description: "Pre-emergent and post-emergent weed treatment for lawn and beds. We address weeds before they take hold." },
      { title: "Spring & Fall Clean-Ups",    description: "Full seasonal service: leaf removal, bed clean-out, edge re-definition, and debris hauling." },
    ],
    gallery: [
      { id: "1558618666-fcd25c85cd64",   alt: "Freshly mowed and edged residential lawn" },
      { id: "1491553895291-0a57f6a0b2ef", alt: "Clean, well-maintained grounds of a commercial property" },
      { id: "1416879595882-3373a0480b5b", alt: "Manicured landscape after seasonal clean-up" },
    ],
    estimatorCategory: "grounds-maintenance",
    related:  ["landscape-design-install", "power-window-washing", "hoa-commercial-property"],
    category: "Grounds",
  },

  // ── 3. Fencing ───────────────────────────────────────────────
  {
    slug:     "fencing",
    name:     "Fencing",
    shortName:"Fencing",
    tagline:  "Supply & install for residential, HOA, and commercial properties — built to last Colorado's seasons.",
    metaDescription:
      "Professional fence installation in Northern Colorado. Wood, vinyl, chain link, and ornamental iron fencing for residential, HOA, and commercial properties. Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1570129477492-61a28b2f9e3f",
    overviewHeading: "Fencing Built for Northern Colorado",
    overviewBody: [
      "Colorado's freeze-thaw cycles, high wind, and intense UV exposure are hard on fences that weren't built for the region. Forge Point installs fencing with the hardware, post depth, and materials selection that our climate demands — not what works in California or Texas.",
      "We work with homeowners replacing aging privacy fences, HOAs selecting community-wide styles, and commercial operators securing large perimeters. We can supply materials, install materials you've already purchased, or manage the full project end-to-end.",
      "Every fence quote includes post placement mapping, materials list, and a clear timeline. No vague estimates."
    ],
    overviewImage: "1544984243-ec14f12dd8aa",
    includes: [
      { title: "Wood Fencing",         description: "Cedar and pine privacy fence in 6' and 8' heights. Dog-ear, board-on-board, and shadowbox styles. Staining and sealing available." },
      { title: "Vinyl Fencing",        description: "Low-maintenance vinyl in privacy, picket, and ranch rail styles. Popular with HOAs for uniformity and longevity." },
      { title: "Chain Link",           description: "Galvanized and vinyl-coated chain link for residential yards, commercial perimeters, and dog runs. Gates and access points included." },
      { title: "Ornamental Iron & Steel",description: "Powder-coated ornamental iron and steel fencing and gates. Custom heights and styles for decorative and security applications." },
      { title: "Install-Only Service", description: "Already have your fence materials? We install. We verify your material list, confirm post placement, and handle all labor." },
      { title: "Repairs & Board Replacement",description: "Leaning posts, broken boards, damaged gates, and full section replacement. We repair all fence types." },
    ],
    gallery: [
      { id: "1570129477492-61a28b2f9e3f", alt: "Newly installed cedar privacy fence in residential backyard" },
      { id: "1544984243-ec14f12dd8aa",   alt: "White vinyl picket fence on a Colorado property" },
      { id: "1503614472-8c253e53fca9",   alt: "Ornamental iron fence and gate at a property entrance" },
    ],
    estimatorCategory: "fencing",
    related:  ["landscape-design-install", "power-window-washing", "industrial-maintenance"],
    category: "Fencing",
  },

  // ── 4. Power & Window Washing ────────────────────────────────
  {
    slug:     "power-window-washing",
    name:     "Power & Window Washing",
    shortName:"Washing",
    tagline:  "Restore curb appeal fast — driveways, siding, decks, patios, and windows.",
    metaDescription:
      "Professional power washing and window cleaning in Northern Colorado. Driveways, house washing, decks, patios, gutters, and commercial surfaces. Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1599686102-9a4af6b85e49",
    overviewHeading: "Power Washing & Window Cleaning That Shows",
    overviewBody: [
      "Northern Colorado's combination of construction dust, wind, cottonwood, and UV exposure leaves properties looking worn fast. Forge Point's power and soft-wash services restore surfaces to their best without damaging materials that high-pressure washing can harm.",
      "We match pressure, temperature, and cleaning agents to the surface — concrete gets a different treatment than painted siding, and wood decks require a different approach than brick. The right method matters as much as the machine.",
      "Window cleaning is available as a standalone service or bundled with exterior washing. Interior and exterior window cleaning available for residential and commercial properties."
    ],
    overviewImage: "1558618666-fcd25c85cd64",
    includes: [
      { title: "Driveway & Concrete Cleaning",  description: "High-pressure cleaning for driveways, sidewalks, and concrete surfaces. Removes oil stains, dirt, algae, and discoloration." },
      { title: "House & Siding Wash",           description: "Soft-wash technique for painted wood, vinyl, stucco, and brick siding. Removes mold, mildew, and oxidation without damage." },
      { title: "Deck & Patio Cleaning",         description: "Deck washing for wood, composite, and concrete patios. Prep work for staining and sealing available." },
      { title: "Window Cleaning",               description: "Interior and exterior window cleaning for residential and commercial properties. Screens removed and cleaned separately." },
      { title: "Gutter Cleaning & Flush",       description: "Debris removal, downspout flushing, and inspection. We confirm your gutters are draining correctly before we leave." },
      { title: "Commercial Surface Cleaning",   description: "Storefronts, parking structures, sidewalks, and commercial exteriors. Graffiti removal available." },
    ],
    gallery: [
      { id: "1599686102-9a4af6b85e49",   alt: "Before and after power washing on a residential driveway" },
      { id: "1558618666-fcd25c85cd64",   alt: "Sparkling clean windows on a Colorado home" },
      { id: "1416879595882-3373a0480b5b", alt: "Clean deck after professional pressure washing" },
    ],
    estimatorCategory: "power-window-washing",
    related:  ["grounds-maintenance", "fencing", "landscape-design-install"],
    category: "Washing",
  },

  // ── 5. Industrial Maintenance ────────────────────────────────
  {
    slug:     "industrial-maintenance",
    name:     "Industrial Maintenance",
    shortName:"Industrial",
    tagline:  "Large-scale commercial and industrial property upkeep — reliable, consistent, professional.",
    metaDescription:
      "Industrial and commercial property maintenance in Northern Colorado. Parking lot sweeping, exterior cleaning, loading dock maintenance, and large-scale facility upkeep.",
    heroImage:       "1486325212027-8081e485255e",
    overviewHeading: "Industrial & Commercial Property Maintenance",
    overviewBody: [
      "Industrial and commercial properties demand a different scale of service — large paved surfaces, high-traffic entries, loading areas, and exterior facades that take a beating from operations and weather. Forge Point has the equipment and crew capacity to handle large facilities efficiently.",
      "We work with property managers, facility directors, and operations teams to establish service schedules that keep properties compliant, clean, and professional-looking without disrupting daily operations. Early morning and weekend scheduling available.",
      "All work is documented with before/after photo reports, so you always have a clear record of what was serviced and when."
    ],
    overviewImage: "1560518883-ce09059eeffa",
    includes: [
      { title: "Parking Lot Sweeping & Blowing",    description: "Commercial riding and walk-behind sweeping for lots of all sizes. Removes debris, gravel, and sediment that damages pavement." },
      { title: "Exterior Building Cleaning",        description: "Soft and pressure washing for commercial building facades, entrances, and loading areas." },
      { title: "Loading Dock & Bay Cleaning",       description: "Degreasing and pressure washing of loading docks and bays. Removes oil, fuel, and buildup that creates safety hazards." },
      { title: "Concrete Sealing & Degreasing",    description: "Surface degreasing and penetrating sealer application to extend pavement life and improve appearance." },
      { title: "Large-Scale Power Washing",         description: "Warehouse floors, manufacturing exteriors, storage yards, and commercial pads. We have the equipment for the job." },
    ],
    gallery: [
      { id: "1486325212027-8081e485255e", alt: "Clean commercial building exterior and parking facility" },
      { id: "1560518883-ce09059eeffa",   alt: "Large commercial property with well-maintained grounds" },
      { id: "1599686102-9a4af6b85e49",   alt: "Industrial surface cleaning in progress" },
    ],
    estimatorCategory: "industrial-maintenance",
    related:  ["hoa-commercial-property", "property-management", "power-window-washing"],
    category: "Industrial",
  },

  // ── 6. HOA & Commercial Property Management ─────────────────
  {
    slug:     "hoa-commercial-property",
    name:     "HOA & Commercial Property Management",
    shortName:"HOA & Commercial",
    tagline:  "Trusted by HOA boards and commercial property managers across Northern Colorado.",
    metaDescription:
      "HOA and commercial property management services in Northern Colorado. Grounds management, vendor coordination, seasonal enhancements, common area maintenance, and property inspection reports.",
    heroImage:       "1560518883-ce09059eeffa",
    overviewHeading: "HOA & Commercial Property Management Services",
    overviewBody: [
      "HOA boards and commercial property managers have one thing in common: they need a property services partner they can trust to show up, do the work correctly, and communicate clearly. Forge Point has built its business around being that partner.",
      "We manage the grounds, coordinate vendors, plan seasonal enhancements, and provide written documentation for board reporting. Our clients don't have to chase us — we're proactive about what needs attention and transparent about what's been done.",
      "Whether you manage a single commercial building or a multi-phase HOA community, we scale to your needs and provide consistent service standards across every property in your portfolio."
    ],
    overviewImage: "1416879595882-3373a0480b5b",
    includes: [
      { title: "Full Grounds Management",          description: "Mowing, edging, trimming, fertilization, weed control, and seasonal clean-ups for all common areas and community grounds." },
      { title: "Common Area Maintenance",          description: "Walkways, entryways, amenity areas, signage corridors, and shared spaces kept clean, safe, and attractive." },
      { title: "Vendor Coordination & Oversight",  description: "We coordinate with irrigation, hardscape, and specialty vendors so you have a single point of contact for all exterior services." },
      { title: "Seasonal Enhancement Planning",    description: "Annuals, seasonal color rotations, mulch refresh, and holiday décor recommendations timed to your community's calendar." },
      { title: "Property Inspection Reports",      description: "Written inspection reports with photos documenting maintenance completed, issues identified, and recommended improvements." },
      { title: "HOA Compliance Support",           description: "Documentation and photographic records supporting HOA board compliance reporting and owner communications." },
    ],
    gallery: [
      { id: "1560518883-ce09059eeffa",   alt: "Well-maintained HOA community with manicured common areas" },
      { id: "1416879595882-3373a0480b5b", alt: "Commercial property with professional landscaping" },
      { id: "1558618666-fcd25c85cd64",   alt: "HOA grounds with clean turf and maintained beds" },
    ],
    estimatorCategory: "hoa-commercial-property",
    related:  ["industrial-maintenance", "property-management", "grounds-maintenance"],
    category: "HOA",
  },

  // ── 7. Property Management ───────────────────────────────────
  {
    slug:     "property-management",
    name:     "Property Management",
    shortName:"Property Mgmt",
    tagline:  "End-to-end property management — tenant relations, maintenance coordination, and financial reporting.",
    metaDescription:
      "Professional property management services in Northern Colorado. Tenant relations, move-in/out inspections, maintenance coordination, vendor management, and monthly financial reporting.",
    heroImage:       "1560185893-a55b8a6f7e89",
    overviewHeading: "Property Management That Protects Your Investment",
    overviewBody: [
      "Owning rental property in Northern Colorado is a solid investment — managing it effectively is what makes it profitable. Forge Point's property management service handles tenant relations, maintenance coordination, vendor oversight, and financial reporting so you can own without the day-to-day.",
      "We treat every property we manage as if it were our own. That means proactive maintenance instead of reactive repairs, documented inspections at every turn, and clear communication with both owners and tenants.",
      "Our local knowledge of Northern Colorado's rental market, maintenance vendors, and compliance requirements means fewer vacancies, better-qualified tenants, and a property that holds its value."
    ],
    overviewImage: "1558618047-6e3b4b1ae965",
    includes: [
      { title: "Tenant Relations & Communications",  description: "Single point of contact for tenant needs, requests, and communications. We handle it so you don't have to." },
      { title: "Move-In & Move-Out Inspections",     description: "Documented photo inspections at every tenancy transition. Clear records that protect you from unfounded deposit disputes." },
      { title: "Maintenance Coordination",           description: "24/7 maintenance request intake, vendor dispatch, and follow-up. Issues resolved quickly — we don't let things sit." },
      { title: "Vendor Management",                  description: "We maintain relationships with licensed, insured contractors for all trade work. Competitive pricing, vetted quality." },
      { title: "Monthly Financial Reporting",        description: "Clear monthly income and expense statements, rent ledgers, and maintenance cost summaries delivered on a consistent schedule." },
      { title: "24/7 Emergency Response",            description: "After-hours emergency maintenance triage and dispatch. Burst pipes and HVAC failures don't wait for business hours — neither do we." },
    ],
    gallery: [
      { id: "1560185893-a55b8a6f7e89", alt: "Well-maintained rental property with clean curb appeal" },
      { id: "1558618047-6e3b4b1ae965", alt: "Property exterior showing professional maintenance" },
      { id: "1486325212027-8081e485255e", alt: "Commercial rental property with maintained grounds" },
    ],
    estimatorCategory: "property-management",
    related:  ["hoa-commercial-property", "industrial-maintenance", "grounds-maintenance"],
    category: "Management",
  },


  // ── 8. Renovation & Remodel ──────────────────────────────────
  {
    slug:     "renovation-remodel",
    name:     "Renovation & Remodel",
    shortName:"Renovation",
    tagline:  "Whole-home and targeted renovations that restore, modernize, and add lasting value.",
    metaDescription:
      "Professional renovation and remodeling services in Northern Colorado. Kitchen, bath, basement, and whole-home remodels for residential and investment properties. Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1503387762-592deb58ef4e",
    overviewHeading: "Renovation Built to Last — Not Just to List",
    overviewBody: [
      "A renovation is one of the most significant investments a homeowner makes. Forge Point approaches every remodel with the same discipline we apply to commercial construction — detailed scope, clear pricing, and skilled trades who take pride in their work.",
      "We handle complete gut-and-rebuild renovations as well as targeted updates that maximize ROI for rental property owners and homeowners preparing to sell. Every project is planned before a single nail is pulled, so surprises stay off the job site.",
      "From framing to finish, we self-perform the work our team is licensed for and bring in vetted trade partners — electrical, plumbing, HVAC — so you have a single point of accountability from demo to move-in.",
    ],
    overviewImage: "1560185893-a55b8a6f7e89",
    includes: [
      { title: "Full Home Renovation",           description: "Complete renovation of existing structures — floor plan modifications, structural changes, systems updates, and all finishes." },
      { title: "Basement Finishing & Conversion", description: "Transform unfinished basements into legal living space: egress, insulation, framing, drywall, flooring, and lighting." },
      { title: "Additions & Expansions",          description: "Bump-outs, room additions, and above-garage buildouts to expand your usable square footage." },
      { title: "Investment Property Rehab",       description: "High-ROI renovations for rental and fix-and-flip properties. We know what buyers and tenants value in Northern Colorado." },
      { title: "Demo & Site Preparation",         description: "Full demolition with responsible disposal, structural assessment, and site preparation before new construction begins." },
      { title: "Trade Coordination",              description: "We coordinate licensed electrical, plumbing, and HVAC partners so all rough-in work is completed before we close walls." },
    ],
    gallery: [
      { id: "1503387762-592deb58ef4e", alt: "Modern home interior after full renovation" },
      { id: "1560185893-a55b8a6f7e89", alt: "Renovated living space with clean finishes" },
      { id: "1486325212027-8081e485255e", alt: "Renovation project in progress" },
    ],
    estimatorCategory: "renovation-remodel",
    related:  ["framing-finishes", "kitchen-bath-more", "decks-pergolas-patios"],
    category: "Custom Living",
  },

  // ── 9. Framing & Finishes ────────────────────────────────────
  {
    slug:     "framing-finishes",
    name:     "Framing & Finishes",
    shortName:"Framing",
    tagline:  "Structural framing and premium interior finishes — the bones and beauty of your build.",
    metaDescription:
      "Professional framing and interior finish work in Northern Colorado. Structural framing, drywall, trim carpentry, flooring, and painting for residential and commercial projects.",
    heroImage:       "1504307651254-35680f356dbe",
    overviewHeading: "Precision Framing. Crafted Finishes.",
    overviewBody: [
      "The quality of a building starts with its frame and ends with its finishes. Forge Point self-performs both — which means the crew that builds your walls is the same crew that sees them through to a finished, painted surface.",
      "We frame new construction, additions, and renovations to code, then carry the work through drywall, mud, paint, trim carpentry, and flooring installation. No hand-offs to sub-contractors who don't know the project — we own it from start to finish.",
      "Our finish carpenters take pride in the details: tight miters, level casings, consistent reveals, and paint that goes on smooth. These are the things you notice every day for the next twenty years.",
    ],
    overviewImage: "1517022812379-23952977f6e7",
    includes: [
      { title: "Structural & Partition Framing", description: "Load-bearing and non-structural wall framing for new builds, additions, and interior reconfigurations." },
      { title: "Drywall & Finishing",            description: "Hang, tape, mud, sand, and texture to level 4 or 5 finish. We don't rush the mud — it shows in the final product." },
      { title: "Interior Painting",              description: "Primer, finish coats, trim, ceilings, and accent walls. We prep properly and clean up completely." },
      { title: "Trim & Millwork",                description: "Baseboards, door casings, crown molding, chair rail, wainscoting, and custom built-ins by finish carpenters." },
      { title: "Hardwood & LVP Flooring",        description: "Installation of hardwood, engineered wood, and luxury vinyl plank flooring with proper acclimation and subfloor prep." },
      { title: "Tile & Stone Work",              description: "Floor and wall tile installation for entryways, mudrooms, bathrooms, and kitchens. Straight lines, tight grout." },
    ],
    gallery: [
      { id: "1504307651254-35680f356dbe", alt: "Framing in progress on a residential addition" },
      { id: "1517022812379-23952977f6e7", alt: "Finished interior with trim and paint complete" },
      { id: "1544984243-ec14f12dd8aa", alt: "Clean finish work on new construction interior" },
    ],
    estimatorCategory: "framing-finishes",
    related:  ["renovation-remodel", "kitchen-bath-more", "decks-pergolas-patios"],
    category: "Custom Living",
  },

  // ── 10. Kitchen, Bath & More ─────────────────────────────────
  {
    slug:     "kitchen-bath-more",
    name:     "Kitchen, Bath & More",
    shortName:"Kitchen & Bath",
    tagline:  "The rooms that sell homes and define daily life — done right, the first time.",
    metaDescription:
      "Professional kitchen and bathroom remodeling in Northern Colorado. Cabinet installation, countertops, tile, fixtures, and full room transformations for Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1556909114-44e3e9c56d95",
    overviewHeading: "Kitchen & Bath Remodels That Deliver ROI",
    overviewBody: [
      "Kitchens and bathrooms are where homeowners get their money back — and where they spend their mornings. Forge Point brings contractor-level execution to these high-impact spaces without the contractor markup that comes from managing multiple subs.",
      "We handle full gut-and-rebuild transformations as well as targeted refreshes — new countertops and backsplash, cabinet refinishing, fixture replacement, and tile work. Tell us your budget and your goals, and we'll scope the work that makes the most sense.",
      "Every kitchen and bath project includes design consultation, material sourcing support, and a detailed written scope before work begins. You know exactly what you're getting before we start.",
    ],
    overviewImage: "1503614472-8c253e53fca9",
    includes: [
      { title: "Cabinet Installation & Refinishing", description: "New cabinet installation, door replacement, and refinishing to modernize kitchens and baths without full replacement cost." },
      { title: "Countertops & Surfaces",             description: "Quartz, granite, butcher block, and solid surface countertop installation with proper undermount sink cutouts." },
      { title: "Backsplash & Wall Tile",             description: "Subway tile, mosaic, stone, and large-format tile installation for kitchen and bath walls and niches." },
      { title: "Floor Tile & Heated Floors",         description: "Porcelain, ceramic, and stone floor tile for kitchens and baths. Electric radiant heat underlayment available." },
      { title: "Fixture & Appliance Installation",   description: "Faucets, sinks, vanities, showers, tubs, and appliance installation and connection (with licensed plumbing partners)." },
      { title: "Laundry Room & Mudroom Buildouts",   description: "Custom cabinetry, shelving, utility sinks, and built-in storage for laundry and mudroom spaces." },
    ],
    gallery: [
      { id: "1556909114-44e3e9c56d95", alt: "Modern kitchen after full renovation with new cabinets and countertops" },
      { id: "1503614472-8c253e53fca9", alt: "Renovated bathroom with tile and new fixtures" },
      { id: "1491553895291-0a57f6a0b2ef", alt: "Kitchen with new backsplash tile and countertops" },
    ],
    estimatorCategory: "kitchen-bath-more",
    related:  ["renovation-remodel", "framing-finishes", "grounds-maintenance"],
    category: "Custom Living",
  },

  // ── 11. Decks, Pergolas & Patios ─────────────────────────────
  {
    slug:     "decks-pergolas-patios",
    name:     "Decks, Pergolas & Patios",
    shortName:"Decks & Patios",
    tagline:  "Custom outdoor living structures built for Colorado's climate and your lifestyle.",
    metaDescription:
      "Custom deck, pergola, and patio construction in Northern Colorado. Composite and wood decks, pergolas, concrete patios, and outdoor living spaces for Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1533090161-9d2efb8c5897",
    overviewHeading: "Outdoor Living Structures Built for Northern Colorado",
    overviewBody: [
      "Colorado's 300 days of sunshine deserve an outdoor space that's actually worth using. Forge Point designs and builds decks, pergolas, and patios that stand up to freeze-thaw cycles, intense UV, and high wind — with materials and fastener systems specified for this climate, not Florida.",
      "We handle every phase: design, permitting, site preparation, framing, decking, railings, and finish details. Our structures are built to code, documented for permit, and designed to add lasting value to your property.",
      "From a simple concrete patio to a multi-level composite deck with integrated pergola and lighting, we scope the project to your budget and build it to last.",
    ],
    overviewImage: "1416879595882-3373a0480b5b",
    includes: [
      { title: "Composite Decking",           description: "Trex, TimberTech, and other premium composite decking systems. Low maintenance, UV-resistant, and warrantied for Colorado conditions." },
      { title: "Pressure-Treated & Cedar Decks", description: "Traditional wood decks with proper flashing, post bases, and hardware to resist moisture and freeze-thaw movement." },
      { title: "Pergolas & Shade Structures", description: "Freestanding and attached pergolas in wood, cedar, and powder-coated aluminum. Custom sizing and roof system options." },
      { title: "Concrete Patios",             description: "Poured concrete patios with exposed aggregate, stamped, or broom finish. Proper base preparation for Colorado's expansive soils." },
      { title: "Paver Patios",                description: "Natural stone, travertine, and concrete paver patios with proper base, edge restraint, and sand-set installation." },
      { title: "Railings & Stairs",           description: "Deck railings in composite, aluminum, cable, and glass systems. Built to IRC code with proper post spacing and attachment." },
    ],
    gallery: [
      { id: "1533090161-9d2efb8c5897", alt: "Custom composite deck with pergola in Colorado backyard" },
      { id: "1416879595882-3373a0480b5b", alt: "Stone paver patio with outdoor seating area" },
      { id: "1571954411453-2fc3f4f8c26d", alt: "Pergola with string lights over outdoor living space" },
    ],
    estimatorCategory: "decks-pergolas-patios",
    related:  ["landscape-design-install", "custom-water-features", "fencing"],
    category: "Outdoor Living",
  },

  // ── 12. Custom Water Features ─────────────────────────────────
  {
    slug:     "custom-water-features",
    name:     "Custom Water Features",
    shortName:"Water Features",
    tagline:  "Ponds, waterfalls, fountains, and pondless systems custom-built for your outdoor space.",
    metaDescription:
      "Custom water feature design and installation in Northern Colorado. Koi ponds, pondless waterfalls, fountains, and stream features for residential properties in Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1544551763-46a013bb70d5",
    overviewHeading: "Water Features That Bring Your Property to Life",
    overviewBody: [
      "A well-designed water feature transforms a yard into a retreat. The sound of moving water, the visual focal point, the wildlife it attracts — Forge Point designs and builds custom water features that are beautiful, balanced, and properly engineered to run reliably through Colorado's seasons.",
      "We build pondless waterfalls for low-maintenance installations, koi ponds for enthusiasts who want a living ecosystem, and decorative fountains for courtyards, entryways, and patios. Every system is designed with proper filtration, winterization planning, and liner systems rated for freeze-thaw conditions.",
      "We integrate water features with existing landscape designs or build standalone focal points. Every project includes a maintenance plan and winterization walkthrough so you know exactly how to care for your investment.",
    ],
    overviewImage: "1558618047-6e3b4b1ae965",
    includes: [
      { title: "Pondless Waterfalls",        description: "Self-contained waterfall systems with underground reservoir — all the visual and sound impact with minimal maintenance and no open pond." },
      { title: "Koi Ponds",                  description: "Custom koi ponds with biological filtration, UV clarifiers, aeration, and liner systems designed to support a healthy fish habitat year-round." },
      { title: "Stream & Creek Features",    description: "Naturalistic stream channels connecting upper and lower pools. Boulders, gravel, and native plantings create an authentic landscape feel." },
      { title: "Decorative Fountains",       description: "Freestanding and in-ground fountain systems for patios, entryways, and garden focal points. Wide range of styles from formal to naturalistic." },
      { title: "Filtration & Pump Systems",  description: "Properly sized mechanical and biological filtration matched to your feature's volume, fish load, and Colorado's seasonal temperature swings." },
      { title: "Winterization & Maintenance",description: "Annual winterization service to protect pumps, lines, and liner systems. Spring startup and ongoing maintenance programs available." },
    ],
    gallery: [
      { id: "1544551763-46a013bb70d5", alt: "Custom koi pond with waterfall and naturalistic landscaping" },
      { id: "1558618047-6e3b4b1ae965", alt: "Pondless waterfall feature in residential garden" },
      { id: "1416879595882-3373a0480b5b", alt: "Decorative fountain in landscaped patio setting" },
    ],
    estimatorCategory: "custom-water-features",
    related:  ["decks-pergolas-patios", "landscape-design-install", "grounds-maintenance"],
    category: "Outdoor Living",
  },

  // ── 13. Junk Haul Off ─────────────────────────────────────────
  {
    slug:     "junk-haul-off",
    name:     "Junk Haul Off",
    shortName:"Junk Haul Off",
    tagline:  "Fast, professional junk removal and property cleanouts — we haul it so you don't have to.",
    metaDescription:
      "Junk removal and property cleanout services in Northern Colorado. Furniture, appliances, construction debris, yard waste, and estate cleanouts for Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1558618666-fcd25c85cd64",
    overviewHeading: "Junk Removal Done Right — Same Week Service",
    overviewBody: [
      "Whether you're clearing out a rental property between tenants, prepping a house for sale, cleaning up after a renovation, or just finally dealing with that pile in the garage — Forge Point provides professional junk haul off service that's fast, clean, and responsible.",
      "We handle everything from single-item pickups to full estate and property cleanouts. Our crew does the lifting, loading, and disposal so you don't have to make multiple dump runs or figure out what can be recycled and what can't.",
      "All haul-off jobs are quoted upfront based on volume and material type. We donate and recycle where possible, and we handle the disposal so it's done correctly — not left at the curb for the neighbors to deal with.",
    ],
    overviewImage: "1560518883-ce09059eeffa",
    includes: [
      { title: "Furniture & Appliance Removal",     description: "Sofas, mattresses, refrigerators, washers, dryers, and large items removed from any floor of the home." },
      { title: "Construction & Demo Debris",        description: "Drywall, lumber, concrete, tile, roofing material, and renovation waste cleared and hauled from your job site." },
      { title: "Yard Waste & Storm Debris",         description: "Branches, stumps, old landscaping material, soil, and storm debris hauled and disposed of properly." },
      { title: "Estate & Property Cleanouts",       description: "Full-property cleanouts for estate sales, foreclosures, rental property turnovers, and hoarding situations handled with discretion." },
      { title: "Garage & Basement Cleanouts",       description: "Clear decades of accumulated items from garages, basements, storage sheds, and attics in a single day." },
      { title: "Donation & Recycling Coordination", description: "We sort and separate usable items for donation and recyclable materials to keep as much out of the landfill as possible." },
    ],
    gallery: [
      { id: "1558618666-fcd25c85cd64",   alt: "Clean property after professional junk haul off" },
      { id: "1560518883-ce09059eeffa",   alt: "Property cleanout in progress" },
      { id: "1486325212027-8081e485255e", alt: "Clean commercial property after debris removal" },
    ],
    estimatorCategory: "junk-haul-off",
    related:  ["grounds-maintenance", "property-management", "industrial-maintenance"],
    category: "Grounds & Estates",
  },

] as const;

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: readonly string[]): ServiceData[] {
  return slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is ServiceData => s !== undefined);
}
