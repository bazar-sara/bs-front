'use client';
import { FsTypography } from '@fs/core';
import { Box, Container, IconButton, useTheme, Tooltip } from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { useAuth } from '@/contexts/auth-context';
import ThemeToggle from '@/app/(self)/components/theme-toggle';

const StyledHeader = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  background: `${theme.palette.primary.main}95`,
  backdropFilter: 'blur(10px)',
  boxShadow: `0 2px 20px ${theme.palette.common.black}1A`,
  borderBottom: `1px solid ${theme.palette.primary.main}30`,
}));

export const CartHeader = () => {
  const theme = useTheme();
  const router = useRouter();
  const { logout } = useAuth();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleLogout = () => {
    logout();
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
                  color: theme.palette.common.white,
                  backgroundColor: `${theme.palette.common.white}10`,
                  '&:hover': {
                    backgroundColor: `${theme.palette.common.white}20`,
                    transform: 'scale(1.1)',
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
                fontWeight: 700,
                color: theme.palette.common.white,
                textShadow: `2px 2px 4px ${theme.palette.common.black}4D`,
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
                  color: theme.palette.common.white,
                  backgroundColor: `${theme.palette.common.white}10`,
                  border: `2px solid ${theme.palette.common.white}30`,
                  '&:hover': {
                    backgroundColor: `${theme.palette.error.main}20`,
                    borderColor: theme.palette.error.main,
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
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
