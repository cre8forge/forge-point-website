import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const revalidate = 60;

export default async function AdminDashboard() {
  const [newRequests, draftArticles, publishedArticles, totalServices] =
    await Promise.all([
      prisma.serviceRequest.count({ where: { status: "NEW" } }),
      prisma.universityArticle.count({ where: { status: { in: ["DRAFT", "REVIEW"] } } }),
      prisma.universityArticle.count({ where: { status: "PUBLISHED" } }),
      prisma.estimateService.count({ where: { active: true } }),
    ]);

  const recentRequests = await prisma.serviceRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      serviceCategory: true,
      status: true,
      createdAt: true,
    },
  });

  const STATUS_COLOR: Record<string, string> = {
    NEW:       "text-orange",
    REVIEWED:  "text-blue-400",
    QUOTED:    "text-purple-400",
    SCHEDULED: "text-teal-400",
    COMPLETED: "text-green-400",
    ARCHIVED:  "text-white/30",
  };

  return (
    <div className="p-8">
      <h1 className="font-cinzel font-700 text-white text-xl uppercase tracking-widest mb-8">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "New Requests",       value: newRequests,       href: "/admin/requests",   accent: newRequests > 0 },
          { label: "Needs Review",       value: draftArticles,     href: "/admin/university", accent: draftArticles > 0 },
          { label: "Published Articles", value: publishedArticles, href: "/admin/university", accent: false },
          { label: "Active Services",    value: totalServices,     href: "/admin/pricing",    accent: false },
        ].map(({ label, value, href, accent }) => (
          <Link
            key={label}
            href={href}
            className="bg-card border border-white/8 hover:border-orange/40 p-5 transition-all"
          >
            <p className="font-condensed font-600 text-xs uppercase tracking-widest text-white/40 mb-2">
              {label}
            </p>
            <p className={`font-cinzel font-700 text-3xl ${accent ? "text-orange" : "text-white"}`}>
              {value}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent requests */}
      <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-4 border-l-2 border-orange pl-3">
        Recent Requests
      </h2>
      <div className="bg-card border border-white/8 overflow-hidden">
        {recentRequests.length === 0 ? (
          <p className="px-5 py-8 font-barlow font-300 text-white/40 text-sm text-center">
            No requests yet.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                {["Name", "Email", "Service", "Status", "Date"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-condensed font-600 text-xs uppercase
                               tracking-widest text-white/30"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/requests/${r.id}`}
                      className="font-barlow font-300 text-sm text-white hover:text-orange transition-colors"
                    >
                      {r.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-barlow font-300 text-sm text-white/50">{r.email}</td>
                  <td className="px-4 py-3 font-barlow font-300 text-sm text-white/50">
                    {r.serviceCategory ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-condensed font-600 text-xs uppercase tracking-wide ${STATUS_COLOR[r.status]}`}>
                      {r.status}
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
      <Link
        href="/admin/requests"
        className="inline-block mt-3 font-condensed font-600 text-xs uppercase tracking-widest text-orange hover:text-amber transition-colors"
      >
        View All Requests →
      </Link>
    </div>
  );
}
