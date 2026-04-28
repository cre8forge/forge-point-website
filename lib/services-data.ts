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

export interface ServiceCtaPanel {
  heading:  string;
  body:     string;
  ctaHref:  string;
  ctaLabel: string;
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
  pullQuote?:        string;     // blockquote rendered between Includes and Gallery
  ctaPanel?:         ServiceCtaPanel; // CTA block rendered between pullQuote and Gallery
  includes:          ServiceIncludesItem[];
  gallery:           ServiceGalleryImage[];
  estimatorCategory: string;     // matches EstimateCategory slug
  related:           string[];   // up to 3 other slugs
  category:          string;     // badge label
  disclaimer?:       string;     // legal disclosure shown at bottom of page (Advisory services)
}

const RE_DISCLAIMER =
  "Aaron R. Dolph is a licensed Colorado Real Estate Broker, License #FA100100755, " +
  "operating under Employing Broker Triumph Real Estate Corporation, License #ER1325490. " +
  "Forge Point Real Estate, LLC.";

export const SERVICES_DATA: ServiceData[] = [

  // ── Advisory 1. Buyer Representation ─────────────────────────
  {
    slug:     "buyer-representation",
    name:     "Buyer Representation",
    shortName:"Buyer Rep",
    tagline:  "Whether you're buying your first home or your fifteenth investment property — we see what most agents miss, because we've managed what you're buying.",
    metaDescription:
      "Licensed Colorado real estate buyer representation for homebuyers, move-up buyers, and investors across Northern Colorado. Forge Point Advisory — 15 years of Front Range market and property management experience.",
    heroImage:       "1486406146926-c627a92ad1ab",
    overviewHeading: "Buyer Representation — For Every Buyer, at Every Scale",
    overviewBody: [
      "Forge Point Advisory represents buyers across the full spectrum — first-time homebuyers, move-up families, residential investors, and commercial acquirers — all across Northern Colorado and the Front Range. What sets us apart isn't just market knowledge: it's that we've managed the properties you're buying. We see deferred maintenance before the inspector writes it up. We recognize realistic rental potential versus a seller's optimistic pro forma. We know the HOA flags, the mechanical questions, and the neighborhood dynamics that a purely transactional agent won't think to raise.",
      "Full service page content coming soon. In the meantime, contact us to discuss your purchase — whether it's your primary home or your next investment, we'll bring the same depth to your search.",
    ],
    overviewImage: "1486406146926-c627a92ad1ab",
    includes: [
      { title: "Property Search & Off-Market Sourcing", description: "Active representation and off-market sourcing for residential, investment, and commercial buyers across Northern Colorado." },
      { title: "Investment Property Analysis",          description: "Cap rate, cash-on-cash return, deferred maintenance exposure, and market comp review before any offer is written." },
      { title: "Offer Strategy & Negotiation",          description: "Competitive offer structuring, contingency management, and experienced negotiation representation." },
      { title: "Contract-to-Close Coordination",        description: "Title, inspections, lender communication, and closing logistics managed from accepted offer to keys in hand." },
    ],
    gallery: [
      { id: "1486406146926-c627a92ad1ab", alt: "Commercial property for acquisition analysis" },
      { id: "1486325212027-8081e485255e", alt: "Northern Colorado investment property" },
      { id: "1450101449119-2e7615b5c702", alt: "Real estate purchase contract review" },
    ],
    estimatorCategory: "property-management",
    related:  ["property-management", "renovation-remodel", "grounds-maintenance"],
    category: "Advisory",
    disclaimer: RE_DISCLAIMER,
  },

  // ── Advisory 2. Seller Representation ────────────────────────
  {
    slug:     "seller-representation",
    name:     "Seller Representation",
    shortName:"Seller Rep",
    tagline:  "For homeowners, landlords, and investors who want results — not just a sign in the yard. Honest pricing, presale guidance, and a strategy built around your property.",
    metaDescription:
      "Licensed Colorado real estate seller representation for homeowners, landlords, and investors across Northern Colorado. Strategic pricing, presale improvement guidance, and real buyer relationships.",
    heroImage:       "1486406146926-c627a92ad1ab",
    overviewHeading: "Seller Representation — Strategy First, Listing Second",
    overviewBody: [
      "Forge Point Advisory represents sellers of every property type — primary homes, rental properties, and commercial assets — across Northern Colorado and the Front Range. We don't take listings and wait. We start with an honest assessment of your property's condition and market position, identify presale improvements with a real return on investment, and price it correctly based on actual comps — not optimism. Whether you're selling the home you raised your family in or repositioning a commercial asset, the standard is the same: maximum result, no surprises.",
      "Full service page content coming soon. Contact us to discuss your sale timeline — we'll start with an honest property assessment and tell you exactly where you stand.",
    ],
    overviewImage: "1486406146926-c627a92ad1ab",
    includes: [
      { title: "Pre-Listing Property Assessment", description: "Honest evaluation of condition, deferred maintenance, and improvement opportunities with measurable return on investment." },
      { title: "Strategic Pricing Analysis",      description: "Comp-based pricing analysis with a clear pricing strategy — not just a number, but a rationale for how we get to close." },
      { title: "Renovation & Staging Guidance",   description: "Specific recommendations for presale improvements that move the needle — backed by our renovation and property management experience." },
      { title: "Transaction Management",          description: "Offer review, negotiation, contingency management, and contract-to-close coordination." },
    ],
    gallery: [
      { id: "1486406146926-c627a92ad1ab", alt: "Property positioned for sale" },
      { id: "1486325212027-8081e485255e", alt: "Northern Colorado residential property listing" },
      { id: "1450101449119-2e7615b5c702", alt: "Seller representation contract review" },
    ],
    estimatorCategory: "property-management",
    related:  ["property-management", "renovation-remodel", "grounds-maintenance"],
    category: "Advisory",
    disclaimer: RE_DISCLAIMER,
  },

  // ── Advisory 3. Investment Acquisition Analysis ───────────────
  {
    slug:     "investment-acquisition-analysis",
    name:     "Investment Acquisition Analysis",
    shortName:"Acquisition Analysis",
    tagline:  "Before you buy, know what you're buying — cap rate, cash-on-cash, deferred maintenance, and market comps delivered as a written report.",
    metaDescription:
      "Investment property acquisition analysis for Colorado Front Range properties. Cap rate, cash-on-cash return, deferred maintenance exposure, and market comp analysis delivered as a written report.",
    heroImage:       "1486406146926-c627a92ad1ab",
    overviewHeading: "Acquisition Analysis — Know Before You Buy",
    overviewBody: [
      "Forge Point Advisory analyzes investment properties across Colorado's Front Range for buyers who want an independent, experienced perspective before committing. Our analysis covers cap rate and cash-on-cash return, deferred maintenance exposure (based on a real property manager's eye, not just an inspector's checklist), market comps, and a realistic assessment of the seller's pro forma. Delivered as a written report — not a sales pitch.",
      "Full service page content coming soon. If you have a property under contract or are evaluating an off-market deal, contact us — we can typically turn around an analysis within a week.",
    ],
    overviewImage: "1486406146926-c627a92ad1ab",
    includes: [
      { title: "Cap Rate & Cash-on-Cash Analysis",      description: "Market-grounded return analysis that models actual operating expenses, not seller-optimized assumptions." },
      { title: "Deferred Maintenance Assessment",        description: "Experienced review of condition-related risk — informed by years of managing similar asset types." },
      { title: "Market Comp & Rent Analysis",           description: "Current comparable sales and rental rate analysis to validate pricing and pro forma income assumptions." },
      { title: "Written Acquisition Report",            description: "Delivered as a clear written document with a recommendation: proceed, negotiate, or pass — and why." },
    ],
    gallery: [
      { id: "1486406146926-c627a92ad1ab", alt: "Investment property acquisition analysis" },
      { id: "1486325212027-8081e485255e", alt: "Colorado Front Range investment property" },
      { id: "1450101449119-2e7615b5c702", alt: "Acquisition analysis report review" },
    ],
    estimatorCategory: "property-management",
    related:  ["property-management", "renovation-remodel", "grounds-maintenance"],
    category: "Advisory",
    disclaimer: RE_DISCLAIMER,
  },

  // ── Advisory 4. Commercial Leasing Advisory ───────────────────
  {
    slug:     "commercial-leasing-advisory",
    name:     "Commercial Leasing Advisory",
    shortName:"Leasing Advisory",
    tagline:  "Tenant representation and landlord advisory for commercial leases — we've sat on both sides of the table.",
    metaDescription:
      "Commercial leasing advisory for office, retail, industrial, and flex space across Northern Colorado. Tenant representation and landlord advisory backed by 4M+ sq ft of commercial management experience.",
    heroImage:       "1486406146926-c627a92ad1ab",
    overviewHeading: "Commercial Leasing — From Both Sides of the Table",
    overviewBody: [
      "Forge Point Advisory provides tenant representation and landlord advisory for commercial leases across Northern Colorado — office, retail, industrial, and flex. Having managed over 4 million square feet of commercial space, we know what both sides of a commercial lease negotiation are thinking. That knowledge is worth more than a standard agent's market survey.",
      "Full service page content coming soon. Whether you're a tenant evaluating space or a landlord structuring a lease, contact us to discuss how we can represent your interests.",
    ],
    overviewImage: "1486406146926-c627a92ad1ab",
    includes: [
      { title: "Tenant Representation",         description: "Space search, lease negotiation, and tenant improvement coordination for office, retail, industrial, and flex tenants." },
      { title: "Landlord Leasing Advisory",     description: "Positioning, marketing strategy, tenant screening, and lease structuring advisory for commercial landlords." },
      { title: "Lease Review & Analysis",        description: "Plain-language review of lease terms — CAM reconciliation, escalation clauses, exclusivity provisions, and renewal options." },
      { title: "Tenant Improvement Coordination",description: "Coordination of tenant improvement buildouts from landlord allowance negotiation through construction completion." },
    ],
    gallery: [
      { id: "1486406146926-c627a92ad1ab", alt: "Commercial space under lease negotiation" },
      { id: "1486325212027-8081e485255e", alt: "Northern Colorado commercial real estate" },
      { id: "1450101449119-2e7615b5c702", alt: "Commercial lease document review" },
    ],
    estimatorCategory: "property-management",
    related:  ["property-management", "renovation-remodel", "grounds-maintenance"],
    category: "Advisory",
    disclaimer: RE_DISCLAIMER,
  },

  // ── Advisory 5. Portfolio Strategy & Disposition ──────────────
  {
    slug:     "portfolio-strategy",
    name:     "Portfolio Strategy & Disposition",
    shortName:"Portfolio Strategy",
    tagline:  "Hold, sell, refinance, or 1031 — think through the full picture before you move.",
    metaDescription:
      "Investment property portfolio strategy and disposition advisory for Colorado Front Range property owners. Hold-sell analysis, 1031 coordination, and refinance evaluation with CPA and attorney coordination.",
    heroImage:       "1486406146926-c627a92ad1ab",
    overviewHeading: "Portfolio Strategy — The Full Picture Before You Move",
    overviewBody: [
      "Forge Point Advisory helps investment property owners think through portfolio decisions with the depth the stakes require — hold, sell, refinance, or 1031. We coordinate with your CPA and attorney, model the scenarios, and give you an informed recommendation. No transaction fee unless we represent the deal.",
      "Full service page content coming soon. If you're evaluating a hold-sell decision or planning a portfolio repositioning, contact us to start the conversation.",
    ],
    overviewImage: "1486406146926-c627a92ad1ab",
    includes: [
      { title: "Hold-Sell Analysis",               description: "Scenario modeling for hold versus disposition — factoring current value, carry costs, depreciation recapture, and opportunity cost." },
      { title: "1031 Exchange Planning",            description: "Replacement property identification strategy, timeline planning, and coordination with your qualified intermediary." },
      { title: "Refinance Evaluation",             description: "Cash-out refinance analysis as an alternative to disposition — modeled against current rates and portfolio goals." },
      { title: "CPA & Attorney Coordination",       description: "We work alongside your tax and legal advisors to ensure the financial and legal dimensions of your decision are fully accounted for." },
    ],
    gallery: [
      { id: "1486406146926-c627a92ad1ab", alt: "Investment property portfolio strategy session" },
      { id: "1486325212027-8081e485255e", alt: "Colorado investment property portfolio" },
      { id: "1450101449119-2e7615b5c702", alt: "Portfolio strategy documentation" },
    ],
    estimatorCategory: "property-management",
    related:  ["property-management", "renovation-remodel", "grounds-maintenance"],
    category: "Advisory",
    disclaimer: RE_DISCLAIMER,
  },

  // ── Advisory 6. 1031 Exchange Coordination ───────────────────
  {
    slug:     "1031-exchange",
    name:     "1031 Exchange Coordination",
    shortName:"1031 Exchange",
    tagline:  "Time-sensitive and unforgiving — we coordinate replacement property identification and acquisition with the precision the timeline demands.",
    metaDescription:
      "1031 exchange coordination for Colorado investment property owners. Replacement property identification, analysis, and acquisition coordination backed by licensed real estate and property management experience.",
    heroImage:       "1486406146926-c627a92ad1ab",
    overviewHeading: "1031 Exchange — Precision When the Clock Is Running",
    overviewBody: [
      "A 1031 exchange is one of the most powerful tax deferral tools available to investment property owners — and one of the most unforgiving if the timeline is mismanaged. Forge Point Advisory coordinates the identification, analysis, and acquisition of 1031 replacement properties with the precision the 45-day identification and 180-day closing windows demand.",
      "Full service page content coming soon. If you have a property under contract for sale and are considering a 1031 exchange, contact us immediately — the clock starts at closing.",
    ],
    overviewImage: "1486406146926-c627a92ad1ab",
    includes: [
      { title: "Replacement Property Identification", description: "Active search and analysis of qualified replacement properties within the 45-day identification window." },
      { title: "Acquisition Analysis",               description: "Cap rate, cash-on-cash return, and condition assessment on replacement candidates before identification deadlines." },
      { title: "Qualified Intermediary Coordination", description: "We work with your QI to ensure proper handling of exchange funds and documentation throughout the process." },
      { title: "Contract-to-Close Management",        description: "Offer writing, negotiation, and closing coordination calibrated to meet the 180-day exchange deadline." },
    ],
    gallery: [
      { id: "1486406146926-c627a92ad1ab", alt: "1031 exchange replacement property analysis" },
      { id: "1486325212027-8081e485255e", alt: "Colorado investment property for 1031 exchange" },
      { id: "1450101449119-2e7615b5c702", alt: "1031 exchange coordination documentation" },
    ],
    estimatorCategory: "property-management",
    related:  ["property-management", "renovation-remodel", "grounds-maintenance"],
    category: "Advisory",
    disclaimer: RE_DISCLAIMER,
  },

  // ── 1. Landscape Design & Install ───────────────────────────
  {
    slug:     "landscape-design-install",
    name:     "Landscape Design & Install",
    shortName:"Landscaping",
    tagline:  "Design through completion — turnkey outdoor transformations for Northern Colorado properties.",
    metaDescription:
      "Professional landscape design and installation serving Erie, Longmont, Boulder, and Northern Colorado. Custom sod, plantings, irrigation, hardscaping, and grading.",
    heroImage:       "1558618666-fcd25c85cd64",
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
      { id: "1558618666-fcd25c85cd64",   alt: "Lush landscaped yard after professional design and installation" },
      { id: "1558618047-6e3b4b1ae965",   alt: "Garden bed with native Colorado plantings and stone edging" },
      { id: "1416879595882-3373a0480b5b", alt: "Newly installed sod lawn with clean edging" },
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
    overviewImage: "1416879595882-3373a0480b5b",
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
      { id: "1558618666-fcd25c85cd64", alt: "Freshly mowed and edged residential lawn" },
      { id: "1571954411453-2fc3f4f8c26d", alt: "Clean, well-maintained grounds of a commercial property" },
      { id: "1558618047-6e3b4b1ae965",   alt: "Manicured landscape after seasonal clean-up" },
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
    heroImage:       "1558618047-3c8c76ca7d04",
    overviewHeading: "Fencing Built for Northern Colorado",
    overviewBody: [
      "Colorado's freeze-thaw cycles, high wind, and intense UV exposure are hard on fences that weren't built for the region. Forge Point installs fencing with the hardware, post depth, and materials selection that our climate demands — not what works in California or Texas.",
      "We work with homeowners replacing aging privacy fences, HOAs selecting community-wide styles, and commercial operators securing large perimeters. We can supply materials, install materials you've already purchased, or manage the full project end-to-end.",
      "Every fence quote includes post placement mapping, materials list, and a clear timeline. No vague estimates."
    ],
    overviewImage: "1570129477492-61a28b2f9e3f",
    includes: [
      { title: "Wood Fencing",         description: "Cedar and pine privacy fence in 6' and 8' heights. Dog-ear, board-on-board, and shadowbox styles. Staining and sealing available." },
      { title: "Vinyl Fencing",        description: "Low-maintenance vinyl in privacy, picket, and ranch rail styles. Popular with HOAs for uniformity and longevity." },
      { title: "Chain Link",           description: "Galvanized and vinyl-coated chain link for residential yards, commercial perimeters, and dog runs. Gates and access points included." },
      { title: "Ornamental Iron & Steel",description: "Powder-coated ornamental iron and steel fencing and gates. Custom heights and styles for decorative and security applications." },
      { title: "Install-Only Service", description: "Already have your fence materials? We install. We verify your material list, confirm post placement, and handle all labor." },
      { title: "Repairs & Board Replacement",description: "Leaning posts, broken boards, damaged gates, and full section replacement. We repair all fence types." },
    ],
    gallery: [
      { id: "1558618047-3c8c76ca7d04",   alt: "Clean white vinyl fence installed on a residential property" },
      { id: "1570129477492-61a28b2f9e3f",   alt: "White vinyl picket fence on a Colorado property" },
      { id: "1558618666-fcd25c85cd64",   alt: "Ornamental iron fence and gate at a property entrance" },
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
    heroImage:       "1527515637462-cff94aca208b",
    overviewHeading: "Power Washing & Window Cleaning That Shows",
    overviewBody: [
      "Northern Colorado's combination of construction dust, wind, cottonwood, and UV exposure leaves properties looking worn fast. Forge Point's power and soft-wash services restore surfaces to their best without damaging materials that high-pressure washing can harm.",
      "We match pressure, temperature, and cleaning agents to the surface — concrete gets a different treatment than painted siding, and wood decks require a different approach than brick. The right method matters as much as the machine.",
      "Window cleaning is available as a standalone service or bundled with exterior washing. Interior and exterior window cleaning available for residential and commercial properties."
    ],
    overviewImage: "1599686102-9a4af6b85e49",
    includes: [
      { title: "Driveway & Concrete Cleaning",  description: "High-pressure cleaning for driveways, sidewalks, and concrete surfaces. Removes oil stains, dirt, algae, and discoloration." },
      { title: "House & Siding Wash",           description: "Soft-wash technique for painted wood, vinyl, stucco, and brick siding. Removes mold, mildew, and oxidation without damage." },
      { title: "Deck & Patio Cleaning",         description: "Deck washing for wood, composite, and concrete patios. Prep work for staining and sealing available." },
      { title: "Window Cleaning",               description: "Interior and exterior window cleaning for residential and commercial properties. Screens removed and cleaned separately." },
      { title: "Gutter Cleaning & Flush",       description: "Debris removal, downspout flushing, and inspection. We confirm your gutters are draining correctly before we leave." },
      { title: "Commercial Surface Cleaning",   description: "Storefronts, parking structures, sidewalks, and commercial exteriors. Graffiti removal available." },
    ],
    gallery: [
      { id: "1527515637462-cff94aca208b", alt: "Pressure washing a driveway surface — before and after" },
      { id: "1599686102-9a4af6b85e49",   alt: "Sparkling clean windows on a Colorado home" },
      { id: "1558618666-fcd25c85cd64",   alt: "Clean deck after professional pressure washing" },
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
      { title: "Striping, Signage & ADA Compliance", description: "Parking lot line striping for stalls, fire lanes, arrows, and loading zones. Signage installation and replacement to current standards. ADA walkthrough audit of stalls, access aisles, ramps, curb cuts, and path-of-travel with written report." },
      { title: "Exterior Building Cleaning",        description: "Soft and pressure washing for commercial building facades, entrances, and loading areas." },
      { title: "Loading Dock & Bay Cleaning",       description: "Degreasing and pressure washing of loading docks and bays. Removes oil, fuel, and buildup that creates safety hazards." },
      { title: "Concrete Sealing & Degreasing",    description: "Surface degreasing and penetrating sealer application to extend pavement life and improve appearance." },
      { title: "Large-Scale Power Washing & Floor Scrubbing", description: "Warehouse floors, manufacturing interiors, storage yards, and commercial pads. Pressure washing and industrial floor scrubbing to clear oil, debris, and buildup from high-traffic concrete surfaces." },
      { title: "TPO & Flat Roof Cleaning",         description: "Low-pressure washing of TPO, EPDM, and built-up flat roofs to remove dirt, debris, and standing sediment. Clean surfaces allow for accurate visual inspection of seams, punctures, and membrane defects before they become leaks." },
    ],
    gallery: [
      { id: "1486325212027-8081e485255e", alt: "Clean commercial building exterior and parking facility" },
      { id: "1560518883-ce09059eeffa",   alt: "Large commercial property with well-maintained grounds" },
      { id: "1599686102-9a4af6b85e49",   alt: "Industrial surface cleaning in progress" },
    ],
    estimatorCategory: "industrial-maintenance",
    related:  ["property-management", "grounds-maintenance", "power-window-washing"],
    category: "Industrial",
  },

  // ── 6. HOA & Commercial Property Management ─────────────────
  {
    slug:     "hoa-commercial-property",
    name:     "HOA & Commercial Property",
    shortName:"HOA & Commercial",
    tagline:  "Our HOA and commercial property management expertise is now part of our comprehensive Property & Portfolio Management program.",
    metaDescription:
      "HOA and commercial property management in Northern Colorado and Denver metro — part of Forge Point's comprehensive Property & Portfolio Management service covering commercial, multifamily, and single-family properties.",
    heroImage:       "1560518883-ce09059eeffa",
    overviewHeading: "HOA & Commercial Management — Part of a Broader Program",
    overviewBody: [
      "Our HOA and commercial property management services have grown into a full Property & Portfolio Management program — one that spans commercial and industrial facilities, multifamily communities, and single-family homes under a unified approach.",
      "We've managed over 4 million square feet of commercial and industrial space and served HOA communities with up to 115 units across Northern Colorado and the Denver metro. That depth of experience is now built into a single, scalable management program.",
      "See our full Property & Portfolio Management page for complete details on commercial, multifamily, on-call, and single-family management programs.",
    ],
    overviewImage: "1558618666-fcd25c85cd64",
    includes: [
      { title: "HOA Common Area Management",       description: "Grounds, common areas, walkways, and amenity spaces maintained to board standards with photographic reporting after every service." },
      { title: "Commercial Property Oversight",    description: "Office, retail, and industrial property management including vendor coordination, routine inspections, and tenant communications." },
      { title: "Board & Manager Reporting",        description: "Written reports, photo documentation, and financial summaries prepared for HOA boards and commercial property managers on a consistent schedule." },
      { title: "Seasonal Enhancement Planning",    description: "Annual and perennial plantings, mulch refresh, seasonal color rotations, and exterior enhancements timed to your community's standards and calendar." },
      { title: "Vendor Coordination",              description: "Single point of contact coordinating all exterior service vendors — landscapers, cleaning crews, irrigation specialists, and trade contractors." },
      { title: "24/7 Emergency Response",          description: "On-call response for after-hours property emergencies. Site visits, vendor dispatch, and owner notification handled immediately when issues arise." },
    ],
    gallery: [
      { id: "1560518883-ce09059eeffa",    alt: "Well-maintained HOA community common area" },
      { id: "1558618666-fcd25c85cd64",    alt: "Commercial property with professional landscaping and grounds" },
      { id: "1486325212027-8081e485255e", alt: "Multifamily property exterior with maintained grounds" },
    ],
    estimatorCategory: "hoa-commercial-property",
    related:  ["property-management", "grounds-maintenance", "industrial-maintenance"],
    category: "HOA",
  },

  // ── 7. Property & Portfolio Management ──────────────────────
  {
    slug:     "property-management",
    name:     "Property & Portfolio Management",
    shortName:"Property Mgmt",
    tagline:  "Full-spectrum property management built on 15 years and millions of square feet of real experience.",
    metaDescription:
      "Professional property and portfolio management in Northern Colorado and Denver metro. Commercial and industrial portfolio management, multifamily communities up to 115 units, and personalized single-family home management. On-call boots-on-ground response for remote property owners.",
    heroImage:       "1560185893-a55b8a6f7e89",
    overviewHeading: "Property Management That Performs at Every Scale",
    overviewBody: [
      "Forge Point's property management practice spans three distinct property types — and our track record speaks across all of them. Over 4 million square feet of commercial and industrial space managed. Multifamily portfolios of up to 115 tenants. And single-family homes handled with the personal attention that individual owners and their tenants actually deserve.",
      "What separates a true property management partner from a vendor is depth: local market knowledge, reliable vendor relationships, documented systems, and the judgment that only comes from years on the ground. We bring all of that to every property we manage — regardless of size or type.",
      "We also offer a flexible on-call model for property owners who already have a management contract but need a trusted local point of contact for 24/7 response, emergency site visits, and coordination when their primary manager isn't physically available. Keep your existing manager — add Forge Point as your boots on the ground.",
    ],
    overviewImage: "1558618047-6e3b4b1ae965",
    includes: [
      { title: "Commercial & Industrial Management",  description: "Full-service management for office parks, retail centers, warehouses, and industrial facilities. We've managed 4M+ sq ft of commercial space — we know what owners, tenants, and inspectors expect at scale." },
      { title: "Multifamily & HOA Management",        description: "Community management for multifamily properties and HOA communities. Portfolios of up to 115 tenants handled with consistent systems, board-ready reporting, and responsive vendor coordination." },
      { title: "Single Family Home Management",       description: "Personalized management for individual rental homes and single-family portfolios. Each property gets a dedicated point of contact who knows the property, the tenants, and the owner's preferences — not just a work order queue." },
      { title: "On-Call Boots-on-Ground Response",   description: "Keep your existing property management contract and add Forge Point as your local 24/7 response partner. We handle site visits, emergency coordination, and physical property presence when your primary manager can't get there. Monthly retainer plus per-response pricing." },
      { title: "Maintenance Coordination",           description: "24/7 maintenance request intake, vendor dispatch, and resolution follow-up. We maintain vetted relationships with licensed contractors across all trades so issues are addressed promptly — not put on a list." },
      { title: "Documented Inspections & Reporting", description: "Move-in, move-out, and routine inspections with photo documentation. Monthly financial statements, maintenance logs, and board-ready reports delivered on a consistent, predictable schedule." },
      { title: "Tenant Relations & Communications",  description: "Single point of contact for all tenant needs, requests, and communications. We handle the day-to-day so owners aren't managing tenants — and document everything for your records." },
      { title: "Vendor & Contractor Oversight",      description: "We manage all property vendors — landscapers, cleaners, trade contractors, and specialists — so you have one point of accountability rather than a list of numbers to call when something breaks." },
    ],
    gallery: [
      { id: "1560185893-a55b8a6f7e89", alt: "Well-maintained commercial property under professional management" },
      { id: "1486325212027-8081e485255e", alt: "Multifamily property with maintained common areas and grounds" },
      { id: "1560518883-ce09059eeffa",   alt: "Single family rental home with strong curb appeal" },
    ],
    estimatorCategory: "property-management",
    related:  ["grounds-maintenance", "home-safety-checks", "industrial-maintenance"],
    category: "Management",
  },

  // ── 7a. Commercial & Industrial Management ──────────────────
  {
    slug:     "commercial-industrial-management",
    name:     "Commercial & Industrial Management",
    shortName:"Commercial Mgmt",
    tagline:  "4M+ square feet of commercial and industrial space managed across Northern Colorado and the Denver metro.",
    metaDescription:
      "Commercial and industrial property management in Northern Colorado and Denver metro. Office parks, retail centers, warehouses, and industrial facilities managed by a team with over 4 million square feet of real experience.",
    heroImage:       "1486325212027-8081e485255e",
    overviewHeading: "Commercial Management Built on Real Scale",
    overviewBody: [
      "Most property management companies work in residential and dabble in commercial. Forge Point is different: we've managed over 4 million square feet of commercial and industrial space across Northern Colorado and the Denver metro. That breadth of experience shapes every system, every vendor relationship, and every inspection standard we apply to your portfolio.",
      "Commercial and industrial properties demand a different level of management rigor than residential — CAM reconciliation, longer lease terms, higher-stakes tenant relationships, and facilities that can't afford to be offline. Our team knows the difference between a landlord's obligation and a tenant's obligation, and we enforce both.",
      "We manage the full range of commercial and industrial assets: office parks, retail centers, flex space, warehouse and distribution facilities, and mixed-use properties. Single assets and multi-property portfolios both welcome.",
    ],
    overviewImage: "1560185893-a55b8a6f7e89",
    pullQuote: "We've managed over 4 million square feet of commercial and industrial space. That's not a marketing claim — it's the foundation of every decision we make on behalf of your property.",
    ctaPanel: {
      heading:  "Managing a Commercial Asset in Northern Colorado?",
      body:     "Whether it's a single office suite or a multi-building industrial portfolio, let's talk about what professional management actually looks like at scale.",
      ctaHref:  "/contact",
      ctaLabel: "Schedule a Consultation",
    },
    includes: [
      { title: "Office & Retail Property Management",  description: "Day-to-day management for office parks, retail centers, and mixed-use properties — tenant communications, vendor coordination, inspection schedules, and landlord compliance." },
      { title: "Industrial & Warehouse Oversight",     description: "Management for industrial facilities, warehouses, flex space, and manufacturing properties. We understand the operational realities of high-traffic, high-stakes commercial environments." },
      { title: "Tenant Relations & Communications",    description: "Single point of contact for all tenant needs, lease questions, and maintenance requests. We document everything so there are no disputes at lease renewal." },
      { title: "Lease Administration Support",         description: "Lease abstract tracking, rent escalation management, CAM reconciliation support, and renewal coordination. Nothing falls through the cracks on complex, long-term leases." },
      { title: "Vendor & Contractor Management",       description: "We manage all property vendors — HVAC contractors, cleaning crews, landscapers, and trade specialists — so you have one point of accountability across your entire portfolio." },
      { title: "Preventive Maintenance Programs",      description: "Documented PM schedules for HVAC systems, roofing, parking facilities, and major building systems. Planned maintenance costs a fraction of emergency response." },
      { title: "Documented Inspections & Reporting",   description: "Routine inspections with photo documentation, written reports, and financial statements delivered on a consistent schedule. Board-ready and lender-ready formats available." },
      { title: "Emergency & After-Hours Response",     description: "24/7 on-call response for property emergencies — site visits, vendor dispatch, and tenant notification handled immediately when issues arise outside business hours." },
    ],
    gallery: [
      { id: "1486325212027-8081e485255e", alt: "Commercial office park exterior with well-maintained grounds and parking" },
      { id: "1560518883-ce09059eeffa",   alt: "Industrial warehouse property under professional management" },
      { id: "1560185893-a55b8a6f7e89",   alt: "Retail center property management in Northern Colorado" },
    ],
    estimatorCategory: "property-management",
    related:  ["multifamily-hoa-management", "single-family-management", "industrial-maintenance"],
    category: "Management",
  },

  // ── 7b. Multifamily & HOA Management ────────────────────────
  {
    slug:     "multifamily-hoa-management",
    name:     "Multifamily & HOA Management",
    shortName:"Multifamily Mgmt",
    tagline:  "Community management for multifamily properties and HOAs — up to 115 units, handled with consistent systems and board-ready reporting.",
    metaDescription:
      "Multifamily and HOA management in Northern Colorado and Denver metro. Communities up to 115 units managed with board-ready reporting, responsive vendor coordination, and thorough common area oversight.",
    heroImage:       "1560185893-a55b8a6f7e89",
    overviewHeading: "Multifamily & HOA Management — Systems, Reporting, Presence",
    overviewBody: [
      "Multifamily communities and HOAs don't run on good intentions — they run on consistent systems, clear communication, and someone who shows up. Forge Point has managed multifamily portfolios of up to 115 tenants and HOA communities with active boards that expect documentation, responsiveness, and professional vendor management.",
      "HOA boards deal with a rotating cast of well-meaning volunteers who inherit whatever the last board set up — or didn't. We bring standardized systems, written vendor contracts, documented inspection protocols, and financial reporting that makes board transitions manageable and board meetings productive.",
      "For multifamily owners, our approach is equally structured: every tenant gets a single point of contact, every maintenance request is tracked and resolved, and every owner gets consistent financial reporting that shows exactly how their asset is performing.",
    ],
    overviewImage: "1486325212027-8081e485255e",
    pullQuote: "HOA boards and multifamily owners deserve reporting that reads like a business — not a list of complaints. We deliver the documentation, the transparency, and the accountability that professional management requires.",
    ctaPanel: {
      heading:  "HOA Board or Multifamily Owner?",
      body:     "Let's talk about what a management transition looks like, what documentation we deliver, and how we handle the vendor relationships that have been giving your board headaches.",
      ctaHref:  "/contact",
      ctaLabel: "Schedule a Consultation",
    },
    includes: [
      { title: "Multifamily Community Management",  description: "Full management for apartment communities and multifamily properties — tenant relations, maintenance oversight, and consistent financial reporting." },
      { title: "HOA Common Area Oversight",         description: "Grounds, common areas, walkways, and amenity spaces maintained to board standards with photographic reporting after every service." },
      { title: "Board Reporting & Documentation",   description: "Written reports, photo documentation, and financial summaries prepared for HOA boards and multifamily owners on a consistent, predictable schedule." },
      { title: "Tenant & Resident Communications",  description: "Single point of contact for all resident needs and community communications. We track every request, every resolution, and every interaction." },
      { title: "Vendor Coordination & Oversight",   description: "We manage all community vendors — landscapers, cleaning crews, irrigation specialists, and trade contractors — under written service agreements with clear scopes." },
      { title: "Move-In / Move-Out Management",     description: "Documented move-in and move-out inspections with photos, written condition reports, and coordinated turnover preparation between tenants." },
      { title: "Seasonal Enhancement Planning",     description: "Annual and perennial plantings, mulch refresh, seasonal color rotations, and exterior improvements timed to your community's standards and annual budget." },
      { title: "Emergency Response",                description: "On-call response for after-hours property and community emergencies. Site visits, vendor dispatch, and resident notification handled promptly." },
    ],
    gallery: [
      { id: "1560185893-a55b8a6f7e89",   alt: "Multifamily apartment community with well-maintained grounds and entry" },
      { id: "1486325212027-8081e485255e", alt: "HOA common area maintained to community standards" },
      { id: "1558618666-fcd25c85cd64",   alt: "Residential community landscaping managed by Forge Point" },
    ],
    estimatorCategory: "property-management",
    related:  ["commercial-industrial-management", "single-family-management", "grounds-maintenance"],
    category: "Management",
  },

  // ── 7c. Single Family Home Management ────────────────────────
  {
    slug:     "single-family-management",
    name:     "Single Family Home Management",
    shortName:"Single Family Mgmt",
    tagline:  "Personalized management for individual rental homes — a dedicated contact who knows your property, your tenants, and your preferences.",
    metaDescription:
      "Single family home management in Northern Colorado and Denver metro. Dedicated contact, documented inspections, maintenance coordination, and tenant relations for individual rental homes and small portfolios.",
    heroImage:       "1560518883-ce09059eeffa",
    overviewHeading: "Single Family Management — Personal, Not Transactional",
    overviewBody: [
      "Single family rental properties deserve better than a work order queue and a management company that treats them like an afterthought. Forge Point provides genuinely personalized management for individual rental homes and small portfolios — each property gets a dedicated point of contact who knows the address, the tenant history, the quirks of the mechanicals, and the owner's preferences.",
      "We handle the full scope of single family management: tenant communication, maintenance coordination, documented inspections, and consistent financial reporting. Owners who live out of state or are simply too busy to manage day-to-day get a true partner — not a transaction processor.",
      "Our management model means our incentives align with yours: a well-maintained, fully-tenanted property that generates reliable income and holds its value.",
    ],
    overviewImage: "1558618047-6e3b4b1ae965",
    pullQuote: "Your rental home isn't a line item. It's an asset — and it deserves a manager who treats it like one.",
    ctaPanel: {
      heading:  "Own a Rental Home in Northern Colorado?",
      body:     "Single family management is where most companies cut corners. Let's talk about what a management relationship that actually protects your asset looks like.",
      ctaHref:  "/contact",
      ctaLabel: "Schedule a Consultation",
    },
    includes: [
      { title: "Dedicated Property Contact",         description: "One person who knows your property, your tenants, and your preferences — not a call center, not a rotating roster of assistants." },
      { title: "Tenant Communication & Relations",   description: "All tenant communications handled on your behalf. We maintain a complete record of every interaction so you're never in the dark on your own property." },
      { title: "Routine Inspections",                description: "Scheduled interior and exterior inspections with photo documentation — completed quarterly or semi-annually with written reports delivered to the owner." },
      { title: "Maintenance Coordination",           description: "24/7 maintenance request intake, vendor dispatch, and resolution follow-up. We use vetted local contractors, not whoever is available that day." },
      { title: "Move-In / Move-Out Documentation",   description: "Thorough move-in and move-out inspections with timestamped photo records. Clear documentation protects your deposit and prevents disputes." },
      { title: "Financial Reporting",                description: "Monthly income and expense statements delivered consistently. We give you clean, clear numbers — not a black box." },
      { title: "Compliance & Habitability Oversight",description: "We track and flag code compliance requirements, habitability standards, and local rental licensing requirements so you stay legally protected." },
      { title: "Vendor & Contractor Oversight",      description: "We manage trades, vendors, and service calls on your behalf — with written scopes, documented completion, and no padded invoices." },
    ],
    gallery: [
      { id: "1560518883-ce09059eeffa",   alt: "Single family rental home with well-maintained curb appeal" },
      { id: "1558618047-6e3b4b1ae965",   alt: "Residential rental property managed by Forge Point — Northern Colorado" },
      { id: "1560185893-a55b8a6f7e89",   alt: "Single family home exterior inspection and documentation" },
    ],
    estimatorCategory: "property-management",
    related:  ["boots-on-ground-response", "maintenance-coordination", "investment-property-rehab"],
    category: "Management",
  },

  // ── 7d. Boots-on-Ground Response ─────────────────────────────
  {
    slug:     "boots-on-ground-response",
    name:     "Boots-on-Ground Response",
    shortName:"Boots on Ground",
    tagline:  "Keep your existing property manager — add Forge Point as your trusted local 24/7 response partner.",
    metaDescription:
      "On-call boots-on-ground property response in Northern Colorado and Denver metro. Emergency site visits, vendor dispatch, and physical property presence for remote owners and managers who need a local partner.",
    heroImage:       "1504307651254-35680f356dbe",
    overviewHeading: "Local Presence When Your Manager Can't Get There",
    overviewBody: [
      "Remote property ownership has a permanent blind spot: your property manager isn't physically at your property. When an emergency happens — a burst pipe, a tenant lockout, storm damage, a security concern — someone needs to get eyes on it fast. If your management company is 45 minutes away or operating off an answering service, that gap has a real cost.",
      "Forge Point's boots-on-ground response service fills that gap without replacing your existing management relationship. Keep your current property manager. Add Forge Point as your local on-call response partner — the person who actually drives to the property, assesses the situation, coordinates vendors, and reports back to you and your manager with photos and documentation.",
      "Our model is simple: a monthly retainer covers program availability, and per-response pricing applies when we're dispatched. No long-term management contract required. Cancel any time.",
    ],
    overviewImage: "1558981403-c5f9899a28bc",
    pullQuote: "Physical presence is the one thing remote management can't replicate. We're the local eyes, hands, and judgment your property needs when something actually happens.",
    ctaPanel: {
      heading:  "Remote Owner or Out-of-Area Manager?",
      body:     "Add Forge Point as your local response partner without changing your existing management relationship. Monthly retainer plus per-response pricing — no long-term contract.",
      ctaHref:  "/contact",
      ctaLabel: "Ask About the Program",
    },
    includes: [
      { title: "24/7 Emergency Site Response",          description: "We drive to your property when something happens — burst pipes, storm damage, security concerns, or any situation that requires physical presence to assess and manage." },
      { title: "Vendor Dispatch & Coordination",        description: "We have vetted relationships with plumbers, electricians, roofers, and general trades across Northern Colorado. When something breaks, we dispatch and follow through to resolution." },
      { title: "Property Condition Documentation",      description: "Every site visit is documented with timestamped photos and a written report delivered to the owner and primary manager within hours of the visit." },
      { title: "Owner & Manager Notification",          description: "We communicate clearly and promptly to both the property owner and the primary management contact — so everyone has the same information at the same time." },
      { title: "Seasonal & Storm Damage Assessment",    description: "After significant weather events, we drive the property, document any damage, and coordinate emergency repairs before small problems become large ones." },
      { title: "Utility & Access Coordination",         description: "We serve as the local access contact for utility companies, inspectors, insurance adjusters, and other parties who need physical access to the property." },
      { title: "Monthly Retainer + Per-Response Pricing", description: "A flat monthly retainer covers program availability and periodic check-ins. Per-response pricing applies when we're dispatched. No management contract, no long-term commitment." },
    ],
    gallery: [
      { id: "1504307651254-35680f356dbe", alt: "Property inspection and emergency response site visit in Northern Colorado" },
      { id: "1558981403-c5f9899a28bc",   alt: "On-site property assessment and documentation" },
      { id: "1560518883-ce09059eeffa",   alt: "Property exterior assessment after storm damage" },
    ],
    estimatorCategory: "property-management",
    related:  ["single-family-management", "maintenance-coordination", "home-safety-checks"],
    category: "Management",
  },

  // ── 7e. Maintenance Coordination ─────────────────────────────
  {
    slug:     "maintenance-coordination",
    name:     "Maintenance Coordination",
    shortName:"Maintenance Coord.",
    tagline:  "24/7 maintenance intake, vendor dispatch, and resolution follow-up — so issues get resolved, not queued.",
    metaDescription:
      "Property maintenance coordination in Northern Colorado and Denver metro. 24/7 request intake, vendor dispatch, vetted contractor network, and resolution tracking for residential and commercial properties.",
    heroImage:       "1558981403-c5f9899a28bc",
    overviewHeading: "Maintenance Coordination — From Request to Resolution",
    overviewBody: [
      "The most common failure point in property management isn't strategy — it's maintenance response. A tenant submits a request, and it sits in a queue for 72 hours. A contractor quotes the job, and no one follows up to confirm the work was done. A small leak becomes a large repair because no one was watching.",
      "Forge Point's maintenance coordination service covers the full cycle: 24/7 request intake, priority triage, vetted contractor dispatch, work order tracking, resolution verification, and documentation delivered to the owner. Nothing falls into a black box.",
      "We maintain active relationships with licensed contractors across all trades in Northern Colorado — plumbing, electrical, HVAC, roofing, general construction, and grounds. When a request comes in, we dispatch someone who actually shows up and does the work — not whoever is first on a generic vendor list.",
    ],
    overviewImage: "1560518883-ce09059eeffa",
    pullQuote: "A 48-hour response time on a maintenance request isn't acceptable. We maintain vetted relationships with contractors across all trades so problems get resolved — not queued.",
    ctaPanel: {
      heading:  "Maintenance Response Letting You Down?",
      body:     "Whether you need a complete maintenance coordination program or just reliable vendor dispatch for your existing management, we can build a program around your needs.",
      ctaHref:  "/contact",
      ctaLabel: "Talk to Us",
    },
    includes: [
      { title: "24/7 Maintenance Request Intake",    description: "Tenants and owners can submit maintenance requests at any time through multiple channels. After-hours emergencies are triaged and dispatched immediately." },
      { title: "Emergency vs. Routine Triage",       description: "We distinguish between genuine emergencies that need same-day response and routine requests that can be scheduled — so contractors' time is used well and tenants aren't left waiting." },
      { title: "Vetted Contractor Network",          description: "We use licensed, insured contractors we've worked with and verified across all trades — not whoever answers the phone first. Every contractor in our network has earned their place." },
      { title: "Vendor Dispatch & Scheduling",       description: "We contact the contractor, confirm availability, schedule the work, and communicate the appointment to the tenant. You don't coordinate any of it." },
      { title: "Resolution Follow-Up & Verification",description: "After work is completed, we follow up with the tenant to confirm the issue is resolved. If it isn't, we go back — not to you for direction, but back to the contractor." },
      { title: "Maintenance Log & Documentation",    description: "Every request, dispatch, completion, and cost is logged and available in your owner reporting. A clear maintenance history protects you at lease renewal and at sale." },
      { title: "Owner Reporting",                    description: "Monthly maintenance summary delivered with your financial statements — completed work, open items, costs, and any recurring issues that may require capital attention." },
    ],
    gallery: [
      { id: "1558981403-c5f9899a28bc",   alt: "Property maintenance coordination and inspection in Northern Colorado" },
      { id: "1504307651254-35680f356dbe", alt: "Contractor on-site for maintenance work at a managed property" },
      { id: "1560518883-ce09059eeffa",   alt: "Property exterior maintenance and condition documentation" },
    ],
    estimatorCategory: "property-management",
    related:  ["boots-on-ground-response", "single-family-management", "home-safety-checks"],
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
    overviewImage: "1556909114-f6e7ad7d3136",
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
      { id: "1556909114-f6e7ad7d3136", alt: "Renovated kitchen with clean finishes and modern design" },
      { id: "1504307651254-35680f356dbe", alt: "Framing in progress on a renovation project" },
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
      { id: "1558618047-3c8c76ca7d04", alt: "Clean finish work on new construction interior" },
    ],
    estimatorCategory: "framing-finishes",
    related:  ["renovation-remodel", "kitchen-bath-more", "decks-pergolas-patios"],
    category: "Custom Living",
  },

  // ── 10. Kitchen, Bath & More ─────────────────────────────────
  {
    slug:     "kitchen-bath-more",
    name:     "Kitchen & Bath Remodels",
    shortName:"Kitchen & Bath",
    tagline:  "The rooms that sell homes and define daily life — done right, the first time.",
    metaDescription:
      "Professional kitchen and bathroom remodeling in Northern Colorado. Cabinet installation, countertops, tile, fixtures, and full room transformations for Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1556909114-f6e7ad7d3136",
    overviewHeading: "Kitchen & Bath Remodels That Deliver ROI",
    overviewBody: [
      "Kitchens and bathrooms are where homeowners get their money back — and where they spend their mornings. Forge Point brings contractor-level execution to these high-impact spaces without the contractor markup that comes from managing multiple subs.",
      "We handle full gut-and-rebuild transformations as well as targeted refreshes — new countertops and backsplash, cabinet refinishing, fixture replacement, and tile work. Tell us your budget and your goals, and we'll scope the work that makes the most sense.",
      "Every kitchen and bath project includes design consultation, material sourcing support, and a detailed written scope before work begins. You know exactly what you're getting before we start.",
    ],
    overviewImage: "1552321554-5fefe8c9ef14",
    includes: [
      { title: "Cabinet Installation & Refinishing", description: "New cabinet installation, door replacement, and refinishing to modernize kitchens and baths without full replacement cost." },
      { title: "Countertops & Surfaces",             description: "Quartz, granite, butcher block, and solid surface countertop installation with proper undermount sink cutouts." },
      { title: "Backsplash & Wall Tile",             description: "Subway tile, mosaic, stone, and large-format tile installation for kitchen and bath walls and niches." },
      { title: "Floor Tile & Heated Floors",         description: "Porcelain, ceramic, and stone floor tile for kitchens and baths. Electric radiant heat underlayment available." },
      { title: "Fixture & Appliance Installation",   description: "Faucets, sinks, vanities, showers, tubs, and appliance installation and connection (with licensed plumbing partners)." },
      { title: "Laundry Room & Mudroom Buildouts",   description: "Custom cabinetry, shelving, utility sinks, and built-in storage for laundry and mudroom spaces." },
    ],
    gallery: [
      { id: "1556909114-f6e7ad7d3136", alt: "Modern kitchen after full renovation with new cabinets and countertops" },
      { id: "1552321554-5fefe8c9ef14", alt: "Renovated bathroom with tile and new fixtures" },
      { id: "1556909196-b37f2d7b5e7e", alt: "Kitchen with new backsplash tile and countertops" },
    ],
    estimatorCategory: "kitchen-bath-more",
    related:  ["renovation-remodel", "framing-finishes", "grounds-maintenance"],
    category: "Custom Living",
  },

  // ── 10b. Basement Finishing ──────────────────────────────────
  {
    slug:     "basement-finishing",
    name:     "Basement Finishing",
    shortName:"Basement",
    tagline:  "Colorado's most underused square footage — finished right, permitted properly, and built to last.",
    metaDescription:
      "Professional basement finishing in Northern Colorado. Egress windows, framing, insulation, drywall, flooring, and full basement conversions for Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1600585154340-be6161a56a0c",
    overviewHeading: "Finished Basements That Add Real Value",
    overviewBody: [
      "In Northern Colorado, an unfinished basement is money sitting on the floor. A well-finished basement adds legal living square footage, increases appraised value, and creates usable space that families actually use — home offices, bedrooms, media rooms, gyms, or income-generating rental suites.",
      "Forge Point handles basement finishing from initial framing through final punch list — egress windows, insulation, framing, electrical rough-in coordination, drywall, flooring, trim, and paint. We pull permits, schedule inspections, and build to code so the space is legal, insurable, and marketable when you go to sell.",
      "We also work with investment property owners on basement conversions for ADU rental income — a growing opportunity in Northern Colorado's housing market.",
    ],
    overviewImage: "1504307651254-35680f356dbe",
    includes: [
      { title: "Egress Window Installation",          description: "Colorado requires egress windows in any basement bedroom. We cut, frame, and install compliant egress windows — handled in-house, not subbed out." },
      { title: "Framing & Partition Walls",           description: "Load-bearing assessment and non-structural partition framing to create your planned layout. Bedroom walls, bathroom enclosures, utility room separation." },
      { title: "Insulation & Moisture Control",       description: "Proper below-grade insulation with moisture barrier installation — critical in Colorado's climate for both comfort and building longevity." },
      { title: "Drywall, Mud & Paint",                description: "Hang, tape, finish, and paint to level-4 standard. No basement-grade shortcuts." },
      { title: "Flooring Installation",               description: "LVP, carpet, tile, or epoxy depending on use and budget. Proper subfloor prep for below-grade moisture management." },
      { title: "Bathroom Rough-In & Finish",          description: "Rough-in plumbing coordination and full bathroom finish for basement bath additions. Licensed plumbing partners on call." },
      { title: "Trim, Doors & Hardware",              description: "Baseboard, door casings, interior doors, and hardware to match the rest of the home." },
      { title: "Lighting & Electrical Coordination",  description: "Recessed lighting layout and electrical rough-in coordination with licensed electrical partners." },
    ],
    gallery: [
      { id: "1600585154340-be6161a56a0c", alt: "Finished basement living space with clean drywall and LVP flooring" },
      { id: "1504307651254-35680f356dbe", alt: "Basement framing in progress with partition walls roughed in" },
      { id: "1556909114-f6e7ad7d3136",   alt: "Finished basement with egress window and clean paint" },
    ],
    estimatorCategory: "renovation-remodel",
    related:  ["renovation-remodel", "framing-finishes", "kitchen-bath-more"],
    category: "Custom Living",
  },

  // ── 10c. Additions & Expansions ─────────────────────────────
  {
    slug:     "additions-expansions",
    name:     "Additions & Expansions",
    shortName:"Additions",
    tagline:  "More space without moving — designed, permitted, and built by the same crew that manages your property.",
    metaDescription:
      "Residential additions and expansions in Northern Colorado. Room additions, bump-outs, above-garage buildouts, and sunrooms. Permitted and built by Forge Point in Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1503387762-592deb58ef4e",
    overviewHeading: "Build Out, Not Up. Or Up. We Do Both.",
    overviewBody: [
      "Moving is expensive. A well-designed addition gives you the space you need while keeping the neighborhood, the schools, and the equity you've already built. Forge Point plans and builds residential additions of all types — bump-outs, room additions, sunrooms, above-garage buildouts, and second-story additions.",
      "Every addition starts with a detailed scope and permit drawings. We coordinate with structural engineers where required, pull all necessary permits, and schedule inspections from foundation through final. No gray-area work that creates problems at resale.",
      "Our project management approach means you have a single point of contact from design concept through move-in — not a general contractor managing a rotating cast of subcontractors you've never met.",
    ],
    overviewImage: "1504307651254-35680f356dbe",
    includes: [
      { title: "Room Additions",                       description: "Full room additions from foundation or slab through finished interior — new bedrooms, home offices, family rooms, and flex spaces." },
      { title: "Bump-Outs & Pop-Tops",                description: "Smaller structural expansions that maximize existing footprints — kitchen bump-outs, master bath expansions, entry additions." },
      { title: "Above-Garage Buildouts",              description: "Convert underutilized above-garage space into finished living area, home office, or bonus room. Structural assessment included." },
      { title: "Sunrooms & Three-Season Rooms",       description: "Insulated and non-insulated sunroom additions with proper foundation, framing, glazing, and finish work." },
      { title: "Structural Engineering Coordination", description: "For additions requiring structural engineering sign-off, we coordinate with licensed engineers and incorporate drawings into the permit set." },
      { title: "Permit Management",                   description: "We pull permits, schedule all required inspections, and deliver a closed permit on every structural addition. No open permits at resale." },
      { title: "Foundation & Site Work Coordination", description: "Excavation, concrete, and foundation work coordinated with licensed civil contractors where required." },
    ],
    gallery: [
      { id: "1503387762-592deb58ef4e", alt: "Residential addition framing in progress showing new room structure" },
      { id: "1504307651254-35680f356dbe", alt: "Structural framing for home addition with new walls and ceiling joists" },
      { id: "1600585154340-be6161a56a0c", alt: "Finished addition interior with new living space complete" },
    ],
    estimatorCategory: "renovation-remodel",
    related:  ["renovation-remodel", "basement-finishing", "framing-finishes"],
    category: "Custom Living",
  },

  // ── 10d. Investment Property Rehab ───────────────────────────
  {
    slug:     "investment-property-rehab",
    name:     "Investment Property Rehab",
    shortName:"Property Rehab",
    tagline:  "High-ROI renovations for rental properties and fix-and-flip projects — scoped by someone who has managed thousands of units.",
    metaDescription:
      "Investment property rehab and renovation in Northern Colorado. BRRRR rehabs, fix-and-flip, turnover renovations, and multifamily unit upgrades. ROI-focused scoping from a team with 15 years of property management experience.",
    heroImage:       "1560185893-a55b8a6f7e89",
    overviewHeading: "Rehab Scoped for Return, Not Aesthetics",
    overviewBody: [
      "Most contractors build what you ask for. Forge Point tells you what actually moves the needle on rent and resale — because we've managed the properties on the other side of the transaction for 15 years.",
      "Investment property rehab is a different discipline than primary residence renovation. The decisions are financial: which upgrades command higher rent, which finishes hold up to tenant wear, which improvements are required for code compliance, and which are vanity spending that never pays back.",
      "We scope, bid, and build investment property rehabs with ROI as the primary lens. Single-family rentals, multifamily units, BRRRR properties, and fix-and-flip projects across Northern Colorado.",
    ],
    overviewImage: "1556909114-f6e7ad7d3136",
    includes: [
      { title: "Turnover Renovation",               description: "Between-tenant unit refreshes — paint, flooring, fixtures, hardware, and punch list repairs. Scoped for durability and speed, not showmanship." },
      { title: "BRRRR Rehab",                       description: "Full-scope buy-rehab-rent-refinance-repeat renovations. We work with your ARV targets and build to appraisal." },
      { title: "Fix & Flip Renovation",             description: "Targeted improvements that maximize resale value for the specific market and price point. We know what Northern Colorado buyers pay a premium for." },
      { title: "Multifamily Unit Renovation",       description: "Coordinated renovation of multiple units on an occupied property — scheduling and scope managed to minimize vacancy and disruption." },
      { title: "Code Compliance & Safety Upgrades", description: "GFCI, smoke and CO detector compliance, egress, handrail, and habitability upgrades required for rental licensing or resale." },
      { title: "Punch List & Final Prep",           description: "Final walk, punch list completion, cleaning, and photography prep to get the property leased or listed as fast as possible." },
    ],
    gallery: [
      { id: "1560185893-a55b8a6f7e89", alt: "Investment rental property exterior with clean curb appeal" },
      { id: "1556909114-f6e7ad7d3136", alt: "Renovated rental unit kitchen with new cabinets and countertops" },
      { id: "1503387762-592deb58ef4e", alt: "Investment property renovation in progress, interior gut" },
    ],
    estimatorCategory: "renovation-remodel",
    related:  ["renovation-remodel", "property-management", "buyer-representation"],
    category: "Custom Living",
  },

  // ── 10e. Flooring & Tile ─────────────────────────────────────
  {
    slug:     "flooring-tile",
    name:     "Flooring & Tile",
    shortName:"Flooring",
    tagline:  "Every surface underfoot — installed with the prep and precision that makes it last.",
    metaDescription:
      "Professional flooring and tile installation in Northern Colorado. Hardwood, LVP, carpet, porcelain tile, natural stone, and heated floors for Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1588854337236-6889d631faa8",
    overviewHeading: "Flooring Done Right Starts Below the Surface",
    overviewBody: [
      "Most flooring failures start before the first plank is laid — improper subfloor prep, skipped acclimation, wrong product for the application. Forge Point approaches every flooring installation the way finish carpenters do: substrate first, product second, installation third.",
      "We install hardwood, engineered wood, luxury vinyl plank, carpet, porcelain tile, ceramic tile, and natural stone across residential and light commercial applications. We also handle full tile work for kitchens, bathrooms, mudrooms, and entryways — straight lines, tight grout joints, and proper waterproofing where it matters.",
      "Available as a standalone service or as part of a larger renovation scope.",
    ],
    overviewImage: "1517022812379-23952977f6e7",
    includes: [
      { title: "Hardwood Flooring",           description: "Solid and engineered hardwood installation with proper acclimation, subfloor assessment, and nailing or gluing to manufacturer spec." },
      { title: "Luxury Vinyl Plank (LVP)",    description: "Click-lock and glue-down LVP for moisture-prone areas, rentals, and high-traffic spaces. Proper underlayment and transition strips included." },
      { title: "Carpet Installation",         description: "Bedroom and living area carpet with quality pad. Seaming, stretching, and threshold transitions done right." },
      { title: "Porcelain & Ceramic Tile",    description: "Floor and wall tile for kitchens, bathrooms, entryways, laundry rooms, and mudrooms. Large-format, subway, mosaic, and custom patterns." },
      { title: "Natural Stone Installation",  description: "Travertine, slate, marble, and limestone installation with appropriate sealing and grout selection." },
      { title: "Subfloor Repair & Leveling",  description: "Squeaky subfloor repair, leveling compound, and substrate correction before any surface installation begins." },
      { title: "Heated Floor Systems",        description: "Electric radiant heat underlayment under tile for bathrooms and entryways — significant comfort upgrade for Colorado winters." },
    ],
    gallery: [
      { id: "1588854337236-6889d631faa8", alt: "LVP flooring installation in progress in residential home" },
      { id: "1556909114-f6e7ad7d3136",   alt: "Kitchen floor tile with clean grout lines and modern finish" },
      { id: "1517022812379-23952977f6e7", alt: "Finished hardwood floor in bright residential living space" },
    ],
    estimatorCategory: "framing-finishes",
    related:  ["framing-finishes", "kitchen-bath-more", "renovation-remodel"],
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
    heroImage:       "1591474200742-8e512e6f98f8",
    overviewHeading: "Outdoor Living Structures Built for Northern Colorado",
    overviewBody: [
      "Colorado's 300 days of sunshine deserve an outdoor space that's actually worth using. Forge Point designs and builds decks, pergolas, and patios that stand up to freeze-thaw cycles, intense UV, and high wind — with materials and fastener systems specified for this climate, not Florida.",
      "We handle every phase: design, permitting, site preparation, framing, decking, railings, and finish details. Our structures are built to code, documented for permit, and designed to add lasting value to your property.",
      "From a simple concrete patio to a multi-level composite deck with integrated pergola and lighting, we scope the project to your budget and build it to last.",
    ],
    overviewImage: "1568605114967-8130f3a36994",
    includes: [
      { title: "Composite Decking",           description: "Trex, TimberTech, and other premium composite decking systems. Low maintenance, UV-resistant, and warrantied for Colorado conditions." },
      { title: "Pressure-Treated & Cedar Decks", description: "Traditional wood decks with proper flashing, post bases, and hardware to resist moisture and freeze-thaw movement." },
      { title: "Pergolas & Shade Structures", description: "Freestanding and attached pergolas in wood, cedar, and powder-coated aluminum. Custom sizing and roof system options." },
      { title: "Concrete Patios",             description: "Poured concrete patios with exposed aggregate, stamped, or broom finish. Proper base preparation for Colorado's expansive soils." },
      { title: "Paver Patios",                description: "Natural stone, travertine, and concrete paver patios with proper base, edge restraint, and sand-set installation." },
      { title: "Railings & Stairs",           description: "Deck railings in composite, aluminum, cable, and glass systems. Built to IRC code with proper post spacing and attachment." },
    ],
    gallery: [
      { id: "1591474200742-8e512e6f98f8", alt: "Wood deck with outdoor furniture and pergola" },
      { id: "1568605114967-8130f3a36994",   alt: "Stone paver patio with outdoor seating area and landscaping" },
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
    heroImage:       "1519710164239-da123dc03ef4",
    overviewHeading: "Water Features That Bring Your Property to Life",
    overviewBody: [
      "A well-designed water feature transforms a yard into a retreat. The sound of moving water, the visual focal point, the wildlife it attracts — Forge Point designs and builds custom water features that are beautiful, balanced, and properly engineered to run reliably through Colorado's seasons.",
      "We build pondless waterfalls for low-maintenance installations, koi ponds for enthusiasts who want a living ecosystem, and decorative fountains for courtyards, entryways, and patios. Every system is designed with proper filtration, winterization planning, and liner systems rated for freeze-thaw conditions.",
      "We integrate water features with existing landscape designs or build standalone focal points. Every project includes a maintenance plan and winterization walkthrough so you know exactly how to care for your investment.",
    ],
    overviewImage: "1544551763-46a013bb70d5",
    includes: [
      { title: "Pondless Waterfalls",        description: "Self-contained waterfall systems with underground reservoir — all the visual and sound impact with minimal maintenance and no open pond." },
      { title: "Koi Ponds",                  description: "Custom koi ponds with biological filtration, UV clarifiers, aeration, and liner systems designed to support a healthy fish habitat year-round." },
      { title: "Stream & Creek Features",    description: "Naturalistic stream channels connecting upper and lower pools. Boulders, gravel, and native plantings create an authentic landscape feel." },
      { title: "Decorative Fountains",       description: "Freestanding and in-ground fountain systems for patios, entryways, and garden focal points. Wide range of styles from formal to naturalistic." },
      { title: "Filtration & Pump Systems",  description: "Properly sized mechanical and biological filtration matched to your feature's volume, fish load, and Colorado's seasonal temperature swings." },
      { title: "Winterization & Maintenance",description: "Annual winterization service to protect pumps, lines, and liner systems. Spring startup and ongoing maintenance programs available." },
    ],
    gallery: [
      { id: "1519710164239-da123dc03ef4", alt: "Garden water feature with natural pond and waterfall" },
      { id: "1544551763-46a013bb70d5", alt: "Pondless waterfall feature in residential garden" },
      { id: "1558618047-6e3b4b1ae965",   alt: "Decorative fountain in landscaped patio setting" },
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
    heroImage:       "1615672968435-75c1e5d17d62",
    overviewHeading: "Junk Removal Done Right — Same Week Service",
    overviewBody: [
      "Whether you're clearing out a rental property between tenants, prepping a house for sale, cleaning up after a renovation, or just finally dealing with that pile in the garage — Forge Point provides professional junk haul off service that's fast, clean, and responsible.",
      "We price by the cubic yard with up to 2 tons included. Heavy loads that push past 2 tons — concrete, soil, roofing — carry a straightforward per-ton overage charge that's disclosed before we start. No surprises on the invoice.",
      "Prefer to sort and load it yourself? We also rent dumpsters and dump trailers — drop it off, you fill it, we haul it when you're done. Either way, we donate and recycle where possible.",
    ],
    overviewImage: "1558618666-fcd25c85cd64",
    includes: [
      { title: "Full-Service Haul Off",             description: "We load it, haul it, and dispose of it. Priced by the cubic yard with up to 2 tons included. Per-ton overage applies for heavy material exceeding 2 tons." },
      { title: "Dumpster Rental",                   description: "We drop a dumpster, you fill it on your own timeline, we haul it when you're ready. Ideal for multi-day renovation projects and larger cleanouts." },
      { title: "Dump Trailer Rental",               description: "Rent a dump trailer you load yourself. Good for contractors and homeowners who want to control the pace and sorting of the work." },
      { title: "Furniture & Appliance Removal",     description: "Sofas, mattresses, refrigerators, washers, dryers, and large items removed from any floor of the home." },
      { title: "Construction & Demo Debris",        description: "Drywall, lumber, concrete, tile, roofing material, and renovation waste cleared and hauled from your job site." },
      { title: "Yard Waste & Storm Debris",         description: "Branches, stumps, old landscaping material, soil, and storm debris hauled and disposed of properly." },
      { title: "Estate & Property Cleanouts",       description: "Full-property cleanouts for estate sales, foreclosures, rental property turnovers, and hoarding situations handled with discretion." },
      { title: "Garage & Basement Cleanouts",       description: "Clear decades of accumulated items from garages, basements, storage sheds, and attics in a single day." },
      { title: "Donation & Recycling Coordination", description: "We sort and separate usable items for donation and recyclable materials to keep as much out of the landfill as possible." },
    ],
    gallery: [
      { id: "1615672968435-75c1e5d17d62", alt: "Clean property after professional junk haul off" },
      { id: "1558618666-fcd25c85cd64",   alt: "Property cleanout in progress" },
      { id: "1486325212027-8081e485255e", alt: "Clean commercial property after debris removal" },
    ],
    estimatorCategory: "junk-haul-off",
    related:  ["grounds-maintenance", "property-management", "industrial-maintenance"],
    category: "Grounds & Estates",
  },

  // ── 14. Mobile Auto Detailing ─────────────────────────────────────────────
  {
    slug:     "mobile-auto-detailing",
    name:     "Mobile Auto Detailing",
    shortName:"Auto Detailing",
    tagline:  "Professional vehicle detailing at your door — no drop-off, no waiting.",
    metaDescription:
      "Mobile auto detailing in Northern Colorado and Denver metro. Exterior wash, interior deep clean, and premium detail packages. We come to your home or office in Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1520340356584-f9917d1eea6f",
    overviewHeading: "Professional Detailing — At Your Location",
    overviewBody: [
      "A professionally detailed vehicle doesn't require a trip across town or half a day in a waiting room. Forge Point brings full detailing services to your home, office, or job site — everything we need is in the truck.",
      "We offer exterior-only washes for clients who want consistent vehicle cleanliness, full interior and exterior details for a top-to-bottom refresh, and premium packages that include paint decontamination, clay bar treatment, and sealant application for vehicles that deserve the full treatment.",
      "Every detail is done by hand with professional-grade products — no automated washes, no shortcuts. The result is a vehicle that's genuinely clean, not just rinsed.",
    ],
    overviewImage: "1545327859-578be6a2561a",
    includes: [
      { title: "Exterior Hand Wash & Dry",        description: "Hand wash with pH-balanced soap and microfiber dry for a scratch-free finish on all painted surfaces, glass, and trim." },
      { title: "Wheel & Tire Detail",             description: "Wheel faces, barrels, and lug nuts cleaned. Tires dressed with a matte or satin finish tire dressing." },
      { title: "Interior Vacuum & Wipe-Down",     description: "Full interior vacuum including seats, carpets, and trunk. Dash, door panels, and console wiped clean and protected." },
      { title: "Glass Cleaning — Interior & Exterior", description: "All glass cleaned streak-free inside and out. Windshield treated for improved visibility in rain and direct sun." },
      { title: "Leather Conditioning",            description: "Leather seats and surfaces cleaned and conditioned to prevent cracking and fading — Colorado's UV and dry air are hard on leather." },
      { title: "Paint Sealant Application",       description: "Machine-applied paint sealant providing 6–12 months of UV and contaminant protection for Colorado's intense sun exposure." },
      { title: "Odor Treatment",                  description: "Enzyme-based or ozone odor treatment for smoke, pets, mildew, and stubborn interior odors that don't respond to standard cleaning." },
      { title: "Engine Bay Cleaning",             description: "Light degreasing and rinse of engine bay surfaces for visual presentation and easier maintenance inspection access." },
    ],
    gallery: [
      { id: "1520340356584-f9917d1eea6f", alt: "Car being professionally detailed — clean shine on exterior" },
      { id: "1545327859-578be6a2561a", alt: "Clean car interior after professional detailing" },
      { id: "1558618047-3c8c76ca7d04", alt: "Freshly detailed vehicle with a glossy exterior finish" },
    ],
    estimatorCategory: "mobile-auto-detailing",
    related:  ["housekeeping-cleaning", "errand-services", "power-window-washing"],
    category: "Domestic Services",
  },

  // ── 15. Housekeeping & Cleaning ───────────────────────────────────────────
  {
    slug:     "housekeeping-cleaning",
    name:     "Housekeeping & Cleaning",
    shortName:"Housekeeping",
    tagline:  "Consistent, thorough home cleaning — done right every time, on a schedule that works for you.",
    metaDescription:
      "Professional housekeeping and home cleaning in Northern Colorado and Denver metro. Weekly, bi-weekly, and monthly cleaning programs, deep cleans, and move-in/move-out service in Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1581578731548-c64695cc6952",
    overviewHeading: "Reliable Home Cleaning You Can Count On",
    overviewBody: [
      "A clean home is more than an aesthetic — it's the foundation of a comfortable, healthy living environment. Forge Point provides recurring and one-time cleaning services for homeowners, rental property owners, and property managers who need a cleaning crew they can rely on without having to check up on.",
      "Our standard clean covers all the essentials on every visit: kitchens, bathrooms, living areas, bedrooms, and floors. Deep cleans add the detail work that standard visits skip — inside appliances, baseboards, cabinet interiors, grout lines, and all the surfaces that accumulate grime between regular visits.",
      "We work around your schedule and communicate proactively. Access instructions, cleaning priorities, and special requests are tracked through our client system so nothing gets missed — and you don't have to be home to get a great result.",
    ],
    overviewImage: "1527515673-2d7b2f5e0b4a",
    includes: [
      { title: "Kitchen Cleaning",              description: "Countertops, appliance exteriors, sink, microwave interior, backsplash, cabinet fronts, and floors cleaned and sanitized on every visit." },
      { title: "Bathroom Cleaning",            description: "Toilet, sink, tub, and shower scrubbed and disinfected. Mirrors polished, fixtures wiped, floors cleaned, trash emptied." },
      { title: "Living & Bedroom Areas",       description: "All surfaces dusted, floors vacuumed and mopped, baseboards wiped, ceiling fans dusted, and trash emptied." },
      { title: "Deep Clean Add-On",            description: "Inside oven, inside refrigerator, cabinet interiors, grout scrubbing, blinds, ceiling fans, and detailed baseboard cleaning for a full reset." },
      { title: "Move-In / Move-Out Cleaning",  description: "Top-to-bottom clean of all surfaces including inside every appliance, all cabinets, all fixtures, windows, and tracks — rental-ready standard." },
      { title: "Laundry Service",              description: "Wash, dry, and fold service available as an add-on for weekly cleaning clients. We handle it while we're there." },
    ],
    gallery: [
      { id: "1581578731548-c64695cc6952",   alt: "Clean, organized home interior after professional housekeeping" },
      { id: "1484154218962-a197022b5858",   alt: "Sparkling clean kitchen after professional housekeeping" },
      { id: "1556909114-f6e7ad7d3136",   alt: "Clean, organized living space after professional cleaning" },
    ],
    estimatorCategory: "housekeeping-cleaning",
    related:  ["mobile-auto-detailing", "home-safety-checks", "junk-haul-off"],
    category: "Domestic Services",
  },

  // ── 16. Poop Scooping ────────────────────────────────────────────────────
  {
    slug:     "poop-scooping",
    name:     "Poop Scooping",
    shortName:"Poop Scooping",
    tagline:  "Keep your yard clean, safe, and odor-free — without lifting a finger.",
    metaDescription:
      "Professional pet waste removal in Northern Colorado and Denver metro. Weekly and bi-weekly poop scooping for residential yards in Erie, Longmont, Boulder, Broomfield, and surrounding areas.",
    heroImage:       "1558618666-fcd25c85cd64",
    overviewHeading: "Professional Pet Waste Removal — On Your Schedule",
    overviewBody: [
      "Pet ownership is a joy. Yard cleanup isn't. Forge Point provides recurring and one-time pet waste removal for residential properties across Northern Colorado and the Denver metro — a simple, affordable service that keeps your outdoor spaces clean, safe, and ready to actually use.",
      "Dog waste isn't just unpleasant — it's a genuine health concern. Pathogens including E. coli and parasites like giardia and roundworm can survive in soil for months and are easily tracked indoors. Regular professional removal keeps your yard sanitary for children, guests, and your other pets.",
      "We service your yard on your chosen schedule, bag all waste and remove it from the property, and send a notification when the job is done. No mess, no reminder calls, no checking whether they showed up.",
    ],
    overviewImage: "1587300003388-59208cc962cb",
    includes: [
      { title: "Weekly Service",           description: "Scheduled weekly visits at a consistent day. One dog, two dogs, or a full pack — we keep pace with any yard." },
      { title: "Bi-Weekly Service",        description: "Every-other-week scheduling for smaller dogs or lower-traffic yards. Same thorough cleanup, less frequent visits." },
      { title: "One-Time Yard Clean-Up",   description: "Full yard clean for season opening, before outdoor events, post-winter, or whenever things get out of hand. We handle the backlog." },
      { title: "Multi-Dog Pricing",        description: "Transparent pricing based on dog count. No hidden per-bag fees, no surprises." },
      { title: "Waste Removal & Disposal", description: "All waste is bagged and hauled off the property on every visit. We don't leave bags at the curb." },
      { title: "Service Notification",     description: "Automated notification after every completed visit so you always know the job is done." },
    ],
    gallery: [
      { id: "1558618666-fcd25c85cd64",   alt: "Clean green lawn maintained with regular pet waste removal" },
      { id: "1587300003388-59208cc962cb",   alt: "Happy dog in clean, well-maintained residential yard" },
      { id: "1416879595882-3373a0480b5b",   alt: "Clean residential lawn ready for outdoor use" },
    ],
    estimatorCategory: "poop-scooping",
    related:  ["grounds-maintenance", "housekeeping-cleaning", "errand-services"],
    category: "Domestic Services",
  },

  // ── 17. Home Safety Checks ────────────────────────────────────────────────
  {
    slug:     "home-safety-checks",
    name:     "Home Safety Checks",
    shortName:"Safety Checks",
    tagline:  "Eyes on your property when you can't be there — peace of mind on a schedule.",
    metaDescription:
      "Home safety checks and vacant property monitoring in Northern Colorado and Denver metro. Scheduled walkthroughs, photographic reports, and emergency coordination for snowbirds, travelers, and rental owners.",
    heroImage:       "1558981403-c5f9899a28bc",
    overviewHeading: "Property Monitoring You Can Trust",
    overviewBody: [
      "Whether you're traveling for weeks, managing a vacant rental between tenants, or simply want regular eyes on your home while you're away — Forge Point's home safety check service provides scheduled property monitoring with clear, photographic reporting after every visit.",
      "A missed pipe leak, a storm-damaged window, a package on the porch for three days, a tripped breaker in an empty house — small issues become expensive problems when no one is watching. Our check service catches problems early and keeps you informed before they escalate.",
      "We also offer safety checks as an add-on to our housekeeping and grounds services — making each visit more valuable, especially for elderly clients, busy families, and property owners who want proactive hazard identification without scheduling a separate appointment. We know what to look for, and we look every time.",
    ],
    overviewImage: "1560518883-ce09059eeffa",
    includes: [
      { title: "Life Safety Device Checks",    description: "Smoke detectors, carbon monoxide detectors, and fire extinguishers verified functional and current. Battery replacement and documentation included as part of every scheduled visit." },
      { title: "Trip & Fall Hazard Assessment",description: "Identification of loose rugs, cluttered walkways, inadequate lighting, and other fall-risk conditions — particularly valuable for elderly clients and properties transitioning between tenants." },
      { title: "Lighting & Security Review",   description: "Exterior lighting function check, door and window lock condition, and visible security assessment. We note burned-out fixtures, compromised entry points, and any conditions that reduce visible security." },
      { title: "Safety Equipment Inventory",   description: "Fire extinguisher condition and expiration check, non-slip mat presence in wet areas, handrail integrity, and basic safety equipment status documented at every visit." },
      { title: "Structural & Electrical Observation", description: "Visual inspection for damaged cords, overloaded outlets, entry-point tripping hazards, water intrusion signs, and visible structural concerns flagged for follow-up." },
      { title: "Exterior & Property Walkthrough", description: "Full perimeter check covering entry points, visible roof condition, storm damage, driveway hazards, exterior lighting, and general property appearance with photographic documentation." },
      { title: "Package & Mail Collection",    description: "Collect packages and visible mail to prevent porch piracy and maintain an occupied-property appearance for vacant homes." },
      { title: "Emergency Coordination",       description: "We serve as the local first-response contact for alarm company calls, utility access needs, and neighbor-reported concerns that require immediate eyes on the property." },
    ],
    gallery: [
      { id: "1558981403-c5f9899a28bc",   alt: "Home exterior security and safety check walkthrough" },
      { id: "1484154218962-a197022b5858",   alt: "Property inspection in progress at a Northern Colorado home" },
      { id: "1560518883-ce09059eeffa",   alt: "Well-maintained home exterior in Northern Colorado" },
    ],
    estimatorCategory: "home-safety-checks",
    related:  ["property-management", "housekeeping-cleaning", "errand-services"],
    category: "Domestic Services",
  },

  // ── 18. Errand Services ───────────────────────────────────────────────────
  {
    slug:     "errand-services",
    name:     "Errand Services",
    shortName:"Errands",
    tagline:  "Local errands handled by a trusted neighbor — so you can focus on what matters.",
    metaDescription:
      "Professional errand services in Northern Colorado and Denver metro. Grocery shopping, prescription pickup, post office runs, returns, and local errand coordination in Erie, Longmont, Boulder, and surrounding areas.",
    heroImage:       "1556742049-0cfed4f6a45d",
    overviewHeading: "Your Local Errands, Handled Professionally",
    overviewBody: [
      "Time is the one resource you can't get back. Forge Point's errand service handles the local tasks that chip away at your day — grocery shopping, prescription pickup, post office runs, package returns, dry cleaning, and the dozen other small errands that pile up during a busy week.",
      "We serve homeowners, seniors, busy professionals, and property managers who need a trusted local contact for regular or occasional errand support. Every team member is a vetted Forge Point employee — not a gig-economy stranger from an app.",
      "Custom recurring schedules and one-off requests both work. Tell us what needs to be handled and we'll take care of it efficiently, accurately, and with a clear receipt of what was done and where.",
    ],
    overviewImage: "1484154218962-a197022b5858",
    includes: [
      { title: "Grocery Shopping & Delivery",    description: "Shop from your list at your preferred store and deliver to your door. Refrigerated and frozen items handled with proper care." },
      { title: "Prescription Pickup",            description: "Pharmacy runs for prescriptions, over-the-counter items, and medical supplies — especially valuable for seniors and those with limited mobility." },
      { title: "Post Office & Shipping",         description: "Drop off packages, mail letters, purchase postage, and handle shipping needs at the post office or any carrier location." },
      { title: "Returns & Exchanges",            description: "Handle retail returns and exchanges on your behalf. We bring back your receipt or store credit and give you a full account of the transaction." },
      { title: "Dry Cleaning & Laundry",         description: "Drop off and pick up dry cleaning, handle laundromat runs, or manage alterations drop-off and pickup." },
      { title: "Custom Local Errands",           description: "If it can be done locally, we can handle it. Hardware store pickups, specialty grocery runs, event supply runs, and more." },
    ],
    gallery: [
      { id: "1556742049-0cfed4f6a45d", alt: "Professional errand service delivering groceries" },
      { id: "1484154218962-a197022b5858", alt: "Grocery shopping being handled professionally" },
      { id: "1560518883-ce09059eeffa", alt: "Package being delivered to a residential home" },
    ],
    estimatorCategory: "errand-services",
    related:  ["housekeeping-cleaning", "home-safety-checks", "poop-scooping"],
    category: "Domestic Services",
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
