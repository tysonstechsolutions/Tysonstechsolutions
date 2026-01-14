"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Lead {
  id: string;
  customer_name: string | null;
  customer_phone: string;
  customer_email: string | null;
  property_address: string;
  service_type: string | null;
  ai_estimate_low: number | null;
  ai_estimate_high: number | null;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

const SERVICE_OPTIONS = [
  { value: "all", label: "All Services" },
  { value: "sealcoating", label: "Sealcoating" },
  { value: "crack_filling", label: "Crack Filling" },
  { value: "pothole_repair", label: "Pothole Repair" },
  { value: "line_striping", label: "Line Striping" },
  { value: "paving", label: "Paving" },
  { value: "lawn", label: "Lawn Care" },
  { value: "painting", label: "Painting" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function fetchLeads() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get contractor ID
        const { data: contractor } = await supabase
          .from("contractors")
          .select("id")
          .eq("auth_user_id", user.id)
          .single();

        if (!contractor) return;

        // Fetch leads
        const { data: leadsData } = await supabase
          .from("leads")
          .select("id, customer_name, customer_phone, customer_email, property_address, service_type, ai_estimate_low, ai_estimate_high, status, created_at")
          .eq("contractor_id", contractor.id)
          .order("created_at", { ascending: false });

        setLeads(leadsData || []);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  // Filter leads based on status, service, and search query
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Status filter
      if (statusFilter !== "all" && lead.status !== statusFilter) {
        return false;
      }

      // Service filter
      if (serviceFilter !== "all") {
        const serviceMatch = lead.service_type?.toLowerCase().includes(serviceFilter.toLowerCase());
        if (!serviceMatch) return false;
      }

      // Search filter (search in name, phone, email, address)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const searchFields = [
          lead.customer_name,
          lead.customer_phone,
          lead.customer_email,
          lead.property_address,
        ].filter(Boolean).map(f => f!.toLowerCase());

        const matchesSearch = searchFields.some(field => field.includes(query));
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [leads, statusFilter, serviceFilter, searchQuery]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "contacted":
        return "bg-yellow-100 text-yellow-700";
      case "quoted":
        return "bg-purple-100 text-purple-700";
      case "won":
        return "bg-green-100 text-green-700";
      case "lost":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-600 mt-1">
            Manage and track your incoming leads
            {filteredLeads.length !== leads.length && (
              <span className="ml-2 text-sm">
                (Showing {filteredLeads.length} of {leads.length})
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 flex-1 min-w-[200px]"
          />
          {(statusFilter !== "all" || serviceFilter !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter("all");
                setServiceFilter("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {leads.length === 0 ? (
              <>
                <h3 className="text-lg font-medium text-slate-900 mb-1">No leads yet</h3>
                <p className="text-slate-500 mb-6">Install the chat widget on your website to start capturing leads</p>
                <Link
                  href="/dashboard/widget"
                  className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Get Widget Code
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-slate-900 mb-1">No matching leads</h3>
                <p className="text-slate-500 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setStatusFilter("all");
                    setServiceFilter("all");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Clear all filters
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
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
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{lead.customer_name || "Unknown"}</div>
                      <div className="text-sm text-slate-500">{lead.customer_phone}</div>
                      {lead.customer_email && (
                        <div className="text-sm text-slate-400">{lead.customer_email}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{lead.property_address}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{lead.service_type || "-"}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {lead.ai_estimate_low && lead.ai_estimate_high
                        ? `$${lead.ai_estimate_low.toLocaleString()} - $${lead.ai_estimate_high.toLocaleString()}`
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
