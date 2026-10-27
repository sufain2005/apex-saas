"use client";

import { useState } from "react";
import { Check, Copy, Eye, EyeOff, Key, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ApiKeyManager({ userId }: { userId: string }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(`sk_live_${userId.replace(/-/g, "").slice(0, 24)}`);

  function handleCopy() {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleRegenerate() {
    const randomSuffix = Math.random().toString(36).substring(2, 12);
    setKey(`sk_live_${userId.replace(/-/g, "").slice(0, 14)}_${randomSuffix}`);
  }

  return (
    <Card className="rounded-2xl border-[#e5ebe5] bg-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Key size={18} className="text-[#52866c]" />
          <CardTitle className="text-lg">Secret API Keys</CardTitle>
        </div>
        <CardDescription>
          Keep this secret token safe. Never publish it in client-side code or public repositories.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type={revealed ? "text" : "password"}
              readOnly
              value={key}
              className="h-11 w-full rounded-xl border border-[#dce6df] bg-[#fbfcfb] px-3.5 pr-10 font-mono text-xs text-[#17211d] outline-none"
            />
            <button
              type="button"
              onClick={() => setRevealed(!revealed)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718078] hover:text-[#17211d]"
              aria-label={revealed ? "Hide API Key" : "Reveal API Key"}
            >
              {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              className="h-11 gap-2 rounded-xl text-xs"
            >
              {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy Key"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleRegenerate}
              className="h-11 gap-2 rounded-xl text-xs"
            >
              <RefreshCw size={14} />
              Roll Key
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#52866c]">
          <ShieldCheck size={15} />
          <span>Restricted to your account scope. Never shared publicly.</span>
        </div>
      </CardContent>
    </Card>
  );
}

