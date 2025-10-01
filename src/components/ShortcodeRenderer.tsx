'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import FormRenderer from './FormRenderer';
import { getFormBySlug } from '@/lib/cms';
import { Form } from '@/types/cms';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ShortcodeRendererProps {
  shortcode: string;
}

export default function ShortcodeRenderer({ shortcode }: ShortcodeRendererProps) {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadShortcodeContent = async () => {
    // Parse form shortcode: [form id="form-id"]
    const formMatch = shortcode.match(/\[form\s+id="([^"]+)"\]/);
    
    if (formMatch) {
      const formId = formMatch[1];
      try {
        const { data, error } = await supabase
          .from('forms')
          .select('*')
          .eq('id', formId)
          .eq('status', 'active')
          .single();

        if (error) throw error;
        setForm(data);
      } catch (err: any) {
        console.error('Error loading form:', err);
        setError('Form not found');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Invalid shortcode');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShortcodeContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortcode]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (form) {
    return <FormRenderer form={form} />;
  }

  return null;
}

