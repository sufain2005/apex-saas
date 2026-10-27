"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubscribe() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();

    if (!res.ok || !data.url) {
      setError(data.error || "Failed to start checkout");
      setLoading(false);
      return;
    }

    window.location.href = data.url;
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleSubscribe} className="w-full" disabled={loading}>
        {loading ? "Redirecting..." : "Subscribe"}
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
