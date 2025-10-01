'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { X, ArrowRight, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

const purchaseSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Invalid phone number'),
  quantity: z.number().min(1).max(10),
});

type PurchaseFormData = z.infer<typeof purchaseSchema>;

interface TicketPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  ticket: {
    id: string;
    name: string;
    price: number;
    available: number;
  } | null;
}

export default function TicketPurchaseModal({ open, onClose, ticket }: TicketPurchaseModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      quantity: 1,
      customerName: '',
      customerEmail: user?.email || '',
      customerPhone: '',
    },
  });

  const quantity = watch('quantity');

  const handleClose = () => {
    reset();
    setActiveStep(0);
    setError('');
    onClose();
  };

  const onSubmit = async (data: PurchaseFormData) => {
    setLoading(true);
    setError('');

    try {
      // Initialize payment
      const response = await fetch('/api/tickets/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: ticket?.id,
          quantity: data.quantity,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          userId: user?.id || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to initialize payment');
      }

      // Redirect to Paystack checkout
      window.location.href = result.authorization_url;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  if (!ticket) return null;

  const totalAmount = ticket.price * (quantity || 1);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          maxHeight: '90vh',
        },
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Purchase {ticket.name}
            </Typography>
            <Button
              onClick={handleClose}
              sx={{ minWidth: 'auto', p: 1 }}
              disabled={loading}
            >
              <X size={24} />
            </Button>
          </DialogTitle>

          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <Stepper activeStep={activeStep}>
                <Step>
                  <StepLabel>Details</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Payment</StepLabel>
                </Step>
              </Stepper>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              id="purchase-form"
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                label="Full Name"
                {...register('customerName')}
                error={!!errors.customerName}
                helperText={errors.customerName?.message}
                fullWidth
                required
                disabled={loading}
              />

              <TextField
                label="Email Address"
                type="email"
                {...register('customerEmail')}
                error={!!errors.customerEmail}
                helperText={errors.customerEmail?.message}
                fullWidth
                required
                disabled={loading}
              />

              <TextField
                label="Phone Number"
                {...register('customerPhone')}
                error={!!errors.customerPhone}
                helperText={errors.customerPhone?.message}
                fullWidth
                required
                disabled={loading}
              />

              <TextField
                label="Quantity"
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                error={!!errors.quantity}
                helperText={errors.quantity?.message || `${ticket.available} tickets available`}
                fullWidth
                required
                inputProps={{ min: 1, max: Math.min(10, ticket.available) }}
                disabled={loading}
              />

              <Box
                sx={{
                  backgroundColor: 'background.default',
                  p: 3,
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Ticket Price:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ₵{ticket.price.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Quantity:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {quantity || 1}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    ₵{totalAmount.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="purchase-form"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <CreditCard size={20} />}
              sx={{
                backgroundColor: 'secondary.main',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#e59915',
                },
                px: 4,
              }}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </DialogActions>
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );
}

