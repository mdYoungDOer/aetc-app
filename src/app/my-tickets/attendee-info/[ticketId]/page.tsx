'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  ArrowLeft,
  User,
  Briefcase,
  MapPin,
  Calendar,
  Plane,
  CheckCircle,
  ArrowRight,
  LogOut,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';
import Section from '@/components/ui/Section';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const steps = [
  { label: 'Personal Info', icon: User, color: '#293972' },
  { label: 'Professional', icon: Briefcase, color: '#FBA91E' },
  { label: 'Contact Details', icon: MapPin, color: '#78C044' },
  { label: 'Conference Info', icon: Calendar, color: '#2196F3' },
  { label: 'Travel Details', icon: Plane, color: '#9C27B0' },
  { label: 'Review & Submit', icon: CheckCircle, color: '#4CAF50' },
];

interface TicketData {
  id: string;
  name: string;
  type: string;
  qr_code: string;
  order_id: string;
  created_at: string;
}

function AttendeeInfoForm() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    
    // Professional Information
    job_title: '',
    company: '',
    industry: '',
    years_experience: '',
    
    // Contact Details
    address_line1: '',
    address_line2: '',
    city: '',
    state_province: '',
    postal_code: '',
    country: '',
    
    // Conference Information
    dietary_requirements: '',
    accessibility_needs: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    arrival_date: '',
    departure_date: '',
    accommodation_details: '',
    flight_number: '',
    areas_of_interest: [] as string[],
    networking_goals: '',
    session_preferences: [] as string[],
    tshirt_size: '',
    special_requests: '',
    how_heard_about_us: '',
  });

  const loadTicketData = useCallback(async () => {
    try {
      // Validate ticketId parameter
      const ticketId = Array.isArray(params.ticketId) ? params.ticketId[0] : params.ticketId;
      if (!ticketId || ticketId === 'undefined') {
        throw new Error('Invalid ticket ID provided');
      }

      // Check if user is authenticated
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(ticketId)) {
        throw new Error('Invalid ticket ID format');
      }

      const { data, error } = await supabase
        .from('user_tickets')
        .select(`
          id,
          qr_code,
          created_at,
          orders!inner(
            id,
            tickets!inner(
              name,
              type
            )
          )
        `)
        .eq('id', ticketId)
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to load ticket: ${error.message}`);
      }
      
      setTicketData({
        id: data.id,
        name: (data.orders as any).tickets.name,
        type: (data.orders as any).tickets.type,
        qr_code: data.qr_code,
        order_id: (data.orders as any).id,
        created_at: data.created_at,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id, params.ticketId]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      router.push('/auth/user-login');
      return;
    }

    // Load ticket data if authenticated and ticketId is available
    if (user && params.ticketId && params.ticketId !== 'undefined') {
      loadTicketData();
    }
  }, [params.ticketId, loadTicketData, user, router]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/attendees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_ticket_id: params.ticketId,
          ...formData,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        router.push('/my-tickets?success=attendee-info-completed');
      } else {
        setError(result.error || 'Failed to submit attendee information');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Personal Information
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>First Name *</Typography>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                  required
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Last Name *</Typography>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                  required
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Email *</Typography>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                  required
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Phone Number</Typography>
                <input
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Date of Birth</Typography>
                <input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Gender</Typography>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </Box>
            </Box>
          </Box>
        );
      
      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Professional Information
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Job Title *</Typography>
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                  required
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Company *</Typography>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                  required
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Industry</Typography>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Years of Experience</Typography>
                <select
                  value={formData.years_experience}
                  onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                  }}
                >
                  <option value="">Select Experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-15">11-15 years</option>
                  <option value="16+">16+ years</option>
                </select>
              </Box>
            </Box>
          </Box>
        );
      
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Contact Details
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Address Line 1 *</Typography>
                <input
                  type="text"
                  value={formData.address_line1}
                  onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                  required
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Address Line 2</Typography>
                <input
                  type="text"
                  value={formData.address_line2}
                  onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>City *</Typography>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                    }}
                    required
                  />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>State/Province</Typography>
                  <input
                    type="text"
                    value={formData.state_province}
                    onChange={(e) => setFormData({ ...formData, state_province: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Postal Code</Typography>
                  <input
                    type="text"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Country *</Typography>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                  required
                />
              </Box>
            </Box>
          </Box>
        );
      
      case 3:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Conference Information
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Dietary Requirements</Typography>
                <textarea
                  value={formData.dietary_requirements}
                  onChange={(e) => setFormData({ ...formData, dietary_requirements: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'vertical',
                  }}
                  placeholder="Any dietary restrictions or preferences..."
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Accessibility Needs</Typography>
                <textarea
                  value={formData.accessibility_needs}
                  onChange={(e) => setFormData({ ...formData, accessibility_needs: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'vertical',
                  }}
                  placeholder="Any accessibility requirements..."
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Emergency Contact Name</Typography>
                <input
                  type="text"
                  value={formData.emergency_contact_name}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Emergency Contact Phone</Typography>
                <input
                  type="tel"
                  value={formData.emergency_contact_phone}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>T-Shirt Size</Typography>
                <select
                  value={formData.tshirt_size}
                  onChange={(e) => setFormData({ ...formData, tshirt_size: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                  }}
                >
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>How did you hear about us?</Typography>
                <input
                  type="text"
                  value={formData.how_heard_about_us}
                  onChange={(e) => setFormData({ ...formData, how_heard_about_us: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </Box>
            </Box>
          </Box>
        );
      
      case 4:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Travel Details
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Arrival Date</Typography>
                <input
                  type="date"
                  value={formData.arrival_date}
                  onChange={(e) => setFormData({ ...formData, arrival_date: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Departure Date</Typography>
                <input
                  type="date"
                  value={formData.departure_date}
                  onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Flight Number</Typography>
                <input
                  type="text"
                  value={formData.flight_number}
                  onChange={(e) => setFormData({ ...formData, flight_number: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Accommodation Details</Typography>
                <input
                  type="text"
                  value={formData.accommodation_details}
                  onChange={(e) => setFormData({ ...formData, accommodation_details: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Networking Goals</Typography>
                <textarea
                  value={formData.networking_goals}
                  onChange={(e) => setFormData({ ...formData, networking_goals: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'vertical',
                  }}
                  placeholder="What are your networking goals for the conference?"
                />
              </Box>
              <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Special Requests</Typography>
                <textarea
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'vertical',
                  }}
                  placeholder="Any special requests or additional information..."
                />
              </Box>
            </Box>
          </Box>
        );
      
      case 5:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Review & Submit
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                Please review your information before submitting:
              </Typography>
              
              <Box sx={{ display: 'grid', gap: 2 }}>
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Personal Information</Typography>
                  <Typography variant="body2">{formData.first_name} {formData.last_name}</Typography>
                  <Typography variant="body2">{formData.email}</Typography>
                  {formData.phone_number && <Typography variant="body2">{formData.phone_number}</Typography>}
                </Box>
                
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Professional Information</Typography>
                  <Typography variant="body2">{formData.job_title} at {formData.company}</Typography>
                  {formData.industry && <Typography variant="body2">Industry: {formData.industry}</Typography>}
                </Box>
                
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Contact Details</Typography>
                  <Typography variant="body2">{formData.address_line1}</Typography>
                  {formData.address_line2 && <Typography variant="body2">{formData.address_line2}</Typography>}
                  <Typography variant="body2">{formData.city}, {formData.country}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      
      default:
        return 'Unknown step';
    }
  };

  if (authLoading || loading) {
    return (
      <Section py={10}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '400px', gap: 2 }}>
          <CircularProgress size={40} />
          <Typography variant="body2" color="text.secondary">
            {authLoading ? 'Checking authentication...' : 'Loading ticket information...'}
          </Typography>
        </Box>
      </Section>
    );
  }

  if (error) {
    return (
      <Section py={10}>
        <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Unable to Load Ticket Information
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please make sure you're logged in and have access to this ticket.
            </Typography>
          </Alert>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <CustomButton
              variant="outlined"
              startIcon={<ArrowLeft size={20} />}
              onClick={() => router.push('/my-tickets')}
            >
              Back to My Tickets
            </CustomButton>
            <CustomButton
              variant="contained"
              onClick={() => router.push('/auth/user-login')}
            >
              Sign In
            </CustomButton>
          </Box>
        </Box>
      </Section>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <Box sx={{ backgroundColor: 'white', borderBottom: '1px solid #e0e0e0', py: 2 }}>
        <Box sx={{ maxWidth: '1000px', mx: 'auto', px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => router.push('/my-tickets')} sx={{ p: 1 }}>
              <ArrowLeft size={24} />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Complete Your Attendee Information
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={ticketData?.name || 'Loading...'} 
              color="primary" 
              variant="outlined"
            />
            <Button
              variant="text"
              startIcon={<LogOut size={18} />}
              onClick={() => router.push('/my-tickets')}
              sx={{ textTransform: 'none' }}
            >
              Back to Tickets
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: '1000px', mx: 'auto', p: 3 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Complete Your Attendee Information
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Help us provide you with the best conference experience by completing your attendee profile.
          </Typography>
        </Box>

        {/* Progress Stepper */}
        <CustomCard sx={{ p: 3, mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Step key={step.label}>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        backgroundColor: activeStep >= index ? step.color : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        <IconComponent size={20} />
                      </Box>
                    )}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </CustomCard>

        {/* Form Content */}
        <CustomCard sx={{ mb: 4 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {getStepContent(activeStep)}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <Box sx={{ p: 3, borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between' }}>
            <CustomButton
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
              startIcon={<ArrowLeft size={18} />}
            >
              Back
            </CustomButton>

            {activeStep === steps.length - 1 ? (
              <CustomButton
                variant="contained"
                onClick={handleSubmit}
                disabled={submitting}
                endIcon={submitting ? <CircularProgress size={18} /> : <CheckCircle size={18} />}
                sx={{
                  backgroundColor: '#4CAF50',
                  '&:hover': { backgroundColor: '#45a049' }
                }}
              >
                {submitting ? 'Submitting...' : 'Submit Information'}
              </CustomButton>
            ) : (
              <CustomButton
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowRight size={18} />}
              >
                Next
              </CustomButton>
            )}
          </Box>
        </CustomCard>
      </Box>
    </Box>
  );
}

export default function AttendeeInfoPage() {
  return (
    <Suspense fallback={
      <Section py={10}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress size={40} />
        </Box>
      </Section>
    }>
      <AttendeeInfoForm />
    </Suspense>
  );
}
