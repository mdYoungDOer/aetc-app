'use client';

import { useState, useEffect } from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import { Check, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { createClient } from '@supabase/supabase-js';
import { calculateTicketVAT, GhanaVATCalculator } from '@/lib/vat-calculator';
// import { ElephantIcon, KentePatternIcon } from '@/components/icons';

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

export default function RegistrationPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyTicket = (ticket: Ticket) => {
    window.location.href = `/purchase/${ticket.id}`;
  };

  const getTicketBadge = (type: string) => {
    switch (type) {
      case 'earlybird':
        return 'BEST VALUE';
      case 'vip':
        return 'PREMIUM';
      case 'student':
        return 'SPECIAL OFFER';
      default:
        return null;
    }
  };

  const isPopular = (type: string) => type === 'earlybird';

  return (
    <>
      <PageBreadcrumb 
        title="Registration & Tickets"
        subtitle="Secure your spot at Africa's premier energy technology conference"
        backgroundImage="/Images/AETC 2025 PICS 1-59 (1).JPG"
        breadcrumbItems={[
          { label: 'Registration', href: '/registration' }
        ]}
      />

      <main>
        {/* Ticket Selection */}
        <Section id="ticket-types" title="Choose Your Pass" subtitle="All prices in Ghana Cedis (₵)" py={10}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : tickets.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                Tickets Not Available Yet
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Registration will open soon. Check back for updates!
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {tickets.map((ticket, index) => {
                const badge = getTicketBadge(ticket.type);
                const popular = isPopular(ticket.type);

                return (
                  <Grid item xs={12} md={6} lg={3} key={ticket.id}>
                    <CustomCard
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        ...(popular && {
                          border: '2px solid',
                          borderColor: 'secondary.main',
                          transform: { md: 'scale(1.05)' },
                          zIndex: 2,
                        }),
                      }}
                      hoverEffect={!popular}
                    >
                      {/* Kente Pattern Background for VIP tickets - DISABLED */}
                      {/* {ticket.type.toLowerCase().includes('vip') && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: 0.03,
                            zIndex: 0,
                          }}
                        >
                          <KentePatternIcon size={100} opacity={0.05} />
                        </Box>
                      )} */}
                      <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        {badge && (
                          <Box
                            sx={{
                              backgroundColor:
                                badge === 'BEST VALUE'
                                  ? 'secondary.main'
                                  : badge === 'PREMIUM'
                                  ? 'primary.main'
                                  : 'success.main',
                              color: badge === 'SPECIAL OFFER' ? '#000' : '#FFFFFF',
                              px: 2,
                              py: 0.5,
                              borderRadius: '4px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.5,
                              mb: 2,
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              width: 'fit-content',
                            }}
                          >
                            {badge === 'BEST VALUE' && <Star size={14} />}
                            {badge}
                          </Box>
                        )}
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          {ticket.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                          <Typography
                            variant="h3"
                            sx={{
                              fontWeight: 800,
                              color: popular ? 'secondary.main' : 'primary.main',
                            }}
                          >
                            {GhanaVATCalculator.formatCurrency(calculateTicketVAT(ticket.price).totalPrice)}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                          {ticket.description}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                          *Price includes Ghana VAT (15%) and government levies (6%)
                        </Typography>
                        <List sx={{ mb: 3, flexGrow: 1, pl: 0 }}>
                          {ticket.features.map((feature, idx) => (
                            <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <Check size={18} color="#78C044" />
                              </ListItemIcon>
                              <ListItemText
                                primary={feature}
                                primaryTypographyProps={{
                                  variant: 'body2',
                                  sx: { lineHeight: 1.6 },
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                        <CustomButton
                          variant={popular ? 'contained' : 'outlined'}
                          fullWidth
                          onClick={() => handleBuyTicket(ticket)}
                          sx={{
                            ...(popular && {
                              backgroundColor: 'secondary.main',
                              color: '#000',
                              '&:hover': {
                                backgroundColor: '#e59915',
                              },
                            }),
                            ...(!popular && {
                              borderColor: 'primary.main',
                              color: 'primary.main',
                            }),
                          }}
                        >
                          Buy Now <ArrowRight size={18} style={{ marginLeft: 8 }} />
                        </CustomButton>
                      </Box>
                    </CustomCard>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Section>

        {/* Group Discounts */}
        <Section backgroundColor="paper" py={8}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 1 }}
              >
                Special Offers
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Group & Corporate Packages
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
                Bring your team to AETC 2026 and save with our group discount rates. Perfect for
                organizations looking to invest in their team's professional development.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                Contact us at{' '}
                <Box component="span" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                  registration@aetconference.com
                </Box>{' '}
                for custom corporate packages.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCard accentColor="success" sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  Group Discount Tiers
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { size: '3-5 attendees', discount: '10% off' },
                    { size: '6-10 attendees', discount: '15% off' },
                    { size: '11-20 attendees', discount: '20% off' },
                    { size: '21+ attendees', discount: 'Custom pricing' },
                  ].map((tier, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        backgroundColor: 'background.paper',
                        borderRadius: '4px',
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {tier.size}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 700, color: 'success.main' }}
                      >
                        {tier.discount}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Section>

        {/* Payment Info */}
        <Section backgroundColor="dark" py={6}>
          <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#FFFFFF' }}>
              Secure Payment Options
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.87)', lineHeight: 1.8 }}>
              We accept payments via mobile money, bank transfer, and major credit cards. All
              transactions are secured and processed in Ghana Cedis (₵) through Paystack.
            </Typography>
          </Box>
        </Section>

      </main>

    </>
  );
}
