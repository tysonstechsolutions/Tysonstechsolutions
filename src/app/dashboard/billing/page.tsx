import { createClient } from "@/lib/supabase/server";

const plans = [
  {
    name: "Starter",
    price: 99,
    conversations: "500",
    leads: "50",
    features: ["AI Chat Widget", "Satellite Measurement", "Email Notifications"],
  },
  {
    name: "Growth",
    price: 249,
    conversations: "2,000",
    leads: "200",
    features: ["Everything in Starter", "SMS Notifications", "Priority Support"],
    recommended: true,
  },
  {
    name: "Pro",
    price: 499,
    conversations: "Unlimited",
    leads: "500",
    features: ["Everything in Growth", "Custom Branding", "API Access", "Dedicated Support"],
  },
];

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const currentPlan = "starter";
  const trialEnds = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Billing</h1>
        <p className="text-slate-600 mt-1">Manage your subscription and billing</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-blue-600">Current Plan</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">Free Trial</div>
            <div className="text-sm text-slate-600 mt-1">
              Your trial ends on {trialEnds.toLocaleDateString()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Usage this month</div>
            <div className="text-lg font-semibold text-slate-900">0 / 500 conversations</div>
            <div className="text-lg font-semibold text-slate-900">0 / 50 leads</div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-slate-900 mb-4">Choose a Plan</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-xl border-2 p-6 ${
              plan.recommended ? "border-blue-600 ring-2 ring-blue-600" : "border-slate-200"
            }`}
          >
            {plan.recommended && (
              <div className="text-xs font-semibold text-blue-600 mb-2">RECOMMENDED</div>
            )}
            <div className="text-xl font-semibold text-slate-900">{plan.name}</div>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-bold text-slate-900">${plan.price}</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <div className="text-sm text-slate-600 mb-4">
              <div>{plan.conversations} conversations/mo</div>
              <div>{plan.leads} leads/mo</div>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-sm text-slate-600">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                plan.recommended
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {currentPlan === plan.name.toLowerCase() ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Payment Method</h2>
        <p className="text-slate-600 mb-4">No payment method on file</p>
        <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
          Add Payment Method
        </button>
      </div>
    </div>
  );
}
