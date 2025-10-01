import { Metadata } from 'next';
import { Box, Grid, Typography } from '@mui/material';
import { Calendar, MapPin, Users, ArrowRight, Lightbulb, Target, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';
import CountdownTimer from '@/components/CountdownTimer';
import SponsorsSection from '@/components/SponsorsSection';

export const metadata: Metadata = {
  title: 'Africa Energy Technology Conference 2026 | Home',
  description: 'Join Africa\'s premier energy technology conference. Explore innovations, network with industry leaders, and shape the future of energy in Africa.',
};

export default function HomePage() {
  // Set conference date (placeholder - adjust as needed)
  const conferenceDate = new Date('2026-09-15T09:00:00');

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Hero Section with Countdown */}
        <Hero
          title="Africa Energy Technology Conference 2026"
          subtitle="Innovate, Invest, Implement: Revolutionised Financing for Sustainable Energy Sector Growth in Africa"
          backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
          height="80vh"
        >
        <Box sx={{ mb: 4 }}>
          <CountdownTimer targetDate={conferenceDate} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <CustomButton
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
            }}
          >
            Register Now <ArrowRight size={20} style={{ marginLeft: 8 }} />
          </CustomButton>
          <CustomButton
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
            }}
          >
            View Programme
          </CustomButton>
        </Box>
      </Hero>

      {/* Main Content */}
      <main id="main-content">
        {/* Key Info Section */}
        <Section id="key-info" py={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 3,
                  borderRadius: '8px',
                  backgroundColor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <Calendar size={32} color="#FBA91E" />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Conference Dates
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    September 15-17, 2026
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 3,
                  borderRadius: '8px',
                  backgroundColor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 3,
                  borderRadius: '8px',
                  backgroundColor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
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
        </Section>

        {/* Conference Highlights */}
        <Section
          id="highlights"
          title="Why Attend AETC 2026"
          subtitle="Join Africa's most influential energy technology gathering"
          backgroundColor="paper"
        >
          <Grid container spacing={4}>
            {[
              {
                icon: Users,
                title: '3k+ Attendees',
                description:
                  'Connect with government representatives, policymakers, and industry leaders from 45+ countries.',
              },
              {
                icon: Lightbulb,
                title: '50+ Strategic Sessions',
                description:
                  'Participate in thought-provoking discussions and panels featuring 200+ A-list speakers & VIPs.',
              },
              {
                icon: Target,
                title: 'Investment Opportunities',
                description:
                  'Explore numerous investment opportunities with financial institutions, investors, and ESG advisors.',
              },
              {
                icon: Globe,
                title: '100+ Partners',
                description:
                  'Network with 100+ partners and sponsors supporting Africa\'s energy transformation.',
              },
            ].map((highlight, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <CustomCard accentColor="success" sx={{ height: '100%', p: 3 }}>
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
                    aria-hidden="true"
                  >
                    <highlight.icon size={32} color="#FBA91E" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                    {highlight.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {highlight.description}
                  </Typography>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* About Preview Section */}
        <Section id="about-preview" py={10}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '300px', md: '450px' },
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                }}
              >
                <Image
                  src="/images-optimized/aetc-2025-pics-1-69.webp"
                  alt="Conference attendees networking"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  quality={85}
                  priority={false}
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
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
                The Africa Energy Technology Conference brings together industry leaders, innovators,
                and policymakers to explore cutting-edge solutions for Africa's energy challenges.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                Join us for thought-provoking discussions, networking opportunities, and insights
                into the future of sustainable energy across the continent.
              </Typography>
              <CustomButton
                component={Link}
                href="/about"
                variant="contained"
                sx={{
                  backgroundColor: 'primary.main',
                  color: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#1f2a5a',
                  },
                }}
              >
                Learn More <ArrowRight size={18} style={{ marginLeft: 8 }} />
              </CustomButton>
            </Grid>
          </Grid>
        </Section>

        {/* Speakers Teaser */}
        <Section
          id="speakers-preview"
          title="Featured Speakers"
          subtitle="Learn from industry leaders and innovators"
          backgroundColor="paper"
        >
          <Grid container spacing={4}>
            {[
              { name: 'Dr. Kwame Mensah', title: 'Chief Energy Officer', org: 'Ghana Energy Commission' },
              { name: 'Amina Hassan', title: 'CEO', org: 'Solar Innovations Africa' },
              { name: 'Prof. David Osei', title: 'Director of Research', org: 'African Energy Institute' },
              { name: 'Fatima Diallo', title: 'Investment Director', org: 'Africa Energy Fund' },
            ].map((speaker, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <CustomCard sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      color: '#FBA91E',
                    }}
                    aria-label={`${speaker.name} profile`}
                  >
                    {speaker.name.charAt(0)}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {speaker.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600, mb: 0.5 }}>
                    {speaker.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {speaker.org}
                  </Typography>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <CustomButton
              component={Link}
              href="/speakers"
              variant="outlined"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(41, 57, 114, 0.08)',
                },
              }}
            >
              View All Speakers
            </CustomButton>
          </Box>
        </Section>

        {/* Sponsors Section */}
        <SponsorsSection />
      </main>
    </>
  );
}
