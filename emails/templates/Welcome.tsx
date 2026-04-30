/**
 * emails/templates/Welcome.tsx
 *
 * Sent from hello@ immediately after any contact form submission.
 * Copy adapts based on visitorProfile so it reads like a personal reply,
 * not a generic auto-responder.
 */

import { Heading, Text, Button, Section } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout";

export interface WelcomeEmailProps {
  firstName:      string;
  visitorProfile?: string;
}

const PROFILE_MESSAGES: Record<string, string> = {
  homeowner:
    "We work with Northern Colorado homeowners on everything from grounds maintenance to full renovations. Whatever you're considering, we'll give you a clear scope and an honest range before you commit to anything.",
  thinking_of_selling:
    "When you're ready to talk through listing your property, we'll bring fifteen years of operational Front Range experience to that conversation — not just transaction expertise.",
  landlord:
    "Property owners need a partner who actually shows up. We manage single-family rentals, multifamily, and HOAs across the Front Range with a boots-on-ground model — not a call center.",
  investor:
    "Investment properties need rigorous analysis before purchase and active management after. We provide both, with the operational depth most agents and managers don't have.",
  hoa_commercial:
    "Commercial and HOA properties deserve professional management at scale. We've managed millions of square feet across Colorado's Front Range and understand what that actually takes.",
  unknown:
    "Whatever brought you here, Forge Point is built to be a single point of contact across advisory, management, renovation, grounds, and concierge services.",
};

export function WelcomeEmail({ firstName, visitorProfile }: WelcomeEmailProps) {
  const profileMessage =
    PROFILE_MESSAGES[visitorProfile ?? "unknown"] ?? PROFILE_MESSAGES.unknown;

  return (
    <EmailLayout preview={`Welcome to Forge Point, ${firstName}.`}>
      <Heading className="text-2xl font-semibold text-[#0D1B2A] mb-4 mt-0">
        Welcome to Forge Point, {firstName}.
      </Heading>

      <Text className="text-slate-700 leading-relaxed mb-4">
        Thanks for reaching out. We've received your information and someone from our team will follow up within one business day.
      </Text>

      <Text className="text-slate-700 leading-relaxed mb-6">
        {profileMessage}
      </Text>

      <Section className="text-center my-8">
        <Button
          href="https://cre8forge.com/services"
          className="bg-[#C85A00] text-white font-semibold px-6 py-3 rounded no-underline"
        >
          Explore Our Services
        </Button>
      </Section>

      <Text className="text-slate-600 text-sm leading-relaxed">
        Questions before we connect? Reply to this email and you'll reach us directly.
      </Text>
    </EmailLayout>
  );
}
