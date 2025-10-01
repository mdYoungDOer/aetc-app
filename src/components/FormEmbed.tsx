'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import FormRenderer from './FormRenderer';
import { Form } from '@/types/cms';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface FormEmbedProps {
  slug?: string;
  id?: string;
}

export default function FormEmbed({ slug, id }: FormEmbedProps) {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadForm = async () => {
    try {
      let query = supabase.from('forms').select('*').eq('status', 'active');

      if (id) {
        query = query.eq('id', id);
      } else if (slug) {
        query = query.eq('slug', slug);
      } else {
        setError('Form ID or slug is required');
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await query.single();

      if (fetchError) throw fetchError;
      setForm(data);
    } catch (err: any) {
      console.error('Error loading form:', err);
      setError('Form not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !form) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error">{error || 'Form not found'}</Typography>
      </Box>
    );
  }

  return <FormRenderer form={form} />;
}

