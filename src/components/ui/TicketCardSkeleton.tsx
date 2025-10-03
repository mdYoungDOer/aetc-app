'use client';

import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material';

export default function TicketCardSkeleton() {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Stack spacing={2}>
          {/* Header with icon and badge */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rounded" width={80} height={20} />
          </Box>

          {/* Title */}
          <Skeleton variant="text" width="80%" height={32} />

          {/* Price */}
          <Skeleton variant="text" width="60%" height={24} />

          {/* Description */}
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />

          {/* Features */}
          <Box sx={{ mt: 2 }}>
            {[1, 2, 3].map((i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Skeleton variant="circular" width={16} height={16} sx={{ mr: 1 }} />
                <Skeleton variant="text" width="80%" height={16} />
              </Box>
            ))}
          </Box>

          {/* Button */}
          <Box sx={{ mt: 3 }}>
            <Skeleton variant="rounded" width="100%" height={40} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function TicketGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <TicketCardSkeleton key={index} />
      ))}
    </>
  );
}
