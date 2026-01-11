import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface Lead {
  id: string;
  customer_name: string | null;
  customer_phone: string;
  property_address: string;
  ai_estimate_low: number | null;
  ai_estimate_high: number | null;
  status: string;
  created_at: string;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get contractor data
  const { data: contractor } = await supabase
    .from("contractors")
    .select("id, business_name, conversations_this_month, leads_this_month")
    .eq("auth_user_id", user?.id)
    .single();

  const companyName = contractor?.business_name || user?.user_metadata?.company_name || "Your Company";
  const contractorId = contractor?.id;

  // Get today's date boundaries
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Get first day of current month
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Fetch stats in parallel
  const [
    { count: leadsToday },
    { count: leadsThisMonth },
    { data: recentLeads },
    { data: quoteData }
  ] = await Promise.all([
    // Leads today
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("contractor_id", contractorId)
      .gte("created_at", today.toISOString())
      .lt("created_at", tomorrow.toISOString()),
    // Leads this month
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("contractor_id", contractorId)
      .gte("created_at", firstOfMonth.toISOString()),
    // Recent leads (last 5)
    supabase
      .from("leads")
      .select("id, customer_name, customer_phone, property_address, ai_estimate_low, ai_estimate_high, status, created_at")
      .eq("contractor_id", contractorId)
      .order("created_at", { ascending: false })
      .limit(5),
    // Total quote value this month
    supabase
      .from("leads")
      .select("ai_estimate_low, ai_estimate_high")
      .eq("contractor_id", contractorId)
      .gte("created_at", firstOfMonth.toISOString())
  ]);

  // Calculate total quote value (average of low and high estimates)
  const totalQuoteValue = (quoteData || []).reduce((sum, lead) => {
    const low = lead.ai_estimate_low || 0;
    const high = lead.ai_estimate_high || 0;
    return sum + (low + high) / 2;
  }, 0);

  const conversationsThisMonth = contractor?.conversations_this_month || 0;

  // Calculate percentage change (simplified - would need yesterday's data for real calc)
  const leadsTodayCount = leadsToday || 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {companyName}</h1>
        <p className="text-slate-600 mt-1">Here is what is happening with your leads today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="text-sm font-medium text-slate-500">New Leads Today</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{leadsTodayCount}</div>
          <div className="mt-2 text-sm text-slate-500">
            {leadsTodayCount > 0 ? "Keep it up!" : "Check back later"}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="text-sm font-medium text-slate-500">Total Leads</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{leadsThisMonth || 0}</div>
          <div className="mt-2 text-sm text-slate-500">This month</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="text-sm font-medium text-slate-500">Conversations</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{conversationsThisMonth}</div>
          <div className="mt-2 text-sm text-slate-500">This month</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="text-sm font-medium text-slate-500">Quote Value</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">
            ${totalQuoteValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="mt-2 text-sm text-slate-500">Total quoted</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/widget"
              className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-slate-900">Get Widget Code</div>
                <div className="text-sm text-slate-500">Install the chat widget on your site</div>
              </div>
            </Link>
            <Link
              href="/dashboard/pricing"
              className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-slate-900">Set Your Pricing</div>
                <div className="text-sm text-slate-500">Configure service prices per sq ft</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Leads</h2>
            {recentLeads && recentLeads.length > 0 && (
              <Link href="/dashboard/leads" className="text-sm text-orange-500 hover:text-orange-600">
                View all
              </Link>
            )}
          </div>
          {recentLeads && recentLeads.length > 0 ? (
            <div className="space-y-3">
              {recentLeads.map((lead: Lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-slate-900 truncate">
                      {lead.customer_name || lead.customer_phone}
                    </div>
                    <div className="text-sm text-slate-500 truncate">{lead.property_address}</div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-sm font-medium text-slate-900">
                      {lead.ai_estimate_low && lead.ai_estimate_high
                        ? `$${lead.ai_estimate_low.toLocaleString()}-$${lead.ai_estimate_high.toLocaleString()}`
                        : "Pending"}
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                      lead.status === "new" ? "bg-blue-100 text-blue-700" :
                      lead.status === "contacted" ? "bg-yellow-100 text-yellow-700" :
                      lead.status === "quoted" ? "bg-purple-100 text-purple-700" :
                      lead.status === "won" ? "bg-green-100 text-green-700" :
                      "bg-slate-100 text-slate-700"
                    }`}>
                      {lead.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <svg className="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>No leads yet</p>
              <p className="text-sm mt-1">Install the widget to start getting leads</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
