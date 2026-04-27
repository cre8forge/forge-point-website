import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">

      {/* Background image — high-end modern property */}
      <Image
        src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=85&auto=format&fit=crop"
        alt="High-end property transformation by Forge Point — Northern Colorado contractors"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/80" />

      {/* Gradient fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <Divider className="mb-10" />

        {/* Eyebrow */}
        <p className="font-condensed font-600 text-xs uppercase tracking-[0.35em] text-amber mb-5">
          Erie, Colorado · Bonded &amp; Insured · (720) 419-1961
        </p>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
          Forge Point
          <br />
          <span className="text-orange">Property</span> Services
        </h1>

        {/* Tagline — from business card */}
        <p className="font-cormorant italic font-300 text-xl md:text-2xl text-amber mb-10 leading-relaxed">
          Your Property. Elevated.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/estimate" variant="primary" size="lg">
            Get a Free Estimate
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            Our Services
          </Button>
        </div>

        <Divider className="mt-10" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-white/40" />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-white/40">
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
}
