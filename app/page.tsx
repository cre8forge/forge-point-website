import type { Metadata } from "next";
import { prisma }               from "@/lib/prisma";
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

export default async function HomePage() {
  // Fetch up to 3 published articles for the University preview.
  // Featured articles are prioritized; falls back to most recent.
  // Section is hidden entirely when fewer than 3 are published.
  const featuredArticles = await prisma.universityArticle.findMany({
    where:   { status: "PUBLISHED" },
    include: { category: true },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    take:    3,
  });

  const showUniversity = featuredArticles.length >= 3;

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
        {showUniversity && <UniversityPreview articles={featuredArticles} />}
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
