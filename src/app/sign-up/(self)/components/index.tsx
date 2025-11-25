'use client';
import { FsFormProvider, FsInput } from '@fs/form';
import { FsTypography } from '@fs/core';
import { Box, useTheme, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth, type UserType } from '@/contexts/auth-context';
import { toast } from 'sonner';
import {
  AnimatedBackground,
  FloatingParticles,
  AuthPaper,
} from './styled-components';
import { UserTypeCard } from './user-type-card';
import { AuthHeader } from './auth-header';
import { OtpSection } from './otp-section';
import { SubmitButton } from './submit-button';
import { FooterLink } from './footer-link';
import type { SignUpFormData } from './types';

const SignUp = () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userType, setUserType] = useState<UserType>('retail');
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const methods = useForm<SignUpFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      otp: ['', '', '', '', '', ''],
    },
  });
  const router = useRouter();
  const { requestOtp, verifyOtp, updateUser } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const navigateToLogin = () => {
    router.push('/login');
  };

  const handleUserTypeChange = (newType: UserType) => {
    setUserType(newType);
  };

  const handleRequestOtp = async () => {
    const phoneNumber = methods.getValues('phoneNumber');
    if (!phoneNumber) {
      toast.error('لطفاً شماره موبایل خود را وارد کنید');
      return;
    }

    if (!userType) {
      toast.error('لطفاً نوع حساب کاربری را انتخاب کنید');
      return;
    }

    setIsRequestingOtp(true);
    try {
      const response = await requestOtp(phoneNumber);
      setOtpSent(true);
      setCountdown(response.resendAfter || 60);
      toast.success('کد تأیید با موفقیت ارسال شد');
    } catch (error: unknown) {
      const message =
        (
          error as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (error as { message?: string })?.message ||
        'ارسال کد تأیید با خطا مواجه شد';
      toast.error(message);
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    if (!userType) {
      toast.error('لطفاً نوع حساب کاربری را انتخاب کنید');
      return;
    }

    const otp = data.otp.join('');
    if (otp.length !== 6) {
      toast.error('لطفاً کد تأیید ۶ رقمی را وارد کنید');
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtp(data.phoneNumber, otp, userType);

      // Update user with additional info if provided
      if (data.firstName || data.lastName) {
        updateUser({
          firstName: data.firstName,
          lastName: data.lastName,
        });
      }

      toast.success('حساب کاربری با موفقیت ایجاد شد');
      router.push('/');
    } catch (error: unknown) {
      const message =
        (
          error as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (error as { message?: string })?.message ||
        'ثبت نام با خطا مواجه شد';
      toast.error(message);
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
        p: { xs: 3, sm: 4, md: 5 },
        py: { xs: 4, sm: 5, md: 6 },
      }}
    >
      {mounted && (
        <>
          <AnimatedBackground />
          <FloatingParticles />
        </>
      )}

      <AuthPaper
        elevation={0}
        sx={{
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          opacity: mounted ? 1 : 0,
          p: { xs: 3, sm: 4, md: 5 },
          py: { xs: 4, sm: 5, md: 6 },
        }}
      >
        <AuthHeader
          title="Create Account"
          subtitle="حساب کاربری جدید خود را ایجاد کنید"
          icon="signup"
        />

        {/* Account Type Selection */}
        <Box sx={{ mb: 4 }}>
          <FsTypography
            variant="subtitle2"
            sx={{
              mb: 2.5,
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.875rem',
              textAlign: 'center',
            }}
            i18nKey="Select your account type"
          />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <UserTypeCard
                type="retail"
                isSelected={userType === 'retail'}
                onClick={() => handleUserTypeChange('retail')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <UserTypeCard
                type="wholesale"
                isSelected={userType === 'wholesale'}
                onClick={() => handleUserTypeChange('wholesale')}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Form */}
        <FsFormProvider
          name="signup"
          // @ts-expect-error - FsFormProvider expects FieldValues but we're using typed form
          methods={methods}
          formProps={{ onSubmit: methods.handleSubmit(onSubmit) }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.8
                      ),
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: alpha(
                          theme.palette.background.paper,
                          1
                        ),
                      },
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
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.8
                      ),
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: alpha(
                          theme.palette.background.paper,
                          1
                        ),
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box>
              <FsInput
                name="phoneNumber"
                fullWidth
                i18nKey="Phone Number"
                variant="outlined"
                type="tel"
                disabled={otpSent}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.background.paper, 0.8),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.background.paper, 1),
                    },
                  },
                }}
              />
            </Box>

            <OtpSection
              otpSent={otpSent}
              countdown={countdown}
              isRequestingOtp={isRequestingOtp}
              onRequestOtp={handleRequestOtp}
            />

            {otpSent && (
              <SubmitButton
                isLoading={isLoading}
                disabled={!otpSent}
                i18nKey={isLoading ? 'Signing Up...' : 'Sign Up'}
              />
            )}
          </Box>

          <FooterLink
            text="Already have an account?"
            linkText="Sign in"
            linkI18nKey="Sign in"
            onClick={navigateToLogin}
          />
        </FsFormProvider>
      </AuthPaper>
    </Box>
  );
};

export default SignUp;
