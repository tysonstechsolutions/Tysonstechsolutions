"use client";

import { useState } from "react";

interface QuoteRequestFormProps {
  serviceSlug: string;
  serviceName: string;
  packageTier?: string;
  sourcePage?: string;
}

const budgetOptions = [
  { value: "under_2500", label: "Under $2,500" },
  { value: "2500_5000", label: "$2,500 - $5,000" },
  { value: "5000_10000", label: "$5,000 - $10,000" },
  { value: "10000_25000", label: "$10,000 - $25,000" },
  { value: "25000_50000", label: "$25,000 - $50,000" },
  { value: "over_50000", label: "$50,000+" },
];

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1_month", label: "Within 1 month" },
  { value: "1_3_months", label: "1-3 months" },
  { value: "3_6_months", label: "3-6 months" },
  { value: "flexible", label: "Flexible" },
];

export default function QuoteRequestForm({
  serviceSlug,
  serviceName,
  packageTier,
  sourcePage,
}: QuoteRequestFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    website_url: "",
    budget: "",
    timeline: "",
    project_description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service_slug: serviceSlug,
          service_name: serviceName,
          package_tier: packageTier,
          source_page: sourcePage || window.location.pathname,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company_name: "",
        website_url: "",
        budget: "",
        timeline: "",
        project_description: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Request Received!</h3>
        <p className="text-slate-600 mb-4">
          Thank you for your interest in our {serviceName} services. We&apos;ll review your project details and get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-orange-500 hover:text-orange-600 font-medium"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
            placeholder="john@company.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="company_name" className="block text-sm font-medium text-slate-700 mb-2">
            Company Name
          </label>
          <input
            id="company_name"
            name="company_name"
            type="text"
            value={formData.company_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
            placeholder="Acme Inc."
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-2">
            Estimated Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition bg-white"
          >
            <option value="">Select budget range</option>
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-slate-700 mb-2">
            Project Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition bg-white"
          >
            <option value="">When do you need this?</option>
            {timelineOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="website_url" className="block text-sm font-medium text-slate-700 mb-2">
          Current Website (if any)
        </label>
        <input
          id="website_url"
          name="website_url"
          type="url"
          value={formData.website_url}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
          placeholder="https://yoursite.com"
        />
      </div>

      <div>
        <label htmlFor="project_description" className="block text-sm font-medium text-slate-700 mb-2">
          Tell us about your project *
        </label>
        <textarea
          id="project_description"
          name="project_description"
          required
          rows={5}
          value={formData.project_description}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition resize-none"
          placeholder="Describe your project goals, requirements, and any specific features you need..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-medium text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Get Free Quote"}
      </button>

      <p className="text-sm text-slate-500 text-center">
        We&apos;ll respond within 24 hours. No spam, ever.
      </p>
    </form>
  );
}
