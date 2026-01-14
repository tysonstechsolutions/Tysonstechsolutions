// Database types for TysonsTechSolutions

// Enum types matching the database schema
export type SubscriptionTier = "starter" | "growth" | "pro";
export type SubscriptionStatus = "active" | "past_due" | "canceled" | "trialing";
export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";
export type AsphaltService = "sealcoating" | "crack_filling" | "pothole_repair" | "line_striping" | "paving" | "full_assessment";
export type IndustryType = "asphalt" | "lawn_care" | "painting" | "dumpster" | "roofing" | "fencing";
export type PropertyType = "residential_driveway" | "commercial_parking_lot" | "hoa_community" | "industrial" | "other";
export type SurfaceCondition = "good" | "fair" | "poor" | "unknown";
export type InquiryStatus = "new" | "contacted" | "proposal_sent" | "negotiating" | "won" | "lost";
export type ProjectBudget = "under_2500" | "2500_5000" | "5000_10000" | "10000_25000" | "25000_50000" | "over_50000";
export type ProjectTimeline = "asap" | "1_month" | "1_3_months" | "3_6_months" | "flexible";

// Database table interfaces
export interface Contractor {
  id: string;
  auth_user_id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  website_url: string | null;
  industry: IndustryType;
  subscription_tier: SubscriptionTier;
  subscription_status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  trial_ends_at: string | null;
  conversations_this_month: number;
  leads_this_month: number;
  widget_api_key: string;
  widget_primary_color: string;
  widget_position: string;
  email_notifications?: boolean;
  sms_notifications?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  contractor_id: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string;
  property_address: string;
  property_city: string | null;
  property_state: string | null;
  property_zip: string | null;
  property_lat: number | null;
  property_lng: number | null;
  property_type: PropertyType | null;
  square_footage: number | null;
  services_requested: AsphaltService[] | null;
  surface_condition: SurfaceCondition;
  ai_estimate_low: number | null;
  ai_estimate_high: number | null;
  status: LeadStatus;
  conversation_id: string | null;
  service_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  contractor_id: string;
  lead_id: string | null;
  session_id: string;
  current_step: string;
  collected_data: Record<string, unknown>;
  started_at: string;
  last_message_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant" | "system";
  content: string | null;
  message_type: string;
  button_options: Record<string, unknown> | null;
  selected_option: string | null;
  created_at: string;
}

export interface SmsLog {
  id: string;
  lead_id: string | null;
  contractor_id: string | null;
  direction: "inbound" | "outbound";
  from_number: string;
  to_number: string;
  body: string;
  twilio_sid: string | null;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  content: string;
  excerpt: string | null;
  industry: IndustryType | null;
  category: string | null;
  featured_image_url: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  website_url: string | null;
  service_slug: string;
  service_name: string;
  package_tier: string | null;
  budget: ProjectBudget | null;
  timeline: ProjectTimeline | null;
  project_description: string | null;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: InquiryStatus;
  notes: string | null;
  assigned_to: string | null;
  last_contacted_at: string | null;
  next_followup_at: string | null;
  proposal_amount: number | null;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  subject: string | null;
  message: string;
  source_page: string | null;
  status: "new" | "replied" | "closed";
  replied_at: string | null;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  subscribed_at: string;
  unsubscribed_at: string | null;
  is_active: boolean;
}

export interface ContractorAsphaltPricing {
  id: string;
  contractor_id: string;
  sealcoating_enabled: boolean;
  sealcoating_price_per_sqft: number;
  sealcoating_minimum: number;
  crack_filling_enabled: boolean;
  crack_filling_price_per_linear_ft: number;
  pothole_repair_enabled: boolean;
  pothole_repair_price_per_sqft: number;
  line_striping_enabled: boolean;
  line_striping_price_per_stall: number;
  paving_enabled: boolean;
  paving_price_per_sqft: number;
  created_at: string;
  updated_at: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form data types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  subject: string;
  message: string;
  source_page?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  website_url?: string;
  service_slug: string;
  service_name: string;
  package_tier?: string;
  budget?: ProjectBudget;
  timeline?: ProjectTimeline;
  project_description?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}
