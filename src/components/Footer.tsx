'use client';

import { Box, Container, Grid, Typography, Link as MuiLink, Stack } from '@mui/material';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  'Quick Links': [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Programme', path: '/programme' },
    { label: 'Speakers', path: '/speakers' },
  ],
  'Information': [
    { label: 'Venue & Logistics', path: '/venue' },
    { label: 'Registration', path: '/registration' },
    { label: 'Sponsors', path: '/sponsors' },
    { label: 'News', path: '/news' },
  ],
  'Support': [
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms & Conditions', path: '/terms' },
  ],
};

const socialLinks = [
  { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#181C2C',
        color: 'rgba(255, 255, 255, 0.87)',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <Image
                src="/AETC_Logo-second.png"
                alt="AET Conference Logo"
                width={60}
                height={60}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: '#FFFFFF', mb: 2 }}
            >
              Africa Energy Technology Conference 2026
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.60)', mb: 2, lineHeight: 1.7 }}
            >
              Advancing Africa's energy future through innovation, collaboration, and sustainable
              technology solutions.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              {socialLinks.map((social) => (
                <MuiLink
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.60)',
                    '&:hover': {
                      color: '#FBA91E',
                    },
                    transition: 'color 0.3s ease',
                  }}
                >
                  <social.icon size={20} />
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} md={2} key={title}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: '#FFFFFF', mb: 2, fontSize: '1rem' }}
              >
                {title}
              </Typography>
              <Stack spacing={1}>
                {links.map((link) => (
                  <MuiLink
                    key={link.label}
                    component={Link}
                    href={link.path}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.60)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: '#FBA91E',
                      },
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: '#FFFFFF', mb: 2, fontSize: '1rem' }}
            >
              Get In Touch
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <MapPin size={18} style={{ marginTop: 2, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.60)' }}>
                  Accra, Ghana
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Mail size={18} style={{ flexShrink: 0 }} />
                <MuiLink
                  href="mailto:info@aetconference.com"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.60)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#FBA91E',
                    },
                  }}
                >
                  info@aetconference.com
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone size={18} style={{ flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.60)' }}>
                  +233 XX XXX XXXX
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 5,
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.60)' }}>
          © {new Date().getFullYear()} Africa Energy Technology Conference. All rights reserved. Powered by <Link href="tel:+233548327906 target="_blank" rel="noopener noreferrer">Mega Web Services</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

