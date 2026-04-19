'use client';
import { FsButton, FsTypography } from '@fs/core';
import { Box, Container, Paper, useTheme } from '@mui/material';

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
        px: { xs: 2, sm: 3 },
        py: 8,
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            textAlign: 'center',
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[1],
            bgcolor: 'background.paper',
          }}
        >
          <FsTypography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.25rem' },
              letterSpacing: '-0.02em',
              color: 'primary.main',
            }}
          >
            به بازارسرا خوش آمدید
          </FsTypography>
          <FsTypography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.5rem' },
              color: 'text.secondary',
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
              color: 'text.secondary',
              maxWidth: 560,
              mx: 'auto',
            }}
          >
            بازارسرا با ارائه بهترین محصولات و خدمات، تجربه خرید متفاوتی را برای
            شما فراهم می‌کند. از محصولات تازه تا کالاهای خانگی، همه چیز را در یک
            مکان پیدا کنید.
          </FsTypography>
          <FsButton
            variant="contained"
            size="large"
            sx={{
              fontWeight: 600,
              px: 5,
              py: 1.75,
              fontSize: '1.05rem',
              borderRadius: 2,
            }}
          >
            شروع خرید
          </FsButton>
        </Paper>
      </Container>
    </Box>
  );
};

export default HeroSection;
