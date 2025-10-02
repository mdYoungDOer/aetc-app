'use client';

import { Box, Grid, Typography, Tabs, Tab, ImageList, ImageListItem } from '@mui/material';
import { useState } from 'react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Section from '@/components/ui/Section';
import Image from 'next/image';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`gallery-tabpanel-${index}`}
      aria-labelledby={`gallery-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Gallery2025Page() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const galleryCategories = [
    {
      label: 'Africa Energy Rave',
      images: [
        { src: '/images-optimized/aetc-2025-pics-1-1.webp', title: 'Energy Rave Opening' },
        { src: '/images-optimized/aetc-2025-pics-1-2.webp', title: 'Networking Session' },
        { src: '/images-optimized/aetc-2025-pics-1-3.webp', title: 'Industry Leaders' },
        { src: '/images-optimized/aetc-2025-pics-1-4.webp', title: 'Technology Showcase' },
        { src: '/images-optimized/aetc-2025-pics-1-5.webp', title: 'Panel Discussion' },
        { src: '/images-optimized/aetc-2025-pics-1-6.webp', title: 'Networking Break' }
      ]
    },
    {
      label: 'Gala Dinner Night',
      images: [
        { src: '/images-optimized/aetc-2025-pics-1-7.webp', title: 'Gala Dinner Setup' },
        { src: '/images-optimized/aetc-2025-pics-1-8.webp', title: 'Awards Ceremony' },
        { src: '/images-optimized/aetc-2025-pics-1-9.webp', title: 'Keynote Speaker' },
        { src: '/images-optimized/aetc-2025-pics-1-10.webp', title: 'Networking Dinner' },
        { src: '/images-optimized/aetc-2025-pics-1-11.webp', title: 'Cultural Performance' },
        { src: '/images-optimized/aetc-2025-pics-1-12.webp', title: 'Closing Ceremony' }
      ]
    },
    {
      label: 'Day 1 Photo Gallery',
      images: [
        { src: '/images-optimized/aetc-2025-pics-1-13.webp', title: 'Opening Ceremony' },
        { src: '/images-optimized/aetc-2025-pics-1-14.webp', title: 'Welcome Address' },
        { src: '/images-optimized/aetc-2025-pics-1-15.webp', title: 'Keynote Presentation' },
        { src: '/images-optimized/aetc-2025-pics-1-16.webp', title: 'Panel Discussion' },
        { src: '/images-optimized/aetc-2025-pics-1-17.webp', title: 'Q&A Session' },
        { src: '/images-optimized/aetc-2025-pics-1-18.webp', title: 'Networking Break' }
      ]
    },
    {
      label: 'Day 2 Photo Gallery',
      images: [
        { src: '/images-optimized/aetc-2025-pics-1-19.webp', title: 'Morning Session' },
        { src: '/images-optimized/aetc-2025-pics-1-20.webp', title: 'Technical Workshop' },
        { src: '/images-optimized/aetc-2025-pics-1-21.webp', title: 'Industry Roundtable' },
        { src: '/images-optimized/aetc-2025-pics-1-22.webp', title: 'Innovation Showcase' },
        { src: '/images-optimized/aetc-2025-pics-1-23.webp', title: 'Networking Lunch' },
        { src: '/images-optimized/aetc-2025-pics-1-24.webp', title: 'Afternoon Sessions' }
      ]
    },
    {
      label: 'Day 3 Photo Gallery',
      images: [
        { src: '/images-optimized/aetc-2025-pics-1-25.webp', title: 'Final Day Opening' },
        { src: '/images-optimized/aetc-2025-pics-1-26.webp', title: 'Closing Keynote' },
        { src: '/images-optimized/aetc-2025-pics-1-27.webp', title: 'Awards Presentation' },
        { src: '/images-optimized/aetc-2025-pics-1-28.webp', title: 'Group Photo' },
        { src: '/images-optimized/aetc-2025-pics-1-29.webp', title: 'Farewell Reception' },
        { src: '/images-optimized/aetc-2025-pics-1-30.webp', title: 'Conference Conclusion' }
      ]
    },
    {
      label: 'Breakfast Meeting Photo Gallery',
      images: [
        { src: '/images-optimized/aetc-2025-pics-1-31.webp', title: 'Breakfast Setup' },
        { src: '/images-optimized/aetc-2025-pics-1-32.webp', title: 'Morning Networking' },
        { src: '/images-optimized/aetc-2025-pics-1-33.webp', title: 'Executive Roundtable' },
        { src: '/images-optimized/aetc-2025-pics-1-34.webp', title: 'Industry Leaders' },
        { src: '/images-optimized/aetc-2025-pics-1-35.webp', title: 'Strategic Discussions' },
        { src: '/images-optimized/aetc-2025-pics-1-36.webp', title: 'Closing Remarks' }
      ]
    }
  ];

  return (
    <>
      <PageBreadcrumb
        title="2025 Photo Gallery"
        subtitle="Relive the moments from AETC 2025"
        backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
        breadcrumbItems={[
          { label: 'Media', href: '#' },
          { label: '2025 Gallery', href: '/gallery/2025' }
        ]}
      />

      <main>
        <Section id="gallery" title="AETC 2025 Photo Gallery" subtitle="Capturing the energy and innovation" py={10}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
              {galleryCategories.map((category, index) => (
                <Tab key={index} label={category.label} />
              ))}
            </Tabs>
          </Box>

          {galleryCategories.map((category, index) => (
            <TabPanel key={index} value={value} index={index}>
              <ImageList variant="masonry" cols={3} gap={8}>
                {category.images.map((image, imageIndex) => (
                  <ImageListItem key={imageIndex}>
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={400}
                      height={300}
                      style={{
                        objectFit: 'cover',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </TabPanel>
          ))}
        </Section>

        <Section id="gallery-stats" title="Gallery Highlights" subtitle="By the numbers" backgroundColor="paper" py={10}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                  500+
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  Photos Captured
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                  6
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  Event Categories
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                  3
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  Conference Days
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                  1000+
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  Attendees Captured
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Section>
      </main>
    </>
  );
}
