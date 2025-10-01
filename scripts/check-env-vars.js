// Check environment variables for deployment
require('dotenv').config({ path: '.env.local' });
console.log('🔍 Checking Environment Variables...\n');

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SENDGRID_API_KEY',
  'PAYSTACK_PUBLIC_KEY', // Note: This should be NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in production
  'PAYSTACK_SECRET_KEY',
  'NEXT_PUBLIC_SITE_URL'
];

const optionalVars = [
  'SENDGRID_FROM_EMAIL'
];

console.log('📋 Required Environment Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: Missing`);
  }
});

console.log('\n📋 Optional Environment Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value}`);
  } else {
    console.log(`⚠️  ${varName}: Not set (using default)`);
  }
});

// Check for missing required variables
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log('\n❌ Missing required environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n📝 Please set these variables in your deployment platform:');
  console.log('   - DigitalOcean: Settings > App-Level Environment Variables');
  console.log('   - Vercel: Settings > Environment Variables');
  console.log('   - Netlify: Site Settings > Environment Variables');
  process.exit(1);
} else {
  console.log('\n✅ All required environment variables are set!');
}
