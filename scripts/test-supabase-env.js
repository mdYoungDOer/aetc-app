require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testing Supabase Environment Variables...\n');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Environment Variables:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');

if (supabaseUrl) {
  console.log('URL Value:', supabaseUrl);
}

if (supabaseAnonKey) {
  console.log('Key Value (first 20 chars):', supabaseAnonKey.substring(0, 20) + '...');
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ Missing environment variables!');
  console.log('Make sure your .env.local file contains:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
  process.exit(1);
}

console.log('\n✅ Environment variables are properly set!');

// Test creating a Supabase client
try {
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase client created successfully');
  
  // Test a simple query
  supabase.from('user_roles').select('count').then(({ data, error }) => {
    if (error) {
      console.log('⚠️  Database query failed (this might be expected):', error.message);
    } else {
      console.log('✅ Database connection successful');
    }
  }).catch(err => {
    console.log('⚠️  Database test failed:', err.message);
  });
  
} catch (error) {
  console.log('❌ Failed to create Supabase client:', error.message);
}
