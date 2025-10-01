import { Metadata } from 'next';
import { Box, Container, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { Calendar } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'News & Updates | Africa Energy Technology Conference 2026',
  description: 'Stay updated with the latest news, announcements, and insights from AETC 2026.',
};

export default function NewsPage() {
  const newsItems = [
    {
      title: 'AETC 2026 Dates Announced',
      date: 'Coming Soon',
      category: 'Announcement',
      excerpt: 'Mark your calendars! Conference dates and early bird registration details to be announced.',
      image: '/Images/AETC 2025 PICS 1-49.JPG',
    },
    {
      title: 'Call for Speakers Now Open',
      date: 'Coming Soon',
      category: 'Call for Participation',
      excerpt: 'Share your expertise at AETC 2026. Submit your proposal to speak at Africa\'s premier energy conference.',
      image: '/Images/AETC 2025 PICS 1-42 (1).JPG',
    },
    {
      title: 'Sponsorship Opportunities Available',
      date: 'Coming Soon',
      category: 'Partnerships',
      excerpt: 'Join us as a sponsor and gain visibility among Africa\'s energy technology leaders.',
      image: '/Images/AETC 2025 PICS 1-22 (1).JPG',
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
            News & Updates
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
            Stay informed about the latest conference developments
          </Typography>
        </Container>
      </Box>

      {/* News Grid */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {newsItems.map((item, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: 200,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                      <Chip
                        label={item.category}
                        size="small"
                        sx={{ backgroundColor: 'secondary.main', color: '#000', fontWeight: 600 }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Calendar size={14} />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {item.date}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.7, flexGrow: 1 }}
                    >
                      {item.excerpt}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Signup */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Stay Updated
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
            Subscribe to our newsletter to receive the latest updates about speakers, programme
            schedule, and registration opening.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Newsletter signup coming soon
          </Typography>
        </Container>
      </Box>
    </>
  );
}

