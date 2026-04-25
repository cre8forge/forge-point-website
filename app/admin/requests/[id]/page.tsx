import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function updateRequest(id: string, formData: FormData) {
  "use server";
  const session = await auth();
  if (!session) redirect("/login");

  const status     = formData.get("status") as string;
  const adminNotes = formData.get("adminNotes") as string;

  await prisma.serviceRequest.update({
    where: { id },
    data: {
      status:     status as any,
      adminNotes: adminNotes || undefined,
    },
  });

  revalidatePath(`/admin/requests/${id}`);
  revalidatePath("/admin/requests");
  revalidatePath("/admin");
}

const STATUS_OPTIONS = [
  "NEW", "REVIEWED", "QUOTED", "SCHEDULED", "COMPLETED", "ARCHIVED",
];

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = await prisma.serviceRequest.findUnique({ where: { id } });

  if (!request) notFound();

  const updateThisRequest = updateRequest.bind(null, id);

  return (
    <div className="p-8 max-w-3xl">
      <Link
        href="/admin/requests"
        className="font-condensed font-600 text-xs uppercase tracking-widest text-orange hover:text-amber transition-colors mb-6 inline-block"
      >
        ← Requests
      </Link>

      <h1 className="font-cinzel font-700 text-white text-xl uppercase tracking-widest mb-8">
        {request.name}
      </h1>

      <section className="bg-card border border-white/8 p-6 mb-6">
        <h2 className="font-condensed font-600 text-xs uppercase tracking-widest text-white/40 mb-4">
          Contact
        </h2>
        <dl className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Name",      value: request.name },
            { label: "Email",     value: request.email },
            { label: "Phone",     value: request.phone },
            { label: "City",      value: request.city },
            { label: "Zip",       value: request.zip },
            { label: "Service",   value: request.serviceCategory },
            { label: "Urgency",   value: request.urgency },
            { label: "Submitted", value: request.createdAt.toLocaleString() },
          ].map(({ label, value }) =>
            value ? (
              <div key={label}>
                <dt className="font-condensed font-600 text-xs uppercase tracking-widest text-white/30 mb-0.5">
                  {label}
                </dt>
                <dd className="font-barlow font-300 text-sm text-white">{value}</dd>
              </div>
            ) : null
          )}
        </dl>
      </section>

      {request.description && (
        <section className="bg-card border border-white/8 p-6 mb-6">
          <h2 className="font-condensed font-600 text-xs uppercase tracking-widest text-white/40 mb-3">
            Project Description
          </h2>
          <p className="font-barlow font-300 text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
            {request.description}
          </p>
        </section>
      )}

      {request.photoUrls.length > 0 && (
        <section className="bg-card border border-white/8 p-6 mb-6">
          <h2 className="font-condensed font-600 text-xs uppercase tracking-widest text-white/40 mb-4">
            Photos ({request.photoUrls.length})
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {request.photoUrls.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                <img
                  src={url}
                  alt={`Photo ${i + 1}`}
                  className="w-full aspect-square object-cover hover:opacity-80 transition-opacity"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="bg-card border border-white/8 p-6">
        <h2 className="font-condensed font-600 text-xs uppercase tracking-widest text-white/40 mb-4">
          Update Status
        </h2>
        <form action={updateThisRequest} className="space-y-4">
          <div>
            <label className="block font-condensed font-600 text-xs uppercase tracking-widest text-white/50 mb-2">
              Status
            </label>
            <select
              name="status"
              defaultValue={request.status}
              className="w-full bg-navy border border-white/12 text-white font-barlow font-300
                         text-sm px-4 py-3 outline-none focus:border-orange/50 transition-colors"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-condensed font-600 text-xs uppercase tracking-widest text-white/50 mb-2">
              Admin Notes
            </label>
            <textarea
              name="adminNotes"
              rows={4}
              defaultValue={request.adminNotes ?? ""}
              placeholder="Internal notes — not visible to the customer…"
              className="w-full bg-navy border border-white/12 text-white placeholder:text-white/20
                         font-barlow font-300 text-sm px-4 py-3 outline-none
                         focus:border-orange/50 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="font-condensed font-600 text-xs uppercase tracking-widest
                       bg-orange text-white px-5 py-2.5 hover:bg-amber transition-colors"
          >
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
}
