# Apex Platform

A complete, production-ready Apex platform with marketing pages, authentication, protected multi-page dashboard suite, Stripe subscription checkout & webhooks, PostgreSQL Row Level Security (RLS), and an administrative control console.

---

## Tech Stack

* **Framework:** Next.js 16 (App Router, React Server Components, Server Actions)
* **Database & Auth:** Supabase (PostgreSQL, Row Level Security, `@supabase/ssr` cookies)
* **Payments & Billing:** Stripe (Checkout Sessions, Automated Subscriptions, Webhooks)
* **Styling & UI:** Tailwind CSS v4, `@base-ui/react`, `shadcn/ui`, Lucide Icons
* **Language & Quality:** TypeScript 5, ESLint 9

---

## Application Structure & Routes

### 1. Marketing Website (Public)
* `/` — Modern landing page with hero, value proposition, and interactive preview.
* `/features` — Deep dive into technical architecture, auth, database, and payments.
* `/pricing` — 3-tier pricing plans (Starter $0, Pro $19/mo, Enterprise $99/mo) and FAQs.
* `/about` — Platform mission, engineering principles, and core values.
* `/blog` — SEO-friendly engineering & SaaS articles.
* `/docs` — Developer setup guide, environment config, and quick start commands.
* `/changelog` — Release history and feature timeline.
* `/contact` — Interactive support and sales inquiry form.
* `/privacy`, `/terms`, `/cookies` — Compliance and legal policies.

### 2. User Authentication (Public & Guarded)
* `/login` — Secure email/password login with Supabase Auth.
* `/signup` — Account registration with input validation.
* `/auth/callback` — Server-side token exchange and session callback handler.

### 3. User Dashboard Suite (Protected)
Guarded by `src/proxy.ts` (Next.js 16 Proxy):
* `/dashboard` — KPI metrics (Plan status, API usage, Security health, active credentials), activity audit log.
* `/dashboard/projects` — Multi-tenant project & workspace manager (create, filter, delete).
* `/dashboard/team` — Team collaboration with role-based access control (Admin, Member, Viewer).
* `/dashboard/analytics` — Real-time telemetry, visual throughput bar charts, latency, top endpoints.
* `/dashboard/billing` — Stripe subscription checkout trigger, active plan status, and invoice history table.
* `/dashboard/api-keys` — Secret API key management (reveal/copy/roll), webhook URLs, and cURL snippets.
* `/dashboard/notifications` — Notification center (mark as read, clear, category filters).
* `/dashboard/support` — Technical ticket submission form and knowledge base links.
* `/dashboard/settings` — Account profile details, password update form via Server Action, security checklist.

### 4. Admin Console (Protected Platform Ops)
* `/admin` — High-level governance overview (Estimated MRR, active subscribers, tenant count, audit log).
* `/admin/users` — User management table with account suspension / activation toggles.
* `/admin/health` — Infrastructure telemetry (Supabase DB latency, Stripe webhook pipeline, Next.js proxy, TLS 1.3).

---

## Setup & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Migration
In your Supabase project's **SQL Editor**, run the entire [supabase/schema.sql](supabase/schema.sql) file. This provisions:
* `subscriptions` table + RLS
* `projects` table + RLS
* `team_members` table + RLS
* `notifications` table + RLS
* `audit_logs` table + RLS
* Automated `updated_at` triggers

### 4. Start the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Operating Cost Documentation
For an itemized breakdown of hosting, database, email, Stripe fees, and monthly/annual budgets, see [COST_ESTIMATE.md](COST_ESTIMATE.md).
