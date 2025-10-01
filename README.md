# AET Conference 2026 🎯

Official website and management system for the Africa Energy Technology Conference 2026.

## 🌟 Overview

A complete conference management platform featuring:
- 🎨 Professional public-facing website
- 📝 Custom CMS with drag-and-drop page builder
- 🎫 Full ticketing system with Paystack integration
- 📧 Automated emails via SendGrid
- 📊 Analytics dashboard with Recharts
- 👥 User accounts and dashboard
- 🔒 Secure admin panel

## 💻 Tech Stack

### Core
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Styling**: Emotion (CSS-in-JS)
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & Data
- **Authentication**: Supabase Auth with OTP
- **Database**: Supabase (PostgreSQL)
- **Forms**: React Hook Form + Zod validation
- **CMS**: Custom page builder

### Payments & Communication
- **Payments**: Paystack (Ghana Cedis)
- **Email**: SendGrid
- **QR Codes**: react-qr-code
- **PDF Generation**: jsPDF

### Analytics & SEO
- **Charts**: Recharts
- **Search**: Fuse.js
- **Sitemap**: next-sitemap
- **SEO**: Schema.org structured data

### Additional
- **Theme**: next-themes (light/dark mode)
- **Date**: date-fns
- **HTTP Client**: Native fetch

## Project Structure

```
aet-conference-2026/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── about/
│   │   ├── programme/
│   │   ├── speakers/
│   │   ├── venue/
│   │   ├── registration/
│   │   ├── sponsors/
│   │   ├── news/
│   │   ├── contact/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Providers.tsx
│   ├── lib/             # Library configurations
│   │   ├── supabase/
│   │   └── theme/
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── public/              # Static assets
├── Images/              # Conference images
└── middleware.ts        # Next.js middleware for auth
```

## Design System

### Colors

- **Primary**: `#293972` (Deep blue)
- **Secondary**: `#FBA91E` (Amber/Gold)
- **Error**: `#EB4824` (Red)
- **Success**: `#78C044` (Green)
- **Background (Light)**: `#FFFFFF`
- **Background (Dark)**: `#151443`
- **Paper (Dark)**: `#181C2C`

### Typography

- **Headings**: Plus Jakarta Sans (Google Fonts)
- **Body**: Inter (Google Fonts)

### Theme

- Default theme: Light mode
- User can toggle between light and dark modes
- Theme preference persists via localStorage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ Complete Feature Set

### 🌐 Public Website
- ✅ 9 professional landing pages (Home, About, Programme, Speakers, Venue, Registration, Sponsors, News, Contact)
- ✅ Responsive navigation with mobile drawer
- ✅ Light/dark mode toggle (persisted)
- ✅ Countdown timer to conference
- ✅ Sponsors carousel
- ✅ Global search (Cmd/Ctrl + K)
- ✅ SEO optimized (metadata, sitemap, schema.org)
- ✅ Smooth scroll navigation
- ✅ Image optimization & lazy loading
- ✅ Accessibility (ARIA labels, keyboard nav)

### 📝 Content Management System
- ✅ Custom drag-and-drop page builder
- ✅ Block types: Hero, Text, Image, Grid, Form
- ✅ Live preview mode
- ✅ Version history (revisions)
- ✅ SEO metadata per page
- ✅ Status management (draft/published/archived)
- ✅ Form builder with field types
- ✅ Shortcode parser `[form id="..."]`
- ✅ Dynamic frontend rendering

### 🎫 Ticketing System
- ✅ Multiple ticket types (Early Bird, Standard, Student, VIP)
- ✅ Real-time stock management
- ✅ Paystack payment integration
- ✅ Secure checkout flow
- ✅ QR code generation
- ✅ PDF ticket downloads
- ✅ Order tracking
- ✅ Email confirmations
- ✅ Mobile money support (Paystack)
- ✅ All prices in Ghana Cedis (₵)

### 👥 User Features
- ✅ Account creation with OTP verification
- ✅ User dashboard (My Tickets, Profile, Orders)
- ✅ QR code display for entry
- ✅ Download tickets as PDF
- ✅ Order history
- ✅ Profile management
- ✅ Protected routes

### 🔧 Admin Panel
- ✅ Analytics dashboard with charts (Recharts)
- ✅ Ticket sales visualization
- ✅ Form submissions graph
- ✅ Page management (CRUD + builder)
- ✅ Form management (builder + submissions)
- ✅ Ticket type management
- ✅ Stock updates
- ✅ Order management
- ✅ Export orders to CSV
- ✅ User management (via Supabase)
- ✅ Protected by authentication

### 📧 Communication
- ✅ SendGrid email integration
- ✅ OTP verification emails
- ✅ Ticket confirmation emails
- ✅ Welcome emails
- ✅ Professional HTML templates
- ✅ Automated workflows

### 🔐 Security
- ✅ Supabase Row Level Security (RLS)
- ✅ Webhook signature verification
- ✅ Input validation (Zod)
- ✅ Protected API routes
- ✅ Auth middleware
- ✅ Secure password handling
- ✅ HTTPS enforced

### 📊 Analytics & Insights
- ✅ Real-time sales tracking
- ✅ Revenue analytics
- ✅ Form submission trends
- ✅ Ticket type performance
- ✅ Visual charts and graphs
- ✅ Export capabilities

## Authentication

The app uses Supabase for authentication with email/password and magic link support. Protected routes (e.g., `/dashboard/*`) require authentication and are handled via Next.js middleware.

## Payment Integration

The app is prepared for Paystack integration for ticket sales. All pricing is displayed in Ghana Cedis (₵).

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Ensure you set the environment variables in your Vercel project settings.

## Contributing

This is a private project for the Africa Energy Technology Conference 2026.

## License

© 2026 Africa Energy Technology Conference. All rights reserved.

