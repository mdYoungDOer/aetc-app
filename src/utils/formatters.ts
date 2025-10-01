import { format } from 'date-fns';

export const formatCurrency = (amount: number, currency: string = 'GHS'): string => {
  if (currency === 'GHS') {
    return `₵${amount.toLocaleString('en-GH')}`;
  }
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: Date | string, formatStr: string = 'PPP'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr);
};

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'PPP p');
};

