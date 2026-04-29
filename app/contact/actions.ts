"use server";

import { prisma } from "@/lib/prisma";
import { upsertContact, createDeal, createTask } from "@/lib/hubspot";

export type ContactResult = { success: true } | { success: false; error: string };

export async function submitContactForm(formData: FormData): Promise<ContactResult> {
  try {
    // ── Honeypot ─────────────────────────────────────────────────────────────
    const honeypot = ((formData.get("website") as string | null) ?? "").trim();
    if (honeypot.length > 0) {
      // Silently succeed — bots should not learn they were rejected
      return { success: true };
    }

    const name  = (formData.get("name")  as string | null)?.trim();
    const email = (formData.get("email") as string | null)?.trim();

    if (!name || !email) {
      return { success: false, error: "Name and email are required." };
    }

    const phone           = (formData.get("phone")           as string) || undefined;
    const address         = (formData.get("address")         as string) || undefined;
    const city            = (formData.get("city")            as string) || undefined;
    const zip             = (formData.get("zip")             as string) || undefined;
    const serviceCategory = (formData.get("serviceCategory") as string) || undefined;
    const description     = (formData.get("description")     as string) || undefined;
    const urgencyRaw      = (formData.get("urgency")         as string) || "STANDARD";
    const urgency         = ["URGENT", "STANDARD", "FLEXIBLE"].includes(urgencyRaw)
      ? (urgencyRaw as "URGENT" | "STANDARD" | "FLEXIBLE")
      : "STANDARD";

    // ── Parse estimate data if passed from /estimate ──────────────
    let estimateDetails: object | undefined;
    let estimateLow:     number | undefined;
    let estimateHigh:    number | undefined;
    let serviceNames:    string[] = [];
    let requestType:     "GENERAL" | "ESTIMATE" = "GENERAL";

    const estimateRaw = formData.get("estimateData") as string | null;
    if (estimateRaw) {
      try {
        const parsed = JSON.parse(estimateRaw) as {
          items: Array<{ name: string; qty: number; unit: string; cat: string; low: number; high: number }>;
          low:   number;
          high:  number;
        };
        if (parsed && Array.isArray(parsed.items)) {
          estimateDetails = parsed;
          estimateLow     = parsed.low;
          estimateHigh    = parsed.high;
          serviceNames    = parsed.items.map((i) => `${i.name} (${i.qty} ${i.unit})`);
          requestType     = "ESTIMATE";
        }
      } catch {
        // Malformed estimate JSON — continue as GENERAL
      }
    }

    // ── Handle photo uploads (Phase 1: base64 data URLs) ──────────
    const photoUrls: string[] = [];
    const files = formData.getAll("photos") as File[];
    for (const file of files.slice(0, 3)) {
      if (file.size > 0 && file.size <= 3_000_000) {
        const bytes  = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");
        photoUrls.push(`data:${file.type};base64,${base64}`);
      }
    }

    await prisma.serviceRequest.create({
      data: {
        type: requestType,
        name,
        email,
        phone,
        address,
        city,
        zip,
        serviceCategory,
        serviceNames,
        description,
        urgency,
        estimateLow,
        estimateHigh,
        estimateDetails,
        photoUrls,
      },
    });

    // ── HubSpot CRM ───────────────────────────────────────────────────────────
    // Wrapped in its own try/catch — a HubSpot failure must never break the
    // form submission for the user.
    try {
      const source  = (formData.get("source") as string | null)?.trim()
        ?? (estimateDetails ? "estimate_form" : "contact_form");

      const [firstName, ...rest] = name.trim().split(" ");

      const estimateRangeLabel =
        estimateLow && estimateHigh
          ? `$${estimateLow.toLocaleString()} – $${estimateHigh.toLocaleString()}`
          : undefined;

      const contactId = await upsertContact({
        email,
        firstName,
        lastName:        rest.join(" "),
        phone:           phone           ?? undefined,
        address:         address         ?? undefined,
        leadSource:      source,
        serviceInterest: serviceCategory ?? undefined,
        urgency:         urgency         ?? undefined,
        estimateRange:   estimateRangeLabel,
      });

      const dealName =
        requestType === "ESTIMATE"
          ? `Estimate Request — ${name}${estimateRangeLabel ? ` — ${estimateRangeLabel}` : ""}`
          : `Service Request — ${name}${serviceCategory ? ` — ${serviceCategory}` : ""}`;

      const dealId = await createDeal(contactId, {
        name:        dealName,
        description: description ?? undefined,
        amount:      estimateLow ? Number(estimateLow) : undefined,
      });

      await createTask(contactId, dealId, {
        subject: `Follow up with ${name} (${source.replace(/_/g, " ")})`,
        body:
          `Source: ${source}\n` +
          `Service: ${serviceCategory || "n/a"}\n` +
          `Urgency: ${urgency || "n/a"}\n` +
          (estimateRangeLabel ? `Estimate: ${estimateRangeLabel}\n` : "") +
          (description ? `\nNotes: ${description}` : ""),
      });
    } catch (hsErr) {
      console.error("[HubSpot] contact action error:", hsErr);
    }

    return { success: true };
  } catch (err) {
    console.error("Contact form error:", err);
    return { success: false, error: "Something went wrong. Please try again or call us directly." };
  }
}
