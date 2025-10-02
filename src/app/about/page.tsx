import { Metadata } from 'next';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { Target, Lightbulb, Globe, Zap, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import SponsorsSection from '@/components/SponsorsSection';
import KeyStatsSection from '@/components/KeyStatsSection';
// import { GyeNyameIcon, DwennimmenIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'About the Conference | Africa Energy Technology Conference 2026',
  description: 'Learn about the Africa Energy Technology Conference objectives, themes, and vision for advancing energy innovation across the continent.',
};

export default function AboutPage() {
  return (
    <>
        <PageBreadcrumb
          title="About AETC 2026"
          subtitle="Innovate, Invest, Implement: Revolutionised Financing for Sustainable Energy Sector Growth in Africa"
          backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
        />

      <main>
        {/* Overview Section */}
        <Section id="overview" title="Conference Overview" py={10}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                About AETC 2026
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
                The Africa Energy Technology Conference is set to return on May 26-28, 2026, with a renewed focus on innovation, investment, and implementation. Building on the success of our inaugural event, this sophomore conference and exhibition will continue to be Africa's premiere energy technology exhibition and networking forum.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
                Hosted once again in Ghana by the AFRICA ENERGY TECHNOLOGY CENTRE (AETC), this three-day conference will attract government representatives, policymakers, energy technology leaders, and industry heavyweights from around the globe, providing unparalleled opportunities to explore investment and sponsorship prospects.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                The conference aims to revolutionize the financing landscape for energy technology innovation and energy projects in Africa, ensuring that investments are not only profitable but also socially and environmentally responsible.
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
                  src="/images-optimized/aetc-2025-pics-1-57.webp"
                  alt="Conference overview"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  quality={85}
                  priority={false}
                />
              </Box>
            </Grid>
          </Grid>
        </Section>

        {/* Key Facts/Stats Section */}
        <KeyStatsSection />

        {/* Key Topics Section */}
        <Section
          id="themes"
          title="Key Topics"
          subtitle="AETC 2026 is set to drive transformative conversations around Africa's energy future"
          backgroundColor="paper"
        >
          <Grid container spacing={4}>
            {[
              {
                icon: Lightbulb,
                title: 'Innovation in Energy Technology',
                description: 'Advancements in renewable energy sources, smart grids, AI and Big Data in energy optimization, and emerging energy storage solutions.',
                color: 'primary' as const,
              },
              {
                icon: Zap,
                title: 'Subsea & Oil & Gas',
                description: 'Unlocking offshore potential, sustainable innovation, investment & infrastructure, safety & security, and Africa\'s energy future.',
                color: 'secondary' as const,
              },
              {
                icon: TrendingUp,
                title: 'Financing & Investment',
                description: 'Innovative financing models, risk mitigation, investment incentives, and policy frameworks to attract investment.',
                color: 'success' as const,
              },
              {
                icon: Globe,
                title: 'Renewable Energy Technologies',
                description: 'Solar, wind, hydropower, bioenergy, and ocean energy technologies applicable to Africa for sustainable energy solutions.',
                color: 'primary' as const,
              },
              {
                icon: Target,
                title: 'Cross-Cutting Themes',
                description: 'Broader themes that intersect with the energy sector, including collaboration and policy integration.',
                color: 'secondary' as const,
              },
              {
                icon: Users,
                title: 'Implementation Focus',
                description: 'Practical execution strategies, project implementation best practices, and ensuring effective delivery of energy projects.',
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

        {/* Founder's Message */}
        <Section backgroundColor="paper" py={8}>
          <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 4,
                color: 'primary.main',
              }}
            >
              Message from the Founder & President (AETC)
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
                mb: 3,
                fontSize: '1.1rem',
              }}
            >
              "Dear Esteemed Industry Colleagues,
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
                mb: 3,
                fontSize: '1.1rem',
              }}
            >
              It is with great anticipation and excitement that I invite you to join us for the Africa Energy Technology Conference 2026 (AETC), a historic gathering that represents a bold step forward in Africa's energy journey.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
                mb: 3,
                fontSize: '1.1rem',
              }}
            >
              Following the incredible success of our inaugural event, this sophomore conference and exhibition builds on the momentum to explore the critical theme: "Innovate, Invest, Implement: Revolutionised Financing for Sustainable Energy Sector Growth in Africa." In a world where energy is the foundation of economic development, Africa stands at the crossroads of unparalleled opportunity.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
                mb: 4,
                fontSize: '1.1rem',
              }}
            >
              What sets this conference and exhibition apart is not just its focus on energy technology but also the unique vision behind it. AETC is the first energy technology-driven conference in Africa spearheaded by an African woman. This distinction reflects our commitment to inclusivity and the empowerment of voices that have been too often excluded from the global energy dialogue."
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                fontStyle: 'italic',
              }}
            >
              — Emelia Akumah, Founder & President, Africa Energy Technology Centre
            </Typography>
          </Box>
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

        {/* Sponsors Section */}
        <SponsorsSection 
          title="Our Trusted Partners"
          subtitle="Organizations supporting Africa's energy transformation"
        />
      </main>
    </>
  );
}
