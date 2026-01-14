import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/admin";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key);
}

// Coupon IDs for founding member deals (must match Stripe)
const FOUNDING_COUPONS = {
  growth: "FOUNDING_GROWTH_FREE_MONTH",
  pro: "FOUNDING_PRO_FREE_MONTH",
};

const MAX_SPOTS_PER_DEAL = 10;

// Validate priceId against known Stripe price IDs
function isValidPriceId(priceId: string): boolean {
  const validPriceIds = [
    process.env.STRIPE_PRICE_STARTER,
    process.env.STRIPE_PRICE_GROWTH,
    process.env.STRIPE_PRICE_PRO,
    process.env.STRIPE_PRICE_LIFETIME,
  ].filter(Boolean);

  // Also validate format (Stripe price IDs start with "price_")
  if (!priceId.startsWith("price_")) {
    return false;
  }

  // If we have configured price IDs, validate against them
  if (validPriceIds.length > 0) {
    return validPriceIds.includes(priceId);
  }

  // If no configured IDs, just validate the format
  return true;
}

// Get plan type from price ID
function getPlanType(priceId: string): "starter" | "growth" | "pro" | "lifetime" | null {
  if (priceId === process.env.STRIPE_PRICE_STARTER) return "starter";
  if (priceId === process.env.STRIPE_PRICE_GROWTH) return "growth";
  if (priceId === process.env.STRIPE_PRICE_PRO) return "pro";
  if (priceId === process.env.STRIPE_PRICE_LIFETIME) return "lifetime";
  return null;
}

// Check if founding promo is still available for a plan
async function checkFoundingPromoAvailable(stripe: Stripe, planType: "growth" | "pro"): Promise<boolean> {
  const couponId = FOUNDING_COUPONS[planType];
  try {
    const coupon = await stripe.coupons.retrieve(couponId);
    const timesRedeemed = coupon.times_redeemed || 0;
    return timesRedeemed < MAX_SPOTS_PER_DEAL;
  } catch {
    // Coupon doesn't exist - no spots used yet
    return true;
  }
}

// Check if lifetime spots are still available
async function checkLifetimeSpotsAvailable(stripe: Stripe): Promise<boolean> {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
    });

    const lifetimeCount = sessions.data.filter(
      (session) =>
        session.metadata?.plan_type === "lifetime" &&
        session.payment_status === "paid"
    ).length;

    return lifetimeCount < MAX_SPOTS_PER_DEAL;
  } catch {
    return true;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { priceId, contractorId, applyFoundingPromo } = await request.json();

    if (!priceId || !contractorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate priceId format and against known prices
    if (typeof priceId !== "string" || !isValidPriceId(priceId)) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    const stripe = getStripe();
    const supabase = createClient();

    // Get contractor info
    const { data: contractor, error: contractorError } = await supabase
      .from("contractors")
      .select("id, email, business_name, stripe_customer_id")
      .eq("id", contractorId)
      .single();

    if (contractorError || !contractor) {
      return NextResponse.json({ error: "Contractor not found" }, { status: 404 });
    }

    let customerId = contractor.stripe_customer_id;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: contractor.email,
        name: contractor.business_name,
        metadata: {
          contractor_id: contractor.id,
        },
      });
      customerId = customer.id;

      // Save customer ID to database
      await supabase
        .from("contractors")
        .update({ stripe_customer_id: customerId })
        .eq("id", contractorId);
    }

    const planType = getPlanType(priceId);
    const isLifetime = planType === "lifetime";

    // Check if we should apply founding promo (only for growth/pro subscriptions)
    let couponToApply: string | undefined;
    if (applyFoundingPromo && planType && (planType === "growth" || planType === "pro")) {
      const promoAvailable = await checkFoundingPromoAvailable(stripe, planType);
      if (promoAvailable) {
        couponToApply = FOUNDING_COUPONS[planType];
      }
    }

    // Create checkout session - different config for lifetime vs subscription
    if (isLifetime) {
      // Check if lifetime spots are still available
      const lifetimeAvailable = await checkLifetimeSpotsAvailable(stripe);
      if (!lifetimeAvailable) {
        return NextResponse.json({ error: "Lifetime founding member spots are sold out" }, { status: 400 });
      }

      // One-time payment for lifetime
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        client_reference_id: contractorId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true&lifetime=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
        metadata: {
          contractor_id: contractorId,
          plan_type: "lifetime",
        },
      });

      return NextResponse.json({ url: session.url });
    } else {
      // Subscription for monthly plans
      const sessionConfig: Stripe.Checkout.SessionCreateParams = {
        customer: customerId,
        client_reference_id: contractorId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
        subscription_data: {
          metadata: {
            contractor_id: contractorId,
          },
        },
      };

      // Apply coupon if available (gives 2nd month free)
      if (couponToApply) {
        sessionConfig.discounts = [{ coupon: couponToApply }];
      }

      const session = await stripe.checkout.sessions.create(sessionConfig);

      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
