# AETC 2026 - Supabase Storage Setup Guide

## Overview
This guide will help you set up Supabase Storage for optimized image and file delivery in the AETC 2026 conference platform.

## Benefits of Supabase Storage
- **Faster Loading**: CDN-optimized delivery
- **Image Optimization**: Automatic format conversion (WebP, AVIF)
- **Scalability**: Handle high traffic during conference
- **Security**: Row Level Security (RLS) policies
- **Cost Effective**: Pay only for what you use

## Setup Steps

### 1. Create Storage Buckets
Run the SQL script in your Supabase SQL Editor:

```sql
-- Run supabase/storage-setup.sql
```

This creates two buckets:
- `aetc-assets`: Public bucket for conference images and documents
- `user-uploads`: Private bucket for user-generated content

### 2. Upload Conference Images
Use the Supabase Dashboard or the upload utility:

```bash
# Navigate to Storage in Supabase Dashboard
# Upload all images from public/Images/ to aetc-assets bucket
# Organize in folders: /hero, /speakers, /venue, etc.
```

### 3. Update Image URLs
The app will automatically use optimized URLs when Supabase Storage is configured.

### 4. Environment Variables
Ensure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Storage Structure

```
aetc-assets/
├── hero/
│   ├── conference-hero.jpg
│   └── conference-hero.webp (auto-generated)
├── speakers/
│   ├── speaker-1.jpg
│   └── speaker-1.webp (auto-generated)
├── venue/
│   ├── venue-exterior.jpg
│   └── venue-exterior.webp (auto-generated)
└── documents/
    ├── conference-program.pdf
    └── sponsorship-package.pdf
```

## Image Optimization Features

### Automatic Format Conversion
- JPEG → WebP (90% smaller)
- JPEG → AVIF (95% smaller)
- Automatic quality optimization

### Responsive Images
```typescript
// Example usage
<OptimizedImage
  src="/Images/conference-hero.jpg"
  alt="Conference Hero"
  width={1200}
  height={600}
  quality={90}
  priority={true}
  sizes="100vw"
/>
```

### CDN URLs
Images are automatically served from Supabase CDN:
```
https://your-project.supabase.co/storage/v1/object/public/aetc-assets/hero/conference-hero.jpg
```

## Performance Benefits

### Before (Local Images)
- Load time: 2-3 seconds
- File size: 2-5MB per image
- No optimization

### After (Supabase Storage)
- Load time: 0.5-1 second
- File size: 200-500KB per image
- Automatic WebP/AVIF conversion
- CDN delivery

## Security Features

### Public Assets (aetc-assets)
- Anyone can view
- Authenticated users can upload/update
- Perfect for conference images

### Private Assets (user-uploads)
- Users can only access their own files
- Organized by user ID
- Perfect for user profiles, documents

## Monitoring & Analytics

### Storage Usage
Monitor in Supabase Dashboard:
- Total storage used
- Bandwidth consumption
- File count

### Performance Metrics
- Image load times
- CDN hit rates
- Error rates

## Troubleshooting

### Images Not Loading
1. Check bucket permissions
2. Verify RLS policies
3. Check file paths

### Slow Loading
1. Enable image optimization
2. Use appropriate quality settings
3. Check CDN configuration

### Upload Errors
1. Check file size limits
2. Verify MIME types
3. Check authentication

## Migration from Local Images

### Step 1: Upload Images
```bash
# Use Supabase Dashboard or API
# Upload all images from public/Images/
```

### Step 2: Update Code
The app automatically detects Supabase Storage URLs and optimizes them.

### Step 3: Test
- Verify all images load
- Check performance improvements
- Test on mobile devices

## Best Practices

### Image Sizes
- Hero images: 1200x600px
- Speaker photos: 400x400px
- Thumbnails: 200x200px

### File Formats
- Use JPEG for photos
- Use PNG for graphics with transparency
- Let Supabase auto-convert to WebP/AVIF

### Naming Convention
- Use descriptive names
- Include dimensions: `hero-1200x600.jpg`
- Use kebab-case: `speaker-john-doe.jpg`

## Cost Optimization

### Storage Limits
- Free tier: 1GB storage
- Pro tier: 100GB storage
- Additional: $0.021/GB/month

### Bandwidth Limits
- Free tier: 2GB bandwidth
- Pro tier: 100GB bandwidth
- Additional: $0.09/GB

### Tips to Reduce Costs
1. Optimize images before upload
2. Use appropriate quality settings
3. Implement lazy loading
4. Cache frequently accessed images

## Support

For issues with Supabase Storage:
1. Check Supabase documentation
2. Review RLS policies
3. Test with simple images first
4. Contact support if needed

---

**Next Steps:**
1. Run the storage setup SQL
2. Upload your conference images
3. Test the optimized loading
4. Monitor performance improvements
