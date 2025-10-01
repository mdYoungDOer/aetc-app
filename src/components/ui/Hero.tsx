'use client';

import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: string;
  children?: ReactNode;
  overlay?: boolean;
  align?: 'left' | 'center';
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  height = '60vh',
  children,
  overlay = true,
  align = 'left',
}: HeroProps) {
  return (
    <Box
      component="section"
      aria-label="Hero section"
      sx={{
        position: 'relative',
        minHeight: { xs: '50vh', md: height },
        display: 'flex',
        alignItems: 'center',
        background: backgroundImage
          ? 'transparent'
          : 'linear-gradient(135deg, #293972 0%, #1a2550 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {overlay && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(21, 20, 67, 0.75)',
              }}
            />
          )}
        </>
      )}

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: align,
          py: 4, // Add vertical padding to the content container
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              fontWeight: 800,
              color: '#FFFFFF',
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="h5"
              component="p"
              sx={{
                color: 'rgba(255, 255, 255, 0.87)',
                mb: 4,
                lineHeight: 1.6,
                fontWeight: 400,
                maxWidth: align === 'center' ? '800px' : '100%',
                mx: align === 'center' ? 'auto' : 0,
              }}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </motion.div>
      </Container>
    </Box>
  );
}

