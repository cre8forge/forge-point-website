"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download } from "lucide-react";

// ── Category config ───────────────────────────────────────────────

type UpgradeCategory = "investment-strategy" | "property-management" | "renovation-rehab" | "outdoor-lawn" | "default";

interface UpgradeConfig {
  label:       string;
  text:        string;
  buttonLabel: string;
  isLink?:     boolean;   // true → link to /estimate instead of email form
  linkHref?:   string;
}

const CATEGORY_CONFIG: Record<UpgradeCategory, UpgradeConfig> = {
  "investment-strategy": {
    label:       "Free Download",
    text:        "Get the complete Northern Colorado Investor Checklist as a PDF — pre-purchase walkthrough, BRRRR evaluation criteria, and market benchmarks in one document.",
    buttonLabel: "Download the Checklist →",
  },
  "property-management": {
    label:       "Free Download",
    text:        "Download the 2026 Colorado Landlord Compliance Summary — key statutes, response windows, and documentation requirements in one reference sheet.",
    buttonLabel: "Download the Guide →",
  },
  "renovation-rehab": {
    label:       "Free Download",
    text:        "Get the Northern Colorado Renovation ROI Guide — which projects pay back, which don't, and current cost ranges for every major renovation.",
    buttonLabel: "Download the Guide →",
  },
  "outdoor-lawn": {
    label:       "Free Estimate",
    text:        "Not sure what your outdoor project will cost? Get a free estimate — no site visit required for most services.",
    buttonLabel: "Get a Free Estimate →",
    isLink:      true,
    linkHref:    "/estimate",
  },
  "default": {
    label:       "Free Resource",
    text:        "Sign up to get free guides, market insights, and expert advice from our team.",
    buttonLabel: "Get the Guide →",
  },
};

function resolveCategory(category: string): UpgradeCategory {
  if (["investment-strategy", "renovation-rehab"].includes(category)) return category as UpgradeCategory;
  if (["property-management"].includes(category)) return "property-management";
  if (["lawn-turf", "outdoor-living", "outdoor-structures", "landscape-outdoor-living"].includes(category)) return "outdoor-lawn";
  return "default";
}

// ── Component ─────────────────────────────────────────────────────

interface UniversityContentUpgradeProps {
  category:    string;
  articleSlug: string;
}

export function UniversityContentUpgrade({ category, articleSlug }: UniversityContentUpgradeProps) {
  const resolvedCategory = resolveCategory(category);
  const config           = CATEGORY_CONFIG[resolvedCategory];
  const storageKey       = `forge_download_${articleSlug}`;

  const [alreadyShown, setAlreadyShown] = useState(true); // optimistic hide to avoid SSR flicker
  const [email,        setEmail]        = useState("");
  const [status,       setStatus]       = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    try {
      setAlreadyShown(sessionStorage.getItem(storageKey) === "true");
    } catch {
      setAlreadyShown(false);
    }
  }, [storageKey]);

  if (alreadyShown) return null;

  if (config.isLink) {
    return (
      <div
        className="my-10 p-5 rounded-sm flex flex-col sm:flex-row sm:items-center gap-4"
        style={{ borderLeft: "3px solid #D4981A", background: "rgba(212,152,26,0.06)" }}
      >
        <Download size={20} className="text-amber flex-shrink-0 hidden sm:block" />
        <div className="flex-1">
          <p className="font-condensed font-600 text-xs uppercase tracking-[0.15em] text-amber mb-1">
            {config.label}
          </p>
          <p className="font-barlow font-300 text-white/65 text-sm leading-relaxed">
            {config.text}
          </p>
        </div>
        <Link
          href={config.linkHref!}
          className="flex-shrink-0 font-condensed font-700 text-xs uppercase tracking-widest
                     px-5 py-3 text-white rounded transition-colors"
          style={{ background: "#C85A00" }}
          onClick={() => { try { sessionStorage.setItem(storageKey, "true"); } catch {} }}
        >
          {config.buttonLabel}
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const fd = new FormData();
      fd.set("name",        "Download Request");
      fd.set("email",       email);
      fd.set("source",      `pdf_download_${resolvedCategory}`);
      fd.set("pageUrl",     typeof window !== "undefined" ? window.location.href : "");
      fd.set("description", `PDF download request — category: ${resolvedCategory}, article: ${articleSlug}`);
      await fetch("/api/contact", { method: "POST", body: fd });
      if (typeof window !== "undefined" && (window as any).$crisp) {
        (window as any).$crisp.push(["set", "user:email", [email]]);
      }
      try { sessionStorage.setItem(storageKey, "true"); } catch {}
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="my-10 p-5 rounded-sm"
      style={{ borderLeft: "3px solid #D4981A", background: "rgba(212,152,26,0.06)" }}
    >
      <div className="flex items-start gap-3 mb-3">
        <Download size={18} className="text-amber flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-condensed font-600 text-xs uppercase tracking-[0.15em] text-amber mb-1">
            {config.label}
          </p>
          <p className="font-barlow font-300 text-white/65 text-sm leading-relaxed">
            {config.text}
          </p>
        </div>
      </div>

      {status === "success" ? (
        <p className="font-barlow font-300 text-sm text-amber mt-2">
          We&apos;ll send it to you within one business day. Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 min-w-0 bg-navy border border-white/20 text-white
                       placeholder:text-white/30 font-barlow font-300 text-xs
                       px-3 py-2.5 outline-none focus:border-amber/60 transition-colors rounded-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex-shrink-0 font-condensed font-700 text-xs uppercase tracking-wide
                       px-4 py-2.5 text-white rounded-sm transition-colors disabled:opacity-50"
            style={{ background: "#C85A00" }}
          >
            {status === "loading" ? "…" : "Send It →"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="font-barlow font-300 text-xs text-red-400 mt-2">
          Something went wrong — please try again.
        </p>
      )}
    </div>
  );
}
