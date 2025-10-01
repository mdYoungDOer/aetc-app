-- AETC 2026 - Supabase Storage Setup
-- Run this in Supabase SQL Editor to set up storage buckets

-- Create storage bucket for assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'aetc-assets',
  'aetc-assets',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'application/pdf', 'text/plain']
);

-- Create storage bucket for user uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'user-uploads',
  'user-uploads',
  false,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
);

-- Set up RLS policies for aetc-assets bucket (public read)
CREATE POLICY "Public can view aetc-assets" ON storage.objects
FOR SELECT USING (bucket_id = 'aetc-assets');

CREATE POLICY "Authenticated users can upload to aetc-assets" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'aetc-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update aetc-assets" ON storage.objects
FOR UPDATE USING (bucket_id = 'aetc-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete aetc-assets" ON storage.objects
FOR DELETE USING (bucket_id = 'aetc-assets' AND auth.role() = 'authenticated');

-- Set up RLS policies for user-uploads bucket (private)
CREATE POLICY "Users can view own uploads" ON storage.objects
FOR SELECT USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload to own folder" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own uploads" ON storage.objects
FOR UPDATE USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own uploads" ON storage.objects
FOR DELETE USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Success message
SELECT 'Storage buckets and policies created successfully!' as status;
