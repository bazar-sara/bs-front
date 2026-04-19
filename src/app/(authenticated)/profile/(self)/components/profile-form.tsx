'use client';
import { FsButton, FsTypography } from '@fs/core';
import { FsFormProvider, FsInput } from '@fs/form';
import { Box, Card, CardContent, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Person as PersonIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { ProfileUser, UpdateProfilePayload } from '../services/models';
import { updateProfile } from '../services';
import { useAuth } from '@/app/common/hooks/use-auth';
import { getApiErrorMessage } from '@/app/common/services/auth/functions';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  homeNumber: string;
  nationalCode: string;
  email: string;
  avatar: string;
};

type ProfileFormProps = {
  profile: ProfileUser;
  onSuccess: (profile: ProfileUser) => void;
};

export const ProfileForm = ({ profile, onSuccess }: ProfileFormProps) => {
  const theme = useTheme();
  const { updateUser } = useAuth();
  const methods = useForm<ProfileFormData>({
    defaultValues: {
      firstName: profile.firstName ?? '',
      lastName: profile.lastName ?? '',
      phoneNumber: profile.phoneNumber ?? '',
      homeNumber: profile.homeNumber ?? '',
      nationalCode: profile.nationalCode ?? '',
      email: profile.email ?? '',
      avatar: profile.avatar ?? '',
    },
  });

  /** Persists via `PATCH /api/panel/profile/me` and syncs auth context from the response. */
  const onSubmit = async (data: ProfileFormData) => {
    const payload: UpdateProfilePayload = {};
    if (data.firstName?.trim()) payload.firstName = data.firstName.trim();
    if (data.lastName?.trim()) payload.lastName = data.lastName.trim();
    if (data.phoneNumber?.trim()) payload.phoneNumber = data.phoneNumber.trim();
    if (data.homeNumber?.trim()) payload.homeNumber = data.homeNumber.trim();
    if (data.nationalCode?.trim()) payload.nationalCode = data.nationalCode.trim();
    if (data.email?.trim()) payload.email = data.email.trim();
    if (data.avatar?.trim()) payload.avatar = data.avatar.trim();

    try {
      const updated = await updateProfile(payload);
      updateUser({
        firstName: updated.firstName ?? undefined,
        lastName: updated.lastName ?? undefined,
        email: updated.email ?? undefined,
        avatar: updated.avatar ?? undefined,
      });
      onSuccess(updated);
      toast.success('پروفایل با موفقیت به‌روزرسانی شد');
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'خطا در به‌روزرسانی پروفایل'));
      console.error('Profile update error:', error);
    }
  };

  return (
    <Card elevation={4} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <PersonIcon sx={{ color: theme.palette.primary.main }} />
          <FsTypography variant="h6" sx={{ fontWeight: 600 }} i18nKey="Profile" />
        </Box>
        <FsFormProvider
          name="profile-form"
          methods={methods}
          formProps={{ onSubmit: methods.handleSubmit(onSubmit) }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FsInput
                name="firstName"
                fullWidth
                i18nKey="First Name"
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FsInput
                name="lastName"
                fullWidth
                i18nKey="Last Name"
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FsInput
                name="phoneNumber"
                fullWidth
                i18nKey="Phone Number"
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FsInput
                name="homeNumber"
                fullWidth
                i18nKey="Home Number"
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FsInput
                name="nationalCode"
                fullWidth
                i18nKey="National Code"
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FsInput
                name="email"
                fullWidth
                type="email"
                i18nKey="Email"
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FsInput
                name="avatar"
                fullWidth
                i18nKey="Avatar URL"
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FsButton
                type="submit"
                variant="contained"
                sx={{ py: 1.5, borderRadius: 2, fontWeight: 600 }}
                i18nKey="Save Profile"
              />
            </Grid>
          </Grid>
        </FsFormProvider>
      </CardContent>
    </Card>
  );
};
