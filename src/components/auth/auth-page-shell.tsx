import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthPageShellProps = {
  mode: "login" | "signup";
  configured: boolean;
  message?: string;
  children?: ReactNode;
};

export function AuthPageShell({
  mode,
  configured,
  message,
  children,
}: AuthPageShellProps) {
  const isSignup = mode === "signup";

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#17211d]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Apex home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#183d32] text-white shadow-sm">
            <Sparkles aria-hidden="true" size={19} />
          </span>
          <span className="text-lg font-semibold tracking-tight">Apex</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#66736b] transition hover:text-[#183d32]"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to home
        </Link>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-81px)] w-full max-w-7xl items-center gap-12 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:py-16">
        <div className="mx-auto w-full max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dce6df] bg-white/80 px-3.5 py-2 text-xs font-medium text-[#426051] shadow-sm">
            <ShieldCheck aria-hidden="true" size={15} className="text-[#52866c]" />
            A secure start for your next idea
          </div>
          <h1 className="mt-7 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
            {isSignup ? (
              <>
                Make room for
                <span className="block text-[#52866c]">what you want to build.</span>
              </>
            ) : (
              <>
                Welcome back
                <span className="block text-[#52866c]">to your workspace.</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-[#68766e]">
            {isSignup
              ? "Create your account and get a thoughtful foundation for launching and growing your SaaS."
              : "Sign in to pick up where you left off and keep moving your product forward."}
          </p>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#e5ebe5] bg-white/80 p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#eaf1eb] text-[#426c52]">
                <ShieldCheck aria-hidden="true" size={18} />
              </span>
              <p className="mt-3 text-sm font-semibold">Private by default</p>
              <p className="mt-1 text-xs leading-5 text-[#718078]">
                Protected sign-in backed by Supabase Auth.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e5ebe5] bg-white/80 p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#f5f0df] text-[#9b7a31]">
                <CreditCard aria-hidden="true" size={18} />
              </span>
              <p className="mt-3 text-sm font-semibold">Ready to grow</p>
              <p className="mt-1 text-xs leading-5 text-[#718078]">
                Subscription billing is ready when you need it.
              </p>
            </div>
          </div>

          <p className="mt-7 flex items-center gap-2 text-sm text-[#738078]">
            <Check aria-hidden="true" className="text-[#52866c]" size={17} />
            {isSignup
              ? "Start free. Add billing only when you’re ready."
              : "Your account and workspace are waiting for you."}
          </p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="rounded-[1.75rem] border border-[#e7ece7] bg-white p-6 shadow-[0_28px_90px_-45px_rgba(27,65,48,0.3)] sm:p-8">
            <div className="mb-7">
              <p className="text-sm font-medium text-[#52866c]">
                {isSignup ? "Create your account" : "Your workspace"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {isSignup ? "Get started" : "Log in"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#718078]">
                {isSignup
                  ? "A few details and you’re ready to go."
                  : "Enter your details to securely access your account."}
              </p>
            </div>

            {message && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-[#d3e8d8] bg-[#f0f8f1] p-3.5 text-sm leading-6 text-[#356448]"
              >
                {message}
              </div>
            )}

            {!configured ? (
              <div
                role="status"
                className="rounded-2xl border border-[#eadfbd] bg-[#fbf8ef] p-4 text-sm leading-6 text-[#66552b]"
              >
                <p className="font-semibold">Connect Supabase to enable accounts</p>
                <p className="mt-2">
                  The sign-in pages are ready, but this project has no Supabase
                  connection configured yet.
                </p>
                <p className="mt-3">
                  Copy <code className="rounded bg-white/80 px-1.5 py-0.5">.env.local.example</code>{" "}
                  to <code className="rounded bg-white/80 px-1.5 py-0.5">.env.local</code>, add your
                  Supabase URL and anon key, then restart the dev server.
                  Sign-up also needs <code className="rounded bg-white/80 px-1.5 py-0.5">NEXT_PUBLIC_APP_URL</code>.
                </p>
              </div>
            ) : (
              children
            )}
          </div>
          <p className="mt-5 text-center text-xs text-[#8a958e]">
            Your credentials are handled securely by Supabase.
          </p>
          <Link
            href="/"
            className="mx-auto mt-5 inline-flex items-center justify-center gap-2 text-sm font-medium text-[#66736b] transition hover:text-[#183d32] lg:hidden"
          >
            Explore Apex <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
