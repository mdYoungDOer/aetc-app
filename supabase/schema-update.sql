-- AETC 2026 - Safe Schema Update
-- This script safely updates the database without conflicts

-- Drop existing policies first (if they exist)
DROP POLICY IF EXISTS "Public can read published pages" ON pages;
DROP POLICY IF EXISTS "Authenticated users can manage pages" ON pages;
DROP POLICY IF EXISTS "Public can read sections of published pages" ON sections;
DROP POLICY IF EXISTS "Authenticated users can manage sections" ON sections;
DROP POLICY IF EXISTS "Public can read blocks" ON blocks;
DROP POLICY IF EXISTS "Authenticated users can manage blocks" ON blocks;
DROP POLICY IF EXISTS "Authenticated users can manage revisions" ON revisions;
DROP POLICY IF EXISTS "Public can read active forms" ON forms;
DROP POLICY IF EXISTS "Authenticated users can manage forms" ON forms;
DROP POLICY IF EXISTS "Anyone can submit forms" ON form_submissions;
DROP POLICY IF EXISTS "Authenticated users can read submissions" ON form_submissions;
DROP POLICY IF EXISTS "Public can read featured speakers" ON speakers;
DROP POLICY IF EXISTS "Authenticated users can manage speakers" ON speakers;
DROP POLICY IF EXISTS "Users can read own entries" ON form_entries;
DROP POLICY IF EXISTS "Anyone can create entries" ON form_entries;
DROP POLICY IF EXISTS "Authenticated users can read all entries" ON form_entries;
DROP POLICY IF EXISTS "Public can read active tickets" ON tickets;
DROP POLICY IF EXISTS "Authenticated users can manage tickets" ON tickets;
DROP POLICY IF EXISTS "Users can read own orders" ON orders;
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Users can update own pending orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can read all orders" ON orders;
DROP POLICY IF EXISTS "Users can read own tickets" ON user_tickets;
DROP POLICY IF EXISTS "System can create tickets" ON user_tickets;
DROP POLICY IF EXISTS "Authenticated users can read all tickets" ON user_tickets;

-- Now recreate all policies
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

-- Success message
SELECT 'Schema update completed successfully!' as status;
