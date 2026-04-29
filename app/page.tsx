import type { Metadata } from "next";
import { Nav }                  from "@/components/layout/Nav";
import { Footer }               from "@/components/layout/Footer";
import { HeroSection }          from "@/components/sections/HeroSection";
import { ServicesSection }      from "@/components/sections/ServicesSection";
import { HowItWorksSection }    from "@/components/sections/HowItWorksSection";
import { WhyForgePointSection } from "@/components/sections/WhyForgePointSection";
import { ReviewsSection }       from "@/components/sections/ReviewsSection";
import { ServiceAreaMap }       from "@/components/sections/ServiceAreaMap";
import { UniversityPreview }    from "@/components/sections/UniversityPreview";
import { CtaBanner }            from "@/components/sections/CtaBanner";
import type { PreviewArticle }  from "@/components/sections/UniversityPreview";

export const metadata: Metadata = {
  title: "Forge Point Property Services | Erie, CO",
  description:
    "Northern Colorado's premier property services company. Landscaping, fencing, grounds maintenance, power washing, HOA management, and more. Serving Erie, Longmont, Boulder, Lafayette, and surrounding areas.",
  openGraph: {
    title:       "Forge Point Property Services",
    description: "Your property. Our craft. Built to Last. Made to Impress.",
    url:         "https://cre8forge.com",
    siteName:    "Forge Point Property Services",
    locale:      "en_US",
    type:        "website",
  },
};

// ── University preview articles ───────────────────────────────────────────────
// Hardcoded so the section is always visible with the three priority articles.
const UNIVERSITY_PREVIEW: PreviewArticle[] = [
  {
    slug:         "brrrr-strategy-northern-colorado",
    title:        "The BRRRR Strategy in Northern Colorado: A Complete Field Guide",
    excerpt:      "Buy, Rehab, Rent, Refinance, Repeat — how the strategy actually works in Colorado's Front Range market, what it costs, and where investors get it wrong.",
    coverImage:   "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=75",
    href:         "/university/investment-strategy/brrrr-strategy-northern-colorado",
    categoryName: "Investment Strategy",
  },
  {
    slug:         "renovations-that-pay-back-northern-colorado",
    title:        "Which Renovations Actually Pay Back in Northern Colorado? A Landlord's Guide",
    excerpt:      "Not every renovation dollar comes back at resale or lease-up. Here's what Northern Colorado buyers and tenants actually pay for.",
    coverImage:   "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=75",
    href:         "/university/renovation-rehab/renovations-that-pay-back-northern-colorado",
    categoryName: "Renovation & Rehab ROI",
  },
  {
    slug:         "boots-on-ground-property-management",
    title:        "The Boots-on-Ground Model: What Real Property Management Actually Looks Like",
    excerpt:      "Administrative management and operational management are not the same thing. Here's what it means to have a team physically at your property.",
    coverImage:   "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=75",
    href:         "/university/property-management/boots-on-ground-property-management",
    categoryName: "Property Management",
  },
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <WhyForgePointSection />
        <ReviewsSection />
        <ServiceAreaMap />
        <UniversityPreview articles={UNIVERSITY_PREVIEW} />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
