'use client';

import { Box, Typography, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FormSubmissionsChartProps {
  data: Array<{
    date: string;
    submissions: number;
  }>;
}

export default function FormSubmissionsChart({ data }: FormSubmissionsChartProps) {
  return (
    <Paper sx={{ p: 3, borderRadius: '8px' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        Form Submissions Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="submissions"
            stroke="#78C044"
            strokeWidth={3}
            name="Submissions"
            dot={{ fill: '#78C044', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

