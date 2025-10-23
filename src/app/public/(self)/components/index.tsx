import { FsButton, FsTypography } from '@fs/core';
import { Box } from '@mui/material';
import Link from 'next/link';

export default function PublicPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        p: 4,
        textAlign: 'center',
      }}
    >
      <FsTypography
        variant="h3"
        component="h1"
        sx={{
          mb: 4,
          color: 'primary.600',
          fontWeight: 700,
        }}
        i18nKey={'Welcome to Our Public Site'}
      />
      <FsTypography
        variant="body1"
        sx={{
          mb: 4,
          color: 'text.primary',
          maxWidth: '600px',
        }}
        i18nKey={'Explore our content without any login requirements.'}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link href="/login" passHref>
          <FsButton
            variant="contained"
            color="primary"
            sx={{ bgcolor: 'primary.600' }}
            i18nKey="Login"
          />
        </Link>
      </Box>
    </Box>
  );
}
