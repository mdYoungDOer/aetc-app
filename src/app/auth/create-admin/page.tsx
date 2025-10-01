'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { UserPlus } from 'lucide-react';
import Image from 'next/image';

export default function CreateAdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Admin user created successfully! You can now login with these credentials.');
        setEmail('');
        setPassword('');
        setName('');
      } else {
        setError(data.error || 'Failed to create admin user');
      }
    } catch (err: any) {
      setError('An error occurred while creating admin user');
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
              Create Admin User
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Create a new admin account for the AETC 2026 system
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

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              autoComplete="name"
            />
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
              autoComplete="new-password"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <UserPlus size={20} />}
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: '#1f2a5a' },
                py: 1.5,
              }}
            >
              {loading ? 'Creating...' : 'Create Admin User'}
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="text"
              onClick={() => router.push('/auth/login')}
              sx={{ color: 'primary.main' }}
            >
              Back to Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
