import { Metadata } from 'next';
import { Box, Grid, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import SpeakersPageContent from '@/components/SpeakersPageContent';
// import { DwennimmenIcon, OsuCastleIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Speakers | Africa Energy Technology Conference 2026',
  description: 'Meet our distinguished speakers and industry experts sharing insights at AETC 2026.',
};


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
          <SpeakersPageContent />
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
