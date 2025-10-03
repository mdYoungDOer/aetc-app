'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Link,
  Divider,
} from '@mui/material';
import { ArrowLeft, Lock, CheckCircle, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';
import Section from '@/components/ui/Section';

function PasswordResetForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email from URL params if available
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          newPassword 
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        // Auto redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/auth/user-login');
        }, 3000);
      } else {
        setError(result.error || 'Failed to update password');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Section py={10}>
        <Box sx={{ maxWidth: 500, mx: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CustomCard sx={{ p: 4, textAlign: 'center' }}>
              <Box
                sx={{
                  backgroundColor: 'success.main',
                  borderRadius: '50%',
                  width: 64,
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <CheckCircle size={32} color="white" />
              </Box>
              
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'success.main' }}>
                Password Updated Successfully!
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Your password has been updated. You will be redirected to the login page shortly.
              </Typography>

              <CustomButton
                variant="contained"
                fullWidth
                onClick={() => router.push('/auth/user-login')}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  py: 2,
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                Go to Login
              </CustomButton>
            </CustomCard>
          </motion.div>
        </Box>
      </Section>
    );
  }

  return (
    <Section py={10}>
      <Box sx={{ maxWidth: 500, mx: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CustomButton
            variant="outlined"
            startIcon={<ArrowLeft size={20} />}
            onClick={() => router.push('/auth/user-login')}
            sx={{ mb: 3 }}
          >
            Back to Login
          </CustomButton>

          <CustomCard sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  borderRadius: '50%',
                  width: 64,
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Lock size={32} color="#FBA91E" />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Set New Password
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enter your new password to secure your AETC 2026 account
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: <Ticket size={20} style={{ marginRight: 8, color: '#FBA91E' }} />
                }}
              />

              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: <Lock size={20} style={{ marginRight: 8, color: '#FBA91E' }} />
                }}
                helperText="Password must be at least 6 characters long"
              />

              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: <Lock size={20} style={{ marginRight: 8, color: '#FBA91E' }} />
                }}
              />

              <CustomButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  backgroundColor: 'secondary.main',
                  color: '#000',
                  py: 2,
                  mb: 3,
                  '&:hover': {
                    backgroundColor: 'secondary.dark',
                  },
                }}
              >
                {loading ? 'Updating Password...' : 'Update Password'}
              </CustomButton>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Need help? Contact us at{' '}
                <Link href="mailto:support@aetc.africa" color="primary">
                  support@aetc.africa
                </Link>
              </Typography>
            </Box>
          </CustomCard>
        </motion.div>
      </Box>
    </Section>
  );
}

export default function PasswordResetPage() {
  return (
    <Suspense fallback={
      <Section py={10}>
        <Box sx={{ maxWidth: 500, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </Section>
    }>
      <PasswordResetForm />
    </Suspense>
  );
}
