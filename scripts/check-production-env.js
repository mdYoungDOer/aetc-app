// Check production environment variables
console.log('🔍 Checking Production Environment Variables...\n');

// Check if we're in production
const isProduction = process.env.NODE_ENV === 'production';
console.log(`Environment: ${isProduction ? 'Production' : 'Development'}\n`);

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SENDGRID_API_KEY',
  'PAYSTACK_PUBLIC_KEY', // Note: This is the correct name in DO
  'PAYSTACK_SECRET_KEY',
  'NEXT_PUBLIC_SITE_URL'
];

const optionalVars = [
  'SENDGRID_FROM_EMAIL',
  'SENDGRID_FROM_NAME',
  'NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET',
  'NEXTAUTH_URL',
  'NEXT_PUBLIC_APP_ENV'
];

console.log('📋 Required Environment Variables:');
let allRequiredSet = true;
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: Missing`);
    allRequiredSet = false;
  }
});

console.log('\n📋 Optional Environment Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value}`);
  } else {
    console.log(`⚠️  ${varName}: Not set`);
  }
});

// Check for potential issues
console.log('\n🔍 Potential Issues:');
if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY && !process.env.PAYSTACK_PUBLIC_KEY) {
  console.log('❌ No Paystack public key found (neither NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY nor PAYSTACK_PUBLIC_KEY)');
} else if (process.env.PAYSTACK_PUBLIC_KEY && !process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
  console.log('⚠️  Using PAYSTACK_PUBLIC_KEY (should work with updated code)');
}

if (!allRequiredSet) {
  console.log('\n❌ Missing required environment variables');
  process.exit(1);
} else {
  console.log('\n✅ All required environment variables are set!');
  console.log('\n🚀 Your DigitalOcean configuration looks correct!');
}
