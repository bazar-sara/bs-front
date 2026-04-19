'use client';
import { FsFormProvider, FsInput } from '@fs/form';
// import { FsTypography } from '@fs/core';
import { Box } from '@mui/material';
// import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth, type UserType } from '@/app/common/hooks/use-auth';
import { getApiErrorMessage } from '@/app/common/services/auth/functions';
import { toast } from 'sonner';
import { AuthPageShell } from '@/app/(not-authenticated)/common/components/auth-page-shell';
import { AuthPaper } from './styled-components';
// import { UserTypeCard } from './user-type-card';
import { AuthHeader } from './auth-header';
import { OtpSection } from './otp-section';
import { SubmitButton } from './submit-button';
import { FooterLink } from './footer-link';
import type { LoginFormData } from './types';

const Login = () => {
  const [loginType] = useState<UserType>('retail');
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const methods = useForm<LoginFormData>({
    defaultValues: {
      phoneNumber: '',
      otp: ['', '', '', '', '', ''],
    },
  });
  const router = useRouter();
  const { requestOtp, verifyOtp } = useAuth();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const navigateToSignup = () => {
    router.push('/sign-up');
  };

  // const handleLoginTypeChange = (newType: UserType) => {
  //   setLoginType(newType);
  // };

  /** Step 1: `requestOtp` → panel `request-otp` API (via AuthProvider). */
  const handleRequestOtp = async () => {
    const phoneNumber = methods.getValues('phoneNumber');
    if (!phoneNumber) {
      toast.error('لطفاً شماره موبایل خود را وارد کنید');
      return;
    }

    if (!loginType) {
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
      toast.error(getApiErrorMessage(error, 'ارسال کد تأیید با خطا مواجه شد'));
    } finally {
      setIsRequestingOtp(false);
    }
  };

  /** Step 2: `verifyOtp` → panel `verify-otp` API, then redirect home. */
  const onSubmit = async (data: LoginFormData) => {
    if (!loginType) {
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
      await verifyOtp(data.phoneNumber, otp, loginType);
      toast.success('ورود با موفقیت انجام شد');
      router.push('/');
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'ورود با خطا مواجه شد'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageShell>
      <AuthPaper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5 },
        }}
      >
        <AuthHeader title="Welcome Back" subtitle="به بازارسرا خوش آمدید" />

        {/* <Box sx={{ mb: 3 }}>
          <FsTypography
            variant="subtitle2"
            sx={{
              mb: 2,
              fontWeight: 600,
              fontSize: '0.875rem',
              textAlign: 'center',
              color: 'text.secondary',
            }}
            i18nKey="Select your account type"
          />
           <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <UserTypeCard
                type="retail"
                isSelected={loginType === 'retail'}
                onClick={() => handleLoginTypeChange('retail')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <UserTypeCard
                type="wholesale"
                isSelected={loginType === 'wholesale'}
                onClick={() => handleLoginTypeChange('wholesale')}
              />
            </Grid>
          </Grid> 
        </Box> */}

        <FsFormProvider
          name="login"
          methods={methods}
          formProps={{ onSubmit: methods.handleSubmit(onSubmit) }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FsInput
              name="phoneNumber"
              fullWidth
              i18nKey="Phone Number"
              variant="outlined"
              type="tel"
              disabled={otpSent}
            />

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
                i18nKey={isLoading ? 'Signing In...' : 'Sign In'}
              />
            )}
          </Box>

          <FooterLink
            text="Don't have an account?"
            linkText="Create account"
            linkI18nKey="Create account"
            onClick={navigateToSignup}
          />
        </FsFormProvider>
      </AuthPaper>
    </AuthPageShell>
  );
};

export default Login;
