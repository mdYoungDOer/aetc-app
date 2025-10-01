import { Metadata } from 'next';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import Image from 'next/image';
import { Target, Lightbulb, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About the Conference | Africa Energy Technology Conference 2026',
  description: 'Learn about the Africa Energy Technology Conference objectives, themes, and vision for advancing energy innovation across the continent.',
};

export default function AboutPage() {
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
            About the Conference
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
            Driving sustainable energy solutions across Africa
          </Typography>
        </Container>
      </Box>

      {/* Overview Section */}
      <Box id="overview" sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                Conference Overview
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
                The Africa Energy Technology Conference is a premier gathering of energy professionals,
                innovators, and policymakers dedicated to advancing sustainable energy solutions across
                the African continent.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                Our conference provides a platform for knowledge exchange, networking, and collaboration,
                fostering partnerships that drive meaningful change in Africa's energy landscape.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: '400px',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/Images/AETC 2025 PICS 1-57.JPG"
                  alt="Conference overview"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Themes Section */}
      <Box id="themes" sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Conference Themes
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 6 }}>
            Exploring critical areas shaping Africa's energy future
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: Lightbulb,
                title: 'Renewable Energy Innovation',
                description: 'Exploring solar, wind, and hydroelectric solutions tailored for African markets.',
              },
              {
                icon: Globe,
                title: 'Energy Access & Equity',
                description: 'Addressing challenges in bringing reliable energy to underserved communities.',
              },
              {
                icon: Target,
                title: 'Policy & Investment',
                description: 'Creating frameworks that attract investment and support sustainable growth.',
              },
            ].map((theme, index) => (
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
                    <Box
                      sx={{
                        backgroundColor: 'primary.main',
                        borderRadius: '50%',
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                      }}
                    >
                      <theme.icon size={32} color="#FBA91E" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                      {theme.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {theme.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Objectives Section */}
      <Box id="objectives" sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Our Objectives
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 6 }}>
            What we aim to achieve together
          </Typography>
          <Grid container spacing={3}>
            {[
              'Foster collaboration between public and private sectors',
              'Showcase innovative energy technologies and solutions',
              'Promote sustainable and inclusive energy policies',
              'Build capacity through knowledge sharing and training',
              'Create networking opportunities for industry stakeholders',
              'Advance Africa\'s position in the global energy transition',
            ].map((objective, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'secondary.main',
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {objective}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

