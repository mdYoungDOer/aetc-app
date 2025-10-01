'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Plus, Trash2, MoveUp, MoveDown, Edit, Eye } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';

export interface PageBlock {
  id: string;
  type: 'hero' | 'text' | 'image' | 'grid' | 'form';
  data: any;
}

interface PageBuilderProps {
  initialBlocks?: PageBlock[];
  onChange: (blocks: PageBlock[]) => void;
  onSave: () => void;
}

const blockTypes = [
  { value: 'hero', label: 'Hero Section', icon: '🎯' },
  { value: 'text', label: 'Text Block', icon: '📝' },
  { value: 'image', label: 'Image', icon: '🖼️' },
  { value: 'grid', label: 'Grid Layout', icon: '▦' },
  { value: 'form', label: 'Form Embed', icon: '📋' },
];

export default function PageBuilder({ initialBlocks = [], onChange, onSave }: PageBuilderProps) {
  const [blocks, setBlocks] = useState<PageBlock[]>(initialBlocks);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const addBlock = (type: PageBlock['type']) => {
    const newBlock: PageBlock = {
      id: `block-${Date.now()}`,
      type,
      data: getDefaultData(type),
    };
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
    setDrawerOpen(false);
    setEditingBlock(newBlock.id);
  };

  const getDefaultData = (type: PageBlock['type']) => {
    switch (type) {
      case 'hero':
        return {
          title: 'Hero Title',
          subtitle: 'Hero subtitle text',
          ctaText: 'Get Started',
          ctaLink: '#',
          backgroundImage: '/Images/AETC 2025 PICS 1-24.JPG',
        };
      case 'text':
        return {
          content: '<p>Enter your text content here...</p>',
          alignment: 'left',
        };
      case 'image':
        return {
          src: '/Images/AETC 2025 PICS 1-69.JPG',
          alt: 'Image description',
          caption: '',
        };
      case 'grid':
        return {
          columns: 3,
          items: [
            { title: 'Item 1', content: 'Content 1' },
            { title: 'Item 2', content: 'Content 2' },
            { title: 'Item 3', content: 'Content 3' },
          ],
        };
      case 'form':
        return {
          formId: '',
          formSlug: 'contact',
        };
      default:
        return {};
    }
  };

  const updateBlock = (id: string, data: any) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === id ? { ...block, data } : block
    );
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  const deleteBlock = (id: string) => {
    const updatedBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const updatedBlocks = [...blocks];
    [updatedBlocks[index], updatedBlocks[newIndex]] = [updatedBlocks[newIndex], updatedBlocks[index]];
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, minHeight: '600px' }}>
      {/* Main Editor Area */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Plus size={18} />}
            onClick={() => setDrawerOpen(true)}
            sx={{ borderColor: 'primary.main', color: 'primary.main' }}
          >
            Add Block
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant={previewMode ? 'contained' : 'outlined'}
              startIcon={<Eye size={18} />}
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button
              variant="contained"
              onClick={onSave}
              sx={{
                backgroundColor: 'secondary.main',
                color: '#000',
                '&:hover': { backgroundColor: '#e59915' },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>

        {blocks.length === 0 ? (
          <Paper
            sx={{
              p: 8,
              textAlign: 'center',
              backgroundColor: 'background.default',
              border: '2px dashed',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
              No blocks yet
            </Typography>
            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              onClick={() => setDrawerOpen(true)}
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: '#1f2a5a' },
              }}
            >
              Add Your First Block
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {blocks.map((block, index) => (
              <Paper
                key={block.id}
                sx={{
                  p: 3,
                  border: editingBlock === block.id ? '2px solid' : '1px solid',
                  borderColor: editingBlock === block.id ? 'primary.main' : 'divider',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {blockTypes.find((t) => t.value === block.type)?.icon}{' '}
                    {blockTypes.find((t) => t.value === block.type)?.label}
                  </Typography>
                  <Box>
                    <IconButton size="small" onClick={() => moveBlock(block.id, 'up')} disabled={index === 0}>
                      <MoveUp size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => moveBlock(block.id, 'down')}
                      disabled={index === blocks.length - 1}
                    >
                      <MoveDown size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setEditingBlock(editingBlock === block.id ? null : block.id)}
                    >
                      <Edit size={18} />
                    </IconButton>
                    <IconButton size="small" onClick={() => deleteBlock(block.id)} sx={{ color: 'error.main' }}>
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </Box>

                {editingBlock === block.id ? (
                  <BlockEditor block={block} onUpdate={(data) => updateBlock(block.id, data)} />
                ) : (
                  <BlockPreview block={block} />
                )}
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      {/* Block Type Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Add Block
          </Typography>
          <List>
            {blockTypes.map((type) => (
              <ListItem key={type.value} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => addBlock(type.value as PageBlock['type'])}
                  sx={{
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'rgba(41, 57, 114, 0.04)',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '1.5rem', mr: 2 }}>{type.icon}</Typography>
                  <ListItemText primary={type.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

// Block Editor Component
function BlockEditor({ block, onUpdate }: { block: PageBlock; onUpdate: (data: any) => void }) {
  const handleChange = (field: string, value: any) => {
    onUpdate({ ...block.data, [field]: value });
  };

  switch (block.type) {
    case 'hero':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            value={block.data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            fullWidth
          />
          <TextField
            label="Subtitle"
            value={block.data.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="CTA Button Text"
            value={block.data.ctaText}
            onChange={(e) => handleChange('ctaText', e.target.value)}
            fullWidth
          />
          <TextField
            label="CTA Link"
            value={block.data.ctaLink}
            onChange={(e) => handleChange('ctaLink', e.target.value)}
            fullWidth
          />
          <TextField
            label="Background Image URL"
            value={block.data.backgroundImage}
            onChange={(e) => handleChange('backgroundImage', e.target.value)}
            fullWidth
          />
        </Box>
      );

    case 'text':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Content"
            value={block.data.content}
            onChange={(e) => handleChange('content', e.target.value)}
            fullWidth
            multiline
            rows={6}
          />
          <FormControl fullWidth>
            <InputLabel>Alignment</InputLabel>
            <Select
              value={block.data.alignment}
              onChange={(e) => handleChange('alignment', e.target.value)}
              label="Alignment"
            >
              <MenuItem value="left">Left</MenuItem>
              <MenuItem value="center">Center</MenuItem>
              <MenuItem value="right">Right</MenuItem>
            </Select>
          </FormControl>
        </Box>
      );

    case 'image':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Image URL"
            value={block.data.src}
            onChange={(e) => handleChange('src', e.target.value)}
            fullWidth
          />
          <TextField
            label="Alt Text"
            value={block.data.alt}
            onChange={(e) => handleChange('alt', e.target.value)}
            fullWidth
          />
          <TextField
            label="Caption (optional)"
            value={block.data.caption}
            onChange={(e) => handleChange('caption', e.target.value)}
            fullWidth
          />
        </Box>
      );

    case 'form':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Form Slug or ID"
            value={block.data.formSlug || block.data.formId || ''}
            onChange={(e) => handleChange('formSlug', e.target.value)}
            fullWidth
            helperText="Enter the form slug (e.g., 'contact') or form ID"
          />
        </Box>
      );

    default:
      return <Typography color="text.secondary">Editor for {block.type} coming soon...</Typography>;
  }
}

// Block Preview Component
function BlockPreview({ block }: { block: PageBlock }) {
  switch (block.type) {
    case 'hero':
      return (
        <Box
          sx={{
            p: 4,
            backgroundColor: 'primary.main',
            color: '#FFF',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            {block.data.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            {block.data.subtitle}
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: 'secondary.main', color: '#000' }}>
            {block.data.ctaText}
          </Button>
        </Box>
      );

    case 'text':
      return (
        <Box sx={{ textAlign: block.data.alignment }}>
          <div dangerouslySetInnerHTML={{ __html: block.data.content }} />
        </Box>
      );

    case 'image':
      return (
        <Box>
          <Box
            sx={{
              width: '100%',
              height: 200,
              backgroundColor: 'background.default',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="text.secondary">Image: {block.data.src}</Typography>
          </Box>
          {block.data.caption && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
              {block.data.caption}
            </Typography>
          )}
        </Box>
      );

    case 'form':
      return (
        <Box
          sx={{
            p: 3,
            backgroundColor: 'background.default',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            📋 Form: {block.data.formSlug || block.data.formId || 'Not configured'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
            Form will be rendered on the live page
          </Typography>
        </Box>
      );

    default:
      return <Typography>Preview for {block.type}</Typography>;
  }
}

