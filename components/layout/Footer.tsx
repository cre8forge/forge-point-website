import Image from "next/image";
import Link from "next/link";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { SiteSearch } from "@/components/ui/SiteSearch";

const SERVICE_GROUPS = [
  {
    label: "Advisory",
    links: [
      { label: "Buyer Representation",          href: "/services/buyer-representation" },
      { label: "Seller Representation",         href: "/services/seller-representation" },
      { label: "Acquisition Analysis",          href: "/services/investment-acquisition-analysis" },
      { label: "Commercial Leasing",            href: "/services/commercial-leasing-advisory" },
      { label: "Portfolio Strategy",            href: "/services/portfolio-strategy" },
      { label: "1031 Exchange",                 href: "/services/1031-exchange" },
    ],
  },
  {
    label: "Property Management",
    links: [
      { label: "Commercial & Industrial",       href: "/services/commercial-industrial-management" },
      { label: "Multifamily & HOA",             href: "/services/multifamily-hoa-management" },
      { label: "Single Family Homes",           href: "/services/single-family-management" },
      { label: "Boots-on-Ground Response",      href: "/services/boots-on-ground-response" },
      { label: "Maintenance Coordination",      href: "/services/maintenance-coordination" },
    ],
  },
  {
    label: "Custom Interiors",
    links: [
      { label: "Renovation & Remodel",       href: "/services/renovation-remodel" },
      { label: "Framing & Finishes",         href: "/services/framing-finishes" },
      { label: "Kitchen & Bath Remodels",    href: "/services/kitchen-bath-more" },
      { label: "Basement Finishing",         href: "/services/basement-finishing" },
      { label: "Additions & Expansions",     href: "/services/additions-expansions" },
      { label: "Investment Property Rehab",  href: "/services/investment-property-rehab" },
      { label: "Flooring & Tile",            href: "/services/flooring-tile" },
    ],
  },
  {
    label: "Outdoor Living & Grounds",
    links: [
      { label: "Landscape Design & Install",  href: "/services/landscape-design-install" },
      { label: "Decks, Pergolas & Patios",    href: "/services/decks-pergolas-patios" },
      { label: "Fencing & Retaining Walls",   href: "/services/fencing" },
      { label: "Grounds Maintenance",         href: "/services/grounds-maintenance" },
      { label: "Industrial Maintenance",      href: "/services/industrial-maintenance" },
      { label: "Pressure Washing & Windows",  href: "/services/power-window-washing" },
      { label: "Junk Haul Off & Cleanouts",   href: "/services/junk-haul-off" },
    ],
  },
  {
    label: "Concierge & Estate",
    links: [
      { label: "Estate Housekeeping",          href: "/services/housekeeping-cleaning" },
      { label: "Home Safety Checks",           href: "/services/home-safety-checks" },
      { label: "Mobile Auto Detailing",        href: "/services/mobile-auto-detailing" },
      { label: "Yard & Pet Waste",             href: "/services/poop-scooping" },
      { label: "Concierge Errands",            href: "/services/errand-services" },
    ],
  },
];

const serviceAreas = [
  "Erie", "Longmont", "Boulder", "Lafayette", "Louisville",
  "Broomfield", "Westminster", "Arvada", "Thornton", "Northglenn",
  "Brighton", "Commerce City", "N. Denver Metro",
];

export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

        <Divider className="mb-12" />

        {/* Brand + 5 service category columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 mb-12">

          {/* ── Col 1: Brand (spans 2 cols on xl to keep proportions) ── */}
          <div className="space-y-5 col-span-2 md:col-span-3 xl:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt="Forge Point Property Services"
                width={44}
                height={44}
                className="object-contain"
              />
              <div>
                <span className="block font-cinzel font-900 text-white text-xl tracking-[0.25em] uppercase group-hover:text-amber transition-colors">
                  FORGE POINT
                </span>
                <span className="block font-condensed font-600 text-xs tracking-[0.3em] uppercase text-amber/80 mt-0.5">
                  Property Services
                </span>
              </div>
            </Link>
            <p className="font-cormorant italic font-300 text-base text-amber leading-relaxed">
              Your Property. Elevated.
            </p>
            <p className="font-barlow font-300 text-sm text-muted leading-relaxed">
              Erie, Colorado 80516
            </p>
            <div className="space-y-1.5">
              <a href="tel:+17204191961" className="block font-barlow font-300 text-sm text-muted hover:text-white transition-colors">
                (720) 419-1961
              </a>
              <a href="mailto:Hello@Cre8Forge.com" className="block font-barlow font-300 text-sm text-muted hover:text-white transition-colors">
                Hello@Cre8Forge.com
              </a>
            </div>
            <div>
              <p className="font-condensed font-600 text-xs uppercase tracking-wide text-orange mb-2">Follow Us</p>
              <div className="flex items-center gap-4">
                <a href="https://instagram.com/cre8forge" target="_blank" rel="noopener noreferrer" className="font-condensed text-xs text-muted hover:text-white uppercase tracking-wide transition-colors">Instagram</a>
                <span className="text-white/20">·</span>
                <a href="https://facebook.com/forgepointproperty" target="_blank" rel="noopener noreferrer" className="font-condensed text-xs text-muted hover:text-white uppercase tracking-wide transition-colors">Facebook</a>
              </div>
            </div>
          </div>

          {/* ── Cols 2–4: Service groups ── */}
          {SERVICE_GROUPS.map((group) => (
            <div key={group.label}>
              <h4 className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-4">
                {group.label}
              </h4>
              <ul className="space-y-2">
                {group.links.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="font-barlow font-300 text-sm text-muted hover:text-white transition-colors">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Search */}
        <div className="mb-8">
          <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-2">
            Search
          </p>
          <div className="max-w-sm">
            <SiteSearch variant="input" />
          </div>
        </div>

        {/* Service areas + CTA */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-8 pb-8 border-b border-white/8">
          <div>
            <h4 className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-2">Service Areas</h4>
            <p className="font-barlow font-300 text-sm text-muted">{serviceAreas.join(" · ")}</p>
            <Link href="/service-area" className="inline-block mt-1 font-condensed text-xs uppercase tracking-wide text-amber hover:text-white transition-colors">
              View All Areas →
            </Link>
          </div>
          <Button href="/estimate" variant="primary" size="sm">Get a Free Estimate</Button>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted font-barlow font-300">
          <div>
            <p>© {new Date().getFullYear()} Forge Point Property Services · Aaron Dolph, Proprietor</p>
            <p className="text-[10px] text-white/25 mt-0.5">
              Aaron R. Dolph · Colorado Real Estate Broker · License #FA100100755 · Employing Broker: Triumph Real Estate Corporation #ER1325490
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span className="text-white/20">·</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
