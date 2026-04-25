import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Inbox,
  BookOpen,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard",   href: "/admin",            icon: LayoutDashboard },
  { label: "Requests",    href: "/admin/requests",   icon: Inbox },
  { label: "University",  href: "/admin/university", icon: BookOpen },
  { label: "Pricing",     href: "/admin/pricing",    icon: DollarSign },
  { label: "Settings",    href: "/admin/settings",   icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-navy flex">
      {/* ── Sidebar ── */}
      <aside className="w-56 flex-shrink-0 bg-[#080F17] border-r border-white/8 flex flex-col">
        {/* Logo */}
        <div className="px-5 py-6 border-b border-white/8">
          <Link href="/" className="font-cinzel font-900 text-white text-sm tracking-[0.2em] uppercase">
            <span className="text-orange mr-1">◆</span> FORGE POINT
          </Link>
          <p className="font-condensed font-600 text-[10px] uppercase tracking-widest text-white/30 mt-1">
            Admin
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 font-condensed font-600 text-xs
                         uppercase tracking-wide text-white/50 hover:text-white hover:bg-white/5
                         transition-all rounded-sm group"
            >
              <Icon size={14} className="group-hover:text-orange transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Sign out */}
        <div className="px-3 py-4 border-t border-white/8">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-3 py-2.5 font-condensed font-600
                         text-xs uppercase tracking-wide text-white/30 hover:text-red-400
                         hover:bg-white/5 transition-all rounded-sm"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
