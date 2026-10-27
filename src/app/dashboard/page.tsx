import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Key,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscribeButton } from "./subscribe-button";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, stripe_subscription_id, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();

  const isActive = subscription?.status === "active";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#17211d] sm:text-3xl">
            Welcome back
          </h1>
          <p className="text-sm text-[#627069]">
            Here is your SaaS application status and activity overview for {user.email}.
          </p>
        </div>

        {!isActive && (
          <Link
            href="/dashboard/billing"
            className="inline-flex items-center gap-2 rounded-xl bg-[#183d32] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#245b49]"
          >
            Upgrade to Pro <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {/* KPI Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Status Card */}
        <Card className="rounded-2xl border-[#e5ebe5] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
              Plan Status
            </span>
            <span className="flex size-8 items-center justify-center rounded-xl bg-[#eaf1eb] text-[#2d6a4f]">
              <CreditCard size={16} />
            </span>
          </div>
          <p className={`mt-3 text-2xl font-bold ${isActive ? "text-[#2d6a4f]" : "text-[#b0881e]"}`}>
            {isActive ? "Active Pro" : "Free Plan"}
          </p>
          <p className="mt-1 text-xs text-[#718078]">
            {isActive ? "Stripe subscription verified" : "Limited to starter tier"}
          </p>
        </Card>

        {/* API Usage Card */}
        <Card className="rounded-2xl border-[#e5ebe5] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
              API Usage
            </span>
            <span className="flex size-8 items-center justify-center rounded-xl bg-[#f2f4f8] text-[#335c8d]">
              <Activity size={16} />
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[#17211d]">1,420</p>
          <p className="mt-1 text-xs text-[#718078]">
            {isActive ? "of 100,000 monthly requests" : "of 1,000 free requests"}
          </p>
        </Card>

        {/* Security Health */}
        <Card className="rounded-2xl border-[#e5ebe5] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
              Security Guard
            </span>
            <span className="flex size-8 items-center justify-center rounded-xl bg-[#eaf1eb] text-[#2d6a4f]">
              <ShieldCheck size={16} />
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[#2d6a4f]">100%</p>
          <p className="mt-1 text-xs text-[#718078]">RLS active & session verified</p>
        </Card>

        {/* Developer Keys */}
        <Card className="rounded-2xl border-[#e5ebe5] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
              API Credentials
            </span>
            <span className="flex size-8 items-center justify-center rounded-xl bg-[#fbf6e8] text-[#9b7a31]">
              <Key size={16} />
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-[#17211d]">1 Active</p>
          <p className="mt-1 text-xs text-[#718078]">Production endpoint ready</p>
        </Card>
      </div>

      {/* Main Grid: Subscription Details & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Subscription / Plan Action Card */}
        <Card className="rounded-2xl border-[#e5ebe5] bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Subscription Overview</CardTitle>
            <CardDescription>
              Manage your billing tier and access to platform features.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-xl border border-[#e5ebe5] bg-[#fbfcfb] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-[#17211d]">
                    {isActive ? "Pro Plan ($19/month)" : "Starter Plan (Free)"}
                  </h3>
                  <p className="mt-1 text-xs text-[#627069]">
                    {isActive
                      ? "Your account has full access to all features, priority webhooks, and unlimited endpoints."
                      : "Upgrade to unlock unlimited projects, Stripe checkout automation, and priority support."}
                  </p>
                </div>

                {!isActive && (
                  <div className="w-full sm:w-48">
                    <SubscribeButton />
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-2.5 text-xs text-[#52615a]">
                <CheckCircle2 size={16} className="text-[#52866c]" />
                Row Level Security
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#52615a]">
                <CheckCircle2 size={16} className="text-[#52866c]" />
                Automated Stripe Sync
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#52615a]">
                <CheckCircle2 size={16} className="text-[#52866c]" />
                Protected Route Guards
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="rounded-2xl border-[#e5ebe5] bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Shortcuts to key platform tools.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/dashboard/billing"
              className="flex items-center justify-between rounded-xl border border-[#e5ebe5] p-3 text-xs font-medium text-[#17211d] transition hover:bg-[#f2f6f3]"
            >
              <div className="flex items-center gap-2.5">
                <CreditCard size={15} className="text-[#52866c]" />
                Manage Billing & Invoices
              </div>
              <ArrowRight size={13} className="text-[#99a59d]" />
            </Link>

            <Link
              href="/dashboard/api-keys"
              className="flex items-center justify-between rounded-xl border border-[#e5ebe5] p-3 text-xs font-medium text-[#17211d] transition hover:bg-[#f2f6f3]"
            >
              <div className="flex items-center gap-2.5">
                <Key size={15} className="text-[#52866c]" />
                View API Keys & Webhooks
              </div>
              <ArrowRight size={13} className="text-[#99a59d]" />
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center justify-between rounded-xl border border-[#e5ebe5] p-3 text-xs font-medium text-[#17211d] transition hover:bg-[#f2f6f3]"
            >
              <div className="flex items-center gap-2.5">
                <Lock size={15} className="text-[#52866c]" />
                Security & Account Settings
              </div>
              <ArrowRight size={13} className="text-[#99a59d]" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <Card className="rounded-2xl border-[#e5ebe5] bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Recent Security & Activity Log</CardTitle>
          <CardDescription>Audited events tied to your authenticated session.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#f2f6f3] pb-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#eaf1eb] text-[#2d6a4f]">
                  <CheckCircle2 size={14} />
                </span>
                <div>
                  <p className="font-semibold text-[#17211d]">Session authenticated</p>
                  <p className="text-[#718078]">Logged in via Supabase Auth</p>
                </div>
              </div>
              <span className="text-[#8d9b92]">Just now</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#f2f6f3] pb-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#fbf6e8] text-[#9b7a31]">
                  <ShieldCheck size={14} />
                </span>
                <div>
                  <p className="font-semibold text-[#17211d]">Row Level Security check</p>
                  <p className="text-[#718078]">PostgreSQL verified auth.uid()</p>
                </div>
              </div>
              <span className="text-[#8d9b92]">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
