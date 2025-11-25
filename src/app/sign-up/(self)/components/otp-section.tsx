'use client';
import { FsButton, FsTypography } from '@fs/core';
import { FsSmsVerification } from '@fs/form';
import { Box } from '@mui/material';
import { PhoneAndroid as PhoneIcon } from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material';

type OtpSectionProps = {
  otpSent: boolean;
  countdown: number;
  isRequestingOtp: boolean;
  onRequestOtp: () => void;
};

export const OtpSection = ({
  otpSent,
  countdown,
  isRequestingOtp,
  onRequestOtp,
}: OtpSectionProps) => {
  const theme = useTheme();

  if (!otpSent) {
    return (
      <FsButton
        type="button"
        fullWidth
        variant="contained"
        disabled={isRequestingOtp}
        onClick={onRequestOtp}
        startIcon={<PhoneIcon sx={{ mx: 1 }} />}
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontSize: '1rem',
          fontWeight: 600,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
          '&:hover': {
            boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        }}
        i18nKey={isRequestingOtp ? 'Sending OTP...' : 'Send OTP'}
      />
    );
  }

  return (
    <>
      <Box sx={{ mb: 1 }}>
        <FsTypography
          variant="subtitle2"
          sx={{
            mb: 2,
            textAlign: 'center',
            color: 'text.secondary',
            fontWeight: 600,
          }}
          i18nKey="Enter verification code"
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <FsSmsVerification
            name="otp"
            numInputs={6}
            rules={{ required: 'OTP is required' }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        {countdown > 0 && (
          <FsTypography
            variant="body2"
            sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
          >
            <span dir="ltr">{countdown}</span> ثانیه تا ارسال مجدد
          </FsTypography>
        )}
        {countdown === 0 && (
          <FsButton
            type="button"
            variant="text"
            size="small"
            onClick={onRequestOtp}
            disabled={isRequestingOtp}
            sx={{ textTransform: 'none', fontSize: '0.875rem' }}
            i18nKey="Resend OTP"
          />
        )}
      </Box>
    </>
  );
};

