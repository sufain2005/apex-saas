import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Check,
  Download,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscribeButton } from "../subscribe-button";

export const metadata = {
  title: "Billing & Plans — Apex",
};

export default async function BillingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, stripe_subscription_id, created_at, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();

  const isActive = subscription?.status === "active";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#17211d] sm:text-3xl">
          Billing & Subscriptions
        </h1>
        <p className="text-sm text-[#627069]">
          Manage your plan, payment methods, and invoice history.
        </p>
      </div>

      {/* Plan Card */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border-[#e5ebe5] bg-white lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">
                  {isActive ? "Pro Plan" : "Free Starter Plan"}
                </CardTitle>
                <CardDescription>
                  {isActive
                    ? "Your subscription is active and managed by Stripe."
                    : "You are currently on the free tier."}
                </CardDescription>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isActive
                    ? "bg-[#eaf1eb] text-[#2d6a4f]"
                    : "bg-[#f5f0df] text-[#856404]"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#17211d]">
                {isActive ? "$19" : "$0"}
              </span>
              <span className="text-sm text-[#718078]">/ month</span>
            </div>

            <div className="space-y-3 border-t border-[#f2f6f3] pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
                Included in your plan:
              </p>
              <div className="grid gap-2 sm:grid-cols-2 text-sm text-[#485850]">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-[#52866c]" /> Unlimited projects
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-[#52866c]" /> 100,000 requests / month
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-[#52866c]" /> Stripe automated checkout
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-[#52866c]" /> Webhook synchronization
                </div>
              </div>
            </div>

            <div className="border-t border-[#f2f6f3] pt-6">
              {!isActive ? (
                <div className="max-w-xs">
                  <SubscribeButton />
                </div>
              ) : (
                <div className="rounded-xl bg-[#eaf1eb] p-4 text-xs leading-5 text-[#2d6a4f]">
                  <p className="font-semibold">Subscription Active</p>
                  <p className="mt-1">
                    Your account is in good standing. Stripe handles all automated renewals securely.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security & Payment Provider Info */}
        <Card className="rounded-2xl border-[#e5ebe5] bg-white">
          <CardHeader>
            <CardTitle className="text-base">Payment Security</CardTitle>
            <CardDescription>Powered by Stripe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-[#627069]">
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="shrink-0 text-[#52866c]" />
              <p>
                All credit card processing is handled directly by Stripe. Your sensitive payment details are never stored on our servers.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="shrink-0 text-[#52866c]" />
              <p>
                Encrypted with TLS 1.3 and compliant with PCI-DSS Level 1 standards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice History Mock Table */}
      <Card className="rounded-2xl border-[#e5ebe5] bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Invoice History</CardTitle>
          <CardDescription>Download receipts and view past charges.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#f2f6f3] text-[#718078]">
                <tr>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Description</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f6f3] text-[#17211d]">
                {isActive ? (
                  <tr>
                    <td className="py-3.5 text-[#627069]">Current cycle</td>
                    <td className="py-3.5 font-medium">Pro Subscription (Monthly)</td>
                    <td className="py-3.5 font-semibold">$19.99</td>
                    <td className="py-3.5">
                      <span className="rounded-full bg-[#eaf1eb] px-2 py-0.5 text-[11px] font-medium text-[#2d6a4f]">
                        Paid
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-[#52866c]">
                      <span className="inline-flex cursor-pointer items-center gap-1 hover:underline">
                        <Download size={13} /> PDF
                      </span>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-[#8e9c93]">
                      No invoice history available yet. Upgrade to Pro to view receipts.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
