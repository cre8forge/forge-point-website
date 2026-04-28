"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SearchResult } from "@/app/api/search/route";

export function UniversitySearchBar() {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen]       = useState(false);
  const inputRef              = useRef<HTMLInputElement>(null);
  const containerRef          = useRef<HTMLDivElement>(null);
  const pathname              = usePathname();

  // Close on navigation
  useEffect(() => { setOpen(false); setQuery(""); }, [pathname]);

  // Close on outside click
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  // Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Debounced search
  const doSearch = useCallback((q: string) => {
    if (q.length < 2) { setResults([]); setLoading(false); return; }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res  = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 220);
    return timer;
  }, []);

  useEffect(() => {
    const timer = doSearch(query);
    return () => { if (timer) clearTimeout(timer); };
  }, [query, doSearch]);

  const showDropdown = open && query.length >= 2;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search articles, guides, and how-tos..."
          className="
            w-full h-[52px] md:h-[52px] h-[44px]
            pl-6 pr-14
            rounded-full
            border-2 border-[#E5E7EB]
            focus:border-[#C85A00] focus:outline-none
            bg-white
            font-barlow font-300 text-[#0D1B2A] placeholder:text-gray-400
            text-sm
            transition-colors
            shadow-sm
          "
          aria-label="Search university articles"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
          {loading ? (
            <div className="w-[18px] h-[18px] border-2 border-[#C85A00]/30 border-t-[#C85A00] rounded-full animate-spin" />
          ) : (
            <Search size={18} className="text-[#C85A00]" />
          )}
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E5E7EB] shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-50 max-h-80 overflow-y-auto rounded-lg">
          {results.length > 0 ? (
            <ul className="divide-y divide-[#F3F4F6]">
              {results.map((r, i) => (
                <li key={i}>
                  <Link
                    href={r.href}
                    onClick={() => { setOpen(false); setQuery(""); }}
                    className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-barlow font-400 text-sm text-[#0D1B2A] group-hover:text-[#C85A00] transition-colors truncate">
                        {r.title}
                      </p>
                      {r.description && (
                        <p className="font-barlow font-300 text-xs text-gray-400 mt-0.5 line-clamp-1">
                          {r.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : !loading ? (
            <div className="px-5 py-8 text-center">
              <p className="font-barlow font-300 text-sm text-gray-400">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="font-barlow font-300 text-xs text-gray-300 mt-1">
                Try a topic, service name, or guide subject
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
