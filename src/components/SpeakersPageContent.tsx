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
        // Fallback to static data if database fails
        setSpeakers([
          {
            id: '1',
            name: 'Hon. John Abdulai Jinapor (MP)',
            title: 'Minister of Energy and Green Transition',
            company: 'Ghana',
            bio: 'Leading Ghana\'s energy transition and green development initiatives.',
            featured: true,
            order_index: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            // Legacy fields for backward compatibility
            is_featured: true,
            is_active: true,
            display_order: 1,
          },
          {
            id: '2',
            name: 'Hon. Dr. Cassiel Ato Baah Forson (MP)',
            title: 'Minister for Finance',
            company: 'Ghana',
            bio: 'Overseeing Ghana\'s economic policies and financial frameworks for energy development.',
            featured: true,
            order_index: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            // Legacy fields for backward compatibility
            is_featured: true,
            is_active: true,
            display_order: 2,
          },
          {
            id: '3',
            name: 'Senator Heineken Lokpobiri',
            title: 'Hon. Minister of State, Petroleum Resources (Oil)',
            company: 'Nigeria',
            bio: 'Leading Nigeria\'s petroleum sector development and energy policy initiatives.',
            featured: true,
            order_index: 3,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            // Legacy fields for backward compatibility
            is_featured: true,
            is_active: true,
            display_order: 3,
          },
          {
            id: '4',
            name: 'Hon. Eng. Karim Badawi',
            title: 'Minister of Petroleum and Mineral Resources',
            company: 'Egypt',
            bio: 'Overseeing Egypt\'s petroleum and mineral resources sector development.',
            featured: true,
            order_index: 4,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            // Legacy fields for backward compatibility
            is_featured: true,
            is_active: true,
            display_order: 4,
          },
          {
            id: '5',
            name: 'Hon. Ekperikpe Ekpo',
            title: 'Minister of State Gas',
            company: 'Ministry of Petroleum Resources, Nigeria',
            bio: 'Leading Nigeria\'s gas sector development and policy implementation.',
            featured: true,
            order_index: 5,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            // Legacy fields for backward compatibility
            is_featured: true,
            is_active: true,
            display_order: 5,
          },
          {
            id: '6',
            name: 'H.E. Diamantino Petro Azevedo',
            title: 'Minister of Mineral Resources, Oil and Gas',
            company: 'Angola',
            bio: 'Overseeing Angola\'s mineral resources and energy sector development.',
            featured: true,
            order_index: 6,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            // Legacy fields for backward compatibility
            is_featured: true,
            is_active: true,
            display_order: 6,
          },
        ]);
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
