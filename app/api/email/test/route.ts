/**
 * app/api/email/test/route.ts
 *
 * Dev/staging endpoint to fire test emails for each template.
 * Protected by EMAIL_TEST_SECRET — never expose this unauthenticated.
 *
 * Usage:
 *   curl -X POST http://localhost:3000/api/email/test \
 *     -H "Content-Type: application/json" \
 *     -H "Authorization: Bearer YOUR_EMAIL_TEST_SECRET" \
 *     -d '{ "template": "welcome", "sender": "hello", "to": "you@gmail.com", "firstName": "Aaron" }'
 *
 * Templates: welcome | service-confirmation | market-update | weather-alert
 */

import { NextResponse }              from "next/server";
import { sendEmail }                 from "@/lib/resend";
import type { SenderType }           from "@/lib/resend";
import { WelcomeEmail }              from "@/emails/templates/Welcome";
import { ServiceConfirmationEmail }  from "@/emails/templates/ServiceConfirmation";
import { MarketUpdateEmail }         from "@/emails/templates/MarketUpdate";
import { WeatherAlertEmail }         from "@/emails/templates/WeatherAlert";
import type { ReactElement }         from "react";

export async function POST(req: Request) {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const auth   = req.headers.get("authorization") ?? "";
  const secret = process.env.EMAIL_TEST_SECRET;

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { template, sender, to, ...props } = body;

  if (!to || typeof to !== "string") {
    return NextResponse.json({ error: "Missing `to`" }, { status: 400 });
  }

  // ── Build template ──────────────────────────────────────────────────────────
  let element: ReactElement;
  let subject: string;

  try {
    switch (template) {
      case "welcome":
        element = WelcomeEmail({
          firstName:      (props.firstName as string)      ?? "there",
          visitorProfile: (props.visitorProfile as string) ?? "unknown",
        });
        subject = "Welcome to Forge Point";
        break;

      case "service-confirmation":
        element = ServiceConfirmationEmail({
          firstName:       (props.firstName       as string) ?? "there",
          serviceType:     (props.serviceType     as string) ?? "service",
          scheduledDate:   (props.scheduledDate   as string) ?? "TBD",
          propertyAddress: (props.propertyAddress as string) ?? "your property",
          crewNote:        (props.crewNote        as string) ?? undefined,
        });
        subject = `Your ${props.serviceType ?? "service"} is confirmed`;
        break;

      case "market-update":
        element = MarketUpdateEmail({
          firstName: (props.firstName as string) ?? "there",
          headline:  (props.headline  as string) ?? "Forge Point Update",
          body:      (props.body      as string) ?? "",
          ctaText:   (props.ctaText   as string) ?? undefined,
          ctaUrl:    (props.ctaUrl    as string) ?? undefined,
        });
        subject = (props.subject as string) ?? (props.headline as string) ?? "Forge Point Update";
        break;

      case "weather-alert":
        element = WeatherAlertEmail({
          firstName:           (props.firstName           as string)   ?? "there",
          alertType:           (props.alertType           as string)   ?? "Weather",
          alertDetails:        (props.alertDetails        as string)   ?? "",
          recommendedActions:  (props.recommendedActions  as string[]) ?? undefined,
        });
        subject = `${props.alertType ?? "Weather"} alert for your property`;
        break;

      default:
        return NextResponse.json(
          { error: `Unknown template: ${String(template)}` },
          { status: 400 },
        );
    }
  } catch (e) {
    return NextResponse.json(
      { error: `Template error: ${(e as Error).message}` },
      { status: 500 },
    );
  }

  // ── Send ────────────────────────────────────────────────────────────────────
  try {
    const result = await sendEmail({
      sender:   (sender as SenderType) ?? "hello",
      to,
      subject,
      template: element,
      tags: [
        { name: "category", value: String(template) },
        { name: "env",      value: "test" },
      ],
    });

    return NextResponse.json({ ok: true, id: result?.id });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 },
    );
  }
}
