'use client';

import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Alert, CircularProgress } from '@mui/material';
import SpeakerCard from '@/components/SpeakerCard';
import { speakerService, Speaker } from '@/lib/speakers';

export default function SpeakersPageContent() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const allSpeakers = await speakerService.getSpeakers({
          active: true,
          orderBy: 'order_index',
          orderDirection: 'asc',
        });
        setSpeakers(allSpeakers);
      } catch (err: any) {
        setError(err.message);
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 4 }}>
        {error}
      </Alert>
    );
  }

  if (speakers.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No speakers available at the moment.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {speakers.map((speaker) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={speaker.id}>
          <SpeakerCard
            name={speaker.name}
            title={speaker.title}
            company={speaker.company}
            bio={speaker.bio}
            imageUrl={speaker.image_url}
            linkedinUrl={speaker.linkedin_url}
            twitterUrl={speaker.twitter_url}
          />
        </Grid>
      ))}
    </Grid>
  );
}
