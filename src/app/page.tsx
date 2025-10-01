import { Metadata } from 'next';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Africa Energy Technology Conference 2026 | Home',
  description: 'Join Africa\'s premier energy technology conference. Explore innovations, network with industry leaders, and shape the future of energy in Africa.',
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '60vh', md: '80vh' },
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #293972 0%, #1a2550 100%)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'url(/Images/AETC\\ 2025\\ PICS\\ 1-24.JPG)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
                  fontWeight: 800,
                  color: '#FFFFFF',
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Africa Energy Technology Conference 2026
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.87)',
                  mb: 4,
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Powering Africa's Future Through Innovation and Sustainable Technology
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  href="/registration"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#FBA91E',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#e59915',
                    },
                    px: 4,
                    py: 1.5,
                  }}
                  endIcon={<ArrowRight size={20} />}
                >
                  Register Now
                </Button>
                <Button
                  component={Link}
                  href="/programme"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#FFFFFF',
                    color: '#FFFFFF',
                    '&:hover': {
                      borderColor: '#FBA91E',
                      backgroundColor: 'rgba(251, 169, 30, 0.1)',
                    },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  View Programme
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Key Info Section */}
      <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Calendar size={32} color="#FBA91E" />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Conference Dates
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    TBA 2026
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin size={32} color="#FBA91E" />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Venue
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Accra, Ghana
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Users size={32} color="#FBA91E" />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Expected Attendees
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    1000+ Industry Leaders
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Preview Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '300px', md: '400px' },
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/Images/AETC 2025 PICS 1-69.JPG"
                  alt="Conference venue"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 1 }}
              >
                About the Conference
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, mt: 1 }}>
                Shaping Africa's Energy Future
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                The Africa Energy Technology Conference brings together industry leaders, innovators,
                and policymakers to explore cutting-edge solutions for Africa's energy challenges.
                Join us for thought-provoking discussions, networking opportunities, and insights
                into the future of sustainable energy in Africa.
              </Typography>
              <Button
                component={Link}
                href="/about"
                variant="contained"
                sx={{
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: '#1f2a5a',
                  },
                }}
                endIcon={<ArrowRight size={18} />}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

