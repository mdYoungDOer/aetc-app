import { Metadata } from 'next';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Speakers | Africa Energy Technology Conference 2026',
  description: 'Meet our distinguished speakers and industry experts sharing insights at AETC 2026.',
};

export default function SpeakersPage() {
  const speakers = [
    {
      name: 'Dr. Kwame Mensah',
      title: 'Chief Energy Officer',
      company: 'Ghana Energy Commission',
      bio: 'Leading expert in renewable energy policy with 20+ years of experience.',
    },
    {
      name: 'Amina Hassan',
      title: 'CEO',
      company: 'Solar Innovations Africa',
      bio: 'Pioneer in solar technology solutions for rural African communities.',
    },
    {
      name: 'Prof. David Osei',
      title: 'Director of Research',
      company: 'African Energy Institute',
      bio: 'Renowned researcher in sustainable energy systems and grid integration.',
    },
    {
      name: 'Fatima Diallo',
      title: 'Investment Director',
      company: 'Africa Energy Fund',
      bio: 'Expert in energy project financing and infrastructure development.',
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
            Our Speakers
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
            Learn from leading experts in energy technology and innovation
          </Typography>
        </Container>
      </Box>

      {/* Speakers Grid */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 6 }}>
            More speakers to be announced
          </Typography>
          <Grid container spacing={4}>
            {speakers.map((speaker, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 2,
                        backgroundColor: 'primary.main',
                        fontSize: '2rem',
                      }}
                    >
                      {speaker.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {speaker.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'secondary.main', fontWeight: 600, mb: 0.5 }}
                    >
                      {speaker.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      {speaker.company}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}
                    >
                      {speaker.bio}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Linkedin size={18} style={{ cursor: 'pointer' }} />
                      <Twitter size={18} style={{ cursor: 'pointer' }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call for Speakers */}
      <Box
        sx={{
          py: 8,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Interested in Speaking?
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
            We're looking for innovative voices to share their expertise. If you have insights on
            energy technology, policy, or innovation in Africa, we'd love to hear from you.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Speaker applications open soon. Check back for updates.
          </Typography>
        </Container>
      </Box>
    </>
  );
}

