# Deployment Troubleshooting Guide

## Common Issues and Solutions

### 1. "supabaseKey is required" Error

**Problem:** The application shows "supabaseKey is required" error when trying to login.

**Solution:**
1. Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in your deployment environment
2. Verify the variable names are exactly correct (case-sensitive)
3. Restart your deployment after adding environment variables
4. Check deployment logs for any configuration errors

### 2. Environment Variables Not Loading

**Problem:** Environment variables are not being loaded in the deployed application.

**Solution:**
1. **DigitalOcean App Platform:**
   - Go to Settings > App-Level Environment Variables
   - Add each variable with exact names
   - Restart the app after adding variables

2. **Vercel:**
   - Go to Settings > Environment Variables
   - Add each variable with exact names
   - Redeploy the application

3. **Netlify:**
   - Go to Site Settings > Environment Variables
   - Add each variable with exact names
   - Trigger a new deploy

### 3. Database Connection Issues

**Problem:** Cannot connect to Supabase database.

**Solution:**
1. Verify Supabase URL and keys are correct
2. Check Supabase project is active and not paused
3. Ensure database tables are created (run the SQL scripts)
4. Check RLS policies are properly configured

### 4. Authentication Issues

**Problem:** Users cannot login or get unauthorized errors.

**Solution:**
1. Run the database setup scripts in Supabase SQL Editor
2. Verify user roles are properly assigned
3. Check middleware configuration
4. Test with the diagnostic scripts

## Diagnostic Commands

### Check Environment Variables
```bash
node scripts/check-env-vars.js
```

### Check Supabase Setup
```bash
node scripts/check-supabase-auth.js
```

### Check RPC Functions
```bash
node scripts/check-rpc-functions.js
```

## Required Environment Variables

Make sure these are set in your deployment platform:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SENDGRID_API_KEY=your_sendgrid_api_key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
NEXT_PUBLIC_SITE_URL=https://aetc.africa
```

## Deployment Platform Specific

### DigitalOcean App Platform
1. Go to your app dashboard
2. Click on Settings
3. Go to App-Level Environment Variables
4. Add each variable with exact names
5. Click Save
6. Restart the app

### Vercel
1. Go to your project dashboard
2. Click on Settings
3. Go to Environment Variables
4. Add each variable with exact names
5. Click Save
6. Redeploy the application

### Netlify
1. Go to your site dashboard
2. Click on Site Settings
3. Go to Environment Variables
4. Add each variable with exact names
5. Click Save
6. Trigger a new deploy

## Still Having Issues?

1. Check the deployment logs for specific error messages
2. Verify all environment variables are set correctly
3. Ensure the database is properly configured
4. Test the application locally with the same environment variables
5. Contact support with specific error messages from the logs
