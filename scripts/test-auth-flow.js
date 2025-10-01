const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuthFlow() {
  console.log('🔍 Testing authentication flow...');
  
  try {
    // Test 1: Check current session
    console.log('1️⃣ Checking current session...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Error getting session:', sessionError.message);
    } else if (session) {
      console.log('✅ User is authenticated:', session.user.email);
    } else {
      console.log('ℹ️ No active session (user not logged in)');
    }

    // Test 2: Check if we can access admin functions
    console.log('\n2️⃣ Testing admin RPC functions...');
    
    // Test with a dummy user ID
    const dummyUserId = '00000000-0000-0000-0000-000000000000';
    
    const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', {
      user_id: dummyUserId
    });
    
    if (adminError) {
      console.error('❌ is_admin function error:', adminError.message);
    } else {
      console.log('✅ is_admin function works, result:', isAdmin);
    }

    const { data: isSuperAdmin, error: superAdminError } = await supabase.rpc('is_super_admin', {
      user_id: dummyUserId
    });
    
    if (superAdminError) {
      console.error('❌ is_super_admin function error:', superAdminError.message);
    } else {
      console.log('✅ is_super_admin function works, result:', isSuperAdmin);
    }

    // Test 3: Check user_roles table
    console.log('\n3️⃣ Checking user_roles table...');
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .limit(3);

    if (rolesError) {
      console.error('❌ Error fetching user roles:', rolesError.message);
    } else {
      console.log('✅ User roles table accessible, found:', roles.length, 'roles');
      roles.forEach((role, index) => {
        console.log(`   ${index + 1}. User ${role.user_id} has role: ${role.role}`);
      });
    }

    // Test 4: Test sign in with dummy credentials (should fail gracefully)
    console.log('\n4️⃣ Testing sign in with dummy credentials...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'wrongpassword'
    });

    if (signInError) {
      console.log('✅ Sign in correctly failed:', signInError.message);
    } else {
      console.log('⚠️ Sign in unexpectedly succeeded:', signInData.user?.email);
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testAuthFlow();
