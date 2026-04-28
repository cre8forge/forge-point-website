"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ConsentLevel = "all" | "analytics" | "none";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag:      (...args: unknown[]) => void;
  }
}

function applyConsent(level: ConsentLevel) {
  if (typeof window === "undefined") return;
  const g = window.gtag;
  if (typeof g !== "function") return;

  if (level === "all") {
    g("consent", "update", {
      ad_storage:          "granted",
      ad_user_data:        "granted",
      ad_personalization:  "granted",
      analytics_storage:   "granted",
    });
  } else if (level === "analytics") {
    g("consent", "update", {
      analytics_storage: "granted",
    });
  }
  // "none" — leave defaults (denied)
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("fp_consent")) setVisible(true);
  }, []);

  function choose(level: ConsentLevel) {
    localStorage.setItem("fp_consent", level);
    applyConsent(level);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[300] bg-[#0C1929] border-t border-white/12 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 font-barlow font-300 text-sm text-white/60 leading-relaxed">
          We use cookies to understand how visitors use our site and to improve our advertising.{" "}
          <Link href="/privacy" className="text-orange hover:text-amber underline-offset-2 underline transition-colors">
            Privacy Policy
          </Link>
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => choose("none")}
            className="font-condensed font-600 text-xs uppercase tracking-wide
                       text-white/35 hover:text-white/70 transition-colors px-3 py-2"
          >
            Decline
          </button>
          <button
            onClick={() => choose("analytics")}
            className="font-condensed font-600 text-xs uppercase tracking-wide
                       border border-white/15 hover:border-white/40 text-white/60 hover:text-white
                       transition-colors px-4 py-2"
          >
            Analytics Only
          </button>
          <button
            onClick={() => choose("all")}
            className="font-condensed font-600 text-xs uppercase tracking-wide
                       bg-orange hover:bg-amber text-white transition-colors px-4 py-2"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
