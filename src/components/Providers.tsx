'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import ThemeRegistry from '@/lib/theme/ThemeRegistry';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </NextThemeProvider>
  );
}

