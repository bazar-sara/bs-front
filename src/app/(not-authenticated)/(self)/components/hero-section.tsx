'use client';
import { FsButton, FsTypography } from '@fs/core';
import { Box, Container, useTheme } from '@mui/material';

const HeroSection = () => {
  const theme = useTheme();

  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        px: { xs: 2, sm: 3 },
        py: 8,
      }}
    >
      {/* Spinning decoration – top left */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 80, md: 100 },
          left: { xs: -60, md: -40 },
          width: { xs: 220, md: 320 },
          height: { xs: 220, md: 320 },
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            border: `3px dashed ${theme.palette.primary.main}40`,
            borderRadius: '50%',
            animation: 'heroSpin 25s linear infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: 12,
            bottom: 12,
            border: `2px solid ${theme.palette.primary[400]}30`,
            borderRadius: '50%',
            animation: 'heroSpinReverse 18s linear infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: `1px solid ${theme.palette.primary.main}25`,
            borderRadius: '50%',
            animation: 'heroSpin 32s linear infinite',
          }}
        />
      </Box>

      {/* Spinning decoration – bottom right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: -80, md: -60 },
          right: { xs: -80, md: -60 },
          width: { xs: 280, md: 380 },
          height: { xs: 280, md: 380 },
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            border: `3px dashed ${theme.palette.primary[600]}35`,
            borderRadius: '50%',
            animation: 'heroSpinReverse 28s linear infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            bottom: 16,
            border: `2px solid ${theme.palette.primary.main}30`,
            borderRadius: '50%',
            animation: 'heroSpin 22s linear infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            border: `1px dashed ${theme.palette.primary[400]}20`,
            borderRadius: '50%',
            animation: 'heroSpinReverse 35s linear infinite',
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Content card with animated background */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: `0 24px 48px ${theme.palette.common.black}25`,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(120deg,
                ${theme.palette.primary.main}22 0%,
                ${theme.palette.primary[700]}18 25%,
                ${theme.palette.primary[500]}28 50%,
                ${theme.palette.primary[800]}20 75%,
                ${theme.palette.primary.main}24 100%)`,
              backgroundSize: '400% 400%',
              animation: 'heroGradient 12s ease infinite',
              zIndex: 0,
            },
          }}
        >
          {/* Glass overlay + content */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              backdropFilter: 'blur(12px)',
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? `${theme.palette.background.paper}E8`
                  : `${theme.palette.background.paper}F2`,
              border: `1px solid ${theme.palette.primary.main}30`,
              borderRadius: 4,
              p: { xs: 3, sm: 4, md: 5 },
              textAlign: 'center',
            }}
          >
            <FsTypography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                color: theme.palette.primary.main,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.25rem' },
                letterSpacing: '-0.02em',
              }}
            >
              به بازارسرا خوش آمدید
            </FsTypography>
            <FsTypography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: theme.palette.text.secondary,
                fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.5rem' },
              }}
            >
              هایپرمارکت مدرن و کامل شما
            </FsTypography>
            <FsTypography
              variant="body1"
              sx={{
                mb: 4,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                lineHeight: 1.7,
                color: theme.palette.text.secondary,
                maxWidth: 560,
                mx: 'auto',
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
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                fontWeight: 600,
                px: 5,
                py: 1.75,
                fontSize: '1.1rem',
                borderRadius: 3,
                boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                '&:hover': {
                  backgroundColor:
                    theme.palette.primary.dark ?? theme.palette.primary[700],
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 32px ${theme.palette.primary.main}50`,
                },
                transition: 'all 0.25s ease',
              }}
            >
              شروع خرید
            </FsButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
