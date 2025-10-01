import type { Metadata } from 'next';
import { Box } from '@mui/material';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { generateEventSchema, generateOrganizationSchema } from '@/utils/schema-org';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aetconference.com';

export const metadata: Metadata = {
  title: 'Africa Energy Technology Conference 2026',
  description: 'Join us for the premier energy technology conference in Africa. Explore innovations, network with industry leaders, and shape the future of energy.',
  keywords: ['energy conference', 'Africa', 'renewable energy', 'technology', 'Ghana', 'AETC 2026'],
  authors: [{ name: 'AETC 2026' }],
  creator: 'Africa Energy Technology Conference',
  publisher: 'AETC 2026',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Africa Energy Technology Conference 2026',
    description: 'Join Africa\'s premier energy technology conference',
    url: siteUrl,
    siteName: 'AETC 2026',
    images: [
      {
        url: '/Images/AETC 2025 PICS 1-24.JPG',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Africa Energy Technology Conference 2026',
    description: 'Join Africa\'s premier energy technology conference',
    images: ['/Images/AETC 2025 PICS 1-24.JPG'],
  },
  icons: {
    icon: '/Favicon.png',
    shortcut: '/Favicon.png',
    apple: '/Favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const eventSchema = generateEventSchema({
  name: 'Africa Energy Technology Conference 2026',
  startDate: '2026-05-26T09:00:00+00:00',
  endDate: '2026-05-28T17:00:00+00:00',
  location: {
    name: 'Labadi Beach Hotel',
    address: 'Accra, Ghana',
  },
  description: 'Africa\'s premier energy technology conference bringing together industry leaders, innovators, and policymakers.',
  url: siteUrl,
});

const orgSchema = generateOrganizationSchema(siteUrl);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script src="https://js.paystack.co/v1/inline.js" async></script>
      </head>
      <body>
        <Providers>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                pt: { xs: '48px', md: '88px' }, // Further reduced padding to eliminate white space
              }}
            >
              {children}
            </Box>
            <Footer />
            <BackToTop />
          </Box>
        </Providers>
      </body>
    </html>
  );
}

