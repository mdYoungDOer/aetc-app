export const SITE_CONFIG = {
  name: 'Africa Energy Technology Conference 2026',
  shortName: 'AETC 2026',
  description: 'Africa\'s premier energy technology conference',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  currency: 'GHS',
  currencySymbol: '₵',
} as const;

export const CONTACT_INFO = {
  email: 'info@aetconference.com',
  phone: '+233 XX XXX XXXX',
  location: 'Accra, Ghana',
} as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  facebook: 'https://facebook.com',
} as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  programme: '/programme',
  speakers: '/speakers',
  venue: '/venue',
  registration: '/registration',
  sponsors: '/sponsors',
  news: '/news',
  contact: '/contact',
  dashboard: '/dashboard',
  login: '/auth/login',
} as const;

