'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Alert,
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@supabase/supabase-js';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';
import Section from '@/components/ui/Section';
import PageBreadcrumb from '@/components/PageBreadcrumb';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Attendee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  job_title: string;
  industry: string;
  country: string;
  form_completed_at: string;
  is_verified: boolean;
  ticket_name: string;
  ticket_type: string;
  areas_of_interest: string[];
  dietary_requirements?: string;
  accessibility_needs?: string;
  arrival_date?: string;
  departure_date?: string;
  accommodation_name?: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
}

export default function AdminAttendeesPage() {
  const { user, loading: authLoading } = useAuth();
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const loadAttendees = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('attendees')
        .select(`
          *,
          tickets!inner(
            name,
            type
          )
        `)
        .order('form_completed_at', { ascending: false });

      if (error) throw error;

      const formattedAttendees = data?.map(attendee => ({
        ...attendee,
        ticket_name: attendee.tickets?.name || 'Unknown',
        ticket_type: attendee.tickets?.type || 'Unknown',
      })) || [];

      setAttendees(formattedAttendees);
    } catch (err) {
      console.error('Error loading attendees:', err);
      setError('Failed to load attendees');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadAttendees();
    }
  }, [user, loadAttendees]);

  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch = 
      attendee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'verified' && attendee.is_verified) ||
      (filterStatus === 'pending' && !attendee.is_verified);
    
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedAttendee(null);
    setShowDetails(false);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Company', 'Job Title', 'Industry', 'Country', 'Ticket Type', 'Completed At', 'Verified'],
      ...filteredAttendees.map(attendee => [
        `${attendee.first_name} ${attendee.last_name}`,
        attendee.email,
        attendee.phone || '',
        attendee.company_name,
        attendee.job_title,
        attendee.industry,
        attendee.country,
        attendee.ticket_type,
        new Date(attendee.form_completed_at).toLocaleDateString(),
        attendee.is_verified ? 'Yes' : 'No'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aetc-2026-attendees-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (authLoading || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Section py={10}>
        <Alert severity="error">{error}</Alert>
      </Section>
    );
  }

  return (
    <>
      <PageBreadcrumb 
        title="Attendees"
        subtitle="Manage attendee information"
        backgroundImage="/images/admin-bg.jpg"
      />
      
      <Section py={10}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Attendee Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and view comprehensive attendee information for AETC 2026
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <CustomCard sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {attendees.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Attendees
                </Typography>
              </CustomCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomCard sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  {attendees.filter(a => a.is_verified).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Verified
                </Typography>
              </CustomCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomCard sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {attendees.filter(a => !a.is_verified).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
              </CustomCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomCard sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                  {new Set(attendees.map(a => a.country)).size}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Countries
                </Typography>
              </CustomCard>
            </Grid>
          </Grid>

          {/* Filters and Actions */}
          <CustomCard sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search attendees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search size={20} style={{ marginRight: 8, color: '#666' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    label="Status"
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="verified">Verified</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5} sx={{ textAlign: 'right' }}>
                <CustomButton
                  variant="outlined"
                  startIcon={<Download size={16} />}
                  onClick={handleExportCSV}
                  sx={{ mr: 1 }}
                >
                  Export CSV
                </CustomButton>
                <CustomButton
                  variant="contained"
                  startIcon={<Filter size={16} />}
                  onClick={loadAttendees}
                >
                  Refresh
                </CustomButton>
              </Grid>
            </Grid>
          </CustomCard>

          {/* Attendees Table */}
          <CustomCard>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Attendee</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Ticket Type</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAttendees.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                            {attendee.first_name[0]}{attendee.last_name[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {attendee.first_name} {attendee.last_name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {attendee.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {attendee.company_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {attendee.job_title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={attendee.ticket_type} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MapPin size={14} style={{ marginRight: 4, color: '#666' }} />
                          {attendee.country}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={attendee.is_verified ? 'Verified' : 'Pending'}
                          size="small"
                          color={attendee.is_verified ? 'success' : 'warning'}
                          icon={attendee.is_verified ? <CheckCircle size={14} /> : <Clock size={14} />}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">
                          {new Date(attendee.form_completed_at).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(attendee)}
                          sx={{ color: 'primary.main' }}
                        >
                          <Eye size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </Box>
      </Section>

      {/* Attendee Details Dialog */}
      <Dialog
        open={showDetails}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
              {selectedAttendee?.first_name[0]}{selectedAttendee?.last_name[0]}
            </Avatar>
            <Box>
              <Typography variant="h6">
                {selectedAttendee?.first_name} {selectedAttendee?.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedAttendee?.email}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedAttendee && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>Personal Information</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><User size={16} /></ListItemIcon>
                    <ListItemText 
                      primary="Name" 
                      secondary={`${selectedAttendee.first_name} ${selectedAttendee.last_name}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Mail size={16} /></ListItemIcon>
                    <ListItemText primary="Email" secondary={selectedAttendee.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Phone size={16} /></ListItemIcon>
                    <ListItemText primary="Phone" secondary={selectedAttendee.phone || 'Not provided'} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><MapPin size={16} /></ListItemIcon>
                    <ListItemText primary="Country" secondary={selectedAttendee.country} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>Professional Information</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Briefcase size={16} /></ListItemIcon>
                    <ListItemText 
                      primary="Company" 
                      secondary={selectedAttendee.company_name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Briefcase size={16} /></ListItemIcon>
                    <ListItemText 
                      primary="Job Title" 
                      secondary={selectedAttendee.job_title}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Briefcase size={16} /></ListItemIcon>
                    <ListItemText 
                      primary="Industry" 
                      secondary={selectedAttendee.industry}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Calendar size={16} /></ListItemIcon>
                    <ListItemText 
                      primary="Form Completed" 
                      secondary={new Date(selectedAttendee.form_completed_at).toLocaleString()}
                    />
                  </ListItem>
                </List>
              </Grid>
              
              {selectedAttendee.areas_of_interest && selectedAttendee.areas_of_interest.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Areas of Interest</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedAttendee.areas_of_interest.map((interest, index) => (
                      <Chip key={index} label={interest} size="small" />
                    ))}
                  </Box>
                </Grid>
              )}

              {selectedAttendee.dietary_requirements && (
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Dietary Requirements</Typography>
                  <Typography variant="body2">{selectedAttendee.dietary_requirements}</Typography>
                </Grid>
              )}

              {selectedAttendee.accessibility_needs && (
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Accessibility Needs</Typography>
                  <Typography variant="body2">{selectedAttendee.accessibility_needs}</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
