const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Required variables:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSupabaseSetup() {
  console.log('🔍 Checking Supabase Authentication Setup...\n');

  try {
    // 1. Check if user exists
    console.log('1️⃣ Checking user existence...');
    const { data: user, error: userError } = await supabase.auth.admin.getUserById(
      '2df40b25-6fe1-4c1f-b327-1c1602a65698'
    );

    if (userError) {
      console.error('❌ Error fetching user:', userError.message);
      return;
    }

    if (user.user) {
      console.log('✅ User found:', {
        id: user.user.id,
        email: user.user.email,
        confirmed: user.user.email_confirmed_at,
        lastSignIn: user.user.last_sign_in_at,
        createdAt: user.user.created_at
      });
    } else {
      console.log('❌ User not found');
      return;
    }

    // 2. Check user roles in database
    console.log('\n2️⃣ Checking user roles...');
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', '2df40b25-6fe1-4c1f-b327-1c1602a65698');

    if (rolesError) {
      console.error('❌ Error fetching roles:', rolesError.message);
    } else if (roles && roles.length > 0) {
      console.log('✅ User roles found:', roles);
    } else {
      console.log('⚠️  No roles found for user - this might be the issue!');
      
      // Try to create super admin role
      console.log('🔧 Attempting to create super admin role...');
      const { data: newRole, error: createError } = await supabase
        .from('user_roles')
        .insert({
          user_id: '2df40b25-6fe1-4c1f-b327-1c1602a65698',
          role: 'super_admin',
          created_at: new Date().toISOString()
        })
        .select();

      if (createError) {
        console.error('❌ Error creating role:', createError.message);
      } else {
        console.log('✅ Super admin role created:', newRole);
      }
    }

    // 3. Check RLS policies
    console.log('\n3️⃣ Checking RLS policies...');
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'user_roles');

    if (policiesError) {
      console.log('⚠️  Could not check RLS policies (this is normal for some setups)');
    } else {
      console.log('✅ RLS policies found:', policies?.length || 0);
    }

    // 4. Test authentication
    console.log('\n4️⃣ Testing authentication...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'deyoungdoer@gmail.com',
      password: 'your-password-here' // You'll need to provide the actual password
    });

    if (authError) {
      console.log('⚠️  Authentication test failed (expected if password is wrong):', authError.message);
    } else {
      console.log('✅ Authentication successful');
    }

    // 5. Check admin routes protection
    console.log('\n5️⃣ Checking admin route access...');
    const { data: adminCheck, error: adminError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', '2df40b25-6fe1-4c1f-b327-1c1602a65698')
      .single();

    if (adminError) {
      console.error('❌ Cannot verify admin access:', adminError.message);
    } else if (adminCheck && ['super_admin', 'admin'].includes(adminCheck.role)) {
      console.log('✅ Admin access confirmed');
    } else {
      console.log('❌ User does not have admin access');
    }

    // 6. Check middleware configuration
    console.log('\n6️⃣ Checking middleware configuration...');
    console.log('📝 Make sure your middleware.ts includes:');
    console.log('- Proper auth checks');
    console.log('- Role-based access control');
    console.log('- Correct redirects for unauthorized users');

    // 7. Environment variables check
    console.log('\n7️⃣ Environment variables check...');
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];

    requiredVars.forEach(varName => {
      const value = process.env[varName];
      if (value) {
        console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
      } else {
        console.log(`❌ ${varName}: Missing`);
      }
    });

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the check
checkSupabaseSetup().then(() => {
  console.log('\n🏁 Supabase check completed');
  console.log('\n📋 Next steps:');
  console.log('1. Ensure user has proper role in user_roles table');
  console.log('2. Check middleware.ts for proper auth logic');
  console.log('3. Verify environment variables are correct');
  console.log('4. Test login with correct credentials');
});
