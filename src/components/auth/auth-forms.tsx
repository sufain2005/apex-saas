"use client";

import { login, signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <>
      <form action={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={254}
            required
            className="h-11 rounded-xl border-[#dfe7df] bg-[#fbfcfa] px-3.5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            maxLength={128}
            required
            className="h-11 rounded-xl border-[#dfe7df] bg-[#fbfcfa] px-3.5"
          />
        </div>
        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <Button
          type="submit"
          className="h-11 w-full rounded-xl bg-[#183d32] text-white hover:bg-[#245b49]"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[#718078]">
        New to Apex?{" "}
        <Link href="/signup" className="font-semibold text-[#32634a] hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setMessage(null);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
    } else if ("success" in result && typeof result.success === "string") {
      setMessage(result.success);
    }
    setLoading(false);
  }

  return (
    <>
      {message ? (
        <div
          role="status"
          className="rounded-xl border border-[#d3e8d8] bg-[#f0f8f1] p-4 text-sm leading-6 text-[#356448]"
        >
          <p className="font-semibold mb-1">Account Created</p>
          <p>{message}</p>
          <div className="mt-4">
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[#183d32] px-3.5 text-xs font-medium text-white hover:bg-[#245b49]"
            >
              Go to Sign In &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <form action={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              maxLength={254}
              required
              className="h-11 rounded-xl border-[#dfe7df] bg-[#fbfcfa] px-3.5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              minLength={8}
              maxLength={128}
              required
              className="h-11 rounded-xl border-[#dfe7df] bg-[#fbfcfa] px-3.5"
            />
            <p className="text-xs leading-5 text-[#849088]">
              Use at least 8 characters. Choose a password you don’t use elsewhere.
            </p>
          </div>
          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-[#183d32] text-white hover:bg-[#245b49]"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-[#718078]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#32634a] hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}
