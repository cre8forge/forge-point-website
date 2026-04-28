"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// ── Types (serialisable from server) ─────────────────────────────

export interface EstimatorService {
  id:            string;
  name:          string;
  unit:          string;
  description:   string | null;
  override_low:  number | null;
  override_high: number | null;
  homewyse_material_low:    number | null;
  homewyse_material_high:   number | null;
  homewyse_labor_hours_low: number | null;
  homewyse_labor_hours_high:number | null;
}

export interface EstimatorCategory {
  id:       string;
  name:     string;
  slug:     string;
  services: EstimatorService[];
}

export interface PricingSettings {
  MATERIAL_MARKUP:   number;
  LABOR_RATE:        number;
  MARKET_MULTIPLIER: number;
}

interface EstimatorToolProps {
  categories:      EstimatorCategory[];
  settings:        PricingSettings;
  initialCategory?: string; // slug from ?category= param
}

// ── Price calc ────────────────────────────────────────────────────

function calcRange(
  svc: EstimatorService,
  qty: number,
  s: PricingSettings
): { low: number; high: number } {
  if (qty <= 0) return { low: 0, high: 0 };

  if (svc.override_low !== null && svc.override_high !== null) {
    return { low: svc.override_low * qty, high: svc.override_high * qty };
  }

  const matLow  = (svc.homewyse_material_low    ?? 0) * s.MATERIAL_MARKUP;
  const matHigh = (svc.homewyse_material_high   ?? 0) * s.MATERIAL_MARKUP;
  const labLow  = (svc.homewyse_labor_hours_low  ?? 0) * s.LABOR_RATE;
  const labHigh = (svc.homewyse_labor_hours_high ?? 0) * s.LABOR_RATE;

  return {
    low:  (matLow  + labLow)  * s.MARKET_MULTIPLIER * qty,
    high: (matHigh + labHigh) * s.MARKET_MULTIPLIER * qty,
  };
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

// Default qty suggestions per unit type
function defaultQty(unit: string): number {
  const u = unit.toLowerCase();
  if (u.includes("sq ft"))     return 500;
  if (u.includes("linear ft")) return 100;
  if (u.includes("1,000 sq"))  return 5;
  if (u.includes("zone"))      return 4;
  if (u.includes("window"))    return 10;
  if (u.includes("yard"))      return 5;
  return 1;
}

// ── Component ─────────────────────────────────────────────────────

export function EstimatorTool({ categories, settings, initialCategory }: EstimatorToolProps) {
  const searchParams = useSearchParams();
  const paramCat = searchParams.get("category") ?? initialCategory ?? "";

  // Active category slug
  const [activeCat, setActiveCat] = useState<string>(() => {
    const match = categories.find((c) => c.slug === paramCat);
    return match?.slug ?? categories[0]?.slug ?? "";
  });

  // quantities: { [serviceId]: number }
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Sync activeCat when URL param changes
  useEffect(() => {
    const slug = searchParams.get("category");
    if (slug && categories.find((c) => c.slug === slug)) {
      setActiveCat(slug);
    }
  }, [searchParams, categories]);

  const currentCategory = categories.find((c) => c.slug === activeCat);

  // Line items: all services with qty > 0, across all categories
  const lineItems = useMemo(() => {
    const items: { svc: EstimatorService; qty: number; low: number; high: number; catName: string }[] = [];
    for (const cat of categories) {
      for (const svc of cat.services) {
        const qty = quantities[svc.id] ?? 0;
        if (qty > 0) {
          const { low, high } = calcRange(svc, qty, settings);
          items.push({ svc, qty, low, high, catName: cat.name });
        }
      }
    }
    return items;
  }, [quantities, categories, settings]);

  const total = useMemo(
    () => lineItems.reduce((acc, i) => ({ low: acc.low + i.low, high: acc.high + i.high }), { low: 0, high: 0 }),
    [lineItems]
  );

  const contactHref = useMemo(() => {
    if (lineItems.length === 0) return "/contact";
    const payload = {
      items: lineItems.map(({ svc, qty, low, high, catName }) => ({
        name: svc.name,
        qty,
        unit: svc.unit,
        cat:  catName,
        low:  Math.round(low),
        high: Math.round(high),
      })),
      low:  Math.round(total.low),
      high: Math.round(total.high),
    };
    return `/contact?estimate=${encodeURIComponent(JSON.stringify(payload))}`;
  }, [lineItems, total]);

  function setQty(id: string, val: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, val) }));
  }

  function removeItem(id: string) {
    setQuantities((prev) => ({ ...prev, [id]: 0 }));
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* ── Category tabs ─────────────────────────────────────── */}
      <div className="mb-10">
        <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-4">
          Step 1 — Choose a Category
        </p>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCat(cat.slug)}
              className={cn(
                "font-condensed font-600 text-xs uppercase tracking-wide px-4 py-2 border transition-all duration-150",
                activeCat === cat.slug
                  ? "bg-orange text-white border-orange"
                  : "bg-transparent text-white/60 border-white/20 hover:border-orange/50 hover:text-white"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Service cards ──────────────────────────────────────── */}
      {currentCategory && (
        <div className="mb-12">
          <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-4">
            Step 2 — Enter Quantities
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentCategory.services.map((svc) => {
              const qty = quantities[svc.id] ?? 0;
              const { low, high } = calcRange(svc, qty, settings);
              const hasQty = qty > 0;

              return (
                <div
                  key={svc.id}
                  className={cn(
                    "bg-card border rounded-sm p-5 transition-all duration-150",
                    hasQty ? "border-orange/50" : "border-white/8 hover:border-white/20"
                  )}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-condensed font-600 text-white text-sm uppercase tracking-wide leading-snug">
                        {svc.name}
                      </h3>
                      {svc.description && (
                        <p className="font-barlow font-300 text-muted text-xs mt-1 leading-snug">
                          {svc.description}
                        </p>
                      )}
                    </div>
                    {hasQty && (
                      <span className="text-orange text-xs flex-shrink-0 mt-0.5">◆</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-2 bg-navy/60 border border-white/12 px-3 py-2">
                      <input
                        type="number"
                        min="0"
                        placeholder={String(defaultQty(svc.unit))}
                        value={qty === 0 ? "" : qty}
                        onChange={(e) => setQty(svc.id, parseFloat(e.target.value) || 0)}
                        className="w-full bg-transparent font-barlow text-sm text-white placeholder:text-white/30 outline-none"
                      />
                      <span className="font-condensed text-xs text-muted whitespace-nowrap flex-shrink-0">
                        {svc.unit}
                      </span>
                    </div>
                  </div>

                  {hasQty && (
                    <p className="font-condensed font-600 text-orange text-xs mt-2 tracking-wide">
                      {fmt(low)} – {fmt(high)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Estimate summary ───────────────────────────────────── */}
      <div className="border border-white/12 rounded-sm p-6 bg-card">
        <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-5">
          Step 3 — Your Estimate
        </p>

        {lineItems.length === 0 ? (
          <p className="font-barlow font-300 text-muted text-sm">
            Enter quantities above to see your estimate here.
          </p>
        ) : (
          <>
            {/* Line items */}
            <div className="space-y-3 mb-5">
              {lineItems.map(({ svc, qty, low, high, catName }) => (
                <div key={svc.id} className="flex items-start justify-between gap-4 text-sm">
                  <div className="flex-1 min-w-0">
                    <span className="font-barlow font-300 text-white block truncate">
                      {svc.name}
                    </span>
                    <span className="font-condensed text-xs text-muted">
                      {qty.toLocaleString()} {svc.unit} · {catName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-condensed font-600 text-white text-xs whitespace-nowrap">
                      {fmt(low)} – {fmt(high)}
                    </span>
                    <button
                      onClick={() => removeItem(svc.id)}
                      className="text-white/30 hover:text-white/70 text-xs transition-colors"
                      aria-label={`Remove ${svc.name}`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/12 pt-4 mb-5">
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-700 text-white text-sm uppercase tracking-wide">
                  Total Estimate Range
                </span>
                <span className="font-cinzel font-700 text-orange text-base tracking-wide">
                  {fmt(total.low)} – {fmt(total.high)}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Disclaimer */}
        <p className="font-barlow font-300 text-muted text-xs leading-relaxed mb-5">
          ℹ Ranges are estimates based on typical Northern Colorado pricing. Final cost
          depends on site conditions, material selection, and project scope. A site visit
          is required for firm pricing.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Button href={contactHref} variant="primary">
            Request a Detailed Quote
          </Button>
          <Button href="tel:+17204191961" variant="secondary">
            Call (720) 419-1961
          </Button>
        </div>
      </div>

    </div>
  );
}
