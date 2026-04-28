import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Forge Point Property Services.",
  robots: { index: true, follow: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-cinzel font-700 text-white text-lg uppercase tracking-widest mb-4">
        {title}
      </h2>
      <div className="font-barlow font-300 text-white/65 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-navy pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="font-condensed font-600 text-xs uppercase tracking-[0.2em] text-orange mb-3">
              Legal
            </p>
            <h1 className="font-cinzel font-900 text-white text-3xl md:text-4xl uppercase tracking-widest mb-4">
              Terms of Service
            </h1>
            <p className="font-barlow font-300 text-white/40 text-xs">
              Effective Date: April 28, 2026 &nbsp;·&nbsp; Last Updated: April 28, 2026
            </p>
          </div>

          <div className="border-t border-white/8 pt-10">

            <Section title="Agreement to Terms">
              <p>
                By accessing or using the website <strong className="text-white/80">cre8forge.com</strong>,
                you agree to be bound by these Terms of Service. If you do not agree, do not use this website.
                These terms apply to all visitors, users, and anyone who submits a service inquiry.
              </p>
            </Section>

            <Section title="Services">
              <p>
                Forge Point Property Services provides landscaping, fencing, power washing, grounds maintenance,
                renovation, junk removal, and related property services in Northern Colorado.
                Service availability, pricing, and scope are subject to change without notice.
              </p>
              <p>
                Use of the online estimator tool on this website produces <strong className="text-white/80">estimates only</strong>.
                Estimates are based on typical Northern Colorado pricing and industry data.
                They are not binding quotes. Final pricing depends on site conditions, material
                selection, project scope, and other factors determined during an on-site assessment.
                A site visit is required before any firm price is provided.
              </p>
            </Section>

            <Section title="Contact Form Submissions">
              <p>
                By submitting a contact form, you consent to being contacted by Forge Point Property Services
                by phone, email, or text in response to your inquiry. You represent that the contact
                information you provide is accurate.
              </p>
              <p>
                Submitting a form does not create a contractual obligation on either party.
                Services are only initiated upon execution of a written service agreement or work order.
              </p>
            </Section>

            <Section title="Scheduling and Cancellation">
              <p>
                Scheduled services are subject to weather conditions, crew availability, and access to the property.
                We reserve the right to reschedule work due to unsafe conditions or circumstances beyond our control.
              </p>
              <p>
                Clients requesting cancellation of a confirmed job are asked to provide at least 48 hours&apos; notice.
                Cancellations made with less than 24 hours&apos; notice may be subject to a cancellation fee.
              </p>
            </Section>

            <Section title="Payment">
              <p>
                Payment terms are specified in each individual service agreement or invoice.
                Overdue invoices may accrue interest at 1.5% per month or the maximum rate permitted
                by Colorado law, whichever is less. In the event of non-payment, Forge Point reserves
                the right to pursue collection, including reasonable attorney&apos;s fees where permitted.
              </p>
            </Section>

            <Section title="Website Use">
              <p>
                You may not use this website to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Attempt to access systems or data not intended for public use</li>
                <li>Copy, scrape, or reproduce website content without written permission</li>
                <li>Introduce malware, viruses, or other harmful code</li>
              </ul>
            </Section>

            <Section title="Intellectual Property">
              <p>
                All content on this website — including text, photography, branding, logos, and page layouts —
                is the property of Forge Point Property Services and is protected by applicable copyright and
                trademark law. Reproduction or redistribution without written permission is prohibited.
              </p>
            </Section>

            <Section title="Disclaimer of Warranties">
              <p>
                This website and its content are provided &ldquo;as is&rdquo; without warranties of any kind,
                express or implied. We do not warrant that the website will be available, error-free,
                or free of viruses or other harmful components. Estimates generated by the online tool
                are provided for informational purposes only and carry no guarantee of accuracy.
              </p>
            </Section>

            <Section title="Limitation of Liability">
              <p>
                To the maximum extent permitted by law, Forge Point Property Services shall not be liable
                for any indirect, incidental, special, consequential, or punitive damages arising from
                your use of this website or our services, including but not limited to loss of revenue,
                data, or property.
              </p>
              <p>
                Our total liability for any claim arising from use of this website shall not exceed
                the amount paid by you for the specific service giving rise to the claim.
              </p>
            </Section>

            <Section title="Governing Law">
              <p>
                These terms are governed by the laws of the State of Colorado, without regard to
                conflict of law principles. Any disputes shall be resolved in the state or federal
                courts located in Boulder County, Colorado.
              </p>
            </Section>

            <Section title="Changes to These Terms">
              <p>
                We may update these terms at any time. Continued use of the website after changes
                are posted constitutes acceptance of the updated terms.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Forge Point Property Services<br />
                Erie, CO 80516<br />
                <a href="tel:+17204191961" className="text-orange hover:text-amber transition-colors">
                  (720) 419-1961
                </a>
                <br />
                <a href="mailto:hello@cre8forge.com" className="text-orange hover:text-amber transition-colors underline underline-offset-2">
                  hello@cre8forge.com
                </a>
              </p>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
