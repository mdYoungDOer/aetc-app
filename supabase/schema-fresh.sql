-- AETC 2026 - Complete Fresh Schema
-- Use this if you want to start with a clean database

-- Drop all tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS user_tickets CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS form_entries CASCADE;
DROP TABLE IF EXISTS form_submissions CASCADE;
DROP TABLE IF EXISTS forms CASCADE;
DROP TABLE IF EXISTS revisions CASCADE;
DROP TABLE IF EXISTS blocks CASCADE;
DROP TABLE IF EXISTS sections CASCADE;
DROP TABLE IF EXISTS pages CASCADE;
DROP TABLE IF EXISTS speakers CASCADE;

-- Drop the trigger function if it exists
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Now create everything fresh
-- Pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content_json JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  meta_description TEXT,
  meta_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Sections table (optional, for more granular control)
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'hero', 'grid', 'form', 'custom')),
  config_json JSONB DEFAULT '{}'::jsonb,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Blocks table (for reusable content blocks)
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
  content JSONB DEFAULT '{}'::jsonb,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Revisions table (version history)
CREATE TABLE revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  content_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_by UUID REFERENCES auth.users(id),
  comment TEXT
);

-- Forms table
CREATE TABLE forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  fields_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  submissions_table_ref TEXT,
  settings_json JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_by UUID REFERENCES auth.users(id)
);

-- Form submissions table
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  ip_address INET,
  user_agent TEXT
);

-- Form entries table (same as form_submissions but with user reference)
CREATE TABLE form_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
  data_json JSONB NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  ip_address INET
);

-- Tickets table
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('earlybird', 'standard', 'student', 'vip')),
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'GHS',
  stock INTEGER DEFAULT 0,
  available INTEGER DEFAULT 0,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  ticket_id UUID REFERENCES tickets(id),
  quantity INTEGER DEFAULT 1,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'GHS',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'cancelled', 'refunded')),
  paystack_reference TEXT UNIQUE,
  payment_data JSONB,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- User tickets table
CREATE TABLE user_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  ticket_id UUID REFERENCES tickets(id),
  qr_code TEXT,
  ticket_number TEXT UNIQUE,
  attendee_name TEXT,
  attendee_email TEXT,
  checked_in BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Speakers table
CREATE TABLE speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  bio TEXT,
  image_url TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_status ON pages(status);
CREATE INDEX idx_sections_page_id ON sections(page_id);
CREATE INDEX idx_blocks_section_id ON blocks(section_id);
CREATE INDEX idx_revisions_page_id ON revisions(page_id);
CREATE INDEX idx_forms_slug ON forms(slug);
CREATE INDEX idx_form_submissions_form_id ON form_submissions(form_id);
CREATE INDEX idx_form_entries_form_id ON form_entries(form_id);
CREATE INDEX idx_form_entries_user_id ON form_entries(user_id);
CREATE INDEX idx_tickets_type ON tickets(type);
CREATE INDEX idx_tickets_active ON tickets(active);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_paystack_ref ON orders(paystack_reference);
CREATE INDEX idx_user_tickets_order_id ON user_tickets(order_id);
CREATE INDEX idx_user_tickets_user_id ON user_tickets(user_id);

-- Enable Row Level Security
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pages (public read, authenticated write)
CREATE POLICY "Public can read published pages" ON pages
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can manage pages" ON pages
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for sections
CREATE POLICY "Public can read sections of published pages" ON sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pages WHERE pages.id = sections.page_id AND pages.status = 'published'
    )
  );

CREATE POLICY "Authenticated users can manage sections" ON sections
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for blocks
CREATE POLICY "Public can read blocks" ON blocks
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage blocks" ON blocks
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for revisions
CREATE POLICY "Authenticated users can manage revisions" ON revisions
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for forms
CREATE POLICY "Public can read active forms" ON forms
  FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated users can manage forms" ON forms
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for form submissions
CREATE POLICY "Anyone can submit forms" ON form_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read submissions" ON form_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for speakers
CREATE POLICY "Public can read featured speakers" ON speakers
  FOR SELECT USING (featured = true);

CREATE POLICY "Authenticated users can manage speakers" ON speakers
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for form_entries
CREATE POLICY "Users can read own entries" ON form_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create entries" ON form_entries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read all entries" ON form_entries
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for tickets
CREATE POLICY "Public can read active tickets" ON tickets
  FOR SELECT USING (active = true);

CREATE POLICY "Authenticated users can manage tickets" ON tickets
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for orders
CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id OR customer_email = auth.jwt()->>'email');

CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own pending orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Authenticated users can read all orders" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for user_tickets
CREATE POLICY "Users can read own tickets" ON user_tickets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create tickets" ON user_tickets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read all tickets" ON user_tickets
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blocks_updated_at BEFORE UPDATE ON blocks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forms_updated_at BEFORE UPDATE ON forms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_speakers_updated_at BEFORE UPDATE ON speakers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Fresh schema created successfully!' as status;
