import { Metadata } from 'next';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { ArrowRight, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sponsors & Partners | Africa Energy Technology Conference 2026',
  description: 'Meet our sponsors and partners supporting AETC 2026. Learn about sponsorship opportunities.',
};

export default function SponsorsPage() {
  const sponsorTiers = [
    {
      tier: 'Platinum',
      benefits: [
        'Premier booth location',
        'Speaking slot in plenary session',
        '10 complimentary passes',
        'Logo on all marketing materials',
        'Exclusive networking dinner access',
      ],
    },
    {
      tier: 'Gold',
      benefits: [
        'Premium booth location',
        'Workshop speaking opportunity',
        '6 complimentary passes',
        'Logo on conference materials',
        'VIP reception access',
      ],
    },
    {
      tier: 'Silver',
      benefits: [
        'Standard booth location',
        '4 complimentary passes',
        'Logo on website',
        'Conference bag insert',
      ],
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
            Sponsors & Partners
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
            Supporting innovation and sustainable energy across Africa
          </Typography>
        </Container>
      </Box>

      {/* Current Sponsors Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Our Sponsors
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 6 }}>
            Sponsorship opportunities available - be part of Africa's energy future
          </Typography>
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              backgroundColor: 'background.default',
              borderRadius: 2,
            }}
          >
            <Award size={64} color="#FBA91E" style={{ marginBottom: 16 }} />
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
              Become a Founding Sponsor
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Join us as a founding sponsor and gain premier visibility at Africa's leading energy
              technology conference.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Sponsorship Opportunities */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Sponsorship Packages
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 6 }}>
            Choose the package that fits your goals
          </Typography>
          <Grid container spacing={4}>
            {sponsorTiers.map((sponsor, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: index === 0 ? 'secondary.main' : 'primary.main',
                      }}
                    >
                      {sponsor.tier}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                      {sponsor.benefits.map((benefit, idx) => (
                        <Box
                          component="li"
                          key={idx}
                          sx={{
                            mb: 1.5,
                            color: 'text.secondary',
                            '&::marker': {
                              color: 'secondary.main',
                            },
                          }}
                        >
                          {benefit}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Interested in Sponsoring?
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
            Contact our partnerships team to discuss custom sponsorship packages tailored to your
            organization's goals and budget.
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
            Contact Us
          </Button>
        </Container>
      </Box>

      {/* Partners Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Conference Partners
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 6 }}>
            Working together to advance Africa's energy sector
          </Typography>
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Partner organizations to be announced
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

