'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Alert,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  MoreVert,
  Person,
  Visibility,
  VisibilityOff,
  Star,
  StarBorder,
} from '@mui/icons-material';
import { createSupabaseClient } from '@/lib/supabase/client';
import Image from 'next/image';

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio?: string;
  image_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  email?: string;
  phone?: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export default function AdminSpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const supabase = createSupabaseClient();

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    bio: '',
    image_url: '',
    linkedin_url: '',
    twitter_url: '',
    website_url: '',
    email: '',
    phone: '',
    is_featured: false,
    is_active: true,
    display_order: 0,
  });

  const fetchSpeakers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('speakers')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setSpeakers(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchSpeakers();
  }, [fetchSpeakers]);

  const handleOpenDialog = (speaker?: Speaker) => {
    if (speaker) {
      setEditingSpeaker(speaker);
      setFormData({
        name: speaker.name,
        title: speaker.title,
        company: speaker.company,
        bio: speaker.bio || '',
        image_url: speaker.image_url || '',
        linkedin_url: speaker.linkedin_url || '',
        twitter_url: speaker.twitter_url || '',
        website_url: speaker.website_url || '',
        email: speaker.email || '',
        phone: speaker.phone || '',
        is_featured: speaker.is_featured,
        is_active: speaker.is_active,
        display_order: speaker.display_order,
      });
    } else {
      setEditingSpeaker(null);
      setFormData({
        name: '',
        title: '',
        company: '',
        bio: '',
        image_url: '',
        linkedin_url: '',
        twitter_url: '',
        website_url: '',
        email: '',
        phone: '',
        is_featured: false,
        is_active: true,
        display_order: speakers.length + 1,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSpeaker(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingSpeaker) {
        const { error } = await supabase
          .from('speakers')
          .update(formData)
          .eq('id', editingSpeaker.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('speakers')
          .insert([formData]);

        if (error) throw error;
      }

      await fetchSpeakers();
      handleCloseDialog();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this speaker?')) return;

    try {
      const { error } = await supabase
        .from('speakers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchSpeakers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleActive = async (speaker: Speaker) => {
    try {
      const { error } = await supabase
        .from('speakers')
        .update({ is_active: !speaker.is_active })
        .eq('id', speaker.id);

      if (error) throw error;
      await fetchSpeakers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleFeatured = async (speaker: Speaker) => {
    try {
      const { error } = await supabase
        .from('speakers')
        .update({ is_featured: !speaker.is_featured })
        .eq('id', speaker.id);

      if (error) throw error;
      await fetchSpeakers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, speaker: Speaker) => {
    setAnchorEl(event.currentTarget);
    setSelectedSpeaker(speaker);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSpeaker(null);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading speakers...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Speakers Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          Add Speaker
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {speakers.map((speaker) => (
          <Grid item xs={12} sm={6} md={4} key={speaker.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={speaker.image_url}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  >
                    <Person />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {speaker.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {speaker.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {speaker.company}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, speaker)}
                    size="small"
                  >
                    <MoreVert />
                  </IconButton>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={speaker.is_active ? 'Active' : 'Inactive'}
                    color={speaker.is_active ? 'success' : 'default'}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  {speaker.is_featured && (
                    <Chip
                      label="Featured"
                      color="warning"
                      size="small"
                    />
                  )}
                </Box>

                {speaker.bio && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {speaker.bio.length > 100 
                      ? `${speaker.bio.substring(0, 100)}...` 
                      : speaker.bio
                    }
                  </Typography>
                )}

                <Typography variant="caption" color="text.secondary">
                  Order: {speaker.display_order}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleOpenDialog(selectedSpeaker!);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          handleToggleActive(selectedSpeaker!);
          handleMenuClose();
        }}>
          <ListItemIcon>
            {selectedSpeaker?.is_active ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
          </ListItemIcon>
          <ListItemText>
            {selectedSpeaker?.is_active ? 'Deactivate' : 'Activate'}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          handleToggleFeatured(selectedSpeaker!);
          handleMenuClose();
        }}>
          <ListItemIcon>
            {selectedSpeaker?.is_featured ? <StarBorder fontSize="small" /> : <Star fontSize="small" />}
          </ListItemIcon>
          <ListItemText>
            {selectedSpeaker?.is_featured ? 'Remove from Featured' : 'Add to Featured'}
          </ListItemText>
        </MenuItem>
        <MenuItem 
          onClick={() => {
            handleDelete(selectedSpeaker!.id);
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSpeaker ? 'Edit Speaker' : 'Add New Speaker'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Display Order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="LinkedIn URL"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Twitter URL"
                value={formData.twitter_url}
                onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website URL"
                value={formData.website_url}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  />
                }
                label="Featured Speaker"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingSpeaker ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
