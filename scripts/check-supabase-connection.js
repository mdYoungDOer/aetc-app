const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSupabaseConnection() {
  console.log('🔍 Checking Supabase connection...');
  
  try {
    // 1. Test basic connection
    console.log('1️⃣ Testing basic connection...');
    const { data, error } = await supabase.from('_supabase_metadata').select('*').limit(1);
    if (error && error.code !== 'PGRST116') {
      console.error('❌ Basic connection failed:', error.message);
    } else {
      console.log('✅ Basic connection successful');
    }

    // 2. Check if speakers table exists
    console.log('\n2️⃣ Checking speakers table...');
    const { data: speakers, error: speakersError } = await supabase
      .from('speakers')
      .select('*')
      .limit(1);

    if (speakersError) {
      console.error('❌ Speakers table error:', speakersError.message);
      if (speakersError.code === 'PGRST116') {
        console.log('📝 Speakers table does not exist. Creating...');
        await createSpeakersTable();
      }
    } else {
      console.log('✅ Speakers table exists');
      console.log(`📊 Found ${speakers.length} speaker(s)`);
    }

    // 3. Test RPC functions
    console.log('\n3️⃣ Testing RPC functions...');
    
    // Test is_admin function
    const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', {
      user_id: '00000000-0000-0000-0000-000000000000'
    });
    
    if (adminError) {
      console.error('❌ is_admin function error:', adminError.message);
      console.log('📝 Creating RPC functions...');
      await createRPCFunctions();
    } else {
      console.log('✅ is_admin function works');
    }

    // Test is_super_admin function
    const { data: isSuperAdmin, error: superAdminError } = await supabase.rpc('is_super_admin', {
      user_id: '00000000-0000-0000-0000-000000000000'
    });
    
    if (superAdminError) {
      console.error('❌ is_super_admin function error:', superAdminError.message);
    } else {
      console.log('✅ is_super_admin function works');
    }

    // 4. Check user_roles table
    console.log('\n4️⃣ Checking user_roles table...');
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .limit(1);

    if (rolesError) {
      console.error('❌ user_roles table error:', rolesError.message);
      if (rolesError.code === 'PGRST116') {
        console.log('📝 user_roles table does not exist. Creating...');
        await createUserRolesTable();
      }
    } else {
      console.log('✅ user_roles table exists');
    }

    // 5. Insert sample speakers if table is empty
    console.log('\n5️⃣ Checking for sample data...');
    const { data: allSpeakers } = await supabase.from('speakers').select('*');
    if (!allSpeakers || allSpeakers.length === 0) {
      console.log('📝 No speakers found. Inserting sample data...');
      await insertSampleSpeakers();
    } else {
      console.log(`✅ Found ${allSpeakers.length} speakers in database`);
    }

    console.log('\n🎉 Supabase connection check completed!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

async function createSpeakersTable() {
  const createTableSQL = `
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

    CREATE INDEX IF NOT EXISTS idx_speakers_featured ON public.speakers(is_featured);
    CREATE INDEX IF NOT EXISTS idx_speakers_active ON public.speakers(is_active);
    CREATE INDEX IF NOT EXISTS idx_speakers_display_order ON public.speakers(display_order);

    ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;

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

    GRANT USAGE ON SCHEMA public TO anon, authenticated;
    GRANT SELECT, INSERT, UPDATE, DELETE ON public.speakers TO authenticated;
  `;

  const { error } = await supabase.rpc('exec_sql', { sql: createTableSQL });
  if (error) {
    console.error('❌ Error creating speakers table:', error.message);
  } else {
    console.log('✅ Speakers table created successfully');
  }
}

async function createUserRolesTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS public.user_roles (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      role TEXT NOT NULL CHECK (role IN ('admin', 'super_admin', 'editor', 'viewer')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
    CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

    ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Users can view their own roles" ON public.user_roles
      FOR SELECT USING (auth.uid() = user_id);

    CREATE POLICY "Admins can view all roles" ON public.user_roles
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.user_roles 
          WHERE user_id = auth.uid() 
          AND role IN ('admin', 'super_admin')
        )
      );

    GRANT USAGE ON SCHEMA public TO anon, authenticated;
    GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
  `;

  const { error } = await supabase.rpc('exec_sql', { sql: createTableSQL });
  if (error) {
    console.error('❌ Error creating user_roles table:', error.message);
  } else {
    console.log('✅ user_roles table created successfully');
  }
}

async function createRPCFunctions() {
  const createFunctionsSQL = `
    CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
    RETURNS BOOLEAN AS $$
    BEGIN
      RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE public.user_roles.user_id = is_admin.user_id 
        AND role IN ('admin', 'super_admin')
      );
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    CREATE OR REPLACE FUNCTION is_super_admin(user_id UUID)
    RETURNS BOOLEAN AS $$
    BEGIN
      RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE public.user_roles.user_id = is_super_admin.user_id 
        AND role = 'super_admin'
      );
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    GRANT EXECUTE ON FUNCTION is_admin(UUID) TO authenticated;
    GRANT EXECUTE ON FUNCTION is_super_admin(UUID) TO authenticated;
  `;

  const { error } = await supabase.rpc('exec_sql', { sql: createFunctionsSQL });
  if (error) {
    console.error('❌ Error creating RPC functions:', error.message);
  } else {
    console.log('✅ RPC functions created successfully');
  }
}

async function insertSampleSpeakers() {
  const sampleSpeakers = [
    {
      name: 'Hon. John Abdulai Jinapor (MP)',
      title: 'Minister of Energy and Green Transition',
      company: 'Ghana',
      bio: 'Leading Ghana\'s energy transition and green development initiatives.',
      is_featured: true,
      is_active: true,
      display_order: 1
    },
    {
      name: 'Hon. Dr. Cassiel Ato Baah Forson (MP)',
      title: 'Minister for Finance',
      company: 'Ghana',
      bio: 'Overseeing Ghana\'s economic policies and financial frameworks for energy development.',
      is_featured: true,
      is_active: true,
      display_order: 2
    },
    {
      name: 'Senator Heineken Lokpobiri',
      title: 'Hon. Minister of State, Petroleum Resources (Oil)',
      company: 'Nigeria',
      bio: 'Leading Nigeria\'s petroleum sector development and energy policy initiatives.',
      is_featured: true,
      is_active: true,
      display_order: 3
    },
    {
      name: 'Hon. Eng. Karim Badawi',
      title: 'Minister of Petroleum and Mineral Resources',
      company: 'Egypt',
      bio: 'Overseeing Egypt\'s petroleum and mineral resources sector development.',
      is_featured: true,
      is_active: true,
      display_order: 4
    }
  ];

  const { error } = await supabase.from('speakers').insert(sampleSpeakers);
  if (error) {
    console.error('❌ Error inserting sample speakers:', error.message);
  } else {
    console.log('✅ Sample speakers inserted successfully');
  }
}

checkSupabaseConnection();
