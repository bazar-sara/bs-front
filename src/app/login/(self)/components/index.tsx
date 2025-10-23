'use client';
import { FsButton, FsTypography } from '@fs/core';
import { FsFormProvider, FsInput } from '@fs/form';
import { Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const GradientBackground = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `linear-gradient(-45deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  zIndex: -1,
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
}));

const FloatingCircles = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: -1,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.15,
    animation: 'float 25s linear infinite',
  },
  '&::before': {
    width: '40vmax',
    height: '40vmax',
    background: theme.palette.primary.main,
    top: '10%',
    left: '10%',
  },
  '&::after': {
    width: '60vmax',
    height: '60vmax',
    background: theme.palette.secondary.main,
    bottom: '10%',
    right: '10%',
    animationDelay: '10s',
  },
  '@keyframes float': {
    '0%': { transform: 'translate(0, 0) rotate(0deg)' },
    '25%': { transform: 'translate(5vw, 10vh) rotate(90deg)' },
    '50%': { transform: 'translate(0, 20vh) rotate(180deg)' },
    '75%': { transform: 'translate(-5vw, 10vh) rotate(270deg)' },
    '100%': { transform: 'translate(0, 0) rotate(360deg)' },
  },
}));

const Login = () => {
  const [mounted, setMounted] = useState(false);
  const methods = useForm();
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  const navigateToSignup = () => {
    router.push('/sign-up');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        p: 2,
      }}
    >
      {mounted && (
        <>
          <GradientBackground />
          <FloatingCircles />
        </>
      )}

      <Paper
        elevation={10}
        sx={{
          width: '100%',
          maxWidth: 450,
          p: 4,
          borderRadius: 4,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          opacity: mounted ? 1 : 0,
          transition: 'all 0.5s ease-out',
        }}
      >
        <FsTypography
          i18nKey={'Welcome Back'}
          variant="h4"
          component="h1"
          align="center"
          sx={{ mb: 3, fontWeight: 700 }}
        />
        <FsFormProvider name="login" methods={methods}>
          <Grid
            container
            gap={3}
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
          >
            <Grid>
              <FsInput
                name="email"
                fullWidth
                i18nKey="Email Address"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid>
              <FsInput
                name="password"
                fullWidth
                i18nKey="Password"
                type="password"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
          </Grid>
          <FsButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #1976d2 0%, #2196f3 100%)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
              },
            }}
            i18nKey="Sign In"
          />
          <FsTypography variant="body2" align="center" sx={{ mt: 2 }}>
            Don&apos;t have an account?
            <FsButton
              sx={{ mx: 1 }}
              i18nKey="Create account"
              onClick={navigateToSignup}
            />
          </FsTypography>
        </FsFormProvider>
      </Paper>
    </Box>
  );
};

export default Login;
