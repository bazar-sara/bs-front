'use client';
import { FsButton, FsTypography } from '@fs/core';
import { FsFormProvider, FsInput } from '@fs/form';
import { Box, Card, CardContent, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Lock as LockIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updatePassword } from '../services';
import { getApiErrorMessage } from '@/app/common/services/auth/functions';

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
};

export const PasswordForm = () => {
  const theme = useTheme();
  const methods = useForm<PasswordFormData>({
    defaultValues: { currentPassword: '', newPassword: '' },
  });

  /** `PATCH /api/panel/profile/me/password`. */
  const onSubmit = async (data: PasswordFormData) => {
    try {
      await updatePassword({
        currentPassword: data.currentPassword?.trim() || undefined,
        newPassword: data.newPassword,
      });
      toast.success('رمز عبور با موفقیت تغییر کرد');
      methods.reset();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'خطا در تغییر رمز عبور'));
      console.error('Password update error:', error);
    }
  };

  return (
    <Card elevation={4} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <LockIcon sx={{ color: theme.palette.primary.main }} />
          <FsTypography
            variant="h6"
            sx={{ fontWeight: 600 }}
            i18nKey="Change Password"
          />
        </Box>
        <FsFormProvider
          name="password-form"
          methods={methods}
          formProps={{ onSubmit: methods.handleSubmit(onSubmit) }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <FsInput
                name="currentPassword"
                fullWidth
                type="password"
                i18nKey="Current Password"
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FsInput
                name="newPassword"
                fullWidth
                type="password"
                i18nKey="New Password"
                variant="outlined"
                rules={{ minLength: { value: 6, message: 'Min 6 chars' } }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FsButton
                type="submit"
                variant="contained"
                sx={{ py: 1.5, borderRadius: 2, fontWeight: 600 }}
                i18nKey="Update Password"
              />
            </Grid>
          </Grid>
        </FsFormProvider>
      </CardContent>
    </Card>
  );
};
