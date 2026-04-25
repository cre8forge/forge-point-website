"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { FaqCategory } from "@/lib/faq-data";

interface FaqToolProps {
  categories: FaqCategory[];
}

const ALL_SLUG = "all";

export function FaqTool({ categories }: FaqToolProps) {
  const [query,       setQuery]       = useState("");
  const [activeCat,  setActiveCat]   = useState(ALL_SLUG);
  const [openItem,   setOpenItem]    = useState<string | null>(null);

  const trimmed = query.trim().toLowerCase();

  // Filter categories + questions based on search + category tab
  const filtered = useMemo(() => {
    return categories
      .filter((cat) => activeCat === ALL_SLUG || cat.slug === activeCat)
      .map((cat) => ({
        ...cat,
        questions: cat.questions.filter((q) => {
          if (!trimmed) return true;
          return (
            q.question.toLowerCase().includes(trimmed) ||
            q.answer.toLowerCase().includes(trimmed)
          );
        }),
      }))
      .filter((cat) => cat.questions.length > 0);
  }, [categories, activeCat, trimmed]);

  const totalVisible = filtered.reduce((n, c) => n + c.questions.length, 0);

  function toggleItem(key: string) {
    setOpenItem((prev) => (prev === key ? null : key));
  }

  function clearSearch() {
    setQuery("");
    setOpenItem(null);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* ── Search ──────────────────────────────────────────────── */}
      <div className="relative mb-8">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpenItem(null);
          }}
          placeholder="Search questions…"
          className="w-full bg-card border border-white/12 text-white placeholder:text-white/30
                     font-barlow font-300 text-sm pl-10 pr-10 py-3 outline-none
                     focus:border-orange/50 transition-colors"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Category tabs ───────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => { setActiveCat(ALL_SLUG); setOpenItem(null); }}
          className={cn(
            "font-condensed font-600 text-xs uppercase tracking-wide px-4 py-2 border transition-all duration-150",
            activeCat === ALL_SLUG
              ? "bg-orange text-white border-orange"
              : "bg-transparent text-white/60 border-white/20 hover:border-orange/50 hover:text-white"
          )}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => { setActiveCat(cat.slug); setOpenItem(null); }}
            className={cn(
              "font-condensed font-600 text-xs uppercase tracking-wide px-4 py-2 border transition-all duration-150",
              activeCat === cat.slug
                ? "bg-orange text-white border-orange"
                : "bg-transparent text-white/60 border-white/20 hover:border-orange/50 hover:text-white"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Results ─────────────────────────────────────────────── */}
      {totalVisible === 0 ? (

        /* No results */
        <div className="text-center py-16 border border-white/8 rounded-sm bg-card">
          <p className="font-condensed font-600 text-xs uppercase tracking-widest text-muted mb-2">
            No Results
          </p>
          <p className="font-barlow font-300 text-white text-sm mb-6">
            No questions match &ldquo;{query}&rdquo;
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={clearSearch}
              className="font-condensed font-600 text-xs uppercase tracking-widest text-orange hover:text-amber transition-colors"
            >
              Clear Search
            </button>
            <span className="text-white/20">·</span>
            <Button href="/contact" variant="secondary" size="sm">
              Contact Us Instead →
            </Button>
          </div>
        </div>

      ) : (

        /* Accordion sections */
        <div className="space-y-10">
          {filtered.map((cat) => (
            <div key={cat.slug}>

              {/* Section heading — only show when "All" is active */}
              {activeCat === ALL_SLUG && (
                <h2 className="font-cinzel font-700 text-white text-sm uppercase tracking-widest mb-4 border-l-2 border-orange pl-4">
                  {cat.label}
                </h2>
              )}

              <div className="space-y-px">
                {cat.questions.map((q, i) => {
                  const key  = `${cat.slug}-${i}`;
                  const open = openItem === key;

                  return (
                    <div key={key} className="border border-white/8 bg-card">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left
                                   hover:bg-white/3 transition-colors"
                        aria-expanded={open}
                      >
                        <span
                          className={cn(
                            "font-barlow font-300 text-sm leading-snug transition-colors",
                            open ? "text-white" : "text-white/80"
                          )}
                        >
                          {/* Highlight matching text in search */}
                          {trimmed
                            ? highlightMatch(q.question, trimmed)
                            : q.question}
                        </span>
                        <ChevronDown
                          size={16}
                          className={cn(
                            "flex-shrink-0 mt-0.5 text-orange transition-transform duration-200",
                            open && "rotate-180"
                          )}
                        />
                      </button>

                      {open && (
                        <div className="px-5 pb-5 border-t border-white/8">
                          <p className="font-barlow font-300 text-muted text-sm leading-relaxed pt-4">
                            {q.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      )}

    </div>
  );
}

// ── Highlight helper ─────────────────────────────────────────────

function highlightMatch(text: string, query: string): React.ReactNode {
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return text;

  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-orange/30 text-white rounded-sm px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}
