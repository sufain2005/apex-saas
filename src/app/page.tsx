import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CreditCard,
  Database,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f6] text-[#17211d]">
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

      <section className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-20 pt-12 sm:px-10 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dce6df] bg-white/80 px-3.5 py-2 text-xs font-medium text-[#426051] shadow-sm">
            <span className="size-2 rounded-full bg-[#63ad7d]" />
            Your next big idea starts here
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Build your SaaS.
            <span className="mt-2 block text-[#52866c]">Skip the busywork.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#627069] sm:text-lg sm:leading-8">
            A thoughtful foundation for your next product. Authentication,
            subscriptions, and a clean dashboard are ready when you are.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-full bg-[#183d32] px-6 text-white shadow-lg shadow-[#183d32]/15 hover:bg-[#245b49]"
              )}
            >
              Start building <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#dce3dd] bg-white px-6 text-sm font-medium text-[#34483d] transition hover:border-[#b8c9bd] hover:bg-[#fbfcfa]"
            >
              I already have an account
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm text-[#738078]">
            <Check aria-hidden="true" className="text-[#52866c]" size={17} />
            No credit card required to get started
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-10 -top-14 size-48 rounded-full bg-[#dceee0] blur-3xl" />
          <div className="absolute -bottom-12 -left-10 size-52 rounded-full bg-[#f0e6c9] blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-[0_32px_100px_-40px_rgba(27,65,48,0.35)] backdrop-blur">
            <div className="overflow-hidden rounded-[1.45rem] border border-[#edf0eb] bg-[#fbfcfa]">
              <div className="flex items-center justify-between border-b border-[#edf0eb] px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-[#183d32] text-white">
                    <Sparkles aria-hidden="true" size={15} />
                  </span>
                  <span className="text-sm font-semibold">Your workspace</span>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-[#e8f4eb] px-2.5 py-1 text-[11px] font-medium text-[#3d7953]">
                  <span className="size-1.5 rounded-full bg-[#63ad7d]" />
                  All systems go
                </span>
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#7b877f]">Good morning,</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight">Builder</h2>
                  </div>
                  <span className="flex size-10 items-center justify-center rounded-full bg-[#e9f0e9] text-sm font-semibold text-[#426051]">
                    B
                  </span>
                </div>
                <div className="mt-7 rounded-2xl bg-[#183d32] p-5 text-white sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/70">Subscription</p>
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium">
                      Ready when you are
                    </span>
                  </div>
                  <p className="mt-6 text-3xl font-semibold tracking-tight">Your next chapter</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4 text-sm">
                    <span className="text-white/70">Simple monthly billing</span>
                    <ArrowDownRight aria-hidden="true" size={18} />
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { icon: ShieldCheck, label: "Auth", detail: "Protected" },
                    { icon: CreditCard, label: "Billing", detail: "Stripe" },
                    { icon: Database, label: "Data", detail: "Supabase" },
                  ].map(({ icon: Icon, label, detail }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-[#edf0eb] bg-white p-3 sm:p-4"
                    >
                      <Icon aria-hidden="true" className="text-[#52866c]" size={18} />
                      <p className="mt-3 text-xs font-semibold">{label}</p>
                      <p className="mt-0.5 text-[10px] text-[#7b877f] sm:text-xs">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-2 flex items-center gap-3 rounded-2xl border border-[#e7ece7] bg-white px-4 py-3 shadow-xl shadow-[#183d32]/10 sm:-right-8">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#f5f0df] text-[#9b7a31]">
              <Zap aria-hidden="true" size={17} />
            </span>
            <div>
              <p className="text-xs font-semibold">Less setup, more shipping</p>
              <p className="mt-0.5 text-[11px] text-[#7b877f]">A solid start for your idea</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e7ece7] bg-white/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:px-10 md:grid-cols-3 md:gap-10 md:py-16">
          <Feature
            icon={ShieldCheck}
            number="01"
            title="A secure starting point"
            description="Supabase authentication and protected routes give your app a reliable foundation."
          />
          <Feature
            icon={CreditCard}
            number="02"
            title="Billing that just fits"
            description="Connect Stripe Checkout and subscriptions without building the payment flow from scratch."
          />
          <Feature
            icon={Zap}
            number="03"
            title="Designed to move fast"
            description="A clear, modern dashboard keeps your attention on the product you want to build."
          />
        </div>
      </section>

      <footer className="border-t border-[#e7ece7] bg-white py-12 text-xs text-[#7b877f]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f2f6f3] pb-8">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-xl bg-[#183d32] text-white">
                <Sparkles size={16} />
              </span>
              <span className="font-semibold text-sm text-[#17211d]">Apex</span>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-[#52615a]">
              <Link href="/features" className="hover:text-[#17211d]">Features</Link>
              <Link href="/pricing" className="hover:text-[#17211d]">Pricing</Link>
              <Link href="/about" className="hover:text-[#17211d]">About</Link>
              <Link href="/blog" className="hover:text-[#17211d]">Blog</Link>
              <Link href="/docs" className="hover:text-[#17211d]">Docs</Link>
              <Link href="/changelog" className="hover:text-[#17211d]">Changelog</Link>
              <Link href="/contact" className="hover:text-[#17211d]">Contact</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Apex. Built for your next idea.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-[#17211d]">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#17211d]">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-[#17211d]">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Feature({
  icon: Icon,
  number,
  title,
  description,
}: {
  icon: typeof ShieldCheck;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article>
      <div className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-[#eaf1eb] text-[#426c52]">
          <Icon aria-hidden="true" size={20} />
        </span>
        <span className="text-xs font-medium tracking-widest text-[#9aa59e]">{number}</span>
      </div>
      <h2 className="mt-5 text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[#718078]">{description}</p>
    </article>
  );
}
