import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UpgradeButton from "./UpgradeButton";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 99,
    priceId: process.env.STRIPE_PRICE_STARTER || "",
    conversations: "500",
    leads: "50",
    features: ["AI Chat Widget", "Satellite Measurement", "Email Notifications"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 249,
    priceId: process.env.STRIPE_PRICE_GROWTH || "",
    conversations: "2,000",
    leads: "200",
    features: ["Everything in Starter", "SMS Notifications", "Priority Support"],
    recommended: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 499,
    priceId: process.env.STRIPE_PRICE_PRO || "",
    conversations: "Unlimited",
    leads: "500",
    features: ["Everything in Growth", "Custom Branding", "API Access", "Dedicated Support"],
  },
];

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get contractor data
  const { data: contractor } = await supabase
    .from("contractors")
    .select("id, subscription_tier, subscription_status, trial_ends_at, conversations_this_month, leads_this_month")
    .eq("auth_user_id", user.id)
    .single();

  const currentPlan = contractor?.subscription_tier || "starter";
  const subscriptionStatus = contractor?.subscription_status || "trialing";
  const trialEnds = contractor?.trial_ends_at
    ? new Date(contractor.trial_ends_at)
    : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  const conversationsUsed = contractor?.conversations_this_month || 0;
  const leadsUsed = contractor?.leads_this_month || 0;

  // Get plan limits
  const currentPlanData = plans.find(p => p.id === currentPlan);
  const conversationLimit = currentPlanData?.conversations || "500";
  const leadLimit = currentPlanData?.leads || "50";

  const isTrialing = subscriptionStatus === "trialing";
  const isActive = subscriptionStatus === "active";
  const trialExpired = isTrialing && trialEnds < new Date();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Billing</h1>
        <p className="text-slate-600 mt-1">Manage your subscription and billing</p>
      </div>

      {/* Current Plan Status */}
      <div className={`rounded-xl p-6 mb-8 border ${
        trialExpired
          ? "bg-red-50 border-red-200"
          : isActive
            ? "bg-green-50 border-green-200"
            : "bg-orange-50 border-orange-200"
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-sm font-medium ${
              trialExpired ? "text-red-500" : isActive ? "text-green-600" : "text-orange-500"
            }`}>
              {trialExpired ? "Trial Expired" : isActive ? "Active Subscription" : "Free Trial"}
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 capitalize">
              {currentPlan} Plan
            </div>
            {isTrialing && !trialExpired && (
              <div className="text-sm text-slate-600 mt-1">
                Your trial ends on {trialEnds.toLocaleDateString()}
              </div>
            )}
            {trialExpired && (
              <div className="text-sm text-red-600 mt-1">
                Upgrade now to continue using the service
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Usage this month</div>
            <div className="text-lg font-semibold text-slate-900">
              {conversationsUsed} / {conversationLimit} conversations
            </div>
            <div className="text-lg font-semibold text-slate-900">
              {leadsUsed} / {leadLimit} leads
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-slate-900 mb-4">Choose a Plan</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-xl border-2 p-6 ${
              plan.recommended ? "border-orange-500 ring-2 ring-orange-500" : "border-slate-200"
            }`}
          >
            {plan.recommended && (
              <div className="text-xs font-semibold text-orange-500 mb-2">RECOMMENDED</div>
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
                  <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            {currentPlan === plan.id && isActive ? (
              <button
                disabled
                className="w-full py-2 rounded-lg font-medium bg-slate-100 text-slate-500 cursor-not-allowed"
              >
                Current Plan
              </button>
            ) : (
              <UpgradeButton
                priceId={plan.priceId}
                contractorId={contractor?.id || ""}
                planName={plan.name}
                recommended={plan.recommended}
              />
            )}
          </div>
        ))}
      </div>

      {isActive && process.env.STRIPE_CUSTOMER_PORTAL_URL && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Manage Subscription</h2>
          <p className="text-slate-600 mb-4">
            Need to update your payment method or cancel your subscription?
          </p>
          <a
            href={process.env.STRIPE_CUSTOMER_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors inline-block"
          >
            Manage in Stripe Portal
          </a>
        </div>
      )}
    </div>
  );
}
