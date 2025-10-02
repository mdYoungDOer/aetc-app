'use client';

import { Box, Container, Grid, Typography, Link as MuiLink, Stack } from '@mui/material';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
// import { GyeNyameIcon, KentePatternIcon } from '@/components/icons';

const footerLinks = {
  'About & Information': [
    { label: 'About The Conference', path: '/about' },
    { label: 'Key Topics', path: '/about/key-topics' },
    { label: 'Why Attend AETC', path: '/about/why' },
    { label: 'AETC FAQs', path: '/about/faqs' },
    { label: 'Speakers', path: '/speakers' },
    { label: 'Programme', path: '/programme' },
    { label: 'Conference Venue', path: '/venue' },
  ],
  'Get Involved & Travel': [
    { label: 'Apply To Sponsor', path: '/sponsors' },
    { label: 'Apply To Exhibit', path: '/exhibit' },
    { label: 'Apply To Speak', path: '/speakers#call-for-speakers' },
    { label: 'Partner With Us', path: '/partnership' },
    { label: 'VISA Support', path: '/visa-support' },
    { label: 'Travel & Accommodation', path: '/travel' },
    { label: 'Registration', path: '/registration' },
  ],
  'Media & Support': [
    { label: 'Press Releases', path: '/news' },
    { label: '2025 Photo Gallery', path: '/gallery/2025' },
    { label: '2024 Photo Gallery', path: '/gallery/2024' },
    { label: 'Contact Us', path: '/contact' },
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
        backgroundColor: '#1A1D29',
        color: 'rgba(255, 255, 255, 0.87)',
        pt: 6,
        pb: 3,
        mt: 'auto',
        minHeight: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Logo and Description */}
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 3 }}>
              <Image
                src="/AETC_Logo-second.png"
                alt="AET Conference Logo"
                width={120}
                height={120}
                style={{
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))',
                }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.70)', 
                mb: 3, 
                lineHeight: 1.6, 
                fontSize: '0.9rem',
                maxWidth: '350px'
              }}
            >
              Advancing Africa's energy future through innovation, collaboration, and sustainable
              technology solutions.
            </Typography>
            
            {/* Social Media Links */}
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              {socialLinks.map((social) => (
                <MuiLink
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.70)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                           color: 'secondary.main',
                      transform: 'translateY(-2px)',
                      backgroundColor: 'rgba(251, 169, 30, 0.2)',
                    },
                  }}
                >
                  <social.icon size={18} />
                </MuiLink>
              ))}
            </Stack>

            {/* Get In Touch Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{ 
                  fontWeight: 700, 
                  color: '#FFFFFF', 
                  mb: 3, 
                  fontSize: '1.1rem' 
                }}
              >
                Get In Touch
              </Typography>
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <MapPin size={16} color="rgba(255, 255, 255, 0.70)" />
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.70)', fontSize: '0.9rem' }}>
                    Accra, Ghana
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Mail size={16} color="rgba(255, 255, 255, 0.70)" />
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.70)', fontSize: '0.9rem' }}>
                    info@aetconference.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Phone size={16} color="rgba(255, 255, 255, 0.70)" />
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.70)', fontSize: '0.9rem' }}>
                    +233 502 519 909
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} md={2.2} key={title}>
              <Typography
                variant="h6"
                sx={{ 
                  fontWeight: 700, 
                  color: '#FFFFFF', 
                  mb: 1.5, 
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
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
                      color: 'rgba(255, 255, 255, 0.70)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 400,
                      lineHeight: 1.3,
                      '&:hover': {
                           color: 'secondary.main',
                        transform: 'translateX(4px)',
                      },
                      transition: 'all 0.3s ease',
                      display: 'block',
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 3,
            pt: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.60)' }}>
            © {new Date().getFullYear()} Africa Energy Technology Conference. All rights reserved. Powered by{' '}
            <MuiLink href="tel:+233548327906" target="_blank" rel="noopener noreferrer" sx={{ color: 'secondary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Mega Web Services
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

