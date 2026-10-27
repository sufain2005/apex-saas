"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, MapPin, MessageSquare, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#17211d]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Apex home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#183d32] text-white shadow-sm">
            <Sparkles aria-hidden="true" size={19} />
          </span>
          <span className="text-lg font-semibold tracking-tight">Apex</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-[#52615a] hover:text-[#17211d]">
          Back to home
        </Link>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Details */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#dce6df] bg-white/80 px-3.5 py-1.5 text-xs font-medium text-[#426051]">
              <MessageSquare size={14} className="text-[#52866c]" /> Support & Inquiries
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Get in touch with <br />
              <span className="text-[#52866c]">our product team</span>
            </h1>
            <p className="mt-4 text-base leading-7 text-[#627069]">
              Have questions about scaling your SaaS, architecture advice, or custom enterprise requirements? We are here to help.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#eaf1eb] text-[#2d6a4f]">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="font-semibold text-[#17211d]">Email</p>
                  <p className="text-xs text-[#627069]">support@saas-starter.example</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#eaf1eb] text-[#2d6a4f]">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="font-semibold text-[#17211d]">Office</p>
                  <p className="text-xs text-[#627069]">San Francisco, CA & Remote Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-[#e5ebe5] bg-white p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#eaf1eb] text-[#2d6a4f]">
                  <CheckCircle2 size={24} />
                </span>
                <h3 className="text-xl font-semibold">Message Received!</h3>
                <p className="text-sm text-[#627069]">
                  Thank you for reaching out. One of our engineers will get back to you shortly.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="mt-4 rounded-xl"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required placeholder="Jane Doe" className="h-11 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required placeholder="jane@example.com" className="h-11 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell us what you're working on..."
                    className="w-full rounded-xl border border-[#dce6df] p-3 text-sm outline-none focus:border-[#52866c]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full gap-2 rounded-xl bg-[#183d32] text-white hover:bg-[#245b49]"
                >
                  <Send size={15} />
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
