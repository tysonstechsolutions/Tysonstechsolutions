-- TYSONSTECHSOLUTIONS DATABASE SCHEMA v2.0

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUM TYPES
CREATE TYPE subscription_tier AS ENUM ('starter', 'growth', 'pro');
CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'canceled', 'trialing');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'quoted', 'won', 'lost');
CREATE TYPE asphalt_service AS ENUM ('sealcoating', 'crack_filling', 'pothole_repair', 'line_striping', 'paving', 'full_assessment');
CREATE TYPE industry_type AS ENUM ('asphalt', 'lawn_care', 'painting', 'dumpster', 'roofing', 'fencing');
CREATE TYPE property_type AS ENUM ('residential_driveway', 'commercial_parking_lot', 'hoa_community', 'industrial', 'other');
CREATE TYPE surface_condition AS ENUM ('good', 'fair', 'poor', 'unknown');

-- CONTRACTORS TABLE
CREATE TABLE contractors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  website_url VARCHAR(500),
  industry industry_type NOT NULL DEFAULT 'asphalt',
  subscription_tier subscription_tier NOT NULL DEFAULT 'starter',
  subscription_status subscription_status NOT NULL DEFAULT 'trialing',
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  conversations_this_month INTEGER DEFAULT 0,
  leads_this_month INTEGER DEFAULT 0,
  widget_api_key UUID DEFAULT uuid_generate_v4() UNIQUE,
  widget_primary_color VARCHAR(7) DEFAULT '#2563eb',
  widget_position VARCHAR(20) DEFAULT 'bottom-right',
  email_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONTRACTOR ASPHALT PRICING
CREATE TABLE contractor_asphalt_pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE UNIQUE,
  sealcoating_enabled BOOLEAN DEFAULT true,
  sealcoating_price_per_sqft DECIMAL(10,4) DEFAULT 0.20,
  sealcoating_minimum DECIMAL(10,2) DEFAULT 250,
  crack_filling_enabled BOOLEAN DEFAULT true,
  crack_filling_price_per_linear_ft DECIMAL(10,4) DEFAULT 1.50,
  pothole_repair_enabled BOOLEAN DEFAULT true,
  pothole_repair_price_per_sqft DECIMAL(10,4) DEFAULT 8.00,
  line_striping_enabled BOOLEAN DEFAULT true,
  line_striping_price_per_stall DECIMAL(10,2) DEFAULT 3.50,
  paving_enabled BOOLEAN DEFAULT true,
  paving_price_per_sqft DECIMAL(10,4) DEFAULT 4.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LEADS TABLE
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20) NOT NULL,
  property_address TEXT NOT NULL,
  property_city VARCHAR(100),
  property_state VARCHAR(2),
  property_zip VARCHAR(10),
  property_lat DECIMAL(10,8),
  property_lng DECIMAL(11,8),
  property_type property_type,
  square_footage INTEGER,
  services_requested asphalt_service[],
  surface_condition surface_condition DEFAULT 'unknown',
  ai_estimate_low DECIMAL(10,2),
  ai_estimate_high DECIMAL(10,2),
  status lead_status DEFAULT 'new',
  conversation_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONVERSATIONS TABLE
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  session_id VARCHAR(255) NOT NULL,
  current_step VARCHAR(50) DEFAULT 'welcome',
  collected_data JSONB DEFAULT '{}',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ DEFAULT NOW()
);

-- MESSAGES TABLE
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,
  content TEXT,
  message_type VARCHAR(50) DEFAULT 'text',
  button_options JSONB,
  selected_option VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SMS LOG TABLE
CREATE TABLE sms_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  contractor_id UUID REFERENCES contractors(id) ON DELETE SET NULL,
  direction VARCHAR(10) NOT NULL,
  from_number VARCHAR(20) NOT NULL,
  to_number VARCHAR(20) NOT NULL,
  body TEXT NOT NULL,
  twilio_sid VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BLOG POSTS TABLE
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  meta_description VARCHAR(320),
  content TEXT NOT NULL,
  excerpt TEXT,
  industry industry_type,
  category VARCHAR(100),
  featured_image_url TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_contractors_widget_key ON contractors(widget_api_key);
CREATE INDEX idx_leads_contractor ON leads(contractor_id);
CREATE INDEX idx_conversations_session ON conversations(session_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- ROW LEVEL SECURITY
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Contractors see own data" ON contractors FOR ALL USING (auth.uid() = auth_user_id);
CREATE POLICY "Contractors see own leads" ON leads FOR ALL USING (contractor_id IN (SELECT id FROM contractors WHERE auth_user_id = auth.uid()));
CREATE POLICY "Contractors see own sms" ON sms_log FOR ALL USING (contractor_id IN (SELECT id FROM contractors WHERE auth_user_id = auth.uid()));
CREATE POLICY "Public posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Service role contractors" ON contractors FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role leads" ON leads FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role conversations" ON conversations FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role messages" ON messages FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role sms_log" ON sms_log FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- TYSONSTECHSOLUTIONS AGENCY SERVICES (v2.1)
-- =====================================================

-- Service inquiry status
CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'proposal_sent', 'negotiating', 'won', 'lost');
CREATE TYPE project_budget AS ENUM ('under_2500', '2500_5000', '5000_10000', '10000_25000', '25000_50000', 'over_50000');
CREATE TYPE project_timeline AS ENUM ('asap', '1_month', '1_3_months', '3_6_months', 'flexible');

-- SERVICE INQUIRIES TABLE (Quote Requests)
CREATE TABLE service_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Contact info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company_name VARCHAR(255),
  website_url VARCHAR(500),

  -- Service details
  service_slug VARCHAR(100) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  package_tier VARCHAR(50), -- 'starter', 'professional', 'enterprise', 'custom'

  -- Project details
  budget project_budget,
  timeline project_timeline,
  project_description TEXT,

  -- Source tracking
  source_page VARCHAR(255), -- which page they came from
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),

  -- Status
  status inquiry_status DEFAULT 'new',
  notes TEXT, -- internal notes
  assigned_to VARCHAR(255), -- for team assignment

  -- Follow-up
  last_contacted_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ,
  proposal_amount DECIMAL(10,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONTACT FORM SUBMISSIONS (General inquiries)
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company_name VARCHAR(255),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  source_page VARCHAR(255),
  status VARCHAR(20) DEFAULT 'new', -- new, replied, closed
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NEWSLETTER SUBSCRIBERS
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  source VARCHAR(100), -- 'footer', 'blog', 'popup', etc.
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

-- SERVICE PACKAGES (Productized offerings)
CREATE TABLE service_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_slug VARCHAR(100) NOT NULL,
  tier VARCHAR(50) NOT NULL, -- 'starter', 'professional', 'enterprise'
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  price_type VARCHAR(20) DEFAULT 'one_time', -- 'one_time', 'monthly', 'yearly'
  description TEXT,
  features JSONB DEFAULT '[]', -- array of feature strings
  deliverables JSONB DEFAULT '[]', -- what they get
  timeline_days INTEGER, -- estimated delivery time
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_inquiries_status ON service_inquiries(status);
CREATE INDEX idx_inquiries_service ON service_inquiries(service_slug);
CREATE INDEX idx_inquiries_created ON service_inquiries(created_at DESC);
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- RLS for new tables
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;

-- Service role has full access to all agency tables
CREATE POLICY "Service role inquiries" ON service_inquiries FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role contacts" ON contact_submissions FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role newsletter" ON newsletter_subscribers FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role packages" ON service_packages FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Public can read active packages
CREATE POLICY "Public packages" ON service_packages FOR SELECT USING (is_active = true);

-- Public can insert inquiries and contacts (for forms)
CREATE POLICY "Public insert inquiries" ON service_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert contacts" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
