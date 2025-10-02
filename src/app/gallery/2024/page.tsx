'use client';

import { Box, Grid, Typography, ImageList, ImageListItem } from '@mui/material';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Section from '@/components/ui/Section';
import Image from 'next/image';

// Metadata removed for client component

export default function Gallery2024Page() {
  const galleryImages = [
    { src: '/images-optimized/aetc-2025-pics-1-1.webp', title: 'Opening Ceremony 2024' },
    { src: '/images-optimized/aetc-2025-pics-1-2.webp', title: 'Keynote Presentation' },
    { src: '/images-optimized/aetc-2025-pics-1-3.webp', title: 'Panel Discussion' },
    { src: '/images-optimized/aetc-2025-pics-1-4.webp', title: 'Networking Session' },
    { src: '/images-optimized/aetc-2025-pics-1-5.webp', title: 'Technology Showcase' },
    { src: '/images-optimized/aetc-2025-pics-1-6.webp', title: 'Industry Leaders' },
    { src: '/images-optimized/aetc-2025-pics-1-7.webp', title: 'Awards Ceremony' },
    { src: '/images-optimized/aetc-2025-pics-1-8.webp', title: 'Gala Dinner' },
    { src: '/images-optimized/aetc-2025-pics-1-9.webp', title: 'Cultural Performance' },
    { src: '/images-optimized/aetc-2025-pics-1-10.webp', title: 'Closing Ceremony' },
    { src: '/images-optimized/aetc-2025-pics-1-11.webp', title: 'Group Photo' },
    { src: '/images-optimized/aetc-2025-pics-1-12.webp', title: 'Networking Break' },
    { src: '/images-optimized/aetc-2025-pics-1-13.webp', title: 'Workshop Session' },
    { src: '/images-optimized/aetc-2025-pics-1-14.webp', title: 'Innovation Hub' },
    { src: '/images-optimized/aetc-2025-pics-1-15.webp', title: 'Startup Pitch' },
    { src: '/images-optimized/aetc-2025-pics-1-16.webp', title: 'Exhibition Hall' },
    { src: '/images-optimized/aetc-2025-pics-1-17.webp', title: 'Roundtable Discussion' },
    { src: '/images-optimized/aetc-2025-pics-1-18.webp', title: 'Coffee Break' },
    { src: '/images-optimized/aetc-2025-pics-1-19.webp', title: 'Technical Session' },
    { src: '/images-optimized/aetc-2025-pics-1-20.webp', title: 'Q&A Session' },
    { src: '/images-optimized/aetc-2025-pics-1-21.webp', title: 'International Delegates' },
    { src: '/images-optimized/aetc-2025-pics-1-22.webp', title: 'Media Coverage' },
    { src: '/images-optimized/aetc-2025-pics-1-23.webp', title: 'Closing Remarks' },
    { src: '/images-optimized/aetc-2025-pics-1-24.webp', title: 'Farewell Reception' }
  ];

  return (
    <>
      <PageBreadcrumb
        title="2024 Photo Gallery"
        subtitle="Memorable moments from AETC 2024"
        backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
        breadcrumbItems={[
          { label: 'Media', href: '#' },
          { label: '2024 Gallery', href: '/gallery/2024' }
        ]}
      />

      <main>
        <Section id="gallery" title="AETC 2024 Photo Gallery" subtitle="Capturing the energy and innovation of 2024" py={10}>
          <ImageList variant="masonry" cols={4} gap={8}>
            {galleryImages.map((image, index) => (
              <ImageListItem key={index}>
                <Image
                  src={image.src}
                  alt={image.title}
                  width={300}
                  height={200}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Section>

        <Section id="gallery-stats" title="2024 Conference Highlights" subtitle="A successful year in numbers" backgroundColor="paper" py={10}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                  2,500+
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  Attendees
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                  150+
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  Speakers
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                  40+
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  Countries
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                  50+
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  Sessions
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Section>

        <Section id="testimonials" title="What People Said" subtitle="Feedback from AETC 2024 attendees" py={10}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2, lineHeight: 1.7 }}>
                  "AETC 2024 was an exceptional platform for networking and learning about the latest developments in Africa's energy sector."
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Dr. Sarah Johnson
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Energy Consultant, South Africa
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2, lineHeight: 1.7 }}>
                  "The quality of speakers and the depth of discussions were outstanding. This is a must-attend event for anyone in the energy industry."
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Michael Chen
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Investment Director, Nigeria
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2, lineHeight: 1.7 }}>
                  "AETC provided the perfect opportunity to showcase our technology and connect with potential partners across the continent."
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Amina Hassan
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  CEO, SolarTech Kenya
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Section>
      </main>
    </>
  );
}
