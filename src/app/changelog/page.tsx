import Link from "next/link";
import { Calendar, GitCommit, Sparkles } from "lucide-react";

export const metadata = {
  title: "Changelog — Apex",
  description: "Track all recent updates, features, and fixes to the platform.",
};

const releases = [
  {
    version: "v2.0.0",
    date: "October 2026",
    title: "Complete Apex Upgrade",
    changes: [
      "Added multi-page Dashboard Suite (Overview, Billing, Projects, Team, Analytics, API Keys, Settings).",
      "Integrated full Next.js 16 Proxy route guards with Supabase SSR cookie authentication.",
      "Added PostgreSQL Row Level Security (RLS) policies for projects, subscriptions, and team members.",
      "Introduced Admin Control Panel (/admin) for user management and platform metrics.",
      "Created Marketing Website: About, Features, Pricing, Docs, Changelog, Contact, Legal.",
    ],
  },
  {
    version: "v1.0.0",
    date: "April 2026",
    title: "Initial SaaS Prototype Release",
    changes: [
      "Next.js App Router core scaffolding.",
      "Supabase email/password authentication.",
      "Stripe Checkout subscription integration with checkout.session.completed webhook handler.",
      "Tailwind CSS styling and shadcn/ui base primitives.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#17211d]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Apex home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#183d32] text-white shadow-sm">
            <Sparkles aria-hidden="true" size={19} />
          </span>
          <span className="text-lg font-semibold tracking-tight">Apex</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-[#52615a] hover:text-[#17211d]">
          Back to home
        </Link>
      </header>

      <section className="mx-auto max-w-4xl px-6 pt-12 text-center sm:px-10 sm:pt-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#dce6df] bg-white/80 px-3.5 py-1.5 text-xs font-medium text-[#426051]">
          <GitCommit size={14} className="text-[#52866c]" /> Product Updates
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Changelog</h1>
        <p className="mt-3 text-base text-[#627069]">
          Continuous improvements, new features, and updates to the platform.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
        <div className="space-y-12">
          {releases.map((rel) => (
            <div key={rel.version} className="rounded-3xl border border-[#e5ebe5] bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#eaf1eb] px-3 py-1 font-mono text-xs font-semibold text-[#2d6a4f]">
                  {rel.version}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#718078]">
                  <Calendar size={13} /> {rel.date}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#17211d]">{rel.title}</h2>
              <ul className="mt-5 space-y-2.5 text-sm text-[#52615a]">
                {rel.changes.map((change) => (
                  <li key={change} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#52866c]" />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
