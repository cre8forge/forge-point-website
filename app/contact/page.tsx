import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Forge Point Property Services. Request a quote, ask a question, or schedule a service — we respond within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <ContactHero />

        <section className="bg-navy py-16 px-6">
          <ContactForm />
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
