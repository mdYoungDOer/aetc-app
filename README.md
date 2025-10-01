# AET Conference 2026

Official website for the Africa Energy Technology Conference 2026.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Styling**: Emotion (CSS-in-JS)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Forms**: React Hook Form + Zod
- **Theme**: next-themes for light/dark mode
- **Date Utilities**: date-fns

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

## Features

### Current

- ✅ Responsive navigation with mobile drawer
- ✅ Light/dark mode toggle
- ✅ Landing pages for all main sections
- ✅ SEO-optimized metadata
- ✅ Image optimization with Next.js Image
- ✅ MUI theming with custom color palette
- ✅ Framer Motion animations
- ✅ Supabase authentication setup
- ✅ Protected dashboard routes

### Upcoming

- 🔄 User registration and login
- 🔄 Ticket purchase integration (Paystack)
- 🔄 Speaker submission portal
- 🔄 Admin dashboard
- 🔄 Email notifications (SendGrid)
- 🔄 PWA support
- 🔄 Multi-language support

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

