import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Activity,
  CheckCircle2,
  Clock,
  HardDrive,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Analytics & Usage — Apex",
};

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const dailyVolume = [
    { day: "Mon", calls: 140, pct: 40 },
    { day: "Tue", calls: 220, pct: 65 },
    { day: "Wed", calls: 310, pct: 90 },
    { day: "Thu", calls: 190, pct: 55 },
    { day: "Fri", calls: 280, pct: 80 },
    { day: "Sat", calls: 110, pct: 30 },
    { day: "Sun", calls: 170, pct: 50 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#17211d] sm:text-3xl">
          Platform Analytics
        </h1>
        <p className="text-sm text-[#627069]">
          Real-time telemetry, API throughput, and resource utilization.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-[#e5ebe5] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
              Total Requests
            </span>
            <Activity size={16} className="text-[#52866c]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#17211d]">1,420</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-[#2d6a4f]">
            <TrendingUp size={13} /> +18.4% this week
          </p>
        </Card>

        <Card className="rounded-2xl border-[#e5ebe5] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
              Avg. Latency
            </span>
            <Clock size={16} className="text-[#335c8d]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#17211d]">42 ms</p>
          <p className="mt-1 text-xs text-[#2d6a4f]">Global Edge 99.8%</p>
        </Card>

        <Card className="rounded-2xl border-[#e5ebe5] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
              Success Rate
            </span>
            <CheckCircle2 size={16} className="text-[#2d6a4f]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#2d6a4f]">99.94%</p>
          <p className="mt-1 text-xs text-[#718078]">0.06% 4xx / 5xx</p>
        </Card>

        <Card className="rounded-2xl border-[#e5ebe5] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
              Data Transfer
            </span>
            <HardDrive size={16} className="text-[#9b7a31]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#17211d]">4.2 GB</p>
          <p className="mt-1 text-xs text-[#718078]">of 50 GB monthly cap</p>
        </Card>
      </div>

      {/* Daily Volume Visual Chart */}
      <Card className="rounded-2xl border-[#e5ebe5] bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Request Throughput</CardTitle>
              <CardDescription>Daily API calls across all workspace environments.</CardDescription>
            </div>
            <span className="rounded-full bg-[#f4f7f4] px-3 py-1 text-xs font-medium text-[#52866c]">
              Last 7 Days
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex h-44 items-end gap-4 pt-6 sm:gap-8">
            {dailyVolume.map((item) => (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[11px] font-medium text-[#627069]">{item.calls}</span>
                <div className="w-full rounded-t-xl bg-[#eaf1eb] p-0.5">
                  <div
                    style={{ height: `${item.pct}%` }}
                    className="w-full rounded-t-lg bg-[#183d32] transition-all hover:bg-[#2d6a4f]"
                  />
                </div>
                <span className="text-xs font-semibold text-[#718078]">{item.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Endpoints Table */}
      <Card className="rounded-2xl border-[#e5ebe5] bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Top Endpoints</CardTitle>
          <CardDescription>Most frequently invoked API routes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#f2f6f3] text-[#718078]">
                <tr>
                  <th className="pb-3 font-semibold">Endpoint</th>
                  <th className="pb-3 font-semibold">Method</th>
                  <th className="pb-3 font-semibold">Total Invocations</th>
                  <th className="pb-3 font-semibold">Avg. Duration</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f6f3] text-[#17211d]">
                <tr>
                  <td className="py-3.5 font-mono text-xs">/api/v1/auth/session</td>
                  <td className="py-3.5">
                    <span className="rounded bg-[#f2f4f8] px-1.5 py-0.5 text-[10px] font-bold text-[#335c8d]">
                      GET
                    </span>
                  </td>
                  <td className="py-3.5 font-medium">842</td>
                  <td className="py-3.5 text-[#627069]">28 ms</td>
                  <td className="py-3.5 text-right font-semibold text-[#2d6a4f]">200 OK</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-mono text-xs">/api/checkout</td>
                  <td className="py-3.5">
                    <span className="rounded bg-[#eaf1eb] px-1.5 py-0.5 text-[10px] font-bold text-[#2d6a4f]">
                      POST
                    </span>
                  </td>
                  <td className="py-3.5 font-medium">319</td>
                  <td className="py-3.5 text-[#627069]">65 ms</td>
                  <td className="py-3.5 text-right font-semibold text-[#2d6a4f]">200 OK</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-mono text-xs">/api/webhooks/stripe</td>
                  <td className="py-3.5">
                    <span className="rounded bg-[#eaf1eb] px-1.5 py-0.5 text-[10px] font-bold text-[#2d6a4f]">
                      POST
                    </span>
                  </td>
                  <td className="py-3.5 font-medium">259</td>
                  <td className="py-3.5 text-[#627069]">44 ms</td>
                  <td className="py-3.5 text-right font-semibold text-[#2d6a4f]">200 OK</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
