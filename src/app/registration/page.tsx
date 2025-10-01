import { Metadata } from 'next';
import { Box, Container, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Registration & Tickets | Africa Energy Technology Conference 2026',
  description: 'Register for AETC 2026. View ticket types, pricing in Ghana Cedis, and secure your spot.',
};

export default function RegistrationPage() {
  const ticketTypes = [
    {
      name: 'Early Bird',
      price: '₵2,500',
      description: 'Limited time offer - Save 30%',
      features: [
        'Full conference access',
        'All sessions and workshops',
        'Networking events',
        'Conference materials',
        'Lunch and refreshments',
      ],
      available: true,
    },
    {
      name: 'Standard',
      price: '₵3,500',
      description: 'Regular conference pass',
      features: [
        'Full conference access',
        'All sessions and workshops',
        'Networking events',
        'Conference materials',
        'Lunch and refreshments',
      ],
      available: true,
    },
    {
      name: 'Student',
      price: '₵1,500',
      description: 'Valid student ID required',
      features: [
        'Full conference access',
        'All sessions and workshops',
        'Networking events',
        'Conference materials',
      ],
      available: true,
    },
    {
      name: 'VIP',
      price: '₵5,000',
      description: 'Premium experience',
      features: [
        'Full conference access',
        'All sessions and workshops',
        'VIP networking dinner',
        'Premium seating',
        'Conference materials',
        'Lunch and refreshments',
        'Meet & greet with speakers',
      ],
      available: true,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #293972 0%, #1a2550 100%)',
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 2,
            }}
          >
            Registration & Tickets
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
            Secure your spot at Africa's premier energy technology conference
          </Typography>
        </Container>
      </Box>

      {/* Ticket Types Section */}
      <Box id="ticket-types" sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Choose Your Ticket
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 6 }}>
            All prices in Ghana Cedis (₵)
          </Typography>
          <Grid container spacing={4}>
            {ticketTypes.map((ticket, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                    ...(ticket.name === 'Early Bird' && {
                      border: '2px solid',
                      borderColor: 'secondary.main',
                    }),
                  }}
                >
                  <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {ticket.name === 'Early Bird' && (
                      <Box
                        sx={{
                          backgroundColor: 'secondary.main',
                          color: '#000',
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          display: 'inline-block',
                          mb: 2,
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        BEST VALUE
                      </Box>
                    )}
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      {ticket.name}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}
                    >
                      {ticket.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                      {ticket.description}
                    </Typography>
                    <List sx={{ mb: 3, flexGrow: 1 }}>
                      {ticket.features.map((feature, idx) => (
                        <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Check size={20} color="#78C044" />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{
                              variant: 'body2',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      variant={ticket.name === 'Early Bird' ? 'contained' : 'outlined'}
                      fullWidth
                      sx={{
                        ...(ticket.name === 'Early Bird' && {
                          backgroundColor: 'secondary.main',
                          color: '#000',
                          '&:hover': {
                            backgroundColor: '#e59915',
                          },
                        }),
                      }}
                      endIcon={<ArrowRight size={18} />}
                    >
                      Select Ticket
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Buy Tickets Section */}
      <Box id="buy-tickets" sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Ready to Register?
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
            Registration opens soon. Join our mailing list to be notified when tickets become available
            and to receive early bird discount codes.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: '#1f2a5a',
              },
              px: 6,
            }}
            endIcon={<ArrowRight size={20} />}
          >
            Notify Me
          </Button>
        </Container>
      </Box>

      {/* Group Discounts */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Group Discounts Available
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            Registering multiple attendees? Contact us for special group rates and corporate packages.
            Email us at{' '}
            <Box component="span" sx={{ color: 'secondary.main', fontWeight: 600 }}>
              registration@aetconference.com
            </Box>
          </Typography>
        </Container>
      </Box>
    </>
  );
}

