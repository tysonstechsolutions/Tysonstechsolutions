import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Placeholder - will fetch actual lead data
  const lead = null;

  if (!lead) {
    return (
      <div>
        <Link href="/dashboard/leads" className="text-orange-500 hover:text-orange-600 mb-4 inline-block">
          &larr; Back to Leads
        </Link>
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">Lead Not Found</h1>
          <p className="text-slate-600">This lead does not exist or has been deleted.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link href="/dashboard/leads" className="text-orange-500 hover:text-orange-600 mb-4 inline-block">
        &larr; Back to Leads
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-slate-500">Name</dt>
                <dd className="text-slate-900 font-medium">-</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Email</dt>
                <dd className="text-slate-900">-</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Phone</dt>
                <dd className="text-slate-900">-</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Address</dt>
                <dd className="text-slate-900">-</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quote Details</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-slate-500">Service</dt>
                <dd className="text-slate-900 font-medium">-</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Square Footage</dt>
                <dd className="text-slate-900">-</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Estimated Price</dt>
                <dd className="text-2xl font-bold text-slate-900">-</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Status</h2>
            <select className="w-full px-4 py-2 rounded-lg border border-slate-300">
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Notes</h2>
            <textarea
              rows={4}
              placeholder="Add notes about this lead..."
              className="w-full px-4 py-2 rounded-lg border border-slate-300"
            />
            <button className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
