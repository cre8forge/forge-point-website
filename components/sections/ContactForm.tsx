"use client";

import { useState, useRef, useMemo } from "react";
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitContactForm } from "@/app/contact/actions";

// ── Service categories (matches estimator category names exactly) ──

const SERVICE_CATEGORIES = [
  "Landscape Design & Install",
  "Grounds Maintenance",
  "Fencing",
  "Power & Window Washing",
  "Industrial Maintenance",
  "Property Management",
  "Renovation & Remodel",
  "Framing & Finishes",
  "Kitchen, Bath & More",
  "Decks, Pergolas & Patios",
  "Custom Water Features",
  "Junk Haul Off",
  "Mobile Auto Detailing",
  "Housekeeping & Cleaning",
  "Poop Scooping",
  "Home Safety Checks",
  "Errand Services",
  "Other / Not Sure",
];

// ── Estimate types ────────────────────────────────────────────────

interface EstimateItem {
  name: string;
  qty:  number;
  unit: string;
  cat:  string;
  low:  number;
  high: number;
}

interface EstimatePayload {
  items: EstimateItem[];
  low:   number;
  high:  number;
}

function parseEstimate(raw: string | undefined | null): EstimatePayload | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (parsed && Array.isArray(parsed.items) && typeof parsed.low === "number") {
      return parsed as EstimatePayload;
    }
    return null;
  } catch {
    return null;
  }
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

// ── Photo types ───────────────────────────────────────────────────

interface PhotoPreview {
  name: string;
  url:  string;
  file: File;
}

type Status = "idle" | "loading" | "success" | "error";

// ── Component ─────────────────────────────────────────────────────

interface ContactFormProps {
  initialEstimate?: string;
}

export function ContactForm({ initialEstimate }: ContactFormProps) {
  const estimate = useMemo(() => parseEstimate(initialEstimate), [initialEstimate]);

  // Auto-check categories that appear in the estimate
  const defaultCategories = useMemo(() => {
    if (!estimate || estimate.items.length === 0) return [];
    return [...new Set(estimate.items.map((i) => i.cat))].filter((cat) =>
      SERVICE_CATEGORIES.includes(cat)
    );
  }, [estimate]);

  const [status, setStatus]                       = useState<Status>("idle");
  const [errorMsg, setErrorMsg]                   = useState("");
  const [photos, setPhotos]                       = useState<PhotoPreview[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultCategories);
  const fileInputRef                              = useRef<HTMLInputElement>(null);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files     = Array.from(e.target.files ?? []);
    const remaining = 3 - photos.length;
    const toAdd     = files.slice(0, remaining).map((file) => ({
      name: file.name,
      url:  URL.createObjectURL(file),
      file,
    }));
    setPhotos((prev) => [...prev, ...toAdd]);
    e.target.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd   = new FormData(form);

    // Send selected categories as a joined string
    fd.set("serviceCategory", selectedCategories.join(", "));

    // Attach photo files
    photos.forEach((p) => fd.append("photos", p.file));

    // Attach estimate JSON if present
    if (estimate) {
      fd.set("estimateData", JSON.stringify(estimate));
    }

    const result = await submitContactForm(fd);

    if (result.success) {
      setStatus("success");
      form.reset();
      setPhotos([]);
      setSelectedCategories([]);
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <CheckCircle size={48} className="text-orange mx-auto mb-4" />
        <h2 className="font-cinzel font-700 text-white text-2xl uppercase tracking-widest mb-3">
          Message Received
        </h2>
        <p className="font-barlow font-300 text-white/60 text-sm">
          Thank you — we&apos;ll get back to you within one business day. If it&apos;s
          urgent, call us directly at{" "}
          <a href="tel:+17204191961" className="text-orange hover:text-amber transition-colors">
            (720) 419-1961
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">

      {/* ── Estimate summary (shown when arriving from /estimate) ── */}
      {estimate && estimate.items.length > 0 && (
        <div className="border border-orange/30 bg-orange/5 p-5">
          <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-3">
            Your Estimate — Attached to This Request
          </p>
          <div className="space-y-2 mb-3">
            {estimate.items.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-4 text-xs">
                <div className="flex-1 min-w-0">
                  <span className="font-barlow font-300 text-white/90 block truncate">{item.name}</span>
                  <span className="font-condensed text-white/40">
                    {item.qty.toLocaleString()} {item.unit} · {item.cat}
                  </span>
                </div>
                <span className="font-condensed font-600 text-white/70 whitespace-nowrap flex-shrink-0">
                  {fmt(item.low)} – {fmt(item.high)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-orange/20 pt-3 flex items-center justify-between">
            <span className="font-condensed font-600 text-xs uppercase tracking-wide text-white/50">
              Total Range
            </span>
            <span className="font-condensed font-700 text-orange text-sm tracking-wide">
              {fmt(estimate.low)} – {fmt(estimate.high)}
            </span>
          </div>
          <p className="font-barlow font-300 text-white/35 text-xs mt-2 leading-relaxed">
            These selections will be included in your request so we can quote accurately.
          </p>
        </div>
      )}

      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-condensed font-600 text-xs uppercase tracking-widest text-white/50 mb-2">
            Full Name <span className="text-orange">*</span>
          </label>
          <input
            name="name"
            required
            type="text"
            placeholder="Jane Smith"
            className="w-full bg-card border border-white/12 text-white placeholder:text-white/25
                       font-barlow font-300 text-sm px-4 py-3 outline-none
                       focus:border-orange/50 transition-colors"
          />
        </div>
        <div>
          <label className="block font-condensed font-600 text-xs uppercase tracking-widest text-white/50 mb-2">
            Email <span className="text-orange">*</span>
          </label>
          <input
            name="email"
            required
            type="email"
            placeholder="jane@example.com"
            className="w-full bg-card border border-white/12 text-white placeholder:text-white/25
                       font-barlow font-300 text-sm px-4 py-3 outline-none
                       focus:border-orange/50 transition-colors"
          />
        </div>
      </div>

      {/* Phone + Zip */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-condensed font-600 text-xs uppercase tracking-widest text-white/50 mb-2">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="(303) 555-0000"
            className="w-full bg-card border border-white/12 text-white placeholder:text-white/25
                       font-barlow font-300 text-sm px-4 py-3 outline-none
                       focus:border-orange/50 transition-colors"
          />
        </div>
        <div>
          <label className="block font-condensed font-600 text-xs uppercase tracking-widest text-white/50 mb-2">
            Property Zip Code
          </label>
          <input
            name="zip"
            type="text"
            placeholder="80516"
            maxLength={10}
            className="w-full bg-card border border-white/12 text-white placeholder:text-white/25
                       font-barlow font-300 text-sm px-4 py-3 outline-none
                       focus:border-orange/50 transition-colors"
          />
        </div>
      </div>

      {/* Service categories — checkbox grid */}
      <div>
        <label className="block font-condensed font-600 text-xs uppercase tracking-widest text-white/50 mb-3">
          Services Needed{" "}
          <span className="text-white/30 normal-case font-barlow font-300 tracking-normal">
            — select all that apply
          </span>
          {estimate && defaultCategories.length > 0 && (
            <span className="ml-2 text-orange normal-case font-barlow font-300 tracking-normal">
              · pre-filled from your estimate
            </span>
          )}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SERVICE_CATEGORIES.map((cat) => {
            const checked = selectedCategories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={cn(
                  "text-left px-3 py-2.5 border text-xs font-barlow font-300 transition-all duration-150 leading-snug",
                  checked
                    ? "border-orange bg-orange/10 text-white"
                    : "border-white/12 bg-card text-white/50 hover:border-white/30 hover:text-white/80"
                )}
              >
                {checked && <span className="text-orange mr-1.5">✓</span>}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Urgency */}
      <div>
        <label className="block font-condensed font-600 text-xs uppercase tracking-widest text-white/50 mb-2">
          Timeline
        </label>
        <div className="flex gap-3">
          {[
            { value: "URGENT",   label: "Urgent (ASAP)" },
            { value: "STANDARD", label: "Standard (2–3 weeks)" },
            { value: "FLEXIBLE", label: "Flexible" },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="flex-1 flex items-center gap-2 px-4 py-3 bg-card border border-white/12
                         hover:border-orange/40 cursor-pointer transition-colors has-[:checked]:border-orange
                         has-[:checked]:bg-orange/10"
            >
              <input
                type="radio"
                name="urgency"
                value={value}
                defaultChecked={value === "STANDARD"}
                className="accent-orange"
              />
              <span className="font-barlow font-300 text-sm text-white/70">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block font-condensed font-600 text-xs uppercase tracking-widest text-white/50 mb-2">
          Describe Your Project
        </label>
        <textarea
          name="description"
          rows={5}
          placeholder="Tell us what you need — property size, scope of work, any specific concerns…"
          className="w-full bg-card border border-white/12 text-white placeholder:text-white/25
                     font-barlow font-300 text-sm px-4 py-3 outline-none
                     focus:border-orange/50 transition-colors resize-none"
        />
      </div>

      {/* Photo upload */}
      <div>
        <label className="block font-condensed font-600 text-xs uppercase tracking-widest text-white/50 mb-2">
          Photos{" "}
          <span className="text-white/30 normal-case font-barlow font-300 tracking-normal">
            — up to 3 images, max 3 MB each
          </span>
        </label>

        {photos.length < 3 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border border-dashed border-white/20 hover:border-orange/50
                       text-white/40 hover:text-white/70 transition-colors py-8 flex flex-col
                       items-center gap-2 bg-card"
          >
            <Upload size={20} />
            <span className="font-barlow font-300 text-sm">Click to add photos</span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handlePhotoChange}
        />

        {photos.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-3">
            {photos.map((p, i) => (
              <div key={i} className="relative aspect-square overflow-hidden bg-card border border-white/8">
                <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 bg-navy/80 text-white hover:bg-orange transition-colors rounded-sm p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 bg-red-900/20 border border-red-500/30 px-4 py-3">
          <AlertCircle size={16} />
          <span className="font-barlow font-300 text-sm">{errorMsg}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "w-full font-condensed font-600 text-sm uppercase tracking-widest px-6 py-4 transition-all",
          status === "loading"
            ? "bg-white/20 text-white/40 cursor-not-allowed"
            : "bg-orange text-white hover:bg-amber"
        )}
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </span>
        ) : (
          "Send Message →"
        )}
      </button>
    </form>
  );
}
