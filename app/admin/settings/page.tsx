import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

async function saveSetting(key: string, formData: FormData) {
  "use server";
  const session = await auth();
  if (!session) redirect("/login");

  const value = (formData.get("value") as string)?.trim();
  if (!value) return;

  await prisma.adminSetting.upsert({
    where:  { key },
    update: { value },
    create: { key, value },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/estimate");
}

const SETTING_DESCRIPTIONS: Record<string, { label: string; description: string; example: string }> = {
  MATERIAL_MARKUP: {
    label:       "Material Markup Multiplier",
    description: "Multiplies the base material cost. 1.50 = 50% markup over cost.",
    example:     "e.g. 1.50",
  },
  LABOR_RATE: {
    label:       "Labor Rate ($/hr)",
    description: "Hourly labor cost used in estimate formula.",
    example:     "e.g. 85.00",
  },
  MARKET_MULTIPLIER: {
    label:       "Northern CO Market Multiplier",
    description: "Adjusts all estimates for the local market. 1.10 = 10% above national average.",
    example:     "e.g. 1.10",
  },
};

export default async function SettingsPage() {
  const settings = await prisma.adminSetting.findMany({
    where: { key: { in: Object.keys(SETTING_DESCRIPTIONS) } },
  });

  const settingMap = Object.fromEntries(settings.map((s) => [s.key, s]));

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-cinzel font-700 text-white text-xl uppercase tracking-widest mb-2">
        Settings
      </h1>
      <p className="font-barlow font-300 text-white/40 text-sm mb-8">
        Global pricing formula multipliers. Changes take effect immediately on new estimates.
      </p>

      <div className="space-y-6">
        {Object.entries(SETTING_DESCRIPTIONS).map(([key, meta]) => {
          const current = settingMap[key];
          const saveThisSetting = saveSetting.bind(null, key);

          return (
            <div key={key} className="bg-card border border-white/8 p-6">
              <h2 className="font-cinzel font-700 text-white text-sm uppercase tracking-wide mb-1">
                {meta.label}
              </h2>
              <p className="font-barlow font-300 text-white/40 text-sm mb-4">
                {meta.description}
              </p>

              <form action={saveThisSetting} className="flex items-center gap-3">
                <input
                  name="value"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={current?.value ?? ""}
                  placeholder={meta.example}
                  className="w-36 bg-navy border border-white/12 text-white font-barlow font-300
                             text-sm px-4 py-2.5 outline-none focus:border-orange/50 transition-colors"
                />
                <button
                  type="submit"
                  className="font-condensed font-600 text-xs uppercase tracking-widest
                             bg-orange text-white px-4 py-2.5 hover:bg-amber transition-colors"
                >
                  Save
                </button>
                {current && (
                  <span className="font-barlow font-300 text-xs text-white/30">
                    Current: {current.value}
                  </span>
                )}
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
