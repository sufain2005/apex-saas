import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Cookie Policy — Apex",
};

export default function CookiesPage() {
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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Cookie Policy</h1>
        <p className="mt-2 text-xs text-[#718078]">Last updated: October 27, 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-[#52615a]">
          <section>
            <h2 className="text-base font-semibold text-[#17211d]">1. What Are Cookies?</h2>
            <p className="mt-1">
              Cookies are small data files placed on your browser to securely maintain your authentication state and remember your dashboard preferences.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#17211d]">2. Essential Authentication Cookies</h2>
            <p className="mt-1">
              We use strictly necessary HTTP-only session cookies via `@supabase/ssr` to ensure you remain securely logged in across page refreshes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#17211d]">3. Managing Cookies</h2>
            <p className="mt-1">
              You can disable cookies in your browser settings, but doing so will prevent you from signing in to the dashboard.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

