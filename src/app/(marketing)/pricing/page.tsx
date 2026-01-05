import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | TysonsTechSolutions",
  description: "Simple, transparent pricing. Start with a 14-day free trial. No credit card required.",
};

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

export default function PricingPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600">
            Start with a 14-day free trial. No credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-2"
                  : "bg-white border border-slate-200"
              }`}
            >
              {plan.highlighted && (
                <div className="text-sm text-blue-200 font-medium mb-2">
                  MOST POPULAR
                </div>
              )}
              <div className="text-xl font-semibold mb-2">{plan.name}</div>
              <div className="mb-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className={`${plan.highlighted ? "text-blue-200" : "text-slate-500"}`}>
                  /month
                </span>
              </div>
              <p className={`mb-6 ${plan.highlighted ? "text-blue-100" : "text-slate-600"}`}>
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg
                      className={`w-5 h-5 mt-0.5 ${plan.highlighted ? "text-blue-200" : "text-green-500"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`${plan.highlighted ? "text-blue-100" : "text-slate-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`block w-full py-3 rounded-lg font-medium text-center ${
                  plan.highlighted
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-slate-600">
          <p>All plans include a 14-day free trial. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
}
