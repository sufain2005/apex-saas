"use client";

import { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  LifeBuoy,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#17211d] sm:text-3xl">
          Help & Support
        </h1>
        <p className="text-sm text-[#627069]">
          Get technical assistance, browse documentation, or open a direct priority ticket.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Ticket Form */}
        <Card className="rounded-2xl border-[#e5ebe5] bg-white lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageCircle size={18} className="text-[#52866c]" />
              <CardTitle className="text-lg">Open a Support Ticket</CardTitle>
            </div>
            <CardDescription>
              Our engineering team responds to all tickets within 24 business hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#eaf1eb] text-[#2d6a4f]">
                  <CheckCircle2 size={24} />
                </span>
                <h3 className="text-lg font-bold">Ticket Submitted #4829</h3>
                <p className="text-xs text-[#627069]">
                  We have received your ticket and dispatched it to support.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="mt-4 rounded-xl text-xs"
                >
                  Create another ticket
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    required
                    placeholder="e.g. Issue configuring Stripe local webhook"
                    className="h-10 rounded-xl"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full rounded-xl border border-[#dce6df] p-2.5 text-xs text-[#17211d] outline-none"
                    >
                      <option>Technical / API Issue</option>
                      <option>Billing & Invoices</option>
                      <option>Authentication & Security</option>
                      <option>Feature Request</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="priority">Urgency</Label>
                    <select
                      id="priority"
                      className="w-full rounded-xl border border-[#dce6df] p-2.5 text-xs text-[#17211d] outline-none"
                    >
                      <option>Normal</option>
                      <option>High (Production Impact)</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="details">Message</Label>
                  <textarea
                    id="details"
                    required
                    rows={4}
                    placeholder="Describe what happened or what error code you saw..."
                    className="w-full rounded-xl border border-[#dce6df] p-3 text-xs outline-none focus:border-[#52866c]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="gap-2 rounded-xl bg-[#183d32] text-xs font-semibold text-white hover:bg-[#245b49]"
                >
                  <Send size={14} />
                  {loading ? "Submitting..." : "Submit Ticket"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Knowledge Base Shortcuts */}
        <div className="space-y-4">
          <Card className="rounded-2xl border-[#e5ebe5] bg-white p-5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#eaf1eb] text-[#2d6a4f]">
              <BookOpen size={18} />
            </span>
            <h4 className="mt-4 text-sm font-bold text-[#17211d]">Documentation</h4>
            <p className="mt-1 text-xs text-[#627069] leading-5">
              Read step-by-step tutorials on deploying Next.js, setting up Supabase RLS, and Stripe.
            </p>
            <a
              href="/docs"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#183d32] hover:underline"
            >
              Browse Docs &rarr;
            </a>
          </Card>

          <Card className="rounded-2xl border-[#e5ebe5] bg-white p-5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#f2f4f8] text-[#335c8d]">
              <LifeBuoy size={18} />
            </span>
            <h4 className="mt-4 text-sm font-bold text-[#17211d]">Community Discord</h4>
            <p className="mt-1 text-xs text-[#627069] leading-5">
              Join fellow SaaS founders and full-stack builders sharing tips and troubleshooting.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#335c8d]">
              discord.gg/saas-starter
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
}
