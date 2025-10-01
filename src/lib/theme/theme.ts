'use client';

import { createTheme } from '@mui/material/styles';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';

export const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Light theme configuration
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#293972',
    },
    secondary: {
      main: '#FBA91E',
    },
    error: {
      main: '#EB4824',
    },
    success: {
      main: '#78C044',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.60)',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 700,
    },
    h2: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 700,
    },
    h3: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 600,
    },
    h4: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 600,
    },
    h5: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 600,
    },
    h6: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 600,
    },
    button: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

// Dark theme configuration
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#293972',
    },
    secondary: {
      main: '#FBA91E',
    },
    error: {
      main: '#EB4824',
    },
    success: {
      main: '#78C044',
    },
    background: {
      default: '#151443',
      paper: '#181C2C',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.60)',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 700,
    },
    h2: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 700,
    },
    h3: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 600,
    },
    h4: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 600,
    },
    h5: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 600,
    },
    h6: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 600,
    },
    button: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

