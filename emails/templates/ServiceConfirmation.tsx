/**
 * emails/templates/ServiceConfirmation.tsx
 *
 * Sent from service@ when a job is scheduled.
 */

import { Heading, Text, Section, Hr } from "@react-email/components";
import { EmailLayout } from "../components/EmailLayout";

export interface ServiceConfirmationEmailProps {
  firstName:       string;
  serviceType:     string;
  scheduledDate:   string;
  propertyAddress: string;
  crewNote?:       string;
}

export function ServiceConfirmationEmail({
  firstName,
  serviceType,
  scheduledDate,
  propertyAddress,
  crewNote,
}: ServiceConfirmationEmailProps) {
  return (
    <EmailLayout preview={`Your ${serviceType} is confirmed for ${scheduledDate}.`}>
      <Heading className="text-2xl font-semibold text-[#0D1B2A] mb-4 mt-0">
        Your service is confirmed.
      </Heading>

      <Text className="text-slate-700 leading-relaxed mb-4">
        Hi {firstName},
      </Text>

      <Text className="text-slate-700 leading-relaxed mb-6">
        We've scheduled your <strong>{serviceType}</strong> for{" "}
        <strong>{scheduledDate}</strong> at {propertyAddress}.
      </Text>

      {/* Detail block */}
      <Section className="bg-slate-50 rounded-lg px-6 py-5 mb-6">
        <Text className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1 mt-0">
          Service
        </Text>
        <Text className="text-slate-800 font-medium mb-3 mt-0">{serviceType}</Text>

        <Text className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1 mt-0">
          Scheduled
        </Text>
        <Text className="text-slate-800 font-medium mb-3 mt-0">{scheduledDate}</Text>

        <Text className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1 mt-0">
          Property
        </Text>
        <Text className="text-slate-800 font-medium mb-0 mt-0">{propertyAddress}</Text>
      </Section>

      {crewNote && (
        <Text className="text-slate-700 leading-relaxed mb-4">
          <strong>Note from the team:</strong> {crewNote}
        </Text>
      )}

      <Text className="text-slate-700 leading-relaxed mb-4">
        Our crew will arrive within the agreed window. If you need to reschedule or have questions before the appointment, reply to this email.
      </Text>

      <Hr className="border-slate-200 my-6" />

      <Text className="text-slate-500 text-sm leading-relaxed mb-0">
        Forge Point Service Team · (720) 419-1961 · service@cre8forge.com
      </Text>
    </EmailLayout>
  );
}
