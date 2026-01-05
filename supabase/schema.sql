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

CREATE POLICY "Contractors see own data" ON contractors FOR ALL USING (auth.uid() = auth_user_id);
CREATE POLICY "Contractors see own leads" ON leads FOR ALL USING (contractor_id IN (SELECT id FROM contractors WHERE auth_user_id = auth.uid()));
CREATE POLICY "Public posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Service role contractors" ON contractors FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role leads" ON leads FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role conversations" ON conversations FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role messages" ON messages FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
