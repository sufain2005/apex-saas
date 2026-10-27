import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is required");
  }
  return secret;
}

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required"
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let webhookSecret: string;
  let stripe: ReturnType<typeof getStripe>;
  try {
    webhookSecret = getWebhookSecret();
    stripe = getStripe();
  } catch (error) {
    console.error("Stripe webhook configuration error:", error);
    return NextResponse.json({ error: "Webhook is not configured" }, { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.user_id;
    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription?.id;

    if (session.mode !== "subscription" || !userId || !subscriptionId) {
      console.error("Invalid subscription checkout session", session.id);
      return NextResponse.json({ error: "Invalid checkout session" }, { status: 400 });
    }

    let error;
    try {
      const { error: upsertError } = await getSupabaseAdmin()
        .from("subscriptions")
        .upsert(
          {
            user_id: userId,
            stripe_subscription_id: subscriptionId,
            status: "active",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
      error = upsertError;
    } catch (err) {
      console.error("Failed to save subscription from Stripe webhook:", err);
      return NextResponse.json({ error: "Unable to save subscription" }, { status: 500 });
    }

    if (error) {
      console.error("Failed to save subscription from Stripe webhook:", error);
      return NextResponse.json({ error: "Unable to save subscription" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
