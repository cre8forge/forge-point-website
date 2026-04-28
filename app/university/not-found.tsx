import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function UniversityNotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-navy flex items-center justify-center px-6 pt-16">
        <div className="text-center max-w-lg">

          {/* Eyebrow */}
          <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-6">
            Forge Point University
          </p>

          <h1 className="font-cinzel font-700 text-white text-2xl md:text-3xl uppercase tracking-widest mb-5 leading-tight">
            This Guide Doesn&apos;t Exist Yet
          </h1>

          <p className="font-cormorant italic font-300 text-amber text-xl leading-relaxed mb-3">
            You may have followed a link to an article that&apos;s still in progress.
          </p>

          <p className="font-barlow font-300 text-white/55 text-sm leading-relaxed mb-10 max-w-md mx-auto">
            We publish new guides regularly across investment strategy, property
            management, renovation ROI, and more. Head back to the University hub
            to see everything that&apos;s live — or search for what you need.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="primary" href="/university">
              Back to University
            </Button>
            <Button variant="secondary" href="/contact">
              Ask Us Directly
            </Button>
          </div>

          {/* Category shortcuts */}
          <div className="mt-14 border-t border-white/8 pt-10">
            <p className="font-condensed font-600 text-xs uppercase tracking-widest text-white/35 mb-5">
              Browse by Topic
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: "Investment Strategy",  href: "/university/investment-strategy"  },
                { label: "Property Management",  href: "/university/property-management"  },
                { label: "Renovation & Rehab",   href: "/university/renovation-rehab"     },
                { label: "Outdoor Living",        href: "/university/outdoor-living"       },
                { label: "Property Maintenance", href: "/university/property-maintenance" },
                { label: "Lawn & Turf",          href: "/university/lawn-turf"            },
                { label: "HOA & Commercial",     href: "/university/hoa-commercial"       },
                { label: "Colorado Living",      href: "/university/colorado-living"      },
              ].map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="font-condensed font-600 text-xs uppercase tracking-wide text-white/50 hover:text-orange border border-white/10 hover:border-orange/40 px-3 py-1.5 transition-colors"
                >
                  {cat.label}
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
