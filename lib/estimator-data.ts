// ================================================================
// Static estimator data — 5 tabs matching the site service categories.
// Advisory and Management tabs are "callout" type (no quantity inputs).
// Custom Interiors, Outdoor Living, and Concierge are "estimator" type.
// ================================================================

export type EstimatorTabType = "callout-advisory" | "callout-management" | "estimator";

export interface StaticService {
  id:          string;
  name:        string;
  unit:        string;
  lowPerUnit:  number;
  highPerUnit: number;
  isFlat?:     boolean; // fixed-price item — qty locked to 1
  isFree?:     boolean; // $0 consultation items
}

export interface EstimatorTab {
  id:        string;
  label:     string;
  shortLabel: string;
  type:      EstimatorTabType;
  services?: StaticService[];
}

export const ESTIMATOR_TABS: EstimatorTab[] = [
  {
    id:         "advisory",
    label:      "Forge Point Real Estate",
    shortLabel: "Advisory",
    type:       "callout-advisory",
  },
  {
    id:         "management",
    label:      "Property & Portfolio Management",
    shortLabel: "Management",
    type:       "callout-management",
  },
  {
    id:         "custom-interiors",
    label:      "Custom Interiors",
    shortLabel: "Custom Interiors",
    type:       "estimator",
    services: [
      { id: "reno-consult",    name: "Renovation Consultation",               unit: "per hour",   lowPerUnit: 0,      highPerUnit: 0,      isFree: true },
      { id: "full-home-reno",  name: "Full Home Renovation",                  unit: "per sq ft",  lowPerUnit: 85,     highPerUnit: 175   },
      { id: "basement-basic",  name: "Basement Finishing — Basic",            unit: "per sq ft",  lowPerUnit: 35,     highPerUnit: 55    },
      { id: "basement-full",   name: "Basement Finishing — Full Finish",      unit: "per sq ft",  lowPerUnit: 55,     highPerUnit: 95    },
      { id: "bedroom-add",     name: "Bedroom Addition",                      unit: "flat",       lowPerUnit: 45000,  highPerUnit: 95000,  isFlat: true },
      { id: "bumpout",         name: "Bump-Out Addition",                     unit: "per sq ft",  lowPerUnit: 200,    highPerUnit: 350   },
      { id: "kitchen-mid",     name: "Kitchen Remodel — Mid-Range",           unit: "flat",       lowPerUnit: 25000,  highPerUnit: 55000,  isFlat: true },
      { id: "kitchen-prem",    name: "Kitchen Remodel — Premium",             unit: "flat",       lowPerUnit: 55000,  highPerUnit: 120000, isFlat: true },
      { id: "bath-mid",        name: "Bathroom Remodel — Mid-Range",          unit: "flat",       lowPerUnit: 12000,  highPerUnit: 25000,  isFlat: true },
      { id: "bath-prem",       name: "Bathroom Remodel — Premium",            unit: "flat",       lowPerUnit: 25000,  highPerUnit: 55000,  isFlat: true },
      { id: "framing-walls",   name: "Framing — New Walls",                   unit: "per lin ft", lowPerUnit: 18,     highPerUnit: 35    },
      { id: "drywall",         name: "Drywall Hang & Finish",                 unit: "per sq ft",  lowPerUnit: 3.50,   highPerUnit: 6.50  },
      { id: "paint-room",      name: "Interior Painting — per room",          unit: "per room",   lowPerUnit: 400,    highPerUnit: 900   },
      { id: "paint-home",      name: "Interior Painting — whole home",        unit: "per sq ft",  lowPerUnit: 2.50,   highPerUnit: 4.50  },
      { id: "lvp",             name: "LVP Flooring — installed",              unit: "per sq ft",  lowPerUnit: 6,      highPerUnit: 11    },
      { id: "hardwood",        name: "Hardwood Flooring — installed",         unit: "per sq ft",  lowPerUnit: 10,     highPerUnit: 18    },
      { id: "carpet",          name: "Carpet — installed",                    unit: "per sq ft",  lowPerUnit: 4,      highPerUnit: 8     },
      { id: "tile-floor",      name: "Tile Floor — installed",                unit: "per sq ft",  lowPerUnit: 12,     highPerUnit: 22    },
      { id: "rehab-turnover",  name: "Investment Property Rehab — Turnover",  unit: "flat",       lowPerUnit: 5000,   highPerUnit: 18000,  isFlat: true },
      { id: "rehab-full",      name: "Investment Property Rehab — Full",      unit: "per sq ft",  lowPerUnit: 45,     highPerUnit: 95    },
    ],
  },
  {
    id:         "outdoor-living",
    label:      "Outdoor Living & Grounds",
    shortLabel: "Outdoor & Grounds",
    type:       "estimator",
    services: [
      { id: "land-consult",    name: "Landscape Design Consultation",         unit: "per hour",        lowPerUnit: 0,     highPerUnit: 0,     isFree: true },
      { id: "landscape",       name: "Landscape Design & Install",            unit: "per sq ft",       lowPerUnit: 8,     highPerUnit: 22    },
      { id: "sod",             name: "Sod Installation",                      unit: "per sq ft",       lowPerUnit: 2.50,  highPerUnit: 4.50  },
      { id: "hydroseed",       name: "Hydroseeding",                          unit: "per sq ft",       lowPerUnit: 0.35,  highPerUnit: 0.75  },
      { id: "native-plant",    name: "Native Plant Install (1-gal)",          unit: "each",            lowPerUnit: 15,    highPerUnit: 35    },
      { id: "shrub",           name: "Ornamental Shrub Install (5-gal)",      unit: "each",            lowPerUnit: 45,    highPerUnit: 95    },
      { id: "tree-sm",         name: "Tree Install — Small (under 6 ft)",     unit: "each",            lowPerUnit: 200,   highPerUnit: 450   },
      { id: "tree-md",         name: "Tree Install — Medium (6–12 ft)",       unit: "each",            lowPerUnit: 450,   highPerUnit: 950   },
      { id: "tree-lg",         name: "Tree Install — Large (over 12 ft)",     unit: "each",            lowPerUnit: 950,   highPerUnit: 2500  },
      { id: "mulch",           name: "Mulch Installation",                    unit: "per cubic yard",  lowPerUnit: 65,    highPerUnit: 110   },
      { id: "deco-rock",       name: "Decorative Rock",                       unit: "per sq ft",       lowPerUnit: 4,     highPerUnit: 9     },
      { id: "irrigation",      name: "Irrigation System — New Install",       unit: "per zone",        lowPerUnit: 600,   highPerUnit: 1200  },
      { id: "retaining",       name: "Retaining Wall — Block",                unit: "per sq ft face",  lowPerUnit: 35,    highPerUnit: 75    },
      { id: "comp-deck",       name: "Composite Deck",                        unit: "per sq ft",       lowPerUnit: 45,    highPerUnit: 85    },
      { id: "wood-deck",       name: "Wood/Cedar Deck",                       unit: "per sq ft",       lowPerUnit: 30,    highPerUnit: 55    },
      { id: "pergola",         name: "Pergola — Freestanding",                unit: "flat",            lowPerUnit: 6000,  highPerUnit: 18000,  isFlat: true },
      { id: "concrete-patio",  name: "Concrete Patio",                        unit: "per sq ft",       lowPerUnit: 12,    highPerUnit: 22    },
      { id: "paver-patio",     name: "Paver Patio",                           unit: "per sq ft",       lowPerUnit: 18,    highPerUnit: 38    },
      { id: "water-pondless",  name: "Custom Water Feature — Pondless",       unit: "flat",            lowPerUnit: 4500,  highPerUnit: 12000,  isFlat: true },
      { id: "water-koi",       name: "Custom Water Feature — Koi Pond",       unit: "flat",            lowPerUnit: 8000,  highPerUnit: 25000,  isFlat: true },
      { id: "vinyl-fence",     name: "Vinyl Fence",                           unit: "per lin ft",      lowPerUnit: 28,    highPerUnit: 48    },
      { id: "wood-fence",      name: "Wood Privacy Fence",                    unit: "per lin ft",      lowPerUnit: 22,    highPerUnit: 42    },
      { id: "iron-fence",      name: "Ornamental Iron Fence",                 unit: "per lin ft",      lowPerUnit: 45,    highPerUnit: 90    },
      { id: "chain-fence",     name: "Chain Link Fence",                      unit: "per lin ft",      lowPerUnit: 15,    highPerUnit: 28    },
      { id: "maint-weekly",    name: "Grounds Maintenance — Weekly",          unit: "per visit",       lowPerUnit: 65,    highPerUnit: 165   },
      { id: "maint-biweekly",  name: "Grounds Maintenance — Bi-Weekly",       unit: "per visit",       lowPerUnit: 75,    highPerUnit: 185   },
      { id: "maint-monthly",   name: "Grounds Maintenance — Monthly",         unit: "per month",       lowPerUnit: 250,   highPerUnit: 550   },
      { id: "cleanup",         name: "Spring/Fall Clean-Up",                  unit: "flat",            lowPerUnit: 250,   highPerUnit: 750,    isFlat: true },
      { id: "pw-drive",        name: "Pressure Washing — Driveway",           unit: "per sq ft",       lowPerUnit: 0.25,  highPerUnit: 0.45  },
      { id: "pw-house",        name: "Pressure Washing — House Exterior",     unit: "per sq ft",       lowPerUnit: 0.35,  highPerUnit: 0.65  },
      { id: "window",          name: "Window Cleaning — Residential",         unit: "per pane",        lowPerUnit: 8,     highPerUnit: 18    },
      { id: "industrial-maint",name: "Industrial Maintenance",                unit: "per month",       lowPerUnit: 500,   highPerUnit: 3500  },
      { id: "junk-load",       name: "Junk Haul Off — Truckload",             unit: "per load",        lowPerUnit: 350,   highPerUnit: 650   },
      { id: "junk-cleanout",   name: "Junk Haul Off — Full Cleanout",         unit: "flat",            lowPerUnit: 800,   highPerUnit: 3500,   isFlat: true },
    ],
  },
  {
    id:         "concierge",
    label:      "Concierge & Estate Services",
    shortLabel: "Concierge & Estate",
    type:       "estimator",
    services: [
      { id: "hk-standard",     name: "Estate Housekeeping — Standard",        unit: "per visit",   lowPerUnit: 120,  highPerUnit: 250  },
      { id: "hk-deep",         name: "Estate Housekeeping — Deep Clean",      unit: "per visit",   lowPerUnit: 250,  highPerUnit: 500  },
      { id: "hk-monthly",      name: "Estate Housekeeping — Monthly",         unit: "per month",   lowPerUnit: 350,  highPerUnit: 750  },
      { id: "safety-single",   name: "Home Safety Check — Single Visit",      unit: "per visit",   lowPerUnit: 75,   highPerUnit: 150  },
      { id: "safety-monthly",  name: "Home Safety Check — Monthly",           unit: "per month",   lowPerUnit: 150,  highPerUnit: 300  },
      { id: "safety-weekly",   name: "Home Safety Check — Weekly",            unit: "per month",   lowPerUnit: 350,  highPerUnit: 600  },
      { id: "detail-basic",    name: "Mobile Auto Detail — Basic",            unit: "per vehicle", lowPerUnit: 150,  highPerUnit: 250  },
      { id: "detail-full",     name: "Mobile Auto Detail — Full Detail",      unit: "per vehicle", lowPerUnit: 250,  highPerUnit: 450  },
      { id: "detail-prem",     name: "Mobile Auto Detail — Premium",          unit: "per vehicle", lowPerUnit: 450,  highPerUnit: 750  },
      { id: "poop-weekly",     name: "Yard & Pet Waste — Weekly",             unit: "per visit",   lowPerUnit: 25,   highPerUnit: 55   },
      { id: "poop-biweekly",   name: "Yard & Pet Waste — Bi-Weekly",          unit: "per visit",   lowPerUnit: 35,   highPerUnit: 65   },
      { id: "errand-hour",     name: "Concierge Errands — Per Hour",          unit: "per hour",    lowPerUnit: 45,   highPerUnit: 75   },
      { id: "errand-retainer", name: "Concierge Errands — Monthly Retainer",  unit: "per month",   lowPerUnit: 300,  highPerUnit: 600  },
    ],
  },
];
