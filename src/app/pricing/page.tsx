import Link from "next/link";
import {
  ArrowRight,
  Check,
  HelpCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Pricing — Apex",
  description: "Transparent, flexible pricing for individuals and fast-growing teams.",
};

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    href: "/signup",
    priceMonthly: "$0",
    period: "forever free",
    description: "Essential tools to explore the platform and launch your first project.",
    features: [
      "1 Active Project",
      "Up to 1,000 API requests / month",
      "Community support",
      "Standard authentication (Email & Password)",
      "Supabase PostgreSQL access",
    ],
    mostPopular: false,
    ctaText: "Get Started Free",
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "/dashboard/billing",
    priceMonthly: "$19",
    period: "per month",
    description: "Full access with Stripe automated subscriptions, webhooks, and priority performance.",
    features: [
      "Unlimited Projects",
      "100,000 API requests / month",
      "Stripe Automated Billing & Invoicing",
      "Live Webhook Event Sync",
      "Priority Email & Chat Support",
      "Advanced Row Level Security (RLS)",
      "Early access to new features",
    ],
    mostPopular: true,
    ctaText: "Subscribe to Pro",
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "/signup",
    priceMonthly: "$99",
    period: "per month",
    description: "Dedicated infrastructure, SLAs, and custom integration assistance.",
    features: [
      "Unlimited Everything",
      "Dedicated Database Replicas",
      "99.99% Uptime Guarantee (SLA)",
      "Custom Stripe & Webhook Integrations",
      "Dedicated Technical Account Manager",
      "Audit Logging & Enterprise SSO",
    ],
    mostPopular: false,
    ctaText: "Get Enterprise",
  },
];

const faqs = [
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. You can cancel your subscription at any time directly from your dashboard. Your access will remain active until the end of your current billing period.",
  },
  {
    q: "How does payment processing work?",
    a: "We use Stripe for 100% secure payment processing. We never store or transmit your sensitive credit card information on our servers.",
  },
  {
    q: "What payment methods are supported?",
    a: "Stripe supports all major debit and credit cards (Visa, Mastercard, American Express, Discover), plus Apple Pay and Google Pay.",
  },
  {
    q: "Do I need a credit card to sign up?",
    a: "No! You can create a free account immediately without entering any payment details.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#17211d]">
      {/* Navigation Header */}
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
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-[#52615a] transition hover:text-[#17211d] md:inline-flex"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="rounded-full bg-white/80 px-3 py-2 text-sm font-medium text-[#183d32] shadow-sm sm:px-4"
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

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-12 text-center sm:px-10 sm:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#dce6df] bg-white/80 px-3.5 py-2 text-xs font-medium text-[#426051] shadow-sm">
          <Zap aria-hidden="true" size={14} className="text-[#52866c]" />
          Transparent & Predictable Pricing
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#17211d] sm:text-5xl lg:text-6xl">
          Choose the right plan for <br className="hidden sm:inline" />
          <span className="text-[#52866c]">your product roadmap</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#627069] sm:text-lg">
          Start for free, explore the codebase, and scale with Stripe automated subscription billing whenever you’re ready.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "relative flex flex-col justify-between rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-md",
                tier.mostPopular
                  ? "border-[#52866c] shadow-[0_20px_60px_-25px_rgba(24,61,50,0.25)] ring-1 ring-[#52866c]"
                  : "border-[#e5ebe5]"
              )}
            >
              {tier.mostPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#183d32] px-4 py-1 text-xs font-medium text-white shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold text-[#17211d]">{tier.name}</h2>
                <p className="mt-2 text-sm leading-6 text-[#718078]">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tight text-[#17211d]">
                    {tier.priceMonthly}
                  </span>
                  <span className="text-sm font-medium text-[#718078]">/ {tier.period}</span>
                </div>

                <div className="mt-8 space-y-3.5 border-t border-[#f0f4f0] pt-6">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-[#425048]">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#eaf1eb] text-[#426c52]">
                        <Check size={13} />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href={tier.href}
                  className={cn(
                    "flex h-11 w-full items-center justify-center rounded-xl text-sm font-medium transition",
                    tier.mostPopular
                      ? "bg-[#183d32] text-white shadow-sm hover:bg-[#245b49]"
                      : "border border-[#dce6df] bg-[#f7f8f6] text-[#17211d] hover:bg-white"
                  )}
                >
                  {tier.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-[#e7ece7] bg-white/70 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#52866c]">
              <HelpCircle size={15} /> Frequently Asked Questions
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17211d]">
              Everything you need to know about billing
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-[#e5ebe5] bg-[#fbfcfb] p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-[#17211d]">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-[#627069]">{faq.a}</p>
              </div>
            ))}
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
