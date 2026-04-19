'use client';

import { FsButton, FsTypography } from '@fs/core';
import { Box, Container, Paper } from '@mui/material';
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
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? `linear-gradient(165deg, ${theme.palette.background.default}, ${theme.palette.primary[900] ?? '#312e81'}55)`
            : `linear-gradient(165deg, ${theme.palette.background.default}, ${theme.palette.primary[50] ?? '#eef2ff'})`,
        p: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? 'none'
                : '0 12px 40px rgba(15, 23, 42, 0.08)',
            textAlign: 'center',
            backgroundColor: 'background.paper',
          }}
        >
          <FsTypography
            variant="h3"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: (theme) =>
                `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            i18nKey={'Welcome to Our Public Site'}
          />
          <FsTypography
            variant="body1"
            sx={{
              mb: 4,
              color: 'text.secondary',
              lineHeight: 1.75,
            }}
            i18nKey={'Explore our content without any login requirements.'}
          />
          <Link href="/login" passHref style={{ textDecoration: 'none' }}>
            <FsButton
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 1.25,
                borderRadius: 2,
                fontWeight: 600,
              }}
              i18nKey="Login"
            />
          </Link>
        </Paper>
      </Container>
    </Box>
  );
}
