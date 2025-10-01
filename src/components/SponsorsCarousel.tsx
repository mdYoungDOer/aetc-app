'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const sponsorPlaceholders = [
  'Energy Corp',
  'Tech Solutions',
  'Green Power',
  'Solar Innovations',
  'Wind Energy Ltd',
  'Hydro Systems',
  'Smart Grid Co',
  'African Energy',
];

export default function SponsorsCarousel() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        py: 4,
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100px',
          zIndex: 2,
          pointerEvents: 'none',
        },
        '&::before': {
          left: 0,
          background: 'linear-gradient(to right, var(--bg-color), transparent)',
        },
        '&::after': {
          right: 0,
          background: 'linear-gradient(to left, var(--bg-color), transparent)',
        },
      }}
    >
      <motion.div
        animate={{
          x: [0, -1600],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
        style={{
          display: 'flex',
          gap: '48px',
          width: 'max-content',
        }}
      >
        {[...sponsorPlaceholders, ...sponsorPlaceholders].map((sponsor, index) => (
          <Box
            key={index}
            sx={{
              minWidth: 180,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'background.paper',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              px: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.875rem',
                textAlign: 'center',
              }}
            >
              {sponsor}
            </Typography>
          </Box>
        ))}
      </motion.div>
    </Box>
  );
}

