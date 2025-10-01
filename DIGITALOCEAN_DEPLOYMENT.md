# DigitalOcean App Platform Deployment Guide

## 🚀 Deploy AETC 2026 to DigitalOcean App Platform

### Prerequisites
- DigitalOcean account
- GitHub repository: `mdYoungDOer/aetc-app`
- Supabase project configured
- Environment variables ready

---

## 📋 Step-by-Step Deployment

### 1. **Prepare Repository**
✅ Repository is ready at: https://github.com/mdYoungDOer/aetc-app  
✅ All code is committed and pushed  
✅ Configuration files are in place  

### 2. **Create DigitalOcean App**

1. **Login to DigitalOcean**
   - Go to [DigitalOcean Console](https://cloud.digitalocean.com)
   - Navigate to **Apps** in the sidebar

2. **Create New App**
   - Click **"Create App"**
   - Choose **"GitHub"** as source
   - Connect your GitHub account
   - Select repository: `mdYoungDOer/aetc-app`
   - Select branch: `main`

3. **Configure App Settings**
   - **App Name**: `aetc-2026`
   - **Region**: Choose closest to your users (e.g., `nyc3` for US, `fra1` for Europe)
   - **Plan**: Start with **Basic** plan ($5/month)

### 3. **Configure Build Settings**

DigitalOcean will auto-detect Next.js, but verify these settings:

```yaml
Build Command: npm run build
Run Command: npm start
Source Directory: /
Output Directory: .next
```

### 4. **Set Environment Variables**

In the DigitalOcean App dashboard, go to **Settings → App-Level Environment Variables** and add:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://dkgtromwsfhdpwjixoua.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# SendGrid Configuration
SENDGRID_API_KEY=[your-sendgrid-key]
SENDGRID_FROM_EMAIL=notify@ardentwebservices.com
SENDGRID_FROM_NAME=AETC 2026

# Paystack Configuration
PAYSTACK_PUBLIC_KEY=[your-paystack-public-key]
PAYSTACK_SECRET_KEY=[your-paystack-secret-key]

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-app-name.ondigitalocean.app
NODE_ENV=production
```

### 5. **Configure Domain (Optional)**

1. **Custom Domain Setup**
   - Go to **Settings → Domains**
   - Add your custom domain (e.g., `aetconference.com`)
   - Update DNS records as instructed
   - Update `NEXT_PUBLIC_SITE_URL` to your custom domain

2. **SSL Certificate**
   - DigitalOcean automatically provides SSL certificates
   - HTTPS will be enabled automatically

### 6. **Deploy the App**

1. **Review Configuration**
   - Check all environment variables are set
   - Verify build settings
   - Confirm region selection

2. **Deploy**
   - Click **"Create Resources"**
   - Wait for build to complete (5-10 minutes)
   - Monitor build logs for any errors

---

## 🔧 Post-Deployment Configuration

### 1. **Update Supabase Settings**

In your Supabase dashboard:

1. **Go to Settings → API**
2. **Update Site URL**:
   - Add your DigitalOcean app URL
   - Add your custom domain (if using one)

3. **Update Redirect URLs**:
   - Add: `https://your-app-name.ondigitalocean.app/auth/callback`
   - Add: `https://your-app-name.ondigitalocean.app/payment/callback`

### 2. **Update Paystack Webhook**

In Paystack dashboard:

1. **Go to Settings → Webhooks**
2. **Update Webhook URL**:
   - Change to: `https://your-app-name.ondigitalocean.app/api/paystack/webhook`
3. **Test the webhook** to ensure it's working

### 3. **Update SendGrid Settings**

1. **Verify Sender Identity**:
   - Ensure `notify@ardentwebservices.com` is verified
2. **Test Email Sending**:
   - Send a test email to verify configuration

---

## 🧪 Testing Your Deployment

### 1. **Basic Functionality Test**
```bash
✅ Visit your app URL
✅ Check all pages load
✅ Test navigation
✅ Verify mobile responsiveness
```

### 2. **Critical Flow Tests**
```bash
✅ Registration page loads tickets
✅ Purchase flow works
✅ Paystack integration
✅ Email delivery
✅ Admin dashboard access
```

### 3. **Performance Test**
```bash
✅ Page load speeds
✅ Image optimization
✅ Mobile performance
✅ SEO metadata
```

---

## 📊 Monitoring & Maintenance

### 1. **DigitalOcean Monitoring**
- **Metrics**: CPU, Memory, Disk usage
- **Logs**: Application and build logs
- **Alerts**: Set up notifications for issues

### 2. **Application Monitoring**
- **Supabase**: Monitor database usage
- **SendGrid**: Check email delivery rates
- **Paystack**: Monitor payment success rates

### 3. **Regular Maintenance**
- **Updates**: Keep dependencies updated
- **Backups**: Regular database backups
- **Security**: Monitor for vulnerabilities

---

## 💰 Cost Optimization

### **DigitalOcean App Platform Pricing**
- **Basic Plan**: $5/month (1 vCPU, 512MB RAM)
- **Professional Plan**: $12/month (1 vCPU, 1GB RAM)
- **Pro Max Plan**: $24/month (2 vCPU, 2GB RAM)

### **Recommended Starting Plan**
- **Basic Plan** ($5/month) is sufficient for:
  - Up to 1,000 concurrent users
  - 100GB bandwidth
  - 1GB storage

### **Scaling Considerations**
- Monitor usage in DigitalOcean dashboard
- Upgrade plan if you hit limits
- Consider CDN for global performance

---

## 🔐 Security Best Practices

### 1. **Environment Variables**
- ✅ Never commit secrets to Git
- ✅ Use DigitalOcean's secure env var storage
- ✅ Rotate keys regularly

### 2. **Database Security**
- ✅ Supabase RLS policies active
- ✅ Regular security updates
- ✅ Monitor access logs

### 3. **Application Security**
- ✅ HTTPS enforced
- ✅ Secure headers
- ✅ Input validation

---

## 🚨 Troubleshooting

### **Common Issues**

1. **Build Fails**
   - Check build logs in DigitalOcean dashboard
   - Verify all dependencies in package.json
   - Ensure Node.js version compatibility

2. **Environment Variables Not Working**
   - Verify variables are set in DigitalOcean dashboard
   - Check variable names match exactly
   - Restart the app after adding variables

3. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check Supabase project status
   - Test connection in Supabase dashboard

4. **Payment Issues**
   - Verify Paystack keys are correct
   - Check webhook URL is updated
   - Test with Paystack test mode first

### **Getting Help**
- **DigitalOcean Support**: Available in dashboard
- **Supabase Support**: Community and paid support
- **Application Logs**: Check in DigitalOcean dashboard

---

## 🎯 Success Checklist

### **Pre-Deployment**
- [ ] Repository is ready
- [ ] Environment variables documented
- [ ] Supabase database configured
- [ ] Paystack account ready
- [ ] SendGrid account configured

### **Deployment**
- [ ] DigitalOcean app created
- [ ] Environment variables set
- [ ] Build successful
- [ ] App is running
- [ ] Custom domain configured (optional)

### **Post-Deployment**
- [ ] Supabase settings updated
- [ ] Paystack webhook updated
- [ ] SendGrid verified
- [ ] All features tested
- [ ] Performance optimized
- [ ] Monitoring set up

---

## 🎉 Go Live!

Once everything is configured and tested:

1. **Update DNS** (if using custom domain)
2. **Test complete user journey**
3. **Monitor for 24 hours**
4. **Announce launch!**

Your AETC 2026 conference platform will be live and ready to handle registrations! 🚀

---

**Deployment URL**: `https://your-app-name.ondigitalocean.app`  
**Status**: Ready for DigitalOcean App Platform deployment  
**Estimated Setup Time**: 30-45 minutes  
**Monthly Cost**: $5+ (depending on plan)
