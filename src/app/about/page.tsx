import Link from "next/link";
import { ArrowRight, Heart, Shield, Sparkles, Target, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "About Us — Apex",
  description: "Our mission to empower developers and founders to build scalable software faster.",
};

export default function AboutPage() {
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
        <nav className="flex items-center gap-3">
          <Link href="/features" className="text-sm font-medium text-[#52615a] hover:text-[#17211d]">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-[#52615a] hover:text-[#17211d]">
            Pricing
          </Link>
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-[#52615a] hover:text-[#17211d]"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className={cn(
              buttonVariants(),
              "h-10 rounded-full bg-[#183d32] px-5 text-white hover:bg-[#245b49]"
            )}
          >
            Get started <ArrowRight size={16} />
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 text-center sm:px-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#dce6df] bg-white/80 px-3.5 py-1.5 text-xs font-medium text-[#426051]">
          <Target size={14} className="text-[#52866c]" /> Our Mission
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Empowering builders to launch <br />
          <span className="text-[#52866c]">without repetitive busywork</span>
        </h1>
        <p className="mt-6 text-base leading-7 text-[#627069] sm:text-lg">
          We believe engineers and founders should spend 90% of their time solving core customer problems, not fighting auth headers, webhook synchronization, and payment gateways.
        </p>
      </section>

      {/* Values Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-[#e5ebe5] bg-white p-8 shadow-sm">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[#eaf1eb] text-[#2d6a4f]">
              <Shield size={20} />
            </span>
            <h2 className="mt-6 text-xl font-semibold">Security by Default</h2>
            <p className="mt-2 text-sm leading-6 text-[#627069]">
              Never treat security as an afterthought. Row Level Security, HTTPS headers, and encrypted cookies are active from the very first commit.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e5ebe5] bg-white p-8 shadow-sm">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[#f2f4f8] text-[#335c8d]">
              <Users size={20} />
            </span>
            <h2 className="mt-6 text-xl font-semibold">Community Driven</h2>
            <p className="mt-2 text-sm leading-6 text-[#627069]">
              Designed with modular components and zero proprietary lock-in. You own your code, database, and customer billing relations completely.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e5ebe5] bg-white p-8 shadow-sm">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[#fbf6e8] text-[#9b7a31]">
              <Heart size={20} />
            </span>
            <h2 className="mt-6 text-xl font-semibold">Crafted with Care</h2>
            <p className="mt-2 text-sm leading-6 text-[#627069]">
              Clean typography, accessible UI components, and intuitive UX ensure your end-users have a delightful experience from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e7ece7] bg-white py-10 text-xs text-[#7b877f]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {new Date().getFullYear()} Apex. Built for your next idea.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-[#17211d]">About</Link>
            <Link href="/contact" className="hover:text-[#17211d]">Contact</Link>
            <Link href="/privacy" className="hover:text-[#17211d]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#17211d]">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
