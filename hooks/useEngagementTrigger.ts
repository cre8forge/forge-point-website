"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

// Pages where the popup NEVER fires
const EXCLUDED_PATHS = ["/", "/contact", "/estimate", "/faq", "/services", "/service-area"];

function isExcluded(pathname: string): boolean {
  return EXCLUDED_PATHS.some(
    (p) => pathname === p || (p !== "/" && pathname.startsWith(p + "/")) === false && pathname === p
  ) || EXCLUDED_PATHS.includes(pathname);
}

interface UseEngagementTriggerOptions {
  pageType: "university" | "service";
  onTrigger: () => void;
}

/**
 * Fires `onTrigger` based on page type:
 * - university:  70% scroll depth
 * - service:     60 seconds on page
 *
 * Respects:
 * - sessionStorage "forge_popup_shown"  — one per session
 * - localStorage   "forge_popup_dismissed_at" — 7-day cooldown after dismiss
 */
export function useEngagementTrigger({ pageType, onTrigger }: UseEngagementTriggerOptions) {
  const pathname  = usePathname();
  const fired     = useRef(false);

  const shouldSkip = useCallback((): boolean => {
    if (isExcluded(pathname)) return true;
    try {
      if (sessionStorage.getItem("forge_popup_shown") === "true") return true;
      const dismissedAt = localStorage.getItem("forge_popup_dismissed_at");
      if (dismissedAt) {
        const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - parseInt(dismissedAt, 10) < sevenDaysMs) return true;
      }
    } catch {}
    return false;
  }, [pathname]);

  const fire = useCallback(() => {
    if (fired.current || shouldSkip()) return;
    fired.current = true;
    try { sessionStorage.setItem("forge_popup_shown", "true"); } catch {}
    onTrigger();
  }, [shouldSkip, onTrigger]);

  useEffect(() => {
    if (shouldSkip()) return;

    if (pageType === "service") {
      // Fire after 30 seconds
      const timer = setTimeout(fire, 30_000);
      return () => clearTimeout(timer);
    }

    if (pageType === "university") {
      // Fire at 60% scroll depth
      function handleScroll() {
        const scrolled   = window.scrollY + window.innerHeight;
        const total      = document.documentElement.scrollHeight;
        if (scrolled / total >= 0.6) fire();
      }
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pageType, fire, shouldSkip]);
}
