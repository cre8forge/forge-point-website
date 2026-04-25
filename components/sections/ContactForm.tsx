"use client";

import { useState, useRef } from "react";
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitContactForm } from "@/app/contact/actions";

const SERVICE_CATEGORIES = [
  "Landscape Design & Install",
  "Grounds Maintenance",
  "Fencing",
  "Power & Window Washing",
  "Industrial Maintenance",
  "HOA & Commercial Property",
  "Irrigation & Drainage",
  "Property Management",
  "Other / Not Sure",
];

interface PhotoPreview {
  name: string;
  url: string;
  file: File;
}

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus]         = useState<Status>("idle");
  const [errorMsg, setErrorMsg]     = useState("");
  const [photos, setPhotos]         = useState<PhotoPreview[]>([]);
  const fileInputRef                = useRef<HTMLInputElement>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const remaining = 3 - photos.length;
    const toAdd = files.slice(0, remaining).map((file) => ({
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

    // Attach photo files
    photos.forEach((p) => fd.append("photos", p.file));

    const result = await submitContactForm(fd);

    if (result.success) {
      setStatus("success");
      form.reset();
      setPhotos([]);
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
          <a href="tel:+19705550100" className="text-orange hover:text-amber transition-colors">
            (970) 555-0100
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">

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

      {/* Service category */}
      <div>
        <label className="block font-condensed font-600 text-xs uppercase tracking-widest text-white/50 mb-2">
          Service Category
        </label>
        <select
          name="serviceCategory"
          className="w-full bg-card border border-white/12 text-white
                     font-barlow font-300 text-sm px-4 py-3 outline-none
                     focus:border-orange/50 transition-colors appearance-none"
        >
          <option value="">— Select a service —</option>
          {SERVICE_CATEGORIES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
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
          Photos <span className="text-white/30 normal-case font-barlow font-300 tracking-normal">— up to 3 images, max 3 MB each</span>
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
