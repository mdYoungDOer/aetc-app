const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixAdminAccess() {
  console.log('🔧 Fixing Admin Access for User...\n');

  const userId = '2df40b25-6fe1-4c1f-b327-1c1602a65698';
  const userEmail = 'deyoungdoer@gmail.com';

  try {
    // 1. Check if user_roles table exists
    console.log('1️⃣ Checking user_roles table...');
    const { data: tableCheck, error: tableError } = await supabase
      .from('user_roles')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('❌ user_roles table does not exist or is not accessible');
      console.log('📝 You need to run the admin-rbac-setup.sql script first');
      return;
    }

    console.log('✅ user_roles table exists');

    // 2. Check current roles
    console.log('\n2️⃣ Checking current user roles...');
    const { data: currentRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId);

    if (rolesError) {
      console.error('❌ Error checking roles:', rolesError.message);
      return;
    }

    if (currentRoles && currentRoles.length > 0) {
      console.log('✅ Current roles found:', currentRoles);
    } else {
      console.log('⚠️  No roles found - creating super admin role...');
      
      // 3. Create super admin role
      const { data: newRole, error: createError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: 'super_admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();

      if (createError) {
        console.error('❌ Error creating super admin role:', createError.message);
        return;
      }

      console.log('✅ Super admin role created:', newRole);
    }

    // 4. Verify the role was created
    console.log('\n3️⃣ Verifying role creation...');
    const { data: verifyRoles, error: verifyError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId);

    if (verifyError) {
      console.error('❌ Error verifying roles:', verifyError.message);
      return;
    }

    if (verifyRoles && verifyRoles.length > 0) {
      console.log('✅ Role verification successful:', verifyRoles);
    } else {
      console.log('❌ Role verification failed');
      return;
    }

    // 5. Test admin access
    console.log('\n4️⃣ Testing admin access...');
    const { data: adminTest, error: adminError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (adminError) {
      console.error('❌ Cannot test admin access:', adminError.message);
      return;
    }

    if (adminTest && adminTest.role === 'super_admin') {
      console.log('✅ Super admin access confirmed');
    } else {
      console.log('❌ Admin access not confirmed');
      return;
    }

    console.log('\n🎉 Admin access has been fixed!');
    console.log('\n📋 Next steps:');
    console.log('1. Try logging in again at https://aetc.africa/auth/login');
    console.log('2. If still having issues, check your middleware.ts file');
    console.log('3. Ensure your environment variables are correct');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the fix
fixAdminAccess().then(() => {
  console.log('\n🏁 Admin access fix completed');
});
