'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Plus, Edit, Trash2, Eye, Copy } from 'lucide-react';
import { getForms, createForm, updateForm } from '@/lib/cms';
import { Form } from '@/types/cms';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminForms() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newFormTitle, setNewFormTitle] = useState('');
  const [newFormSlug, setNewFormSlug] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const data = await getForms();
      setForms(data);
    } catch (error) {
      console.error('Error loading forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateForm = async () => {
    try {
      const form = await createForm({
        title: newFormTitle,
        slug: newFormSlug,
        fields_json: [],
        status: 'active',
      });
      setOpenDialog(false);
      setNewFormTitle('');
      setNewFormSlug('');
      router.push(`/admin/forms/${form.id}`);
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  const handleCopyShortcode = (formId: string) => {
    navigator.clipboard.writeText(`[form id="${formId}"]`);
    alert('Shortcode copied to clipboard!');
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Forms
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setOpenDialog(true)}
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: '#1f2a5a' },
          }}
        >
          New Form
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Slug</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Fields</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Shortcode</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms.map((form) => (
                <TableRow key={form.id} hover>
                  <TableCell>{form.title}</TableCell>
                  <TableCell>
                    <code style={{ fontSize: '0.875rem', color: '#666' }}>{form.slug}</code>
                  </TableCell>
                  <TableCell>{form.fields_json?.length || 0} fields</TableCell>
                  <TableCell>
                    <Chip
                      label={form.status}
                      size="small"
                      color={getStatusColor(form.status) as any}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <code style={{ fontSize: '0.75rem', color: '#666' }}>
                        [form id="{form.id}"]
                      </code>
                      <IconButton size="small" onClick={() => handleCopyShortcode(form.id)}>
                        <Copy size={14} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      component={Link}
                      href={`/admin/forms/${form.id}`}
                      title="Edit"
                    >
                      <Edit size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      component={Link}
                      href={`/admin/forms/${form.id}/submissions`}
                      title="View Submissions"
                    >
                      <Eye size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create Form Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Create New Form</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Form Title"
              fullWidth
              value={newFormTitle}
              onChange={(e) => {
                setNewFormTitle(e.target.value);
                setNewFormSlug(
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '')
                );
              }}
              required
            />
            <TextField
              label="Form Slug"
              fullWidth
              value={newFormSlug}
              onChange={(e) => setNewFormSlug(e.target.value)}
              helperText="URL-friendly identifier"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateForm}
            disabled={!newFormTitle || !newFormSlug}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: '#1f2a5a' },
            }}
          >
            Create Form
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

