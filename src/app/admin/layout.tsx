import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  HeartPulse,
  LayoutDashboard,
  ShieldAlert,
  Users,
} from "lucide-react";
import { LogoutButton } from "../dashboard/logout-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const adminNav = [
    { href: "/admin", label: "Admin Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: "User Management", icon: Users },
    { href: "/admin/health", label: "System Health", icon: HeartPulse },
  ];

  return (
    <div className="flex min-h-screen bg-[#101915] text-[#f7f8f6]">
      {/* Admin Sidebar */}
      <aside className="hidden w-64 flex-col justify-between border-r border-[#1e2f28] bg-[#0c1411] p-6 md:flex">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#52866c] text-[#0c1411] font-bold">
              <ShieldAlert size={20} />
            </span>
            <div>
              <span className="text-sm font-bold tracking-tight text-white">Admin Console</span>
              <p className="text-[10px] text-[#80a491]">Platform Ops</p>
            </div>
          </div>

          <nav className="mt-8 space-y-1.5">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#a8beaf] transition hover:bg-[#182821] hover:text-white"
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 border-t border-[#1e2f28] pt-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-medium text-[#7d9b89] hover:text-white"
          >
            <ArrowLeft size={14} /> Back to User App
          </Link>
          <div className="rounded-xl border border-[#22352d] bg-[#14221c] p-3 text-[11px]">
            <p className="text-[#80a491]">Admin Authenticated</p>
            <p className="font-mono text-white truncate">{user.email}</p>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Admin Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-[#1e2f28] bg-[#0c1411] px-6 sm:px-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#52866c]/20 px-2.5 py-1 text-[11px] font-semibold text-[#80d1a7]">
              SUPERADMIN ROLE
            </span>
            <span className="text-xs text-[#7d9b89] hidden sm:inline">
              Multi-Tenant Governance & Telemetry
            </span>
          </div>

          <Link
            href="/dashboard"
            className="text-xs font-medium text-[#7d9b89] hover:text-white md:hidden"
          >
            &larr; Exit Admin
          </Link>
        </header>

        <main className="flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
