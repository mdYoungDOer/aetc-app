#!/usr/bin/env node

/**
 * Environment Variables Check Script
 * This script checks if all required environment variables are properly set
 */

console.log('🔍 Checking Environment Variables...\n');

// Required environment variables
const requiredVars = {
  'NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY': {
    description: 'Paystack Public Key (Client-side)',
    pattern: /^pk_(test|live)_/,
    critical: true
  },
  'PAYSTACK_SECRET_KEY': {
    description: 'Paystack Secret Key (Server-side)',
    pattern: /^sk_(test|live)_/,
    critical: true
  },
  'NEXT_PUBLIC_SUPABASE_URL': {
    description: 'Supabase Project URL',
    pattern: /^https:\/\/.*\.supabase\.co$/,
    critical: true
  },
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': {
    description: 'Supabase Anonymous Key',
    pattern: /^eyJ/,
    critical: true
  },
  'SUPABASE_SERVICE_ROLE_KEY': {
    description: 'Supabase Service Role Key',
    pattern: /^eyJ/,
    critical: true
  }
};

// Optional environment variables
const optionalVars = {
  'SENDGRID_API_KEY': {
    description: 'SendGrid API Key',
    pattern: /^SG\./
  },
  'SENDGRID_FROM_EMAIL': {
    description: 'SendGrid From Email',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  'NEXT_PUBLIC_APP_URL': {
    description: 'App URL',
    pattern: /^https?:\/\//
  }
};

let hasErrors = false;

console.log('📋 Required Environment Variables:');
console.log('=' .repeat(50));

Object.entries(requiredVars).forEach(([varName, config]) => {
  const value = process.env[varName];
  const exists = !!value;
  const matchesPattern = exists && config.pattern.test(value);
  
  if (!exists) {
    console.log(`❌ ${varName}: NOT SET`);
    console.log(`   Description: ${config.description}`);
    console.log(`   Status: ${config.critical ? 'CRITICAL' : 'Optional'}`);
    hasErrors = true;
  } else if (!matchesPattern) {
    console.log(`⚠️  ${varName}: INVALID FORMAT`);
    console.log(`   Value: ${value.substring(0, 20)}...`);
    console.log(`   Description: ${config.description}`);
    console.log(`   Status: ${config.critical ? 'CRITICAL' : 'Optional'}`);
    hasErrors = true;
  } else {
    console.log(`✅ ${varName}: OK`);
    console.log(`   Value: ${value.substring(0, 20)}...`);
    console.log(`   Description: ${config.description}`);
  }
  console.log('');
});

console.log('📋 Optional Environment Variables:');
console.log('=' .repeat(50));

Object.entries(optionalVars).forEach(([varName, config]) => {
  const value = process.env[varName];
  const exists = !!value;
  const matchesPattern = exists && config.pattern.test(value);
  
  if (!exists) {
    console.log(`⚠️  ${varName}: NOT SET`);
    console.log(`   Description: ${config.description}`);
  } else if (!matchesPattern) {
    console.log(`⚠️  ${varName}: INVALID FORMAT`);
    console.log(`   Value: ${value.substring(0, 20)}...`);
    console.log(`   Description: ${config.description}`);
  } else {
    console.log(`✅ ${varName}: OK`);
    console.log(`   Value: ${value.substring(0, 20)}...`);
    console.log(`   Description: ${config.description}`);
  }
  console.log('');
});

console.log('🔧 Paystack Configuration:');
console.log('=' .repeat(50));

const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
if (paystackPublicKey) {
  if (paystackPublicKey.startsWith('pk_test_')) {
    console.log('✅ Paystack Mode: TEST');
    console.log('   This is correct for development and testing');
  } else if (paystackPublicKey.startsWith('pk_live_')) {
    console.log('✅ Paystack Mode: LIVE');
    console.log('   This is for production use');
  } else {
    console.log('❌ Paystack Mode: INVALID');
    console.log('   Key should start with pk_test_ or pk_live_');
    hasErrors = true;
  }
} else {
  console.log('❌ Paystack Mode: NOT CONFIGURED');
  hasErrors = true;
}

console.log('\n🌐 DigitalOcean App Platform Setup:');
console.log('=' .repeat(50));
console.log('1. Go to your DigitalOcean App Platform dashboard');
console.log('2. Select your AETC app');
console.log('3. Go to Settings → Environment Variables');
console.log('4. Add the missing variables listed above');
console.log('5. Redeploy your app');

if (hasErrors) {
  console.log('\n❌ CRITICAL ISSUES FOUND');
  console.log('Please fix the issues above before deploying.');
  process.exit(1);
} else {
  console.log('\n✅ ALL CRITICAL ENVIRONMENT VARIABLES ARE SET');
  console.log('Your app should work correctly.');
}