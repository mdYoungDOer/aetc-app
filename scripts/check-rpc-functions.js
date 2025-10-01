const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkRPCFunctions() {
  console.log('🔍 Checking Supabase RPC Functions...\n');

  const userId = '2df40b25-6fe1-4c1f-b327-1c1602a65698';

  try {
    // 1. Test is_admin function
    console.log('1️⃣ Testing is_admin function...');
    const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', {
      user_id: userId
    });

    if (adminError) {
      console.error('❌ is_admin function error:', adminError.message);
      console.log('📝 You need to create the is_admin function in Supabase');
    } else {
      console.log('✅ is_admin function works:', isAdmin);
    }

    // 2. Test is_super_admin function
    console.log('\n2️⃣ Testing is_super_admin function...');
    const { data: isSuperAdmin, error: superAdminError } = await supabase.rpc('is_super_admin', {
      user_id: userId
    });

    if (superAdminError) {
      console.error('❌ is_super_admin function error:', superAdminError.message);
      console.log('📝 You need to create the is_super_admin function in Supabase');
    } else {
      console.log('✅ is_super_admin function works:', isSuperAdmin);
    }

    // 3. Alternative: Direct role check
    console.log('\n3️⃣ Testing direct role check...');
    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (rolesError) {
      console.error('❌ Direct role check error:', rolesError.message);
    } else if (userRoles && userRoles.length > 0) {
      console.log('✅ Direct role check successful:', userRoles);
      const hasAdminRole = userRoles.some(role => ['admin', 'super_admin'].includes(role.role));
      console.log('🔐 Has admin access:', hasAdminRole);
    } else {
      console.log('❌ No roles found for user');
    }

    // 4. Provide SQL to create RPC functions
    console.log('\n4️⃣ SQL to create RPC functions:');
    console.log(`
-- Create is_admin function
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = is_admin.user_id 
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create is_super_admin function
CREATE OR REPLACE FUNCTION is_super_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = is_super_admin.user_id 
    AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
    `);

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the check
checkRPCFunctions().then(() => {
  console.log('\n🏁 RPC functions check completed');
  console.log('\n📋 If RPC functions are missing:');
  console.log('1. Go to your Supabase dashboard');
  console.log('2. Navigate to SQL Editor');
  console.log('3. Run the SQL provided above');
  console.log('4. Test the functions again');
});
