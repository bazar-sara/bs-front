import { FsButton } from '@fs/core';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default async function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.paper',
        p: 4,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          mb: 4,
          color: 'primary.600',
          fontWeight: 700,
        }}
      >
        Your Dashboard
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: 'text.primary',
          maxWidth: '600px',
        }}
      >
        Welcome back, user! You&apos;re viewing protected content.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link href="/public" passHref>
          <FsButton variant="outlined" sx={{ color: 'secondary.main' }}>
            Public Page
          </FsButton>
        </Link>
        <FsButton
          variant="contained"
          sx={{ bgcolor: 'error.main' }}
          component={Link}
          href="/api/auth/signout"
        >
          Logout
        </FsButton>
      </Box>
    </Box>
  );
}
