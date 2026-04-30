// app/api/contact/route.ts
//
// Unified API endpoint for lead submissions that originate from
// client-side fetches (currently: the BOV engagement popup).
//
// The contact-page Server Action (app/contact/actions.ts) handles
// ContactForm.tsx submissions separately.
//
// On every valid POST this handler:
//   1. Checks the honeypot — silently drops bot submissions
//   2. Validates name + email
//   3. Saves a ServiceRequest to Postgres via Prisma
//   4. Upserts a HubSpot contact, creates a deal + follow-up task
//      (HubSpot calls are wrapped in try/catch — a HubSpot outage
//       never breaks the form for the user)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { upsertContact, createDeal, createTask } from "@/lib/hubspot";
import { sendFromHello } from "@/lib/resend";
import { WelcomeEmail } from "@/emails/templates/Welcome";

// Minimal email check — catches obvious garbage without false-positives
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();

    // ── Honeypot ─────────────────────────────────────────────────────────────
    // Legitimate users never see or fill the `website` field.
    // Bots that auto-fill every input expose themselves here.
    const honeypot = ((fd.get("website") as string | null) ?? "").trim();
    if (honeypot.length > 0) {
      // Return 200 so bots don't know they were detected
      return NextResponse.json({ success: true });
    }

    // ── Extract fields ────────────────────────────────────────────────────────
    const name    = ((fd.get("name")             as string) ?? "").trim();
    const email   = ((fd.get("email")            as string) ?? "").trim().toLowerCase();
    const phone   = ((fd.get("phone")            as string) ?? "").trim();
    const address = ((fd.get("address")          as string) ?? "").trim();
    const source  = ((fd.get("source")           as string) ?? "bov_popup").trim();
    const profile = ((fd.get("selected_profile") as string) ?? "").trim();
    const desc    = ((fd.get("description")      as string) ?? "").trim();

    // ── Validation ────────────────────────────────────────────────────────────
    if (!name || !email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, error: "Name and a valid email address are required." },
        { status: 400 },
      );
    }

    // ── Prisma ────────────────────────────────────────────────────────────────
    await prisma.serviceRequest.create({
      data: {
        type:            "GENERAL",
        name,
        email,
        phone:           phone   || undefined,
        address:         address || undefined,
        serviceCategory: source === "bov_popup"
          ? "Broker's Opinion of Value (BOV)"
          : undefined,
        description:     desc || (profile ? `Profile: ${profile}` : undefined),
      },
    });

    // ── HubSpot ───────────────────────────────────────────────────────────────
    // Failure here is non-fatal. Log it but return success to the user.
    try {
      const [firstName, ...rest] = name.split(" ");

      const contactId = await upsertContact({
        email,
        firstName,
        lastName:        rest.join(" "),
        phone:           phone   || undefined,
        address:         address || undefined,
        leadSource:      source,
        serviceInterest: profile || undefined,
      });

      const dealName =
        source === "bov_popup"
          ? `BOV Request — ${name}${address ? ` — ${address}` : ""}`
          : `Lead — ${name} — ${source.replace(/_/g, " ")}`;

      const dealId = await createDeal(contactId, {
        name:        dealName,
        description: desc || `Source: ${source}${profile ? ` | Profile: ${profile}` : ""}`,
      });

      await createTask(contactId, dealId, {
        subject: `Follow up with ${name} (${source.replace(/_/g, " ")})`,
        body:
          `Source: ${source}\n` +
          `Profile: ${profile || "n/a"}\n` +
          `Address: ${address || "n/a"}\n` +
          (desc ? `\nNotes: ${desc}` : ""),
      });
    } catch (hsErr) {
      console.error("[HubSpot] /api/contact error:", hsErr);
    }

    // ── Welcome email ─────────────────────────────────────────────────────────
    // Non-fatal — a Resend outage never blocks the form submission.
    try {
      const [firstName] = name.split(" ");
      await sendFromHello({
        to:       email,
        subject:  "Welcome to Forge Point",
        template: WelcomeEmail({
          firstName,
          visitorProfile: profile || "unknown",
        }),
        tags: [
          { name: "category", value: "welcome" },
          { name: "source",   value: source },
        ],
      });
    } catch (emailErr) {
      console.error("[Resend] /api/contact welcome email error:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact] unhandled error:", err);
    return NextResponse.json(
      {
        success: false,
        error:   "Something went wrong. Please try again or call (720) 419-1961 directly.",
      },
      { status: 500 },
    );
  }
}
