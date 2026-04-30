/**
 * emails/templates/WeatherAlert.tsx
 *
 * Sent from notifications@ for weather events, property alerts, seasonal heads-up.
 */

import { Heading, Text, Section } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout";

export interface WeatherAlertEmailProps {
  firstName:           string;
  alertType:           string;
  alertDetails:        string;
  recommendedActions?: string[];
}

export function WeatherAlertEmail({
  firstName,
  alertType,
  alertDetails,
  recommendedActions,
}: WeatherAlertEmailProps) {
  return (
    <EmailLayout
      preview={`${alertType} alert for your property.`}
      footerText="This is an automated notification from Forge Point. For questions, reply to this email — replies route to hello@cre8forge.com."
    >
      {/* Alert badge */}
      <Section className="bg-[#7C2D12] rounded-lg px-6 py-3 mb-6 text-center">
        <Text className="text-white font-semibold text-sm uppercase tracking-wide mb-0 mt-0">
          {alertType} Alert
        </Text>
      </Section>

      <Heading className="text-2xl font-semibold text-[#0D1B2A] mb-4 mt-0">
        Property alert: {alertType.toLowerCase()}
      </Heading>

      <Text className="text-slate-700 leading-relaxed mb-4">
        Hi {firstName},
      </Text>

      <Text className="text-slate-700 leading-relaxed mb-6">
        {alertDetails}
      </Text>

      {recommendedActions && recommendedActions.length > 0 && (
        <Section className="bg-slate-50 rounded-lg px-6 py-5 mb-6">
          <Text className="text-slate-900 font-semibold mb-3 mt-0">
            Recommended actions:
          </Text>
          {recommendedActions.map((action, i) => (
            <Text key={i} className="text-slate-700 leading-relaxed mb-2 mt-0">
              {i + 1}. {action}
            </Text>
          ))}
        </Section>
      )}

      <Text className="text-slate-600 text-sm leading-relaxed mb-0">
        Need us to check on your property? Reply to this message and we'll follow up.
      </Text>
    </EmailLayout>
  );
}
