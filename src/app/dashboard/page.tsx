import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get user metadata
  const companyName = user?.user_metadata?.company_name || "Your Company";

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
          <div className="mt-2 text-3xl font-bold text-slate-900">0</div>
          <div className="mt-2 text-sm text-green-600">+0% from yesterday</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="text-sm font-medium text-slate-500">Total Leads</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">0</div>
          <div className="mt-2 text-sm text-slate-500">This month</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="text-sm font-medium text-slate-500">Conversations</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">0</div>
          <div className="mt-2 text-sm text-slate-500">This month</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="text-sm font-medium text-slate-500">Quote Value</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">$0</div>
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
              className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
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
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Leads</h2>
          <div className="text-center py-8 text-slate-500">
            <svg className="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p>No leads yet</p>
            <p className="text-sm mt-1">Install the widget to start getting leads</p>
          </div>
        </div>
      </div>
    </div>
  );
}
