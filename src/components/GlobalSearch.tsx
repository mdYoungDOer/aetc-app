'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
} from '@mui/material';
import { Search, FileText, Newspaper } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SearchResult {
  type: 'page' | 'news';
  title: string;
  slug: string;
  description?: string;
}

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allContent, setAllContent] = useState<SearchResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      loadSearchableContent();
    }
  }, [open]);

  const loadSearchableContent = async () => {
    try {
      // Load published pages
      const { data: pages } = await supabase
        .from('pages')
        .select('title, slug, meta_description')
        .eq('status', 'published');

      const pageResults: SearchResult[] =
        pages?.map((p) => ({
          type: 'page' as const,
          title: p.title,
          slug: `/cms/${p.slug}`,
          description: p.meta_description,
        })) || [];

      // Add static pages
      const staticPages: SearchResult[] = [
        { type: 'page', title: 'Home', slug: '/', description: 'AETC 2026 Home' },
        { type: 'page', title: 'About', slug: '/about', description: 'About the Conference' },
        { type: 'page', title: 'Programme', slug: '/programme', description: 'Conference Schedule' },
        { type: 'page', title: 'Speakers', slug: '/speakers', description: 'Featured Speakers' },
        { type: 'page', title: 'Venue', slug: '/venue', description: 'Venue & Logistics' },
        { type: 'page', title: 'Registration', slug: '/registration', description: 'Buy Tickets' },
        { type: 'page', title: 'Sponsors', slug: '/sponsors', description: 'Our Sponsors' },
        { type: 'page', title: 'News', slug: '/news', description: 'Latest Updates' },
        { type: 'page', title: 'Contact', slug: '/contact', description: 'Get in Touch' },
      ];

      setAllContent([...staticPages, ...pageResults]);
    } catch (error) {
      console.error('Error loading search content:', error);
    }
  };

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    // Configure Fuse.js
    const fuse = new Fuse(allContent, {
      keys: ['title', 'description', 'slug'],
      threshold: 0.3,
      includeScore: true,
    });

    const searchResults = fuse.search(query);
    setResults(searchResults.map((r) => r.item).slice(0, 8));
  }, [query, allContent]);

  const handleSelect = (slug: string) => {
    router.push(slug);
    onClose();
    setQuery('');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          mt: 10,
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search pages, news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            InputProps={{
              startAdornment: <Search size={20} style={{ marginRight: 8, color: '#666' }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        </Box>

        {results.length > 0 && (
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {results.map((result, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleSelect(result.slug)}>
                  <Box sx={{ mr: 2, color: 'primary.main' }}>
                    {result.type === 'page' ? <FileText size={20} /> : <Newspaper size={20} />}
                  </Box>
                  <ListItemText
                    primary={result.title}
                    secondary={result.description}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                  <Chip label={result.type} size="small" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        {query.length >= 2 && results.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No results found for "{query}"
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

