// ── HubSpot CRM integration ──────────────────────────────────────────────────
// Three exported functions: upsertContact · createDeal · createTask
//
// Custom contact properties used (created by `npm run hubspot:bootstrap`):
//   lead_source_category · property_address · service_interest
//   urgency_level        · estimate_range
//
// Pipeline / stage IDs: verify in HubSpot → CRM → Deals → Pipelines.
// The default "Sales Pipeline" has id "default" and an opening stage of
// "appointmentscheduled". Update PIPELINE_ID / STAGE_NEW below if you
// use a custom pipeline.
//
// Association type IDs (HubSpot-defined, not account-specific):
//   3   = contact → deal   (used in createDeal)
//   204 = task → contact   (used in createTask)
//   216 = task → deal      (used in createTask)
// If an association call returns a 400, verify the correct ID via:
//   GET /crm/v4/associations/{from}/{to}/labels

const HS_BASE = "https://api.hubapi.com";

function token()   { return process.env.HUBSPOT_ACCESS_TOKEN ?? ""; }
function ownerId() { return process.env.HUBSPOT_OWNER_ID    ?? ""; }

// ── Deal pipeline ────────────────────────────────────────────────────────────
const PIPELINE_ID = "default";
const STAGE_NEW   = "appointmentscheduled";

// ── Types ────────────────────────────────────────────────────────────────────

export interface ContactData {
  email:            string;
  firstName?:       string;
  lastName?:        string;
  phone?:           string;
  address?:         string;
  leadSource?:      string;    // "bov_popup" | "contact_form" | "estimate_form"
  serviceInterest?: string;
  urgency?:         string;    // "URGENT" | "STANDARD" | "FLEXIBLE"
  estimateRange?:   string;    // e.g. "$1,500 – $2,800"
}

export interface DealData {
  name:         string;
  description?: string;
  amount?:      number;        // low-end estimate, in dollars
}

export interface TaskData {
  subject: string;
  body?:   string;
}

// ── Internal fetch helper ────────────────────────────────────────────────────

async function hs(method: string, path: string, body?: unknown): Promise<unknown> {
  const res = await fetch(`${HS_BASE}${path}`, {
    method,
    headers: {
      Authorization:  `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "(no body)");
    throw new Error(`HubSpot ${method} ${path} → ${res.status}: ${txt}`);
  }
  return res.json();
}

// ── upsertContact ────────────────────────────────────────────────────────────
// Search for an existing contact by email → update if found, create if not.
// Returns the HubSpot contact ID string.

export async function upsertContact(data: ContactData): Promise<string> {
  const parts     = (data.firstName ?? "").trim().split(" ");
  const firstName = parts[0] ?? "";
  const lastName  = data.lastName ?? parts.slice(1).join(" ");

  const properties: Record<string, string> = {
    email:                data.email,
    firstname:            firstName,
    lastname:             lastName,
    phone:                data.phone           ?? "",
    property_address:     data.address         ?? "",
    lead_source_category: data.leadSource      ?? "",
    service_interest:     data.serviceInterest ?? "",
    urgency_level:        data.urgency         ?? "",
    estimate_range:       data.estimateRange   ?? "",
    hubspot_owner_id:     ownerId(),
  };

  // Search for existing contact by email
  const search = (await hs("POST", "/crm/v3/objects/contacts/search", {
    filterGroups: [{
      filters: [{ propertyName: "email", operator: "EQ", value: data.email }],
    }],
    properties: ["email"],
    limit: 1,
  })) as { results: Array<{ id: string }> };

  if (search.results.length > 0) {
    const id = search.results[0].id;
    await hs("PATCH", `/crm/v3/objects/contacts/${id}`, { properties });
    return id;
  }

  const created = (await hs("POST", "/crm/v3/objects/contacts", {
    properties,
  })) as { id: string };

  return created.id;
}

// ── createDeal ───────────────────────────────────────────────────────────────
// Creates a new deal in the configured pipeline and associates it with the
// given contact. Returns the HubSpot deal ID string.

export async function createDeal(contactId: string, data: DealData): Promise<string> {
  const deal = (await hs("POST", "/crm/v3/objects/deals", {
    properties: {
      dealname:         data.name,
      pipeline:         PIPELINE_ID,
      dealstage:        STAGE_NEW,
      description:      data.description ?? "",
      amount:           data.amount?.toString() ?? "",
      hubspot_owner_id: ownerId(),
    },
    associations: [{
      to:    { id: contactId },
      types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }],
    }],
  })) as { id: string };

  return deal.id;
}

// ── createTask ───────────────────────────────────────────────────────────────
// Creates a follow-up task due in 24 hours, associated with the contact and
// the deal. Returns void — task creation failure is non-critical.

export async function createTask(
  contactId: string,
  dealId:    string,
  data:      TaskData,
): Promise<void> {
  const dueTomorrow = Date.now() + 24 * 60 * 60 * 1000;

  await hs("POST", "/crm/v3/objects/tasks", {
    properties: {
      hs_task_subject:  data.subject,
      hs_task_body:     data.body ?? "",
      hs_task_status:   "NOT_STARTED",
      hs_task_type:     "TODO",
      hs_timestamp:     dueTomorrow.toString(),
      hubspot_owner_id: ownerId(),
    },
    associations: [
      {
        to:    { id: contactId },
        types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 204 }],
      },
      {
        to:    { id: dealId },
        types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 216 }],
      },
    ],
  });
}
