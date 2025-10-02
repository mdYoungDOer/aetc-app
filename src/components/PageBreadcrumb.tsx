'use client';

import { Box, Typography, Container, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PageBreadcrumbProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  breadcrumbItems?: Array<{
    label: string;
    href: string;
  }>;
}

export default function PageBreadcrumb({ 
  title, 
  subtitle, 
  backgroundImage, 
  breadcrumbItems = [] 
}: PageBreadcrumbProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '400px', md: '500px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        mt: { xs: '-16px', md: '-24px' },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(41, 57, 114, 0.8) 0%, rgba(41, 57, 114, 0.6) 50%, rgba(251, 169, 30, 0.3) 100%)',
          zIndex: 1,
        },
      }}
    >
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={`${title} background`}
        fill
        style={{
          objectFit: 'cover',
          zIndex: 0,
        }}
        priority
        sizes="100vw"
        quality={90}
      />
      
      {/* Breadcrumb Navigation */}
      {breadcrumbItems.length > 0 && (
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, mb: 2 }}>
          <Breadcrumbs
            separator={<ChevronRight size={16} color="#FBA91E" />}
            sx={{
              '& .MuiBreadcrumbs-separator': {
                color: '#FBA91E',
              },
            }}
          >
            <MuiLink
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#FBA91E',
                },
              }}
            >
              <Home size={16} />
              Home
            </MuiLink>
            {breadcrumbItems.map((item, index) => (
              <MuiLink
                key={index}
                component={Link}
                href={item.href}
                sx={{
                  color: index === breadcrumbItems.length - 1 
                    ? '#FBA91E' 
                    : 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: index === breadcrumbItems.length - 1 ? 600 : 500,
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#FBA91E',
                  },
                }}
              >
                {item.label}
              </MuiLink>
            ))}
          </Breadcrumbs>
        </Container>
      )}
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: 'white',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 400,
                  textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </Typography>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Box>
  );
}
