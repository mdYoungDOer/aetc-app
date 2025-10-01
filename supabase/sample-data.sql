-- AETC 2026 - Sample Data
-- Run this after creating the schema to populate with initial data

-- Insert sample tickets
INSERT INTO tickets (name, type, price, stock, available, description, features, active)
VALUES 
  ('Early Bird', 'earlybird', 2500, 100, 100, 'Save 30% - Limited time offer', 
   '["Full conference access (3 days)", "All sessions", "Networking events", "Conference materials", "Lunch & refreshments"]'::jsonb, true),
  ('Standard', 'standard', 3500, 200, 200, 'Regular conference pass', 
   '["Full conference access (3 days)", "All sessions", "Networking events", "Conference materials", "Lunch & refreshments"]'::jsonb, true),
  ('Student', 'student', 1500, 50, 50, 'Valid student ID required', 
   '["Full conference access (3 days)", "All sessions", "Conference materials", "Lunch"]'::jsonb, true),
  ('VIP', 'vip', 5000, 30, 30, 'Premium experience with exclusive benefits', 
   '["Full conference access (3 days)", "VIP seating", "Exclusive dinner", "Meet speakers", "Premium materials", "VIP lounge access"]'::jsonb, true);

-- Insert sample speakers
INSERT INTO speakers (name, title, company, bio, featured, order_index)
VALUES 
  ('Dr. Kwame Asante', 'Chief Technology Officer', 'Ghana Grid Company', 'Leading expert in smart grid technologies with 15+ years experience in renewable energy integration.', true, 1),
  ('Eng. Fatima Al-Hassan', 'Director of Operations', 'West Africa Power Pool', 'Specialist in regional energy trading and cross-border electricity markets.', true, 2),
  ('Prof. Michael Osei', 'Professor of Energy Engineering', 'University of Ghana', 'Renowned researcher in solar energy systems and sustainable development.', true, 3),
  ('Ms. Aisha Mohammed', 'CEO', 'GreenTech Solutions', 'Entrepreneur focused on clean energy startups and youth empowerment in the energy sector.', true, 4),
  ('Dr. Samuel Boateng', 'Head of Research', 'Energy Commission Ghana', 'Policy expert in renewable energy regulations and grid modernization.', false, 5),
  ('Eng. Grace Mensah', 'Project Manager', 'Volta River Authority', 'Expert in hydroelectric power systems and dam operations.', false, 6),
  ('Mr. David Ofori', 'Founder', 'SolarTech Africa', 'Pioneer in off-grid solar solutions for rural electrification.', false, 7),
  ('Dr. Comfort Asante', 'Research Director', 'CSIR Energy Research Institute', 'Leading researcher in biomass energy and waste-to-energy technologies.', false, 8);

-- Insert sample pages
INSERT INTO pages (slug, title, content_json, status, meta_description, meta_keywords)
VALUES 
  ('welcome', 'Welcome to AETC 2026', 
   '{"blocks": [{"type": "hero", "content": {"title": "Welcome to AETC 2026", "subtitle": "Shaping the Future of Energy in Africa", "image": "/Images/AETC 2025 PICS 1-24.JPG"}}, {"type": "text", "content": {"text": "Join us for the premier energy technology conference in Africa."}}]}'::jsonb,
   'published', 'Welcome to the Africa Energy Technology Conference 2026', 
   ARRAY['energy', 'conference', 'Africa', 'technology']),
   
  ('about-conference', 'About the Conference',
   '{"blocks": [{"type": "text", "content": {"text": "The Africa Energy Technology Conference 2026 brings together industry leaders, innovators, and policymakers to shape the future of energy in Africa."}}]}'::jsonb,
   'published', 'Learn about the Africa Energy Technology Conference 2026', 
   ARRAY['about', 'conference', 'energy', 'Africa']);

-- Insert sample form
INSERT INTO forms (slug, title, fields_json, status)
VALUES 
  ('contact', 'Contact Form',
   '[{"id": "name", "type": "text", "label": "Full Name", "required": true}, {"id": "email", "type": "email", "label": "Email Address", "required": true}, {"id": "message", "type": "textarea", "label": "Message", "required": true}]'::jsonb,
   'active');

-- Success message
SELECT 'Sample data inserted successfully!' as status;

