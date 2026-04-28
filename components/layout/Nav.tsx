"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SiteSearch } from "@/components/ui/SiteSearch";

// ── Grouped service navigation ────────────────────────────────────

const SERVICE_GROUPS = [
  {
    label:    "Forge Point Advisory",
    accent:   true, // amber highlight treatment
    services: [
      { label: "Buyer Representation",          href: "/services/buyer-representation" },
      { label: "Seller Representation",         href: "/services/seller-representation" },
      { label: "Investment Acquisition Analysis",href: "/services/investment-acquisition-analysis" },
      { label: "Commercial Leasing Advisory",   href: "/services/commercial-leasing-advisory" },
      { label: "Portfolio Strategy",            href: "/services/portfolio-strategy" },
      { label: "1031 Exchange Coordination",    href: "/services/1031-exchange" },
    ],
  },
  {
    label: "Property & Portfolio Mgmt",
    services: [
      { label: "Commercial & Industrial Mgmt",  href: "/services/property-management" },
      { label: "Multifamily & HOA Management",  href: "/services/property-management" },
      { label: "Single Family Home Management", href: "/services/property-management" },
      { label: "Boots-on-Ground Response",      href: "/services/property-management" },
      { label: "Maintenance Coordination",      href: "/services/property-management" },
    ],
  },
  {
    label: "Custom Interiors",
    services: [
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
    services: [
      { label: "Landscape Design & Install",     href: "/services/landscape-design-install" },
      { label: "Decks, Pergolas & Patios",        href: "/services/decks-pergolas-patios" },
      { label: "Custom Water Features",           href: "/services/custom-water-features" },
      { label: "Fencing & Retaining Walls",       href: "/services/fencing" },
      { label: "Grounds Maintenance",             href: "/services/grounds-maintenance" },
      { label: "Industrial Maintenance",          href: "/services/industrial-maintenance" },
      { label: "Pressure Washing & Windows",      href: "/services/power-window-washing" },
      { label: "Junk Haul Off & Cleanouts",       href: "/services/junk-haul-off" },
    ],
  },
  {
    label: "Concierge & Estate Services",
    services: [
      { label: "Estate Housekeeping",          href: "/services/housekeeping-cleaning" },
      { label: "Home Safety & Wellness Checks",href: "/services/home-safety-checks" },
      { label: "Mobile Auto Detailing",        href: "/services/mobile-auto-detailing" },
      { label: "Yard & Pet Waste Management",  href: "/services/poop-scooping" },
      { label: "Concierge Errands",            href: "/services/errand-services" },
    ],
  },
];

const navLinks = [
  { label: "Service Area", href: "/service-area" },
  { label: "Estimate",     href: "/estimate" },
  { label: "University",   href: "/university" },
  { label: "FAQ",          href: "/faq" },
  { label: "Contact",      href: "/contact" },
];

// ── Nav ───────────────────────────────────────────────────────────

export function Nav() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openGroup, setOpenGroup]     = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop / base nav bar ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-navy border-b border-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.png"
              alt="Forge Point Property Services"
              width={38}
              height={38}
              className="object-contain"
            />
            <span className="font-cinzel font-900 text-white text-lg tracking-[0.25em] uppercase group-hover:text-amber transition-colors">
              FORGE POINT
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">

            {/* Services grouped dropdown */}
            <li className="relative group/services">
              <Link
                href="/services"
                className="flex items-center gap-1 font-condensed font-600 text-sm uppercase tracking-wide text-white/80 hover:text-white transition-colors py-5"
                aria-haspopup="true"
              >
                Services
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200 group-hover/services:rotate-180"
                />
              </Link>

              {/* Wide grouped dropdown panel */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover/services:block w-[1060px] max-w-[calc(100vw-3rem)]">
                <div className="mt-0 bg-navy border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                  <div className="grid grid-cols-5 divide-x divide-white/10">
                    {SERVICE_GROUPS.map((group) => (
                      <div key={group.label} className={cn("py-4", group.accent && "border-t-2 border-amber/60")}>
                        <p className={cn(
                          "px-4 pb-2 font-condensed font-600 text-xs uppercase tracking-widest",
                          group.accent ? "text-amber" : "text-orange"
                        )}>
                          {group.label}
                        </p>
                        {group.services.map((s) => (
                          <Link
                            key={s.label}
                            href={s.href}
                            className="block px-4 py-1.5 font-barlow font-400 text-xs text-white/70 hover:text-white hover:bg-white/5 hover:border-l-[2px] hover:border-l-orange transition-all"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 px-5 py-2.5">
                    <Link
                      href="/services"
                      className="font-condensed font-600 text-xs uppercase tracking-widest text-white/50 hover:text-orange transition-colors"
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            {/* Other nav links */}
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-condensed font-600 text-sm uppercase tracking-wide text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop search + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <SiteSearch variant="icon" />
            <Button href="/estimate" variant="primary" size="sm">
              Get Estimate
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-navy flex flex-col">
          {/* Header row */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={() => setMobileOpen(false)}
            >
              <Image
                src="/logo.png"
                alt="Forge Point Property Services"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-cinzel font-900 text-white text-base tracking-[0.25em] uppercase">
                FORGE POINT
              </span>
            </Link>
            <button
              className="text-white p-1"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-1">
            {/* Mobile search */}
            <div className="mb-4">
              <SiteSearch variant="input" />
            </div>

            {/* Services accordion — grouped */}
            <div>
              <button
                className="w-full flex items-center justify-between font-condensed font-600 text-base uppercase tracking-wide text-white/80 py-3 border-b border-white/10"
                onClick={() => setServicesOpen((v) => !v)}
              >
                Services
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform duration-200",
                    servicesOpen && "rotate-180"
                  )}
                />
              </button>

              {servicesOpen && (
                <div className="mt-2 space-y-1">
                  {SERVICE_GROUPS.map((group) => (
                    <div key={group.label}>
                      {/* Group header — expandable */}
                      <button
                        className="w-full flex items-center justify-between px-2 py-2 font-condensed font-600 text-xs uppercase tracking-widest text-orange border-b border-white/5"
                        onClick={() =>
                          setOpenGroup((g) =>
                            g === group.label ? null : group.label
                          )
                        }
                      >
                        {group.label}
                        <ChevronDown
                          size={12}
                          className={cn(
                            "transition-transform duration-200",
                            openGroup === group.label && "rotate-180"
                          )}
                        />
                      </button>

                      {openGroup === group.label && (
                        <ul className="pl-4 mb-1">
                          {group.services.map((s, i) => (
                            <li key={`${s.href}-${i}`}>
                              <Link
                                href={s.href}
                                className="block font-barlow font-300 text-sm text-white/65 hover:text-white py-2 border-b border-white/5 transition-colors"
                                onClick={() => setMobileOpen(false)}
                              >
                                {s.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Other links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block font-condensed font-600 text-base uppercase tracking-wide text-white/80 hover:text-white py-3 border-b border-white/10 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div className="px-6 py-6 border-t border-white/10">
            <Button
              href="/estimate"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => setMobileOpen(false)}
            >
              Get a Free Estimate
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
