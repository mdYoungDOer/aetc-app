'use client';

import { Box, Typography, Container } from '@mui/material';
import Image from 'next/image';

interface PageBreadcrumbProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export default function PageBreadcrumb({ title, subtitle, backgroundImage }: PageBreadcrumbProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '300px', md: '400px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(rgba(41, 57, 114, 0.7), rgba(41, 57, 114, 0.5))',
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
      />
      
      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: 'white',
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 400,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
