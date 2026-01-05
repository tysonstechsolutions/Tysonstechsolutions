import { NextResponse } from "next/server";
import Stripe from "stripe";

const FOUNDING_COUPON_ID = "FOUNDING50";
const MAX_FOUNDING_CUSTOMERS = 20;

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  return new Stripe(key);
}

export async function GET() {
  try {
    const stripe = getStripe();

    // Try to get the coupon to check redemptions
    try {
      const coupon = await stripe.coupons.retrieve(FOUNDING_COUPON_ID);
      const timesRedeemed = coupon.times_redeemed || 0;
      const spotsRemaining = Math.max(0, MAX_FOUNDING_CUSTOMERS - timesRedeemed);

      return NextResponse.json({
        active: spotsRemaining > 0,
        spotsRemaining,
        totalSpots: MAX_FOUNDING_CUSTOMERS,
        percentOff: coupon.percent_off,
      });
    } catch {
      // Coupon doesn't exist yet - return default state
      return NextResponse.json({
        active: true,
        spotsRemaining: MAX_FOUNDING_CUSTOMERS,
        totalSpots: MAX_FOUNDING_CUSTOMERS,
        percentOff: 50,
        needsSetup: true,
      });
    }
  } catch (error) {
    console.error("Error checking founding promo:", error);
    return NextResponse.json(
      { error: "Failed to check promo status" },
      { status: 500 }
    );
  }
}
