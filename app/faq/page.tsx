import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FaqHero } from "@/components/sections/FaqHero";
import { FaqTool } from "@/components/sections/FaqTool";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FAQ_CATEGORIES } from "@/lib/faq-data";
import { SchemaScript, buildFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Forge Point Property Services — service area, licensing, pricing, scheduling, landscaping, fencing, grounds maintenance, and more.",
};

export default function FaqPage() {
  // FAQ_CATEGORIES is a const — safe to cast to mutable for the client component
  const categories = FAQ_CATEGORIES as unknown as typeof FAQ_CATEGORIES extends ReadonlyArray<infer T> ? T[] : never;

  // Flatten all questions across every category for FAQPage schema
  const allFaqs = FAQ_CATEGORIES.flatMap((cat) => cat.questions);

  return (
    <>
      <SchemaScript schema={buildFAQSchema(allFaqs)} />
      <Nav />

      <main>
        <FaqHero />

        <section className="bg-navy">
          <FaqTool categories={[...FAQ_CATEGORIES]} />
        </section>

        <CtaBanner />
      </main>

      <Footer />
    </>
  );
}
