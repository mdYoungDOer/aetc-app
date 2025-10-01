import type { Metadata } from 'next';
import { Box } from '@mui/material';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Africa Energy Technology Conference 2026',
  description: 'Join us for the premier energy technology conference in Africa',
  icons: {
    icon: '/Favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
                pt: { xs: '64px', md: '70px' },
              }}
            >
              {children}
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}

