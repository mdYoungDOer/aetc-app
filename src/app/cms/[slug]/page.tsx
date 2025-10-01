'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, CircularProgress } from '@mui/material';
import { getPageBySlug } from '@/lib/cms';
import CMSPageRenderer from '@/components/CMSPageRenderer';
import { Page } from '@/types/cms';

export default function CMSPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPage = async () => {
    try {
      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setError('CMS is not configured. Please set up Supabase environment variables.');
        setLoading(false);
        return;
      }

      const data = await getPageBySlug(slug);
      
      if (!data || data.status !== 'published') {
        setError('Page not found');
      } else {
        setPage(data);
      }
    } catch (err: any) {
      console.error('Error loading page:', err);
      setError('Failed to load page');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            {error === 'Page not found' ? '404' : 'Error'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {error}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!page) {
    return null;
  }

  return <CMSPageRenderer content={page.content_json} />;
}

