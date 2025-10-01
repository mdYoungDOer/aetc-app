# AETC 2026 CMS System

## Overview

A custom Content Management System built specifically for the Africa Energy Technology Conference 2026 website. Built with Next.js 14, Supabase, and a custom drag-and-drop page builder.

## Features

### ✅ Page Management
- Create, edit, and delete pages
- Drag-and-drop page builder
- Real-time preview
- Version history (revisions)
- Status management (draft, published, archived)
- SEO metadata (title, description, keywords)

### ✅ Content Blocks
- **Hero Section**: Title, subtitle, CTA button, background image
- **Text Block**: Rich text content with alignment options
- **Image Block**: Images with captions
- **Grid Layout**: Multi-column layouts (coming soon)
- **Form Embed**: Embedded forms via shortcode (coming soon)

### ✅ Admin Dashboard
- Protected by Supabase authentication
- Clean sidebar navigation
- Pages, Forms, Tickets, Users management
- Statistics overview

### ✅ Database Schema (Supabase)

**Tables:**
- `pages` - Page content and metadata
- `sections` - Page sections for granular control
- `blocks` - Reusable content blocks
- `revisions` - Version history
- `forms` - Form definitions
- `form_submissions` - Form responses
- `speakers` - Speaker information

## Setup Instructions

### 1. Database Setup

Run the SQL schema in your Supabase project:

```bash
# Execute supabase/schema.sql in your Supabase SQL editor
```

This will create all necessary tables with Row Level Security (RLS) policies.

### 2. Environment Variables

Ensure your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Create Admin User

In Supabase Dashboard:
1. Go to Authentication > Users
2. Click "Add user"
3. Create user with email/password
4. This user can now access `/admin`

## Usage Guide

### Accessing the Admin Panel

1. Navigate to `/auth/login`
2. Sign in with your Supabase credentials
3. You'll be redirected to `/admin`

### Creating a New Page

1. Go to **Admin > Pages**
2. Click "New Page"
3. Enter page title and slug
4. Click "Create Page"
5. You'll be taken to the page editor

### Using the Page Builder

**Adding Blocks:**
1. Click "Add Block" button
2. Select block type from sidebar
3. Configure block settings
4. Click edit icon to modify content

**Reordering Blocks:**
- Use up/down arrows to move blocks
- Blocks are rendered in order on the frontend

**Editing Blocks:**
- Click edit icon to open editor
- Make changes in the form fields
- Changes are auto-saved to state

**Deleting Blocks:**
- Click trash icon to remove a block
- Confirm deletion

**Preview Mode:**
- Click "Preview" to see how content will look
- Toggle back to "Edit" to continue editing

### Publishing a Page

1. Click "Save Draft" to save changes
2. Click "Publish" to make page live
3. Published pages are accessible at `/cms/[slug]`
4. Example: Page with slug "sample-page" → `/cms/sample-page`

### Frontend Rendering

CMS pages are rendered at `/cms/[slug]` using the `CMSPageRenderer` component which:
- Parses block data
- Renders appropriate components
- Applies responsive styling
- Maintains design system consistency

## Custom Blocks

To add a new block type:

### 1. Update Types
```typescript
// src/types/cms.ts
export interface PageBlock {
  id: string;
  type: 'hero' | 'text' | 'image' | 'grid' | 'form' | 'your-new-type';
  data: any;
}
```

### 2. Add to Page Builder
```typescript
// src/components/PageBuilder/index.tsx

// Add to blockTypes array
{ value: 'your-new-type', label: 'Your New Block', icon: '🎨' }

// Add to getDefaultData function
case 'your-new-type':
  return { /* default data structure */ };

// Add to BlockEditor component
case 'your-new-type':
  return <YourBlockEditor />;

// Add to BlockPreview component
case 'your-new-type':
  return <YourBlockPreview />;
```

### 3. Add Frontend Renderer
```typescript
// src/components/CMSPageRenderer.tsx

case 'your-new-type':
  return <YourRenderedBlock block={block} />;
```

## Design Guidelines

### Colors (Strictly Enforced)
- Primary: `#293972`
- Secondary: `#FBA91E`
- Success: `#78C044`
- Error: `#EB4824`
- Background (Light): `#FFFFFF`
- Background (Dark): `#151443`
- Paper (Dark): `#181C2C`

### Typography
- Headings: Plus Jakarta Sans
- Body: Inter
- Consistent with main site design

### Responsive Design
- All blocks must be mobile-first
- Use MUI breakpoints: xs, sm, md, lg, xl
- Test on multiple screen sizes

## Version History

The CMS automatically creates revisions when you save a page. To implement revision restore:

```typescript
// Get revisions
const revisions = await getRevisionsByPageId(pageId);

// Restore a revision
await updatePage(pageId, {
  content_json: revision.content_json
});
```

## Form Builder (Coming Soon)

Forms will support:
- Field types: text, email, select, textarea, number, checkbox, radio
- Validation rules
- Conditional logic
- Email notifications
- Submission export

## Security

- **Authentication**: Supabase Auth required for `/admin`
- **RLS Policies**: Database-level security
  - Public: Can read published pages
  - Authenticated: Full CRUD on all tables
- **Content Sanitization**: Implement DOMPurify for user HTML

## Performance

- **Static Generation**: CMS pages can be pre-rendered
- **On-Demand Revalidation**: Trigger rebuild on publish
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Lazy load admin components

## Troubleshooting

### "Pages not loading"
- Check Supabase connection
- Verify RLS policies are enabled
- Check browser console for errors

### "Can't login to admin"
- Verify user exists in Supabase Auth
- Check environment variables
- Clear browser cache/cookies

### "Blocks not rendering"
- Check block data structure
- Verify block type is registered
- Check CMSPageRenderer component

## Future Enhancements

- [ ] Rich text editor (TipTap/Slate)
- [ ] Media library
- [ ] Form builder
- [ ] Multi-language support
- [ ] Advanced SEO tools
- [ ] Content scheduling
- [ ] User roles and permissions
- [ ] Activity log
- [ ] Bulk operations
- [ ] Import/export pages

## Support

For issues or questions:
- Check this README
- Review Supabase documentation
- Check Next.js documentation
- Contact development team

---

**Version**: 1.0.0  
**Last Updated**: 2025-01-01  
**Maintainer**: AETC Development Team

