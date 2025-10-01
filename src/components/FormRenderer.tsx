'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Alert,
} from '@mui/material';
import { Send } from 'lucide-react';
import { Form, FormField } from '@/types/cms';
import { submitForm } from '@/lib/cms';

interface FormRendererProps {
  form: Form;
}

export default function FormRenderer({ form }: FormRendererProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    const missingFields = form.fields_json.filter(
      (field) => field.required && !formData[field.name]
    );

    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.map((f) => f.label).join(', ')}`);
      return;
    }

    setSubmitting(true);
    try {
      await submitForm(form.id, formData);
      setSubmitted(true);
      setFormData({});
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting the form');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Alert severity="success" sx={{ borderRadius: '8px' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Thank you!
        </Typography>
        <Typography variant="body2">Your form has been submitted successfully.</Typography>
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        {form.title}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {form.fields_json.map((field) => (
          <FormFieldRenderer
            key={field.id}
            field={field}
            value={formData[field.name]}
            onChange={(value) => handleChange(field.name, value)}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={submitting}
          startIcon={<Send size={20} />}
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: '#1f2a5a' },
            mt: 2,
          }}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </Box>
  );
}

function FormFieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
}) {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'number':
      return (
        <TextField
          label={field.label}
          type={field.type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          placeholder={field.placeholder}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />
      );

    case 'textarea':
      return (
        <TextField
          label={field.label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          placeholder={field.placeholder}
          fullWidth
          multiline
          rows={4}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />
      );

    case 'select':
      return (
        <FormControl fullWidth required={field.required}>
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            label={field.label}
            sx={{
              borderRadius: '8px',
            }}
          >
            {field.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case 'checkbox':
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              required={field.required}
            />
          }
          label={field.label}
        />
      );

    case 'radio':
      return (
        <FormControl component="fieldset" required={field.required}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            {field.label}
          </Typography>
          <RadioGroup value={value || ''} onChange={(e) => onChange(e.target.value)}>
            {field.options?.map((option) => (
              <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </FormControl>
      );

    default:
      return null;
  }
}

