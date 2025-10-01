'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const partnerLogos = [
  { name: 'NLCC', src: '/Partners/NLCC.jpg' },
  { name: 'Pitch Hub', src: '/Partners/Pitch-Hub.jpg' },
  { name: 'EY', src: '/Partners/EY.jpg' },
  { name: 'CEIBS', src: '/Partners/CEIBS.jpg' },
  { name: 'ARDA', src: '/Partners/ARDA.jpg' },
  { name: 'Or Noir', src: '/Partners/Or-Noir.jpg' },
  { name: 'Brevity', src: '/Partners/Brevity.jpg' },
  { name: 'Claron Health', src: '/Partners/Claron-Health-Int.jpg' },
  { name: 'UN Global Compact', src: '/Partners/UN-global-compact.jpg' },
  { name: 'Navingo', src: '/Partners/Navingo.jpg' },
  { name: 'LL', src: '/Partners/LL.jpg' },
  { name: 'AECh', src: '/Partners/AECh.jpg' },
  { name: 'APPO', src: '/Partners/APPO.jpg' },
  { name: 'MEGT', src: '/Partners/MEGT_Logo.jpg' },
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
        {[...partnerLogos, ...partnerLogos].map((partner, index) => (
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
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src={partner.src}
              alt={`${partner.name} logo`}
              width={140}
              height={80}
              style={{
                objectFit: 'contain',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              quality={85}
            />
          </Box>
        ))}
      </motion.div>
    </Box>
  );
}

