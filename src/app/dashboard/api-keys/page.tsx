import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Code, Webhook } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiKeyManager } from "./api-key-manager";

export const metadata = {
  title: "API Keys & Developer — Apex",
};

export default async function ApiKeysPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#17211d] sm:text-3xl">
          API Keys & Webhooks
        </h1>
        <p className="text-sm text-[#627069]">
          Manage secret tokens for authenticating programmatic requests to your SaaS API.
        </p>
      </div>

      {/* API Key Manager Card */}
      <ApiKeyManager userId={user.id} />

      {/* Webhooks Section */}
      <Card className="rounded-2xl border-[#e5ebe5] bg-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Webhook size={18} className="text-[#52866c]" />
            <CardTitle className="text-lg">Webhook Endpoints</CardTitle>
          </div>
          <CardDescription>
            Configured webhook listeners receiving external event notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border border-[#e5ebe5] bg-[#fbfcfb] p-4 text-xs">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[#17211d]">Stripe Webhook Handler</p>
                <code className="text-[#52615a]">/api/webhooks/stripe</code>
              </div>
              <span className="inline-flex w-fit items-center rounded-full bg-[#eaf1eb] px-2.5 py-0.5 text-[11px] font-medium text-[#2d6a4f]">
                Listening for checkout.session.completed
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Snippet Example */}
      <Card className="rounded-2xl border-[#e5ebe5] bg-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code size={18} className="text-[#52866c]" />
            <CardTitle className="text-lg">Example API Request</CardTitle>
          </div>
          <CardDescription>How to authenticate using your secret bearer token.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-xl bg-[#17211d] p-4 text-xs leading-5 text-[#d0dfd7]">
            {`curl -X POST https://your-domain.com/api/v1/resource \\
  -H "Authorization: Bearer sk_live_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"action": "sync"}'`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
