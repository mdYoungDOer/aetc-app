import { Metadata } from 'next';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import { Lightbulb, Target, Globe, Zap, Users, TrendingUp } from 'lucide-react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';

export const metadata: Metadata = {
  title: 'Key Topics | Africa Energy Technology Conference 2026',
  description: 'Explore the key topics and themes that will be covered at AETC 2026, focusing on Africa\'s energy transformation.',
};

export default function KeyTopicsPage() {
  const topics = [
    {
      icon: Lightbulb,
      title: 'Renewable Energy Innovation',
      description: 'Latest developments in solar, wind, hydro, and other renewable energy technologies tailored for African markets.',
      subtopics: ['Solar Technology', 'Wind Energy', 'Hydroelectric Power', 'Geothermal Energy']
    },
    {
      icon: Target,
      title: 'Energy Access & Electrification',
      description: 'Strategies and technologies for expanding energy access to underserved communities across Africa.',
      subtopics: ['Rural Electrification', 'Mini-grids', 'Off-grid Solutions', 'Energy Storage']
    },
    {
      icon: Globe,
      title: 'Climate Change & Sustainability',
      description: 'Addressing climate challenges through sustainable energy solutions and green technology adoption.',
      subtopics: ['Carbon Reduction', 'Green Finance', 'ESG Integration', 'Climate Adaptation']
    },
    {
      icon: Zap,
      title: 'Smart Grid & Digital Energy',
      description: 'Digital transformation of energy systems, smart grids, and IoT applications in energy management.',
      subtopics: ['Smart Grids', 'IoT Applications', 'Digital Twins', 'Energy Management Systems']
    },
    {
      icon: Users,
      title: 'Policy & Regulation',
      description: 'Energy policy frameworks, regulatory environments, and governance structures for sustainable energy development.',
      subtopics: ['Energy Policy', 'Regulatory Frameworks', 'Public-Private Partnerships', 'International Cooperation']
    },
    {
      icon: TrendingUp,
      title: 'Investment & Finance',
      description: 'Financing mechanisms, investment opportunities, and funding strategies for energy projects in Africa.',
      subtopics: ['Green Finance', 'Investment Opportunities', 'Risk Management', 'Public-Private Partnerships']
    }
  ];

  return (
    <>
      <PageBreadcrumb
        title="Key Topics"
        subtitle="Exploring critical themes in Africa's energy transformation"
        backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
        breadcrumbItems={[
          { label: 'About AETC', href: '/about' },
          { label: 'Key Topics', href: '/about/key-topics' }
        ]}
      />

      <main>
        <Section id="key-topics" title="Conference Key Topics" subtitle="Comprehensive coverage of Africa's energy landscape" py={10}>
          <Grid container spacing={4}>
            {topics.map((topic, index) => (
              <Grid item xs={12} md={6} key={index}>
                <CustomCard sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
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
                        <topic.icon size={32} color="#FBA91E" />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {topic.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                      {topic.description}
                    </Typography>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                        Subtopics:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {topic.subtopics.map((subtopic, subIndex) => (
                          <Box
                            key={subIndex}
                            sx={{
                              backgroundColor: 'secondary.main',
                              color: '#000',
                              px: 2,
                              py: 0.5,
                              borderRadius: '16px',
                              fontSize: '0.875rem',
                              fontWeight: 500,
                            }}
                          >
                            {subtopic}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>
      </main>
    </>
  );
}
