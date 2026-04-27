import Image from "next/image";
import Link from "next/link";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";

const SERVICE_GROUPS = [
  {
    label: "Custom Interiors",
    links: [
      { label: "Renovation & Remodel",  href: "/services/renovation-remodel" },
      { label: "Framing & Finishes",    href: "/services/framing-finishes" },
      { label: "Kitchen, Bath & More",  href: "/services/kitchen-bath-more" },
    ],
  },
  {
    label: "Outdoor Living",
    links: [
      { label: "Bespoke Landscaping",      href: "/services/landscape-design-install" },
      { label: "Decks, Pergolas & Patios", href: "/services/decks-pergolas-patios" },
      { label: "Fencing & Retaining Walls",href: "/services/fencing" },
      { label: "Custom Water Features",    href: "/services/custom-water-features" },
    ],
  },
  {
    label: "Grounds & Estates",
    links: [
      { label: "Full-Service Grounds Maintenance",  href: "/services/grounds-maintenance" },
      { label: "HOA & Commercial Management",       href: "/services/hoa-commercial-property" },
      { label: "Industrial Property Maintenance",   href: "/services/industrial-maintenance" },
      { label: "Pressure Washing & Window Cleaning",href: "/services/power-window-washing" },
      { label: "Junk Haul Off",                     href: "/services/junk-haul-off" },
      { label: "Property Management",               href: "/services/property-management" },
    ],
  },
  {
    label: "Domestic Services",
    links: [
      { label: "Mobile Auto Detailing",   href: "/services/mobile-auto-detailing" },
      { label: "Housekeeping & Cleaning", href: "/services/housekeeping-cleaning" },
      { label: "Poop Scooping",           href: "/services/poop-scooping" },
      { label: "Home Safety Checks",      href: "/services/home-safety-checks" },
      { label: "Errand Services",         href: "/services/errand-services" },
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

        {/* Five-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">

          {/* ── Col 1: Brand ── */}
          <div className="space-y-5">
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-barlow font-300">
          <p>© {new Date().getFullYear()} Forge Point Property Services · Aaron Dolph, Proprietor</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span className="text-white/20">·</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
