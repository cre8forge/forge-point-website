import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const SERVICE_LINKS = [
  { label: "Grounds Maintenance",         href: "/services/grounds-maintenance"           },
  { label: "Lawn Care",                   href: "/services/lawn-care"                     },
  { label: "Landscape Design & Install",  href: "/services/landscape-design-install"      },
  { label: "Renovation & Remodel",        href: "/services/renovation-remodel"            },
  { label: "Investment Property Rehab",   href: "/services/investment-property-rehab"     },
  { label: "Property Management",         href: "/services/property-management"           },
  { label: "Single Family Management",    href: "/services/single-family-management"      },
  { label: "Multifamily & HOA",           href: "/services/multifamily-hoa-management"    },
  { label: "Commercial & Industrial",     href: "/services/commercial-industrial-management" },
  { label: "Boots-on-Ground Response",    href: "/services/boots-on-ground-response"      },
  { label: "Maintenance Coordination",    href: "/services/maintenance-coordination"      },
];

export default function ServicesNotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-navy flex items-center justify-center px-6 pt-16">
        <div className="text-center max-w-xl">

          <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-6">
            Services
          </p>

          <h1 className="font-cinzel font-700 text-white text-2xl md:text-3xl uppercase tracking-widest mb-5 leading-tight">
            Service Page Not Found
          </h1>

          <p className="font-cormorant italic font-300 text-amber text-xl leading-relaxed mb-3">
            We may have restructured this page — or it never existed.
          </p>

          <p className="font-barlow font-300 text-white/55 text-sm leading-relaxed mb-10 max-w-md mx-auto">
            Forge Point serves Northern Colorado with property management, grounds
            maintenance, renovation, and landscape services. Find the right service
            below or contact us and we&apos;ll point you in the right direction.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="primary" href="/services">
              All Services
            </Button>
            <Button variant="secondary" href="/contact">
              Contact Us
            </Button>
          </div>

          {/* Service shortcuts */}
          <div className="mt-14 border-t border-white/8 pt-10">
            <p className="font-condensed font-600 text-xs uppercase tracking-widest text-white/35 mb-5">
              Browse Our Services
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {SERVICE_LINKS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="font-condensed font-600 text-xs uppercase tracking-wide text-white/50 hover:text-orange border border-white/10 hover:border-orange/40 px-3 py-1.5 transition-colors"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
