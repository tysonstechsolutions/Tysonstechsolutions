import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

// Add your admin email here
const ADMIN_EMAILS = ["tyson@tysonstechsolutions.com"];

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  service_slug: string;
  service_name: string;
  package_tier: string | null;
  budget: string | null;
  timeline: string | null;
  project_description: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  proposal_sent: "bg-purple-100 text-purple-700",
  negotiating: "bg-orange-100 text-orange-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-slate-100 text-slate-700",
};

const budgetLabels: Record<string, string> = {
  under_2500: "Under $2,500",
  "2500_5000": "$2,500 - $5,000",
  "5000_10000": "$5,000 - $10,000",
  "10000_25000": "$10,000 - $25,000",
  "25000_50000": "$25,000 - $50,000",
  over_50000: "$50,000+",
};

const timelineLabels: Record<string, string> = {
  asap: "ASAP",
  "1_month": "Within 1 month",
  "1_3_months": "1-3 months",
  "3_6_months": "3-6 months",
  flexible: "Flexible",
};

export default async function AdminInquiriesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Check if user is admin
  if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
    redirect("/login");
  }

  // Fetch all inquiries
  const { data: inquiries } = await supabase
    .from("service_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  // Fetch contact submissions
  const { data: contacts } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  const newInquiries = (inquiries || []).filter((i: Inquiry) => i.status === "new").length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-600">Manage inquiries and leads</p>
          </div>
          <Link href="/" className="text-orange-500 hover:text-orange-600 font-medium">
            Back to Site
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm font-medium text-slate-500">Total Inquiries</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{inquiries?.length || 0}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm font-medium text-slate-500">New (Uncontacted)</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">{newInquiries}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm font-medium text-slate-500">Contact Forms</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{contacts?.length || 0}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-sm font-medium text-slate-500">This Week</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {(inquiries || []).filter((i: Inquiry) => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(i.created_at) > weekAgo;
              }).length}
            </div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Service Inquiries</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Timeline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(inquiries as Inquiry[] || []).map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">{inquiry.name}</div>
                      <div className="text-sm text-slate-500">{inquiry.email}</div>
                      {inquiry.company_name && (
                        <div className="text-xs text-slate-400">{inquiry.company_name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {inquiry.service_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {inquiry.budget ? budgetLabels[inquiry.budget] || inquiry.budget : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {inquiry.timeline ? timelineLabels[inquiry.timeline] || inquiry.timeline : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[inquiry.status] || "bg-slate-100 text-slate-700"}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a
                        href={`mailto:${inquiry.email}?subject=Re: ${inquiry.service_name} Inquiry`}
                        className="text-orange-500 hover:text-orange-600 font-medium"
                      >
                        Email
                      </a>
                      {inquiry.phone && (
                        <>
                          <span className="mx-2 text-slate-300">|</span>
                          <a href={`tel:${inquiry.phone}`} className="text-orange-500 hover:text-orange-600 font-medium">
                            Call
                          </a>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {(!inquiries || inquiries.length === 0) && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      No inquiries yet. They&apos;ll appear here when someone submits a quote request.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Submissions */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Recent Contact Form Submissions</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {(contacts || []).map((contact: { id: string; name: string; email: string; subject: string | null; message: string; created_at: string; status: string }) => (
              <div key={contact.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-slate-900">{contact.name}</div>
                    <div className="text-sm text-slate-500">{contact.email}</div>
                    {contact.subject && (
                      <div className="text-sm text-slate-600 mt-1">Subject: {contact.subject}</div>
                    )}
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600 whitespace-pre-wrap">{contact.message}</p>
                <div className="mt-3">
                  <a
                    href={`mailto:${contact.email}?subject=Re: ${contact.subject || "Your message"}`}
                    className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Reply to {contact.name}
                  </a>
                </div>
              </div>
            ))}
            {(!contacts || contacts.length === 0) && (
              <div className="p-12 text-center text-slate-500">
                No contact form submissions yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
