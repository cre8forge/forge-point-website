"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { analytics } from "@/lib/analytics";
import {
  ESTIMATOR_TABS,
  type StaticService,
} from "@/lib/estimator-data";

// ── Keep exported types for backward compatibility with any importers ─

export interface EstimatorService {
  id:            string;
  name:          string;
  unit:          string;
  description:   string | null;
  override_low:  number | null;
  override_high: number | null;
  homewyse_material_low:     number | null;
  homewyse_material_high:    number | null;
  homewyse_labor_hours_low:  number | null;
  homewyse_labor_hours_high: number | null;
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

// ── Helpers ───────────────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function calcRange(svc: StaticService, qty: number): { low: number; high: number } {
  if (svc.isFree) return { low: 0, high: 0 };
  const q = svc.isFlat ? 1 : qty;
  return { low: svc.lowPerUnit * q, high: svc.highPerUnit * q };
}

// ── Advisory callout (inline tab version) ────────────────────────

function AdvisoryCalloutTab() {
  return (
    <div className="border border-amber/20 bg-[#0D1B2A] p-8 md:p-10">
      <p className="font-condensed font-600 text-xs uppercase tracking-[0.25em] text-amber mb-3">
        Forge Point Real Estate
      </p>
      <h3 className="font-cinzel font-700 text-white text-xl md:text-2xl uppercase tracking-wide mb-4 normal-case">
        Real Estate Advisory Isn&apos;t Estimated Online
      </h3>
      <p className="font-barlow font-300 text-white/65 text-sm leading-relaxed mb-2 max-w-2xl">
        Buying, selling, or evaluating an investment property isn&apos;t a quantity-times-rate
        calculation. The value Forge Point Real Estate delivers is in the analysis, the market
        knowledge, and the judgment built from 15 years managing the properties you&apos;re
        considering.
      </p>
      <p className="font-barlow font-300 text-white/65 text-sm leading-relaxed mb-6 max-w-2xl">
        There&apos;s no form for that. There&apos;s a conversation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        {[
          {
            title: "Buyer & Seller Representation",
            body:  "Commission-based. No upfront cost to buyers. Competitive seller rates. Ask us.",
          },
          {
            title: "Investment Acquisition Analysis",
            body:  "Flat-fee written report. Cap rate, cash-on-cash, deferred maintenance assessment.",
          },
          {
            title: "Portfolio Strategy & 1031 Coordination",
            body:  "Hourly or flat-fee engagement. Scope defined at first consultation.",
          },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="text-amber text-[10px] mt-1 flex-shrink-0">◆</span>
            <div>
              <p className="font-condensed font-600 text-xs uppercase tracking-wide text-amber mb-1">
                {item.title}
              </p>
              <p className="font-barlow font-300 text-xs text-white/55 leading-relaxed">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button href="/contact" variant="primary">
        Schedule a No-Obligation Consultation →
      </Button>

      <p className="font-barlow font-300 text-[10px] text-white/22 mt-5 leading-relaxed">
        Aaron R. Dolph · Licensed CO Broker #FA100100755 · Employing Broker: Triumph Real Estate Corporation #ER1325490
      </p>
    </div>
  );
}

// ── Management callout (inline tab version) ───────────────────────

function ManagementCalloutTab() {
  return (
    <div className="border border-white/10 bg-card p-8 md:p-10">
      <p className="font-condensed font-600 text-xs uppercase tracking-[0.25em] text-orange mb-3">
        Property &amp; Portfolio Management
      </p>
      <h3 className="font-cinzel font-700 text-white text-xl md:text-2xl uppercase tracking-wide mb-4 normal-case">
        Management Fees Are Scoped to Your Property
      </h3>
      <p className="font-barlow font-300 text-white/65 text-sm leading-relaxed mb-2 max-w-2xl">
        Management pricing depends on property type, number of units, scope of services, and
        current condition. A single-family rental is priced differently than a 20-unit
        multifamily or a commercial warehouse.
      </p>
      <p className="font-barlow font-300 text-white/65 text-sm leading-relaxed mb-6 max-w-2xl">
        The fastest path to an accurate number is a 15-minute call. We&apos;ll ask the right
        questions and give you a real figure — not a range that&apos;s useless until you call
        anyway.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        {[
          {
            title: "Single Family Homes",
            body:  "Typically 8–12% of monthly rent. Tenant placement, rent collection, maintenance coordination, and inspections.",
          },
          {
            title: "Multifamily & HOA",
            body:  "Scoped per unit count and service level. Full-service or maintenance-only packages available.",
          },
          {
            title: "Commercial & Industrial",
            body:  "Scoped per square footage and services. Triple-net, gross, and modified gross leases all handled.",
          },
          {
            title: "Boots-on-Ground Response",
            body:  "24-hour field response for emergencies in our service area — no call centers, no delays.",
          },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="text-orange text-[10px] mt-1 flex-shrink-0">◆</span>
            <div>
              <p className="font-condensed font-600 text-xs uppercase tracking-wide text-orange mb-1">
                {item.title}
              </p>
              <p className="font-barlow font-300 text-xs text-white/55 leading-relaxed">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button href="/contact" variant="primary">
        Request a Management Consultation →
      </Button>
    </div>
  );
}

// ── Estimator row ─────────────────────────────────────────────────

interface RowProps {
  svc:   StaticService;
  qty:   number;
  onQty: (val: number) => void;
}

function EstimatorRow({ svc, qty, onQty }: RowProps) {
  const { low, high } = calcRange(svc, qty);
  const hasQty = qty > 0;

  if (svc.isFree) {
    return (
      <div className="bg-card border border-white/8 p-4 flex items-center justify-between gap-4">
        <div>
          <p className="font-condensed font-600 text-white text-xs uppercase tracking-wide">
            {svc.name}
          </p>
          <p className="font-barlow font-300 text-[10px] text-muted mt-0.5">{svc.unit}</p>
        </div>
        <span className="font-condensed font-600 text-xs text-amber tracking-wide flex-shrink-0">
          Free
        </span>
      </div>
    );
  }

  if (svc.isFlat) {
    return (
      <div
        className={cn(
          "bg-card border p-4 flex items-center justify-between gap-4 transition-all duration-150",
          hasQty ? "border-orange/50" : "border-white/8 hover:border-white/20"
        )}
      >
        <div className="flex-1 min-w-0">
          <p className="font-condensed font-600 text-white text-xs uppercase tracking-wide leading-snug">
            {svc.name}
          </p>
          <p className="font-barlow font-300 text-[10px] text-muted mt-0.5">
            {fmt(svc.lowPerUnit)} – {fmt(svc.highPerUnit)}
          </p>
        </div>
        <button
          onClick={() => onQty(hasQty ? 0 : 1)}
          className={cn(
            "font-condensed font-600 text-[10px] uppercase tracking-wide px-3 py-1.5 border transition-all flex-shrink-0",
            hasQty
              ? "bg-orange text-white border-orange"
              : "bg-transparent text-white/50 border-white/20 hover:border-orange/50 hover:text-white"
          )}
        >
          {hasQty ? "✓ Added" : "Add"}
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-card border p-4 transition-all duration-150",
        hasQty ? "border-orange/50" : "border-white/8 hover:border-white/20"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="font-condensed font-600 text-white text-xs uppercase tracking-wide leading-snug">
          {svc.name}
        </p>
        {hasQty && <span className="text-orange text-[10px] flex-shrink-0 mt-0.5">◆</span>}
      </div>

      <div className="flex items-center gap-2 bg-navy/60 border border-white/12 px-3 py-2">
        <input
          type="number"
          min="0"
          placeholder="0"
          value={qty === 0 ? "" : qty}
          onChange={(e) => onQty(Math.max(0, parseFloat(e.target.value) || 0))}
          className="w-full bg-transparent font-barlow text-sm text-white placeholder:text-white/30 outline-none"
        />
        <span className="font-condensed text-[10px] text-muted whitespace-nowrap flex-shrink-0">
          {svc.unit}
        </span>
      </div>

      {hasQty && (
        <p className="font-condensed font-600 text-orange text-xs mt-2 tracking-wide">
          {fmt(low)} – {fmt(high)}
        </p>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────

export function EstimatorTool({
  // Legacy props accepted but unused (DB-driven arch kept for future admin panel)
  categories: _categories,
  settings:   _settings,
  initialCategory,
}: {
  categories?:      EstimatorCategory[];
  settings?:        PricingSettings;
  initialCategory?: string;
}) {
  const searchParams  = useSearchParams();
  const paramTab      = searchParams.get("tab") ?? searchParams.get("category") ?? initialCategory ?? "";

  const [activeTab, setActiveTab] = useState<string>(() => {
    const match = ESTIMATOR_TABS.find((t) => t.id === paramTab);
    return match?.id ?? ESTIMATOR_TABS[2].id; // default to Custom Interiors
  });

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // ── Estimate email capture state ────────────────────────────────
  const [captureEmail,     setCaptureEmail]     = useState("");
  const [captureStatus,    setCaptureStatus]    = useState<"idle" | "loading" | "success" | "error">("idle");
  const [captureSubmitted, setCaptureSubmitted] = useState(false);

  // Check sessionStorage on mount to avoid showing the capture twice
  useEffect(() => {
    try {
      if (sessionStorage.getItem("forge_estimate_capture_submitted") === "true") {
        setCaptureSubmitted(true);
      }
    } catch {}
  }, []);

  async function handleCaptureSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!captureEmail) return;
    setCaptureStatus("loading");
    try {
      const estimateStr = `${fmt(total.low)} – ${fmt(total.high)}`;
      const fd = new FormData();
      fd.set("name",         "Estimate Capture");
      fd.set("email",        captureEmail);
      fd.set("description",  `Estimate saved from estimator: ${estimateStr}`);
      fd.set("source",       "estimate_capture");
      fd.set("pageUrl",      typeof window !== "undefined" ? window.location.href : "");
      await fetch("/api/contact", { method: "POST", body: fd });
      if (typeof window !== "undefined" && (window as any).$crisp) {
        (window as any).$crisp.push(["set", "user:email", [captureEmail]]);
      }
      try { sessionStorage.setItem("forge_estimate_capture_submitted", "true"); } catch {}
      setCaptureStatus("success");
      setCaptureSubmitted(true);
    } catch {
      setCaptureStatus("error");
    }
  }

  useEffect(() => {
    const slug = searchParams.get("tab") ?? searchParams.get("category");
    if (slug) {
      const match = ESTIMATOR_TABS.find((t) => t.id === slug);
      if (match) setActiveTab(match.id);
    }
  }, [searchParams]);

  const currentTab = ESTIMATOR_TABS.find((t) => t.id === activeTab);

  function setQty(id: string, val: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, val) }));
  }

  // All added line items across all tabs
  const lineItems = useMemo(() => {
    const items: {
      svc:     StaticService;
      qty:     number;
      low:     number;
      high:    number;
      tabName: string;
    }[] = [];

    for (const tab of ESTIMATOR_TABS) {
      if (!tab.services) continue;
      for (const svc of tab.services) {
        const qty = quantities[svc.id] ?? 0;
        if (qty > 0) {
          const { low, high } = calcRange(svc, qty);
          items.push({ svc, qty, low, high, tabName: tab.shortLabel });
        }
      }
    }
    return items;
  }, [quantities]);

  const total = useMemo(
    () =>
      lineItems.reduce(
        (acc, i) => ({ low: acc.low + i.low, high: acc.high + i.high }),
        { low: 0, high: 0 }
      ),
    [lineItems]
  );

  const contactHref = useMemo(() => {
    if (lineItems.length === 0) return "/contact";
    const payload = {
      items: lineItems.map(({ svc, qty, low, high, tabName }) => ({
        name: svc.name,
        qty,
        unit: svc.unit,
        cat:  tabName,
        low:  Math.round(low),
        high: Math.round(high),
      })),
      low:  Math.round(total.low),
      high: Math.round(total.high),
    };
    return `/contact?estimate=${encodeURIComponent(JSON.stringify(payload))}`;
  }, [lineItems, total]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* ── Tab selector ────────────────────────────────────────── */}
      <div className="mb-8">
        <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-4">
          Select a Category
        </p>
        <div className="flex flex-wrap gap-2">
          {ESTIMATOR_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "font-condensed font-600 text-xs uppercase tracking-wide px-4 py-2 border transition-all duration-150",
                activeTab === tab.id
                  ? tab.type === "callout-advisory"
                    ? "bg-amber text-navy border-amber"
                    : "bg-orange text-white border-orange"
                  : "bg-transparent text-white/60 border-white/20 hover:border-orange/50 hover:text-white"
              )}
            >
              {tab.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ─────────────────────────────────────────── */}
      {currentTab?.type === "callout-advisory" && <AdvisoryCalloutTab />}
      {currentTab?.type === "callout-management" && <ManagementCalloutTab />}

      {currentTab?.type === "estimator" && currentTab.services && (
        <>
          <div className="mb-10">
            <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-4">
              Enter Quantities
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTab.services.map((svc) => (
                <EstimatorRow
                  key={svc.id}
                  svc={svc}
                  qty={quantities[svc.id] ?? 0}
                  onQty={(v) => setQty(svc.id, v)}
                />
              ))}
            </div>
          </div>

          {/* ── Summary panel ─────────────────────────────────── */}
          <div className="border border-white/12 p-6 bg-card">
            <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-5">
              Your Estimate
            </p>

            {lineItems.length === 0 ? (
              <p className="font-barlow font-300 text-muted text-sm">
                Enter quantities above to see your estimate here.
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-5">
                  {lineItems.map(({ svc, qty, low, high, tabName }) => (
                    <div key={svc.id} className="flex items-start justify-between gap-4 text-sm">
                      <div className="flex-1 min-w-0">
                        <span className="font-barlow font-300 text-white block truncate">
                          {svc.name}
                        </span>
                        <span className="font-condensed text-xs text-muted">
                          {svc.isFlat ? "flat" : `${qty.toLocaleString()} ${svc.unit}`} · {tabName}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="font-condensed font-600 text-white text-xs whitespace-nowrap">
                          {fmt(low)} – {fmt(high)}
                        </span>
                        <button
                          onClick={() => setQty(svc.id, 0)}
                          className="text-white/30 hover:text-white/70 text-xs transition-colors"
                          aria-label={`Remove ${svc.name}`}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

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

                {/* Email capture — shown once per session when result is visible */}
                {!captureSubmitted && (
                  <div
                    className="mb-5 p-4 rounded-sm"
                    style={{ background: "rgba(212,152,26,0.07)", borderLeft: "3px solid #D4981A" }}
                  >
                    <p className="font-condensed font-600 text-xs uppercase tracking-[0.15em] text-amber mb-1">
                      Save Your Estimate
                    </p>
                    <p className="font-barlow font-300 text-xs text-white/60 leading-relaxed mb-3">
                      Enter your email and we&apos;ll send you this estimate along with a free improvement
                      recommendations report for your property.
                    </p>
                    {captureStatus === "success" ? (
                      <p className="font-barlow font-300 text-xs text-amber">
                        Sent! Check your inbox.
                      </p>
                    ) : (
                      <form onSubmit={handleCaptureSubmit} className="flex gap-2">
                        <input
                          type="email"
                          required
                          value={captureEmail}
                          onChange={(e) => setCaptureEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1 min-w-0 bg-navy border border-white/20 text-white
                                     placeholder:text-white/30 font-barlow font-300 text-xs
                                     px-3 py-2 outline-none focus:border-amber/60 transition-colors"
                        />
                        <button
                          type="submit"
                          disabled={captureStatus === "loading"}
                          className="flex-shrink-0 bg-[#C85A00] text-white font-condensed font-600
                                     text-xs uppercase tracking-wide px-4 py-2 hover:bg-amber
                                     transition-colors disabled:opacity-50"
                        >
                          {captureStatus === "loading" ? "…" : "Send →"}
                        </button>
                      </form>
                    )}
                    <p className="font-barlow font-300 text-[10px] text-white/30 mt-2">
                      We won&apos;t share your email. Unsubscribe anytime.
                    </p>
                  </div>
                )}
              </>
            )}

            <p className="font-barlow font-300 text-muted text-xs leading-relaxed mb-5">
              Ranges are estimates based on typical Northern Colorado pricing. Final cost depends
              on site conditions, material selection, and project scope. A site visit is required
              for firm pricing.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                href={contactHref}
                variant="primary"
                onClick={() => {
                  if (lineItems.length > 0) {
                    analytics.estimateRequested([
                      ...new Set(lineItems.map((i) => i.tabName)),
                    ]);
                  }
                }}
              >
                Request a Detailed Quote
              </Button>
              <Button href="tel:+17204191961" variant="secondary">
                Call (720) 419-1961
              </Button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
