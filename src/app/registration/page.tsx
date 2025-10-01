import { Metadata } from 'next';
import { Box, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';

export const metadata: Metadata = {
  title: 'Registration & Tickets | Africa Energy Technology Conference 2026',
  description: 'Register for AETC 2026. View ticket types, pricing in Ghana Cedis, and secure your spot.',
};

const ticketTypes = [
  {
    name: 'Early Bird',
    price: 2500,
    originalPrice: 3500,
    badge: 'BEST VALUE',
    description: 'Limited availability - Save 30%',
    features: [
      'Full conference access (3 days)',
      'All plenary sessions',
      'Access to all technical sessions',
      'Exhibition area access',
      'Conference materials & bag',
      'Daily lunch & refreshments',
      'Networking events',
      'Digital programme access',
    ],
    popular: true,
    color: 'secondary' as const,
  },
  {
    name: 'Standard',
    price: 3500,
    badge: null,
    description: 'Regular conference pass',
    features: [
      'Full conference access (3 days)',
      'All plenary sessions',
      'Access to all technical sessions',
      'Exhibition area access',
      'Conference materials & bag',
      'Daily lunch & refreshments',
      'Networking events',
      'Digital programme access',
    ],
    popular: false,
    color: 'primary' as const,
  },
  {
    name: 'Student',
    price: 1500,
    badge: 'SPECIAL OFFER',
    description: 'Valid student ID required',
    features: [
      'Full conference access (3 days)',
      'All plenary sessions',
      'Access to selected technical sessions',
      'Exhibition area access',
      'Conference materials',
      'Daily lunch & refreshments',
      'Student networking events',
    ],
    popular: false,
    color: 'success' as const,
  },
  {
    name: 'VIP',
    price: 5000,
    badge: 'PREMIUM',
    description: 'Complete conference experience',
    features: [
      'Full conference access (3 days)',
      'All plenary & technical sessions',
      'VIP reserved seating',
      'Exclusive VIP networking dinner',
      'Meet & greet with keynote speakers',
      'Premium conference materials',
      'Daily lunch & premium refreshments',
      'VIP lounge access',
      'All networking events',
      'Conference proceedings',
    ],
    popular: false,
    color: 'primary' as const,
  },
];

export default function RegistrationPage() {
  return (
    <>
      <Hero
        title="Registration & Tickets"
        subtitle="Secure your spot at Africa's premier energy technology conference"
        height="40vh"
      />

      <main>
        {/* Ticket Selection */}
        <Section id="ticket-types" title="Choose Your Pass" subtitle="All prices in Ghana Cedis (₵)" py={10}>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {ticketTypes.map((ticket, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <CustomCard
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    ...(ticket.popular && {
                      border: '2px solid',
                      borderColor: 'secondary.main',
                      transform: { md: 'scale(1.05)' },
                      zIndex: 2,
                    }),
                  }}
                  hoverEffect={!ticket.popular}
                >
                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {ticket.badge && (
                      <Box
                        sx={{
                          backgroundColor:
                            ticket.badge === 'BEST VALUE'
                              ? 'secondary.main'
                              : ticket.badge === 'PREMIUM'
                              ? 'primary.main'
                              : 'success.main',
                          color: ticket.badge === 'SPECIAL OFFER' ? '#000' : '#FFFFFF',
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
                        {ticket.badge === 'BEST VALUE' && <Star size={14} />}
                        {ticket.badge}
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
                          color: ticket.popular ? 'secondary.main' : 'primary.main',
                        }}
                      >
                        ₵{ticket.price.toLocaleString()}
                      </Typography>
                      {ticket.originalPrice && (
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: 'line-through',
                            color: 'text.secondary',
                          }}
                        >
                          ₵{ticket.originalPrice.toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                      {ticket.description}
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
                      variant={ticket.popular ? 'contained' : 'outlined'}
                      fullWidth
                      sx={{
                        ...(ticket.popular && {
                          backgroundColor: 'secondary.main',
                          color: '#000',
                          '&:hover': {
                            backgroundColor: '#e59915',
                          },
                        }),
                        ...(!ticket.popular && {
                          borderColor: 'primary.main',
                          color: 'primary.main',
                        }),
                      }}
                    >
                      Select {ticket.name} <ArrowRight size={18} style={{ marginLeft: 8 }} />
                    </CustomButton>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Registration Info */}
        <Section id="buy-tickets" backgroundColor="paper" py={8}>
          <Box sx={{ maxWidth: 700, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Ready to Register?
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
              Registration opens soon. Join our mailing list to be notified when tickets become available
              and to receive early bird discount codes sent directly to your inbox.
            </Typography>
            <CustomButton
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'primary.main',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#1f2a5a',
                },
                px: 6,
              }}
            >
              Notify Me <ArrowRight size={20} style={{ marginLeft: 8 }} />
            </CustomButton>
          </Box>
        </Section>

        {/* Group Discounts */}
        <Section py={8}>
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
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                Contact us for custom corporate packages including exhibition space, speaking opportunities,
                and branding options.
              </Typography>
              <CustomButton
                component={Link}
                href="/contact"
                variant="outlined"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }}
              >
                Contact Sales Team
              </CustomButton>
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
              transactions are secured and processed in Ghana Cedis (₵).
            </Typography>
          </Box>
        </Section>
      </main>
    </>
  );
}
