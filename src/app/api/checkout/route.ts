import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/admin";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  try {
    const { priceId, contractorId } = await request.json();

    if (!priceId || !contractorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

    // Create checkout session
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
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          contractor_id: contractorId,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
