import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/admin";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key);
}

// Type guard to extract customer ID from Stripe customer field
function getCustomerId(customer: string | Stripe.Customer | Stripe.DeletedCustomer | null): string | null {
  if (!customer) return null;
  if (typeof customer === "string") return customer;
  return customer.id;
}

// Map Stripe subscription status to our database status
function mapSubscriptionStatus(stripeStatus: string): string {
  switch (stripeStatus) {
    case "active":
      return "active";
    case "past_due":
      return "past_due";
    case "canceled":
    case "unpaid":
      return "canceled";
    case "trialing":
      return "trialing";
    default:
      return "active";
  }
}

// Map Stripe price ID to subscription tier
function mapPriceToTier(priceId: string): string {
  const starterPrice = process.env.STRIPE_PRICE_STARTER;
  const growthPrice = process.env.STRIPE_PRICE_GROWTH;
  const proPrice = process.env.STRIPE_PRICE_PRO;

  if (priceId === starterPrice) return "starter";
  if (priceId === growthPrice) return "growth";
  if (priceId === proPrice) return "pro";
  return "starter";
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    const stripe = getStripe();
    const supabase = createClient();
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout completed:", session.id);

        // Update contractor with Stripe customer ID if this is their first purchase
        const customerId = getCustomerId(session.customer);
        if (customerId && session.client_reference_id) {
          // Check if this is a lifetime purchase
          const isLifetime = session.metadata?.plan_type === "lifetime" || session.mode === "payment";

          const updateData: Record<string, unknown> = {
            stripe_customer_id: customerId,
            updated_at: new Date().toISOString(),
          };

          // If lifetime purchase, set tier to pro and status to lifetime
          if (isLifetime) {
            updateData.subscription_tier = "pro";
            updateData.subscription_status = "lifetime";
          }

          const { error } = await supabase
            .from("contractors")
            .update(updateData)
            .eq("id", session.client_reference_id);

          if (error) {
            console.error("Error updating contractor after checkout:", error);
          }
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription updated:", subscription.id, subscription.status);

        // Get the price ID from the subscription
        const priceId = subscription.items.data[0]?.price?.id;
        const tier = priceId ? mapPriceToTier(priceId) : "starter";
        const status = mapSubscriptionStatus(subscription.status);

        // Update contractor subscription in database
        const { error } = await supabase
          .from("contractors")
          .update({
            stripe_subscription_id: subscription.id,
            subscription_tier: tier,
            subscription_status: status,
            trial_ends_at: subscription.trial_end
              ? new Date(subscription.trial_end * 1000).toISOString()
              : null,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", getCustomerId(subscription.customer) || "");

        if (error) {
          console.error("Error updating subscription:", error);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription canceled:", subscription.id);

        // Mark subscription as canceled in database
        const { error } = await supabase
          .from("contractors")
          .update({
            subscription_status: "canceled",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        if (error) {
          console.error("Error canceling subscription:", error);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment failed:", invoice.id);

        // Mark subscription as past_due
        const failedCustomerId = getCustomerId(invoice.customer);
        if (failedCustomerId) {
          const { error } = await supabase
            .from("contractors")
            .update({
              subscription_status: "past_due",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", failedCustomerId);

          if (error) {
            console.error("Error updating payment failed status:", error);
          }
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment succeeded:", invoice.id);

        // Ensure subscription is marked as active
        const successCustomerId = getCustomerId(invoice.customer);
        if (successCustomerId) {
          const { error } = await supabase
            .from("contractors")
            .update({
              subscription_status: "active",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", successCustomerId);

          if (error) {
            console.error("Error updating payment success status:", error);
          }
        }
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
