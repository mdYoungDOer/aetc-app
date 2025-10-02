import { Metadata } from 'next';
import { Box, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check, Users, Globe, TrendingUp, Lightbulb, Target } from 'lucide-react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';

export const metadata: Metadata = {
  title: 'Why Attend AETC 2026 | Africa Energy Technology Conference',
  description: 'Discover why AETC 2026 is the must-attend event for energy professionals, investors, and policymakers in Africa.',
};

export default function WhyAttendPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Networking Opportunities',
      description: 'Connect with key stakeholders, industry leaders, and policymakers from the energy sector.',
      points: [
        'Build relationships with industry leaders',
        'Establish partnerships and collaborations',
        'Access to exclusive networking sessions',
        'Connect with potential investors and partners'
      ]
    },
    {
      icon: Lightbulb,
      title: 'Insightful Discussions',
      description: 'Participate in thought-provoking discussions and panels featuring energy industry experts.',
      points: [
        'Gain insights into latest energy trends',
        'Learn about innovative solutions',
        'Understand market challenges and opportunities',
        'Access expert knowledge and best practices'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Investment Opportunities',
      description: 'Explore numerous investment opportunities and engage with financial institutions and investors.',
      points: [
        'Present your projects to investors',
        'Discover funding sources and opportunities',
        'Engage with ESG advisors',
        'Access to green finance mechanisms'
      ]
    },
    {
      icon: Target,
      title: 'Innovation Showcase',
      description: 'Discover cutting-edge technologies and innovative solutions driving the future of energy.',
      points: [
        'See latest energy technologies first-hand',
        'Understand practical applications',
        'Access to technology demonstrations',
        'Learn about implementation strategies'
      ]
    }
  ];

  const stats = [
    { number: '3000+', label: 'Expected Attendees' },
    { number: '200+', label: 'Industry Speakers' },
    { number: '50+', label: 'Technical Sessions' },
    { number: '45+', label: 'Countries Represented' }
  ];

  return (
    <>
      <PageBreadcrumb
        title="Why Attend AETC 2026"
        subtitle="Join Africa's premier energy technology gathering"
        backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
      />

      <main>
        <Section id="benefits" title="Why Attend AETC 2026" subtitle="Four compelling reasons to join us" py={10}>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <CustomCard sx={{ height: '100%' }}>
                  <Box sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          backgroundColor: 'primary.main',
                          borderRadius: '50%',
                          width: 64,
                          height: 64,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                        }}
                      >
                        <benefit.icon size={32} color="#FBA91E" />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {benefit.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                      {benefit.description}
                    </Typography>
                    <List dense>
                      {benefit.points.map((point, pointIndex) => (
                        <ListItem key={pointIndex} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Check size={20} color="#78C044" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={point}
                            primaryTypographyProps={{ fontSize: '0.9rem' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section id="conference-stats" title="Conference Impact" subtitle="By the numbers" backgroundColor="paper" py={10}>
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: 'primary.main',
                      mb: 1,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Section>
      </main>
    </>
  );
}
