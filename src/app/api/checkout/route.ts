import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

function getAppOrigin() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) throw new Error("NEXT_PUBLIC_APP_URL is required");

  const url = new URL(appUrl);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    (process.env.NODE_ENV === "production" && url.protocol !== "https:")
  ) {
    throw new Error("NEXT_PUBLIC_APP_URL must be a valid application origin");
  }

  return url.origin;
}

export async function POST(request: Request) {
  let appOrigin: string;
  try {
    appOrigin = getAppOrigin();
  } catch (error) {
    console.error("Stripe checkout configuration error:", error);
    return NextResponse.json({ error: "Checkout is not configured" }, { status: 500 });
  }

  const requestOrigin = request.headers.get("origin");
  if (requestOrigin !== appOrigin) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Pro Subscription" },
            recurring: { interval: "month" },
            unit_amount: 1999,
          },
          quantity: 1,
        },
      ],
      metadata: { user_id: user.id },
      success_url: `${appOrigin}/dashboard?success=true`,
      cancel_url: `${appOrigin}/dashboard?canceled=true`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
