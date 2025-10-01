const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixSpeakersTable() {
  console.log('🔧 Fixing speakers table structure...');
  
  try {
    // First, let's see what columns exist
    console.log('1️⃣ Checking current table structure...');
    const { data: columns, error: columnsError } = await supabase.rpc('get_table_columns', {
      table_name: 'speakers'
    });

    if (columnsError) {
      console.log('⚠️ Could not get table columns, proceeding with fixes...');
    } else {
      console.log('Current columns:', columns);
    }

    // Add missing columns
    console.log('\n2️⃣ Adding missing columns...');
    
    const alterTableSQL = `
      -- Add missing columns if they don't exist
      DO $$ 
      BEGIN
        -- Add is_active column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'is_active'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN is_active BOOLEAN DEFAULT true;
        END IF;

        -- Add is_featured column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'is_featured'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN is_featured BOOLEAN DEFAULT false;
        END IF;

        -- Add display_order column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'display_order'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN display_order INTEGER DEFAULT 0;
        END IF;

        -- Add bio column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'bio'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN bio TEXT;
        END IF;

        -- Add image_url column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'image_url'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN image_url TEXT;
        END IF;

        -- Add linkedin_url column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'linkedin_url'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN linkedin_url TEXT;
        END IF;

        -- Add twitter_url column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'twitter_url'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN twitter_url TEXT;
        END IF;

        -- Add website_url column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'website_url'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN website_url TEXT;
        END IF;

        -- Add email column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'email'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN email TEXT;
        END IF;

        -- Add phone column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'phone'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN phone TEXT;
        END IF;

        -- Add created_at column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'created_at'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        END IF;

        -- Add updated_at column
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'speakers' AND column_name = 'updated_at'
        ) THEN
          ALTER TABLE public.speakers ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        END IF;
      END $$;
    `;

    const { error: alterError } = await supabase.rpc('exec_sql', { sql: alterTableSQL });
    if (alterError) {
      console.error('❌ Error altering table:', alterError.message);
    } else {
      console.log('✅ Successfully added missing columns');
    }

    // Create indexes
    console.log('\n3️⃣ Creating indexes...');
    const indexSQL = `
      CREATE INDEX IF NOT EXISTS idx_speakers_featured ON public.speakers(is_featured);
      CREATE INDEX IF NOT EXISTS idx_speakers_active ON public.speakers(is_active);
      CREATE INDEX IF NOT EXISTS idx_speakers_display_order ON public.speakers(display_order);
    `;

    const { error: indexError } = await supabase.rpc('exec_sql', { sql: indexSQL });
    if (indexError) {
      console.error('❌ Error creating indexes:', indexError.message);
    } else {
      console.log('✅ Successfully created indexes');
    }

    // Update existing speakers to have proper values
    console.log('\n4️⃣ Updating existing speakers...');
    const { error: updateError } = await supabase
      .from('speakers')
      .update({ 
        is_active: true, 
        is_featured: true,
        display_order: 1
      })
      .is('is_active', null);

    if (updateError) {
      console.error('❌ Error updating speakers:', updateError.message);
    } else {
      console.log('✅ Successfully updated existing speakers');
    }

    // Test the fixed table
    console.log('\n5️⃣ Testing fixed table...');
    const { data: testSpeakers, error: testError } = await supabase
      .from('speakers')
      .select('*')
      .eq('is_active', true)
      .limit(3);

    if (testError) {
      console.error('❌ Test failed:', testError.message);
    } else {
      console.log('✅ Test successful! Found speakers:', testSpeakers.length);
      testSpeakers.forEach((speaker, index) => {
        console.log(`   ${index + 1}. ${speaker.name} - Active: ${speaker.is_active}, Featured: ${speaker.is_featured}`);
      });
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

fixSpeakersTable();
