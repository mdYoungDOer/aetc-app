import { Metadata } from 'next';
import { Box, Grid, Typography } from '@mui/material';
import { Calendar, MapPin, Users, ArrowRight, Lightbulb, Target, Globe, Network, MessageSquare, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';
import CountdownTimer from '@/components/CountdownTimer';
import SponsorsSection from '@/components/SponsorsSection';
import HomepageSpeakers from '@/components/HomepageSpeakers';
import KeyStatsSection from '@/components/KeyStatsSection';
import HomepageTickets from '@/components/HomepageTickets';
// import { 
//   SankofaIcon, 
//   KentePatternIcon, 
//   BlackStarSquareIcon, 
//   AdomiBridgeIcon,
//   ElephantIcon 
// } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Africa Energy Technology Conference 2026 | Home',
  description: 'Join Africa\'s premier energy technology conference. Explore innovations, network with industry leaders, and shape the future of energy in Africa.',
};

export default function HomePage() {
  // Set conference date - May 26-28, 2026
  const conferenceDate = new Date('2026-05-26T09:00:00');

  return (
    <>
      {/* Hero Section with Countdown */}
        <Hero
          title="Africa Energy Technology Conference 2026"
          subtitle="Innovate, Invest, Implement: Revolutionised Financing for Sustainable Energy Sector Growth in Africa"
          backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
          height="80vh"
          align="center"
        >
        {/* Sankofa Icon with Tagline - DISABLED */}
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, zIndex: 2, position: 'relative' }}>
          <SankofaIcon 
            size={32} 
            sx={{ 
              mr: 2,
              filter: 'drop-shadow(0 0 10px rgba(251, 169, 30, 0.3))',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                filter: 'drop-shadow(0 0 15px rgba(251, 169, 30, 0.5))',
              }
            }} 
          />
          <Typography
            variant="h6"
            sx={{
              color: 'secondary.main',
              fontWeight: 600,
              fontSize: { xs: '1rem', md: '1.2rem' },
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            Innovate, Invest, Implement
          </Typography>
        </Box> */}

        {/* Conference Date and Venue */}
        <Box sx={{ mb: 4, textAlign: 'center', zIndex: 2, position: 'relative' }}>
          <Typography
            variant="h4"
                  sx={{
                    color: 'secondary.main',
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            May 26-28, 2026
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 500,
              mb: 3,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
            }}
          >
            Labadi Beach Hotel, Accra, Ghana
          </Typography>
        </Box>

        {/* Countdown with Adomi Bridge Icon - DISABLED */}
        <Box sx={{ mb: 4 }}>
          <CountdownTimer targetDate={conferenceDate} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', pb: 4, pt: 2 }}>
          <CustomButton
            component={Link}
            href="/registration"
            variant="contained"
            size="large"
                  sx={{
                    backgroundColor: 'secondary.main',
              color: '#000',
              '&:hover': {
                backgroundColor: 'secondary.dark',
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
                borderColor: 'secondary.main',
                backgroundColor: 'rgba(251, 169, 30, 0.1)',
              },
            }}
          >
            View Programme
          </CustomButton>
        </Box>
      </Hero>

      {/* Key Facts/Stats Section */}
      <KeyStatsSection />

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
                    May 26-28, 2026
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
                    Labadi Beach Hotel, Accra, Ghana
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
                icon: Network,
                title: 'Networking Opportunities',
                description:
                  'Connect with key stakeholders, industry leaders, and policymakers from the energy sector. This conference provides an invaluable platform to forge relationships, establish partnerships, and collaborate on initiatives that can drive industry growth and innovation. Networking sessions, social events, and breakout meetings will enable you to build a robust professional network.',
              },
              {
                icon: MessageSquare,
                title: 'Insightful Discussions and Panels',
                description:
                  'Participate in thought-provoking discussions and panels featuring experts and thought leaders in the energy industry. Gain insights into the latest trends, challenges, and solutions in the energy sector. These sessions will offer valuable knowledge that can inform your strategies and decision-making.',
              },
              {
                icon: TrendingUp,
                title: 'Investment and Business Opportunities',
                description:
                  'Explore numerous investment opportunities and engage with financial institutions, investors, and ESG advisors. The conference provides a unique chance to present your projects, discover funding sources, and enter into potential investment partnerships that can help bring your energy initiatives to life.',
              },
              {
                icon: Zap,
                title: 'Innovation and Technology Showcase',
                description:
                  'Discover cutting-edge technologies and innovative solutions that are driving the future of energy. Exhibitions and demonstrations will highlight the latest advancements in energy technology, offering you the chance to see these innovations first-hand and understand how they can be applied to your work or projects.',
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
          <HomepageSpeakers />
        </Section>

        {/* Tickets Section */}
        <HomepageTickets />

        {/* Sponsors Section */}
        <SponsorsSection />
      </main>
    </>
  );
}
