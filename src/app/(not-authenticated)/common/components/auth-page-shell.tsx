'use client';

import { Box, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

type AuthPageShellProps = {
  children: ReactNode;
};

/** Full-viewport auth layout: top bar with exit-to-site, scrollable main (no `overflow: hidden` on the page root). */
export const AuthPageShell = ({ children }: AuthPageShellProps) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="header"
        sx={{
          flexShrink: 0,
          px: { xs: 2, sm: 3 },
          py: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          type="button"
          variant="text"
          color="inherit"
          startIcon={
            <ArrowBackIcon sx={{ fontSize: 20, transform: 'scaleX(-1)' }} />
          }
          onClick={() => router.push('/')}
          sx={{ fontWeight: 600, color: 'text.secondary' }}
        >
          بازگشتن به سایت
        </Button>
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 3, sm: 5 },
          px: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
