'use client';

import { Box, Typography, Grid, Container } from '@mui/material';
import { Users, Handshake, Globe, Presentation, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { ElephantIcon, BlackStarSquareIcon } from '@/components/icons';

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
}

const stats: Stat[] = [
  { icon: ElephantIcon, value: '3k+', label: 'Attendees' },
  { icon: BlackStarSquareIcon, value: '100+', label: 'Partners & Sponsors' },
  { icon: Globe, value: '45+', label: 'Countries Represented' },
  { icon: Presentation, value: '50+', label: 'Strategic & Technical Sessions' },
  { icon: Mic, value: '200+', label: 'A-List Speakers & VIPs' },
];

export default function KeyStatsSection() {
  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: '16px',
            p: { xs: 3, md: 5 },
            color: '#FFFFFF',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center" alignItems="center">
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={index} sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <stat.icon 
                    size={48} 
                    color="#FFFFFF"
                    sx={{ 
                      mb: 1,
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      }
                    }}
                  />
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      lineHeight: 1.1,
                      mb: 0.5,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
}
