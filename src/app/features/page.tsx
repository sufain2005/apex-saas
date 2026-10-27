import Link from "next/link";
import {
  ArrowRight,
  Code2,
  CreditCard,
  Database,
  Lock,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Features — Apex",
  description: "Architecture, authentication, billing, and enterprise security features.",
};

const featureList = [
  {
    icon: ShieldCheck,
    title: "Secure Supabase Authentication",
    description:
      "Pre-configured email & password authentication with strict password validation, CSRF resistance, and secure HTTP-only cookies backed by @supabase/ssr.",
    badge: "Auth & Identity",
  },
  {
    icon: Database,
    title: "PostgreSQL & Row Level Security (RLS)",
    description:
      "Every database query respects PostgreSQL RLS policies. Users can only access and update their own records, preventing horizontal privilege escalation by design.",
    badge: "Database",
  },
  {
    icon: CreditCard,
    title: "Stripe Subscriptions & Webhooks",
    description:
      "Stripe Checkout session generator with automated webhook verification (checkout.session.completed) that synchronizes billing statuses to your database in real time.",
    badge: "Payments",
  },
  {
    icon: Server,
    title: "Next.js 16 App Router & Server Actions",
    description:
      "Modern full-stack architecture leveraging React Server Components (RSC) for minimal client bundle size, Next.js 16 proxy route guards, and type-safe Server Actions.",
    badge: "Architecture",
  },
  {
    icon: Lock,
    title: "Hardened Security Headers",
    description:
      "Automated HTTP security headers in next.config.ts including strict X-Frame-Options (DENY), nosniff, strict referrer policy, and production HSTS headers.",
    badge: "Security",
  },
  {
    icon: Code2,
    title: "Modern UI System with Tailwind CSS v4",
    description:
      "Built with Tailwind CSS v4, shadcn/ui and @base-ui/react primitives. Accessible, keyboard-navigable, lightweight, and cleanly customizable.",
    badge: "Design System",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#17211d]">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Apex home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#183d32] text-white shadow-sm">
            <Sparkles aria-hidden="true" size={19} />
          </span>
          <span className="text-lg font-semibold tracking-tight">Apex</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Main navigation">
          <Link
            href="/features"
            className="rounded-full bg-white/80 px-3 py-2 text-sm font-medium text-[#183d32] shadow-sm sm:px-4"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-[#52615a] transition hover:text-[#17211d] md:inline-flex"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="rounded-full px-3 py-2 text-sm font-medium text-[#52615a] transition hover:text-[#17211d] sm:px-4"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className={cn(
              buttonVariants(),
              "h-9 rounded-full bg-[#183d32] px-4 text-xs font-medium text-white hover:bg-[#245b49] sm:h-10 sm:px-5 sm:text-sm"
            )}
          >
            Get started <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-12 text-center sm:px-10 sm:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#dce6df] bg-white/80 px-3.5 py-2 text-xs font-medium text-[#426051] shadow-sm">
          <Sparkles aria-hidden="true" size={14} className="text-[#52866c]" />
          Production-Ready Tech Stack
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#17211d] sm:text-5xl lg:text-6xl">
          Engineered for velocity, <br className="hidden sm:inline" />
          <span className="text-[#52866c]">security, and reliability</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#627069] sm:text-lg">
          Stop building auth, billing, and layout boilerplates for the hundredth time. Everything you need to go from idea to paying customers is already wired up.
        </p>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureList.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex flex-col justify-between rounded-3xl border border-[#e5ebe5] bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-[#eaf1eb] text-[#426c52]">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full bg-[#f4f7f4] px-3 py-1 text-xs font-medium text-[#52866c]">
                      {feat.badge}
                    </span>
                  </div>
                  <h2 className="mt-6 text-lg font-semibold text-[#17211d]">{feat.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#627069]">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Architecture Highlights Banner */}
      <section className="border-t border-[#e7ece7] bg-white/70 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="rounded-3xl border border-[#dce6df] bg-[#183d32] p-8 text-white shadow-xl sm:p-12">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#a3dec0]">
              Built with Modern Standards
            </span>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Ready to build your next SaaS product?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#d0dfd7] sm:text-base">
              Get full source code control, zero vendor lock-in, and an enterprise foundation ready to handle thousands of active users from day one.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[#183d32] shadow-sm transition hover:bg-[#eef5f1]"
              >
                Create Free Account
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-medium text-white transition hover:bg-white/10"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-xs text-[#7b877f] sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>© {new Date().getFullYear()} Apex. Built for your next idea.</p>
        <div className="flex gap-4">
          <Link href="/features" className="hover:text-[#17211d]">Features</Link>
          <Link href="/pricing" className="hover:text-[#17211d]">Pricing</Link>
          <Link href="/login" className="hover:text-[#17211d]">Log in</Link>
          <Link href="/signup" className="hover:text-[#17211d]">Sign up</Link>
        </div>
      </footer>
    </main>
  );
}
