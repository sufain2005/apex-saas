"use client";

import { useState } from "react";
import { updatePassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const result = await updatePassword(formData);
    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
    }
    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          minLength={8}
          required
          className="h-10 rounded-xl border-[#dce6df] bg-[#fbfcfb] text-sm"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 p-3 text-xs text-red-700">{error}</p>
      )}

      {success && (
        <p className="rounded-xl bg-green-50 p-3 text-xs text-green-700">{success}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="h-10 rounded-xl bg-[#183d32] text-xs font-semibold text-white hover:bg-[#245b49]"
      >
        {loading ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}

