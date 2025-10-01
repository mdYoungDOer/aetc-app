# AETC 2026 - Deployment Guide

## 🚀 Pre-Deployment Checklist

### ✅ 1. Environment Setup

Ensure all environment variables are configured:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://dkgtromwsfhdpwjixoua.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-key]
SUPABASE_SERVICE_ROLE_KEY=[your-key]

# SendGrid
SENDGRID_FROM_EMAIL=notify@ardentwebservices.com
SENDGRID_API_KEY=[your-key]
SENDGRID_FROM_NAME=AETC 2026

# Paystack
PAYSTACK_PUBLIC_KEY=[your-key]
PAYSTACK_SECRET_KEY=[your-key]

# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### ✅ 2. Database Setup

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Execute to create all tables
4. Verify tables are created with RLS policies

### ✅ 3. Seed Initial Data

**Create Sample Tickets:**
```sql
INSERT INTO tickets (name, type, price, stock, available, description, features, active)
VALUES 
  ('Early Bird', 'earlybird', 2500, 100, 100, 'Save 30% - Limited time', 
   '["Full conference access (3 days)", "All sessions", "Networking events", "Conference materials", "Lunch & refreshments"]'::jsonb, true),
  ('Standard', 'standard', 3500, 200, 200, 'Regular conference pass', 
   '["Full conference access (3 days)", "All sessions", "Networking events", "Conference materials", "Lunch & refreshments"]'::jsonb, true),
  ('Student', 'student', 1500, 50, 50, 'Valid student ID required', 
   '["Full conference access (3 days)", "All sessions", "Conference materials", "Lunch"]'::jsonb, true),
  ('VIP', 'vip', 5000, 30, 30, 'Premium experience', 
   '["Full conference access (3 days)", "VIP seating", "Exclusive dinner", "Meet speakers", "Premium materials", "VIP lounge access"]'::jsonb, true);
```

**Create Admin User:**
```sql
-- Do this in Supabase Dashboard → Authentication → Users → Add User
-- Email: admin@aetconference.com
-- Password: [secure-password]
```

### ✅ 4. Paystack Configuration

1. Login to Paystack Dashboard
2. Go to Settings → API Keys & Webhooks
3. Copy public and secret keys
4. Add webhook URL: `https://yourdomain.com/api/paystack/webhook`
5. Test with test keys first

### ✅ 5. SendGrid Configuration

1. Login to SendGrid
2. Create API key with "Full Access"
3. Verify sender email address
4. Test email sending

---

## 🌐 Vercel Deployment

### Step 1: Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "Add New Project"
3. Import `mdYoungDOer/aetc-app`
4. Configure project

### Step 2: Environment Variables

Add all environment variables in Vercel dashboard:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- SENDGRID_FROM_EMAIL
- SENDGRID_API_KEY
- SENDGRID_FROM_NAME
- PAYSTACK_PUBLIC_KEY
- PAYSTACK_SECRET_KEY
- NEXT_PUBLIC_SITE_URL (use Vercel domain)

### Step 3: Build Settings

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Step 4: Deploy

Click "Deploy" and wait for build to complete.

### Step 5: Post-Deployment

1. **Update Paystack Webhook:**
   - Change webhook URL to production domain
   - Use production keys

2. **Update Supabase:**
   - Add production URL to allowed URLs
   - Update redirect URLs

3. **Test Critical Flows:**
   - Ticket purchase
   - Email delivery
   - Admin login
   - Page builder

---

## 🧪 Testing Guide

### Smoke Test (End-to-End)

#### 1. Authentication Test
```bash
✅ Visit /auth/login
✅ Login with admin credentials
✅ Verify redirect to /admin
✅ Check dashboard loads
```

#### 2. Page Builder Test
```bash
✅ Go to /admin/pages
✅ Create new page "Test Page"
✅ Add Hero block
✅ Add Text block
✅ Save and publish
✅ View at /cms/test-page
✅ Verify responsive design
```

#### 3. Form Builder Test
```bash
✅ Go to /admin/forms
✅ Create "Contact Form"
✅ Add fields: name, email, message
✅ Save form
✅ Copy shortcode
✅ Embed in text block
✅ Test submission
```

#### 4. Ticket Purchase Test
```bash
✅ Go to /registration
✅ Verify tickets load
✅ Click "Buy Now"
✅ Fill purchase form
✅ Click "Proceed to Payment"
✅ Complete Paystack checkout (use test card)
✅ Verify redirect to /payment/callback
✅ Check success message
✅ Verify email received
✅ Go to /dashboard
✅ See purchased ticket
✅ View QR code
✅ Download PDF
```

#### 5. Admin Management Test
```bash
✅ /admin - View analytics charts
✅ /admin/tickets - Create/edit tickets
✅ /admin/tickets - Export orders CSV
✅ /admin/forms - View form submissions
✅ /admin/pages - Manage pages
```

---

## 📊 Performance Optimizations

### Implemented

✅ **Image Optimization**: Next.js Image component with lazy loading  
✅ **Code Splitting**: Dynamic imports for admin components  
✅ **Static Generation**: All public pages pre-rendered  
✅ **Font Optimization**: Google Fonts with display=swap  
✅ **Bundle Size**: Optimized imports from MUI and Lucide  

### Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    ~3 kB           ~175 kB
├ ○ /about                               ~2 kB           ~159 kB
├ ƒ /admin/*                             Dynamic
├ ○ /registration                        ~34 kB          ~275 kB
└ ○ Other pages                          Optimized
```

---

## 🎨 Design System Audit

### Color Palette (Strictly Enforced)
- ✅ Primary: `#293972`
- ✅ Secondary: `#FBA91E`
- ✅ Success: `#78C044`
- ✅ Error: `#EB4824`
- ✅ Background Light: `#FFFFFF`
- ✅ Background Dark: `#151443`
- ✅ Paper Dark: `#181C2C`

### Typography
- ✅ Headings: Plus Jakarta Sans
- ✅ Body: Inter
- ✅ All components use theme fonts

### Components Audit
- ✅ CustomButton: Gradient hover effects
- ✅ CustomCard: Rounded 8px, subtle shadows
- ✅ Modals: Framer Motion slide animations
- ✅ No generic MUI defaults - all customized
- ✅ Mobile-first responsive design

---

## 📱 Mobile Optimization

✅ **Responsive Navigation**: Hamburger menu with drawer  
✅ **Touch Targets**: Minimum 44x44px  
✅ **Swipeable Tabs**: Dashboard uses MUI tabs  
✅ **Forms**: Full-width inputs on mobile  
✅ **Tables**: Horizontal scroll when needed  
✅ **Images**: Optimized sizes per breakpoint  

---

## 🔐 Security Checklist

✅ **Environment Variables**: Not committed to Git  
✅ **API Routes**: Server-side only  
✅ **Webhook Verification**: Paystack signature check  
✅ **RLS Policies**: Database-level security  
✅ **Input Validation**: Zod schemas on forms  
✅ **XSS Protection**: DOMPurify for user HTML (if needed)  
✅ **CSRF Protection**: Next.js built-in  
✅ **Auth Middleware**: Protected /admin and /dashboard routes  

---

## 📈 Monitoring & Analytics

### Vercel Analytics (Free Tier)
- Enable in Vercel dashboard
- Track page views, performance

### Supabase Metrics
- Monitor API usage
- Check database performance
- Review auth logs

### Custom Analytics
- Admin dashboard shows:
  - Ticket sales by type (Recharts)
  - Form submissions over time
  - Revenue tracking

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Supabase Connection Issues
```bash
# Verify env vars
echo $NEXT_PUBLIC_SUPABASE_URL
# Check Supabase dashboard status
# Verify RLS policies are enabled
```

### Payment Not Processing
```bash
# Check Paystack webhook is configured
# Verify secret key in env
# Check webhook logs in Paystack dashboard
# Review Next.js API route logs
```

### Emails Not Sending
```bash
# Verify SendGrid API key
# Check sender verification in SendGrid
# Review SendGrid activity logs
# Check spam folder
```

---

## 🎯 Go-Live Checklist

### Pre-Launch

- [ ] Run `npm run build` successfully
- [ ] All tests passing
- [ ] Environment variables set in Vercel
- [ ] Supabase schema executed
- [ ] Admin user created
- [ ] Sample tickets created
- [ ] Paystack webhook configured
- [ ] SendGrid sender verified
- [ ] Domain configured in Vercel
- [ ] SSL certificate active

### Post-Launch

- [ ] Test ticket purchase with real card
- [ ] Verify email delivery
- [ ] Check admin dashboard
- [ ] Monitor Vercel logs
- [ ] Test mobile on real devices
- [ ] Submit sitemap to Google Search Console
- [ ] Set up uptime monitoring

### Ongoing

- [ ] Monitor ticket sales daily
- [ ] Review form submissions
- [ ] Update content via CMS
- [ ] Send email reminders to attendees
- [ ] Backup database weekly

---

## 📞 Support Contacts

- **Technical Issues**: development@aetconference.com
- **Payment Issues**: registration@aetconference.com
- **Content Updates**: admin@aetconference.com

---

## 🎉 Launch Day Preparation

**T-1 Week:**
- Test all critical paths
- Prepare support documentation
- Brief customer service team
- Set up monitoring alerts

**T-1 Day:**
- Final smoke test
- Check email templates
- Verify payment gateway
- Backup database

**Launch Day:**
- Monitor dashboard
- Watch for errors
- Respond to support tickets
- Track first purchases

---

**Last Updated**: October 1, 2025  
**Version**: 1.0.0  
**Status**: Production Ready 🚀

