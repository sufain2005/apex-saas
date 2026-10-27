import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, Sparkles } from "lucide-react";

export const metadata = {
  title: "Blog & Guides — Apex",
  description: "Architecture, engineering practices, and startup playbooks for building SaaS.",
};

const posts = [
  {
    slug: "secure-saas-with-supabase-rls",
    title: "How to Secure Multi-Tenant SaaS with PostgreSQL Row Level Security",
    summary:
      "Avoid horizontal privilege escalation vulnerabilities by enforcing auth checks directly at the database engine layer.",
    date: "Oct 24, 2026",
    readTime: "5 min read",
    tag: "Security",
  },
  {
    slug: "handling-stripe-webhooks-reliably",
    title: "Building an Idempotent Stripe Webhook Pipeline in Next.js",
    summary:
      "Learn how to verify signatures, handle duplicate events, and synchronize subscription states without race conditions.",
    date: "Oct 18, 2026",
    readTime: "8 min read",
    tag: "Billing",
  },
  {
    slug: "nextjs-16-app-router-best-practices",
    title: "Next.js 16 App Router: Proxy Route Guards & React Server Components",
    summary:
      "A deep dive into zero-bundle-size server components and proxy middleware request interception for authentication.",
    date: "Oct 12, 2026",
    readTime: "6 min read",
    tag: "Architecture",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#17211d]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Apex home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#183d32] text-white shadow-sm">
            <Sparkles aria-hidden="true" size={19} />
          </span>
          <span className="text-lg font-semibold tracking-tight">Apex</span>
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-[#52615a]">
          <Link href="/features" className="hover:text-[#17211d]">Features</Link>
          <Link href="/pricing" className="hover:text-[#17211d]">Pricing</Link>
          <Link href="/login" className="hover:text-[#17211d]">Log in</Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 pt-12 text-center sm:px-10 sm:pt-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#dce6df] bg-white/80 px-3.5 py-1.5 text-xs font-medium text-[#426051]">
          <BookOpen size={14} className="text-[#52866c]" /> Engineering & Growth
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          The Apex Blog
        </h1>
        <p className="mt-4 text-base leading-7 text-[#627069]">
          Insights on SaaS architecture, Stripe monetization, Supabase database tuning, and fast development.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14 sm:px-10 sm:py-20">
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-[#e5ebe5] bg-white p-8 shadow-sm transition hover:border-[#52866c] hover:shadow-md"
            >
              <div className="flex items-center gap-3 text-xs text-[#718078]">
                <span className="rounded-full bg-[#eaf1eb] px-2.5 py-1 font-semibold text-[#2d6a4f]">
                  {post.tag}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {post.readTime}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#17211d]">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#627069]">{post.summary}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#183d32]">
                Read full article <ArrowRight size={14} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

