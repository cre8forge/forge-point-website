import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const UNIVERSITY_CATALOG = [
  {
    name: "Lawn & Turf",
    slug: "lawn-turf",
    description: "Everything you need to know about growing and maintaining a healthy lawn in Northern Colorado.",
    sortOrder: 1,
    articles: [
      {
        title: "Sod vs. Seed: Which Is Right for Your Colorado Yard?",
        slug: "sod-vs-seed-colorado",
        excerpt: "Both work — but not for every yard. Here's how to choose based on your timeline, budget, and site conditions.",
        coverImage: img("1517022812379-23952977f6e7"),
        featured: true,
        sortOrder: 1,
        content: `## The Real Difference Between Sod and Seed

When Colorado homeowners want a new lawn, the first question is always sod or seed. The answer depends on your timeline, budget, soil conditions, and how much babysitting you're willing to do in the first few weeks.

![Freshly installed sod on a Northern Colorado property](https://images.unsplash.com/photo-1517022812379-23952977f6e7?auto=format&fit=crop&w=900&q=80)

### Why Sod Wins on Speed

Sod gives you an established lawn in 2–3 weeks. You're laying mature turf that was grown under controlled conditions, and as long as you keep it watered and stay off it, it knits into your soil fast. For front yards with HOA pressure, properties going on the market, or homeowners who just want results now — sod is the right call.

The tradeoff is cost. Sod typically runs $1.50–$2.50 per square foot installed in Northern Colorado. For a 3,000 square foot yard, you're looking at $4,500–$7,500 depending on access, grade prep, and grass type.

> **Pro Tip:** Sod should never be installed over existing dead grass or weeds. The decomposing layer underneath creates a barrier that prevents root penetration. Always strip and prep the soil first.

### Why Seed Makes Sense for Large Areas

Seed costs 70–80% less than sod, and the root system that develops from seed is generally stronger because it grows downward from day one rather than having to transition from a nursery growing environment.

The catch: seed requires 6–10 weeks to establish and needs consistent moisture throughout germination. Miss a few days of watering in a hot Colorado August and you lose your germination window entirely.

Seed works best for large properties where budget is a real factor, fall installs where temps cooperate, and areas that will be naturally irrigated or receive consistent rainfall.

[VIDEO:-ddh4hC5x0o]

### Colorado-Specific Considerations

Our clay-heavy soils don't drain well, which affects both options differently. With sod, poor drainage can cause the seams to hold too much moisture and develop rot. With seed, standing water after rain washes seed before it germinates.

Either way, proper grading and soil amendment before installation is the single biggest factor in outcome — more than which product you choose.

### Grass Types That Work in Northern Colorado

For sod: **Kentucky bluegrass** is the standard — dense, dark green, and handles traffic well. **Turf-type tall fescue** is a better option for shaded areas or properties with water restrictions.

For seed: same species apply, but you can also blend fescue and bluegrass for a hardier mix that handles Northern Colorado's climate variability.

### Bottom Line

- **Choose sod** if you need results fast, your yard is under 5,000 sq ft, or HOA timelines demand it.
- **Choose seed** if you're covering a large area, installing in fall, or working within a tight budget.

Either way, prep work determines the outcome more than the product. Invest in the grade and soil before you buy either.`,
      },
      {
        title: "Why Your Front Range Lawn Looks Terrible in August",
        slug: "august-lawn-problems-colorado",
        excerpt: "Heat stress, drought dormancy, and fungal disease all peak in August. Here's how to tell them apart and what to do.",
        coverImage: img("1558618666-fcd25c85cd64"),
        featured: false,
        sortOrder: 2,
        content: `## August Is the Hardest Month for Colorado Lawns

If your lawn looked great in June and terrible by mid-August, you're not alone. Front Range lawns go through a predictable stress cycle every summer, and most homeowners misdiagnose what's happening — which leads to the wrong fix.

![Dry summer lawn in Northern Colorado](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80)

### The Three Things That Kill Colorado Lawns in August

**1. Heat Stress**
Kentucky bluegrass goes dormant when soil temperatures consistently exceed 85°F. The lawn turns tan or straw-colored but is not dead — it's protecting itself. You'll know it's dormancy rather than death if the crowns (the base of the grass plant just above soil level) are still firm and slightly green. Water deeply once a week to keep the crown alive, and don't fertilize. The lawn will recover when temperatures drop.

**2. Drought Stress**
Looks similar to heat dormancy but happens faster and in patches near impervious surfaces (driveways, sidewalks, south-facing slopes). Drought-stressed turf doesn't recover from dormancy as cleanly. If you can't irrigate consistently through July and August, prepare for thin spots that need overseeding in fall.

**3. Fungal Disease**
This is where homeowners get fooled. Dollar spot, brown patch, and necrotic ring spot all peak in hot, humid late-summer conditions — especially when irrigation runs at night and leaves turf wet for extended periods. Unlike dormancy, fungal damage shows as irregular brown patches with defined edges, often with a gray or white cast at patch margins in the morning.

> **Pro Tip:** Switch your irrigation schedule to early morning (4–6 AM) if you're running it at night. Turf that dries out by 10 AM has dramatically lower disease pressure than turf that stays wet overnight.

### What Not to Do

- **Don't scalp the lawn** trying to remove brown turf. Mowing below 2.5 inches in August compounds stress.
- **Don't fertilize** dormant or stressed turf with high-nitrogen products. You'll burn the root system and trigger aggressive top growth the plant can't sustain.
- **Don't overwater** hoping to green it back up. Saturated soil in heat promotes root rot and fungal disease.

### The Recovery Plan

August stress resolves itself in September when temperatures drop and soil cools. The real window for repair is **late August through mid-September** — seed germinates well, aeration opens the soil, and the grass has 6–8 weeks to establish before first frost.

Plan for your fall renovation in August, even if you can't execute it until September. Order materials, schedule aeration, and get your overseed ready to go.`,
      },
      {
        title: "The Right Mowing Height for Every Colorado Grass Type",
        slug: "mowing-height-colorado",
        excerpt: "Mowing too short is the most common lawn mistake in Colorado. Here's the correct height for every grass type, by season.",
        coverImage: img("1571954411453-2fc3f4f8c26d"),
        featured: false,
        sortOrder: 3,
        content: `## Mowing Height Is More Important Than Mowing Frequency

Most homeowners think about how often they mow. They should be thinking about how high. Mowing height directly controls root depth, drought tolerance, weed pressure, and turf density — all the things that determine whether your lawn looks good or struggles.

![Professional mowing on a Northern Colorado property](https://images.unsplash.com/photo-1571954411453-2fc3f4f8c26d?auto=format&fit=crop&w=900&q=80)

### Height by Grass Type

**Kentucky Bluegrass** — the most common Front Range lawn grass
- Spring/Fall: 2.5–3 inches
- Summer (June–August): 3–3.5 inches
- Never below: 2 inches

**Turf-Type Tall Fescue** — common in shadier or lower-water yards
- Spring/Fall: 3–3.5 inches
- Summer: 3.5–4 inches
- Never below: 2.5 inches

**Fine Fescue** — used in low-maintenance or naturalistic settings
- Year-round: 3–4 inches, or allowed to grow to 6–8 inches unmowed

**Buffalo Grass / Blue Grama** — native low-water options
- Best left at 4–6 inches; avoid frequent mowing entirely

### The One-Third Rule

Never remove more than one-third of the blade in a single mowing pass. If your bluegrass is at 4.5 inches and you're targeting 3 inches — that's fine, you're cutting 1.5 inches, which is exactly one-third. If you let it get to 6 inches and try to cut it to 3, you've removed half the blade, which sends the plant into stress and turns it yellow.

> **Pro Tip:** If you went too long between mowings and the lawn is tall, don't try to get to target height in one pass. Drop the deck by one-third, wait 3–4 days, then cut again.

### Raise the Deck in Summer

The most important seasonal adjustment is raising your mowing height in June and keeping it raised through August. Taller turf:
- Shades soil, reducing moisture evaporation
- Develops deeper roots that reach cooler, moister soil layers
- Competes more effectively against weed seeds trying to germinate

Colorado summers are brutal on lawns mowed at 2 inches. We see scalped, burned turf on properties maintained by homeowners who set their deck and never adjust it. Raise it for summer — you'll see the difference within two weeks.

### Fall: Don't Drop Below 2.5 Inches Going into Winter

There's a common myth that mowing short before winter helps the lawn. It doesn't. Going into dormancy at 2.5–3 inches protects crowns from temperature swings and reduces snow mold pressure. Drop to 2.5 inches for the last two fall mowings — no shorter.`,
      },
      {
        title: "How to Aerate and Overseed a Colorado Lawn",
        slug: "aerate-overseed-colorado",
        excerpt: "Fall aeration and overseeding is the single highest-ROI lawn maintenance task in Northern Colorado. Here's how to do it right.",
        coverImage: img("1416879595882-3373a0480b5b"),
        featured: false,
        sortOrder: 4,
        content: `## Fall Is the Best Lawn Investment You Can Make

Aeration and overseeding in late August through mid-September is the most impactful thing you can do for a cool-season lawn in Northern Colorado. Soil temperatures are still warm enough for germination, air temperatures are cooling down, and you have 6–8 weeks before first frost for new seed to establish.

![Healthy aerated lawn ready for overseeding](https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80)

### What Core Aeration Actually Does

A core aerator pulls 2–4 inch plugs of soil from your lawn, spacing them 3–4 inches apart across the entire surface. This does three things:
1. **Breaks up compaction** — especially critical in Northern Colorado's clay soils
2. **Creates seed-to-soil contact zones** — seeds fall into holes and germinate far more reliably than on hard, compacted surface
3. **Improves water penetration** — reduces runoff and puddling after irrigation and rain

The plugs left on the surface break down over 2–3 weeks and return organic matter to the soil. Leave them — don't rake them up.

### Timing the Overseeding

Seed immediately after aeration, before the holes start to close. Every day you wait reduces the benefit. For Northern Colorado, target:
- **Earliest:** August 20
- **Latest:** September 20
- **Sweet spot:** September 1–10

### Seed Selection

For existing bluegrass lawns, overseed with a **Kentucky bluegrass blend** (3–5 varieties) for disease resistance. If your lawn has shaded or stressed areas, add **turf-type tall fescue** to the mix — it handles Colorado's variable conditions better than pure bluegrass.

Seeding rate for overseeding (not bare soil): 3–4 lbs per 1,000 sq ft for bluegrass, 5–6 lbs for fescue.

> **Pro Tip:** Apply a starter fertilizer (high in phosphorus, like 18-24-12) immediately after overseeding. Phosphorus drives root development — exactly what new seedlings need.

### Watering New Seed

This is where most homeowners fail. New seed needs consistent moisture — not soggy, not dry.

- **Days 1–14:** Water lightly 2–3 times per day to keep the top inch moist. Short, frequent cycles.
- **Days 14–28:** Shift to once per day, deeper watering as roots develop.
- **Day 28+:** Treat like an established lawn.

### First Mow

Wait until new grass reaches 3 inches before first mow, and don't cut below 2.5 inches. New seedlings have shallow roots and heavy mower traffic can pull them from the soil.

Apply no weed killer until the new grass has been mowed at least three times.`,
      },
      {
        title: "Colorado Lawn Fertilization: A 4-Step Annual Schedule",
        slug: "colorado-lawn-fertilization-schedule",
        excerpt: "Most Colorado homeowners fertilize at the wrong times with the wrong products. Here's the schedule that actually works.",
        coverImage: img("1558618047-6e3b4b1ae965"),
        featured: false,
        sortOrder: 5,
        content: `## Four Applications, Four Jobs

A healthy Front Range lawn needs four targeted fertilizer applications per year. Miss any of them — especially the fall application — and you'll spend the following year trying to recover density and color that a $40 bag of fertilizer would have maintained.

![Healthy fertilized lawn in Northern Colorado](https://images.unsplash.com/photo-1558618047-6e3b4b1ae965?auto=format&fit=crop&w=900&q=80)

### Application 1: Early Spring — Green-Up (March–April)

**What it does:** Kick-starts growth after dormancy.
**What to use:** Balanced slow-release fertilizer, 29-0-4 or similar. Light on phosphorus since established lawns don't need much.
**Rate:** 0.5 lbs nitrogen per 1,000 sq ft
**Timing:** When soil temperature reaches 50°F consistently — usually late March to mid-April along the Front Range.

Don't push high nitrogen in early spring. Fast top growth before root systems have fully activated leads to thatch buildup and disease susceptibility.

### Application 2: Late Spring — Feed (May–June)

**What it does:** Sustains strong growth during the most active growing period.
**What to use:** Slow-release nitrogen, 32-0-10 or similar with potassium for stress tolerance.
**Rate:** 0.75 lbs nitrogen per 1,000 sq ft
**Timing:** Memorial Day, give or take two weeks.

This is the application most homeowners do correctly. The rest of the schedule is where they fall off.

> **Pro Tip:** Skip fertilizing in July and August. Heat + nitrogen = burned turf and increased disease pressure. Let the lawn coast through summer.

### Application 3: Early Fall — Recovery (August–September)

**What it does:** Rebuilds density after summer stress, supports new seed germination if overseeding.
**What to use:** Starter fertilizer if overseeding (18-24-12). Otherwise balanced slow-release.
**Rate:** 0.75 lbs nitrogen per 1,000 sq ft
**Timing:** Late August to mid-September, same window as aeration/overseeding.

### Application 4: Late Fall — Winterizer (October–November)

**What it does:** Builds carbohydrate reserves in the root system for winter survival and early spring green-up.
**What to use:** High-potassium formulation, 13-2-13 or 0-0-50 (straight potassium) in very poor-soil lawns.
**Rate:** 1 lb nitrogen per 1,000 sq ft
**Timing:** After the lawn has gone mostly dormant but before hard freeze — typically late October along the Front Range.

This is the most important application most homeowners skip. The nitrogen stays in the root system over winter and fuels green-up weeks earlier than unfertilized lawns in spring.`,
      },
      {
        title: "Dealing with Clay Soil in Northern Colorado",
        slug: "clay-soil-northern-colorado",
        excerpt: "Front Range soil is some of the most difficult in the country for landscaping. Here's what you're working with and how to fix it.",
        coverImage: img("1416879595882-3373a0480b5b"),
        featured: false,
        sortOrder: 6,
        content: `## The Problem with Front Range Soil

Northern Colorado sits on a band of Pleistocene-era clay soils that formed from ancient lake and river deposits. This clay is high in montmorillonite — a mineral that swells when wet and cracks when dry, creating the characteristic surface cracks you see in dry Colorado summers.

For landscaping, this creates three persistent problems: poor drainage, compaction, and restricted root growth.

### Why Clay Drains So Slowly

Clay particles are extremely fine — roughly 1,000 times smaller than sand particles. When wet, they pack tightly and allow almost no water movement. After a heavy rain or irrigation cycle, Front Range clay can hold surface water for hours, suffocating roots and creating conditions for fungal disease.

> **Pro Tip:** If you can't push a standard screwdriver 6 inches into your soil by hand when it's dry, your soil is compacted enough to restrict root growth. This is extremely common along the Front Range.

### Amendment vs. Replacement

Amending clay is a long-term project, not a one-season fix. The mistake most homeowners make is adding a thin layer of compost to the surface — enough to grow weeds but not enough to change the drainage behavior of the underlying clay.

**Effective amendment requires:**
- Tilling 4–6 inches deep
- Adding 3–4 inches of compost or aged manure to each tilled area
- Blending thoroughly before seeding or sodding

For new landscape beds, we often recommend 6–8 inches of amended soil on top of graded native clay, which gives plants enough root zone to establish before they hit the limiting layer.

### What Actually Works Long-Term

**Organic matter over time** — annual compost applications and leaving grass clippings on the lawn builds organic content slowly but permanently.

**Aeration** — annual core aeration breaks up surface compaction and channels water deeper into the profile.

**Native and adapted plants** — deep-rooted natives like blue grama, buffalo grass, and yarrow can penetrate clay that stops ornamental plants cold.

**Raised beds** — for vegetable gardens and specialty plantings, raised beds with imported soil are far more productive than fighting the native clay.

### Drainage Solutions

If you have standing water after rain or irrigation, the problem is usually a combination of clay and improper grading. Water follows grade — it doesn't care about soil type. French drains, dry creek beds, and swales redirect water away from structures and low points. These are engineering solutions, not soil solutions, and they're often necessary regardless of what amendments you make.`,
      },
    ],
  },
  {
    name: "Landscape & Design",
    slug: "landscape-design",
    description: "Design principles, plant selection, and installation guidance for Northern Colorado landscapes.",
    sortOrder: 2,
    articles: [
      {
        title: "How to Plan a Colorado-Ready Landscape from Scratch",
        slug: "plan-colorado-landscape",
        excerpt: "The order of decisions matters. Here's how to plan a landscape that will actually hold up to Colorado's climate.",
        coverImage: img("1558618047-6e3b4b1ae965"),
        featured: true,
        sortOrder: 1,
        content: `## Start with Site, Not Plants

The most common landscaping mistake is choosing plants before solving for site conditions. A beautiful perennial border fails if the drainage is wrong. A new patio heaves and cracks if the subgrade wasn't properly prepped. Before you pick a single plant or paver, you need to understand your site.

![Landscape design process for a Northern Colorado property](https://images.unsplash.com/photo-1558618047-6e3b4b1ae965?auto=format&fit=crop&w=900&q=80)

### Step 1: Solve Drainage First

Water moves downhill and finds the path of least resistance. Before any design work, walk your property after a heavy rain and map where water collects, where it flows, and where it causes problems. Low spots near foundations, water running toward the house, and standing water in the lawn all need to be addressed through grading — not plants.

Grading is unglamorous and often the most expensive part of a landscape project, but it's the foundation everything else rests on. An improperly graded yard will undermine every other investment you make.

### Step 2: Identify Your Sun Zones

Map your yard in three zones: full sun (6+ hours direct), part shade (3–6 hours), and full shade (under 3 hours). This determines your plant palette and turf options more than any other factor.

Front Range afternoons are intense — what feels like part shade in morning can be full sun by 2 PM. Observe your property at multiple times of day before locking in planting plans.

### Step 3: Define Your Water Budget

Colorado's water restrictions vary by municipality. Erie, Longmont, and Boulder each have different odd/even watering rules and in some years, stage restrictions during drought years. Design your irrigation zones to water turf, xeriscape beds, and deep-root plantings separately — they have different needs and should be on separate zones.

> **Pro Tip:** Design for your worst water year, not your average. A landscape that survives a Stage 2 drought restriction in an average year will thrive in good water years. One designed for average conditions will struggle in any restriction period.

### Step 4: Hardscape Before Softscape

Design patios, walks, retaining walls, and fencing before plants. Hardscape determines the bones of the landscape and is expensive to change later. It also determines drainage patterns, which affects everything downstream.

### Step 5: Plant Selection — Natives and Adapted Species First

Northern Colorado's best landscapes are built around plants that thrive here without constant intervention. Blue grama, buffalo grass, native sedums, penstemons, yarrow, and ornamental grasses handle our freeze-thaw cycles, UV intensity, and water restrictions without the constant care that non-adapted species require.

Layer in ornamentals and annuals for color and interest — but build the structure with tough, regional plants.`,
      },
      {
        title: "The Best Native Plants for Northern Colorado",
        slug: "native-plants-northern-colorado",
        excerpt: "These plants evolved here. They handle the UV, the wind, the clay, and the water restrictions without complaint.",
        coverImage: img("1558618047-6e3b4b1ae965"),
        featured: false,
        sortOrder: 2,
        content: `## Why Native Plants Win in Colorado

Nursery shelves are full of plants that look great in the pot and struggle in Northern Colorado soil. Native and regionally adapted plants don't have that problem. They evolved here. They've handled 50 mph chinook winds, six-week droughts, and late May snowstorms for thousands of years.

![Native Colorado plants in a well-designed landscape](https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80)

### Best Native Grasses

**Blue Grama (Bouteloua gracilis)** — The quintessential Colorado native grass. Drought-tolerant, handles clay soil, produces distinctive eyelash-shaped seed heads in late summer. Works as a lawn alternative mowed at 4–6 inches or allowed to grow naturally.

**Buffalo Grass (Buchloe dactyloides)** — Produces a dense, fine-textured turf with minimal water. Goes dormant in winter and green-up is slower than bluegrass — but once established, needs almost no supplemental irrigation.

**Little Bluestem (Schizachyrium scoparium)** — Ornamental clumping grass with stunning russet fall color. Plant in full sun, well-drained soil. Exceptional wind tolerance.

### Best Native Perennials

**Rocky Mountain Penstemon (Penstemon strictus)** — Bright blue-purple flowers, June bloom, extremely drought tolerant. Deer resistant.

**Prairie Coneflower (Ratibida columnifera)** — Yellow and red daisy flowers all summer. Reseeds reliably. Handles poor, dry soils that kill ornamental perennials.

**Native Yarrow (Achillea millefolium)** — White flower heads, ferny foliage, spreads moderately to fill bare areas. Tolerates clay, drought, and foot traffic.

**Blanket Flower (Gaillardia aristata)** — Long-blooming red and yellow flowers from June through frost. Full sun, dry soil, exceptional drought tolerance.

> **Pro Tip:** Plant natives in fall if possible. Fall planting allows root development through the cool season before summer heat and drought stress arrive. Spring-planted natives often struggle their first summer.

### Best Native Shrubs

**Three-Leaf Sumac (Rhus trilobata)** — Brilliant orange and red fall color. Handles dry, disturbed soil on slopes where nothing else thrives. Excellent for erosion control.

**Apache Plume (Fallugia paradoxa)** — White rose flowers followed by feathery pink seed heads that persist through fall. Extremely drought tolerant.

**Wild Plum (Prunus americana)** — White spring flowers, small edible fruit, dense spreading form. Excellent wildlife habitat.

### Design Principle

Native plants look their best when grouped in informal drifts rather than spaced formally. A single penstemon looks sparse; twenty planted in a loose cluster with native grasses looks deliberate and beautiful.`,
      },
      {
        title: "Retaining Walls: Materials, Costs, and What Works in Colorado",
        slug: "retaining-walls-colorado",
        excerpt: "Retaining walls in Colorado face freeze-thaw stress that destroys under-built structures. Here's what to specify and why.",
        coverImage: img("1560518883-ce09059eeffa"),
        featured: false,
        sortOrder: 3,
        content: `## Why Retaining Walls Fail in Colorado

A retaining wall is a structural system, not just a landscaping feature. Walls that fail in Colorado almost always fail for the same reasons: inadequate footing depth, poor drainage behind the wall, and materials or construction methods not suited to our freeze-thaw conditions.

![Retaining wall construction in a Colorado landscape](https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80)

### Freeze-Thaw Is the Killer

Northern Colorado's frost depth is approximately 36 inches. Any retaining wall footing that doesn't extend below that depth will heave during freeze-thaw cycles. Over 3–5 winters, heaved walls tilt forward, joints open, and the wall eventually fails or becomes a safety hazard.

This applies even to small walls. A 24-inch garden wall with an 8-inch footing will heave in Colorado. A properly built 24-inch wall with a footing 36+ inches deep won't.

### Material Options

**Concrete Block (Segmental Retaining Wall)** — The most common residential option. Interlocking blocks from manufacturers like Versa-Lok and Allan Block are engineered for residential applications up to 4 feet without a permit in most Colorado municipalities. Cost: $35–$55 per square foot of face area installed.

**Natural Boulder** — Large sandstone or granite boulders stacked to form walls. No mortar, excellent drainage naturally, looks appropriate in Colorado landscapes. Best for walls under 3 feet. Cost: $45–$75 per square foot.

**Poured Concrete** — Strongest option, requires forming, permits for most residential applications, and professional installation. Best for walls over 4 feet, commercial applications, or where surcharge loads (vehicles, structures) are present. Cost: $60–$100+ per square foot.

**Timber** — Railroad ties and landscape timbers are inexpensive but have the shortest lifespan in Colorado. UV and moisture cycling cause timber to crack and check within 5–10 years. Treat as a temporary solution.

> **Pro Tip:** Any retaining wall over 4 feet in height requires a building permit and engineered drawings in most Colorado Front Range municipalities. Don't skip this — unpermitted walls can create title issues when you sell.

### Drainage Is Non-Negotiable

Every retaining wall must have drainage behind it. Hydrostatic pressure from water-saturated soil can push out even a well-built wall. Standard practice:
- 12-inch layer of 3/4-inch washed gravel behind the entire wall
- Perforated drain pipe at the footing, daylighting away from the wall at one or both ends
- Filter fabric between the gravel and native soil to prevent migration`,
      },
      {
        title: "Drip Irrigation vs. Spray Systems: What's Right for Your Property?",
        slug: "drip-vs-spray-irrigation",
        excerpt: "Spray heads and drip emitters serve different purposes. Here's when to use each — and the common mistakes that waste water.",
        coverImage: img("1416879595882-3373a0480b5b"),
        featured: false,
        sortOrder: 4,
        content: `## Two Different Tools for Two Different Jobs

Spray heads and drip irrigation both deliver water, but they work completely differently and serve different plant needs. Using the wrong system for an application wastes water, causes plant stress, and creates uneven coverage that no amount of controller adjustment can fix.

![Irrigation system serving a Colorado landscape](https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80)

### Spray Systems: For Turf

Spray heads — including fixed sprays and rotary heads — are designed for turf areas. They apply water uniformly across a zone at rates of 1–2 inches per hour. Turf benefits from this because the shallow, fibrous root system needs consistent surface moisture.

**Rotary heads** (Hunter MP Rotators, Rain Bird R-VAN) apply water much more slowly than fixed spray heads — 0.4–0.5 inches per hour vs. 1.5+ inches per hour for fixed sprays. On Colorado's clay soil, rotary heads are usually the better choice because clay can only absorb water at 0.2–0.5 inches per hour. Fixed sprays on clay create runoff before the water penetrates.

### Drip Irrigation: For Beds and Trees

Drip delivers water directly to root zones at very low pressure. For landscape beds, trees, and shrubs, drip is superior to spray for three reasons:

1. **No foliar wetting** — wet leaves increase disease pressure for many ornamentals
2. **Targeted delivery** — water goes exactly where roots are, not on bare mulch or hardscape
3. **Efficiency** — virtually no evaporation loss compared to spray heads

> **Pro Tip:** Run drip zones 3–4 times longer than spray zones. Drip applies water slowly and deeply — a 30-minute drip cycle is equivalent to a short spray cycle. Most drip zones need 45–90 minutes per cycle.

### Common Mistakes

**Mixing turf and plant material on the same zone** — grass needs water several times per week; trees and shrubs need deep infrequent watering. On the same zone, one or the other is always wrong.

**Under-sizing drip emitters** — a 1 GPH emitter on a 5-gallon shrub delivers adequate water. On a 15-gallon tree, that same emitter will starve the plant. Size emitters to plant water demand.

**No pressure regulation on drip** — drip operates at 15–30 PSI. Most residential systems run at 50–80 PSI. Without a pressure regulator at the head of the drip zone, you'll blow emitters and create misting that defeats the purpose.

### What a Good Design Looks Like

- Turf zones on spray heads (rotary preferred for clay soils)
- All landscape beds on drip with emitters sized per plant
- Trees on their own drip zone or sub-circuit with higher-GPH emitters
- Smart controller with weather-based adjustments
- Seasonal shutoff and spring startup schedule`,
      },
      {
        title: "How to Grade Your Yard for Proper Drainage",
        slug: "yard-grading-drainage",
        excerpt: "Poor grading causes more property damage than almost any other landscape issue. Here's how to identify and fix it.",
        coverImage: img("1560185893-a55b8a6f7e89"),
        featured: false,
        sortOrder: 5,
        content: `## The Rule Nobody Mentions

Every landscape project starts and ends with drainage. You can install the most beautiful plants, the most expensive pavers, and the best irrigation system in Northern Colorado — and all of it fails if water doesn't move away from your structures correctly.

![Property grading and drainage work](https://images.unsplash.com/photo-1560185893-a55b8a6f7e89?auto=format&fit=crop&w=900&q=80)

### What Correct Grading Looks Like

The minimum standard for residential drainage is a 2% slope away from foundations for the first 10 feet — that's roughly 2.4 inches of drop over 10 feet. On Colorado's clay soils, we recommend 3–5% where possible because clay doesn't absorb water quickly and the margin for error is smaller.

Beyond the foundation zone, the goal is positive drainage — water should flow continuously toward the street, a drainage swale, a dry well, or another defined outlet. Dead spots where water pools are always a problem.

### Signs Your Grading Is Wrong

- Standing water near the foundation after rain or irrigation
- Wet basement or crawl space after storm events
- Lawn areas that stay soggy for days after watering
- Surface cracks in dry soil near the house (clay shrinkage pulling away from foundation)
- Efflorescence (white mineral deposits) on foundation walls

### How Grading Gets Fixed

**Minor regrading** — for yards with localized low spots, importing topsoil and reworking the grade manually is often sufficient. This is a good candidate for a DIY project if the areas are small and accessible.

**Full regrade** — when the entire yard pitches toward the house or the drainage pattern is fundamentally wrong, a full regrade involves stripping the lawn, bringing in fill or removing soil, establishing correct grades with a laser level, and restoring the surface. This is professional work.

> **Pro Tip:** Before calling for drainage help, take photos and video of your property during and immediately after a heavy rain. Showing a contractor exactly where water flows tells them more than any verbal description.

### When Grading Isn't Enough

Some properties have so much water moving through them — from neighbors, from impervious surface runoff, from high water tables — that surface grading alone can't solve the problem. These situations typically require:

**French drains** — perforated pipe in gravel-filled trenches that intercept subsurface water and redirect it to daylight.

**Catch basins** — underground collection points connected to drain pipe, used where surface water concentrates.

**Dry creek beds** — decorative but functional channels that direct storm water across the landscape to a defined outlet.`,
      },
      {
        title: "Outdoor Lighting for Colorado Properties",
        slug: "outdoor-lighting-colorado",
        excerpt: "Well-placed landscape lighting extends your outdoor living season and adds security without looking like a parking lot.",
        coverImage: img("1416879595882-3373a0480b5b"),
        featured: false,
        sortOrder: 6,
        content: `## The Two Goals of Landscape Lighting

Outdoor lighting serves two purposes that pull in different directions: security (bright, visible, coverage-focused) and aesthetics (subtle, layered, accent-focused). The best landscape lighting systems accomplish both without making your property look like a car dealership.

![Landscape lighting illuminating a Colorado property at dusk](https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80)

### Low-Voltage LED Systems

Low-voltage landscape lighting (typically 12V) is the standard for residential applications. Modern LED fixtures draw a fraction of what older halogen systems used — a 25-fixture system might draw less than 150W total — and last 25,000+ hours. The upfront cost is higher than halogen, but operating costs and replacement frequency are far lower.

### Lighting Techniques That Actually Work

**Uplighting** — fixtures aimed upward at trees, architectural features, or specimen plants. Creates dramatic shadows and gives structure to the landscape after dark. Use warm white (2700–3000K) for a natural effect.

**Path lighting** — low fixtures along walkways that light the path, not people's eyes. The mistake is mounting path lights too high, which creates glare. Fixtures should illuminate the walking surface, not the landscape.

**Downlighting** — fixtures mounted high in trees aimed downward to simulate moonlight. One of the most natural-looking techniques. Requires professional installation to set fixtures correctly.

**Wall washing** — fixtures aimed at a fence or wall to create a soft glow. Works well on board-on-board cedar fences and masonry walls.

> **Pro Tip:** Use warm white (2700–3000K) for areas where you spend time, and cool white (4000K) only for security lighting or feature highlighting where you want more visual punch. Mixing temperatures in the same view looks inconsistent.

### Colorado-Specific Considerations

**UV** — at Front Range elevation, UV degrades plastic fixture housings faster than at lower elevations. Specify brass, copper, or cast aluminum fixtures rather than plastic composites.

**Wind** — exposed path lights and accent fixtures get knocked around by chinook winds. Stake them at proper depth and use fixtures with weighted bases or in-ground installation options.

**Snow** — path light heights need to account for snow accumulation. A fixture that's 12 inches high in September may be buried in February. Low-profile mushroom path lights often disappear in snow. Consider slightly taller fixtures in exposed areas.`,
      },
      {
        title: "Designing for Colorado's Water Restrictions",
        slug: "designing-for-water-restrictions",
        excerpt: "Colorado water restrictions aren't going away. Design your landscape to thrive within them rather than fight against them.",
        coverImage: img("1558618047-6e3b4b1ae965"),
        featured: false,
        sortOrder: 7,
        content: `## Water Is the Constraint in Colorado Landscaping

Every Northern Colorado municipality operates water restriction programs — some permanent, some triggered by drought conditions. Erie, Longmont, Boulder, and surrounding communities all have regulations limiting irrigation frequency, time of day, and in drought years, total water allotments.

Designing a landscape that works within these restrictions isn't a compromise. It's the only approach that produces a property that looks good year-round without constant intervention.

![Xeriscape landscape designed for Colorado water restrictions](https://images.unsplash.com/photo-1558618047-6e3b4b1ae965?auto=format&fit=crop&w=900&q=80)

### Know Your Local Rules Before You Design

Most Front Range municipalities have adopted odd/even or day-of-week watering schedules, along with time-of-day restrictions (no watering between 10 AM and 6 PM during summer). Some have permanent restrictions on turf installation on new residential lots, and several limit turf to a percentage of the total landscaped area.

Before planning a new landscape, check with your municipality's water utility. Rules change, and designing against last year's restrictions may put you out of compliance.

### Turf Area Is the Main Variable

Turf is the single highest-water-use element in most residential landscapes. Kentucky bluegrass needs 1–1.5 inches of water per week in summer — far more than any planted bed.

**Design strategies:**
- Reduce turf to areas where it's actually used (play areas, pet areas, main lawn)
- Replace non-functional turf strips along streets and between sidewalk and fence with xeriscape
- Use buffalograss or blue grama for low-traffic lawn areas that don't need the density of bluegrass

### The Xeriscape Approach

Xeriscape doesn't mean rocks and cactus. It means water-efficient landscaping designed to thrive in your climate with minimal supplemental irrigation. In Northern Colorado, a well-designed xeriscape includes:

- Native and regionally adapted plants in beds
- 3–4 inches of organic mulch to suppress weeds and retain moisture
- Drip irrigation on plants (far more efficient than spray)
- Decomposed granite or rock in accent areas
- Turf limited to functional zones

> **Pro Tip:** Many Northern Colorado municipalities offer rebates for removing turf and replacing with xeriscape. Erie, Boulder, and Longmont have all run cash-back programs for water-efficient conversions. Check before you start — the rebate can offset a significant portion of project cost.

### Smart Controllers Pay for Themselves

A weather-based smart controller adjusts watering schedules based on ET (evapotranspiration) data — essentially, how much water the plants are using based on temperature, wind, humidity, and solar radiation. On a well-programmed smart controller, most homeowners see 20–40% water reduction compared to a traditional time-clock controller running the same schedule all summer.`,
      },
    ],
  },
  {
    name: "Fencing",
    slug: "fencing",
    description: "Material selection, installation standards, and maintenance for fences that hold up to Colorado's climate.",
    sortOrder: 3,
    articles: [
      {
        title: "How Deep to Set Fence Posts in Northern Colorado",
        slug: "fence-post-depth-colorado",
        excerpt: "Under-set fence posts are the number one cause of fence failure in Colorado. Here's the correct depth — and why it matters.",
        coverImage: img("1570129477492-61a28b2f9e3f"),
        featured: true,
        sortOrder: 1,
        content: `## Frost Depth Is the Rule, Not the Guideline

Fence posts in Northern Colorado need to extend below the frost line to prevent heaving. The frost depth along the Front Range is approximately 36 inches. Posts set shallower than this will heave during freeze-thaw cycles — tilting, loosening, and eventually failing.

![Cedar privacy fence installed with proper post depth](https://images.unsplash.com/photo-1570129477492-61a28b2f9e3f?auto=format&fit=crop&w=900&q=80)

### The 1/3 Rule

Beyond frost depth, the standard structural rule for fence posts is that the below-ground portion should equal at least 1/3 of the total post length. For a 6-foot fence with 8-foot posts:

- Total post: 8 feet
- Above ground: 6 feet
- Below ground: 2 feet (minimum 1/3 of 8 feet)

But 24 inches is less than Colorado's 36-inch frost depth — so the frost depth requirement governs. You need 36 inches of post in the ground, which means an 8-foot post will only give you 60 inches (5 feet) above grade. For a 6-foot fence, use 10-foot posts.

> **Pro Tip:** For a 6-foot fence with proper depth: use 10-foot posts, set 42 inches deep. The extra 6 inches below frost provides buffer for frost heave and gives you a clean 6-foot fence height above grade.

[VIDEO:vi43zkprxpk]

### Hole Diameter

Hole diameter should be 3 times the post width. For a 4x4 post, dig a 12-inch diameter hole. This ensures enough concrete mass around the post to resist lateral loads (wind and fence weight).

In rocky or very hard clay, you may need a rented power auger. Hand-digging 42-inch holes through clay is difficult — augering is worth the equipment cost.

### Concrete Mix and Technique

**Fast-setting concrete** (like Quikrete Fast-Setting) is the standard for fence posts. Pour dry mix into the hole, add water, done. Sets in 20–40 minutes.

**Critical technique:** The concrete should slope away from the post at the surface to direct water away from the wood. Water pooling at the post base is the fastest way to rot a pressure-treated post — even treated wood degrades when water sits against it persistently.

### Post Material Matters

For Colorado fence posts, use **pressure-treated lumber rated for ground contact** — look for UC4B or UC4C treatment rating. Standard UC3 treatment (above-ground exposure only) is not rated for direct burial and will fail in 5–10 years in our soil conditions.`,
      },
      {
        title: "Cedar vs. Vinyl vs. Metal: Choosing the Right Fence for Colorado",
        slug: "cedar-vinyl-metal-fence-colorado",
        excerpt: "Each material handles Colorado's freeze-thaw cycles, UV, and wind differently. Here's the honest comparison.",
        coverImage: img("1544984243-ec14f12dd8aa"),
        featured: false,
        sortOrder: 2,
        content: `## The Colorado Climate Challenge for Fence Materials

Colorado's combination of intense UV at elevation, wide temperature swings, freeze-thaw cycling, and persistent wind is genuinely hard on fence materials. What lasts 30 years in the Southeast or Pacific Northwest may fail in 15 years here without the right material selection and installation.

![Vinyl fence in a Northern Colorado neighborhood](https://images.unsplash.com/photo-1544984243-ec14f12dd8aa?auto=format&fit=crop&w=900&q=80)

### Cedar

**Best for:** Traditional privacy fencing, properties where HOA allows, homeowners who want a natural look.

Cedar's natural oils resist rot and insect damage without chemical treatment. A properly maintained cedar fence should last 15–20 years in Colorado conditions.

**Colorado-specific issues:** UV fades cedar rapidly — an untreated cedar fence goes from warm honey-brown to silver-gray in 12–18 months. Annual or bi-annual application of penetrating stain or sealer maintains the color and extends lifespan significantly. Stain, not paint — paint traps moisture and eventually peels.

**Hardware matters:** Cedar with galvanized or stainless steel fasteners lasts. Cedar with standard zinc-coated screws will show rust streaking within 2–3 years at Colorado's UV exposure. Specify hot-dipped galvanized or stainless throughout.

### Vinyl

**Best for:** HOA applications requiring uniformity, homeowners who want zero maintenance, properties near irrigation or high moisture.

Vinyl doesn't rot, doesn't need staining, and holds its color well. Modern vinyl formulations include UV inhibitors specifically designed for high-altitude applications.

**Colorado-specific issues:** Vinyl becomes brittle at very low temperatures — below -15°F, impacts can crack vinyl pickets and rails. This is uncommon along the Front Range but happens. Also, vinyl expands and contracts significantly with temperature changes. Poor installation that doesn't account for expansion gaps will cause warping and stress fractures at post connections.

> **Pro Tip:** For HOA applications, vinyl's uniformity is its biggest advantage. Every section looks identical regardless of when it was installed or which crew installed it. That consistency matters when you're maintaining 200 identical fence sections across a community.

### Ornamental Iron and Steel

**Best for:** Entry gates, accent fencing, properties where security and appearance both matter.

Steel and aluminum fencing is the most durable option and handles Colorado's climate without material degradation. Powder-coated finishes hold color and resist rust for 20+ years with minimal care.

**Colorado-specific issues:** The finish, not the metal, is what fails. Chips and scratches in powder coating expose bare metal to moisture and rust. Touch up any damage promptly. Annual inspection for coating damage is the only maintenance required.`,
      },
      {
        title: "The Complete Guide to HOA Fence Approvals in Boulder County",
        slug: "hoa-fence-approval-boulder",
        excerpt: "HOA fence approval and building permits are separate processes. Skipping either creates problems. Here's how to navigate both.",
        coverImage: img("1503614472-8c253e53fca9"),
        featured: false,
        sortOrder: 3,
        content: `## Two Separate Approval Processes

Replacing or installing a new fence in most Northern Colorado communities requires two separate approvals: your HOA's architectural review and a municipal building permit. These are independent processes, and your HOA approval doesn't grant you permit approval, or vice versa.

![Ornamental fence at a Colorado property entry](https://images.unsplash.com/photo-1503614472-8c253e53fca9?auto=format&fit=crop&w=900&q=80)

### Step 1: Check HOA CC&Rs First

Your HOA's Covenants, Conditions & Restrictions (CC&Rs) specify allowed fence types, heights, materials, colors, and placement. Common restrictions along the Front Range:

- Maximum height (typically 6 feet for privacy, 4 feet for front yards)
- Allowed materials (many HOAs prohibit chain link for residential applications)
- Color requirements (natural cedar, white vinyl, or black iron are most common)
- Setback from property lines and sidewalks
- Requirement to return posts and rails to the interior of the property

Read the CC&Rs before designing anything. Designing to your preference and then submitting for approval often leads to rejection and redesign.

### Step 2: Submit to Architectural Review Committee

HOA ARCs typically require:
- Plot plan showing fence location on the property
- Material and color specification
- Height dimensions
- Photos of similar approved fences in the community (optional but helpful)

ARC response times vary from 2 weeks to 60 days depending on the HOA. Build this into your project timeline — don't order materials or schedule installation until you have written approval in hand.

> **Pro Tip:** Call the HOA management company before submitting. Many have informal pre-review processes where you can get feedback on your design before formal submission. This catches problems early and speeds approval.

### Step 3: Building Permit (Most Municipalities)

Erie, Longmont, Boulder, Lafayette, Louisville, and most surrounding municipalities require a building permit for new fence construction. Typical permit requirements:

- Site plan showing property lines and fence location
- Fence height and material specification
- Proof of HOA approval (required by some municipalities)

Permit fees are modest (typically $50–$200 for residential fencing), and inspections are usually a single visual inspection after installation. The main cost of skipping permits is disclosure requirements at sale — unpermitted structures must be disclosed to buyers.

### Property Line Verification

Before any post is set, verify property lines. Survey pins are often buried or missing. Encroaching on a neighbor's property with a fence creates serious legal problems. If you're not certain where the line is, hire a surveyor before installation.`,
      },
      {
        title: "Fence Maintenance in Colorado: What Actually Needs Doing Each Year",
        slug: "annual-fence-maintenance-colorado",
        excerpt: "Colorado's UV, wind, and temperature swings break down fences faster than most climates. Here's the annual maintenance that prevents early replacement.",
        coverImage: img("1570129477492-61a28b2f9e3f"),
        featured: false,
        sortOrder: 4,
        content: `## Annual Inspection Is the Core Task

The majority of fence failures in Colorado are preventable. A loose post that gets caught early can be reset; left alone, the loosening accelerates as the fence shifts, loads transfer to adjacent posts, and what was a $150 repair becomes a $2,000 section replacement.

![Cedar fence requiring annual maintenance inspection](https://images.unsplash.com/photo-1570129477492-61a28b2f9e3f?auto=format&fit=crop&w=900&q=80)

### Spring Inspection Checklist

Walk your fence every spring as snow melts. Look for:

**Posts**
- Push on each post. Any movement is a red flag — posts should be rock solid.
- Check for rot at the base. Probe with a screwdriver; soft wood means rot has started.
- Look for concrete that has heaved, cracked, or separated from the post.

**Rails and Pickets**
- Check for cracked or split wood (common after a hard winter)
- Look for pickets that have loosened from rails — wind loading does this over winter
- Check for boards that have warped away from the fence plane

**Hardware**
- Rust streaking means fasteners are failing
- Loose screws and nails that have worked free
- Gate hardware: check hinges for sag and latches for misalignment

### Wood Fence: Staining and Sealing

Cedar and pine fences without a finish coating degrade rapidly under Colorado's UV exposure. The maintenance schedule:

- **Year 1–2 after installation:** First stain application once the wood has dried and cured (new pressure-treated wood needs 6 months to dry before stain absorbs well)
- **Every 2–3 years after:** Re-application of penetrating oil-based stain or sealer

> **Pro Tip:** Use a penetrating stain, not a film-forming product. Penetrating stains soak into the wood and don't peel. Film-forming products (including most paints) eventually peel and require stripping before reapplication.

### Vinyl Fence: Less Maintenance, Not No Maintenance

Vinyl doesn't rot or need staining, but it does need cleaning. Mold, mildew, and hard water deposits accumulate on vinyl surfaces — especially on north-facing fence sections. Annual soft washing with a mild bleach solution removes biological growth before it stains.

Check expansion joints annually. Colorado's temperature swings cause vinyl to expand in summer and contract in winter. If expansion gaps have closed due to settling or improper installation, sections will buckle.

### Gate Maintenance

Gates take the most abuse and need the most attention. Check:
- Hinge bolts for tightness (tighten every spring without fail)
- Gate sag — a gate that drags on the ground will fail its latch hardware
- Latch strike plate alignment
- Self-closing mechanisms if present`,
      },
      {
        title: "How to Repair a Leaning Fence Post Without Replacing It",
        slug: "repair-leaning-fence-post",
        excerpt: "A leaning post doesn't always mean a new post. Here's how to diagnose and fix post problems before they spread.",
        coverImage: img("1570129477492-61a28b2f9e3f"),
        featured: false,
        sortOrder: 5,
        content: `## Diagnose Before You Dig

A leaning fence post has one of four causes, and the repair is different for each. Digging before diagnosing is how you turn a 2-hour repair into a full day of work.

![Leaning fence post in need of repair](https://images.unsplash.com/photo-1570129477492-61a28b2f9e3f?auto=format&fit=crop&w=900&q=80)

### Cause 1: Frost Heave

**Signs:** Post is leaning or raised. Happens after winter, may push back down partially in summer. Concrete footing may be partially above grade.

**Fix:** If the footing is still intact and the post is not rotted, this is a push-back and re-anchor repair. Straighten the post, drill and pin it back to the footing, fill any gaps with hydraulic cement, and address drainage near the base to prevent recurrence.

**Prevention:** Ensure the footing extends below frost depth (36 inches in Northern Colorado). Tapered concrete footings that are wider at the bottom resist heave better than straight-sided footings.

### Cause 2: Footing Failure

**Signs:** Post is leaning because the concrete cracked or the post has pulled free from the footing. Rocking the post shows the problem is at the base.

**Fix:** Remove the post, excavate, pour a new footing, reset and plumb the post. If the post itself is in good condition, this is a straightforward repair. Use fast-setting concrete for the new footing.

### Cause 3: Post Rot

**Signs:** Post is soft at or just below grade level. Probing with a screwdriver shows punky, soft wood. Post may snap if pushed hard.

**Fix:** This requires a new post. The rotted section cannot be reinforced. Full post replacement — remove old post, clean footing, reset with new ground-contact-rated pressure-treated post.

> **Pro Tip:** If you're replacing one rotted post in an older fence, inspect the bases of all other posts. Post rot tends to happen at similar ages across a fence run, especially if all posts were set at the same time with the same material. Replace proactively rather than reactively.

### Cause 4: Wind Damage

**Signs:** Post is leaning in a consistent direction across a section of fence after a wind event. Fence is otherwise structurally sound.

**Fix:** If posts are still structurally sound, this is often a brace-and-anchor repair. Metal post anchors installed at grade, supplemented with additional concrete, can stabilize wind-loaded posts without full replacement.

### The Brace-and-Block Method

For posts with minor lean where the footing is intact:

1. Rent or borrow a come-along to pull the fence back to plumb
2. Brace temporarily with 2x4 stakes driven at an angle
3. Mix and pour additional concrete around the base
4. Allow to cure 24 hours before removing bracing`,
      },
    ],
  },
  {
    name: "Property Maintenance",
    slug: "property-maintenance",
    description: "Practical guides for maintaining residential and commercial properties in Northern Colorado.",
    sortOrder: 4,
    articles: [
      {
        title: "Pressure Washing vs. Soft Washing: When to Use Each",
        slug: "pressure-vs-soft-wash",
        excerpt: "High pressure cleans some surfaces and destroys others. Here's the correct technique for every exterior surface.",
        coverImage: img("1599686102-9a4af6b85e49"),
        featured: true,
        sortOrder: 1,
        content: `## Pressure Is Not the Point — Results Are

The most common misconception in exterior cleaning is that more pressure equals better cleaning. It doesn't. The right cleaning method depends on the surface material, the type of contamination, and what a damaged surface would cost to repair or replace.

![Professional power washing on a Colorado property](https://images.unsplash.com/photo-1599686102-9a4af6b85e49?auto=format&fit=crop&w=900&q=80)

### What Is Soft Washing?

Soft washing uses low pressure (under 500 PSI) combined with cleaning solutions — typically sodium hypochlorite (bleach) at appropriate dilution plus a surfactant — to kill and remove biological contamination. The chemistry does the work; the water rinses it away.

Soft washing is the correct approach for:
- Painted or stained wood siding
- Vinyl siding
- Stucco and EIFS
- Roofing (shingles and tile)
- Fences and decks

High-pressure washing on these surfaces erodes the surface, drives moisture into seams, strips paint and stain, and can void roofing warranties.

### When Pressure Washing Is Appropriate

High-pressure washing (1,500–4,000 PSI depending on application) is appropriate for hard, durable surfaces:

- **Concrete driveways and sidewalks** — 2,500–3,500 PSI with a rotating surface cleaner
- **Brick and block** — 1,500–2,500 PSI with a fan tip at appropriate distance
- **Concrete patios** — same as driveways
- **Aggregate concrete** — lower pressure to avoid dislodging aggregate

> **Pro Tip:** Even on concrete, maintain 12–18 inches of standoff distance with a surface cleaner. Getting too close with a zero-degree or rotating nozzle etches concrete permanently. The etching looks like cleaning lines and is irreversible.

### The Colorado-Specific Issue

At Front Range elevation, UV degradation is faster than at lower elevations. Siding, painted surfaces, and wood finishes are already under more UV stress here than in most of the country. Aggressive pressure washing on already-stressed surfaces causes more damage than at lower altitudes.

This is especially true for wood decks. A deck that's been UV-baked through three Colorado summers without resealing has brittle surface fibers that high pressure will shred. Soft washing first with a wood cleaner, then applying deck brightener, then sealing is the correct approach — not blasting.

### Surface-by-Surface Guide

| Surface | Method | PSI Range |
|---|---|---|
| Painted wood siding | Soft wash | 200–500 |
| Vinyl siding | Soft wash | 500–1,000 |
| Concrete driveway | Pressure | 2,500–3,500 |
| Wood deck | Soft wash + rinse | 500–1,000 |
| Roof shingles | Soft wash only | Under 300 |
| Brick | Pressure | 1,500–2,000 |
| Stucco | Soft wash | 500 max |`,
      },
      {
        title: "How to Winterize Your Irrigation System in Colorado",
        slug: "winterize-irrigation-colorado",
        excerpt: "Water left in irrigation lines freezes, expands, and breaks pipes and heads. Here's how to blow out your system correctly before winter.",
        coverImage: img("1416879595882-3373a0480b5b"),
        featured: false,
        sortOrder: 2,
        content: `## Why Winterization Is Non-Negotiable in Colorado

Along the Front Range, overnight temperatures can drop below freezing from mid-September through late May. Water left in irrigation lines, valve boxes, and backflow preventers will freeze, expand, and crack pipes, split heads, and destroy backflow preventers that cost $150–$400 to replace.

A professional winterization typically costs $75–$150 and takes 30–45 minutes. A broken backflow preventer, cracked poly pipe, or split lateral lines can cost $500–$2,000+ to repair in spring.

![Irrigation system being winterized before Colorado winter](https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80)

### The Three Winterization Methods

**Manual Drain** — works only if your system was designed with manual drain valves at the lowest points. Open valves and gravity drains the lines. Not suitable for systems without proper drain valve placement.

**Automatic Drain** — systems with automatic drain valves that open when pressure drops. Still requires blowing out backflow preventers and valve boxes separately.

**Air Blow-Out** — the most complete method. Compressed air pushes water out of every zone, head, and fitting. This is the correct approach for most Northern Colorado residential systems.

### Air Compressor Requirements

A household air compressor (the 6-gallon shop compressor in your garage) does not have sufficient volume to blow out an irrigation system. You need:

- **Minimum CFM:** 20–25 cubic feet per minute for residential systems
- **PSI setting:** 50 PSI maximum for polyethylene pipe (most residential), 80 PSI maximum for PVC

Rent a 185 CFM towable compressor from any equipment rental company for $150–$250 per day, or hire an irrigation contractor who brings their own equipment.

### Zone-by-Zone Blow-Out Process

1. Shut off the water supply to the irrigation system at the main shutoff
2. Disable the automatic controller (set to "rain" mode or off)
3. Connect the air compressor to the system's blow-out port or quick coupler
4. Activate Zone 1 at the controller
5. Slowly open the compressor valve — watch for heads to pop up and begin discharging water
6. Run each zone until only mist comes from the heads (approximately 2 minutes)
7. Repeat each zone 2–3 times for thorough removal
8. Never run compressed air through a zone with no heads activated — no outlet means pressure spike

> **Pro Tip:** Work from the zone furthest from the compressor to the zone closest. This ensures you're not pushing moisture back toward zones you've already cleared.

### After the Blow-Out

- Leave backflow preventer isolation valves at 45 degrees (half open) through winter
- Open test cocks on the backflow preventer
- Insulate exposed backflow preventers and valve boxes with foam insulation wrap
- Program the controller to the "off" or "winter" setting`,
      },
      {
        title: "Spring Property Checklist for Northern Colorado Homeowners",
        slug: "spring-property-checklist",
        excerpt: "Colorado winters are hard on properties. Here's everything to inspect and address before the growing season starts.",
        coverImage: img("1558618666-fcd25c85cd64"),
        featured: false,
        sortOrder: 3,
        content: `## March Through May Is Setup Season

What you do in spring determines how your property performs for the rest of the year. A thorough spring inspection and early action on issues — irrigation startup, lawn prep, fence and structure inspection — prevents small problems from becoming expensive summer repairs.

![Northern Colorado property in spring ready for the season](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80)

### Irrigation Startup (April–May)

Don't rush your spring irrigation startup. Freeze events continue into late April and even early May along the Front Range — a single hard freeze after startup can crack heads and fittings if lines are pressurized and the system wasn't properly drained.

**Startup process:**
- Pressurize the system slowly by cracking the main shutoff rather than opening it fully
- Walk each zone as it runs and check every head for proper pop-up, coverage, and rotation
- Check for broken heads (water shooting sideways), stuck rotors, and heads buried by winter settlement
- Inspect backflow preventer for cracks or damage from winter
- Verify controller programming is set for spring watering frequency

### Lawn Assessment

Before fertilizing or treating, assess what came through winter:
- **Winter kill** — areas that didn't survive. Common on poorly drained slopes and areas where water pooled under snow.
- **Snow mold** — grayish matted areas, common after heavy snow cover. Usually grows out as temperatures warm; severe cases may need raking to break up the mat.
- **Bare spots** — from foot traffic, animal damage, or disease. Flag these for fall overseeding or spring spot repair.

Apply pre-emergent crabgrass control in March–April when soil temperatures reach 50°F consistently. Timing is critical — too early and it breaks down before crabgrass germinates; too late and it's ineffective.

### Fence and Structure Inspection

- Push on every fence post. Movement means the post needs attention before summer wind loads it.
- Check gate hardware for sag and misalignment after winter settling
- Inspect deck ledger board connection to house for moisture damage
- Look for heaved or cracked concrete around post bases

### Tree and Shrub Assessment

Colorado's late spring snowstorms (April–May) are heavy and wet — they break branches on trees that have already leafed out. Walk all trees after the last significant snowstorm and assess for:
- Broken or hanging branches (prune immediately — they fall unpredictably)
- Cracks in main branch unions
- Winter dieback on evergreens (dead brown needles that don't shed)

> **Pro Tip:** Don't rush to prune spring-blooming shrubs (lilac, forsythia, viburnum) until after they bloom. You'll cut off this year's flowers if you prune in early spring before bloom.`,
      },
      {
        title: "Fall Property Checklist for Northern Colorado Homeowners",
        slug: "fall-property-checklist",
        excerpt: "What you do in fall determines how well your property comes through winter. Here's the full checklist.",
        coverImage: img("1571954411453-2fc3f4f8c26d"),
        featured: false,
        sortOrder: 4,
        content: `## September Through November Is Protection Season

Fall is the most important maintenance season for Northern Colorado properties. The decisions and tasks you complete in fall determine how your lawn, plants, irrigation, and structures survive the winter — and what shape they're in when spring arrives.

![Northern Colorado property prepared for fall and winter](https://images.unsplash.com/photo-1571954411453-2fc3f4f8c26d?auto=format&fit=crop&w=900&q=80)

### Lawn — September Through October

**Aeration and overseeding** — the single highest-ROI fall task. Core aeration breaks compaction, overseeding fills thin areas, and the fall temperature window supports germination. Target late August to mid-September for seed, up to October 1 in most years.

**Winterizer fertilizer** — apply in October after the lawn has slowed growth but before hard freeze. High-potassium, low-nitrogen formulation. This is the application most homeowners skip and most strongly affects spring green-up.

**Final mowing** — mow to 2.5–3 inches for the last cut of the season. Not shorter. A slightly taller final height protects crowns from temperature stress and reduces snow mold risk.

**Leaf removal** — matted leaves left over winter create snow mold and suffocate turf. Remove leaves before heavy snow begins, typically by late October along the Front Range.

### Irrigation Winterization — September 15 Through October 15

This is the most time-sensitive fall task. Book irrigation winterization early — contractors fill up in September and early October. After a hard freeze, it may be too late to prevent damage.

Winterize before the first forecast overnight low below 32°F if possible. Earlier is always better.

### Trees and Shrubs

**Deep root watering** — drought-stressed trees and shrubs going into winter are more susceptible to winter kill. If fall has been dry, water deeply in October before the ground freezes.

**Mulch — apply or refresh** — 3–4 inches of organic mulch around trees and in beds insulates roots, retains moisture, and moderates soil temperature through freeze-thaw cycles. Keep mulch away from direct contact with tree trunks.

**Anti-desiccant spray** — broadleaf evergreens (boxwood, holly, some junipers) lose moisture through their leaves in winter when roots can't absorb replacement moisture from frozen soil. An anti-desiccant spray applied in November helps prevent winter burn.

> **Pro Tip:** Don't prune trees and shrubs in fall unless you're removing damaged or hazardous material. Fall pruning stimulates new growth that is vulnerable to early freeze damage. Major pruning belongs in late winter (February–March) before bud break.

### Hardscape

- Seal concrete driveways and walks if not done in the last 2–3 years. Sealer prevents freeze-thaw moisture penetration that cracks concrete.
- Clean and store outdoor furniture before extended freezing begins.
- Drain and coil hoses. Hose bibs with shutoffs should be shut off and drained.`,
      },
      {
        title: "How to Clean a Concrete Driveway and Remove Oil Stains",
        slug: "clean-concrete-driveway",
        excerpt: "Pressure washing alone won't remove oil stains. Here's the correct process for both surface cleaning and stain removal.",
        coverImage: img("1599686102-9a4af6b85e49"),
        featured: false,
        sortOrder: 5,
        content: `## Surface Cleaning vs. Stain Removal Are Different Tasks

A dirty concrete driveway has two types of problems that need different approaches. General surface soiling — dirt, algae, organic staining — responds to pressure washing. Oil and fuel stains require chemical pretreatment before any pressure washing.

![Concrete driveway cleaning and oil stain removal](https://images.unsplash.com/photo-1599686102-9a4af6b85e49?auto=format&fit=crop&w=900&q=80)

### For General Surface Cleaning

A rotary surface cleaner attachment on a 2,500–3,000 PSI pressure washer is the correct tool for general concrete cleaning. The spinning nozzle applies even pressure across the surface and avoids the streaking that results from sweeping a single wand tip across concrete.

**Process:**
1. Pre-wet the surface
2. Apply concrete cleaner or degreaser, allow 5–10 minutes dwell time
3. Clean with surface cleaner at 2,500–3,000 PSI
4. Rinse thoroughly, ensuring all cleaner residue is removed before it dries

### For Oil Stains

Motor oil, hydraulic fluid, and fuel stains penetrate concrete quickly and cannot be removed by pressure alone. Mechanical action just redistributes the surface layer.

**Fresh stains (under 24 hours):**
- Absorb excess oil immediately with cat litter, sawdust, or commercial absorbent
- Apply liquid dish soap or commercial degreaser directly to the stain
- Scrub with a stiff brush
- Let dwell 15–30 minutes
- Rinse and repeat

**Set stains (days to years old):**
- Apply a commercial concrete degreaser (TSP, Purple Power, or purpose-made concrete cleaner)
- Let dwell 20–30 minutes, keeping the area wet
- Agitate with a stiff brush
- Pressure wash at 3,000+ PSI with hot water if available (hot water breaks down petroleum significantly better than cold)
- Repeat 2–3 times for heavy staining

> **Pro Tip:** For severe set-in stains, apply a paste of baking soda and dish soap after degreasing, cover with plastic overnight, then scrub and rinse in the morning. The overnight dwell time dramatically improves penetration and stain lift.

### What Won't Work

- Standard residential pressure washers (under 2,000 PSI) won't remove significant oil staining
- Cold water alone won't break down petroleum
- Single-application treatments rarely remove staining that's more than a few weeks old

### After Cleaning: Seal the Concrete

A penetrating concrete sealer applied after cleaning prevents future staining by filling the pores that absorb oil and contaminants. On a properly sealed driveway, fresh oil sits on the surface for 30–60 minutes without penetrating — giving you time to blot and clean it before it stains.`,
      },
      {
        title: "Gutter Maintenance: What Northern Colorado Homeowners Should Know",
        slug: "gutter-maintenance-colorado",
        excerpt: "Clogged gutters cause foundation damage, fascia rot, and landscape erosion. Here's what to clean, when, and what to look for.",
        coverImage: img("1560185893-a55b8a6f7e89"),
        featured: false,
        sortOrder: 6,
        content: `## Gutters Protect More Than You Think

Gutters aren't just about keeping water off your head when you leave the house. They protect your foundation from saturated soil, your fascia boards from moisture rot, your siding from splash-back contamination, and your landscape from erosion at the drip line. A $100 annual cleaning prevents problems that can cost thousands to fix.

![Northern Colorado home with well-maintained gutters](https://images.unsplash.com/photo-1560185893-a55b8a6f7e89?auto=format&fit=crop&w=900&q=80)

### The Northern Colorado Gutter Calendar

**Spring (April–May):** Clean out debris from winter storms and spring cottonwood. Cottonwood bloom in late May is the biggest single gutter-clogging event of the year — plan a cleaning for early June after cottonwood season ends.

**Fall (October–November):** After leaf fall but before first hard freeze. Clogged gutters retain moisture that freezes and creates ice dams, which force water under shingles and into roof structures.

**After major storms:** Any storm that drops significant debris (Front Range wind events, hail, late spring snowstorms) warrants a check even if you've recently cleaned.

### What to Look for During Cleaning

Beyond removing debris, a proper gutter inspection includes:

**Sag and slope** — gutters should slope toward downspouts at 1/4 inch per 10 feet. Visible sags mean hangers have failed. Gutters that hold standing water after cleaning are either improperly sloped or sagging.

**Seam separation** — sections of traditional sectional gutters are sealed at joints. Separated seams drip along the fascia and behind the gutter, exactly where you don't want water going.

**Downspout function** — flush downspouts from the top with a garden hose to confirm they're flowing freely. A blocked downspout is as bad as a clogged gutter.

**Extension direction** — downspout extensions should terminate at least 4 feet from the foundation and direct water away from the house and into a grade that continues moving water away.

> **Pro Tip:** If your gutters are full of fine granules (from asphalt shingles) rather than leaf debris, your roof is in the late stages of its life cycle. Asphalt granule loss accelerates as shingles age. A roofing inspection is warranted.

### Gutter Guards — Worth It?

Gutter guards reduce cleaning frequency but rarely eliminate it. The best guards keep out large debris but still accumulate small debris, cottonwood seeds, and shingle granules that require periodic cleaning. They also add to the gutter system's load capacity — old hangers plus a guard system plus debris plus ice can exceed design loads.

In Northern Colorado, where cottonwood season is brief and heavy, a quality micromesh guard can reduce annual cleanings from 2–3 per year to every 2–3 years for properties with significant tree coverage.`,
      },
    ],
  },
  {
    name: "HOA & Commercial",
    slug: "hoa-commercial",
    description: "Guides for HOA boards and commercial property managers working with landscape and maintenance contractors.",
    sortOrder: 5,
    articles: [
      {
        title: "Working With an HOA Grounds Maintenance Contractor: What to Expect",
        slug: "hoa-grounds-maintenance-contractor",
        excerpt: "What a good HOA maintenance contract looks like, what to ask before signing, and how to evaluate performance.",
        coverImage: img("1560518883-ce09059eeffa"),
        featured: false,
        sortOrder: 1,
        content: `## The HOA Maintenance Relationship Is Different

HOA grounds maintenance isn't the same as residential lawn care. The scale is larger, the documentation requirements are more formal, the stakeholders are more numerous, and the consequences of service failures are more public. A well-structured contractor relationship starts before the contract is signed.

![Well-maintained HOA community common areas](https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80)

### What a Scope of Work Should Include

Before soliciting bids, develop a clear scope of work that specifies:

- **Frequency** — exactly how often each service is performed (weekly mow, bi-weekly edging, monthly fertilization, etc.)
- **Service standards** — what "mowed" means (height, clipping management, blow-down requirements)
- **Included areas** — which common areas, entrances, and amenity zones are covered
- **Excluded areas** — individual lot maintenance, private courtyards, etc.
- **Seasonal services** — spring and fall clean-ups, pre-emergent timing, aeration schedule
- **Communication requirements** — how and when the contractor reports issues

Vague scopes lead to disputes. A contractor who wins a bid on a vague scope will interpret ambiguities in their favor; a board that didn't specify will argue they were entitled to more.

### Questions to Ask Before Signing

- Who specifically will be on-site each week? (Key person, not just "our team")
- What happens when the scheduled crew can't make it?
- How do you document completed service visits?
- What's your escalation process for equipment damage or service complaints?
- Can you provide references from HOAs of similar scale?

> **Pro Tip:** Ask for a service report template before signing. A contractor who provides consistent written service documentation — including date, crew, services performed, and any issues noted — is demonstrating that they manage work professionally, not just show up and mow.

### Evaluating Performance

Set performance standards in the contract, not in verbal conversations. Common measurable standards:

- Response time for service issue complaints (24 hours, 48 hours, etc.)
- Service completion window (completed by noon Friday each week, etc.)
- Issue reporting requirements (board notification within 24 hours of any noted damage or hazard)

Walk the property with the contractor at 60, 90, and 180 days after contract start. This signals that you're paying attention and creates a regular forum for adjustments before small issues become larger disputes.`,
      },
      {
        title: "Common Area Landscaping Standards for Northern Colorado HOAs",
        slug: "hoa-landscaping-standards",
        excerpt: "What Front Range HOA common areas need to maintain appearance, compliance, and long-term property values.",
        coverImage: img("1560518883-ce09059eeffa"),
        featured: false,
        sortOrder: 2,
        content: `## Common Areas Set the First Impression

Potential homebuyers form opinions about an HOA community in the first 30 seconds of driving through the entrance. The common area landscape — entrance features, mailbox clusters, detention ponds, and parkway strips — communicates whether the community is well-managed or declining.

![HOA community with well-maintained common area landscaping](https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80)

### Turf Standards

Common area turf along the Front Range should be maintained at:
- **Mowing height:** 3–3.5 inches (Kentucky bluegrass) during growing season
- **Edge definition:** Hard edges re-cut or chemically edged along all walks, curbs, and bed borders at least monthly
- **Weed control:** Pre-emergent applied in March–April, spot-treated post-emergent through the season
- **Fertilization:** Minimum 3 applications — late spring, late summer, and fall winterizer

Turf that's mowed too short shows drought stress earlier, has worse weed pressure, and looks worn compared to well-managed neighboring properties.

### Landscape Bed Standards

Common area beds need:
- **Mulch depth:** Maintained at 3 inches. Fresh mulch refreshed annually or bi-annually.
- **Weed management:** Zero tolerance for weeds at entrances and feature areas; monthly attention to secondary areas
- **Plant replacement:** Dead or damaged plants replaced within 30 days
- **Seasonal color:** Annual color installation at entrances maintains visual interest and signals active management

> **Pro Tip:** Build a plant replacement budget into your annual reserve study. Landscape plants have finite lifespans, and communities that don't budget for replacement end up with aging, failing plant material that looks neglected rather than mature.

### Detention Pond and Drainage Management

Most Northern Colorado HOA communities have detention ponds or drainage swales. These are often the least-attended landscape features and become eyesores quickly.

Minimum maintenance standards:
- Grass in detention areas mowed and maintained (steep slopes excluded from standard mowing may need string trimming)
- Inlet and outlet structures kept clear of debris
- No woody vegetation allowed to establish within 10 feet of pond embankments (root systems compromise embankment integrity)
- Shoreline vegetation managed to prevent erosion and maintain proper drainage function`,
      },
      {
        title: "How to Document Property Maintenance for HOA Board Reporting",
        slug: "document-maintenance-hoa-board",
        excerpt: "Good documentation protects the board, supports reserve studies, and makes contractor management straightforward.",
        coverImage: img("1486325212027-8081e485255e"),
        featured: false,
        sortOrder: 3,
        content: `## Documentation Is Risk Management

HOA boards carry fiduciary responsibility for community assets. When a homeowner complains that the grounds haven't been maintained, when a contractor disputes what services were performed, or when an insurance claim requires evidence of maintenance history — documentation is the difference between a resolved issue and an expensive dispute.

![Commercial property maintenance documentation and reporting](https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80)

### What a Service Record Should Include

Every grounds maintenance visit should produce a written record containing:
- **Date and time** of service
- **Crew names** (or at minimum, crew lead)
- **Services performed** — specific tasks, not generic "maintenance performed"
- **Areas serviced** — which zones, which common areas
- **Issues identified** — irrigation problems, turf damage, lighting failures, vandalism, or other property conditions observed
- **Photos** — before/after for any remediation work, and baseline photos of problem areas identified

### Recommended Documentation Systems

**Contractor-provided reports** — require this in the contract. Contractors who manage their business professionally already produce service reports. If a contractor can't provide written documentation of what they did on your property, that's a red flag.

**Property management software** — platforms like Buildium, AppFolio, or HOALife have work order and maintenance tracking modules that centralize documentation and make it searchable.

**Shared photo log** — a shared folder (Google Drive, Dropbox) organized by date where contractors upload before/after photos for each service creates a visual maintenance record that's easy to review and share with homeowners who have concerns.

> **Pro Tip:** Keep maintenance records for a minimum of 7 years. Reserve study updates, insurance claims, and litigation can look back years into a community's maintenance history.

### Connecting Documentation to Reserve Studies

Reserve studies estimate the remaining useful life and replacement costs of common area assets. Accurate, detailed maintenance documentation directly informs these estimates. A property that can show consistent fertilization, irrigation maintenance, and aeration records over 10 years will have a different turf replacement timeline than one with no records.

Share documentation summaries with your reserve study preparer at each update cycle. This isn't just paperwork — it's financial planning for the community.`,
      },
    ],
  },
  {
    name: "Seasonal Guides",
    slug: "seasonal-guides",
    description: "Month-by-month guides for property and landscape care throughout Colorado's seasons.",
    sortOrder: 6,
    articles: [
      {
        title: "Your Complete Spring Yard Prep Guide for Northern Colorado",
        slug: "spring-yard-prep-colorado",
        excerpt: "Everything to do from March through May to set up a great lawn and landscape season.",
        coverImage: img("1558618666-fcd25c85cd64"),
        featured: false,
        sortOrder: 1,
        content: `## March: The Assessment Month

Don't touch the lawn in March. Walk it, assess it, plan for it — but let it come out of dormancy on its own schedule. The worst thing you can do in early spring is power-rake or aerate soil that's still frozen two inches down, or apply fertilizer to turf that hasn't woken up yet.

![Northern Colorado property emerging from winter dormancy in spring](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80)

### March Tasks

**✓ Assess winter damage** — walk the entire property and note bare spots, dead areas, and areas with snow mold matting. Document with photos.

**✓ Book irrigation startup** — contractors fill up in April. Schedule your spring startup now.

**✓ Book aeration/overseeding** — if you plan to renovate in fall, get on schedules now. Good contractors book 6–8 weeks out during peak season.

**✓ Check fence posts** — after freeze-thaw, loose posts need to be identified and scheduled for repair before wind season (April–May on the Front Range).

**✓ Order seed** if overseeding in spring — have materials on hand so you're not waiting for a restock.

### April: Start-Up Month

**✓ Irrigation startup** — once overnight lows are consistently above 32°F (usually mid-April along the Front Range). Run each zone, check each head.

**✓ Pre-emergent crabgrass control** — apply when soil temperatures hit 50°F consistently. Soil thermometer or local extension service temperature monitoring guides timing.

**✓ Light spring fertilization** — balanced slow-release once turf is actively growing (not just green, but actively growing). Wait for mowing to be needed before fertilizing.

**✓ Rake snow mold** — in areas with persistent gray matting, gently rake to break up the mat and allow air circulation. Most cases grow out without intervention.

### May: Growth Management Month

> **Pro Tip:** Resist the urge to fertilize heavily in May. Colorado lawns grow aggressively in May–June and don't need pushing. Heavy spring nitrogen leads to excessive thatch buildup that causes problems through summer.

**✓ First mowing** — begin mowing at the correct height for your grass type. Don't take off more than one-third at first mow.

**✓ Spot seed bare areas** — with soil temperatures above 55°F, grass seed germinates. Keep seeded areas moist.

**✓ Bed prep** — clean out beds, remove winter debris, refresh mulch, begin planting annuals after May 15 (last frost date along the Front Range is typically May 7–15 depending on location).

**✓ Late spring fertilization** — around Memorial Day, apply the main spring feed.`,
      },
      {
        title: "Surviving Colorado Summer: Heat, UV, and Your Landscape",
        slug: "colorado-summer-landscape-survival",
        excerpt: "June through August is the hardest season for Front Range landscapes. Here's how to manage through it.",
        coverImage: img("1416879595882-3373a0480b5b"),
        featured: false,
        sortOrder: 2,
        content: `## June Through August Is Survival Season

Colorado summers are beautiful, but they're genuinely hard on landscapes. Intense UV at elevation, low humidity, high temperatures, and water restrictions combine to stress turf and plants in ways that require active management — not just irrigation.

![Colorado landscape managing summer heat and UV stress](https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80)

### The Summer Irrigation Reality

Water restrictions limit when and how much you can irrigate. Most Front Range municipalities prohibit watering between 10 AM and 6 PM — the hottest part of the day — which is actually good practice regardless of restrictions.

**Optimize your irrigation window:**
- Run cycles between 4–7 AM whenever possible
- Allow turf to dry completely between cycles (aids disease prevention)
- Deep, infrequent watering is better than frequent light watering — encourages deeper roots that access cooler, moister soil

### Raise the Mowing Deck

This is repeated advice because it's the most ignored advice. In June, raise your mowing deck to the summer setting and leave it there until September. For bluegrass, that means 3–3.5 inches. For tall fescue, 3.5–4 inches. Do not scalp in summer.

### Accept Dormancy

Kentucky bluegrass goes dormant when soil temperatures exceed 85°F. The lawn turns tan. This is not failure — it's adaptation. Dormant turf is alive; it's protecting itself.

**Dormancy management:**
- Water once per week, deeply, to keep crowns alive even in dormancy
- Do not fertilize dormant turf
- Do not power-rake or aerate dormant turf
- Keep foot traffic minimal

> **Pro Tip:** If you choose to keep the lawn green through summer dormancy pressure, you must commit to consistent deep irrigation throughout. Irregular irrigation that alternates between dormancy and recovery cycles is worse for turf than staying in dormancy.

### Hail Damage

Colorado hail season peaks June–August. Significant hail events — 1 inch or larger — can shred turf and damage plants severely. After a major hail event:

- Avoid foot traffic on damaged turf for 1–2 weeks
- Damaged turf almost always recovers if the crown is intact
- Shrubs with shredded leaves should be observed through summer — don't prune immediately
- Document all damage with photos for insurance purposes

### Late Summer: Eyes on Fall

By August 15, start planning fall renovation. Book aeration, order seed, schedule irrigation winterization. The window between "it's still summer" and "it's too late" is short in Northern Colorado.`,
      },
      {
        title: "Fall Landscape Prep in Northern Colorado: A Week-by-Week Guide",
        slug: "fall-landscape-prep-colorado",
        excerpt: "September and October are the most important months for landscape investment in Colorado. Here's the exact sequence.",
        coverImage: img("1558618047-6e3b4b1ae965"),
        featured: false,
        sortOrder: 3,
        content: `## The September–October Window Is Irreplaceable

No other time of year has the confluence of conditions that makes fall the best maintenance and investment period for Northern Colorado landscapes. Cool air, warm soil, diminishing weed pressure, and adequate moisture combine to make September and October the months that matter most.

![Fall landscape preparation work in Northern Colorado](https://images.unsplash.com/photo-1558618047-6e3b4b1ae965?auto=format&fit=crop&w=900&q=80)

### Labor Day Week — Aeration and Overseeding

If you're going to aerate and overseed, this is the target window. Soil temperatures are still warm enough for germination (55°F+), air temperatures are cooling, and you have 6–8 weeks before first frost.

**Week of Labor Day:**
- Core aerate entire lawn (double pass for compacted soil)
- Overseed at appropriate rate for your grass type
- Apply starter fertilizer
- Begin germination watering schedule (2–3x daily, light cycles, for 14 days)

### Mid-September — Tree and Shrub Care

- Deep root water all trees and shrubs if September is dry (it often is)
- Apply anti-desiccant spray to broadleaf evergreens (boxwood, holly)
- Complete any structural pruning on trees before leaves drop
- Plant spring-blooming bulbs (tulips, daffodils, alliums) — they need cold stratification over winter

### Late September — Irrigation Timing Decision

First average frost in the Northern Colorado Front Range is typically **October 5–15**, varying by year and elevation. Plan irrigation winterization for early October in most years. Book now — contractors fill up quickly.

### First Two Weeks of October — Winterization Window

**✓ Irrigation winterization** (before first hard freeze)
**✓ Winterizer fertilizer** — apply to established turf in early October
**✓ Leaf management** — first heavy leaf fall begins, especially under cottonwoods

> **Pro Tip:** You don't have to remove every leaf immediately. A light leaf cover doesn't hurt turf. The problem is thick, matted leaves left under snow for weeks. Aim for removal by late October before the first significant snowfall.

### Late October — Wind-Down Tasks

- Final mow at 2.5–3 inches
- Drain and store hoses
- Cut back ornamental grasses (or leave for winter interest — both are acceptable)
- Apply fresh mulch to beds if not done in spring — insulates root zones for winter`,
      },
      {
        title: "Winter Property Prep Checklist for Northern Colorado",
        slug: "winter-property-prep-colorado",
        excerpt: "What to button up before winter arrives — and what to watch for through the cold months.",
        coverImage: img("1560518883-ce09059eeffa"),
        featured: false,
        sortOrder: 4,
        content: `## November Is the Last Month to Act

By December, most Northern Colorado properties are under snow and on survival mode. Everything you meant to do before winter but didn't gets left until spring — often at greater cost and with more damage than if it had been addressed in fall.

November is the last productive month for outdoor work before the growing season ends. Use it.

![Northern Colorado property prepared for winter](https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80)

### November Pre-Winter Checklist

**Irrigation and Water**
- ✓ Irrigation winterization complete and documented
- ✓ Backflow preventer insulated with foam wrap
- ✓ All exterior hose bibs shut off and drained
- ✓ Hoses disconnected, drained, and stored

**Lawn and Landscape**
- ✓ Final mow complete (2.5–3 inches)
- ✓ Winterizer fertilizer applied
- ✓ Leaves removed from lawn areas
- ✓ Mulch refreshed in beds (3–4 inches)
- ✓ Spring bulbs planted

**Hardscape and Structure**
- ✓ Concrete driveway and walks sealed if due
- ✓ Cracks in concrete addressed before freeze cycles widen them
- ✓ Fence posts checked and any movement corrected
- ✓ Outdoor furniture stored or covered

**Trees and Shrubs**
- ✓ Young trees wrapped or protected from frost cracks (bark splitting in winter is common in Colorado — wrap trunks with tree wrap from November to March)
- ✓ Anti-desiccant on broadleaf evergreens
- ✓ Hazardous branches identified and removed

### What to Watch for Through Winter

**Ice dams** — snow on roofs melts at the eave and refreezes, creating ice dams that back water under shingles. Monitor after heavy snowfall. Roof rakes for low-slope sections of the roof.

**Foundation ice and snowmelt** — ensure downspout extensions are clear and directing water away from the foundation. Ice at foundation level is a sign of drainage problems to address in spring.

**Tree branch loads** — heavy wet spring snowstorms (April–May) can break limbs. Check trees after significant snowfall.

**Frost heave on walks and drives** — note any sections that heave through winter. These need correction in spring before they become trip hazards.

> **Pro Tip:** Colorado's winter chinook winds are the most damaging wind events for landscapes. Temperatures can rise 40–60°F in a few hours, activating plants that then get hit by the following cold. Nothing to do about chinooks — just note which plants suffer and make replacement or hardier-variety decisions for spring.`,
      },
    ],
  },
  {
    name: "Colorado Living",
    slug: "colorado-living",
    description: "Understanding Colorado's unique climate, regulations, and property conditions.",
    sortOrder: 7,
    articles: [
      {
        title: "Why Colorado Properties Need Different Maintenance Than Other States",
        slug: "why-colorado-properties-different",
        excerpt: "Elevation, UV, freeze-thaw, clay soil, and wind create conditions that national maintenance guides don't account for.",
        coverImage: img("1560185893-a55b8a6f7e89"),
        featured: false,
        sortOrder: 1,
        content: `## The Colorado Difference Isn't Just About Snow

When people move to Northern Colorado from lower elevations, they often bring landscaping and maintenance expectations formed in other climates. Most of those expectations need adjustment. Colorado's conditions are different in ways that aren't obvious until things start failing.

![Northern Colorado property showcasing regional landscape character](https://images.unsplash.com/photo-1560185893-a55b8a6f7e89?auto=format&fit=crop&w=900&q=80)

### UV Intensity at Elevation

At 5,000–5,500 feet above sea level (the range of most Front Range communities), UV radiation is approximately 25% more intense than at sea level. This has practical consequences:

- Exterior paint and stain fade significantly faster — repaint or restain cycles that work on 7-year intervals at lower elevations may need to be shortened to 5 years
- Wood fence and deck materials degrade faster without protective finishes
- Plastic components (irrigation heads, light fixtures, wiring conduit) become brittle more quickly
- Shade cloth ratings for garden protection need adjustment upward

### Freeze-Thaw Cycles Are the Dominant Force

Colorado doesn't have the coldest winters in the country — Montana, Minnesota, and Maine are colder in absolute terms. But Colorado's wide temperature swings create more freeze-thaw cycles than most cold-climate regions.

A Montana property might stay below freezing for 60+ consecutive days. A Colorado Front Range property might go through 40–50 freeze-thaw cycles in a single winter as temperatures swing above and below 32°F repeatedly.

Each cycle is a stress event for concrete, wood, fence posts, and plants. Structures that would last 20 years in a colder but more consistent climate fail in 10–15 in Colorado's cycling conditions.

### The Clay Soil Reality

Front Range clay soils shrink when dry and swell when wet — sometimes moving several inches vertically through a season. This movement cracks concrete, shifts retaining walls, heaves fence posts, and breaks irrigation lines.

No amount of landscaping makes Front Range clay behave like loam soil. Working with it — choosing plants adapted to it, designing drainage that manages it, building hardscape with proper joints and footings — is more effective than fighting it.

> **Pro Tip:** The most reliable way to identify a contractor who understands Colorado conditions is to ask them how they account for frost depth in fence installations and freeze-thaw in concrete work. A contractor who gives you a generic national standard answer isn't building for Colorado.

### Wind as a Design Force

Chinook winds, thermal downslope winds, and the persistent westerlies across the Front Range aren't just weather events — they're design constraints. Landscape features, fencing, trees, and irrigation must be sized and positioned with wind loading in mind.

A beautiful Japanese maple that would thrive in a protected Pacific Northwest garden will defoliate and struggle on an exposed Northern Colorado property. A 6-foot privacy fence designed to standard residential specifications may rack and fail in sustained 60+ mph chinook conditions.`,
      },
      {
        title: "Understanding Colorado's Water Restrictions and Xeriscape Rules",
        slug: "colorado-water-restrictions-xeriscape",
        excerpt: "Front Range municipalities have some of the most specific water regulations in the country. Here's what you need to know before you landscape.",
        coverImage: img("1558618047-6e3b4b1ae965"),
        featured: false,
        sortOrder: 2,
        content: `## Water Is a Managed Resource in Colorado

Colorado operates under the Prior Appropriation doctrine — the legal principle that water rights are allocated by seniority, not by proximity to the water source. This means that in drought years, junior water rights holders face restrictions before senior holders, and municipalities must actively manage their water supply with this in mind.

For homeowners, this means water restrictions aren't just a drought emergency measure — they're a permanent feature of landscape planning in Northern Colorado.

![Colorado xeriscape landscape designed for water efficiency](https://images.unsplash.com/photo-1558618047-6e3b4b1ae965?auto=format&fit=crop&w=900&q=80)

### Permanent vs. Emergency Restrictions

Most Front Range municipalities have permanent year-round restrictions on outdoor watering:

- **Time of day:** No watering between 10 AM and 6 PM (or similar) during irrigation season. This is permanent, not drought-triggered.
- **Day of week:** Odd/even address-based watering schedules are common.
- **Seasonal limits:** Most municipalities prohibit irrigation before May 1 and after October 15 (approximate).

Drought-triggered restrictions (Stage 1, Stage 2, Stage 3) impose additional limits on top of permanent rules when water supplies are under stress.

### New Residential Development: Turf Restrictions

Several Northern Colorado municipalities have adopted limitations on the amount of turf grass allowed in new residential landscapes:

- **Boulder:** Limits turf to a specific percentage of total landscaped area
- **Erie:** Has adopted water-wise landscaping standards for new construction
- **Longmont:** Encourages xeriscape through rebate programs and has standards for new commercial development

If you're building or buying a new home, verify the landscape standards that apply to your lot. Installing turf that exceeds allowed percentages creates compliance issues and may require removal.

### Xeriscape Rebate Programs

Multiple Front Range water utilities offer rebates for converting high-water-use landscapes (primarily lawn) to water-efficient xeriscape:

- Cash-per-square-foot rebates for turf removal
- Rebates for installing drip irrigation
- Free or subsidized water-wise plant programs
- Free irrigation system audits

> **Pro Tip:** Rebate programs change year to year. Check your specific water utility's website at the beginning of each year, as programs often open in spring with limited funding that's claimed by early applicants.

### What Counts as Xeriscape?

Xeriscape is a landscaping approach that minimizes supplemental irrigation through design, plant selection, and soil improvement. It is not "zero-scaping" (bare gravel with no plants). A compliant xeriscape typically includes:

- Turf limited to functional areas
- Adapted and native plant species in beds
- 3–4 inches of organic or inorganic mulch
- Drip irrigation for all planted areas
- Permeable hardscape where possible`,
      },
      {
        title: "The Front Range Wind Problem: How It Affects Your Property",
        slug: "front-range-wind-property-effects",
        excerpt: "Northern Colorado wind isn't just uncomfortable — it damages fences, desiccates plants, and requires specific design responses.",
        coverImage: img("1486325212027-8081e485255e"),
        featured: false,
        sortOrder: 3,
        content: `## Wind Is a Structural and Horticultural Force

Front Range wind events are among the defining weather experiences of Northern Colorado. Chinook winds descending from the Rockies can reach 60–80 mph in gusts along the Boulder–Longmont–Fort Collins corridor. Thermal downslope events are common in winter and spring. The persistent westerlies create sustained wind loading that few other regions experience at this scale.

This wind isn't just uncomfortable — it has real structural and horticultural consequences that should inform every landscape and property decision.

![Property in Northern Colorado showing effects of Front Range wind](https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80)

### How Wind Damages Fences

A 6-foot solid privacy fence presents 36 square feet of wind load per 8-foot section. In a 70 mph wind event, that's approximately 800+ pounds of force on each panel — all transferred to the fence posts.

Under-built fences fail in one of three ways:
1. **Post pullout** — posts set too shallow pull straight out of the ground
2. **Post fracture** — posts break at or just below grade where bending stress concentrates
3. **Hardware failure** — rails pull free from posts as connections fail under repeated loading

The solution is proper post depth (36+ inches in Northern Colorado), correct post sizing for fence height, and board-on-board or spaced construction that allows wind to pass through rather than building up full sail pressure.

> **Pro Tip:** Board-on-board fence construction — where alternating boards overlap on each side of the rail — provides privacy while allowing wind to pass through gaps. It's far more wind-resistant than a true solid fence while achieving similar visual privacy. Specify board-on-board for any fence in an exposed location.

### How Wind Affects Plants

**Desiccation** — wind strips moisture from plant leaves faster than roots can replace it. This is especially damaging to broadleaf evergreens in winter, when roots can't absorb water from frozen soil. Symptoms: brown leaf edges and tips, eventually entire leaf death.

**Soil moisture loss** — bare soil and mulch beds in exposed locations lose moisture rapidly to wind. Mulch depth matters more in exposed locations — maintain 4 inches rather than 3.

**Mechanical damage** — sustained wind loading causes physical damage to plants through branch rubbing, repeated bending, and root rock. Trees grown in consistently windy conditions develop reaction wood and typically shorter, more compact forms — but newly planted trees need staking for 1–2 seasons while roots establish.

### Wind-Resistant Plant Selection

Native and adapted plants generally handle Front Range wind better than non-adapted ornamentals. Specific excellent choices for exposed Colorado sites:

- **Rocky Mountain Juniper** — wind-shaped, tough, native
- **Hawthorn species** — thorny, dense, excellent windbreak material
- **Cotoneaster** — low-growing, tough, handles wind and poor soil
- **Blue Grama grass** — native, flexible, doesn't break in wind
- **Native Rabbitbrush** — silver foliage, yellow fall flowers, bulletproof in wind`,
      },
    ],
  },

  // ── Custom Living ─────────────────────────────────────────────
  {
    name: "Custom Living",
    slug: "custom-living",
    description: "Renovation, remodeling, and interior build-out guides for Northern Colorado homeowners.",
    sortOrder: 8,
    articles: [
      {
        title: "How to Plan a Home Renovation: A Northern Colorado Homeowner's Guide",
        slug: "how-to-plan-home-renovation-colorado",
        excerpt: "Scope, budget, permits, and contractor selection — how to approach a renovation without costly surprises.",
        coverImage: img("1503387762-592deb58ef4e"),
        featured: true,
        sortOrder: 1,
        content: `## Renovation Planning Starts Before the First Hammer Swing

The difference between renovations that go smoothly and renovations that turn into nightmares almost always comes down to planning. More specifically: the amount of thinking done before the first contractor is called.

![Modern home interior renovation in progress](https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80)

### Step 1: Define the Goal Before the Scope

Most homeowners make the mistake of jumping straight to "what do I want it to look like" without clearly answering "what problem am I solving?" The goal should drive the scope.

Are you renovating to increase resale value? That changes what's worth spending on. Are you making the home work better for your family for the next ten years? That's a different set of priorities. Are you converting a basement to rental income? That has specific code and safety requirements.

Write down the goal before you discuss the scope with anyone.

### Step 2: Understand What Drives the Budget

Renovation budgets run over for one of three reasons:

**Scope creep** — once walls are open, you see things you didn't know about and decide to fix them. This is legitimate, but it needs to be managed. The fix is a contingency line in your budget — typically 15–20% for older homes.

**Change orders** — changing decisions after work has started is expensive. A tile choice made after tile is already ordered results in restocking fees, reordering delays, and rescheduled labor. Finalize material selections before work begins.

**Unforeseen conditions** — in Colorado, this typically means asbestos in older textured ceilings or joint compound (homes built before 1980), knob-and-tube wiring, improperly installed insulation in exterior walls, or structural issues not visible from inspection. A proper pre-construction walkthrough reduces surprises.

> **Pro Tip:** Set a hard budget ceiling, then design to 80% of it. The remaining 20% is your unforeseen conditions fund. If you don't need it, great. If you do, the project doesn't stop.

### Step 3: Understand What Requires Permits in Northern Colorado

Most structural work, electrical, plumbing, and mechanical changes require permits. This includes:

- Adding or removing walls (load-bearing or not)
- Basement finishes with new electrical and egress
- Room additions of any size
- Any HVAC modifications
- Water heater and electrical panel replacement

Permits exist to protect you, not to make your life harder. Unpermitted work is a disclosure issue at sale, can't be financed as part of an appraisal, and can result in required demolition.

### Step 4: Interview Contractors on Scope, Not Just Price

When getting renovation quotes, the lowest bid almost never represents the best value. Here's what to ask:

- **What's included in demolition?** (Who disposes of the debris?)
- **Who handles permit application?** (You or them?)
- **How do you handle unforeseen conditions?** (Change order process?)
- **What is your payment schedule?** (Legitimate contractors never ask for full payment upfront)
- **Can I speak to a client from a similar project?**

The contractor who can answer these questions clearly is the one who has done this enough times to have real systems.

### Step 5: Plan for Living in It (or Not)

Some renovations can be staged so you can remain in the home. Others — particularly kitchen renovations or work in your only bathroom — require temporary arrangements. Budget for this. A hotel for two weeks or a temporary kitchen setup costs real money and causes real stress if not planned.

Renovation timelines in Northern Colorado for common projects:
- Bathroom remodel: 2–4 weeks
- Kitchen remodel: 4–8 weeks (add 8–12 weeks if custom cabinets)
- Basement finish: 6–10 weeks
- Room addition: 3–6 months

Every project adds time when trades (plumber, electrician) aren't coordinated correctly. Ask your contractor how they schedule trade work before work begins.`,
      },
      {
        title: "Flooring for Colorado Homes: What Actually Holds Up",
        slug: "flooring-colorado-homes-guide",
        excerpt: "Low humidity, UV at elevation, and freeze-thaw make Colorado hard on flooring. Here's what lasts and what doesn't.",
        coverImage: img("1517022812379-23952977f6e7"),
        featured: false,
        sortOrder: 2,
        content: `## Colorado's Climate Is Hard on Flooring

At 5,000+ feet elevation, with low humidity, intense UV, and temperature swings that stress materials year-round, flooring choices that work in other climates may fail in Colorado. This guide covers what holds up and what to avoid.

![Hardwood and LVP flooring in a Northern Colorado home](https://images.unsplash.com/photo-1517022812379-23952977f6e7?auto=format&fit=crop&w=900&q=80)

### The Humidity Problem

Northern Colorado's average indoor relative humidity in winter is often 20–35% — far below the 40–60% range that solid hardwood requires to be stable. At low humidity, solid hardwood shrinks. Gaps open between boards. Extreme dryness can cause cupping, cracking, and squeaking.

**What this means for material selection:**

- **Solid hardwood** — can work, but requires a whole-home humidification system to maintain 35%+ RH in winter. Without it, expect movement, gaps, and potential cracking.
- **Engineered hardwood** — much more dimensionally stable than solid hardwood because the cross-ply construction resists shrinkage and expansion. A good choice for Colorado when properly acclimated.
- **Luxury Vinyl Plank (LVP)** — 100% waterproof, completely unaffected by humidity changes, and very durable. Has become the dominant choice in Colorado renovations for good reason.
- **Tile** — unaffected by humidity, extremely durable. Cold underfoot in winter; radiant heat underlayment addresses this.

### UV Fading

At Colorado's elevation, UV is approximately 25% more intense than at sea level. Flooring materials that face direct sun will fade faster than product warranties typically suggest.

The most fade-resistant options: **tile** and **LVP** with UV-stable finishes. Hardwoods (both solid and engineered) fade — particularly cherry and walnut, which change color significantly. Area rugs create uneven fading patterns when removed.

If you have significant south or west-facing window exposure, UV filtering window film is worth the investment before new flooring goes in.

### What Holds Up Best

**For main living areas:** LVP is the most practical choice for most Colorado homeowners. Waterproof, dimensionally stable, comfortable underfoot, and available in realistic wood and stone looks. Nail-down engineered hardwood is an excellent premium option if humidity is controlled.

**For kitchens and baths:** Tile remains the gold standard for water resistance. LVP is acceptable in kitchens. Avoid any wood product in full bathrooms without exceptional ventilation and discipline about wet surfaces.

**For basements:** LVP or engineered hardwood on a proper moisture barrier. Never solid hardwood in a Colorado basement — even finished basements see humidity variations that solid hardwood cannot tolerate.

> **Pro Tip:** Whatever flooring you choose, acclimation before installation matters. LVP and engineered hardwood should sit in the installation space for 48–72 hours before installation. This is especially important in Colorado, where the installation environment may be significantly drier than the warehouse the material was stored in.`,
      },
      {
        title: "Kitchen Remodel ROI in Northern Colorado: Where to Spend and Where to Save",
        slug: "kitchen-remodel-roi-colorado",
        excerpt: "Kitchen remodels are the single highest-ROI renovation for most Northern Colorado homes — when you scope them correctly.",
        coverImage: img("1556909114-44e3e9c56d95"),
        featured: false,
        sortOrder: 3,
        content: `## Kitchen Remodels Return More Than Almost Any Other Renovation

A mid-range kitchen remodel in the Northern Colorado market returns 60–80% of its cost at resale in most current conditions. A full high-end remodel returns less percentage-wise — but a functional, well-designed kitchen is often the deciding factor for buyers who are choosing between comparable properties.

![Modern kitchen after full remodel with new cabinets and countertops](https://images.unsplash.com/photo-1556909114-44e3e9c56d95?auto=format&fit=crop&w=900&q=80)

### The Three Tiers of Kitchen Renovation

**Cosmetic refresh ($5,000–$15,000)**

Cabinet door and drawer front replacement (or refinishing), new countertops, new hardware, new sink and faucet, new backsplash, updated lighting. The bones of the kitchen stay the same — you're updating the visible surfaces.

This is the highest-ROI tier. If the layout works and the cabinet boxes are in good shape, there's no reason to replace them.

**Mid-Range Remodel ($15,000–$40,000)**

New semi-custom cabinets, stone countertops, tile backsplash, new appliances, updated lighting, new flooring. May include some layout changes if the existing layout has a fundamental problem (no kitchen island space, poor workflow triangle, etc.).

**Full Custom Renovation ($40,000+)**

Layout reconfiguration, custom cabinetry, high-end appliances, premium stone or custom countertops, structural changes, high-end lighting design. For homeowners staying long-term or properties in the upper price tier where buyers expect premium finishes.

### Where the Budget Goes in a Mid-Range Remodel

Breaking down a $25,000 kitchen remodel:

- **Cabinets (semi-custom):** 35–40% of budget ($8,750–$10,000)
- **Countertops (quartz):** 10–15% ($2,500–$3,750)
- **Appliances:** 10–20% ($2,500–$5,000) — often sourced by homeowner
- **Labor (install, tile, plumbing rough, electrical):** 25–35% ($6,250–$8,750)
- **Backsplash tile:** 5–8% ($1,250–$2,000)
- **Fixtures, hardware, lighting:** 5–8% ($1,250–$2,000)

### What Adds Value in Northern Colorado

**Island/eating bar** — Northern Colorado buyers prioritize open, functional kitchen-living integration. An island that allows seating is almost universally valued.

**Quartz countertops** — granite has largely been replaced by quartz in the Northern Colorado market. Quartz performs better (non-porous, doesn't require sealing) and photographs better in listings.

**Soft-close drawers and doors** — a small hardware upgrade that buyers notice immediately and interpret as quality throughout.

**Under-cabinet lighting** — affordable, high-impact visual upgrade that makes kitchens feel custom.

> **Pro Tip:** Don't over-improve for your neighborhood. A $75,000 kitchen renovation in a neighborhood of $400,000 homes doesn't return well. Know your market ceiling and scope to it.`,
      },
    ],
  },

  // ── Outdoor Structures ────────────────────────────────────────
  {
    name: "Outdoor Structures",
    slug: "outdoor-structures",
    description: "Decks, pergolas, water features, and outdoor living construction guides for Northern Colorado.",
    sortOrder: 9,
    articles: [
      {
        title: "Composite vs. Wood Decking in Colorado: A Practical Comparison",
        slug: "composite-vs-wood-decking-colorado",
        excerpt: "Colorado's UV, freeze-thaw, and low humidity make this choice more consequential than in other climates. Here's the honest breakdown.",
        coverImage: img("1533090161-9d2efb8c5897"),
        featured: true,
        sortOrder: 1,
        content: `## The Colorado Climate Changes the Math on Decking Materials

Most homeowners approach the composite-vs.-wood decision based on what they've heard generally. In Colorado specifically, the climate creates conditions that make composite decking a much stronger choice for most applications than it would be in, say, the Midwest or Southeast.

![Composite deck with pergola in a Colorado backyard](https://images.unsplash.com/photo-1533090161-9d2efb8c5897?auto=format&fit=crop&w=900&q=80)

### What Colorado Does to Wood Decks

Colorado's combination of intense UV at elevation, low humidity, and dramatic temperature swings creates the worst possible conditions for untreated or undertreated wood decking.

**UV degradation** — at 5,000+ feet, UV radiation is approximately 25% more intense than at sea level. Pressure-treated pine grays out and checks (surface cracks) within 1–2 seasons without a protective finish. Even cedar, which holds up better, requires more frequent restaining than in lower-elevation climates.

**Freeze-thaw cycling** — the Front Range goes through 40–50+ freeze-thaw cycles in a typical winter. Each cycle forces water in and out of wood grain. Over time, this causes checking, cupping, and accelerated degradation of both the wood and the fasteners.

**Low humidity** — Colorado's dry air draws moisture from wood continuously. New wood decks installed in summer can shrink significantly by winter, opening gaps between boards. This is part of normal installation planning (expansion gaps are installed at specific widths for this reason), but it's a dynamic that wood products require management for.

### What This Means for Maintenance

A wood deck in Northern Colorado needs:
- Annual cleaning and inspection
- Restaining or resealing every 2–3 years (vs. 4–6 years in lower-elevation, higher-humidity climates)
- Fastener inspection and replacement as screws back out through freeze-thaw cycling
- Board replacement for any boards that develop significant checking or structural degradation

A composite deck in Northern Colorado needs:
- Annual cleaning (soap and water or composite-specific cleaner)
- Inspection of fasteners and structural framing (the composite surface doesn't rot, but wood framing underneath still does)
- No staining, sealing, or painting — ever

### The Cost Comparison Over 15 Years

On a 400 square foot deck, initial costs:
- **Pressure-treated wood:** $7,500–$15,000 installed
- **Composite (Trex Enhance / TimberTech Pro):** $11,000–$22,000 installed

Over 15 years, accounting for maintenance costs (staining labor and materials every 2–3 years, board replacements):
- **Wood:** Add $4,000–$8,000 in maintenance
- **Composite:** Add $500–$1,500 in cleaning supplies

Total 15-year cost of ownership is often within 10–20% — with composite requiring significantly less time and attention.

### When Wood Still Makes Sense

**Budget is the primary constraint** — if the upfront cost difference is a genuine barrier, wood is perfectly viable with proper maintenance discipline.

**The deck is temporary** — if you're planning to sell in 2–3 years and want to show a new deck at lowest cost, pressure-treated is a reasonable choice.

**Specific aesthetic** — some homeowners strongly prefer the look and feel of real wood. Cumaru and ipe (tropical hardwoods) are the most durable natural wood deck options for Colorado and require less maintenance than pine or cedar, but at higher initial cost.

> **Pro Tip:** Regardless of material, the structural framing (joists, posts, beams) should be pressure-treated lumber or steel in Colorado. The frame outlasts the deck surface in most installations — build it to last.`,
      },
      {
        title: "Adding a Water Feature to Your Property: What to Expect",
        slug: "adding-water-feature-colorado-guide",
        excerpt: "From pondless waterfalls to koi ponds — what the design, installation, and ongoing care actually look like.",
        coverImage: img("1544551763-46a013bb70d5"),
        featured: false,
        sortOrder: 2,
        content: `## Water Features Are More Accessible Than Most Homeowners Think

There's a persistent misconception that custom water features are luxury items reserved for high-end estates. In reality, a well-designed pondless waterfall or decorative fountain is accessible to most Northern Colorado homeowners, adds immediate impact to outdoor spaces, and can be maintained with minimal effort when properly installed.

![Custom water feature with waterfall and naturalistic stone work](https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80)

### The Pondless Waterfall: The Best Starting Point for Most Homeowners

If you've never had a water feature, a pondless waterfall is the right starting point. The concept is simple: water flows down a waterfall and disappears into an underground gravel-filled reservoir, where a pump recirculates it continuously.

**Why pondless is often the better choice:**

- **Safety** — no open water, which matters if you have children or grandchildren
- **Maintenance** — no algae management, no fish, no significant biological system to balance
- **Flexibility** — can be turned off completely when you're away without damage
- **Lower starting cost** — pondless systems start around $3,500–$6,500 installed

The primary limitation: you can't have fish or a living ecosystem in a pondless system. If koi or aquatic plants are the goal, a traditional pond is required.

### The Koi Pond: A Living Ecosystem

A properly designed koi pond is a functioning ecosystem — biological filtration, UV clarification, aeration, and regular care. It's more involved than a pondless system, but for the right homeowner, it's deeply rewarding.

Koi pond sizing in Colorado requires specific consideration:
- Ponds should be at least 36 inches deep at the deepest point to allow fish to overwinter safely
- Volume must be appropriate to fish load — overstocked ponds require more filtration than correctly stocked ones
- The filtration system must be sized to handle Colorado's temperature swings, which affect biological filter performance dramatically

A well-designed koi pond runs $8,000–$25,000+ depending on size and system complexity.

### What Installation Looks Like

For a typical pondless waterfall installation:

**Day 1–2:** Excavation, vault installation, rock placement begins. The physical footprint of a small pondless system is surprisingly compact — a 5-foot waterfall can fit in a 10×6 foot space.

**Day 2–3:** Liner placement, boulder and rock work, planting pockets if included, pump and plumbing installation.

**Day 3:** System startup, water fill, pump priming, final adjustments and tuning.

Site preparation matters significantly. Access for excavation equipment, proximity to a power source for the pump, and grade of the surrounding area all affect installation complexity.

### Winterization in Colorado

Water features require winterization before the first hard freeze:

**Pondless systems:** Remove and store the pump, drain the plumbing lines, allow the vault reservoir to drain down. The liner and structure survive winter without issue.

**Koi ponds:** The pond itself stays full — fish overwinter at the bottom where water stays above 32°F even when surface ice forms. The pump is relocated to run shallowly (to prevent full circulation that would draw cold surface water to depth), aeration is added, and ice-free openings are maintained.

We provide a complete winterization walkthrough with every installation and offer annual winterization service for clients who prefer not to do it themselves.

> **Pro Tip:** Budget for a GFCI-protected outdoor electrical outlet near the water feature if one doesn't already exist. All pump systems require dedicated power, and running an extension cord is not an acceptable long-term solution.`,
      },
      {
        title: "Junk Haul Off vs. Dumpster Rental: Which Is Right for Your Project?",
        slug: "junk-haul-off-vs-dumpster-rental",
        excerpt: "The choice between a haul-off service and a dumpster depends on project type, timeline, and access. Here's how to decide.",
        coverImage: img("1560518883-ce09059eeffa"),
        featured: false,
        sortOrder: 3,
        content: `## Two Good Options — But Not Interchangeable

When you need to get rid of a significant amount of material, you have two main options: hire a junk haul-off service or rent a dumpster. Both work. But they're better suited to different situations, and choosing the wrong one costs time and money.

![Property cleanout and junk removal in progress](https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80)

### When Junk Haul Off Makes More Sense

**You need it gone fast.** A haul-off crew shows up, loads everything, and leaves. No waiting for a dumpster to be delivered, no waiting for pickup after it's full. For time-sensitive situations — property sale prep, rental turnover, estate cleanout — haul off is faster.

**You have mixed material types.** Dumpsters have restriction lists — no hazardous materials, often no tires or electronics, restrictions on heavy materials like concrete. A haul-off service can often sort and direct different material types to appropriate facilities, handling the logistics you'd otherwise navigate yourself.

**You don't want a large container in front of your property.** Dumpsters require permits in some municipalities when placed on public streets. HOAs in many Northern Colorado communities restrict or prohibit dumpsters. A haul-off truck is there and gone in a few hours.

**You have heavy, bulky items.** Furniture, appliances, and large items are awkward to load into a dumpster with non-professional help. A haul-off crew has the equipment and experience to move heavy items safely.

**You want donation sorting.** Reputable haul-off services separate usable items for donation. Dumpsters don't.

### When Dumpster Rental Makes More Sense

**You're doing ongoing renovation work over days or weeks.** A dumpster sitting on your property lets you discard debris continuously without scheduling multiple pickups. For a renovation project where demo debris accumulates over several weeks, a dumpster is more practical.

**You're generating predictable, consistent material.** Drywall, lumber, roofing shingles — if you know what you're putting in and approximately how much, a dumpster sized correctly is often the most cost-efficient option for single-material disposal.

**You want flexibility on timing.** A dumpster stays until you're done. A haul-off crew comes when scheduled and takes what's ready at that time.

### The Cost Comparison

Dumpster rental in Northern Colorado typically runs $350–$650 for a 10–15 yard container for a 7-day rental, including disposal fees. Additional days cost more; overweight charges apply for heavy materials.

Junk haul-off pricing is volume-based: $125–$200 for a quarter-truck load, $225–$350 for a half load, $375–$550 for a full load. A full-property estate cleanout is typically project-quoted.

For many residential projects, the total cost is similar. The deciding factor is usually convenience and timeline, not price.

> **Pro Tip:** If you're not sure which option makes sense, describe your project to a haul-off service and ask them to recommend. A service that's honest about when a dumpster is the better option for your situation is worth trusting with the work when haul-off is the right call.`,
      },
    ],
  },

  // ── Property Management ───────────────────────────────────────
  {
    name: "Property Management",
    slug: "property-management",
    description: "How professional property management works — from boots-on-ground operations to commercial portfolio oversight.",
    sortOrder: 10,
    articles: [
      {
        title: "The Boots-on-Ground Model: What Real Property Management Actually Looks Like",
        slug: "boots-on-ground-property-management",
        excerpt: "Administrative management and operational management are not the same thing. Here's what it means to have a team physically at your property — and why it matters.",
        coverImage: img("1560518883-ce09059eeffa"),
        featured: true,
        sortOrder: 1,
        content: `## The Gap Between Administration and Operations

Most people think of property management as a coordination service — someone who answers the phone, schedules vendors, collects rent, and sends reports. That's administrative property management, and it's genuinely useful. But it has a structural limitation: it depends entirely on the vendor network and response times of the third parties being coordinated.

Boots-on-ground management is something different. It means the management team has people in the field — real crew members who physically go to your property, observe conditions, perform work, and respond to problems directly.

![Property manager conducting a physical walkthrough and inspection](https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80)

### What Happens When You Call at 11 PM

In an administrative management model, an after-hours emergency triggers a call to a vendor dispatch system. That system contacts a contractor on an approved list. The contractor returns the call within some window. They assess whether it's an emergency worth a late-night trip. They arrive when they decide to arrive.

In a boots-on-ground model, the call goes to the management team that has its own crew. Someone with knowledge of your specific property — its layout, access points, shutoffs, quirks — is dispatched. The response is faster, the cost is controlled, and the person showing up knows your property.

For owners with properties they're not physically close to, this distinction is the difference between peace of mind and anxiety.

### The On-Call Supplement Model

One of the most effective property management arrangements is a hybrid: you keep your existing property management company for administrative functions (tenant screening, lease management, financial reporting, legal compliance) and you add Forge Point as the boots-on-ground operational layer.

Your PM company handles the paperwork. Forge Point handles the physical:

- Scheduled property walkthroughs with documented reports
- Routine maintenance and grounds upkeep
- 24/7 emergency response (month-to-month retainer + per-incident rate)
- Tenant maintenance request coordination and completion
- Before/after photo documentation for every service event

This model is particularly valuable for property owners who have a PM company they trust administratively but find that vendor response times, maintenance quality, or physical presence are lacking.

> **The key metric:** How quickly does someone physically show up at your property when something is wrong? That answer tells you everything about the operational quality of your property management.

### What Regular Walkthroughs Actually Catch

Properties that are visited regularly and documented consistently have dramatically better maintenance outcomes than properties where someone only shows up when something is broken.

What regular physical presence catches before it becomes expensive:

- Irrigation heads that are watering the sidewalk instead of the lawn (water waste + higher bills)
- A gutter that has separated and is directing water against the foundation
- Fence posts that have heaved slightly — easy to reset, expensive to replace
- A crawlspace vent that has been blocked, creating moisture buildup underneath
- Exterior lighting that's burned out, creating a security gap
- Tenant modifications that are outside the lease agreement

None of these show up in a monthly financial report. They show up during a walkthrough.

### Documentation That Protects Ownership

Every Forge Point property visit generates a written report with:

- Date, time, and crew member(s) on-site
- Conditions observed across the property
- Maintenance items identified
- Actions taken
- Photo documentation of before and after for any work performed

This documentation exists for the property owner's protection. At lease renewal disputes, insurance claims, or any ownership transition, a documented record of maintenance history has real value. Properties that can demonstrate consistent, professional maintenance retain value better and carry lower risk.`,
      },
      {
        title: "Commercial and Industrial Property Management: What Scale Actually Requires",
        slug: "commercial-industrial-property-management",
        excerpt: "Managing millions of square feet is operationally different from managing a few homes. Here's what large-scale commercial and industrial management looks like in practice.",
        coverImage: img("1486325212027-8081e485255e"),
        featured: false,
        sortOrder: 2,
        content: `## The Scale Problem in Commercial Management

Managing a single commercial building and managing a multi-site commercial or industrial portfolio are operationally different problems. The fundamentals are the same — maintenance response, vendor coordination, documentation, tenant relations — but the systems required to deliver consistent service across scale are fundamentally different from what works for one or two properties.

![Large commercial and industrial property facility management](https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80)

### What 4 Million Square Feet Teaches You

At scale, patterns emerge that you don't see on individual properties. Certain mechanical systems fail at predictable intervals. Certain tenant types generate predictable maintenance categories. Certain seasonal cycles create recurring maintenance windows that need to be staffed and resourced in advance, not discovered in real time.

Managing a large commercial and industrial portfolio over time teaches you:

**Preventive maintenance pays at scale.** A $500 annual inspection of a rooftop HVAC unit on a 200,000 sq ft industrial building catches a developing problem before it becomes a $15,000 emergency repair during peak summer. At portfolio scale, preventive maintenance ROI is measurable and significant.

**Vendor relationships determine response time.** Portfolio-scale operators have established relationships with mechanical, electrical, and structural contractors. When something breaks at a large facility, the call to a vendor who manages a significant portion of your work gets answered faster and dispatched sooner than a one-off call from a property they've never served.

**Documentation is a risk management tool.** At commercial scale, maintenance documentation intersects with lease obligations, insurance requirements, and ownership reporting. Properties with clean, consistent records are easier to finance, easier to insure, and easier to sell.

### The Categories of Commercial Maintenance

Commercial and industrial properties have maintenance categories that residential properties don't have or have in much smaller scale:

**Parking lots and site hardscape** — asphalt maintenance, striping, drainage management, snow removal logistics for large paved areas. A 50,000 sq ft parking lot requires a different approach than a residential driveway.

**Loading dock and warehouse infrastructure** — dock levelers, dock seals, overhead doors, forklift-accessible surfaces, and the safety standards around all of it.

**Mechanical and HVAC systems** — commercial rooftop units serve large floor plates. Failure is disruptive to tenants and expensive to repair in emergency conditions. A preventive maintenance schedule is standard operating procedure at this scale, not optional.

**Exterior grounds and site presentation** — for commercial tenants, the exterior of the property is part of their brand presentation. Grounds maintenance standards are higher and more visible than residential.

**Life safety systems** — fire suppression, exit lighting, extinguisher maintenance, emergency egress. These are regulatory requirements with inspection cycles that must be tracked and documented.

> **The management difference:** A property manager who has operated at commercial and industrial scale for years has systems for all of these categories. A manager whose experience is primarily residential is learning on your portfolio.

### What Tenants at Commercial Scale Need

Commercial tenants — particularly industrial and logistics tenants operating at scale — have operational requirements that directly intersect with maintenance:

- Dock equipment that works. A failed dock leveler stops deliveries.
- HVAC that maintains temperature within spec for products or employees.
- Lighting that meets safety standards.
- Grounds that are clear and accessible.

These aren't preferences — they're operational necessities. Commercial tenants in good facilities are sticky. Tenants who experience maintenance failures that affect operations look for facilities that don't have those problems.

Management that understands the operational requirements of commercial tenants — not just the lease terms — retains them.`,
      },
      {
        title: "Single-Family Property Management: Why Personal Attention Is the Standard",
        slug: "single-family-property-management",
        excerpt: "Single-family investment properties aren't managed like apartment complexes. Every property and every owner is different — and the management approach should reflect that.",
        coverImage: img("1560185893-a55b8a6f7e89"),
        featured: false,
        sortOrder: 3,
        content: `## Every Single-Family Investment Is Different

The mistake most institutional property management approaches make with single-family rentals is treating them like scaled-down apartment management. They're not. Single-family investment properties are individually-owned assets, each with different owner goals, property conditions, tenant profiles, and maintenance histories.

An owner who purchased a home in Erie as a long-term hold for retirement income has different priorities than an investor who is six months into a light renovation and planning to sell. Both are single-family owners — but they need different things from a management relationship.

![Single family property in Northern Colorado prepared for rental occupancy](https://images.unsplash.com/photo-1560185893-a55b8a6f7e89?auto=format&fit=crop&w=900&q=80)

### Starting With the Owner's Goals

Good single-family property management starts with a conversation about what the owner actually wants, not a standard service package.

Common owner priority profiles in Northern Colorado:

**The long-term hold investor** — wants a quality tenant who stays, lower maintenance friction, and a property that holds its value. Maintenance decisions should prioritize longevity and tenant retention, not cost minimization on each ticket.

**The accidental landlord** — relocated for work but kept the property, plans to return eventually or will sell when the market is right. Needs a management team that treats the property like it's theirs — because it used to be.

**The portfolio builder** — acquiring properties systematically, focused on occupancy, margins, and maintenance cost control across multiple assets. Needs reporting, documentation, and consistent standards across properties.

**The absentee owner** — out of state, out of the country, or simply unable to be involved. Needs total confidence that someone is physically watching the property and that nothing will surprise them.

The management approach — communication frequency, maintenance approval thresholds, tenant selection criteria, documentation detail — should be calibrated to the owner.

### The Tenant Relationship at the Single-Family Level

In a multifamily building, tenants are part of a community with shared spaces, building-wide policies, and an arms-length relationship with ownership. In a single-family rental, the tenant is the only occupant of a standalone home — and the relationship is different.

Single-family tenants tend to have higher expectations of responsiveness. They experience every maintenance issue directly, without the buffer of building systems that affect multiple units and trigger management action through volume.

They also tend to stay longer when the property and the management relationship meet their expectations. A single-family tenant who is happy with their maintenance experience, gets responsive communication, and is treated fairly at lease renewal stays for years. Turnover — with its vacancy cost, cleaning, repairs, and re-leasing expense — is the single biggest drag on single-family rental returns.

> **The retention equation:** One great tenant who stays five years costs less than three average tenants over the same period, even if the great tenant pays slightly below market rate. Management that understands tenant retention — not just tenant placement — generates better returns.

### Property-Specific Maintenance Knowledge

Single-family properties have idiosyncrasies. The irrigation system has a finicky valve at zone 3. The kitchen faucet runs cold before it runs hot. The back gate latch needs to be lifted slightly to latch. The driveway heaves every spring because there's a tree root below the concrete.

Management teams that physically visit the property and maintain a detailed property profile know these things. They can communicate them to tenants, address them proactively when appropriate, and avoid the inefficiency of dispatching a vendor for a five-minute fix that requires knowing the property's quirks.

This is what personalized, property-specific management looks like — and it's the standard, not the premium, when the relationship is built right.`,
      },
    ],
  },

] as const;

export async function seedUniversity(prisma: PrismaClient) {
  console.log("  University categories and articles…");

  let totalArticles = 0;

  for (const cat of UNIVERSITY_CATALOG) {
    const category = await prisma.universityCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, sortOrder: cat.sortOrder },
      create: { name: cat.name, slug: cat.slug, description: cat.description, sortOrder: cat.sortOrder },
    });

    for (const article of cat.articles) {
      const existing = await prisma.universityArticle.findUnique({
        where: { slug: article.slug },
        select: { id: true },
      });

      const data = {
        title:          article.title,
        excerpt:        article.excerpt,
        content:        article.content,
        coverImage:     article.coverImage,
        status:         "PUBLISHED" as const,
        featured:       article.featured,
        sortOrder:      article.sortOrder,
        aiDrafted:      true,
        authorName:     "Forge Point Team",
        categoryId:     category.id,
        publishedAt:    new Date(),
        metaTitle:      article.title,
        metaDescription: article.excerpt,
      };

      if (existing) {
        await prisma.universityArticle.update({ where: { id: existing.id }, data });
      } else {
        await prisma.universityArticle.create({ data: { ...data, slug: article.slug } });
      }
      totalArticles++;
    }
  }

  console.log(`  ✓ ${UNIVERSITY_CATALOG.length} university categories, ${totalArticles} articles.`);
}
