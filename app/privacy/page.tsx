import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Forge Point Property Services collects, uses, and protects your information.",
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

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="font-barlow font-300 text-white/40 text-xs">
              Effective Date: April 28, 2026 &nbsp;·&nbsp; Last Updated: April 28, 2026
            </p>
          </div>

          <div className="border-t border-white/8 pt-10">

            <Section title="Who We Are">
              <p>
                Forge Point Property Services (&ldquo;Forge Point,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
                operates the website <strong className="text-white/80">cre8forge.com</strong> and provides landscaping,
                grounds maintenance, renovation, and related property services in Northern Colorado.
              </p>
              <p>
                Questions about this policy may be directed to:{" "}
                <a href="mailto:hello@cre8forge.com" className="text-orange hover:text-amber transition-colors underline underline-offset-2">
                  hello@cre8forge.com
                </a>
              </p>
            </Section>

            <Section title="Information We Collect">
              <p><strong className="text-white/80">Information you provide directly:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Name, email address, and phone number submitted through our contact form</li>
                <li>Property address or zip code when included in your inquiry</li>
                <li>Project descriptions and photos you choose to upload</li>
              </ul>
              <p className="mt-3"><strong className="text-white/80">Information collected automatically:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>IP address and approximate geographic location (city, region, country)</li>
                <li>Browser type, device type, and operating system</li>
                <li>Pages visited, time on page, and referring URL</li>
                <li>Click interactions with buttons and links on this site</li>
                <li>Google click identifiers (GCLID/GBRAID/WBRAID) if you arrive from a Google ad</li>
              </ul>
            </Section>

            <Section title="How We Use Your Information">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Responding to your service inquiries and scheduling estimates</li>
                <li>Improving the content, usability, and performance of our website</li>
                <li>Measuring the effectiveness of our advertising campaigns</li>
                <li>Showing relevant ads to people who have visited our site (retargeting)</li>
                <li>Analyzing geographic and demographic patterns in visitor traffic</li>
              </ul>
              <p>
                We do not sell your personal information to third parties.
                We do not use your information to make automated decisions that have legal or significant effects on you.
              </p>
            </Section>

            <Section title="Cookies & Tracking Technologies">
              <p>
                We use cookies and similar tracking technologies for analytics and advertising purposes.
                When you first visit the site, a consent banner allows you to choose one of three options:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                <li><strong className="text-white/80">Decline</strong> — no analytics or advertising cookies are set</li>
                <li><strong className="text-white/80">Analytics Only</strong> — anonymous usage analytics are enabled; advertising cookies are not</li>
                <li><strong className="text-white/80">Accept All</strong> — both analytics and advertising cookies are enabled</li>
              </ul>
              <p className="mt-3">
                Your preference is stored in your browser&apos;s local storage under the key{" "}
                <code className="text-orange bg-white/5 px-1 py-0.5 text-xs">fp_consent</code>.
                Clearing your browser data will reset this preference.
              </p>
            </Section>

            <Section title="Third-Party Services">
              <p>We use the following third-party services that may set cookies or receive data about your visit:</p>
              <div className="space-y-4 mt-3">
                <div>
                  <p className="text-white/80 font-600 mb-1">Google Analytics 4 &amp; Google Ads</p>
                  <p>
                    Used for website analytics and conversion tracking. Data is processed by Google LLC.
                    Google&apos;s privacy policy is available at{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
                       className="text-orange hover:text-amber transition-colors underline underline-offset-2">
                      policies.google.com/privacy
                    </a>.
                  </p>
                </div>
                <div>
                  <p className="text-white/80 font-600 mb-1">Meta Pixel (Facebook/Instagram)</p>
                  <p>
                    Used for advertising attribution and retargeting on Meta platforms.
                    Contact information submitted through our forms is hashed with SHA-256
                    before being sent to Meta — the original data never leaves your browser in readable form.
                    Meta&apos;s data policy is available at{" "}
                    <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer"
                       className="text-orange hover:text-amber transition-colors underline underline-offset-2">
                      facebook.com/privacy/policy
                    </a>.
                  </p>
                </div>
                <div>
                  <p className="text-white/80 font-600 mb-1">ipgeolocation.io</p>
                  <p>
                    Used to look up the approximate geographic location associated with your IP address.
                    Your IP address is sent to ipgeolocation.io&apos;s servers once per browser session.
                    Their privacy policy is at{" "}
                    <a href="https://ipgeolocation.io/privacy.html" target="_blank" rel="noopener noreferrer"
                       className="text-orange hover:text-amber transition-colors underline underline-offset-2">
                      ipgeolocation.io/privacy.html
                    </a>.
                  </p>
                </div>
              </div>
            </Section>

            <Section title="Data Retention">
              <p>
                Contact form submissions are stored in our database for up to 3 years for business record-keeping purposes.
                Analytics data retained by Google is subject to Google&apos;s default retention policies.
                You may request deletion of your personal information at any time by emailing us.
              </p>
            </Section>

            <Section title="Your Rights">
              <p>
                You may request to access, correct, or delete personal information we hold about you.
                To make such a request, contact us at{" "}
                <a href="mailto:hello@cre8forge.com" className="text-orange hover:text-amber transition-colors underline underline-offset-2">
                  hello@cre8forge.com
                </a>.
                We will respond within a reasonable time.
              </p>
            </Section>

            <Section title="Changes to This Policy">
              <p>
                We may update this policy from time to time. When we do, we will update the &ldquo;Last Updated&rdquo;
                date at the top of this page. Continued use of the site after changes are posted
                constitutes acceptance of the updated policy.
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
