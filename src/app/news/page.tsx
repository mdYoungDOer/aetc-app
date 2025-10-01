import { Metadata } from 'next';
import { Box, Grid, Typography, Chip } from '@mui/material';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';

export const metadata: Metadata = {
  title: 'News & Updates | Africa Energy Technology Conference 2026',
  description: 'Stay updated with the latest news, announcements, and insights from AETC 2026.',
};

const newsItems = [
  {
    title: 'AETC 2026 Dates Announced',
    date: 'January 15, 2026',
    category: 'Announcement',
    excerpt:
      'Save the dates! AETC 2026 will take place September 15-17 at the Accra International Conference Centre. Early bird registration opens March 1st.',
    image: '/Images/AETC 2025 PICS 1-49.JPG',
    featured: true,
  },
  {
    title: 'Call for Speakers Now Open',
    date: 'February 1, 2026',
    category: 'Call for Participation',
    excerpt:
      'Share your expertise at AETC 2026. We\'re accepting proposals for presentations, workshops, and panel discussions until April 30th.',
    image: '/Images/AETC 2025 PICS 1-42 (1).JPG',
    featured: false,
  },
  {
    title: 'Platinum Sponsor Announced',
    date: 'February 10, 2026',
    category: 'Sponsorship',
    excerpt:
      'We\'re thrilled to announce our first Platinum sponsor. Join leading energy companies in supporting Africa\'s premier energy technology event.',
    image: '/Images/AETC 2025 PICS 1-22 (1).JPG',
    featured: false,
  },
  {
    title: 'Early Bird Tickets Available',
    date: 'March 1, 2026',
    category: 'Registration',
    excerpt:
      'Early bird registration is now open! Secure your spot at AETC 2026 and save 30% off standard ticket prices. Limited availability.',
    image: '/Images/AETC 2025 PICS 1-77 (1).JPG',
    featured: true,
  },
  {
    title: 'Keynote Speaker Lineup Revealed',
    date: 'March 15, 2026',
    category: 'Programme',
    excerpt:
      'Meet our distinguished keynote speakers including leading policymakers, industry executives, and renowned researchers shaping Africa\'s energy future.',
    image: '/Images/AETC 2025 PICS 1-59 (1).JPG',
    featured: false,
  },
  {
    title: 'Youth Energy Summit Announced',
    date: 'March 20, 2026',
    category: 'Programme',
    excerpt:
      'New for 2026: A dedicated Youth Energy Summit bringing together young professionals and students passionate about Africa\'s energy transformation.',
    image: '/Images/AETC 2025 PICS 1-6 (1).JPG',
    featured: false,
  },
];

export default function NewsPage() {
  return (
    <>
      <Hero
        title="News & Updates"
        subtitle="Stay informed about the latest conference developments"
        height="40vh"
      />

      <main>
        {/* Featured News */}
        <Section id="featured" py={8}>
          {newsItems
            .filter((item) => item.featured)
            .slice(0, 1)
            .map((item, index) => (
              <CustomCard key={index} hoverEffect={false} sx={{ overflow: 'hidden' }}>
                <Grid container>
                  <Grid item xs={12} md={5}>
                    <Box
                      sx={{
                        position: 'relative',
                        height: { xs: '250px', md: '100%' },
                        minHeight: { md: '350px' },
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        style={{ objectFit: 'cover' }}
                        priority
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                        <Chip
                          label="Featured"
                          size="small"
                          sx={{
                            backgroundColor: 'secondary.main',
                            color: '#000',
                            fontWeight: 700,
                          }}
                        />
                        <Chip
                          label={item.category}
                          size="small"
                          sx={{
                            backgroundColor: 'primary.main',
                            color: '#FFFFFF',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                        {item.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <Calendar size={16} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.date}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}
                      >
                        {item.excerpt}
                      </Typography>
                      <CustomButton
                        variant="outlined"
                        sx={{
                          borderColor: 'primary.main',
                          color: 'primary.main',
                        }}
                      >
                        Read More <ArrowRight size={18} style={{ marginLeft: 8 }} />
                      </CustomButton>
                    </Box>
                  </Grid>
                </Grid>
              </CustomCard>
            ))}
        </Section>

        {/* All News Grid */}
        <Section
          id="all-news"
          title="Latest Updates"
          subtitle="All news and announcements"
          backgroundColor="paper"
        >
          <Grid container spacing={4}>
            {newsItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CustomCard
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
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
                      sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </Box>
                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                      <Chip
                        label={item.category}
                        size="small"
                        sx={{
                          backgroundColor: 'primary.main',
                          color: '#FFFFFF',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                        }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Calendar size={12} />
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
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        flexGrow: 1,
                        mb: 2,
                      }}
                    >
                      {item.excerpt}
                    </Typography>
                    <Box
                      component={Link}
                      href="#"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Read More <ArrowRight size={14} />
                    </Box>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Newsletter Signup */}
        <Section backgroundColor="dark" py={10}>
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: '#FFFFFF' }}>
              Stay Updated
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255, 255, 255, 0.87)', mb: 4, lineHeight: 1.8 }}
            >
              Subscribe to our newsletter to receive the latest updates about speakers, programme
              schedule, registration opening, and exclusive early bird offers.
            </Typography>
            <CustomButton
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#FBA91E',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#e59915',
                },
              }}
            >
              Subscribe to Newsletter <ArrowRight size={20} style={{ marginLeft: 8 }} />
            </CustomButton>
          </Box>
        </Section>
      </main>
    </>
  );
}
