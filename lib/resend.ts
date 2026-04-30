/**
 * lib/resend.ts
 *
 * Resend email client + sender registry for all 5 cre8forge.com addresses.
 *
 * Usage:
 *   import { sendFromHello, sendFromService, sendNotification } from "@/lib/resend";
 */

import { Resend } from "resend";
import { render } from "@react-email/render";
import type { ReactElement } from "react";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Sender registry ──────────────────────────────────────────────────────────

export type SenderType =
  | "hello"
  | "realestate"
  | "service"
  | "notifications"
  | "updates";

const SENDERS: Record<SenderType, { email: string; name: string }> = {
  hello: {
    email: process.env.EMAIL_HELLO        ?? "hello@cre8forge.com",
    name:  process.env.EMAIL_HELLO_NAME   ?? "Forge Point Property Services",
  },
  realestate: {
    email: process.env.EMAIL_REALESTATE      ?? "realestate@cre8forge.com",
    name:  process.env.EMAIL_REALESTATE_NAME ?? "Forge Point Real Estate",
  },
  service: {
    email: process.env.EMAIL_SERVICE      ?? "service@cre8forge.com",
    name:  process.env.EMAIL_SERVICE_NAME ?? "Forge Point Service Team",
  },
  notifications: {
    email: process.env.EMAIL_NOTIFICATIONS      ?? "notifications@cre8forge.com",
    name:  process.env.EMAIL_NOTIFICATIONS_NAME ?? "Forge Point Notifications",
  },
  updates: {
    email: process.env.EMAIL_UPDATES      ?? "updates@cre8forge.com",
    name:  process.env.EMAIL_UPDATES_NAME ?? "Forge Point Updates",
  },
};

function buildFrom(sender: SenderType): string {
  const { name, email } = SENDERS[sender];
  return `${name} <${email}>`;
}

// ─── Core send function ───────────────────────────────────────────────────────

export async function sendEmail({
  sender,
  to,
  subject,
  template,
  replyTo,
  tags,
}: {
  sender:    SenderType;
  to:        string | string[];
  subject:   string;
  template:  ReactElement;
  replyTo?:  string;
  tags?:     Array<{ name: string; value: string }>;
}) {
  const html = await render(template);
  const text = await render(template, { plainText: true });

  // notifications@ and updates@ route replies to hello@ so you never miss a response
  const defaultReplyTo =
    sender === "notifications" || sender === "updates"
      ? (process.env.EMAIL_HELLO ?? "hello@cre8forge.com")
      : SENDERS[sender].email;

  const result = await resend.emails.send({
    from:    buildFrom(sender),
    to,
    subject,
    html,
    text,
    replyTo: replyTo ?? defaultReplyTo,
    tags:    tags ?? [],
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }

  return result.data;
}

// ─── Convenience wrappers ─────────────────────────────────────────────────────

type SendParams = Omit<Parameters<typeof sendEmail>[0], "sender">;

export const sendFromHello      = (p: SendParams) => sendEmail({ ...p, sender: "hello" });
export const sendFromRealEstate = (p: SendParams) => sendEmail({ ...p, sender: "realestate" });
export const sendFromService    = (p: SendParams) => sendEmail({ ...p, sender: "service" });
export const sendNotification   = (p: SendParams) => sendEmail({ ...p, sender: "notifications" });
export const sendUpdate         = (p: SendParams) => sendEmail({ ...p, sender: "updates" });
