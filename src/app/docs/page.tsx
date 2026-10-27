import Link from "next/link";
import { Book, Layers, ShieldCheck, Sparkles, Terminal } from "lucide-react";

export const metadata = {
  title: "Documentation — Apex",
  description: "Complete developer guides, environment configuration, and API reference.",
};

const docSections = [
  {
    title: "Getting Started",
    icon: Terminal,
    items: [
      { name: "Prerequisites & Requirements", desc: "Node.js 20+, Supabase account, and Stripe test account." },
      { name: "Environment Configuration", desc: "Setting up .env.local with Supabase URL, anon key, and Stripe secret." },
      { name: "Database Schema & RLS Setup", desc: "Running supabase/schema.sql in the Supabase SQL editor." },
    ],
  },
  {
    title: "Authentication & Security",
    icon: ShieldCheck,
    items: [
      { name: "Next.js 16 Proxy Protection", desc: "How src/proxy.ts guards /dashboard and /admin routes." },
      { name: "Server Actions & Auth", desc: "Handling registration, login, logout, and password resets securely." },
      { name: "PostgreSQL Row Level Security", desc: "Guaranteeing tenant isolation using auth.uid() database policies." },
    ],
  },
  {
    title: "Stripe & Subscriptions",
    icon: Layers,
    items: [
      { name: "Creating Checkout Sessions", desc: "Calling /api/checkout to generate hosted Stripe payment links." },
      { name: "Local Webhook Forwarding", desc: "Testing webhooks with the Stripe CLI (stripe listen --forward-to)." },
      { name: "Subscription Entitlements", desc: "Reading active/inactive status from public.subscriptions table." },
    ],
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#17211d]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Apex home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#183d32] text-white shadow-sm">
            <Sparkles aria-hidden="true" size={19} />
          </span>
          <span className="text-lg font-semibold tracking-tight">Apex Docs</span>
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-[#52615a]">
          <Link href="/dashboard" className="hover:text-[#17211d]">Dashboard</Link>
          <Link href="/features" className="hover:text-[#17211d]">Features</Link>
          <Link href="/pricing" className="hover:text-[#17211d]">Pricing</Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-12 sm:px-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#dce6df] bg-white/80 px-3.5 py-1.5 text-xs font-medium text-[#426051]">
          <Book size={14} className="text-[#52866c]" /> Developer Documentation
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          Quick Start & Technical Reference
        </h1>
        <p className="mt-3 text-base text-[#627069]">
          Everything you need to configure, extend, and deploy your SaaS platform.
        </p>

        {/* Quick Install Terminal Box */}
        <div className="mt-8 rounded-2xl bg-[#17211d] p-5 text-white shadow-md">
          <p className="text-xs font-semibold text-[#82c89f] uppercase tracking-wider">Quick Install</p>
          <pre className="mt-3 overflow-x-auto font-mono text-xs text-[#d0dfd7] leading-6">
{`# 1. Clone & install dependencies
git clone <repo-url> && npm install

# 2. Configure environment
Copy-Item .env.local.example .env.local

# 3. Start local development server
npm run dev`}
          </pre>
        </div>

        {/* Documentation Sections */}
        <div className="mt-12 space-y-12 pb-24">
          {docSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.title} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-[#eaf1eb] text-[#2d6a4f]">
                    <Icon size={18} />
                  </span>
                  <h2 className="text-xl font-semibold text-[#17211d]">{sec.title}</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {sec.items.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-2xl border border-[#e5ebe5] bg-white p-5 shadow-sm"
                    >
                      <h3 className="font-semibold text-sm text-[#17211d]">{item.name}</h3>
                      <p className="mt-1.5 text-xs text-[#627069] leading-5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
