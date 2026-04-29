import type { Metadata } from "next";
import Script from "next/script";
import {
  cinzel,
  barlowCondensed,
  barlow,
  cormorantGaramond,
} from "@/lib/fonts";
import "./globals.css";
import { GTMHead, GTMBody } from "@/components/analytics/GTMScript";
import { CookieBanner } from "@/components/analytics/CookieBanner";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { MobileCtaBar } from "@/components/ui/MobileCtaBar";

const SITE_URL = "https://cre8forge.com";
const SITE_NAME = "Forge Point Property Services";
const SITE_DESCRIPTION =
  "Licensed landscaping, fencing, power washing, grounds maintenance & property management serving Erie, Boulder County, and Northern Colorado.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  `${SITE_NAME} | Erie, CO`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "landscaping Erie CO",
    "fencing Northern Colorado",
    "power washing Boulder County",
    "grounds maintenance Erie",
    "property management Erie CO",
    "lawn care Erie Colorado",
    "Forge Point Property Services",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       `${SITE_NAME} | Erie, CO`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card:        "summary_large_image",
    title:       `${SITE_NAME} | Erie, CO`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index:              true,
    follow:             true,
    googleBot: {
      index:              true,
      follow:             true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        cinzel.variable,
        barlowCondensed.variable,
        barlow.variable,
        cormorantGaramond.variable,
      ].join(" ")}
    >
      <head>
        <GTMHead />
      </head>
      <body className="pb-14 md:pb-0">
        <GTMBody />
        {/* LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: SITE_NAME,
              url: SITE_URL,
              telephone: "+17204191961",
              email: "hello@cre8forge.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "",
                addressLocality: "Erie",
                addressRegion: "CO",
                postalCode: "80516",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.0505,
                longitude: -105.0419,
              },
              areaServed: [
                "Erie", "Louisville", "Lafayette", "Longmont",
                "Boulder", "Broomfield", "Brighton", "Frederick",
                "Firestone", "Windsor",
              ],
              serviceType: [
                "Landscaping", "Fencing", "Power Washing",
                "Grounds Maintenance", "Property Management",
                "Renovation & Remodel", "Framing & Finishes",
                "Kitchen & Bath Remodeling", "Deck Construction",
                "Pergola Installation", "Custom Water Features",
                "Junk Removal",
              ],
              priceRange: "$$",
            }),
          }}
        />
        {children}
        <MobileCtaBar />
        <AnalyticsProvider />
        <MetaPixel />
        <CookieBanner />

        {/* ── Crisp live chat (Flint) ── */}
        <Script
          id="crisp-chat"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp=[];
              window.CRISP_WEBSITE_ID="e9d4d2db-adaa-41c9-b9e2-abf9496c8743";
              (function(){
                var d=document;
                var s=d.createElement("script");
                s.src="https://client.crisp.chat/l.js";
                s.async=1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
              window.$crisp.push(["config","position:reverse",[false]]);
              window.$crisp.push(["config","color:theme",["#C85A00"]]);
              window.$crisp.push(["set","message:text",["Hi, I'm Flint — how can I help? Are you a homeowner, thinking of selling, or an investor?"]]);
            `,
          }}
        />
      </body>
    </html>
  );
}
