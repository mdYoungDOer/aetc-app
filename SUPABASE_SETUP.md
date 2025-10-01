# Supabase Database Setup Guide

## 🚨 Error Resolution

You encountered this error because the RLS policies already exist from the previous schema run. Here are your options:

## Option 1: Safe Update (Recommended)
Use the `schema-update.sql` file to safely update existing policies:

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `supabase/schema-update.sql`
3. Click "Run" to execute
4. This will drop and recreate all policies safely

## Option 2: Fresh Start
If you want to start completely fresh:

1. Go to Supabase Dashboard → Settings → Database
2. Scroll down to "Reset Database" (⚠️ This will delete ALL data)
3. Click "Reset Database" and confirm
4. Go to SQL Editor
5. Copy and paste the contents of `supabase/schema-fresh.sql`
6. Click "Run" to execute
7. Then run `supabase/sample-data.sql` to add initial data

## Option 3: Manual Policy Drop
If you prefer to manually fix the specific error:

```sql
-- Drop the conflicting policy
DROP POLICY IF EXISTS "Public can read published pages" ON pages;

-- Recreate it
CREATE POLICY "Public can read published pages" ON pages
  FOR SELECT USING (status = 'published');
```

## 📋 Complete Setup Checklist

### 1. Database Schema ✅
- [ ] Run `schema-update.sql` OR `schema-fresh.sql`
- [ ] Verify all tables are created
- [ ] Check RLS policies are active

### 2. Sample Data ✅
- [ ] Run `sample-data.sql`
- [ ] Verify tickets are created
- [ ] Check speakers are added
- [ ] Confirm sample pages exist

### 3. Authentication Setup ✅
- [ ] Go to Authentication → Users
- [ ] Create admin user: `admin@aetconference.com`
- [ ] Set a secure password
- [ ] Note the user ID for admin access

### 4. Environment Variables ✅
Ensure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://dkgtromwsfhdpwjixoua.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

### 5. Test Database Connection ✅
Run this in your app to verify:

```bash
npm run dev
```

Visit `/admin` and check if the dashboard loads without errors.

## 🔍 Verification Queries

Run these in Supabase SQL Editor to verify setup:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check tickets
SELECT * FROM tickets;

-- Check speakers
SELECT * FROM speakers WHERE featured = true;

-- Check pages
SELECT slug, title, status FROM pages;

-- Check RLS policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

## 🚨 Common Issues & Solutions

### Issue: "Policy already exists"
**Solution**: Use `schema-update.sql` which drops policies first

### Issue: "Table doesn't exist"
**Solution**: Run the complete `schema-fresh.sql`

### Issue: "Permission denied"
**Solution**: Check RLS policies are correctly applied

### Issue: "Foreign key constraint"
**Solution**: Ensure tables are created in the correct order

## 📊 Expected Results

After successful setup, you should have:

- ✅ 11 tables created
- ✅ 24 RLS policies active
- ✅ 4 sample tickets
- ✅ 8 sample speakers
- ✅ 2 sample pages
- ✅ 1 sample form
- ✅ All indexes created
- ✅ Triggers for updated_at

## 🎯 Next Steps

1. **Test the app**: `npm run dev`
2. **Visit admin**: Go to `/admin` (login required)
3. **Check tickets**: Visit `/registration`
4. **Test purchase**: Try the full flow
5. **Verify emails**: Check SendGrid integration

## 📞 Support

If you encounter any issues:

1. Check the Supabase logs in the Dashboard
2. Verify environment variables are correct
3. Ensure RLS policies are active
4. Test with the verification queries above

---

**Status**: Ready for production deployment! 🚀

