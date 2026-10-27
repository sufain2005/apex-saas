import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  CreditCard,
  FolderKanban,
  HelpCircle,
  Key,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { LogoutButton } from "./logout-button";

export default async function DashboardLayout({
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

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .maybeSingle();

  const isActive = subscription?.status === "active";

  const navLinks = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
    { href: "/dashboard/team", label: "Team", icon: Users },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/billing", label: "Billing & Plans", icon: CreditCard },
    { href: "/dashboard/api-keys", label: "API Keys", icon: Key },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { href: "/dashboard/support", label: "Help & Support", icon: HelpCircle },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#f7f8f6] text-[#17211d]">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col justify-between border-r border-[#e5ebe5] bg-white p-6 md:flex">
        <div>
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#183d32] text-white shadow-sm">
              <Sparkles aria-hidden="true" size={19} />
            </span>
            <span className="text-lg font-semibold tracking-tight">Apex</span>
          </Link>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-1.5" aria-label="Dashboard navigation">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#52615a] transition hover:bg-[#f2f6f3] hover:text-[#183d32]"
                >
                  <Icon size={18} className="text-[#68766e]" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout in Sidebar */}
        <div className="space-y-4 border-t border-[#f0f4f0] pt-5">
          <div className="rounded-xl border border-[#e5ebe5] bg-[#fbfcfb] p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#718078]">Plan</p>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  isActive
                    ? "bg-[#eaf1eb] text-[#2d6a4f]"
                    : "bg-[#f5f0df] text-[#856404]"
                }`}
              >
                {isActive ? "Active Pro" : "Free Plan"}
              </span>
            </div>
            <p className="mt-2 truncate text-xs text-[#52615a] font-medium" title={user.email}>
              {user.email}
            </p>
          </div>

          <LogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-[#e5ebe5] bg-white px-6 sm:px-10">
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#183d32] text-white">
                <Sparkles size={16} />
              </span>
              <span className="font-semibold text-sm">Apex</span>
            </Link>
          </div>

          {/* Quick mobile links */}
          <div className="flex items-center gap-2 overflow-x-auto md:hidden">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#52615a] hover:bg-[#f2f6f3]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 text-xs md:flex">
            <Link
              href="/dashboard/notifications"
              className="relative rounded-lg p-2 text-[#52615a] hover:bg-[#f2f6f3] hover:text-[#183d32]"
              title="Notifications"
            >
              <Bell size={17} />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#52866c]" />
            </Link>
            <span className="text-[#68766e]">Signed in as:</span>
            <span className="font-semibold text-[#183d32]">{user.email}</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                isActive
                  ? "bg-[#eaf1eb] text-[#2d6a4f]"
                  : "bg-[#f5f0df] text-[#856404]"
              }`}
            >
              {isActive ? "Active Pro" : "Inactive (Free)"}
            </span>
          </div>

          <div className="md:hidden">
            <LogoutButton />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
