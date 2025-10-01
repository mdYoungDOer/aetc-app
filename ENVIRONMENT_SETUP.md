# Environment Variables Setup

## Required Environment Variables

The application requires the following environment variables to be set in your deployment platform:

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### SendGrid Configuration
```
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@aetconference.com
```

### Paystack Configuration
```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

### Site Configuration
```
NEXT_PUBLIC_SITE_URL=https://aetc.africa
```

## DigitalOcean App Platform Setup

1. Go to your DigitalOcean App Platform dashboard
2. Select your app
3. Go to Settings > App-Level Environment Variables
4. Add each environment variable listed above
5. Make sure to use the exact variable names (case-sensitive)

## Vercel Setup

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each environment variable listed above
5. Make sure to use the exact variable names (case-sensitive)

## Local Development

Create a `.env.local` file in your project root with the above variables for local development.

## Troubleshooting

If you see "supabaseKey is required" error:
1. Check that all environment variables are set correctly
2. Verify the variable names match exactly (case-sensitive)
3. Restart your deployment after adding environment variables
4. Check the deployment logs for any configuration errors
