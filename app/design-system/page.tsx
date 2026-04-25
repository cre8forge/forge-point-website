/**
 * Design System Gallery — review page only, not linked from anywhere.
 * Delete this route before launch.
 */

import { Button }        from "@/components/ui/Button";
import { Card }          from "@/components/ui/Card";
import { Divider }       from "@/components/ui/Divider";
import { Badge }         from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Nav }           from "@/components/layout/Nav";
import { Footer }        from "@/components/layout/Footer";

export default function DesignSystemPage() {
  return (
    <>
      <Nav />

      <main className="bg-navy min-h-screen pt-24 pb-0">
        <div className="max-w-5xl mx-auto px-6 space-y-20 pb-20">

          {/* ── Typography ──────────────────────────────────── */}
          <section>
            <p className="font-condensed text-xs uppercase tracking-widest text-orange mb-8">
              Typography
            </p>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl">Forge Point</h1>
              <h2 className="text-3xl">Landscape Design & Install</h2>
              <h3>Service Category</h3>
              <p className="font-barlow font-300 text-base text-white">
                Body copy at 16px weight 300 — Barlow. Property services for Northern Colorado homeowners and HOAs. Built to last, made to impress.
              </p>
              <p className="font-barlow font-400 text-muted text-sm">
                Secondary text at 65% opacity — used for supporting copy, descriptions, and captions.
              </p>
              <p className="font-cormorant italic font-300 text-xl text-amber">
                Your property. Our craft. Built to Last. Made to Impress.
              </p>
            </div>
          </section>

          <Divider />

          {/* ── Buttons ─────────────────────────────────────── */}
          <section>
            <p className="font-condensed text-xs uppercase tracking-widest text-orange mb-8">
              Buttons
            </p>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary"   size="sm">Get Estimate (sm)</Button>
                <Button variant="primary"   size="md">Get Estimate (md)</Button>
                <Button variant="primary"   size="lg">Get Estimate (lg)</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="secondary" size="sm">View Our Work (sm)</Button>
                <Button variant="secondary" size="md">View Our Work (md)</Button>
                <Button variant="secondary" size="lg">View Our Work (lg)</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary"  href="/estimate">Link → Estimate (primary)</Button>
                <Button variant="secondary" href="/services/fencing">Link → Fencing (secondary)</Button>
              </div>
            </div>
          </section>

          <Divider />

          {/* ── Badges ──────────────────────────────────────── */}
          <section>
            <p className="font-condensed text-xs uppercase tracking-widest text-orange mb-8">
              Badges
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">Licensed &amp; Insured</Badge>
              <Badge variant="primary">Northern Colorado</Badge>
              <Badge variant="outline">Erie, CO 80516</Badge>
              <Badge variant="outline">Free Estimates</Badge>
              <Badge variant="outline">HOA Specialist</Badge>
            </div>
          </section>

          <Divider />

          {/* ── Divider ─────────────────────────────────────── */}
          <section>
            <p className="font-condensed text-xs uppercase tracking-widest text-orange mb-8">
              Divider
            </p>
            <Divider />
          </section>

          <Divider />

          {/* ── Section Header ──────────────────────────────── */}
          <section>
            <p className="font-condensed text-xs uppercase tracking-widest text-orange mb-8">
              Section Header — Centered (with dividers)
            </p>
            <SectionHeader
              eyebrow="What We Do"
              heading="Our Services"
              subheading="From lawn care to full property management — we handle it all."
            />

            <div className="mt-12">
              <p className="font-condensed text-xs uppercase tracking-widest text-orange mb-8">
                Section Header — Left aligned (no dividers)
              </p>
              <SectionHeader
                heading="Landscape Design & Install"
                subheading="Transform your outdoor space with expert design and premium materials."
                dividers={false}
                align="left"
              />
            </div>
          </section>

          <Divider />

          {/* ── Cards ───────────────────────────────────────── */}
          <section>
            <p className="font-condensed text-xs uppercase tracking-widest text-orange mb-8">
              Cards
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card
                category="Landscaping"
                title="Landscape Design & Install"
                description="Custom design, grading, sod, plants, irrigation — full turnkey from concept to completion."
                href="/services/landscape-design-install"
              />
              <Card
                category="Grounds"
                title="Grounds Maintenance"
                description="Weekly or bi-weekly mowing, edging, trimming, cleanups, and seasonal treatments."
                href="/services/grounds-maintenance"
              />
              <Card
                category="Fencing"
                title="Fencing"
                description="Wood, vinyl, chain link, ornamental iron — supply and install or install-only."
                href="/services/fencing"
              />
              <Card
                category="Washing"
                title="Power & Window Washing"
                description="Driveways, decks, siding, and windows — restoring curb appeal inside and out."
                href="/services/power-window-washing"
              />
              <Card
                category="Industrial"
                title="Industrial Maintenance"
                description="Parking lots, warehouses, commercial facilities, and large-scale property upkeep."
                href="/services/industrial-maintenance"
              />
              <Card
                category="HOA"
                title="HOA & Commercial"
                description="Full-service HOA and commercial property management for communities and complexes."
                href="/services/hoa-commercial-property"
              />
            </div>
          </section>

        </div>

        {/* ── Footer (full width) ─────────────────────────── */}
      </main>

      <Footer />
    </>
  );
}
