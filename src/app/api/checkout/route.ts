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

// Get price ID for plan (evaluated at runtime)
function getPriceIdForPlan(plan: string): string | undefined {
  const priceMap: Record<string, string | undefined> = {
    starter: process.env.STRIPE_PRICE_STARTER,
    growth: process.env.STRIPE_PRICE_GROWTH,
    pro: process.env.STRIPE_PRICE_PRO,
    lifetime: process.env.STRIPE_PRICE_LIFETIME,
  };
  return priceMap[plan];
}

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
    const body = await request.json();

    // Support both legacy (priceId + contractorId) and new (plan only) flows
    const { priceId, contractorId, applyFoundingPromo, plan } = body;

    const stripe = getStripe();
    const supabase = createClient();

    // NEW FLOW: Direct checkout without account (plan name provided)
    if (plan && !contractorId) {
      const planPriceId = getPriceIdForPlan(plan);
      if (!planPriceId) {
        console.error(`Missing price ID for plan: ${plan}`);
        return NextResponse.json({ error: `Price not configured for ${plan} plan. Please contact support.` }, { status: 400 });
      }

      const isLifetime = plan === "lifetime";
      const planType = plan as "starter" | "growth" | "pro" | "lifetime";

      // Check if we should apply founding promo
      let couponToApply: string | undefined;
      if (applyFoundingPromo && (planType === "growth" || planType === "pro")) {
        try {
          const promoAvailable = await checkFoundingPromoAvailable(stripe, planType);
          if (promoAvailable) {
            couponToApply = FOUNDING_COUPONS[planType];
          }
        } catch (e) {
          // Coupon doesn't exist yet - skip applying it
          console.log("Coupon not found, skipping:", e);
        }
      }

      if (isLifetime) {
        // Check lifetime spots
        const lifetimeAvailable = await checkLifetimeSpotsAvailable(stripe);
        if (!lifetimeAvailable) {
          return NextResponse.json({ error: "Lifetime founding member spots are sold out" }, { status: 400 });
        }

        // One-time payment - collect customer info on Stripe
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [{ price: planPriceId, quantity: 1 }],
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/welcome?success=true&plan=${plan}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
          // Collect customer info on Stripe checkout page
          customer_creation: "always",
          billing_address_collection: "required",
          custom_fields: [
            {
              key: "business_name",
              label: { type: "custom", custom: "Business Name" },
              type: "text",
            },
          ],
          metadata: {
            plan_type: "lifetime",
            new_customer: "true",
          },
        });

        return NextResponse.json({ url: session.url });
      } else {
        // Subscription - collect customer info on Stripe
        const sessionConfig: Stripe.Checkout.SessionCreateParams = {
          payment_method_types: ["card"],
          line_items: [{ price: planPriceId, quantity: 1 }],
          mode: "subscription",
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/welcome?success=true&plan=${plan}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
          // Collect customer info on Stripe checkout page
          customer_creation: "always",
          billing_address_collection: "required",
          custom_fields: [
            {
              key: "business_name",
              label: { type: "custom", custom: "Business Name" },
              type: "text",
            },
          ],
          subscription_data: {
            metadata: {
              plan_type: planType,
              new_customer: "true",
            },
          },
          metadata: {
            plan_type: planType,
            new_customer: "true",
          },
        };

        // Apply coupon if available - verify it exists first
        if (couponToApply) {
          try {
            await stripe.coupons.retrieve(couponToApply);
            sessionConfig.discounts = [{ coupon: couponToApply }];
          } catch {
            // Coupon doesn't exist, skip it
            console.log("Coupon not found, proceeding without discount");
          }
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);
        return NextResponse.json({ url: session.url });
      }
    }

    // LEGACY FLOW: Existing user with contractorId
    if (!priceId || !contractorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate priceId format and against known prices
    if (typeof priceId !== "string" || !isValidPriceId(priceId)) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

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
    const message = error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
