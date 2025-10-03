'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Stack,
  Divider,
} from '@mui/material';
import { 
  Ticket, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Users,
  Zap,
  Crown,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { calculateTicketVAT, GhanaVATCalculator } from '@/lib/vat-calculator';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';
import Section from '@/components/ui/Section';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Ticket {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  features: string[];
  active: boolean;
}

const ticketIcons = {
  earlybird: <Zap size={24} color="#FBA91E" />,
  vip: <Crown size={24} color="#FBA91E" />,
  student: <GraduationCap size={24} color="#FBA91E" />,
  standard: <Ticket size={24} color="#FBA91E" />,
};

const ticketColors = {
  earlybird: {
    primary: '#FBA91E',
    secondary: '#e59915',
    background: 'linear-gradient(135deg, #FBA91E 0%, #e59915 100%)',
  },
  vip: {
    primary: '#293972',
    secondary: '#1e2a5e',
    background: 'linear-gradient(135deg, #293972 0%, #1e2a5e 100%)',
  },
  student: {
    primary: '#78C044',
    secondary: '#6ba83a',
    background: 'linear-gradient(135deg, #78C044 0%, #6ba83a 100%)',
  },
  standard: {
    primary: '#6c757d',
    secondary: '#5a6268',
    background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
  },
};

export default function HomepageTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('active', true)
        .order('price');

      if (error) throw error;
      setTickets(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTicketIcon = (type: string) => {
    return ticketIcons[type as keyof typeof ticketIcons] || ticketIcons.standard;
  };

  const getTicketColors = (type: string) => {
    return ticketColors[type as keyof typeof ticketColors] || ticketColors.standard;
  };

  const getTicketBadge = (type: string) => {
    switch (type) {
      case 'earlybird':
        return { text: 'BEST VALUE', color: '#FBA91E' };
      case 'vip':
        return { text: 'PREMIUM', color: '#293972' };
      case 'student':
        return { text: 'SPECIAL OFFER', color: '#78C044' };
      default:
        return { text: 'STANDARD', color: '#6c757d' };
    }
  };

  if (loading) {
    return (
      <Section py={10}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Section>
    );
  }

  if (error) {
    return (
      <Section py={10}>
        <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto' }}>
          {error}
        </Alert>
      </Section>
    );
  }

  return (
    <Section py={10} backgroundColor="default">
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
            Choose Your Conference Experience
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Select the perfect ticket type for your AETC 2026 journey. 
            All tickets include access to all sessions, networking opportunities, and conference materials.
          </Typography>
        </Box>

        {/* Tickets Grid */}
        <Grid container spacing={4}>
          {tickets.map((ticket, index) => {
            const colors = getTicketColors(ticket.type);
            const badge = getTicketBadge(ticket.type);
            const isPopular = ticket.type === 'earlybird';
            
            return (
              <Grid item xs={12} md={6} lg={4} key={ticket.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CustomCard
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      border: isPopular ? `3px solid ${colors.primary}` : '1px solid',
                      borderColor: isPopular ? colors.primary : 'divider',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px ${colors.primary}20`,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Popular Badge */}
                    {isPopular && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          zIndex: 2,
                        }}
                      >
                        <Chip
                          label={badge.text}
                          sx={{
                            backgroundColor: colors.primary,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '12px',
                            height: 28,
                          }}
                        />
                      </Box>
                    )}

                    {/* Header with Icon and Title */}
                    <Box
                      sx={{
                        background: colors.background,
                        color: 'white',
                        p: 3,
                        textAlign: 'center',
                        position: 'relative',
                      }}
                    >
                      <Box sx={{ mb: 2 }}>
                        {getTicketIcon(ticket.type)}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        {ticket.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {ticket.description}
                      </Typography>
                    </Box>

                    {/* Price Section */}
                    <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700, 
                        color: colors.primary, 
                        mb: 1,
                        fontSize: { xs: '1.4rem', md: '1.5rem' }
                      }}
                    >
                      {GhanaVATCalculator.formatCurrency(calculateTicketVAT(ticket.price).totalPrice)}
                    </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        per person
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                        *Includes Ghana VAT & levies
                      </Typography>
                    </Box>

                    {/* Features List */}
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Stack spacing={2}>
                        {ticket.features.map((feature, idx) => (
                          <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircle size={20} color="#78C044" style={{ marginRight: 12 }} />
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>

                    {/* Action Button */}
                    <Box sx={{ p: 3, pt: 0 }}>
                      <CustomButton
                        variant={isPopular ? 'contained' : 'outlined'}
                        fullWidth
                        size="large"
                        endIcon={<ArrowRight size={20} />}
                        component={Link}
                        href={`/purchase/${ticket.id}`}
                        sx={{
                          ...(isPopular && {
                            background: colors.background,
                            color: 'white',
                            '&:hover': {
                              background: colors.secondary,
                              transform: 'translateY(-2px)',
                            },
                          }),
                          ...(!isPopular && {
                            borderColor: colors.primary,
                            color: colors.primary,
                            '&:hover': {
                              backgroundColor: colors.primary,
                              color: 'white',
                              transform: 'translateY(-2px)',
                            },
                          }),
                          py: 2,
                          fontWeight: 600,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Get Your Ticket
                      </CustomButton>
                    </Box>
                  </CustomCard>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

        {/* Bottom CTA */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
            Need help choosing the right ticket?
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <CustomButton
              variant="outlined"
              component={Link}
              href="/registration"
              endIcon={<ArrowRight size={20} />}
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              View All Tickets
            </CustomButton>
            <CustomButton
              variant="contained"
              component={Link}
              href="/contact"
              sx={{
                backgroundColor: 'secondary.main',
                color: '#000',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
              }}
            >
              Contact Support
            </CustomButton>
          </Stack>
        </Box>
      </Box>
    </Section>
  );
}
