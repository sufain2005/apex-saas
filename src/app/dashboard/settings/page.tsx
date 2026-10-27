import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  KeyRound,
  ShieldCheck,
  User,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordForm } from "./password-form";

export const metadata = {
  title: "Settings & Security — Apex",
};

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#17211d] sm:text-3xl">
          Account & Security Settings
        </h1>
        <p className="text-sm text-[#627069]">
          Manage your credentials, active authentication sessions, and security posture.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Card */}
        <Card className="rounded-2xl border-[#e5ebe5] bg-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User size={18} className="text-[#52866c]" />
              <CardTitle className="text-lg">Profile Details</CardTitle>
            </div>
            <CardDescription>Primary identity verified by Supabase Auth.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="rounded-xl border border-[#e5ebe5] bg-[#fbfcfb] p-3.5 space-y-1">
              <span className="font-semibold text-[#718078]">Email Address</span>
              <p className="font-medium text-[#17211d]">{user.email}</p>
            </div>

            <div className="rounded-xl border border-[#e5ebe5] bg-[#fbfcfb] p-3.5 space-y-1">
              <span className="font-semibold text-[#718078]">User Identifier (UUID)</span>
              <p className="font-mono text-[#52615a] truncate">{user.id}</p>
            </div>

            <div className="rounded-xl border border-[#e5ebe5] bg-[#fbfcfb] p-3.5 space-y-1">
              <span className="font-semibold text-[#718078]">Account Created</span>
              <p className="font-medium text-[#17211d]">{createdAt}</p>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card className="rounded-2xl border-[#e5ebe5] bg-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <KeyRound size={18} className="text-[#52866c]" />
              <CardTitle className="text-lg">Change Password</CardTitle>
            </div>
            <CardDescription>
              Update your account password securely.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
      </div>

      {/* Security Checklist Card */}
      <Card className="rounded-2xl border-[#e5ebe5] bg-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#52866c]" />
            <CardTitle className="text-lg">Security & Access Control</CardTitle>
          </div>
          <CardDescription>
            Real-time status of security layers safeguarding your data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-xl border border-[#e5ebe5] bg-[#fbfcfb] p-4 space-y-1">
              <p className="font-semibold text-[#183d32]">Row Level Security</p>
              <p className="text-[#627069]">
                PostgreSQL policy enforces query isolation on auth.uid().
              </p>
            </div>

            <div className="rounded-xl border border-[#e5ebe5] bg-[#fbfcfb] p-4 space-y-1">
              <p className="font-semibold text-[#183d32]">Proxy Guard</p>
              <p className="text-[#627069]">
                Next.js 16 Proxy intercepts and validates all /dashboard routes.
              </p>
            </div>

            <div className="rounded-xl border border-[#e5ebe5] bg-[#fbfcfb] p-4 space-y-1">
              <p className="font-semibold text-[#183d32]">Encrypted Cookies</p>
              <p className="text-[#627069]">
                Supabase SSR tokens stored strictly in HTTP-only cookies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
