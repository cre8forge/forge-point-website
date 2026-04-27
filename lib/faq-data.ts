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

  // ── Landscaping ──────────────────────────────────────────────
  {
    slug:  "landscaping",
    label: "Landscaping",
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
