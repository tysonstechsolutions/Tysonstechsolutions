import { NextResponse } from "next/server";
import Stripe from "stripe";

// Coupon IDs for each deal type - create these in Stripe Dashboard
const COUPONS = {
  growth: "FOUNDING_GROWTH_FREE_MONTH", // 100% off, 1 month duration
  pro: "FOUNDING_PRO_FREE_MONTH",       // 100% off, 1 month duration
};

const MAX_SPOTS_PER_DEAL = 10;

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  return new Stripe(key);
}

async function getCouponRedemptions(stripe: Stripe, couponId: string): Promise<number> {
  try {
    const coupon = await stripe.coupons.retrieve(couponId);
    return coupon.times_redeemed || 0;
  } catch {
    // Coupon doesn't exist yet
    return 0;
  }
}

// Count lifetime purchases by checking payments with lifetime metadata
async function getLifetimePurchaseCount(stripe: Stripe): Promise<number> {
  try {
    // Search for checkout sessions with lifetime plan type
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
    });

    // Count sessions that were lifetime purchases and completed
    const lifetimeCount = sessions.data.filter(
      (session) =>
        session.metadata?.plan_type === "lifetime" &&
        session.payment_status === "paid"
    ).length;

    return lifetimeCount;
  } catch (error) {
    console.error("Error counting lifetime purchases:", error);
    return 0;
  }
}

export async function GET() {
  try {
    const stripe = getStripe();

    // Get redemption counts for each deal
    const [growthRedeemed, proRedeemed, lifetimeRedeemed] = await Promise.all([
      getCouponRedemptions(stripe, COUPONS.growth),
      getCouponRedemptions(stripe, COUPONS.pro),
      getLifetimePurchaseCount(stripe),
    ]);

    const deals = {
      growth: {
        active: growthRedeemed < MAX_SPOTS_PER_DEAL,
        spotsRemaining: Math.max(0, MAX_SPOTS_PER_DEAL - growthRedeemed),
        totalSpots: MAX_SPOTS_PER_DEAL,
        description: "Buy 1st month, get 2nd month FREE",
        price: 249,
        couponId: COUPONS.growth,
      },
      pro: {
        active: proRedeemed < MAX_SPOTS_PER_DEAL,
        spotsRemaining: Math.max(0, MAX_SPOTS_PER_DEAL - proRedeemed),
        totalSpots: MAX_SPOTS_PER_DEAL,
        description: "Buy 1st month, get 2nd month FREE",
        price: 499,
        couponId: COUPONS.pro,
      },
      lifetime: {
        active: lifetimeRedeemed < MAX_SPOTS_PER_DEAL,
        spotsRemaining: Math.max(0, MAX_SPOTS_PER_DEAL - lifetimeRedeemed),
        totalSpots: MAX_SPOTS_PER_DEAL,
        description: "Lifetime Pro Access - One-time payment",
        price: 1499,
      },
    };

    // Check if any deals are still active
    const anyActive = deals.growth.active || deals.pro.active || deals.lifetime.active;
    const totalSpotsRemaining = deals.growth.spotsRemaining + deals.pro.spotsRemaining + deals.lifetime.spotsRemaining;

    return NextResponse.json({
      active: anyActive,
      totalSpotsRemaining,
      deals,
    });
  } catch (error) {
    console.error("Error checking founding promo:", error);
    return NextResponse.json(
      { error: "Failed to check promo status" },
      { status: 500 }
    );
  }
}
