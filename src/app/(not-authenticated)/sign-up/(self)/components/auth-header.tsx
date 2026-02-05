'use client';
import { FsTypography } from '@fs/core';
import { Box, useTheme, alpha } from '@mui/material';
import {
  VerifiedUser as VerifiedIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';

type AuthHeaderProps = {
  title: string;
  subtitle: string;
  icon?: 'login' | 'signup';
};

export const AuthHeader = ({
  title,
  subtitle,
  icon = 'signup',
}: AuthHeaderProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
          },
        }}
      >
        {icon === 'login' ? (
          <VerifiedIcon sx={{ fontSize: 40, color: 'white' }} />
        ) : (
          <PersonAddIcon sx={{ fontSize: 40, color: 'white' }} />
        )}
      </Box>
      <FsTypography
        i18nKey={title}
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 800,
          mb: 1,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      />
      <FsTypography variant="body1" sx={{ fontSize: '0.95rem' }}>
        {subtitle}
      </FsTypography>
    </Box>
  );
};
