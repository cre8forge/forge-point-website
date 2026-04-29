// ================================================================
// FORGE POINT — FAQ content
// Static data — edit questions and answers directly in this file.
// No database, no CMS. Fast, simple, easy to maintain.
// ================================================================

export interface FaqItem {
  question: string;
  answer:   string;
}

export interface FaqCategory {
  slug:      string;
  label:     string;
  questions: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [

  // ── General ──────────────────────────────────────────────────
  {
    slug:  "general",
    label: "General",
    questions: [
      {
        question: "What areas do you serve?",
        answer:
          "We serve 15+ zip codes across Northern Colorado and Boulder County, including Erie, Longmont, Boulder, Lafayette, Louisville, Broomfield, Firestone, Frederick, Dacono, Windsor, Brighton, and surrounding communities. Erie is our home base. If you're not sure whether we cover your area, reach out — we may still be able to help.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes. Forge Point Property Services carries full general liability insurance and workers' compensation coverage. We're happy to provide proof of insurance for HOA boards, property managers, or commercial clients who require it before work begins.",
      },
      {
        question: "Do you offer free estimates?",
        answer:
          "Yes. You can get an instant price range using the estimator on our website — no contact info required. For larger or more complex projects, we offer a no-obligation site visit where we can give you a firm written proposal with a clear price range before any work is scheduled.",
      },
      {
        question: "How do I get started?",
        answer:
          "The easiest way is to use our online estimator to get a ballpark, then submit a contact form or call us directly. We'll follow up within one business day to discuss your project, schedule a site visit if needed, and put together a written proposal.",
      },
      {
        question: "How quickly do you respond to inquiries?",
        answer:
          "We respond to all contact form submissions and calls within one business day. For urgent requests — like a fence down after a storm or a maintenance issue at a rental property — call us directly at (720) 419-1961 for the fastest response.",
      },
      {
        question: "Do you work with HOAs and property managers?",
        answer:
          "Yes, and it's a significant part of our business. We work regularly with HOA boards and community managers across Northern Colorado. We understand documentation requirements, common area standards, and the communication expectations that come with managing community properties. We can provide written service reports and photo documentation for board records.",
      },
      {
        question: "Can I request the same crew for every visit?",
        answer:
          "We do our best to assign consistent crews to recurring maintenance accounts. Having the same team on your property means they know your layout, your preferences, and any special instructions — which translates to better, faster service over time. If you have a specific request, let us know when you set up your account.",
      },
    ],
  },

  // ── Forge Point Real Estate ─────────────────────────────────────
  {
    slug:  "forge-point-advisory",
    label: "Forge Point Real Estate",
    questions: [
      {
        question: "Is Forge Point a real estate brokerage or a property services company?",
        answer:
          "Both. Forge Point Real Estate is our licensed Colorado real estate brokerage practice — buyer representation, seller representation, investment acquisition analysis, and commercial leasing. Forge Point Property Services is our full-service property operations arm — management, renovation, grounds, and estate services. Most clients use both sides of the business, which is what makes our model unique: the people advising your real estate transaction are the same people who have managed hundreds of properties like it.",
      },
      {
        question: "Do you represent buyers and sellers in residential real estate?",
        answer:
          "Yes. Aaron Dolph is a licensed Colorado Real Estate Broker (License #FA100100755) operating under Triumph Real Estate Corporation. We represent homebuyers, move-up buyers, investors, and sellers across Northern Colorado. Our advantage over a traditional agent: we've managed properties like the ones you're buying or selling, so we see what most agents miss — deferred maintenance, realistic rental potential, and property-specific risk.",
      },
      {
        question: "What is a Broker's Opinion of Value (BOV)?",
        answer:
          "A BOV is a professional assessment of a property's market value delivered as a written document — not a full certified appraisal, but a detailed market-grounded analysis. For residential property owners, it answers: what is this property worth today, what would improve its value, and what should you do before listing? We offer BOVs as a no-cost introductory service for qualified property owners. Contact us to request one.",
      },
      {
        question: "Do I need to already own a property to use Forge Point Real Estate?",
        answer:
          "No. We work with buyers at every stage — pre-purchase analysis, active representation, and acquisition coordination. We also work with owners evaluating whether to sell, hold, refinance, or execute a 1031 exchange. If you're thinking about a real estate decision, that's when to call us — not after you've already committed.",
      },
    ],
  },

  // ── Investment Strategy ───────────────────────────────────────
  {
    slug:  "investment-strategy",
    label: "Investment Strategy",
    questions: [
      {
        question: "What is the BRRRR strategy and does it work in Northern Colorado?",
        answer:
          "BRRRR stands for Buy, Rehab, Rent, Refinance, Repeat. The strategy involves acquiring a distressed property below market, renovating it to rental-ready condition, stabilizing it as a rental, and then cash-out refinancing to recover equity and repeat the cycle. It works in Northern Colorado, but market timing matters — entry price, rehab cost, and the refinance appraisal all need to align. We've supported dozens of BRRRR acquisitions on the Front Range and can walk you through what the numbers need to look like in today's market.",
      },
      {
        question: "How do I analyze an investment property before buying?",
        answer:
          "At minimum, you need: cap rate (Net Operating Income ÷ purchase price), cash-on-cash return (annual cash flow ÷ total cash invested), a realistic deferred maintenance estimate, and current market rent comps. Where most investors go wrong is taking the seller's pro forma at face value. Forge Point Real Estate provides independent acquisition analysis — a written report covering all of these factors with real-world assumptions, not optimistic seller projections.",
      },
      {
        question: "What returns should I expect from a rental property in Northern Colorado?",
        answer:
          "This varies significantly by property type, location, and financing structure. Single-family homes in Northern Colorado have historically delivered cap rates of 4–7% depending on acquisition price and rental rates. Multifamily and commercial properties vary more widely. Cash-on-cash returns are heavily affected by financing terms. We can model specific properties with current numbers — contact us if you have a specific acquisition you're evaluating.",
      },
      {
        question: "What is a 1031 exchange and who should use it?",
        answer:
          "A 1031 exchange allows investment property sellers to defer capital gains taxes by reinvesting the proceeds into a qualified replacement property within a strict timeline (45 days to identify, 180 days to close). It's one of the most powerful wealth-building tools available to real estate investors — but the timeline is unforgiving. If you're selling an investment property and have significant appreciation, a 1031 should be part of your decision. Call us before you close on the sale — the clock starts at closing.",
      },
    ],
  },

  // ── Property Management ───────────────────────────────────────
  {
    slug:  "property-management",
    label: "Property Management",
    questions: [
      {
        question: "What types of properties does Forge Point manage?",
        answer:
          "We manage across all property classes — commercial and industrial facilities, multifamily residential portfolios, HOA communities, and single-family homes. On the commercial side, our team has direct experience managing over 4 million square feet of commercial and industrial space. In multifamily, we've managed portfolios with up to 115 tenants simultaneously. For single-family clients, every property gets individual attention because every owner's goals and preferences are different.",
      },
      {
        question: "What makes Forge Point different from a traditional property management company?",
        answer:
          "Most property management companies are administrative-first — they schedule vendors and collect rent, but you're dependent on their preferred vendor network and their availability when something goes wrong. Forge Point is an operational team first. We have crews in the field every day handling grounds, maintenance, and property services. When something needs to happen at your property, we send our own people — not a third-party vendor on a two-week wait list. That is the difference between a management company and a true boots-on-ground property partner.",
      },
      {
        question: "Can I keep my existing property management contract and still work with Forge Point?",
        answer:
          "Yes — and this is one of our most common arrangements. We work alongside traditional property management companies as the local, on-call boots-on-ground team. Your property manager handles the administrative side. Forge Point handles the physical: maintenance response, property walkthroughs, grounds upkeep, and emergency calls. It's a monthly service agreement plus a per-incident rate for dispatched work. You get around-the-clock local response without replacing your existing management relationship.",
      },
      {
        question: "What does 'boots on ground' service mean in practice?",
        answer:
          "It means a real person from our team physically goes to your property when something is needed — not a phone call to a vendor dispatch queue. We conduct scheduled walkthroughs, respond to maintenance calls, document conditions with photos and written reports, handle tenant or occupant coordination, and flag issues before they become expensive. For owners who are out of state, out of the country, or simply too busy to deal with day-to-day property issues, this is the service that provides genuine peace of mind.",
      },
      {
        question: "How are maintenance requests handled?",
        answer:
          "Maintenance requests come to us by phone, email, or through your property management platform. We triage requests by urgency — true emergencies get same-day or next-business-day response; non-urgent items are scheduled within the standard service window. We self-perform a wide range of maintenance work, which means faster response and no markup on subcontracted labor for routine items. When a job requires a licensed trade (electrical, plumbing, HVAC), we coordinate vetted partners and manage the work from start to close.",
      },
      {
        question: "What documentation and reporting do you provide?",
        answer:
          "Every property walkthrough includes a written report with photo documentation of conditions observed, maintenance items noted, and any action taken. Commercial and HOA clients receive regular service reports that can be provided directly to board members, asset managers, or ownership. For single-family clients, we provide a simple summary after each visit. All documentation is retained and available on request — this matters at lease renewals, owner disputes, and insurance claims.",
      },
      {
        question: "How do you handle after-hours emergencies?",
        answer:
          "We are available 24 hours a day, 7 days a week for genuine property emergencies. This includes water intrusion, break-ins, storm damage, HVAC failure in extreme temperatures, and similar urgent situations. Reach us directly by phone at (720) 419-1961. After-hours emergency response is billed at a per-incident rate as part of our service agreement — there is no guessing about what you'll be charged when you call us at midnight.",
      },
      {
        question: "How is property management priced?",
        answer:
          "Our management services are structured as a flat monthly retainer — covering scheduled walkthroughs, routine coordination, and reporting — plus a per-incident rate for dispatched maintenance work and emergency response. This model is transparent: you know your baseline monthly cost and you're not paying a percentage of rent for work our team isn't actually doing. Retainer pricing is based on the number and type of properties and the service scope you need. Contact us for a custom quote.",
      },
    ],
  },

  // ── Custom Interiors ─────────────────────────────────────────
  {
    slug:  "custom-interiors",
    label: "Custom Interiors",
    questions: [
      {
        question: "What interior renovation services do you offer?",
        answer:
          "Forge Point Custom Interiors handles whole-home renovations, targeted remodels, basement finishing, additions, investment property rehab, kitchen and bath remodels, framing and finish carpentry, and flooring and tile. All work is delivered by our own crew — no handoffs to subcontractors you've never met. For electrical, plumbing, and HVAC rough-in, we coordinate vetted licensed trade partners and manage the schedule on your behalf.",
      },
      {
        question: "Do you do kitchen and bathroom remodels specifically?",
        answer:
          "Yes — kitchen and bath work is some of our most common project type. We handle cabinet installation, countertop fabrication and install, tile work, fixture replacement, lighting, and painting. We can work with your selections or help you source materials at trade pricing. Our renovation experience includes both cosmetic updates (new fixtures, paint, hardware) and full gut-and-rebuild remodels.",
      },
      {
        question: "What is investment property rehab and how is it different from a standard renovation?",
        answer:
          "Investment property rehab is renovation scoped specifically for ROI — maximizing value or rent potential while controlling cost. It's faster, more budget-focused, and driven by what the local market actually values, not personal preference. We approach rental rehabs differently than primary home renovations: durable finishes over premium ones, functional kitchens and baths over aspirational upgrades, and attention to what buyers and tenants in your price range expect. We've done this work in Northern Colorado's market for 15+ years.",
      },
      {
        question: "How do I know what renovations are worth doing before selling?",
        answer:
          "Our advisory practice answers this question specifically. A Broker's Opinion of Value assessment includes improvement recommendations with realistic ROI projections for your market. In Northern Colorado, kitchen and bath updates, fresh paint, and clean flooring almost always pay back. Major additions and luxury upgrades frequently don't — especially in lower and mid price ranges. Contact us for an honest presale assessment before you spend on renovations.",
      },
    ],
  },

  // ── Landscape & Outdoor Living ────────────────────────────────
  {
    slug:  "landscape-outdoor-living",
    label: "Landscape & Outdoor Living",
    questions: [
      {
        question: "Sod or seed — which is better for my yard?",
        answer:
          "It depends on your timeline, budget, and site conditions. Sod gives you an established lawn within weeks and works well for high-traffic areas and properties where erosion is a concern. Seed is significantly less expensive and produces a stronger root system over time, but requires 6–12 weeks to establish and careful watering during germination. We'll recommend the right option after assessing your soil, sun exposure, and irrigation setup.",
      },
      {
        question: "What grass types do you recommend for Northern Colorado?",
        answer:
          "For full-sun lawns with adequate irrigation, Kentucky bluegrass is the classic Northern Colorado choice — dense, dark green, and durable. Turf-type tall fescue is a better option for shadier areas or properties with water restrictions. Buffalo grass and blue grama are native low-water options for more naturalistic or low-maintenance applications. We never recommend warm-season grasses like bermuda or zoysia — they don't survive Colorado winters.",
      },
      {
        question: "When is the best time to install a landscape in Northern Colorado?",
        answer:
          "Late spring through early fall (May–September) is the primary installation window. Sod establishes best when soil temperatures are warm and consistent watering is possible. Fall planting (September–October) works well for trees, shrubs, and perennials, which benefit from cooler temps and fall moisture. We avoid major installs during the heat of July and August unless irrigation is already in place and functioning.",
      },
      {
        question: "Do you handle HOA landscape approval paperwork?",
        answer:
          "We can provide detailed project plans, plant lists, material specs, and photos to support your HOA submission. We're familiar with common Northern Colorado HOA landscape standards and can design your project to meet them from the start, which avoids costly revisions after approval.",
      },
      {
        question: "How long does a full landscape installation take?",
        answer:
          "A typical residential landscape install takes 3–10 days depending on scope. A small yard sod and bed refresh might be two days; a full design-and-install with grading, irrigation, sod, plantings, and hardscaping on a larger property may take one to two weeks. We provide a timeline estimate in every written proposal.",
      },
      {
        question: "Do you install irrigation as part of a landscape project?",
        answer:
          "Yes. Irrigation design and installation is included as part of our full landscape installs or available as a standalone service. We design zone-by-zone systems for sod, drip zones for beds, and smart controller options. All systems are commissioned and tested before we leave, and we offer seasonal startup and winterization as an ongoing service.",
      },
    ],
  },

  // ── Grounds Maintenance ───────────────────────────────────────
  {
    slug:  "grounds-maintenance",
    label: "Grounds Maintenance",
    questions: [
      {
        question: "How often should my lawn be mowed?",
        answer:
          "During the active growing season (May–September), most Northern Colorado lawns benefit from weekly mowing. Bi-weekly is appropriate during slower growth periods in early spring and late fall. Mowing less frequently than every two weeks during peak growth typically results in scalping and stress — we don't recommend it for a healthy lawn.",
      },
      {
        question: "At what height do you mow?",
        answer:
          "We mow at the correct height for the grass type and season. Kentucky bluegrass is typically mowed at 2.5–3.5 inches; tall fescue at 3–4 inches. We raise the deck height during heat stress in July and August and never remove more than one-third of the blade in a single pass. This keeps roots deep, turf dense, and weeds suppressed.",
      },
      {
        question: "What's included in a spring clean-up?",
        answer:
          "Our spring clean-up includes leaf and debris removal from lawn and beds, edge re-definition along all hard surfaces, trimming of ornamental grasses and perennials cut back to crown, bed clean-out, and a general assessment of winter damage. We can also include pre-emergent weed control and fertilization as add-ons at the same visit.",
      },
      {
        question: "When do you apply fertilizer?",
        answer:
          "For Northern Colorado lawns, we follow a 4-application schedule: early spring (March–April) with a slow-release starter, late spring (May–June) for green-up, late summer (August) for stress recovery, and late fall (October–November) for root strengthening before dormancy. The fall application is the most important one most homeowners skip.",
      },
      {
        question: "Do I need to be home during maintenance visits?",
        answer:
          "No. The majority of our maintenance clients aren't home during visits. We just need access to the areas we're servicing — a gate code or unlocked side gate is typically all that's required. We'll note any issues we observe and communicate them through our client portal or a quick text/email after each visit.",
      },
      {
        question: "What if it rains or snows on my scheduled maintenance day?",
        answer:
          "Light rain doesn't stop us — we typically continue on schedule. Heavy rain that makes mowing impossible, or snow on the ground, will push the visit to the next available day in your rotation. We don't skip visits due to weather without rescheduling, and we communicate any changes to your schedule proactively.",
      },
    ],
  },

  // ── Fencing ───────────────────────────────────────────────────
  {
    slug:  "fencing",
    label: "Fencing",
    questions: [
      {
        question: "Do I need a permit for a new fence in Northern Colorado?",
        answer:
          "It depends on your municipality. Erie, Longmont, Boulder, and most Front Range cities require a permit for new fence construction, especially for fences over 6 feet or along property lines. We handle permit research as part of the project planning process and can pull permits on your behalf. HOA approval is separate from a building permit and is often required first.",
      },
      {
        question: "How deep do you set fence posts?",
        answer:
          "In Northern Colorado, frost depth is approximately 36 inches. We set posts a minimum of 36–42 inches deep — 40% or more of the total post length — and use concrete footings in our standard installation. Under-set posts are the number one cause of fence failure in Colorado winters. We don't cut corners on depth.",
      },
      {
        question: "What fence types hold up best to Colorado wind and weather?",
        answer:
          "Vinyl and ornamental iron hold up best in terms of material durability. For wood fencing, cedar outperforms pine significantly in Colorado's UV and moisture conditions. Board-on-board construction with gaps allows wind to pass through rather than act as a sail, which reduces racking and post stress. We always use galvanized or stainless hardware — standard zinc screws corrode and fail within a few years at elevation.",
      },
      {
        question: "Can you match my existing fence style if I'm adding a section?",
        answer:
          "Usually, yes. We'll assess your existing fence materials, picket profile, rail spacing, and hardware before quoting an addition or repair. Perfect color matching on weathered wood or aged vinyl isn't always possible, but we'll give you an honest assessment of how closely we can match before work begins.",
      },
      {
        question: "Can you install a fence if I already purchased the materials?",
        answer:
          "Yes. We offer install-only service for clients who have already sourced their own materials. We'll review your material list, confirm post placement with you, and handle all labor. We'll flag any issues with the materials you've purchased — incorrect post length for depth requirements, for example — before we start.",
      },
      {
        question: "How long does a fence installation take?",
        answer:
          "A typical residential privacy fence (100–200 linear feet) takes 1–3 days. Larger commercial or HOA perimeter projects may take longer. Timeline is included in every written proposal. Permit approval, if required, adds lead time before we can break ground.",
      },
    ],
  },

  // ── Power & Window Washing ────────────────────────────────────
  {
    slug:  "washing",
    label: "Power & Window Washing",
    questions: [
      {
        question: "What's the difference between pressure washing and soft washing?",
        answer:
          "Pressure washing uses high water pressure to remove dirt and staining — appropriate for concrete, brick, and hard surfaces. Soft washing uses lower pressure combined with cleaning agents to kill mold, mildew, and algae at the source — appropriate for painted wood siding, vinyl, stucco, and roofing. Using high pressure on the wrong surface damages paint, erodes grout, and strips stain. We match the method to the material on every job.",
      },
      {
        question: "How often should I have my house exterior washed?",
        answer:
          "For most Northern Colorado homes, every 1–2 years is appropriate. Properties with significant tree coverage, north-facing siding, or adjacent to fields tend to accumulate algae and pollen faster and may benefit from annual washing. A clean exterior also protects paint and stain from premature breakdown, making it a maintenance investment, not just cosmetic.",
      },
      {
        question: "Will pressure washing damage my wood deck?",
        answer:
          "Done incorrectly, yes. High pressure on wood raises grain, splinters fibers, and drives water deep into the boards. We use low-pressure washing with appropriate wood-safe cleaners on all deck surfaces. We also offer deck prep for staining and sealing — cleaning and light sanding before your stain contractor arrives, or we can handle the full stain and seal ourselves.",
      },
      {
        question: "Do you clean windows on the inside too?",
        answer:
          "Yes. We offer exterior-only and interior + exterior window cleaning for both residential and commercial properties. Screens are removed and cleaned separately. We use streak-free solutions and squeegee technique — not paper towels and glass cleaner.",
      },
      {
        question: "Can you remove oil stains from my concrete driveway?",
        answer:
          "We can significantly reduce or eliminate most oil stains with commercial-grade degreasing agents and hot water pressure washing. Fresh stains respond better than old, set-in stains. For severe or long-standing staining, we'll give you an honest assessment of what's achievable before charging for the work.",
      },
    ],
  },

  // ── Estimating & Pricing ──────────────────────────────────────
  {
    slug:  "estimating-pricing",
    label: "Estimating & Pricing",
    questions: [
      {
        question: "How does the online estimator work?",
        answer:
          "Our estimator calculates a price range based on your quantities and our current Northern Colorado pricing. Select a service category, enter how much you need (square footage, linear feet, number of units, etc.), and the tool shows you an estimated range instantly. You can add multiple services to see a combined estimate. No account or contact info required.",
      },
      {
        question: "Are the online estimates binding quotes?",
        answer:
          "No. Estimator ranges are based on typical project costs and are designed to give you a realistic ballpark before you invest time in a consultation. Final pricing depends on your specific site conditions, material selections, access, and scope. For a firm price, request a site visit — we'll walk the property and provide a written proposal with a clear range.",
      },
      {
        question: "What factors affect the final price of a project?",
        answer:
          "The main variables are: site accessibility (slope, obstacles, distance from staging area), existing conditions that require extra prep work (overgrown beds, compacted soil, old fence removal), material grade and brand selection, and project timing. We identify all of these during the site visit so there are no surprises after work begins.",
      },
      {
        question: "Do you require a deposit before starting work?",
        answer:
          "For larger projects (landscape installs, full fence replacements), we typically require a 25–50% deposit at contract signing to cover materials. Recurring maintenance services are invoiced monthly with no deposit required. Deposit terms are spelled out clearly in every written proposal.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept check, ACH bank transfer, and all major credit cards. Credit card payments may carry a small processing fee, which will be noted on your invoice. For recurring maintenance clients, we offer auto-pay by ACH on a monthly billing cycle.",
      },
      {
        question: "Do you offer discounts for bundling services?",
        answer:
          "Yes. Clients who bundle multiple services — for example, grounds maintenance combined with seasonal fertilization, or a landscape install followed by an ongoing maintenance contract — receive preferred pricing. The most consistent discounts go to our recurring maintenance clients, who also get priority scheduling. Ask us about bundled service agreements when you request a quote.",
      },
    ],
  },

  // ── Scheduling & Process ──────────────────────────────────────
  {
    slug:  "scheduling-process",
    label: "Scheduling & Process",
    questions: [
      {
        question: "How far in advance do I need to book?",
        answer:
          "For recurring grounds maintenance, we can typically start within 1–2 weeks. For larger projects like landscape installs or full fence replacements, expect 2–4 weeks of lead time depending on our current schedule and permit requirements. Spring is our busiest season — if you're planning a spring project, reaching out in February or March is strongly recommended.",
      },
      {
        question: "What should I do to prepare for a service visit?",
        answer:
          "For maintenance visits, make sure we have gate access and that pets are secured. For installations and one-time services, clear the work area of furniture, vehicles, or personal items. If you have a sprinkler system, note where the heads are so we can work around them. Beyond that, we handle the logistics — you don't need to supervise.",
      },
      {
        question: "What happens if bad weather delays my project?",
        answer:
          "We'll contact you proactively to reschedule. We won't work in conditions that would compromise quality — laying sod in a downpour or setting posts in frozen ground isn't something we do just to hit a deadline. We build weather flexibility into our project timelines and communicate delays as early as possible.",
      },
      {
        question: "How do I communicate changes or special requests?",
        answer:
          "For ongoing maintenance clients, we have a client communication system where you can leave notes, flag issues, or request service adjustments. You can also reach us by phone or email at any time. We respond to all messages within one business day, usually faster.",
      },
      {
        question: "Do you provide before and after documentation?",
        answer:
          "Yes, for project work (installs, large clean-ups, fence installations). We photograph before and after conditions and can provide these on request. For commercial and HOA clients, we include before/after photos in our written service reports as a standard part of the work record.",
      },
      {
        question: "What if I'm not satisfied with the work?",
        answer:
          "Call us. We stand behind our work and will return to address any issue that doesn't meet the standard we committed to. We don't argue about whether something was done correctly — if you're not satisfied, we want to know and we'll make it right. Our reputation in Northern Colorado depends on getting it right every time.",
      },
    ],
  },


  // ── Renovation & Remodeling ───────────────────────────────────
  {
    slug:  "renovation-remodeling",
    label: "Renovation & Remodeling",
    questions: [
      {
        question: "Do I need permits for a home renovation in Northern Colorado?",
        answer:
          "Most structural work, electrical, plumbing, and mechanical changes require permits regardless of municipality. In Erie, Longmont, Boulder, and surrounding Front Range cities, permits are also required for additions, basement finishes, and significant interior alterations. We research permit requirements as part of every project scope and pull permits on your behalf when applicable. Skipping permits creates problems at resale and can result in required demolition of non-permitted work.",
      },
      {
        question: "How do you price a renovation project?",
        answer:
          "Renovation pricing depends on scope, materials, and site conditions. We conduct a project walkthrough, develop a written scope of work, and provide a clear price range before any work begins. Larger projects are quoted with a detailed line-item breakdown so you know exactly what drives the number. We don't give ballpark estimates over the phone for renovation work — the site conditions matter too much.",
      },
      {
        question: "How long does a typical home renovation take?",
        answer:
          "A bathroom remodel typically runs 2–4 weeks. A kitchen renovation runs 4–8 weeks depending on custom versus stock cabinet lead times. A basement finish runs 6–10 weeks. Full home renovations vary by scope and can run several months. We provide a project timeline with every written proposal and update you proactively if anything affects the schedule.",
      },
      {
        question: "Do you handle electrical, plumbing, and HVAC?",
        answer:
          "We self-perform framing, drywall, carpentry, tile, flooring, and painting. For electrical, plumbing, and HVAC rough-in work, we coordinate licensed trade partners who are vetted and carry their own insurance. You have a single point of contact — us — and we coordinate all trade scheduling so you don't have to manage multiple contractors.",
      },
      {
        question: "What's the difference between a renovation and a remodel?",
        answer:
          "A renovation restores or updates an existing space without changing its fundamental function or layout — new floors, paint, fixtures. A remodel changes the structure, layout, or function of a space — moving walls, changing the floor plan, converting a space to a different use. We handle both, and many projects combine elements of each. We'll help you scope the work to match your goals and budget.",
      },
      {
        question: "Do you do investment property or fix-and-flip renovations?",
        answer:
          "Yes, and it's a significant part of our work. We understand ROI-focused renovations for rental properties and properties being prepped for sale. We know what buyers and tenants value in Northern Colorado — durable finishes, functional kitchens and baths, clean paint and flooring — and we can scope work that maximizes return without over-improving for the market.",
      },
    ],
  },

  // ── Decks, Pergolas & Water Features ─────────────────────────
  {
    slug:  "decks-pergolas-water-features",
    label: "Decks, Pergolas & Water Features",
    questions: [
      {
        question: "Do I need a permit for a deck or pergola in Colorado?",
        answer:
          "Yes, in virtually all Northern Colorado municipalities. Decks attached to the structure require a permit in Erie, Longmont, Boulder, and surrounding cities. Freestanding decks and pergolas over a certain size also typically require permits. We handle permit research and application as part of every deck and pergola project.",
      },
      {
        question: "Composite or wood decking — which is better for Colorado?",
        answer:
          "Both work, and both have trade-offs in Colorado's climate. Composite decking (Trex, TimberTech, etc.) requires far less maintenance — no staining, no sealing, and it holds up better to Colorado's UV and freeze-thaw cycles. Wood decking is less expensive upfront but requires staining or sealing every 2–3 years to prevent UV degradation and moisture damage. For most homeowners who want low maintenance, composite is the right long-term choice. We'll walk you through both options with current pricing during the quote process.",
      },
      {
        question: "How do you account for Colorado's freeze-thaw in deck construction?",
        answer:
          "Post footings are set below frost depth (36+ inches in most of Northern Colorado). We use post base hardware rather than burying wood posts directly in concrete — this keeps the wood above grade and prevents the rot that comes from wood-to-concrete contact. Fasteners are stainless or galvanized. Ledger connections use flashed hardware to prevent water infiltration at the house connection.",
      },
      {
        question: "What is a pondless waterfall and is it better than a traditional pond?",
        answer:
          "A pondless waterfall captures all the visual and sound benefits of a water feature without an exposed surface pond. Water flows over a waterfall and disappears into a gravel-filled underground reservoir, where a pump recirculates it. The benefits: no open water safety concerns, minimal algae management, less evaporation, and it can be turned off and on easily. For most residential properties, a pondless system is lower maintenance and safer than a traditional pond. If you want koi or an ecosystem, a full pond is the right choice.",
      },
      {
        question: "Can water features survive Colorado winters?",
        answer:
          "Yes, with proper winterization. For pondless systems, winterization involves removing and storing the pump, clearing the vault, and allowing the system to drain down. For koi ponds, winterization is more involved — the pond needs to be deep enough to prevent complete freeze-through, aeration is essential, and the pump management requires specific steps. We provide a full winterization walkthrough with every water feature installation and offer annual winterization service.",
      },
      {
        question: "How much does a custom water feature cost?",
        answer:
          "A simple pondless waterfall with a small waterfall run starts around $3,500–$6,000 installed. A larger stream feature or naturalistic pond with boulders and planting runs $8,000–$20,000+. Decorative fountains vary widely by unit and site prep. All pricing is provided in a written proposal after a site visit — there are too many site-specific variables (excavation requirements, plumbing access, material selections) to quote accurately without seeing the property.",
      },
    ],
  },

  // ── Concierge & Estate ────────────────────────────────────────
  {
    slug:  "concierge-estate",
    label: "Concierge & Estate",
    questions: [
      {
        question: "What does your estate housekeeping service include?",
        answer:
          "Our estate housekeeping covers all interior cleaning tasks — kitchens, bathrooms, bedrooms, common areas, and high-touch surfaces — on a scheduled recurring basis. We work with a consistent team assigned to your home, so the same people handle your property every visit. They know your home, your preferences, and your standards without you re-explaining. Available weekly, bi-weekly, or monthly depending on your needs.",
      },
      {
        question: "Do you offer home wellness checks for vacant or secondary properties?",
        answer:
          "Yes. Our home safety and wellness check service is designed for property owners who aren't always on-site — vacation homes, secondary residences, investor-owned properties between tenants, and primary homes while owners travel. We visit on a scheduled basis, inspect key systems (HVAC filters, water heaters, plumbing, security, exterior), and deliver a photo report. Issues are flagged immediately so you can act before small problems become expensive ones.",
      },
      {
        question: "What does your mobile auto detailing service include?",
        answer:
          "We come to you — no drop-off, no waiting in line, no strangers with your keys. Our mobile detailing covers exterior wash and clay bar treatment, paint decontamination, interior vacuum and wipe-down, window cleaning, and tire and wheel cleaning. Full detail packages include compound polish, wax or paint sealant application, leather conditioning, and odor treatment. Available as a one-time service or on a maintenance schedule.",
      },
      {
        question: "Is concierge service available as a standalone or only bundled with other services?",
        answer:
          "Both. Estate housekeeping, home safety checks, and mobile detailing can be purchased as standalone recurring services or as part of a bundled property care agreement. Clients who bundle multiple services receive preferred pricing and scheduling priority. Concierge services are available to existing Forge Point clients and new clients in our service area — contact us to discuss what your property needs.",
      },
    ],
  },

  // ── Junk Haul Off ─────────────────────────────────────────────
  {
    slug:  "junk-haul-off",
    label: "Junk Haul Off",
    questions: [
      {
        question: "What items do you haul off?",
        answer:
          "We remove furniture, appliances, mattresses, construction and demo debris, yard waste, storm debris, and general household junk. We also handle full estate and property cleanouts including garages, basements, sheds, and attics. Items we can't take include hazardous materials (paint, chemicals, asbestos, propane tanks), medical waste, and tires in bulk quantities. If you're unsure whether we can take something, just ask.",
      },
      {
        question: "How is junk haul off priced?",
        answer:
          "We price by volume — the amount of space your items take up in our truck. We provide a free on-site quote before any work begins. Pricing is transparent: you know the cost before we load a single item. Heavy items (concrete, dirt, roofing material) may carry additional weight-based charges, which we'll disclose upfront.",
      },
      {
        question: "How quickly can you schedule a haul off?",
        answer:
          "We typically offer same-week scheduling for haul off jobs. For large estate or property cleanouts, we may schedule over 2–3 days. Call or submit a contact form with a description of what you need removed and we'll give you availability.",
      },
      {
        question: "Do you donate or recycle items?",
        answer:
          "Yes. We sort usable items for donation — furniture, working appliances, and household goods in good condition go to local donation partners rather than the landfill. We also separate recyclable materials including metals, cardboard, and electronics. We make an honest effort to divert material from landfill disposal wherever it's practical.",
      },
      {
        question: "Can you handle a full estate or property cleanout?",
        answer:
          "Yes. We handle full estate cleanouts for families clearing a property after a death, foreclosure cleanouts for property managers and investors, and rental property turnovers between tenants. These jobs are handled with discretion and efficiency. We provide a firm quote for the full cleanout before starting and work until the property is cleared to the agreed standard.",
      },
    ],
  },

] as const;

// ── Helpers ───────────────────────────────────────────────────────

export function getAllQuestions(): (FaqItem & { categorySlug: string; categoryLabel: string })[] {
  return FAQ_CATEGORIES.flatMap((cat) =>
    cat.questions.map((q) => ({
      ...q,
      categorySlug:  cat.slug,
      categoryLabel: cat.label,
    }))
  );
}
