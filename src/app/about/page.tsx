import { Metadata } from 'next';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { Target, Lightbulb, Globe, Zap, Users, TrendingUp } from 'lucide-react';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import PageBreadcrumb from '@/components/PageBreadcrumb';

export const metadata: Metadata = {
  title: 'About the Conference | Africa Energy Technology Conference 2026',
  description: 'Learn about the Africa Energy Technology Conference objectives, themes, and vision for advancing energy innovation across the continent.',
};

export default function AboutPage() {
  return (
    <>
      <PageBreadcrumb 
        title="About the Conference"
        subtitle="Driving sustainable energy solutions across Africa"
        backgroundImage="/Images/AETC 2025 PICS 1-24.JPG"
      />

      <main>
        {/* Overview Section */}
        <Section id="overview" title="Conference Overview" py={10}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                Africa's Premier Energy Technology Event
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
                The Africa Energy Technology Conference is a premier gathering of energy professionals,
                innovators, and policymakers dedicated to advancing sustainable energy solutions across
                the African continent.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
                Our conference provides a platform for knowledge exchange, networking, and collaboration,
                fostering partnerships that drive meaningful change in Africa's energy landscape.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                With a focus on innovation, sustainability, and accessibility, AETC 2026 brings together
                stakeholders from across the energy value chain to chart a path toward a cleaner, more
                reliable energy future for all Africans.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: '450px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                }}
              >
                <Image
                  src="/Images/AETC 2025 PICS 1-57.JPG"
                  alt="Conference overview"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </Box>
            </Grid>
          </Grid>
        </Section>

        {/* Themes Section */}
        <Section
          id="themes"
          title="Conference Themes"
          subtitle="Exploring critical areas shaping Africa's energy future"
          backgroundColor="paper"
        >
          <Grid container spacing={4}>
            {[
              {
                icon: Zap,
                title: 'Energy Transition',
                description: 'Accelerating the shift from fossil fuels to renewable energy sources across Africa.',
                color: 'primary' as const,
              },
              {
                icon: Lightbulb,
                title: 'Innovation & Technology',
                description: 'Exploring solar, wind, and hydroelectric solutions tailored for African markets.',
                color: 'secondary' as const,
              },
              {
                icon: Globe,
                title: 'Energy Access & Equity',
                description: 'Addressing challenges in bringing reliable energy to underserved communities.',
                color: 'success' as const,
              },
              {
                icon: Target,
                title: 'Policy & Regulation',
                description: 'Creating frameworks that attract investment and support sustainable growth.',
                color: 'primary' as const,
              },
              {
                icon: TrendingUp,
                title: 'Investment & Finance',
                description: 'Connecting projects with funding sources and exploring innovative financing models.',
                color: 'secondary' as const,
              },
              {
                icon: Users,
                title: 'Capacity Building',
                description: 'Developing local expertise and skills for the evolving energy sector.',
                color: 'success' as const,
              },
            ].map((theme, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CustomCard
                  accentColor={theme.color}
                  sx={{ height: '100%' }}
                >
                  <Box sx={{ p: 4 }}>
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
                      <theme.icon size={32} color="#FBA91E" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                      {theme.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {theme.description}
                    </Typography>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Objectives Section */}
        <Section
          id="objectives"
          title="Our Objectives"
          subtitle="What we aim to achieve together"
          py={10}
        >
          <Grid container spacing={3}>
            {[
              {
                title: 'Foster Public-Private Collaboration',
                description: 'Bridge the gap between government initiatives and private sector innovation to accelerate energy projects.',
              },
              {
                title: 'Showcase Innovative Solutions',
                description: 'Highlight cutting-edge energy technologies and best practices from across Africa and the globe.',
              },
              {
                title: 'Promote Sustainable Policies',
                description: 'Advocate for inclusive energy policies that prioritize both economic growth and environmental protection.',
              },
              {
                title: 'Build Technical Capacity',
                description: 'Provide training and knowledge-sharing opportunities to develop local energy expertise.',
              },
              {
                title: 'Create Networking Opportunities',
                description: 'Connect industry stakeholders, investors, and innovators to forge lasting partnerships.',
              },
              {
                title: 'Advance Energy Transition',
                description: 'Position Africa as a leader in the global shift toward renewable and sustainable energy.',
              },
            ].map((objective, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    p: 3,
                    borderRadius: '8px',
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#78C044',
                      boxShadow: '0 4px 12px rgba(120, 192, 68, 0.15)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'secondary.main',
                      mt: 1,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {objective.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {objective.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Vision Statement */}
        <Section backgroundColor="dark" py={8}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: '#FFFFFF',
              }}
            >
              Our Vision
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.87)',
                lineHeight: 1.8,
                fontWeight: 400,
                fontStyle: 'italic',
              }}
            >
              "To be Africa's leading platform for energy technology innovation, collaboration, and
              transformation, driving sustainable development and universal energy access across the
              continent."
            </Typography>
          </Box>
        </Section>
      </main>
    </>
  );
}
