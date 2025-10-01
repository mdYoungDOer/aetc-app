'use client';

import { Box, Typography, IconButton, Container } from '@mui/material';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

export default function TopBar() {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const contactItems = [
    {
      icon: Phone,
      text: '+233 502 519 909',
      href: 'tel:+233502519909',
    },
    {
      icon: Mail,
      text: 'info@aetconference.com',
      href: 'mailto:info@aetconference.com',
    },
    {
      icon: MapPin,
      text: 'Labadi Beach Hotel, Accra, Ghana',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: '#',
      label: 'Facebook',
    },
    {
      icon: Twitter,
      href: '#',
      label: 'X (Twitter)',
    },
    {
      icon: Linkedin,
      href: '#',
      label: 'LinkedIn',
    },
    {
      icon: Youtube,
      href: '#',
      label: 'YouTube',
    },
    {
      icon: MessageCircle,
      href: '#',
      label: 'WhatsApp',
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: '#FFFFFF',
        py: 1,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {/* Contact Information */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            {contactItems.map((item, index) => (
              <Box
                key={index}
                component="a"
                href={item.href}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'secondary.main',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <item.icon size={16} />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Social Media Links */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                mr: 1,
              }}
            >
              Follow Us:
            </Typography>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                component="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                sx={{
                  color: '#FFFFFF',
                  p: 0.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'secondary.main',
                    backgroundColor: 'rgba(251, 169, 30, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <social.icon size={18} />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
