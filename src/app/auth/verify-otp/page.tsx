'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';
import Section from '@/components/ui/Section';

export default function VerifyOTPPage() {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/my-tickets');
        }, 2000);
      } else {
        setError(result.error || 'Verification failed');
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
        <Box sx={{ maxWidth: 500, mx: 'auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                backgroundColor: '#78C044',
                borderRadius: '50%',
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <CheckCircle size={40} color="white" />
            </Box>
            
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#78C044' }}>
              Account Verified!
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your account has been successfully verified. You can now access your tickets and conference information.
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              Redirecting to your dashboard...
            </Typography>
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
            onClick={() => router.push('/')}
            sx={{ mb: 3 }}
          >
            Back to Home
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
                <Shield size={32} color="#FBA91E" />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Verify Your Account
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enter the verification code sent to your email
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
              />

              <TextField
                label="Verification Code"
                fullWidth
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-digit code"
                required
                disabled={loading}
                inputProps={{ maxLength: 6 }}
                sx={{ mb: 3 }}
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
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Verifying...
                  </>
                ) : (
                  'Verify Account'
                )}
              </CustomButton>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Didn't receive the code? Check your spam folder or{' '}
                <Button
                  variant="text"
                  onClick={() => {
                    // Resend OTP logic
                    setError('Please contact support to resend your verification code.');
                  }}
                  sx={{ textTransform: 'none' }}
                >
                  contact support
                </Button>
              </Typography>
            </Box>
          </CustomCard>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Need help? Contact us at{' '}
              <Button
                variant="text"
                href="mailto:support@aetconference.com"
                sx={{ textTransform: 'none', color: 'primary.main' }}
              >
                support@aetconference.com
              </Button>
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Section>
  );
}
