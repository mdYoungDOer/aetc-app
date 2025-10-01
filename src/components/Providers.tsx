'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import ThemeRegistry from '@/lib/theme/ThemeRegistry';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ThemeRegistry>{children}</ThemeRegistry>;
  }

  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <ThemeRegistry>{children}</ThemeRegistry>
    </NextThemeProvider>
  );
}

