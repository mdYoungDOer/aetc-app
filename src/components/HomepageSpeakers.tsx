'use client';

import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import CustomButton from '@/components/ui/CustomButton';
import HomepageSpeakerCard from '@/components/HomepageSpeakerCard';
import { speakerService, Speaker } from '@/lib/speakers';

export default function HomepageSpeakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const featuredSpeakers = await speakerService.getFeaturedSpeakers(4);
        setSpeakers(featuredSpeakers);
      } catch (error) {
        console.error('Error fetching speakers:', error);
        // No fallback data - speakers must come from Supabase
        setSpeakers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>Loading speakers...</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {speakers.map((speaker) => (
        <Grid item xs={12} sm={6} md={3} key={speaker.id}>
          <HomepageSpeakerCard
            name={speaker.name}
            title={speaker.title}
            company={speaker.company}
            bio={speaker.bio}
            imageUrl={speaker.image_url}
            linkedinUrl={speaker.linkedin_url}
            twitterUrl={speaker.twitter_url}
            websiteUrl={speaker.website_url}
            isFeatured={speaker.is_featured}
          />
        </Grid>
      ))}
      
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CustomButton
            component={Link}
            href="/speakers"
            variant="outlined"
            endIcon={<ArrowRight size={20} />}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(41, 57, 114, 0.08)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            View All Speakers
          </CustomButton>
        </Box>
      </Grid>
    </Grid>
  );
}
