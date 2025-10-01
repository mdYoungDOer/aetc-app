# 🚀 DigitalOcean Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. **Repository Ready**
- [ ] All code committed to GitHub
- [ ] Repository: `mdYoungDOer/aetc-app`
- [ ] Branch: `main`
- [ ] No sensitive data in code

### 2. **Environment Variables Prepared**
```env
NEXT_PUBLIC_SUPABASE_URL=https://dkgtromwsfhdpwjixoua.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
SENDGRID_API_KEY=[your-sendgrid-key]
SENDGRID_FROM_EMAIL=notify@ardentwebservices.com
SENDGRID_FROM_NAME=AETC 2026
PAYSTACK_PUBLIC_KEY=[your-paystack-public-key]
PAYSTACK_SECRET_KEY=[your-paystack-secret-key]
NEXT_PUBLIC_SITE_URL=https://your-app-name.ondigitalocean.app
NODE_ENV=production
```

### 3. **Database Ready**
- [ ] Supabase schema deployed
- [ ] Sample data inserted
- [ ] RLS policies active
- [ ] Admin user created

### 4. **External Services Configured**
- [ ] Supabase project active
- [ ] SendGrid account verified
- [ ] Paystack account ready
- [ ] Domain registered (optional)

---

## 🚀 DigitalOcean Deployment Steps

### Step 1: Create DigitalOcean Account
- [ ] Sign up at [DigitalOcean](https://cloud.digitalocean.com)
- [ ] Verify email address
- [ ] Add payment method

### Step 2: Create App
- [ ] Go to Apps section
- [ ] Click "Create App"
- [ ] Connect GitHub account
- [ ] Select repository: `mdYoungDOer/aetc-app`
- [ ] Select branch: `main`

### Step 3: Configure App Settings
- [ ] **App Name**: `aetc-2026`
- [ ] **Region**: Choose closest to users
- [ ] **Plan**: Basic ($5/month) to start
- [ ] **Build Command**: `npm run build`
- [ ] **Run Command**: `npm start`

### Step 4: Set Environment Variables
- [ ] Go to Settings → Environment Variables
- [ ] Add all 10 environment variables
- [ ] Verify no typos in variable names
- [ ] Save all variables

### Step 5: Deploy
- [ ] Review all settings
- [ ] Click "Create Resources"
- [ ] Monitor build logs
- [ ] Wait for deployment (5-10 minutes)

---

## 🔧 Post-Deployment Configuration

### 1. **Update Supabase Settings**
- [ ] Go to Supabase Dashboard → Settings → API
- [ ] Update Site URL to DigitalOcean app URL
- [ ] Add redirect URLs:
  - `https://your-app-name.ondigitalocean.app/auth/callback`
  - `https://your-app-name.ondigitalocean.app/payment/callback`

### 2. **Update Paystack Webhook**
- [ ] Go to Paystack Dashboard → Settings → Webhooks
- [ ] Update webhook URL to: `https://your-app-name.ondigitalocean.app/api/paystack/webhook`
- [ ] Test webhook functionality

### 3. **Update SendGrid Settings**
- [ ] Verify sender email: `notify@ardentwebservices.com`
- [ ] Test email sending
- [ ] Check delivery rates

---

## 🧪 Testing Checklist

### Basic Functionality
- [ ] App loads at DigitalOcean URL
- [ ] All pages accessible
- [ ] Navigation works
- [ ] Mobile responsive

### Critical Features
- [ ] Registration page shows tickets
- [ ] Purchase flow works
- [ ] Paystack integration
- [ ] Email delivery
- [ ] Admin dashboard access

### Performance
- [ ] Page load times < 3 seconds
- [ ] Images optimized
- [ ] Mobile performance good
- [ ] SEO metadata present

---

## 🔐 Security Checklist

### Environment Variables
- [ ] No secrets in code
- [ ] All variables set in DigitalOcean
- [ ] Keys are production-ready

### Database Security
- [ ] RLS policies active
- [ ] Admin access restricted
- [ ] User data protected

### Application Security
- [ ] HTTPS enabled
- [ ] Secure headers
- [ ] Input validation working

---

## 📊 Monitoring Setup

### DigitalOcean Monitoring
- [ ] CPU usage monitoring
- [ ] Memory usage tracking
- [ ] Disk space monitoring
- [ ] Log monitoring

### Application Monitoring
- [ ] Supabase usage tracking
- [ ] SendGrid delivery rates
- [ ] Paystack success rates
- [ ] Error logging

---

## 💰 Cost Management

### DigitalOcean Costs
- [ ] Basic plan: $5/month
- [ ] Monitor usage
- [ ] Upgrade if needed

### External Service Costs
- [ ] Supabase: Free tier (500MB)
- [ ] SendGrid: Free tier (100 emails/day)
- [ ] Paystack: 1.5% per transaction

---

## 🎯 Go-Live Checklist

### Final Testing
- [ ] Complete user journey test
- [ ] Payment flow test
- [ ] Email delivery test
- [ ] Admin functionality test

### Launch Preparation
- [ ] Domain configured (if using custom)
- [ ] SSL certificate active
- [ ] Monitoring alerts set
- [ ] Backup procedures ready

### Post-Launch
- [ ] Monitor for 24 hours
- [ ] Check error logs
- [ ] Verify all features
- [ ] Announce launch!

---

## 🆘 Troubleshooting

### Common Issues
1. **Build Fails**
   - Check build logs
   - Verify dependencies
   - Check Node.js version

2. **Environment Variables Not Working**
   - Verify variable names
   - Check for typos
   - Restart app after changes

3. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check RLS policies
   - Test connection

4. **Payment Issues**
   - Verify Paystack keys
   - Check webhook URL
   - Test with test mode

### Getting Help
- **DigitalOcean Support**: Available in dashboard
- **Documentation**: Check deployment guide
- **Logs**: Monitor in DigitalOcean dashboard

---

## 🎉 Success Metrics

### Technical Metrics
- [ ] App loads successfully
- [ ] All features working
- [ ] Performance optimized
- [ ] Security implemented

### Business Metrics
- [ ] Ticket sales functional
- [ ] Email delivery working
- [ ] Admin panel accessible
- [ ] User registration working

---

**Deployment Status**: Ready for DigitalOcean App Platform  
**Estimated Time**: 30-45 minutes  
**Monthly Cost**: $5+ (Basic plan)  
**Next Step**: Follow the deployment guide! 🚀
