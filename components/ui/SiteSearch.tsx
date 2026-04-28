"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { SearchResult } from "@/app/api/search/route";

// ── Quick-link shortcuts shown before the user types ──────────────

const QUICK_LINKS = [
  { label: "Grounds Maintenance", href: "/services/grounds-maintenance" },
  { label: "Property Management", href: "/services/property-management" },
  { label: "Junk Haul Off",       href: "/services/junk-haul-off" },
  { label: "Fencing",             href: "/services/fencing" },
  { label: "Power Washing",       href: "/services/power-window-washing" },
  { label: "FAQ",                 href: "/faq" },
];

const TYPE_BADGE_COLOR: Record<SearchResult["type"], string> = {
  service:    "text-orange",
  faq:        "text-amber",
  university: "text-sky-400",
};

const TYPE_LABEL: Record<SearchResult["type"], string> = {
  service:    "Service",
  faq:        "FAQ",
  university: "Guide",
};

// ── Component ─────────────────────────────────────────────────────

interface SiteSearchProps {
  /** "icon" renders a magnifier button (for nav); "input" renders a fake input (for footer) */
  variant?: "icon" | "input";
}

export function SiteSearch({ variant = "icon" }: SiteSearchProps) {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef              = useRef<HTMLInputElement>(null);
  const pathname              = usePathname();

  // Close on navigation
  useEffect(() => { setOpen(false); }, [pathname]);

  // Keyboard: Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus input when modal opens; reset when it closes
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Debounced fetch
  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res  = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(timer);
  }, [query]);

  function close() { setOpen(false); }

  return (
    <>
      {/* ── Trigger ─────────────────────────────────────────────── */}
      {variant === "icon" ? (
        <button
          onClick={() => setOpen(true)}
          className="text-white/50 hover:text-white transition-colors p-1.5"
          aria-label="Search site"
        >
          <Search size={17} />
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-3 bg-navy/60 border border-white/10
                     px-4 py-3 text-white/35 hover:border-orange/40 hover:text-white/60
                     transition-colors font-barlow font-300 text-sm text-left"
        >
          <Search size={13} className="flex-shrink-0" />
          <span>Search services, FAQs, guides…</span>
        </button>
      )}

      {/* ── Modal overlay ────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[200] bg-[#0C1929]/90 backdrop-blur-sm
                     flex items-start justify-center pt-[8vh] px-4"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div className="w-full max-w-xl bg-[#0C1929] border border-white/12
                          shadow-[0_16px_48px_rgba(0,0,0,0.6)]">

            {/* Input row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search size={16} className="text-orange flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, FAQs, guides…"
                className="flex-1 bg-transparent text-white placeholder:text-white/25
                           font-barlow font-300 text-sm outline-none"
              />
              {loading && (
                <span className="font-barlow text-xs text-white/25 animate-pulse">
                  searching…
                </span>
              )}
              <button
                onClick={close}
                className="text-white/30 hover:text-white transition-colors p-0.5"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results list */}
            {results.length > 0 && (
              <ul className="max-h-[55vh] overflow-y-auto divide-y divide-white/5">
                {results.map((r, i) => (
                  <li key={i}>
                    <Link
                      href={r.href}
                      onClick={close}
                      className="flex items-start gap-4 px-5 py-3.5 hover:bg-white/5
                                 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={cn(
                            "font-condensed font-600 text-xs uppercase tracking-wide",
                            TYPE_BADGE_COLOR[r.type]
                          )}>
                            {r.badge}
                          </span>
                          <span className="text-white/20 text-xs">·</span>
                          <span className="font-condensed text-xs text-white/25 uppercase tracking-wide">
                            {TYPE_LABEL[r.type]}
                          </span>
                        </div>
                        <p className="font-barlow font-300 text-sm text-white/80
                                      group-hover:text-white transition-colors truncate">
                          {r.title}
                        </p>
                        <p className="font-barlow font-300 text-xs text-white/35 mt-0.5
                                      line-clamp-1">
                          {r.description}
                        </p>
                      </div>
                      <ArrowRight
                        size={13}
                        className="text-white/20 group-hover:text-orange transition-colors
                                   mt-1.5 flex-shrink-0"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* No results */}
            {query.length >= 2 && !loading && results.length === 0 && (
              <div className="px-5 py-10 text-center">
                <p className="font-barlow font-300 text-white/40 text-sm">
                  No results for &ldquo;{query}&rdquo;
                </p>
                <p className="font-barlow font-300 text-white/25 text-xs mt-1">
                  Try a service name, area, or topic
                </p>
              </div>
            )}

            {/* Quick links (before user types) */}
            {query.length < 2 && (
              <div className="px-5 py-5">
                <p className="font-condensed font-600 text-xs uppercase tracking-widest
                               text-white/20 mb-3">
                  Quick links
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className="font-condensed text-xs uppercase tracking-wide text-white/40
                                 hover:text-white border border-white/10 hover:border-orange/40
                                 px-3 py-1.5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
