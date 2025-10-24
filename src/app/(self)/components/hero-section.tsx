'use client';
import { FsButton, FsTypography } from '@fs/core';
import { Box, Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import { Storefront as StorefrontIcon } from '@mui/icons-material';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box id="home" sx={{ pt: 12, pb: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              <FsTypography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.common.white,
                  mb: 2,
                  textShadow: `2px 2px 4px ${theme.palette.common.black}4D`,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                به بازارسرا خوش آمدید
              </FsTypography>
              <FsTypography
                variant="h5"
                sx={{
                  color: `${theme.palette.common.white}E6`,
                  mb: 3,
                  fontWeight: 500,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                }}
              >
                هایپرمارکت مدرن و کامل شما
              </FsTypography>
              <FsTypography
                variant="body1"
                sx={{
                  color: `${theme.palette.common.white}CC`,
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.6,
                }}
              >
                بازارسرا با ارائه بهترین محصولات و خدمات، تجربه خرید متفاوتی را
                برای شما فراهم می‌کند. از محصولات تازه تا کالاهای خانگی، همه چیز
                را در یک مکان پیدا کنید.
              </FsTypography>
              <FsButton
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: theme.palette.common.white,
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 3,
                  boxShadow: `0 4px 20px ${theme.palette.common.black}33`,
                  '&:hover': {
                    backgroundColor: `${theme.palette.common.white}E6`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 25px ${theme.palette.common.black}40`,
                  },
                }}
              >
                شروع خرید
              </FsButton>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ textAlign: 'center' }}>
              <StorefrontIcon
                sx={{
                  fontSize: { xs: 200, md: 300 },
                  color: 'rgba(255, 255, 255, 0.3)',
                  animation: 'pulse 3s ease-in-out infinite',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
