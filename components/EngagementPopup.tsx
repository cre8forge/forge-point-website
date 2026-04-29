"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

const FLINT_AVATAR = "https://i.imgur.com/6Iue3tI.png";

const PROFILES = [
  {
    id:          "homeowner",
    emoji:       "🏠",
    title:       "Homeowner",
    description: "I own my home and want to know what it's worth and what I should improve.",
  },
  {
    id:          "selling",
    emoji:       "🏷️",
    title:       "Thinking of Selling",
    description: "I'm considering listing and want to know what to do before I put it on the market.",
  },
  {
    id:          "landlord",
    emoji:       "🏘️",
    title:       "Landlord / Rental Owner",
    description: "I own rental property and want to know if it's performing and how to increase returns.",
  },
  {
    id:          "investor",
    emoji:       "📈",
    title:       "Investor",
    description: "I'm evaluating an acquisition, a BRRRR opportunity, or my existing portfolio.",
  },
  {
    id:          "hoa-commercial",
    emoji:       "🏢",
    title:       "HOA / Commercial Owner",
    description: "I manage or own commercial property or a community association.",
  },
] as const;

type ProfileId = typeof PROFILES[number]["id"];

interface EngagementPopupProps {
  onClose: () => void;
}

export function EngagementPopup({ onClose }: EngagementPopupProps) {
  const [selectedProfile, setSelectedProfile] = useState<ProfileId | null>(null);
  const [step,            setStep]            = useState<"profile" | "form" | "thanks">("profile");
  const [name,            setName]            = useState("");
  const [email,           setEmail]           = useState("");
  const [phone,           setPhone]           = useState("");
  const [address,         setAddress]         = useState("");
  const [submitting,      setSubmitting]       = useState(false);

  // Auto-close after 4 seconds on the thanks step
  useEffect(() => {
    if (step !== "thanks") return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [step, onClose]);

  const handleProfileSelect = (id: ProfileId) => {
    setSelectedProfile(id);
    setStep("form");
  };

  const handleDismiss = useCallback(() => {
    try { localStorage.setItem("forge_popup_dismissed_at", String(Date.now())); } catch {}
    onClose();
  }, [onClose]);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.set("name",             name);
      fd.set("email",            email);
      fd.set("phone",            phone);
      fd.set("address",          address);
      fd.set("source",           "bov_popup");
      fd.set("selected_profile", selectedProfile ?? "");
      fd.set("pageUrl",          typeof window !== "undefined" ? window.location.href : "");
      fd.set("referralSource",   typeof document !== "undefined" ? document.referrer || "direct" : "direct");
      fd.set("description",      `BOV popup lead — profile: ${selectedProfile} — property: ${address}`);
      await fetch("/api/contact", { method: "POST", body: fd });
      if (typeof window !== "undefined" && (window as any).$crisp) {
        (window as any).$crisp.push(["set", "user:email",    [email]]);
        (window as any).$crisp.push(["set", "user:nickname", [name]]);
      }
      setStep("thanks");
    } catch {
      setStep("thanks"); // still show thanks on network error
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}
    >
      <div
        className="relative w-full max-w-[520px] rounded-xl overflow-hidden shadow-2xl"
        style={{ background: "#0D1B2A", border: "1px solid #D4981A" }}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">
          {step === "profile" && (
            <>
              {/* Header */}
              <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-amber mb-2">
                Complimentary Offer
              </p>
              <h3 className="font-cinzel font-700 text-white text-xl uppercase tracking-wide mb-3 normal-case">
                Get a Free Broker&apos;s Opinion of Value
              </h3>
              <p className="font-barlow font-300 text-white/60 text-sm leading-relaxed mb-6">
                Tell us about your property and your goals. We&apos;ll assess what it&apos;s worth,
                what it needs, and what the right next move is — at no cost and no obligation.
              </p>

              {/* Profile cards */}
              <div className="grid grid-cols-2 gap-3">
                {PROFILES.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => handleProfileSelect(p.id)}
                    className={`text-left p-4 rounded-lg border transition-all duration-150 ${
                      idx === 4 ? "col-span-2 sm:col-span-1 sm:col-start-1" : ""
                    }`}
                    style={{
                      borderColor:     selectedProfile === p.id ? "#C85A00" : "rgba(255,255,255,0.15)",
                      background:      selectedProfile === p.id ? "rgba(200,90,0,0.1)" : "transparent",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#C85A00"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = selectedProfile === p.id ? "#C85A00" : "rgba(255,255,255,0.15)"; }}
                  >
                    <span className="block text-3xl mb-2">{p.emoji}</span>
                    <p className="font-condensed font-700 text-white text-xs uppercase tracking-wide mb-1">
                      {p.title}
                    </p>
                    <p className="font-barlow font-300 text-white/50 text-xs leading-snug">
                      {p.description}
                    </p>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === "form" && (
            <>
              <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-amber mb-2">
                Almost There
              </p>
              <h3 className="font-cinzel font-700 text-white text-lg uppercase tracking-wide mb-1 normal-case">
                Request Your Free BOV
              </h3>
              <p className="font-barlow font-300 text-white/50 text-xs mb-5">
                Profile: <span className="text-amber">{PROFILES.find(p => p.id === selectedProfile)?.title}</span>
                {" "}·{" "}
                <button onClick={() => setStep("profile")} className="text-orange hover:text-amber transition-colors">
                  Change
                </button>
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-3">
                {/* Honeypot — hidden from real users; bots fill it and get silently dropped */}
                <input
                  type="text"
                  name="website"
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#0A1520] border border-white/15 text-white placeholder:text-white/30
                             font-barlow font-300 text-sm px-4 py-3 rounded outline-none
                             focus:border-amber/60 transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#0A1520] border border-white/15 text-white placeholder:text-white/30
                             font-barlow font-300 text-sm px-4 py-3 rounded outline-none
                             focus:border-amber/60 transition-colors"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-[#0A1520] border border-white/15 text-white placeholder:text-white/30
                             font-barlow font-300 text-sm px-4 py-3 rounded outline-none
                             focus:border-amber/60 transition-colors"
                />
                <input
                  type="text"
                  required
                  placeholder="Property address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full bg-[#0A1520] border border-white/15 text-white placeholder:text-white/30
                             font-barlow font-300 text-sm px-4 py-3 rounded outline-none
                             focus:border-amber/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-condensed font-700 text-sm uppercase tracking-widest py-4 rounded
                             transition-colors disabled:opacity-50"
                  style={{ background: "#C85A00", color: "white" }}
                >
                  {submitting ? "Sending…" : "Request My Free BOV →"}
                </button>
                <p className="font-barlow font-300 text-[11px] text-white/35 text-center">
                  No sales pressure. We respond within one business day.
                </p>
              </form>
            </>
          )}

          {step === "thanks" && (
            <div className="text-center py-4">
              {/* Flint avatar */}
              <img
                src={FLINT_AVATAR}
                alt="Flint — Forge Point's property advisor"
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-cinzel font-700 text-white text-lg uppercase tracking-wide mb-2 normal-case">
                You&apos;re all set, {name || "there"}.
              </h3>
              <p className="font-barlow font-300 text-white/60 text-sm leading-relaxed">
                Flint will be in touch soon. We respond within one business day.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
