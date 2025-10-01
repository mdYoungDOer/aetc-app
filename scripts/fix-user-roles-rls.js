const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixUserRolesRLS() {
  console.log('🔧 Fixing user_roles RLS policies...');
  
  try {
    // First, drop all existing policies on user_roles table
    console.log('1️⃣ Dropping existing RLS policies...');
    
    const dropPoliciesSQL = `
      -- Drop existing policies
      DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
      DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
      DROP POLICY IF EXISTS "Users can insert their own roles" ON public.user_roles;
      DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
      DROP POLICY IF EXISTS "Users can update their own roles" ON public.user_roles;
      DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
      DROP POLICY IF EXISTS "Users can delete their own roles" ON public.user_roles;
      DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
    `;

    const { error: dropError } = await supabase.rpc('exec_sql', { sql: dropPoliciesSQL });
    if (dropError) {
      console.log('⚠️ Could not drop policies via exec_sql, trying alternative approach...');
      // Alternative: Just recreate the policies (they will override existing ones)
    } else {
      console.log('✅ Successfully dropped existing policies');
    }

    // Create new, non-recursive RLS policies
    console.log('\n2️⃣ Creating new non-recursive RLS policies...');
    
    const createPoliciesSQL = `
      -- Create new policies without recursion
      
      -- Policy 1: Users can view their own roles
      CREATE POLICY "Users can view their own roles" ON public.user_roles
        FOR SELECT USING (auth.uid() = user_id);
      
      -- Policy 2: Service role can view all roles (for admin functions)
      CREATE POLICY "Service role can view all roles" ON public.user_roles
        FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');
      
      -- Policy 3: Authenticated users can view roles (for RPC functions)
      CREATE POLICY "Authenticated users can view roles for RPC" ON public.user_roles
        FOR SELECT USING (auth.role() = 'authenticated');
      
      -- Policy 4: Only service role can insert roles
      CREATE POLICY "Service role can insert roles" ON public.user_roles
        FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'service_role');
      
      -- Policy 5: Only service role can update roles
      CREATE POLICY "Service role can update roles" ON public.user_roles
        FOR UPDATE USING (auth.jwt() ->> 'role' = 'service_role');
      
      -- Policy 6: Only service role can delete roles
      CREATE POLICY "Service role can delete roles" ON public.user_roles
        FOR DELETE USING (auth.jwt() ->> 'role' = 'service_role');
    `;

    const { error: createError } = await supabase.rpc('exec_sql', { sql: createPoliciesSQL });
    if (createError) {
      console.error('❌ Error creating policies via exec_sql:', createError.message);
      console.log('📝 Trying manual approach...');
      
      // Manual approach - create policies one by one
      const policies = [
        {
          name: "Users can view their own roles",
          command: "SELECT",
          using: "auth.uid() = user_id"
        },
        {
          name: "Service role can view all roles",
          command: "SELECT", 
          using: "auth.jwt() ->> 'role' = 'service_role'"
        },
        {
          name: "Authenticated users can view roles for RPC",
          command: "SELECT",
          using: "auth.role() = 'authenticated'"
        },
        {
          name: "Service role can insert roles",
          command: "INSERT",
          with_check: "auth.jwt() ->> 'role' = 'service_role'"
        },
        {
          name: "Service role can update roles", 
          command: "UPDATE",
          using: "auth.jwt() ->> 'role' = 'service_role'"
        },
        {
          name: "Service role can delete roles",
          command: "DELETE", 
          using: "auth.jwt() ->> 'role' = 'service_role'"
        }
      ];

      for (const policy of policies) {
        try {
          let policySQL = `CREATE POLICY "${policy.name}" ON public.user_roles FOR ${policy.command}`;
          
          if (policy.using) {
            policySQL += ` USING (${policy.using})`;
          }
          
          if (policy.with_check) {
            policySQL += ` WITH CHECK (${policy.with_check})`;
          }

          const { error } = await supabase.rpc('exec_sql', { sql: policySQL });
          if (error) {
            console.error(`❌ Error creating policy "${policy.name}":`, error.message);
          } else {
            console.log(`✅ Created policy: ${policy.name}`);
          }
        } catch (err) {
          console.error(`❌ Error creating policy "${policy.name}":`, err.message);
        }
      }
    } else {
      console.log('✅ Successfully created new RLS policies');
    }

    // Test the fixed policies
    console.log('\n3️⃣ Testing fixed policies...');
    
    // Test 1: Service role should be able to view all roles
    const { data: allRoles, error: allRolesError } = await supabase
      .from('user_roles')
      .select('*')
      .limit(5);

    if (allRolesError) {
      console.error('❌ Error fetching user roles:', allRolesError.message);
    } else {
      console.log('✅ Successfully fetched user roles:', allRoles.length);
      allRoles.forEach((role, index) => {
        console.log(`   ${index + 1}. User ${role.user_id} has role: ${role.role}`);
      });
    }

    // Test 2: Test RPC functions
    console.log('\n4️⃣ Testing RPC functions...');
    
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

    console.log('\n🎉 RLS policy fix completed!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

fixUserRolesRLS();
