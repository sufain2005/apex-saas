import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Terms of Service — Apex",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#17211d]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#183d32] text-white shadow-sm">
            <Sparkles size={19} />
          </span>
          <span className="text-lg font-semibold tracking-tight">Apex</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-[#52615a] hover:text-[#17211d]">
          Back to home
        </Link>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-xs text-[#718078]">Last updated: October 27, 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-[#52615a]">
          <section>
            <h2 className="text-base font-semibold text-[#17211d]">1. Acceptance of Terms</h2>
            <p className="mt-1">
              By accessing and using this Apex platform, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#17211d]">2. Subscriptions and Billing</h2>
            <p className="mt-1">
              Paid plans are billed on a recurring monthly or annual basis. You may cancel your subscription at any time prior to the next billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#17211d]">3. Acceptable Use</h2>
            <p className="mt-1">
              You agree not to misuse the platform, reverse engineer private APIs, or violate any applicable laws or regulations.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

