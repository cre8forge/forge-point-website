import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export const revalidate = 0;

const STATUS_LABELS: Record<string, string> = {
  NEW:       "New",
  REVIEWED:  "Reviewed",
  QUOTED:    "Quoted",
  SCHEDULED: "Scheduled",
  COMPLETED: "Completed",
  ARCHIVED:  "Archived",
};

const STATUS_COLOR: Record<string, string> = {
  NEW:       "text-orange border-orange/30 bg-orange/10",
  REVIEWED:  "text-blue-400 border-blue-400/30 bg-blue-400/10",
  QUOTED:    "text-purple-400 border-purple-400/30 bg-purple-400/10",
  SCHEDULED: "text-teal-400 border-teal-400/30 bg-teal-400/10",
  COMPLETED: "text-green-400 border-green-400/30 bg-green-400/10",
  ARCHIVED:  "text-white/30 border-white/10 bg-white/5",
};

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusFilter } = await searchParams;

  const requests = await prisma.serviceRequest.findMany({
    where:   statusFilter ? { status: statusFilter as any } : undefined,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      serviceCategory: true,
      urgency: true,
      status: true,
      photoUrls: true,
      createdAt: true,
    },
  });

  return (
    <div className="p-8">
      <h1 className="font-cinzel font-700 text-white text-xl uppercase tracking-widest mb-6">
        Service Requests
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/admin/requests"
          className={`font-condensed font-600 text-xs uppercase tracking-wide px-3 py-1.5 border transition-all
            ${!statusFilter ? "bg-orange text-white border-orange" : "text-white/50 border-white/20 hover:text-white"}`}
        >
          All
        </Link>
        {Object.entries(STATUS_LABELS).map(([val, label]) => (
          <Link
            key={val}
            href={`/admin/requests?status=${val}`}
            className={`font-condensed font-600 text-xs uppercase tracking-wide px-3 py-1.5 border transition-all
              ${statusFilter === val ? "bg-orange text-white border-orange" : "text-white/50 border-white/20 hover:text-white"}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="bg-card border border-white/8 overflow-hidden">
        {requests.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <MessageSquare size={32} className="text-white/20 mx-auto mb-3" />
            <p className="font-barlow font-300 text-white/40 text-sm">No requests found.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                {["Name", "Service", "Urgency", "Photos", "Status", "Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-condensed font-600 text-xs uppercase tracking-widest text-white/30">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/requests/${r.id}`}
                      className="font-barlow font-400 text-sm text-white hover:text-orange transition-colors block"
                    >
                      {r.name}
                    </Link>
                    <span className="font-barlow font-300 text-xs text-white/40">{r.email}</span>
                  </td>
                  <td className="px-4 py-3 font-barlow font-300 text-sm text-white/60">
                    {r.serviceCategory ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-condensed font-600 text-xs uppercase tracking-wide text-white/50">
                    {r.urgency}
                  </td>
                  <td className="px-4 py-3 font-barlow font-300 text-sm text-white/40">
                    {r.photoUrls.length > 0 ? `${r.photoUrls.length} photo${r.photoUrls.length > 1 ? "s" : ""}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-condensed font-600 text-xs uppercase tracking-wide px-2 py-0.5 border ${STATUS_COLOR[r.status]}`}>
                      {STATUS_LABELS[r.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-barlow font-300 text-xs text-white/30">
                    {r.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
