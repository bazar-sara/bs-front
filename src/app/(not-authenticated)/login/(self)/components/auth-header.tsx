'use client';
import { FsTypography } from '@fs/core';
import { Box } from '@mui/material';

type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <FsTypography
        i18nKey={title}
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 800,
          mb: 1,
          color: 'text.primary',
        }}
      />
      <FsTypography
        variant="body1"
        sx={{ color: 'text.secondary', fontSize: '0.95rem' }}
      >
        {subtitle}
      </FsTypography>
    </Box>
  );
};
