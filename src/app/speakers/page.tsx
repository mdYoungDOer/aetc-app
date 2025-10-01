import { Metadata } from 'next';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import { Linkedin, Twitter, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';
import PageBreadcrumb from '@/components/PageBreadcrumb';

export const metadata: Metadata = {
  title: 'Speakers | Africa Energy Technology Conference 2026',
  description: 'Meet our distinguished speakers and industry experts sharing insights at AETC 2026.',
};

const speakers = [
  {
    name: 'Dr. Kwame Mensah',
    title: 'Chief Energy Officer',
    company: 'Ghana Energy Commission',
    bio: 'Leading expert in renewable energy policy with 20+ years of experience shaping Africa\'s energy landscape.',
  },
  {
    name: 'Amina Hassan',
    title: 'CEO',
    company: 'Solar Innovations Africa',
    bio: 'Pioneer in solar technology solutions for rural African communities, bringing light to 500,000+ homes.',
  },
  {
    name: 'Prof. David Osei',
    title: 'Director of Research',
    company: 'African Energy Institute',
    bio: 'Renowned researcher in sustainable energy systems and smart grid integration across the continent.',
  },
  {
    name: 'Fatima Diallo',
    title: 'Investment Director',
    company: 'Africa Energy Fund',
    bio: 'Expert in energy project financing with $2B+ in successful infrastructure investments.',
  },
  {
    name: 'Eng. Michael Adeyemi',
    title: 'Chief Technical Officer',
    company: 'West Africa Power Pool',
    bio: 'Specialist in regional power systems integration and cross-border electricity trade.',
  },
  {
    name: 'Dr. Sarah Kariuki',
    title: 'Climate Policy Advisor',
    company: 'African Union Commission',
    bio: 'Leading voice on climate change mitigation and clean energy transition policies.',
  },
  {
    name: 'John Mwangi',
    title: 'Founder & CEO',
    company: 'Green Tech Ventures',
    bio: 'Serial entrepreneur driving innovation in off-grid solar and mini-grid solutions.',
  },
  {
    name: 'Dr. Zainab Mohammed',
    title: 'Senior Researcher',
    company: 'Energy Research Centre',
    bio: 'Expert in energy storage technologies and battery systems for renewable integration.',
  },
];

export default function SpeakersPage() {
  return (
    <>
      <PageBreadcrumb 
        title="Our Speakers"
        subtitle="Learn from leading experts in energy technology and innovation"
        backgroundImage="/Images/AETC 2025 PICS 1-77 (1).JPG"
      />

      <main>
        {/* Speakers Grid */}
        <Section
          id="speakers-grid"
          title="Featured Speakers"
          subtitle="Industry leaders sharing insights and expertise"
          py={10}
        >
          <Grid container spacing={4}>
            {speakers.map((speaker, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <CustomCard
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                  }}
                >
                  <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 2,
                        backgroundColor: 'primary.main',
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: '#FBA91E',
                      }}
                      aria-label={`${speaker.name} profile`}
                    >
                      {speaker.name.split(' ').map(n => n.charAt(0)).join('')}
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
                      sx={{
                        color: 'text.secondary',
                        mb: 2,
                        lineHeight: 1.6,
                        flexGrow: 1,
                      }}
                    >
                      {speaker.bio}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
                      <Box
                        component="a"
                        href="#"
                        aria-label={`${speaker.name} LinkedIn`}
                        sx={{
                          color: 'text.secondary',
                          transition: 'color 0.3s',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        <Linkedin size={18} />
                      </Box>
                      <Box
                        component="a"
                        href="#"
                        aria-label={`${speaker.name} Twitter`}
                        sx={{
                          color: 'text.secondary',
                          transition: 'color 0.3s',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        <Twitter size={18} />
                      </Box>
                    </Box>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Call for Speakers */}
        <Section backgroundColor="paper" py={10}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 1 }}
              >
                Join Our Speakers
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                Share Your Expertise at AETC 2026
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
                We're looking for innovative voices to share their expertise on energy technology,
                policy, and innovation in Africa.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                Whether you're a researcher, entrepreneur, policymaker, or industry leader, we want to
                hear from you. Submit your proposal to speak at one of our technical sessions or
                panel discussions.
              </Typography>
              <CustomButton
                component={Link}
                href="/contact"
                variant="contained"
                sx={{
                  backgroundColor: 'primary.main',
                  color: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#1f2a5a',
                  },
                }}
              >
                Submit Speaker Proposal <ArrowRight size={18} style={{ marginLeft: 8 }} />
              </CustomButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCard accentColor="success" sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  Speaking Opportunities
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    'Keynote presentations',
                    'Panel discussions',
                    'Technical workshops',
                    'Poster presentations',
                    'Startup pitch sessions',
                  ].map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: 'success.main',
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body1">{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Section>
      </main>
    </>
  );
}
