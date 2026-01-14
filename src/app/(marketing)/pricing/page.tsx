"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const softwareReplaced = [
  { name: "Scheduling Software", examples: "Calendly, Acuity, ServiceTitan", cost: "$30-150/mo", emoji: "📅" },
  { name: "CRM System", examples: "HubSpot, Zoho, Jobber", cost: "$25-80/mo", emoji: "👥" },
  { name: "Invoicing & Payments", examples: "QuickBooks, FreshBooks", cost: "$30-80/mo", emoji: "💳" },
  { name: "SMS Marketing", examples: "SimpleTexting, EZTexting", cost: "$25-80/mo", emoji: "📱" },
  { name: "Review Management", examples: "Podium, Birdeye", cost: "$100-300/mo", emoji: "⭐" },
  { name: "Live Chat Widget", examples: "Intercom, Drift", cost: "$50-100/mo", emoji: "💬" },
  { name: "Document Storage", examples: "Dropbox, Google Drive Pro", cost: "$15-25/mo", emoji: "📁" },
  { name: "Expense Tracking", examples: "Expensify, Receipt Bank", cost: "$10-30/mo", emoji: "🧾" },
  { name: "Email/SMS Reminders", examples: "Various tools", cost: "$20-50/mo", emoji: "🔔" },
  { name: "Route Planning", examples: "OptimoRoute, Route4Me", cost: "$30-100/mo", emoji: "🗺️" },
];

interface DealStatus {
  active: boolean;
  spotsRemaining: number;
  totalSpots: number;
  description: string;
  price: number;
  couponId: string;
}

interface PromoStatus {
  active: boolean;
  totalSpotsRemaining: number;
  deals: {
    growth: DealStatus;
    pro: DealStatus;
    lifetime: DealStatus;
  };
}

export default function PricingPage() {
  const [promo, setPromo] = useState<PromoStatus | null>(null);
  const [avgJobValue, setAvgJobValue] = useState(250);

  useEffect(() => {
    fetch("/api/promo/founding")
      .then((res) => res.json())
      .then((data) => setPromo(data))
      .catch(() => null);
  }, []);

  // Pricing
  const starterPrice = 99;
  const growthPrice = 249;
  const proPrice = 499;
  const lifetimePrice = 1499;

  // ROI calculations based on Growth plan
  const monthsPayForItself = Math.ceil(growthPrice / avgJobValue);
  const yearlyGrowthCost = growthPrice * 12;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            Average customer saves $4,200+/year
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Stop Paying for{" "}
            <span className="text-red-400 line-through decoration-4">10 Different Apps</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            Replace $500+ worth of software with one powerful system.
            <br />
            <span className="text-orange-400 font-semibold">One booking pays for months of service.</span>
          </p>
        </div>
      </section>

      {/* What You're Replacing */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Here&apos;s What You&apos;re Currently Paying For
            </h2>
            <p className="text-xl text-slate-600">
              Add up what you spend on these tools every month...
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {softwareReplaced.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between bg-white rounded-xl p-4 border border-slate-200 hover:border-red-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="text-sm text-slate-500">{item.examples}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-500">{item.cost}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Cost Comparison */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white text-center mb-8">
            <div className="text-lg mb-2">What most service businesses spend:</div>
            <div className="text-5xl md:text-6xl font-bold mb-2">$350 - $900<span className="text-2xl">/month</span></div>
            <div className="text-red-200">That&apos;s $4,200 - $10,800 per year!</div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-slate-300 flex-1 max-w-[100px]"></div>
            <span className="text-slate-500 font-medium">VS</span>
            <div className="h-px bg-slate-300 flex-1 max-w-[100px]"></div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white text-center">
            <div className="text-lg mb-2">TysonsTechSolutions All-in-One:</div>
            <div className="text-5xl md:text-6xl font-bold mb-2">
              ${starterPrice} - ${proPrice}
              <span className="text-2xl">/month</span>
            </div>
            <div className="text-green-100">
              Everything included. No hidden fees.
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              One Booking Pays for Months of Service
            </h2>
            <p className="text-xl text-slate-600">
              Let&apos;s do the math on YOUR business...
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <div className="mb-8">
              <label className="block text-slate-700 font-medium mb-3">
                What&apos;s your average job value?
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={avgJobValue}
                  onChange={(e) => setAvgJobValue(Number(e.target.value))}
                  className="flex-1 h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold min-w-[100px] text-center">
                  ${avgJobValue}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="text-4xl mb-2">1️⃣</div>
                <div className="text-3xl font-bold text-orange-500 mb-1">
                  {monthsPayForItself === 1 ? "1 job" : `${monthsPayForItself} jobs`}
                </div>
                <div className="text-slate-600">pays for a MONTH</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="text-4xl mb-2">💰</div>
                <div className="text-3xl font-bold text-green-500 mb-1">
                  ${(avgJobValue * 12 - yearlyGrowthCost).toLocaleString()}+
                </div>
                <div className="text-slate-600">extra profit/year from just 1 job/month captured</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="text-4xl mb-2">🚀</div>
                <div className="text-3xl font-bold text-blue-500 mb-1">
                  {Math.round((avgJobValue * 12) / yearlyGrowthCost)}x
                </div>
                <div className="text-slate-600">ROI if chatbot books 1 job/month</div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💡</div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">Here&apos;s the reality:</div>
                  <p className="text-slate-700">
                    If your chatbot captures just <strong>ONE lead per month</strong> that you would have missed
                    (someone browsing at 11pm, a busy parent who didn&apos;t want to call), that&apos;s <strong>${avgJobValue} in revenue</strong>.
                    Your monthly cost? Just <strong>${growthPrice}</strong>.
                    {" "}That&apos;s a <strong>{Math.round(avgJobValue / growthPrice * 100)}% return</strong> on ONE booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Member Special */}
      {promo?.active && (
        <section className="py-16 px-6 bg-gradient-to-b from-amber-500 to-orange-500">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
                  FOUNDING MEMBER SPECIALS
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  First 10 Customers Get Exclusive Deals
                </h2>
                <p className="text-xl text-slate-600">
                  Limited spots available for each tier. Once they&apos;re gone, they&apos;re gone.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Growth Deal */}
                <div className={`rounded-2xl p-6 border-2 ${promo.deals.growth.active ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-slate-100 opacity-60'}`}>
                  <div className="text-center mb-4">
                    <div className="text-sm font-bold text-orange-600 mb-1">GROWTH PLAN</div>
                    <div className="text-3xl font-bold text-slate-900">${growthPrice}/mo</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 text-center">
                    <div className="text-lg font-bold text-green-600">Buy 1 Month</div>
                    <div className="text-2xl font-bold text-slate-900">Get Month 2 FREE</div>
                    <div className="text-sm text-slate-500">Save ${growthPrice}</div>
                  </div>
                  {promo.deals.growth.active ? (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="text-red-600 font-bold">{promo.deals.growth.spotsRemaining} spots left</span>
                      </div>
                      <Link
                        href="/signup?plan=growth&promo=FOUNDING_GROWTH"
                        className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-lg font-bold"
                      >
                        Claim This Deal
                      </Link>
                    </>
                  ) : (
                    <div className="text-center text-slate-500 font-medium py-3">Sold Out</div>
                  )}
                </div>

                {/* Pro Deal */}
                <div className={`rounded-2xl p-6 border-2 ${promo.deals.pro.active ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-100 opacity-60'}`}>
                  <div className="text-center mb-4">
                    <div className="text-sm font-bold text-blue-600 mb-1">PRO PLAN</div>
                    <div className="text-3xl font-bold text-slate-900">${proPrice}/mo</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 text-center">
                    <div className="text-lg font-bold text-green-600">Buy 1 Month</div>
                    <div className="text-2xl font-bold text-slate-900">Get Month 2 FREE</div>
                    <div className="text-sm text-slate-500">Save ${proPrice}</div>
                  </div>
                  {promo.deals.pro.active ? (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="text-red-600 font-bold">{promo.deals.pro.spotsRemaining} spots left</span>
                      </div>
                      <Link
                        href="/signup?plan=pro&promo=FOUNDING_PRO"
                        className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-lg font-bold"
                      >
                        Claim This Deal
                      </Link>
                    </>
                  ) : (
                    <div className="text-center text-slate-500 font-medium py-3">Sold Out</div>
                  )}
                </div>

                {/* Lifetime Deal */}
                <div className={`rounded-2xl p-6 border-2 ${promo.deals.lifetime.active ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 ring-2 ring-amber-500 ring-offset-2' : 'border-slate-200 bg-slate-100 opacity-60'}`}>
                  <div className="text-center mb-4">
                    <div className="text-sm font-bold text-amber-600 mb-1">LIFETIME PRO</div>
                    <div className="text-3xl font-bold text-slate-900">${lifetimePrice}</div>
                    <div className="text-sm text-slate-500">one-time payment</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 text-center">
                    <div className="text-lg font-bold text-green-600">Pay Once</div>
                    <div className="text-2xl font-bold text-slate-900">Own Forever</div>
                    <div className="text-sm text-slate-500">vs ${proPrice * 12}/yr paying monthly</div>
                  </div>
                  {promo.deals.lifetime.active ? (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="text-red-600 font-bold">{promo.deals.lifetime.spotsRemaining} spots left</span>
                      </div>
                      <Link
                        href="/signup?plan=lifetime"
                        className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-center py-3 rounded-lg font-bold"
                      >
                        Get Lifetime Access
                      </Link>
                    </>
                  ) : (
                    <div className="text-center text-slate-500 font-medium py-3">Sold Out</div>
                  )}
                </div>
              </div>

              <p className="text-center text-slate-500 text-sm">
                Founding member deals are first-come, first-served. Spots are tracked automatically.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Tiers */}
      <section className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-400">
              Start with chatbot, add website, then SEO. Upgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="text-xl font-bold mb-1">Starter</div>
              <div className="text-sm text-slate-400 mb-4">AI Chatbot Only</div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "AI Chat Widget",
                  "Lead Capture",
                  "Satellite Measurement",
                  "SMS & Email Notifications",
                  "Unlimited Conversations",
                  "Email Support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-slate-300">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full py-3 rounded-lg font-medium text-center bg-slate-700 hover:bg-slate-600 text-white">
                Get Started
              </Link>
            </div>

            {/* Growth */}
            <div className="bg-orange-500 rounded-2xl p-8 ring-4 ring-orange-500 ring-offset-4 ring-offset-slate-900">
              <div className="text-sm text-orange-200 mb-2">MOST POPULAR</div>
              <div className="text-xl font-bold mb-1">Growth</div>
              <div className="text-sm text-orange-200 mb-4">Chatbot + Full Website</div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$249</span>
                <span className="text-orange-200">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Starter",
                  "Professional Website",
                  "Online Booking System",
                  "Service Area Pages",
                  "Pricing & FAQ Pages",
                  "Google Maps Integration",
                  "2 Monthly Updates",
                  "Priority Support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-orange-100">
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full py-3 rounded-lg font-medium text-center bg-white text-orange-500 hover:bg-orange-50">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="text-xl font-bold mb-1">Pro</div>
              <div className="text-sm text-slate-400 mb-4">Full Business Platform</div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$499</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Growth",
                  "Admin Dashboard",
                  "Customer CRM",
                  "Invoice Management",
                  "Expense Tracking (AI-Powered)",
                  "Automated SMS Reminders",
                  "Google Business Profile Setup",
                  "Review Request Automation",
                  "Monthly SEO Report",
                  "Unlimited Updates",
                  "Dedicated Support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-slate-300">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full py-3 rounded-lg font-medium text-center bg-slate-700 hover:bg-slate-600 text-white">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-orange-500 to-orange-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Leaving Money on the Table
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Every missed call, every late-night website visitor, every lead that slips through the cracks -
            that&apos;s money you&apos;re losing. Let our AI work for you 24/7.
          </p>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <div className="text-lg text-orange-200 mb-2">Plans starting at</div>
            <div className="text-5xl font-bold mb-2">${starterPrice}/mo</div>
            <div className="text-orange-200">Everything included. Cancel anytime.</div>
          </div>

          <Link
            href="/signup"
            className="inline-block bg-white text-orange-500 px-10 py-5 rounded-xl font-bold text-xl hover:bg-orange-50 transition-colors shadow-lg"
          >
            Get Started
          </Link>

          <p className="mt-6 text-orange-200">
            Cancel anytime. No long-term contracts.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What if the chatbot doesn't work for my business?",
                a: "We customize everything for YOUR specific services and pricing. If you're not seeing results within 30 days, we'll work with you until it's right or give you a full refund."
              },
              {
                q: "What are the ongoing costs after the monthly fee?",
                a: "Just the actual usage costs: ~$10-30/month for SMS (Twilio), ~$5-20/month for AI features (Anthropic), and Stripe's standard 2.9% + $0.30 per transaction. No hidden markups from us."
              },
              {
                q: "Can I really cancel anytime?",
                a: "Yes. No contracts, no cancellation fees. But honestly? Once you see how many leads you're capturing at 2am, you won't want to."
              },
              {
                q: "What makes this different from Jobber or ServiceTitan?",
                a: "Those are great tools, but they cost $50-200/month EACH and still don't have AI chatbots or satellite measurement. We give you everything in one place for less than what you'd pay for just scheduling software."
              },
              {
                q: "How do the founding member deals work?",
                a: "For Growth ($249/mo) and Pro ($499/mo) plans, the first 10 customers get their second month free. For Lifetime Pro, the first 10 customers can pay $1,499 once and own the Pro plan forever. Once spots are claimed, the deals are gone."
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-6">
                <div className="font-bold text-slate-900 mb-2">{item.q}</div>
                <div className="text-slate-600">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
