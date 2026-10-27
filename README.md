# Apex — Modern Full-Stack SaaS Platform

> 🚧 **Active Development / Work in Progress**: Core authentication, database models, multi-page dashboard suite, and marketing pages are live. Additional integrations and platform features are actively being added. Still work is goin on

---

## Overview

**Apex** is a modern, production-oriented SaaS foundation designed to eliminate boilerplate when launching software products. Built with **Next.js 16**, **Supabase (PostgreSQL)**, and **Stripe**, it provides pre-configured authentication, multi-tenant workspace isolation, subscription checkout, and an administrative control panel.

---

## ⚡ Key Highlights

* **Marketing Suite:** Landing page, Features, Pricing (Free, Pro, Enterprise), About, Docs, Blog, Changelog, and Legal policies.
* **Server-Side Authentication:** Secure email/password login and signup backed by Supabase Auth with `@supabase/ssr` encrypted cookies.
* **Database & RLS:** PostgreSQL with Row Level Security (RLS) guaranteeing strict tenant data isolation.
* **Subscription Monetization:** Stripe Checkout flow with automated webhook handlers (`checkout.session.completed`).
* **Multi-Page Dashboard Suite:**
  * 📊 **Overview:** Platform telemetry, KPI metric cards, and security audit log.
  * 📂 **Projects:** Multi-tenant workspace manager (create, filter, delete).
  * 👥 **Team:** Role-based access control (`Admin`, `Member`, `Viewer`) with email invites.
  * 📈 **Analytics:** Throughput volume charts, response latency, and top endpoint metrics.
  * 💳 **Billing:** Current tier overview, Stripe checkout trigger, and invoice history table.
  * 🔑 **API Keys:** Secret developer token generator with reveal, copy, and regenerate actions.
  * 🔔 **Notifications:** In-app alert feed with read/unread statuses.
  * 💬 **Support:** Ticket submission form and knowledge base links.
  * ⚙️ **Settings:** User UUID identity, password change form, and security checklists.
* **Superadmin Control Room (`/admin`):** Platform-level governance, MRR tracking, user suspension/activation, and system health telemetry.

---

## 🛠 Tech Stack

* **Framework:** Next.js 16 (App Router, React Server Components, Server Actions)
* **Authentication & Database:** Supabase (PostgreSQL, Row Level Security)
* **Payments:** Stripe (Checkout, Webhooks, Customer Portal)
* **Styling:** Tailwind CSS v4 + `@base-ui/react` (shadcn/ui style)
* **Language:** TypeScript 5

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/sufain2005/apex-saas.git
cd apex-saas
npm install
```

### 2. Environment Variables
Copy `.env.local.example` to `.env.local` and add your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup
Run [supabase/schema.sql](supabase/schema.sql) in your Supabase SQL Editor.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📌 Development Roadmap

- [x] Next.js 16 App Router scaffolding & Proxy route guards
- [x] Supabase Auth with encrypted SSR cookies
- [x] Multi-page user dashboard suite & Admin console
- [x] PostgreSQL Row Level Security (RLS) schema
- [x] Marketing pages (Pricing, Features, About, Docs, Blog, Contact, Legal)
- [ ] Production Stripe Customer Portal integration *(In Progress)*
- [ ] OAuth providers (Google / GitHub) *(In Progress)*
- [ ] Automated email triggers via Resend *(In Progress)*
