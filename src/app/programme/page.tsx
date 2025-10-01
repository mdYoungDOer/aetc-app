import { Metadata } from 'next';
import { Box, Container, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import { Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Programme | Africa Energy Technology Conference 2026',
  description: 'View the full conference programme including schedule, sessions, and speaker line-up.',
};

export default function ProgrammePage() {
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
            Conference Programme
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
            Explore our comprehensive schedule and sessions
          </Typography>
        </Container>
      </Box>

      {/* Schedule Section */}
      <Box id="schedule" sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Conference Schedule
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 6 }}>
            Full programme details coming soon
          </Typography>
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Day 1 - Opening & Keynotes
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                      <Chip icon={<Clock size={16} />} label="09:00 - 10:00" size="small" />
                      <Chip icon={<MapPin size={16} />} label="Main Hall" size="small" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Opening Ceremony & Welcome Address
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Official conference opening with keynote addresses from distinguished guests.
                    </Typography>
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                      <Chip icon={<Clock size={16} />} label="10:30 - 12:00" size="small" />
                      <Chip icon={<MapPin size={16} />} label="Main Hall" size="small" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Plenary Session: The Future of Energy in Africa
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Panel discussion featuring industry leaders and policymakers.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Sessions Section */}
      <Box id="sessions" sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Featured Sessions
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 6 }}>
            Engaging discussions on critical energy topics
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Renewable Energy Technologies',
                track: 'Technical Track',
                description: 'Deep dive into solar, wind, and hydro innovations for African markets.',
              },
              {
                title: 'Energy Policy & Regulation',
                track: 'Policy Track',
                description: 'Exploring regulatory frameworks that enable energy transition.',
              },
              {
                title: 'Investment & Financing',
                track: 'Business Track',
                description: 'Understanding funding mechanisms for energy projects.',
              },
              {
                title: 'Community Energy Solutions',
                track: 'Social Impact Track',
                description: 'Grassroots approaches to energy access and equity.',
              },
            ].map((session, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Chip
                      label={session.track}
                      size="small"
                      sx={{ mb: 2, backgroundColor: 'secondary.main', color: '#000' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {session.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {session.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

