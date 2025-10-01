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
    name: 'Hon. John Abdulai Jinapor (MP)',
    title: 'Minister of Energy and Green Transition',
    company: 'Ghana',
    bio: 'Leading Ghana\'s energy transition and green development initiatives.',
  },
  {
    name: 'Hon. Dr. Cassiel Ato Baah Forson (MP)',
    title: 'Minister for Finance',
    company: 'Ghana',
    bio: 'Overseeing Ghana\'s economic policies and financial frameworks for energy development.',
  },
  {
    name: 'Senator Heineken Lokpobiri',
    title: 'Hon. Minister of State, Petroleum Resources (Oil)',
    company: 'Nigeria',
    bio: 'Leading Nigeria\'s petroleum sector development and energy policy initiatives.',
  },
  {
    name: 'Hon. Eng. Karim Badawi',
    title: 'Minister of Petroleum and Mineral Resources',
    company: 'Egypt',
    bio: 'Overseeing Egypt\'s petroleum and mineral resources sector development.',
  },
  {
    name: 'Hon. Ekperikpe Ekpo',
    title: 'Minister of State Gas',
    company: 'Ministry of Petroleum Resources, Nigeria',
    bio: 'Leading Nigeria\'s gas sector development and policy implementation.',
  },
  {
    name: 'H.E. Diamantino Petro Azevedo',
    title: 'Minister of Mineral Resources, Oil and Gas',
    company: 'Angola',
    bio: 'Overseeing Angola\'s mineral resources and energy sector development.',
  },
  {
    name: 'Hon. Sangafowa-Coulibaly Mamadou',
    title: 'Minister for Mines, Petroleum and Energy',
    company: 'Ivory Coast',
    bio: 'Leading Ivory Coast\'s mining, petroleum, and energy sector initiatives.',
  },
  {
    name: 'Hon. Minister Tom Alweendo',
    title: 'Minister for Mines and Energy',
    company: 'Namibia',
    bio: 'Overseeing Namibia\'s mining and energy sector development.',
  },
  {
    name: 'Dr. Omar Farouk Ibrahim',
    title: 'Secretary General',
    company: 'APPO',
    bio: 'Leading the African Petroleum Producers Organization\'s strategic initiatives.',
  },
  {
    name: 'NJ Ayuk',
    title: 'Executive Chairman',
    company: 'African Energy Chamber',
    bio: 'Promoting African energy sector development and investment opportunities.',
  },
  {
    name: 'Dr. Thomas Manu',
    title: 'Energy Policy Advisor & Goil - Executive Board Member',
    company: 'Ghana Oil / Board Chair, AETC',
    bio: 'Advising on energy policy and serving as board chair for the Africa Energy Technology Centre.',
  },
  {
    name: 'Emelia Akumah',
    title: 'Founder & President',
    company: 'Africa Energy Technology Centre',
    bio: 'Founder and president of the Africa Energy Technology Centre, driving innovation in African energy.',
  },
  {
    name: 'Damilola Ogunbiyi',
    title: 'CEO',
    company: 'Sustainable Energy for All (SEforALL)',
    bio: 'Leading global initiatives for sustainable energy access and development.',
  },
  {
    name: 'Francesco La Camera',
    title: 'Director General',
    company: 'International Renewable Energy Agency (IRENA)',
    bio: 'Leading global renewable energy policy and implementation strategies.',
  },
  {
    name: 'Victoria Emeafa Hardcastle',
    title: 'CEO',
    company: 'Petroleum Commission, Ghana',
    bio: 'Overseeing Ghana\'s petroleum sector regulation and development.',
  },
  {
    name: 'Edward Abambire Bawa',
    title: 'CEO',
    company: 'Ghana National Petroleum Company (GNPC)',
    bio: 'Leading Ghana\'s national petroleum company operations and strategy.',
  },
  {
    name: 'Justina Nelson',
    title: 'Chief Executive Officer',
    company: 'Minerals Income Investment Fund',
    bio: 'Managing Ghana\'s minerals income investment fund for national development.',
  },
  {
    name: 'Edudzi Tamakloe',
    title: 'Chief Operating Officer',
    company: 'National Petroleum Authority',
    bio: 'Overseeing operations of Ghana\'s National Petroleum Authority.',
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
