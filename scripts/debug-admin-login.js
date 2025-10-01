const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugAdminLogin() {
  console.log('🔍 Debugging admin login issue...');
  
  try {
    // 1. Check all users in auth.users
    console.log('1️⃣ Checking all users in auth.users...');
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
      console.error('❌ Error fetching users:', usersError.message);
    } else {
      console.log('✅ Found users:', users.users.length);
      users.users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.email} - ID: ${user.id} - Created: ${user.created_at}`);
      });
    }

    // 2. Check user_roles table
    console.log('\n2️⃣ Checking user_roles table...');
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*');

    if (rolesError) {
      console.error('❌ Error fetching user roles:', rolesError.message);
    } else {
      console.log('✅ Found user roles:', roles.length);
      roles.forEach((role, index) => {
        console.log(`   ${index + 1}. User ${role.user_id} has role: ${role.role}`);
      });
    }

    // 3. Test RPC functions with actual user IDs
    console.log('\n3️⃣ Testing RPC functions with actual user IDs...');
    
    if (roles.length > 0) {
      for (const role of roles) {
        console.log(`\n   Testing user ${role.user_id} (${role.role})...`);
        
        const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', {
          user_id: role.user_id
        });
        
        if (adminError) {
          console.error(`   ❌ is_admin error for ${role.user_id}:`, adminError.message);
        } else {
          console.log(`   ✅ is_admin result for ${role.user_id}:`, isAdmin);
        }

        const { data: isSuperAdmin, error: superAdminError } = await supabase.rpc('is_super_admin', {
          user_id: role.user_id
        });
        
        if (superAdminError) {
          console.error(`   ❌ is_super_admin error for ${role.user_id}:`, superAdminError.message);
        } else {
          console.log(`   ✅ is_super_admin result for ${role.user_id}:`, isSuperAdmin);
        }
      }
    } else {
      console.log('⚠️ No user roles found - this is likely the problem!');
      console.log('📝 You need to create admin users in the user_roles table');
    }

    // 4. Check if we can create an admin user
    console.log('\n4️⃣ Checking if we can create admin users...');
    
    if (users.users.length > 0 && roles.length === 0) {
      console.log('📝 Creating admin role for first user...');
      
      const firstUser = users.users[0];
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert([{
          user_id: firstUser.id,
          role: 'super_admin'
        }]);

      if (insertError) {
        console.error('❌ Error creating admin role:', insertError.message);
      } else {
        console.log(`✅ Created super_admin role for ${firstUser.email}`);
        
        // Test the RPC function again
        const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', {
          user_id: firstUser.id
        });
        
        if (adminError) {
          console.error('❌ is_admin error after creating role:', adminError.message);
        } else {
          console.log('✅ is_admin result after creating role:', isAdmin);
        }
      }
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

debugAdminLogin();
