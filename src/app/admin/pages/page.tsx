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
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { getPages, createPage, deletePage } from '@/lib/cms';
import { Page } from '@/types/cms';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const data = await getPages();
      setPages(data);
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePage = async () => {
    try {
      const page = await createPage({
        title: newPageTitle,
        slug: newPageSlug,
        content_json: { id: 'root', version: 1, rows: [] },
        status: 'draft',
      });
      setOpenDialog(false);
      setNewPageTitle('');
      setNewPageSlug('');
      router.push(`/admin/pages/${page.id}`);
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };

  const handleDeletePage = async (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      try {
        await deletePage(id);
        loadPages();
      } catch (error) {
        console.error('Error deleting page:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Pages
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
          New Page
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
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Updated</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id} hover>
                  <TableCell>{page.title}</TableCell>
                  <TableCell>
                    <code style={{ fontSize: '0.875rem', color: '#666' }}>/{page.slug}</code>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={page.status}
                      size="small"
                      color={getStatusColor(page.status) as any}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>{new Date(page.updated_at).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      component={Link}
                      href={`/admin/pages/${page.id}`}
                      title="Edit"
                    >
                      <Edit size={18} />
                    </IconButton>
                    {page.status === 'published' && (
                      <IconButton
                        size="small"
                        component={Link}
                        href={`/${page.slug}`}
                        target="_blank"
                        title="View"
                      >
                        <Eye size={18} />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleDeletePage(page.id)}
                      title="Delete"
                      sx={{ color: 'error.main' }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create Page Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Create New Page</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Page Title"
              fullWidth
              value={newPageTitle}
              onChange={(e) => {
                setNewPageTitle(e.target.value);
                // Auto-generate slug from title
                setNewPageSlug(
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '')
                );
              }}
              required
            />
            <TextField
              label="Page Slug"
              fullWidth
              value={newPageSlug}
              onChange={(e) => setNewPageSlug(e.target.value)}
              helperText="URL-friendly identifier (e.g., about-us)"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreatePage}
            disabled={!newPageTitle || !newPageSlug}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: '#1f2a5a' },
            }}
          >
            Create Page
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

