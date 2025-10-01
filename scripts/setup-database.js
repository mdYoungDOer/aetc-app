const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🔧 Setting up Supabase Database...\n');

  try {
    // Read the SQL file
    const sqlContent = fs.readFileSync('scripts/setup-supabase-database.sql', 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements to execute...\n`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`Executing statement ${i + 1}/${statements.length}...`);
        
        try {
          const { data, error } = await supabase.rpc('exec_sql', {
            sql: statement
          });

          if (error) {
            console.log(`⚠️  Statement ${i + 1} result:`, error.message);
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`);
          }
        } catch (err) {
          console.log(`⚠️  Statement ${i + 1} error:`, err.message);
        }
      }
    }

    // Alternative: Direct table creation
    console.log('\n🔧 Creating user_roles table directly...');
    
    const { data: createTable, error: createError } = await supabase
      .from('user_roles')
      .select('*')
      .limit(1);

    if (createError && createError.message.includes('Could not find the table')) {
      console.log('📝 Table does not exist. You need to run the SQL manually in Supabase dashboard.');
      console.log('\n📋 Manual Setup Instructions:');
      console.log('1. Go to your Supabase dashboard');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Copy and paste the contents of scripts/setup-supabase-database.sql');
      console.log('4. Run the SQL script');
      console.log('5. Test the setup again');
    } else {
      console.log('✅ Table exists or was created successfully');
    }

    // Test the setup
    console.log('\n🧪 Testing the setup...');
    const { data: testRoles, error: testError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', '2df40b25-6fe1-4c1f-b327-1c1602a65698');

    if (testError) {
      console.log('❌ Test failed:', testError.message);
      console.log('📝 You need to run the SQL script manually in Supabase dashboard');
    } else {
      console.log('✅ Test successful:', testRoles);
    }

  } catch (error) {
    console.error('❌ Setup error:', error.message);
  }
}

// Run the setup
setupDatabase().then(() => {
  console.log('\n🏁 Database setup completed');
  console.log('\n📋 Next steps:');
  console.log('1. If the automatic setup failed, run the SQL manually in Supabase dashboard');
  console.log('2. Test the admin access again');
  console.log('3. Try logging in at https://aetc.africa/auth/login');
});
