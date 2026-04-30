/**
 * emails/templates/MarketUpdate.tsx
 *
 * Sent from updates@ for nurture campaigns, market updates, rate alerts.
 */

import { Heading, Text, Button, Section } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout";

export interface MarketUpdateEmailProps {
  firstName: string;
  headline:  string;
  body:      string;
  ctaText?:  string;
  ctaUrl?:   string;
}

export function MarketUpdateEmail({
  firstName,
  headline,
  body,
  ctaText,
  ctaUrl,
}: MarketUpdateEmailProps) {
  return (
    <EmailLayout
      preview={headline}
      footerText="You're receiving this because you're a Forge Point contact. Use the unsubscribe link below to manage your preferences."
    >
      <Heading className="text-2xl font-semibold text-[#0D1B2A] mb-4 mt-0">
        {headline}
      </Heading>

      <Text className="text-slate-700 leading-relaxed mb-4">
        Hi {firstName},
      </Text>

      {/* body supports newline-separated paragraphs */}
      {body.split("\n\n").map((para, i) => (
        <Text key={i} className="text-slate-700 leading-relaxed mb-4">
          {para}
        </Text>
      ))}

      {ctaText && ctaUrl && (
        <Section className="text-center my-8">
          <Button
            href={ctaUrl}
            className="bg-[#C85A00] text-white font-semibold px-6 py-3 rounded no-underline"
          >
            {ctaText}
          </Button>
        </Section>
      )}

      <Text className="text-slate-600 text-sm leading-relaxed mt-4">
        Questions? Reply to this email and you'll reach us directly.
      </Text>
    </EmailLayout>
  );
}
