'use client';
import { FsButton, FsTypography } from '@fs/core';
import { FsFormProvider, FsInput } from '@fs/form';
import { Box, Paper, Card, CardContent, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth, type UserType } from '@/contexts/auth-context';

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

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loginType, setLoginType] = useState<UserType>('retail');
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<LoginFormData>();
  const router = useRouter();
  const { login: loginUser } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigateToSignup = () => {
    router.push('/sign-up');
  };

  const handleLoginTypeChange = (newType: UserType) => {
    setLoginType(newType);
  };

  const onSubmit = async (data: LoginFormData) => {
    if (!loginType) return;
    setIsLoading(true);
    try {
      await loginUser(data.email, data.password, loginType);
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
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
        <Box sx={{ mb: 3 }}>
          <FsTypography
            variant="body2"
            align="center"
            sx={{ mb: 2, color: 'text.secondary' }}
            i18nKey="Select your account type"
          />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card
                onClick={() => handleLoginTypeChange('retail')}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 2,
                  borderColor:
                    loginType === 'retail'
                      ? theme.palette.primary.main
                      : 'divider',
                  backgroundColor:
                    loginType === 'retail'
                      ? `${theme.palette.primary.main}08`
                      : 'background.paper',
                  boxShadow:
                    loginType === 'retail'
                      ? `0 8px 24px ${theme.palette.primary.main}30`
                      : 1,
                  transform: loginType === 'retail' ? 'scale(1.02)' : 'scale(1)',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        loginType === 'retail'
                          ? `${theme.palette.primary.main}20`
                          : `${theme.palette.primary.main}08`,
                      transition: 'all 0.3s ease',
                      transform: loginType === 'retail' ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <ShoppingCartIcon
                      sx={{
                        fontSize: 32,
                        color:
                          loginType === 'retail'
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                      }}
                    />
                  </Box>
                  <FsTypography
                    variant="h6"
                    sx={{
                      fontWeight: loginType === 'retail' ? 700 : 600,
                      color:
                        loginType === 'retail'
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                    }}
                    i18nKey="Retail Buyer"
                  />
                  <FsTypography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                    }}
                    i18nKey="Retail buyer description"
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card
                onClick={() => handleLoginTypeChange('wholesale')}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 2,
                  borderColor:
                    loginType === 'wholesale'
                      ? theme.palette.secondary.main
                      : 'divider',
                  backgroundColor:
                    loginType === 'wholesale'
                      ? `${theme.palette.secondary.main}08`
                      : 'background.paper',
                  boxShadow:
                    loginType === 'wholesale'
                      ? `0 8px 24px ${theme.palette.secondary.main}30`
                      : 1,
                  transform: loginType === 'wholesale' ? 'scale(1.02)' : 'scale(1)',
                  '&:hover': {
                    borderColor: theme.palette.secondary.main,
                    boxShadow: `0 4px 16px ${theme.palette.secondary.main}40`,
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        loginType === 'wholesale'
                          ? `${theme.palette.secondary.main}20`
                          : `${theme.palette.secondary.main}08`,
                      transition: 'all 0.3s ease',
                      transform: loginType === 'wholesale' ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <StoreIcon
                      sx={{
                        fontSize: 32,
                        color:
                          loginType === 'wholesale'
                            ? theme.palette.secondary.main
                            : theme.palette.text.secondary,
                      }}
                    />
                  </Box>
                  <FsTypography
                    variant="h6"
                    sx={{
                      fontWeight: loginType === 'wholesale' ? 700 : 600,
                      color:
                        loginType === 'wholesale'
                          ? theme.palette.secondary.main
                          : theme.palette.text.primary,
                    }}
                    i18nKey="Producer & Wholesaler"
                  />
                  <FsTypography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                    }}
                    i18nKey="Wholesale seller description"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <FsFormProvider
          name="login"
          // @ts-expect-error - FsFormProvider expects FieldValues but we're using typed form
          methods={methods}
          formProps={{ onSubmit: methods.handleSubmit(onSubmit) }}
        >
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
            disabled={isLoading}
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
            i18nKey={isLoading ? 'Signing In...' : 'Sign In'}
          />
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <FsTypography
              component="span"
              i18nKey="Don't have an account?"
              variant="body2"
            />
            <FsButton
              sx={{ mx: 1 }}
              i18nKey="Create account"
              onClick={navigateToSignup}
            />
          </Box>
        </FsFormProvider>
      </Paper>
    </Box>
  );
};

export default Login;
