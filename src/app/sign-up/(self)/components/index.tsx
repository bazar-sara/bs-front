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

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userType, setUserType] = useState<UserType>('retail');
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<SignUpFormData>();
  const router = useRouter();
  const { login: loginUser } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigateToLogin = () => {
    router.push('/login');
  };

  const handleUserTypeChange = (newType: UserType) => {
    setUserType(newType);
  };

  const onSubmit = async (data: SignUpFormData) => {
    if (!userType) return;
    setIsLoading(true);
    try {
      await loginUser(data.email, data.password, userType);
      router.push('/');
    } catch (error) {
      console.error('Sign up error:', error);
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
          i18nKey={'Create Account'}
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
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card
                onClick={() => handleUserTypeChange('retail')}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: 2,
                  borderColor:
                    userType === 'retail'
                      ? theme.palette.success.main
                      : 'divider',
                  backgroundColor:
                    userType === 'retail'
                      ? `${theme.palette.success.main}15`
                      : 'background.paper',
                  boxShadow:
                    userType === 'retail'
                      ? `0 4px 12px ${theme.palette.success.main}40`
                      : 1,
                  '&:hover': {
                    borderColor: userType === 'retail' ? theme.palette.success.dark : theme.palette.success.main,
                    boxShadow: userType === 'retail' 
                      ? `0 4px 16px ${theme.palette.success.main}50`
                      : `0 2px 8px ${theme.palette.success.main}30`,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        userType === 'retail'
                          ? `${theme.palette.success.main}20`
                          : `${theme.palette.success.main}08`,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ShoppingCartIcon
                      sx={{
                        fontSize: 24,
                        color:
                          userType === 'retail'
                            ? theme.palette.success.dark
                            : theme.palette.text.secondary,
                      }}
                    />
                  </Box>
                  <FsTypography
                    variant="body1"
                    sx={{
                      fontWeight: userType === 'retail' ? 700 : 600,
                      fontSize: '0.95rem',
                      color:
                        userType === 'retail'
                          ? theme.palette.success.dark
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
                onClick={() => handleUserTypeChange('wholesale')}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: 2,
                  borderColor:
                    userType === 'wholesale'
                      ? theme.palette.info.main
                      : 'divider',
                  backgroundColor:
                    userType === 'wholesale'
                      ? `${theme.palette.info.main}15`
                      : 'background.paper',
                  boxShadow:
                    userType === 'wholesale'
                      ? `0 4px 12px ${theme.palette.info.main}40`
                      : 1,
                  '&:hover': {
                    borderColor: userType === 'wholesale' ? theme.palette.info.dark : theme.palette.info.main,
                    boxShadow: userType === 'wholesale' 
                      ? `0 4px 16px ${theme.palette.info.main}50`
                      : `0 2px 8px ${theme.palette.info.main}30`,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        userType === 'wholesale'
                          ? `${theme.palette.info.main}20`
                          : `${theme.palette.info.main}08`,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <StoreIcon
                      sx={{
                        fontSize: 24,
                        color:
                          userType === 'wholesale'
                            ? theme.palette.info.dark
                            : theme.palette.text.secondary,
                      }}
                    />
                  </Box>
                  <FsTypography
                    variant="body1"
                    sx={{
                      fontWeight: userType === 'wholesale' ? 700 : 600,
                      fontSize: '0.95rem',
                      color:
                        userType === 'wholesale'
                          ? theme.palette.info.dark
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
          name="signup"
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
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsInput
                  name="firstName"
                  fullWidth
                  i18nKey="First Name"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsInput
                  name="lastName"
                  fullWidth
                  i18nKey="Last Name"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>
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

            <Grid>
              <FsInput
                name="confirmPassword"
                fullWidth
                i18nKey="Confirm Password"
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
            i18nKey={isLoading ? 'Signing Up...' : 'Sign Up'}
          />

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <FsTypography component="span" i18nKey="Already have an account?" variant="body2" />
            <FsButton
              sx={{ mx: 1 }}
              i18nKey="Sign in"
              onClick={navigateToLogin}
            />
          </Box>
        </FsFormProvider>
      </Paper>
    </Box>
  );
};

export default SignUp;
