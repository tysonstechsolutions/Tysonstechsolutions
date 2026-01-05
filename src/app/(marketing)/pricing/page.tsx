"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const plans = [
  {
    name: "Starter",
    price: 99,
    description: "Perfect for getting started",
    features: [
      "500 conversations/month",
      "50 leads/month",
      "AI chatbot widget",
      "Satellite measurement",
      "Email notifications",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: 249,
    description: "Most popular for growing businesses",
    features: [
      "2,000 conversations/month",
      "200 leads/month",
      "Everything in Starter",
      "SMS notifications",
      "Priority support",
      "Custom branding",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Pro",
    price: 499,
    description: "For high-volume contractors",
    features: [
      "Unlimited conversations",
      "500 leads/month",
      "Everything in Growth",
      "API access",
      "Dedicated support",
      "Multiple locations",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
];

interface PromoStatus {
  active: boolean;
  spotsRemaining: number;
  totalSpots: number;
  percentOff: number;
}

export default function PricingPage() {
  const [promo, setPromo] = useState<PromoStatus | null>(null);

  useEffect(() => {
    fetch("/api/promo/founding")
      .then((res) => res.json())
      .then((data) => setPromo(data))
      .catch(() => setPromo(null));
  }, []);

  const showPromo = promo?.active && promo.spotsRemaining > 0;
  const discount = promo?.percentOff || 50;

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600">
            Start with a 14-day free trial. No credit card required.
          </p>
        </div>

        {showPromo && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white text-center">
              <div className="text-sm font-medium uppercase tracking-wide mb-1">
                Limited Time Offer
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Founding Customer: {discount}% Off Forever
              </h2>
              <p className="text-amber-100 mb-3">
                Be one of our first {promo.totalSpots} customers and lock in half-price for life.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span className="font-semibold">
                  {promo.spotsRemaining} of {promo.totalSpots} spots remaining
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const discountedPrice = showPromo
              ? Math.round(plan.price * (1 - discount / 100))
              : null;

            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? "bg-orange-500 text-white ring-4 ring-orange-500 ring-offset-2"
                    : "bg-white border border-slate-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="text-sm text-orange-200 font-medium mb-2">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-xl font-semibold mb-2">{plan.name}</div>
                <div className="mb-4">
                  {showPromo && discountedPrice ? (
                    <>
                      <span className={`text-2xl line-through ${plan.highlighted ? "text-orange-300" : "text-slate-400"}`}>
                        ${plan.price}
                      </span>
                      <span className="text-4xl font-bold ml-2">${discountedPrice}</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold">${plan.price}</span>
                  )}
                  <span className={`${plan.highlighted ? "text-orange-200" : "text-slate-500"}`}>
                    /month
                  </span>
                  {showPromo && (
                    <div className={`text-sm mt-1 ${plan.highlighted ? "text-orange-200" : "text-green-600"}`}>
                      Founding price locked forever
                    </div>
                  )}
                </div>
                <p className={`mb-6 ${plan.highlighted ? "text-orange-100" : "text-slate-600"}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className={`w-5 h-5 mt-0.5 ${plan.highlighted ? "text-orange-200" : "text-green-500"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`${plan.highlighted ? "text-orange-100" : "text-slate-600"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={showPromo ? "/signup?promo=FOUNDING50" : "/signup"}
                  className={`block w-full py-3 rounded-lg font-medium text-center ${
                    plan.highlighted
                      ? "bg-white text-orange-500 hover:bg-orange-50"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center text-slate-600">
          <p>All plans include a 14-day free trial. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
}