'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Chip,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Divider,
  FormHelperText,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, User, MapPin, Phone, Mail, Briefcase, Plane, Utensils, Heart } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';

// Form validation schema
const attendeeSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  
  // Professional Information
  jobTitle: z.string().min(2, 'Job title is required'),
  companyName: z.string().min(2, 'Company name is required'),
  industry: z.string().min(2, 'Industry is required'),
  yearsOfExperience: z.number().min(0, 'Years of experience must be 0 or more'),
  currentPosition: z.string().min(2, 'Current position is required'),
  
  // Contact Information
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  stateProvince: z.string().min(2, 'State/Province is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  
  // Conference Specific
  dietaryRequirements: z.string().optional(),
  accessibilityNeeds: z.string().optional(),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(10, 'Emergency contact phone is required'),
  emergencyContactRelationship: z.string().min(2, 'Emergency contact relationship is required'),
  
  // Travel Information
  arrivalDate: z.string().optional(),
  departureDate: z.string().optional(),
  accommodationName: z.string().optional(),
  accommodationAddress: z.string().optional(),
  flightDetails: z.string().optional(),
  
  // Professional Interests
  areasOfInterest: z.array(z.string()).min(1, 'Select at least one area of interest'),
  networkingGoals: z.string().optional(),
  sessionPreferences: z.string().optional(),
  
  // Additional Information
  tShirtSize: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']).optional(),
  specialRequests: z.string().optional(),
  howDidYouHearAboutUs: z.string().optional(),
});

type AttendeeFormData = z.infer<typeof attendeeSchema>;

interface AttendeeFormProps {
  userTicketId: string;
  ticketName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const steps = [
  'Personal Information',
  'Professional Details',
  'Contact & Address',
  'Conference Preferences',
  'Travel Information',
  'Review & Submit'
];

const interestAreas = [
  'Renewable Energy',
  'Oil & Gas',
  'Power Generation',
  'Energy Storage',
  'Energy Efficiency',
  'Smart Grid',
  'Energy Policy',
  'Environmental Sustainability',
  'Energy Finance',
  'Technology Innovation',
  'Research & Development',
  'Project Management',
  'Consulting',
  'Government Relations',
  'Other'
];

export default function AttendeeForm({ userTicketId, ticketName, onSuccess, onCancel }: AttendeeFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm<AttendeeFormData>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: {
      areasOfInterest: [],
    },
    mode: 'onChange',
  });

  const watchedAreasOfInterest = watch('areasOfInterest');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const toggleInterestArea = (area: string) => {
    const current = getValues('areasOfInterest') || [];
    const updated = current.includes(area)
      ? current.filter(item => item !== area)
      : [...current, area];
    setValue('areasOfInterest', updated);
  };

  const onSubmit = async (data: AttendeeFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/attendees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userTicketId,
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit attendee information');
      }

      onSuccess();
    } catch (error) {
      console.error('Error submitting attendee form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // Personal Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    InputProps={{
                      startAdornment: <User size={20} style={{ marginRight: 8, color: '#666' }} />
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email Address"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: <Mail size={20} style={{ marginRight: 8, color: '#666' }} />
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    InputProps={{
                      startAdornment: <Phone size={20} style={{ marginRight: 8, color: '#666' }} />
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth?.message}
                    InputProps={{
                      startAdornment: <Calendar size={20} style={{ marginRight: 8, color: '#666' }} />
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select {...field} label="Gender">
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                      <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
                    </Select>
                    {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        );

      case 1: // Professional Details
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="jobTitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Job Title"
                    fullWidth
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle?.message}
                    InputProps={{
                      startAdornment: <Briefcase size={20} style={{ marginRight: 8, color: '#666' }} />
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Name"
                    fullWidth
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Industry"
                    fullWidth
                    error={!!errors.industry}
                    helperText={errors.industry?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="yearsOfExperience"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Years of Experience"
                    type="number"
                    fullWidth
                    error={!!errors.yearsOfExperience}
                    helperText={errors.yearsOfExperience?.message}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="currentPosition"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Current Position"
                    fullWidth
                    error={!!errors.currentPosition}
                    helperText={errors.currentPosition?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 2: // Contact & Address
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="addressLine1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address Line 1"
                    fullWidth
                    error={!!errors.addressLine1}
                    helperText={errors.addressLine1?.message}
                    InputProps={{
                      startAdornment: <MapPin size={20} style={{ marginRight: 8, color: '#666' }} />
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="addressLine2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address Line 2 (Optional)"
                    fullWidth
                    error={!!errors.addressLine2}
                    helperText={errors.addressLine2?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="stateProvince"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State/Province"
                    fullWidth
                    error={!!errors.stateProvince}
                    helperText={errors.stateProvince?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="postalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Postal Code"
                    fullWidth
                    error={!!errors.postalCode}
                    helperText={errors.postalCode?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    fullWidth
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 3: // Conference Preferences
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Areas of Interest (Select all that apply)
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {interestAreas.map((area) => (
                  <Chip
                    key={area}
                    label={area}
                    clickable
                    color={watchedAreasOfInterest?.includes(area) ? 'primary' : 'default'}
                    onClick={() => toggleInterestArea(area)}
                    variant={watchedAreasOfInterest?.includes(area) ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>
              {errors.areasOfInterest && (
                <Typography color="error" variant="body2">
                  {errors.areasOfInterest.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="dietaryRequirements"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Dietary Requirements"
                    fullWidth
                    multiline
                    rows={3}
                    helperText="Please specify any dietary restrictions or preferences"
                    InputProps={{
                      startAdornment: <Utensils size={20} style={{ marginRight: 8, color: '#666' }} />
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="accessibilityNeeds"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Accessibility Needs"
                    fullWidth
                    multiline
                    rows={3}
                    helperText="Please specify any accessibility requirements"
                    InputProps={{
                      startAdornment: <Heart size={20} style={{ marginRight: 8, color: '#666' }} />
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="networkingGoals"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Networking Goals"
                    fullWidth
                    multiline
                    rows={3}
                    helperText="What are you hoping to achieve through networking at the conference?"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="sessionPreferences"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Session Preferences"
                    fullWidth
                    multiline
                    rows={3}
                    helperText="Any specific sessions or topics you're particularly interested in?"
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 4: // Travel Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="arrivalDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Arrival Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <Plane size={20} style={{ marginRight: 8, color: '#666' }} />
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="departureDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Departure Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="accommodationName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Accommodation Name"
                    fullWidth
                    helperText="Hotel or accommodation name"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="tShirtSize"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>T-Shirt Size</InputLabel>
                    <Select {...field} label="T-Shirt Size">
                      <MenuItem value="XS">XS</MenuItem>
                      <MenuItem value="S">S</MenuItem>
                      <MenuItem value="M">M</MenuItem>
                      <MenuItem value="L">L</MenuItem>
                      <MenuItem value="XL">XL</MenuItem>
                      <MenuItem value="XXL">XXL</MenuItem>
                      <MenuItem value="XXXL">XXXL</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="accommodationAddress"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Accommodation Address"
                    fullWidth
                    multiline
                    rows={2}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="flightDetails"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Flight Details"
                    fullWidth
                    multiline
                    rows={2}
                    helperText="Flight numbers, times, etc."
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 5: // Review & Submit
        const formData = getValues();
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Review Your Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Name</Typography>
                <Typography>{formData.firstName} {formData.lastName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography>{formData.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                <Typography>{formData.phone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Company</Typography>
                <Typography>{formData.companyName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Job Title</Typography>
                <Typography>{formData.jobTitle}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Country</Typography>
                <Typography>{formData.country}</Typography>
              </Grid>
              {formData.areasOfInterest && formData.areasOfInterest.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Areas of Interest</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {formData.areasOfInterest.map((area) => (
                      <Chip key={area} label={area} size="small" />
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <CustomCard sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Attendee Information Form
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please provide comprehensive information for your {ticketName} ticket
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent(activeStep)}
        </motion.div>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <CustomButton
                type="submit"
                disabled={isSubmitting || !isValid}
                startIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Information'}
              </CustomButton>
            ) : (
              <CustomButton onClick={handleNext} disabled={!isValid}>
                Next
              </CustomButton>
            )}
          </Box>
        </Box>
      </form>
    </CustomCard>
  );
}
