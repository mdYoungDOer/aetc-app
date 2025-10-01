'use client';

import { Box, Typography, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from './ui/Section';
import CustomButton from './ui/CustomButton';
import Link from 'next/link';

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

interface SponsorsSectionProps {
  title?: string;
  subtitle?: string;
  showButton?: boolean;
  variant?: 'carousel' | 'grid';
}

export default function SponsorsSection({ 
  title = "Our Sponsors & Partners",
  subtitle = "Supporting Africa's energy transformation",
  showButton = true,
  variant = 'carousel'
}: SponsorsSectionProps) {
  if (variant === 'grid') {
    return (
      <Section
        title={title}
        subtitle={subtitle}
        py={6}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {partnerLogos.map((partner, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'background.paper',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                        borderColor: '#FBA91E',
                      },
                    }}
                  >
                    <Image
                      src={partner.src}
                      alt={`${partner.name} logo`}
                      width={120}
                      height={80}
                      style={{
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%',
                      }}
                      quality={85}
                    />
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          {showButton && (
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <CustomButton
                component={Link}
                href="/sponsors"
                variant="outlined"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(41, 57, 114, 0.08)',
                  },
                }}
              >
                Become a Sponsor
              </CustomButton>
            </Box>
          )}
        </Container>
      </Section>
    );
  }

  // Carousel variant (default)
  return (
    <Section
      title={title}
      subtitle={subtitle}
      py={6}
    >
      <Box
        sx={{
          overflow: 'hidden',
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
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                },
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
      
      {showButton && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CustomButton
            component={Link}
            href="/sponsors"
            variant="outlined"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(41, 57, 114, 0.08)',
              },
            }}
          >
            Become a Sponsor
          </CustomButton>
        </Box>
      )}
    </Section>
  );
}
