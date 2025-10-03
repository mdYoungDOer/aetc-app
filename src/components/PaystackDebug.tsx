'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Alert, Button } from '@mui/material';
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function PaystackDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkEnvironment = () => {
    setLoading(true);
    
    const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY;
    
    const info = {
      timestamp: new Date().toISOString(),
      environment: {
        NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: {
          exists: !!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          value: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ? 
            `${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.substring(0, 10)}...` : 
            'undefined',
          startsWithPk: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY?.startsWith('pk_') || false
        },
        PAYSTACK_PUBLIC_KEY: {
          exists: !!process.env.PAYSTACK_PUBLIC_KEY,
          value: process.env.PAYSTACK_PUBLIC_KEY ? 
            `${process.env.PAYSTACK_PUBLIC_KEY.substring(0, 10)}...` : 
            'undefined',
          startsWithPk: process.env.PAYSTACK_PUBLIC_KEY?.startsWith('pk_') || false
        },
        PAYSTACK_PUBLIC_KEY_RESOLVED: {
          exists: !!paystackPublicKey,
          value: paystackPublicKey ? 
            `${paystackPublicKey.substring(0, 10)}...` : 
            'undefined',
          startsWithPk: paystackPublicKey?.startsWith('pk_') || false
        },
        PAYSTACK_SECRET_KEY: {
          exists: !!process.env.PAYSTACK_SECRET_KEY,
          value: process.env.PAYSTACK_SECRET_KEY ? 
            `${process.env.PAYSTACK_SECRET_KEY.substring(0, 10)}...` : 
            'undefined',
          startsWithSk: process.env.PAYSTACK_SECRET_KEY?.startsWith('sk_') || false
        }
      },
      window: {
        PaystackPop: !!(window as any).PaystackPop,
        location: window.location.href,
        userAgent: navigator.userAgent
      },
      network: {
        online: navigator.onLine
      }
    };

    setDebugInfo(info);
    setLoading(false);
  };

  useEffect(() => {
    checkEnvironment();
  }, []);

  if (!debugInfo) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Loading debug info...</Typography>
      </Box>
    );
  }

  const getStatusIcon = (condition: boolean) => {
    return condition ? <CheckCircle size={16} color="green" /> : <XCircle size={16} color="red" />;
  };

  const getStatusColor = (condition: boolean) => {
    return condition ? 'success' : 'error';
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="h6">Paystack Debug Information</Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshCw size={16} />}
          onClick={checkEnvironment}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Environment Variables */}
        <Alert 
          severity={getStatusColor(debugInfo.environment.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.exists)} 
          icon={getStatusIcon(debugInfo.environment.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.exists)}
        >
          <Typography variant="subtitle2" gutterBottom>
            NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
          </Typography>
          <Typography variant="body2">
            Exists: {debugInfo.environment.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.exists ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2">
            Value: {debugInfo.environment.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.value}
          </Typography>
          <Typography variant="body2">
            Valid Format: {debugInfo.environment.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.startsWithPk ? 'Yes' : 'No'}
          </Typography>
        </Alert>

        <Alert 
          severity={getStatusColor(debugInfo.environment.PAYSTACK_PUBLIC_KEY.exists)} 
          icon={getStatusIcon(debugInfo.environment.PAYSTACK_PUBLIC_KEY.exists)}
        >
          <Typography variant="subtitle2" gutterBottom>
            PAYSTACK_PUBLIC_KEY
          </Typography>
          <Typography variant="body2">
            Exists: {debugInfo.environment.PAYSTACK_PUBLIC_KEY.exists ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2">
            Value: {debugInfo.environment.PAYSTACK_PUBLIC_KEY.value}
          </Typography>
          <Typography variant="body2">
            Valid Format: {debugInfo.environment.PAYSTACK_PUBLIC_KEY.startsWithPk ? 'Yes' : 'No'}
          </Typography>
        </Alert>

        <Alert 
          severity={getStatusColor(debugInfo.environment.PAYSTACK_PUBLIC_KEY_RESOLVED.exists)} 
          icon={getStatusIcon(debugInfo.environment.PAYSTACK_PUBLIC_KEY_RESOLVED.exists)}
        >
          <Typography variant="subtitle2" gutterBottom>
            RESOLVED PAYSTACK_PUBLIC_KEY (Used by App)
          </Typography>
          <Typography variant="body2">
            Exists: {debugInfo.environment.PAYSTACK_PUBLIC_KEY_RESOLVED.exists ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2">
            Value: {debugInfo.environment.PAYSTACK_PUBLIC_KEY_RESOLVED.value}
          </Typography>
          <Typography variant="body2">
            Valid Format: {debugInfo.environment.PAYSTACK_PUBLIC_KEY_RESOLVED.startsWithPk ? 'Yes' : 'No'}
          </Typography>
        </Alert>

        <Alert 
          severity={getStatusColor(debugInfo.environment.PAYSTACK_SECRET_KEY.exists)} 
          icon={getStatusIcon(debugInfo.environment.PAYSTACK_SECRET_KEY.exists)}
        >
          <Typography variant="subtitle2" gutterBottom>
            PAYSTACK_SECRET_KEY
          </Typography>
          <Typography variant="body2">
            Exists: {debugInfo.environment.PAYSTACK_SECRET_KEY.exists ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2">
            Value: {debugInfo.environment.PAYSTACK_SECRET_KEY.value}
          </Typography>
          <Typography variant="body2">
            Valid Format: {debugInfo.environment.PAYSTACK_SECRET_KEY.startsWithSk ? 'Yes' : 'No'}
          </Typography>
        </Alert>

        {/* Window Object */}
        <Alert 
          severity={getStatusColor(debugInfo.window.PaystackPop)} 
          icon={getStatusIcon(debugInfo.window.PaystackPop)}
        >
          <Typography variant="subtitle2" gutterBottom>
            PaystackPop Object
          </Typography>
          <Typography variant="body2">
            Available: {debugInfo.window.PaystackPop ? 'Yes' : 'No'}
          </Typography>
        </Alert>

        {/* Network Status */}
        <Alert 
          severity={getStatusColor(debugInfo.network.online)} 
          icon={getStatusIcon(debugInfo.network.online)}
        >
          <Typography variant="subtitle2" gutterBottom>
            Network Status
          </Typography>
          <Typography variant="body2">
            Online: {debugInfo.network.online ? 'Yes' : 'No'}
          </Typography>
        </Alert>

        {/* Recommendations */}
        {!debugInfo.environment.PAYSTACK_PUBLIC_KEY_RESOLVED.exists && (
          <Alert severity="error" icon={<AlertCircle size={16} />}>
            <Typography variant="subtitle2" gutterBottom>
              Missing Paystack Public Key
            </Typography>
            <Typography variant="body2">
              You need to add either NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY or PAYSTACK_PUBLIC_KEY to your DigitalOcean App Platform environment variables.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Recommended:</strong> Use NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY for better Next.js compatibility.
            </Typography>
          </Alert>
        )}

        {debugInfo.environment.PAYSTACK_PUBLIC_KEY.exists && !debugInfo.environment.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.exists && (
          <Alert severity="info" icon={<AlertCircle size={16} />}>
            <Typography variant="subtitle2" gutterBottom>
              Environment Variable Found
            </Typography>
            <Typography variant="body2">
              You have PAYSTACK_PUBLIC_KEY set, which will work. For better Next.js compatibility, consider renaming it to NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.
            </Typography>
          </Alert>
        )}

        {debugInfo.environment.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.exists && 
         !debugInfo.environment.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.startsWithPk && (
          <Alert severity="warning" icon={<AlertCircle size={16} />}>
            <Typography variant="subtitle2" gutterBottom>
              Invalid Key Format
            </Typography>
            <Typography variant="body2">
              The Paystack public key should start with 'pk_test_' or 'pk_live_'.
            </Typography>
          </Alert>
        )}

        {!debugInfo.window.PaystackPop && (
          <Alert severity="warning" icon={<AlertCircle size={16} />}>
            <Typography variant="subtitle2" gutterBottom>
              Paystack Script Not Loaded
            </Typography>
            <Typography variant="body2">
              The Paystack script may not have loaded properly. Try refreshing the page.
            </Typography>
          </Alert>
        )}
      </Box>

      <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.default', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Debug timestamp: {debugInfo.timestamp}
        </Typography>
      </Box>
    </Box>
  );
}
