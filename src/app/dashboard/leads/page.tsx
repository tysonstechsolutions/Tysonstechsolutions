import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Placeholder - will fetch actual leads when DB is connected
  const leads: any[] = [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-600 mt-1">Manage and track your incoming leads</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <select className="px-4 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400">
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <select className="px-4 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400">
            <option value="all">All Services</option>
            <option value="sealcoating">Sealcoating</option>
            <option value="lawn">Lawn Care</option>
            <option value="painting">Painting</option>
          </select>
          <input
            type="text"
            placeholder="Search leads..."
            className="px-4 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 flex-1 min-w-[200px]"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {leads.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-900 mb-1">No leads yet</h3>
            <p className="text-slate-500 mb-6">Install the chat widget on your website to start capturing leads</p>
            <Link
              href="/dashboard/widget"
              className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Get Widget Code
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quote</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Lead rows will go here */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
