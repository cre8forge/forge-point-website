import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

async function updateArticle(id: string, formData: FormData) {
  "use server";
  const session = await auth();
  if (!session) redirect("/login");

  const status   = formData.get("status")   as string;
  const featured = formData.get("featured") === "true";

  await prisma.universityArticle.update({
    where: { id },
    data: {
      status:      status as any,
      featured,
      publishedAt: status === "PUBLISHED" ? new Date() : undefined,
    },
  });

  revalidatePath("/admin/university");
  revalidatePath("/university");
}

const STATUS_COLOR: Record<string, string> = {
  DRAFT:     "text-white/40 border-white/20",
  REVIEW:    "text-amber border-amber/30",
  PUBLISHED: "text-green-400 border-green-400/30",
  ARCHIVED:  "text-white/20 border-white/10",
};

const STATUS_OPTIONS = ["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"];

export default async function UniversityAdminPage() {
  const categories = await prisma.universityCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      articles: {
        orderBy: [{ status: "asc" }, { title: "asc" }],
      },
    },
  });

  return (
    <div className="p-8">
      <h1 className="font-cinzel font-700 text-white text-xl uppercase tracking-widest mb-8">
        University Articles
      </h1>

      <div className="space-y-10">
        {categories.map((cat) => (
          <div key={cat.id}>
            <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-3 border-l-2 border-orange pl-3">
              {cat.name}
              <span className="ml-2 font-barlow font-300 text-white/30 normal-case tracking-normal text-sm">
                ({cat.articles.length})
              </span>
            </h2>

            <div className="bg-card border border-white/8 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8">
                    {["Title", "Status", "Featured", "Action"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-condensed font-600 text-xs uppercase tracking-widest text-white/30">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cat.articles.map((article) => {
                    const updateThisArticle = updateArticle.bind(null, article.id);
                    return (
                      <tr key={article.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-barlow font-300 text-sm text-white/80">
                            {article.title}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-condensed font-600 text-xs uppercase tracking-wide border px-2 py-0.5 ${STATUS_COLOR[article.status]}`}>
                            {article.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-condensed font-600 text-xs uppercase ${article.featured ? "text-orange" : "text-white/20"}`}>
                            {article.featured ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <form action={updateThisArticle} className="flex items-center gap-2">
                            <select
                              name="status"
                              defaultValue={article.status}
                              className="bg-navy border border-white/12 text-white font-barlow font-300
                                         text-xs px-2 py-1 outline-none focus:border-orange/50 transition-colors"
                            >
                              {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <input
                              type="hidden"
                              name="featured"
                              value={article.featured ? "false" : "true"}
                            />
                            <button
                              type="submit"
                              name="featured"
                              value={article.featured ? "false" : "true"}
                              className="font-condensed font-600 text-xs uppercase tracking-wide
                                         text-white/40 hover:text-orange transition-colors px-2 py-1 border
                                         border-white/10 hover:border-orange/40"
                              formAction={updateThisArticle}
                            >
                              {article.featured ? "Unfeature" : "Feature"}
                            </button>
                            <button
                              type="submit"
                              className="font-condensed font-600 text-xs uppercase tracking-wide
                                         bg-orange/90 text-white hover:bg-orange transition-colors px-2 py-1"
                            >
                              Save
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
