-- TysonsTechSolutions Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CONTRACTORS TABLE
-- ============================================
CREATE TABLE contractors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  api_key UUID UNIQUE DEFAULT uuid_generate_v4(),
  subscription_tier TEXT DEFAULT 'starter' CHECK (subscription_tier IN ('starter', 'growth', 'pro')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'trialing' CHECK (subscription_status IN ('trialing', 'active', 'canceled', 'past_due')),
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  conversations_used INTEGER DEFAULT 0,
  leads_used INTEGER DEFAULT 0,
  billing_cycle_start TIMESTAMPTZ DEFAULT NOW(),
  widget_color TEXT DEFAULT '#2563eb',
  widget_position TEXT DEFAULT 'bottom-right' CHECK (widget_position IN ('bottom-right', 'bottom-left')),
  welcome_message TEXT DEFAULT 'Hi! I can help you get a quick quote. What is the address of the property?',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONTRACTOR SERVICES TABLE
-- ============================================
CREATE TABLE contractor_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  price_per_sqft DECIMAL(10,2) NOT NULL,
  minimum_price DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(contractor_id, service_type)
);

-- ============================================
-- LEADS TABLE
-- ============================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT NOT NULL,
  city TEXT,
  state TEXT,
  zip TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  service_type TEXT,
  square_footage DECIMAL(10,2),
  estimated_price DECIMAL(10,2),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'won', 'lost')),
  notes TEXT,
  source TEXT DEFAULT 'widget',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONVERSATIONS TABLE
-- ============================================
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  visitor_ip TEXT,
  visitor_user_agent TEXT,
  page_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MESSAGES TABLE
-- ============================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SMS LOG TABLE
-- ============================================
CREATE TABLE sms_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  from_number TEXT NOT NULL,
  to_number TEXT NOT NULL,
  body TEXT NOT NULL,
  twilio_sid TEXT,
  status TEXT DEFAULT 'sent',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_contractors_api_key ON contractors(api_key);
CREATE INDEX idx_contractors_email ON contractors(email);
CREATE INDEX idx_leads_contractor_id ON leads(contractor_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_conversations_contractor_id ON conversations(contractor_id);
CREATE INDEX idx_conversations_session_id ON conversations(session_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_sms_log_contractor_id ON sms_log(contractor_id);
-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractor_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================
CREATE POLICY "Contractors can view own data" ON contractors
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Contractors can update own data" ON contractors
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Contractors can view own services" ON contractor_services
  FOR SELECT USING (contractor_id = auth.uid());

CREATE POLICY "Contractors can insert own services" ON contractor_services
  FOR INSERT WITH CHECK (contractor_id = auth.uid());

CREATE POLICY "Contractors can update own services" ON contractor_services
  FOR UPDATE USING (contractor_id = auth.uid());

CREATE POLICY "Contractors can delete own services" ON contractor_services
  FOR DELETE USING (contractor_id = auth.uid());

CREATE POLICY "Contractors can view own leads" ON leads
  FOR SELECT USING (contractor_id = auth.uid());

CREATE POLICY "Contractors can insert own leads" ON leads
  FOR INSERT WITH CHECK (contractor_id = auth.uid());

CREATE POLICY "Contractors can update own leads" ON leads
  FOR UPDATE USING (contractor_id = auth.uid());

CREATE POLICY "Contractors can view own conversations" ON conversations
  FOR SELECT USING (contractor_id = auth.uid());

CREATE POLICY "Contractors can view own messages" ON messages
  FOR SELECT USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE contractor_id = auth.uid()
    )
  );

CREATE POLICY "Contractors can view own sms" ON sms_log
  FOR SELECT USING (contractor_id = auth.uid());

-- Service role policies for API routes
CREATE POLICY "Service role full access to contractors" ON contractors
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access to leads" ON leads
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access to conversations" ON conversations
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access to messages" ON messages
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access to sms_log" ON sms_log
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access to services" ON contractor_services
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_contractors_updated_at
  BEFORE UPDATE ON contractors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contractor_services_updated_at
  BEFORE UPDATE ON contractor_services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to reset monthly usage
CREATE OR REPLACE FUNCTION reset_monthly_usage()
RETURNS void AS $$
BEGIN
  UPDATE contractors
  SET
    conversations_used = 0,
    leads_used = 0,
    billing_cycle_start = NOW()
  WHERE billing_cycle_start < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Function to get contractor by API key (for widget)
CREATE OR REPLACE FUNCTION get_contractor_by_api_key(p_api_key UUID)
RETURNS TABLE (
  id UUID,
  company_name TEXT,
  subscription_tier TEXT,
  subscription_status TEXT,
  conversations_used INTEGER,
  leads_used INTEGER,
  widget_color TEXT,
  widget_position TEXT,
  welcome_message TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.company_name,
    c.subscription_tier,
    c.subscription_status,
    c.conversations_used,
    c.leads_used,
    c.widget_color,
    c.widget_position,
    c.welcome_message
  FROM contractors c
  WHERE c.api_key = p_api_key
    AND c.subscription_status IN ('trialing', 'active');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
