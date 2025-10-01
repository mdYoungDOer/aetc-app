const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createSpeakersTable() {
  console.log('🔧 Creating speakers table...\n');

  try {
    // Create speakers table
    const { data: createTable, error: createError } = await supabase
      .from('speakers')
      .select('id')
      .limit(1);

    if (createError && createError.code === 'PGRST116') {
      // Table doesn't exist, create it
      console.log('📝 Creating speakers table...');
      
      // We'll need to run this SQL directly in Supabase dashboard
      console.log(`
Please run this SQL in your Supabase dashboard (SQL Editor):

-- Create speakers table
CREATE TABLE IF NOT EXISTS public.speakers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    website_url TEXT,
    email TEXT,
    phone TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_speakers_featured ON public.speakers(is_featured);
CREATE INDEX IF NOT EXISTS idx_speakers_active ON public.speakers(is_active);
CREATE INDEX IF NOT EXISTS idx_speakers_display_order ON public.speakers(display_order);

-- Enable RLS (Row Level Security)
ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view active speakers" ON public.speakers
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can view all speakers" ON public.speakers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

CREATE POLICY "Admins can insert speakers" ON public.speakers
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

CREATE POLICY "Admins can update speakers" ON public.speakers
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

CREATE POLICY "Admins can delete speakers" ON public.speakers
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_id = auth.uid() 
            AND role IN ('admin', 'super_admin')
        )
    );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.speakers TO authenticated;
      `);
      
      console.log('✅ Please run the SQL above in your Supabase dashboard, then run: node scripts/seed-speakers.js');
    } else {
      console.log('✅ Speakers table already exists');
      console.log('🌱 Running speaker seeding...');
      
      // Run the seeding script
      require('./seed-speakers.js');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createSpeakersTable();
