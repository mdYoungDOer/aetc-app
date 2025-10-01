'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Grid,
  FormControlLabel,
  Checkbox,
  Divider,
  Paper,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AdminSignupData, AdminRole } from '@/types/admin';
import { AdminService } from '@/lib/admin';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

const adminSignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  role: z.enum(['super_admin', 'admin']),
  phone: z.string().optional(),
  organization: z.string().optional(),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AdminSignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<AdminSignupData>({
    resolver: zodResolver(adminSignupSchema),
    defaultValues: {
      role: 'admin',
      terms: false,
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: AdminSignupData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Check if current user is super admin
      if (!user) {
        setError('You must be logged in to create admin accounts');
        return;
      }

      const isSuperAdmin = await AdminService.isSuperAdmin(user.id);
      if (!isSuperAdmin) {
        setError('Only Super Admins can create admin accounts');
        return;
      }

      // Create admin user
      const result = await AdminService.createAdminUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        phone: data.phone,
        organization: data.organization,
        createdBy: user.id,
      });

      if (result.success) {
        setSuccess(`Admin account created successfully! The new admin can now log in with their credentials.`);
        // Reset form
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        setError(result.error || 'Failed to create admin account');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #293972 0%, #151443 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={{ maxWidth: 600, width: '100%', mx: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#293972', fontWeight: 600 }}>
                Create Admin Account
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Add a new administrator to the AETC 2026 system
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                {/* Personal Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#293972' }}>
                    Personal Information
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...register('firstName')}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...register('lastName')}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number (Optional)"
                    {...register('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Organization (Optional)"
                    {...register('organization')}
                    error={!!errors.organization}
                    helperText={errors.organization?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                {/* Account Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#293972' }}>
                    Account Information
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth required>
                        <InputLabel>Admin Role</InputLabel>
                        <Select {...field} label="Admin Role">
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="super_admin">Super Admin</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  {errors.role && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                      {errors.role.message}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    required
                  />
                </Grid>

                {/* Role Information */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: '#293972' }}>
                      Role Permissions:
                    </Typography>
                    {selectedRole === 'super_admin' ? (
                      <Typography variant="body2" color="text.secondary">
                        <strong>Super Admin:</strong> Full system access including user management, 
                        role assignment, audit logs, and all content management capabilities.
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        <strong>Admin:</strong> Content management, ticket management, and analytics access. 
                        Cannot manage other users or system settings.
                      </Typography>
                    )}
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register('terms')}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I confirm that this admin account creation is authorized and the new admin 
                        has been properly vetted for access to the AETC 2026 system.
                      </Typography>
                    }
                  />
                  {errors.terms && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                      {errors.terms.message}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => router.push('/admin')}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        bgcolor: '#293972',
                        '&:hover': { bgcolor: '#151443' },
                        minWidth: 120,
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        'Create Admin'
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
