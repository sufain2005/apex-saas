# Apex — Infrastructure Cost Estimate & Operating Budget

This document provides a realistic, itemized operating cost breakdown for deploying and running this SaaS platform across development, early-stage traction, and growth stages.

---

## 1. Itemized Infrastructure Cost Breakdown

| Component | Recommended Provider | Free Tier Available? | Stage 1: MVP / Launch (0 - 1,000 Users) | Stage 2: Growth (1,000 - 10,000 Users) | Stage 3: Scale (10,000+ Users) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Application Hosting** | Vercel / Railway / Cloudflare | Yes (Hobby: Free) | **$0 / mo** | **$20 / mo** (Vercel Pro) | **$100 / mo** (Pro + Compute) |
| **Database & Auth** | Supabase (PostgreSQL) | Yes (Free 500MB DB) | **$0 / mo** | **$25 / mo** (Pro Tier 8GB DB) | **$75 / mo** (Pro + Compute addons) |
| **Domain Registration & DNS** | Cloudflare / Namecheap | No | **$1.00 / mo** ($12 / year) | **$1.00 / mo** ($12 / year) | **$1.00 / mo** ($12 / year) |
| **Transactional Email** | Resend / SendGrid / Postmark | Yes (Resend: 3,000 free/mo) | **$0 / mo** | **$20 / mo** (50,000 emails/mo) | **$80 / mo** (200,000 emails/mo) |
| **Payment Processing** | Stripe | Pay-per-transaction | **$0 base** (2.9% + 30¢ / tx) | **$0 base** (2.9% + 30¢ / tx) | **$0 base** (Volume discount rates) |
| **Error Monitoring & Logs** | Sentry / BetterStack | Yes (Sentry Free Developer) | **$0 / mo** | **$26 / mo** (Team Tier) | **$80 / mo** (Business Tier) |
| **File / Asset Storage** | Cloudflare R2 / AWS S3 | Yes (R2: 10GB free/mo) | **$0 / mo** | **$5 / mo** (50GB + egress) | **$25 / mo** (250GB storage) |
| **Automated Backups** | Supabase Point-in-time (PITR) | Yes (Daily backup included) | **$0 / mo** | Included in Supabase Pro | **$100 / mo** (7-day PITR retention) |

---

## 2. Monthly and Annual Totals

### Stage 1: MVP & Exploration (Launch Phase)
* **Monthly Cost:** **$1.00 / month** (Domain only; all platforms run within generous free tiers)
* **Annual Cost:** **$12.00 / year**
* *Free tier assumptions:*
  * Supabase free tier: up to 50,000 monthly active users and 500MB database storage.
  * Vercel free tier: 100GB bandwidth, unlimited Edge execution.
  * Resend free tier: up to 3,000 emails per month.

### Stage 2: Commercial Traction (1,000 – 10,000 Users)
* **Monthly Base Cost:** **$92.00 / month**
* **Annual Base Cost:** **$1,104.00 / year**
* *Stripe transaction fees:* 2.9% + 30¢ per successful transaction (deducted directly from gross customer revenue).

### Stage 3: Scale (10,000+ Users)
* **Monthly Base Cost:** **$461.00 / month**
* **Annual Base Cost:** **$5,532.00 / year**
* *High availability assumptions:* Dedicated database instances, high-throughput email sending, automated point-in-time recovery.

---

## 3. Scaling Drivers & Cost Mitigation Strategies

1. **Database Connection Pooling:** 
   * Supabase provides built-in Supavisor pooling, allowing thousands of concurrent serverless requests without exceeding database connection limits.
2. **Bandwidth & Caching:**
   * Static assets and marketing pages are cached at Edge CDNs (Cloudflare / Vercel Edge), drastically reducing server compute costs.
3. **Stripe Processing Optimization:**
   * Encourage annual subscriptions ($190/yr instead of $19/mo) to reduce per-transaction 30¢ fixed charges from 12 instances down to 1.

