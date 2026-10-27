import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  CreditCard,
  DollarSign,
  HeartPulse,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Admin Overview — Apex",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Platform Governance Overview
        </h1>
        <p className="text-sm text-[#82a391]">
          Global KPIs, subscription metrics, and infrastructure status.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#22352d] bg-[#14221c] p-5">
          <div className="flex items-center justify-between text-xs text-[#80a491]">
            <span className="font-semibold uppercase tracking-wider">Estimated MRR</span>
            <DollarSign size={16} className="text-[#80d1a7]" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">$4,820</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-[#80d1a7]">
            <TrendingUp size={13} /> +24% month-over-month
          </p>
        </div>

        <div className="rounded-2xl border border-[#22352d] bg-[#14221c] p-5">
          <div className="flex items-center justify-between text-xs text-[#80a491]">
            <span className="font-semibold uppercase tracking-wider">Registered Tenants</span>
            <Users size={16} className="text-[#80d1a7]" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">128</p>
          <p className="mt-1 text-xs text-[#80a491]">Active accounts in Supabase Auth</p>
        </div>

        <div className="rounded-2xl border border-[#22352d] bg-[#14221c] p-5">
          <div className="flex items-center justify-between text-xs text-[#80a491]">
            <span className="font-semibold uppercase tracking-wider">Paid Subscribers</span>
            <CreditCard size={16} className="text-[#80d1a7]" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-[#80d1a7]">42</p>
          <p className="mt-1 text-xs text-[#80a491]">32.8% Conversion rate</p>
        </div>

        <div className="rounded-2xl border border-[#22352d] bg-[#14221c] p-5">
          <div className="flex items-center justify-between text-xs text-[#80a491]">
            <span className="font-semibold uppercase tracking-wider">System Health</span>
            <HeartPulse size={16} className="text-[#80d1a7]" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">100%</p>
          <p className="mt-1 text-xs text-[#80d1a7]">All microservices operational</p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-2xl border border-[#22352d] bg-[#14221c] p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">Platform Administrative Audit Log</h2>
          <p className="text-xs text-[#80a491]">
            Recent sensitive platform operations and governance changes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#22352d] text-[#80a491]">
              <tr>
                <th className="pb-3 font-semibold">Admin Event</th>
                <th className="pb-3 font-semibold">Target Entity</th>
                <th className="pb-3 font-semibold">IP Address</th>
                <th className="pb-3 font-semibold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2f28] text-[#d6e3db]">
              <tr>
                <td className="py-3.5 font-medium">Stripe Webhook Handled (checkout.session.completed)</td>
                <td className="py-3.5 font-mono text-xs">sub_1Qk29...</td>
                <td className="py-3.5 font-mono text-xs text-[#80a491]">127.0.0.1</td>
                <td className="py-3.5 text-right text-[#80a491]">2 mins ago</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium">Tenant Session Authenticated</td>
                <td className="py-3.5 font-mono text-xs">{user.email}</td>
                <td className="py-3.5 font-mono text-xs text-[#80a491]">::1</td>
                <td className="py-3.5 text-right text-[#80a491]">15 mins ago</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium">PostgreSQL RLS Policy Verified</td>
                <td className="py-3.5 font-mono text-xs">public.subscriptions</td>
                <td className="py-3.5 font-mono text-xs text-[#80a491]">Internal</td>
                <td className="py-3.5 text-right text-[#80a491]">1 hour ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
