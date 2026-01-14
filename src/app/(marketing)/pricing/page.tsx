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

interface PromoStatus {
  active: boolean;
  spotsRemaining: number;
  totalSpots: number;
  percentOff: number;
}

export default function PricingPage() {
  const [promo, setPromo] = useState<PromoStatus | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [avgJobValue, setAvgJobValue] = useState(250);

  useEffect(() => {
    fetch("/api/promo/founding")
      .then((res) => res.json())
      .then((data) => setPromo(data))
      .catch(() => setPromo({ active: true, spotsRemaining: 14, totalSpots: 20, percentOff: 50 }));
  }, []);

  const showPromo = promo?.active && (promo?.spotsRemaining ?? 0) > 0;

  // Pricing (Growth plan as the default shown price)
  const normalPrice = 249;
  const setupFee = 499;
  const discountedPrice = Math.round(normalPrice * 0.5); // $125

  // ROI calculations
  const monthsPayForItself = Math.ceil(discountedPrice / avgJobValue);
  const yearlyNormalCost = normalPrice * 12;
  const yearlyDiscountedCost = (setupFee) + (discountedPrice * 11); // First month is setup
  const yearlyDiscountedCostYear2 = discountedPrice * 12;

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
              {showPromo ? (
                <>
                  <span className="text-3xl line-through text-green-300">${normalPrice}</span>
                  {" "}${discountedPrice}
                </>
              ) : (
                `$${normalPrice}`
              )}
              <span className="text-2xl">/month</span>
            </div>
            <div className="text-green-100">
              {showPromo ? "Founding Member Price - Locked Forever!" : "Everything included. No hidden fees."}
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
                  ${(avgJobValue * 12 - yearlyDiscountedCostYear2).toLocaleString()}+
                </div>
                <div className="text-slate-600">extra profit/year from just 1 job/month captured</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="text-4xl mb-2">🚀</div>
                <div className="text-3xl font-bold text-blue-500 mb-1">
                  {Math.round((avgJobValue * 12) / yearlyDiscountedCostYear2)}x
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
                    Your monthly cost? Just <strong>${showPromo ? discountedPrice : normalPrice}</strong>.
                    {" "}That&apos;s a <strong>{Math.round(avgJobValue / (showPromo ? discountedPrice : normalPrice) * 100)}% return</strong> on ONE booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Member Special */}
      {showPromo && (
        <section className="py-16 px-6 bg-gradient-to-b from-amber-500 to-orange-500">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
                  FOUNDING MEMBER SPECIAL
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Lock in 50% Off Forever
                </h2>
                <p className="text-xl text-slate-600">
                  Be one of our first {promo?.totalSpots} customers and never pay full price.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Normal Pricing */}
                <div className="bg-slate-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-slate-300 text-slate-600 px-3 py-1 text-xs font-bold rounded-bl-lg">
                    REGULAR PRICE
                  </div>
                  <div className="text-slate-500 font-medium mb-2 mt-4">Standard Membership</div>
                  <div className="text-4xl font-bold text-slate-400 mb-4">
                    ${normalPrice}<span className="text-xl">/mo</span>
                  </div>
                  <ul className="space-y-2 text-slate-500">
                    <li>Year 1: ${yearlyNormalCost.toLocaleString()}</li>
                    <li>Year 2: ${yearlyNormalCost.toLocaleString()}</li>
                    <li>Year 3: ${yearlyNormalCost.toLocaleString()}</li>
                    <li className="font-bold">3-Year Total: ${(yearlyNormalCost * 3).toLocaleString()}</li>
                  </ul>
                </div>

                {/* Founding Member Pricing */}
                <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-white text-orange-500 px-3 py-1 text-xs font-bold rounded-bl-lg">
                    FOUNDING MEMBER
                  </div>
                  <div className="text-orange-100 font-medium mb-2 mt-4">Your Price Forever</div>
                  <div className="mb-4">
                    <div className="text-lg text-orange-200 line-through">${normalPrice}/mo</div>
                    <div className="text-4xl font-bold">
                      ${discountedPrice}<span className="text-xl">/mo</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-orange-100">
                    <li>Month 1 (Setup): ${setupFee}</li>
                    <li>Month 2+: ${discountedPrice}/mo forever</li>
                    <li>Year 1: ${yearlyDiscountedCost.toLocaleString()}</li>
                    <li className="font-bold text-white">3-Year Total: ${(yearlyDiscountedCost + yearlyDiscountedCostYear2 * 2).toLocaleString()}</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-orange-400">
                    <div className="text-2xl font-bold">
                      You Save: ${((yearlyNormalCost * 3) - (yearlyDiscountedCost + yearlyDiscountedCostYear2 * 2)).toLocaleString()}
                    </div>
                    <div className="text-orange-200 text-sm">over 3 years</div>
                  </div>
                </div>
              </div>

              {/* Urgency */}
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    Only {promo?.spotsRemaining} of {promo?.totalSpots} Spots Left
                  </span>
                </div>
                <p className="text-red-600">
                  Once these spots are gone, the price goes to ${normalPrice}/month. No exceptions.
                </p>
              </div>

              <Link
                href="/signup?promo=FOUNDING50"
                className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-center py-5 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
              >
                Claim My Founding Member Spot - ${setupFee} Today
              </Link>
              <p className="text-center text-slate-500 mt-4 text-sm">
                Then just ${discountedPrice}/month forever. Cancel anytime.
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

          {showPromo ? (
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
              <div className="text-lg text-orange-200 mb-2">Founding Member Special</div>
              <div className="text-5xl font-bold mb-2">
                ${setupFee} + ${discountedPrice}/mo
              </div>
              <div className="text-orange-200">
                ${normalPrice}/mo value - locked at half price forever
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
              <div className="text-5xl font-bold mb-2">${normalPrice}/mo</div>
              <div className="text-orange-200">Everything included</div>
            </div>
          )}

          <Link
            href={showPromo ? "/signup?promo=FOUNDING50" : "/signup"}
            className="inline-block bg-white text-orange-500 px-10 py-5 rounded-xl font-bold text-xl hover:bg-orange-50 transition-colors shadow-lg"
          >
            {showPromo ? "Claim My Founding Spot" : "Start Free Trial"}
          </Link>

          <p className="mt-6 text-orange-200">
            {showPromo
              ? `Only ${promo?.spotsRemaining} spots left at this price!`
              : "14-day free trial. No credit card required."
            }
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
                q: "Is the 'founding member' price really locked forever?",
                a: "Yes. When you sign up as a founding member, your $125/month rate is locked for as long as you're a customer. Even if we raise prices to $300/month next year, you pay $125. Forever."
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
