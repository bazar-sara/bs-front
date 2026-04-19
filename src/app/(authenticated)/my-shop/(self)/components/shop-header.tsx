'use client';
import { FsTypography } from '@fs/core';
import { Box, Container, IconButton, useTheme, Tooltip } from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { useAuth } from '@/app/common/hooks/use-auth';
import { ThemeToggle } from '@/app/common/components';

const StyledHeader = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(12px)',
  boxShadow: `0 1px 0 ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const ShopHeader = () => {
  const theme = useTheme();
  const router = useRouter();
  const { logout } = useAuth();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <StyledHeader>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1.5,
          }}
        >
          {/* Brand Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="بازگشت به صفحه اصلی">
              <IconButton
                onClick={handleGoHome}
                sx={{
                  color: 'primary.main',
                  backgroundColor: `${theme.palette.primary.main}0f`,
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}18`,
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <FsTypography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              بازارسرا
            </FsTypography>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ThemeToggle />
            <Tooltip title="خروج از حساب">
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: 'text.secondary',
                  backgroundColor: 'action.hover',
                  border: `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    backgroundColor: `${theme.palette.error.main}14`,
                    borderColor: theme.palette.error.main,
                    color: 'error.main',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </StyledHeader>
  );
};
