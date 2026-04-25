import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

async function updateServicePrice(id: string, formData: FormData) {
  "use server";
  const session = await auth();
  if (!session) redirect("/login");

  const low  = parseFloat(formData.get("low")  as string);
  const high = parseFloat(formData.get("high") as string);

  if (isNaN(low) || isNaN(high)) return;

  await prisma.estimateService.update({
    where: { id },
    data: { override_low: low, override_high: high },
  });

  revalidatePath("/admin/pricing");
  revalidatePath("/estimate");
}

export default async function PricingPage() {
  const categories = await prisma.estimateCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      services: {
        where:   { active: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  return (
    <div className="p-8">
      <h1 className="font-cinzel font-700 text-white text-xl uppercase tracking-widest mb-2">
        Pricing
      </h1>
      <p className="font-barlow font-300 text-white/40 text-sm mb-8">
        Edit override_low and override_high per service. These bypass the formula entirely.
      </p>

      <div className="space-y-10">
        {categories.map((cat) => (
          <div key={cat.id}>
            <h2 className="font-cinzel font-700 text-white text-xs uppercase tracking-widest mb-3 border-l-2 border-orange pl-3">
              {cat.name}
            </h2>

            <div className="bg-card border border-white/8 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8">
                    {["Service", "Unit", "Low ($/unit)", "High ($/unit)", ""].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-condensed font-600 text-xs uppercase tracking-widest text-white/30">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cat.services.map((svc) => {
                    const updateThisService = updateServicePrice.bind(null, svc.id);
                    return (
                      <tr key={svc.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-4 py-3 font-barlow font-300 text-sm text-white/80">
                          {svc.name}
                        </td>
                        <td className="px-4 py-3 font-barlow font-300 text-xs text-white/40">
                          {svc.unit}
                        </td>
                        <td className="px-4 py-3">
                          <form action={updateThisService} id={`form-${svc.id}`} className="contents">
                            <input
                              name="low"
                              type="number"
                              step="0.01"
                              min="0"
                              defaultValue={svc.override_low?.toString() ?? ""}
                              className="w-24 bg-navy border border-white/12 text-white font-barlow font-300
                                         text-sm px-2 py-1.5 outline-none focus:border-orange/50 transition-colors"
                            />
                          </form>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            form={`form-${svc.id}`}
                            name="high"
                            type="number"
                            step="0.01"
                            min="0"
                            defaultValue={svc.override_high?.toString() ?? ""}
                            className="w-24 bg-navy border border-white/12 text-white font-barlow font-300
                                       text-sm px-2 py-1.5 outline-none focus:border-orange/50 transition-colors"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <button
                            form={`form-${svc.id}`}
                            type="submit"
                            className="font-condensed font-600 text-xs uppercase tracking-wide
                                       bg-orange/80 text-white hover:bg-orange transition-colors px-3 py-1.5"
                          >
                            Save
                          </button>
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
