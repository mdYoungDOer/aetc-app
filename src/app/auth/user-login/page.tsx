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
  Link,
  Divider,
} from '@mui/material';
import { ArrowLeft, Mail, Lock, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';
import Section from '@/components/ui/Section';

export default function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn(email, password);
      if (result.success) {
        router.push('/my-tickets');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

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
                <Ticket size={32} color="#FBA91E" />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Access Your Tickets
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to view and manage your AETC 2026 conference tickets
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
                  startAdornment: <Mail size={20} style={{ marginRight: 8, color: '#FBA91E' }} />
                }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {loading ? 'Signing In...' : 'Sign In'}
              </CustomButton>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Don't have an account yet?
              </Typography>
              <Typography variant="body2">
                Your account was created when you purchased your ticket. 
                Check your email for login details or contact support.
              </Typography>
            </Box>
          </CustomCard>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Need help? Contact us at{' '}
              <Link href="mailto:support@aetconference.com" color="primary">
                support@aetconference.com
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Section>
  );
}
