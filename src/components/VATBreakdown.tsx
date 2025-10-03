'use client';

import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
} from '@mui/material';
import { Receipt, Info } from 'lucide-react';
import { VATBreakdown, formatVATBreakdown, GhanaVATCalculator } from '@/lib/vat-calculator';
import CustomCard from '@/components/ui/CustomCard';

interface VATBreakdownProps {
  breakdown: VATBreakdown;
  ticketName: string;
  quantity?: number;
}

export default function VATBreakdownComponent({ 
  breakdown, 
  ticketName, 
  quantity = 1 
}: VATBreakdownProps) {
  const formatted = formatVATBreakdown(breakdown);
  const totalForQuantity = breakdown.totalPrice * quantity;

  return (
    <CustomCard sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Receipt size={24} color="#293972" style={{ marginRight: 12 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Tax Breakdown - {ticketName}
        </Typography>
        {quantity > 1 && (
          <Chip 
            label={`${quantity} tickets`} 
            color="secondary" 
            size="small" 
            sx={{ ml: 2 }}
          />
        )}
      </Box>

      <TableContainer>
        <Table size="small">
          <TableBody>
            {/* Base Price */}
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                Base Price
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                {formatted.basePrice}
              </TableCell>
            </TableRow>

            {/* Levies Section */}
            <TableRow>
              <TableCell colSpan={2} sx={{ pt: 2, pb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Government Levies (6%)
                </Typography>
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell sx={{ pl: 3, color: 'text.secondary' }}>
                National Health Insurance Levy (NHIL)
              </TableCell>
              <TableCell align="right" sx={{ color: 'text.secondary' }}>
                {formatted.levies.nhil}
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell sx={{ pl: 3, color: 'text.secondary' }}>
                Ghana Education Trust Fund (GETFund)
              </TableCell>
              <TableCell align="right" sx={{ color: 'text.secondary' }}>
                {formatted.levies.getfund}
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell sx={{ pl: 3, color: 'text.secondary' }}>
                COVID-19 Health Recovery Levy (CHRL)
              </TableCell>
              <TableCell align="right" sx={{ color: 'text.secondary' }}>
                {formatted.levies.chrl}
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell sx={{ pl: 3, fontWeight: 600, color: 'text.primary' }}>
                Total Levies
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                {formatted.levies.total}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ pl: 3, color: 'text.secondary' }}>
                Subtotal (Base + Levies)
              </TableCell>
              <TableCell align="right" sx={{ color: 'text.secondary' }}>
                {GhanaVATCalculator.formatCurrency(breakdown.basePrice + breakdown.levies.total)}
              </TableCell>
            </TableRow>

            {/* VAT */}
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                Value Added Tax (VAT) - 15%
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                {formatted.vat}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Divider />
              </TableCell>
            </TableRow>

            {/* Total */}
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'primary.main' }}>
                Total Price per Ticket
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'primary.main' }}>
                {formatted.totalPrice}
              </TableCell>
            </TableRow>

            {quantity > 1 && (
              <>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Divider />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: '1.2rem', color: 'secondary.main' }}>
                    Total for {quantity} Tickets
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, fontSize: '1.2rem', color: 'secondary.main' }}>
                    {GhanaVATCalculator.formatCurrency(totalForQuantity)}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tax Information */}
      <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Info size={16} color="#FBA91E" style={{ marginRight: 8 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Tax Information
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
          All prices include Ghana VAT (15%) and government levies (6%). 
          Total effective tax rate: 21.9% as per Ghana Revenue Authority regulations.
        </Typography>
      </Box>
    </CustomCard>
  );
}
