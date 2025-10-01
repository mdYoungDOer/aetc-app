'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Chip,
} from '@mui/material';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { getPageById, updatePage, createRevision } from '@/lib/cms';
import { Page } from '@/types/cms';
import PageBuilder, { PageBlock } from '@/components/PageBuilder';
import Link from 'next/link';

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;

  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPage();
  }, [pageId]);

  const loadPage = async () => {
    try {
      const data = await getPageById(pageId);
      setPage(data);
      setTitle(data.title);
      setSlug(data.slug);
      setStatus(data.status);
      
      // Load blocks from content_json
      if (data.content_json && Array.isArray(data.content_json.blocks)) {
        setBlocks(data.content_json.blocks);
      } else {
        setBlocks([]);
      }
    } catch (error) {
      console.error('Error loading page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const contentJson = {
        id: 'root',
        version: 1,
        blocks,
      };

      // Create revision before updating
      if (page) {
        await createRevision(page.id, page.content_json, 'Auto-save');
      }

      // Update page
      await updatePage(pageId, {
        title,
        slug,
        status,
        content_json: contentJson,
      });

      alert('Page saved successfully!');
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Error saving page');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setSaving(true);
    try {
      await updatePage(pageId, { status: 'published' });
      setStatus('published');
      alert('Page published successfully!');
    } catch (error) {
      console.error('Error publishing page:', error);
      alert('Error publishing page');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            href="/admin/pages"
            startIcon={<ArrowLeft size={18} />}
            variant="outlined"
          >
            Back
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Edit Page
          </Typography>
          <Chip
            label={status}
            size="small"
            color={status === 'published' ? 'success' : 'warning'}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Save size={18} />}
            onClick={handleSave}
            disabled={saving}
          >
            Save Draft
          </Button>
          {status !== 'published' && (
            <Button
              variant="contained"
              startIcon={<Eye size={18} />}
              onClick={handlePublish}
              disabled={saving}
              sx={{
                backgroundColor: 'success.main',
                '&:hover': { backgroundColor: '#5da832' },
              }}
            >
              Publish
            </Button>
          )}
          {status === 'published' && (
            <Button
              variant="outlined"
              component={Link}
              href={`/${slug}`}
              target="_blank"
              startIcon={<Eye size={18} />}
            >
              View Live
            </Button>
          )}
        </Box>
      </Box>

      {/* Page Settings */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Page Settings
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' }, gap: 2 }}>
          <TextField
            label="Page Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value as any)} label="Status">
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Page Builder */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Page Content
        </Typography>
        <PageBuilder
          initialBlocks={blocks}
          onChange={(updatedBlocks) => setBlocks(updatedBlocks)}
          onSave={handleSave}
        />
      </Paper>
    </Box>
  );
}

