import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { getAppOrigin, isSupabaseConfigured } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  const appOrigin = getAppOrigin();
  if (!isSupabaseConfigured() || !appOrigin) {
    return NextResponse.redirect(new URL("/login?setup=required", request.url));
  }

  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const destination =
    next?.startsWith("/") && !next.startsWith("//") && !next.includes("\\")
      ? new URL(next, appOrigin)
      : new URL("/dashboard", appOrigin);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(destination);
    }
  }

  return NextResponse.redirect(new URL("/login?confirmation=failed", appOrigin));
}
