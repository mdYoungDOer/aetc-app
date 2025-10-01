'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { LogIn } from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase/client';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';
  
  // Check for error messages from URL parameters
  const urlError = searchParams.get('error');
  useEffect(() => {
    if (urlError) {
      switch (urlError) {
        case 'unauthorized':
          setError('You do not have admin privileges. Please contact support.');
          break;
        case 'system_error':
          setError('System error occurred. Please try again or contact support.');
          break;
        default:
          setError('Authentication failed. Please try again.');
      }
    }
  }, [urlError]);

  // Initialize Supabase client with error handling
  const supabase = createSupabaseClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('🔐 Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Login error:', error);
        throw error;
      }

      console.log('✅ Login successful:', data.user?.email);
      console.log('📊 Session data:', data.session);

      if (data.user) {
        // Wait a moment for session to be established
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verify session is established
        const { data: sessionData } = await supabase.auth.getSession();
        console.log('🔍 Current session:', sessionData.session);
        
        if (sessionData.session) {
          console.log('🚀 Redirecting to:', redirect);
          router.push(redirect);
        } else {
          console.error('❌ No session found after login');
          setError('Session not established. Please try again.');
        }
      }
    } catch (err: any) {
      console.error('❌ Login failed:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #293972 0%, #1a2550 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: '8px' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Image
              src="/AETC_Logo-main.png"
              alt="AETC Logo"
              width={80}
              height={80}
              style={{ objectFit: 'contain', margin: '0 auto' }}
            />
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
              Admin Login
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sign in to access the CMS
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoComplete="email"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              startIcon={<LogIn size={20} />}
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: '#1f2a5a' },
                py: 1.5,
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
            Use your Supabase account credentials to login
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography>Loading...</Typography></Box>}>
      <LoginForm />
    </Suspense>
  );
}

