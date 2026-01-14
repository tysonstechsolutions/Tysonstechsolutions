"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface ContractorSettings {
  id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  website_url: string | null;
  email_notifications: boolean;
  sms_notifications: boolean;
}

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [contractorId, setContractorId] = useState<string | null>(null);

  const supabase = createClient();

  // Load current settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: contractor, error: fetchError } = await supabase
          .from("contractors")
          .select("id, business_name, contact_name, email, phone, website_url, email_notifications, sms_notifications")
          .eq("auth_user_id", user.id)
          .single();

        if (fetchError) {
          console.error("Error loading settings:", fetchError);
          return;
        }

        if (contractor) {
          setContractorId(contractor.id);
          setFormData({
            companyName: contractor.business_name || "",
            contactName: contractor.contact_name || "",
            email: contractor.email || "",
            phone: contractor.phone || "",
            website: contractor.website_url || "",
          });
          setNotifications({
            email: contractor.email_notifications ?? true,
            sms: contractor.sms_notifications ?? true,
          });
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleNotificationChange = (type: "email" | "sms") => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    if (!contractorId) {
      setError("Unable to save - contractor not found");
      return;
    }

    // Validate required fields
    if (!formData.companyName.trim() || !formData.contactName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const { error: updateError } = await supabase
        .from("contractors")
        .update({
          business_name: formData.companyName.trim(),
          contact_name: formData.contactName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          website_url: formData.website.trim() || null,
          email_notifications: notifications.email,
          sms_notifications: notifications.sms,
          updated_at: new Date().toISOString(),
        })
        .eq("id", contractorId);

      if (updateError) {
        throw updateError;
      }

      setSuccess("Settings saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account settings</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* Company Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Company Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="Your Company LLC"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Contact Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="(555) 123-4567"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              placeholder="https://yourcompany.com"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Notifications</h2>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="font-medium text-slate-900">Email Notifications</div>
              <div className="text-sm text-slate-500">Receive email alerts for new leads</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationChange("email")}
              className="w-5 h-5 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="font-medium text-slate-900">SMS Notifications</div>
              <div className="text-sm text-slate-500">Receive text alerts for new leads</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleNotificationChange("sms")}
              className="w-5 h-5 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
            />
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-red-200 p-6">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
        <p className="text-slate-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
