'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { Save, Plus, Trash2, ArrowLeft, MoveUp, MoveDown } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { updateForm } from '@/lib/cms';
import { FormField } from '@/types/cms';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function FormEditor() {
  const params = useParams();
  const router = useRouter();
  const formId = params.id as string;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadForm();
  }, [formId]);

  const loadForm = async () => {
    try {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .eq('id', formId)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setSlug(data.slug);
      setFields(data.fields_json || []);
    } catch (error) {
      console.error('Error loading form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateForm(formId, {
        title,
        slug,
        fields_json: fields,
      });
      alert('Form saved successfully!');
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Error saving form');
    } finally {
      setSaving(false);
    }
  };

  const addField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: 'New Field',
      name: `field_${fields.length + 1}`,
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)));
  };

  const deleteField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= fields.length) return;

    const newFields = [...fields];
    [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
    setFields(newFields);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            href="/admin/forms"
            startIcon={<ArrowLeft size={18} />}
            variant="outlined"
          >
            Back
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Edit Form
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Save size={18} />}
          onClick={handleSave}
          disabled={saving}
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: '#1f2a5a' },
          }}
        >
          {saving ? 'Saving...' : 'Save Form'}
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Form Settings
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Form Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <TextField label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} fullWidth />
        </Box>
        <Box sx={{ mt: 2, p: 2, backgroundColor: 'background.default', borderRadius: '8px' }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Shortcode:
          </Typography>
          <code style={{ fontSize: '0.875rem' }}>[form id="{formId}"]</code>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
            Copy this shortcode and paste it into any text block to embed this form
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Form Fields
          </Typography>
          <Button variant="outlined" startIcon={<Plus size={18} />} onClick={addField}>
            Add Field
          </Button>
        </Box>

        {fields.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
            <Typography>No fields yet. Click "Add Field" to get started.</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {fields.map((field, index) => (
              <Paper key={field.id} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Chip label={field.type} size="small" />
                  <Box>
                    <IconButton size="small" onClick={() => moveField(index, 'up')} disabled={index === 0}>
                      <MoveUp size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => moveField(index, 'down')}
                      disabled={index === fields.length - 1}
                    >
                      <MoveDown size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => deleteField(field.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Field Type</InputLabel>
                    <Select
                      value={field.type}
                      onChange={(e) => updateField(field.id, { type: e.target.value as any })}
                      label="Field Type"
                    >
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                      <MenuItem value="textarea">Textarea</MenuItem>
                      <MenuItem value="number">Number</MenuItem>
                      <MenuItem value="select">Select</MenuItem>
                      <MenuItem value="checkbox">Checkbox</MenuItem>
                      <MenuItem value="radio">Radio</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Label"
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="Name"
                    value={field.name}
                    onChange={(e) => updateField(field.id, { name: e.target.value })}
                    fullWidth
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <TextField
                    label="Placeholder"
                    value={field.placeholder || ''}
                    onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                    fullWidth
                    size="small"
                  />
                </Box>

                {(field.type === 'select' || field.type === 'radio') && (
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      label="Options (comma-separated)"
                      value={field.options?.join(', ') || ''}
                      onChange={(e) =>
                        updateField(field.id, {
                          options: e.target.value.split(',').map((opt) => opt.trim()),
                        })
                      }
                      fullWidth
                      size="small"
                      helperText="e.g., Option 1, Option 2, Option 3"
                    />
                  </Box>
                )}

                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.required}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                      />
                    }
                    label="Required field"
                  />
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

