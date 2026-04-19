'use client';
import { FsButton, FsTypography } from '@fs/core';
import { Box, CircularProgress, Container, Paper, useTheme } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/app/common/hooks/use-auth';
import { getApiErrorMessage } from '@/app/common/services/auth/functions';
import { getProfile, type ProfileUser } from '../services';
import { ProfileForm } from './profile-form';
import { PasswordForm } from './password-form';
import { AddressList } from './address-list';

const Profile = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  /** Loads profile from `GET /api/panel/profile/me` (Bearer via api client). */
  const loadProfile = async () => {
    setLoadError(false);
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error: unknown) {
      console.error('Failed to load profile:', error);
      setProfile(null);
      setLoadError(true);
      toast.error(getApiErrorMessage(error, 'بارگذاری پروفایل ناموفق بود'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadProfile();
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
            : `linear-gradient(165deg, ${theme.palette.primary['50'] ?? '#eef2ff'} 0%, ${theme.palette.background.default} 45%, ${theme.palette.background.default} 100%)`,
        pt: { xs: 10, md: 12 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3, md: 4 },
            mb: 3,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            background: theme.palette.background.paper,
            boxShadow:
              theme.palette.mode === 'dark'
                ? 'none'
                : '0 4px 24px rgba(15, 23, 42, 0.06)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}18, ${theme.palette.secondary.main}12)`,
                border: `2px solid ${theme.palette.divider}`,
                overflow: 'hidden',
              }}
            >
              {profile?.avatar ? (
                <Box
                  component="img"
                  src={profile.avatar}
                  alt=""
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <PersonIcon sx={{ fontSize: 36, color: 'primary.main' }} />
              )}
            </Box>
            <Box>
              <FsTypography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}
                i18nKey="Profile"
              />
              <FsTypography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {user.phoneNumber || user.name}
              </FsTypography>
            </Box>
          </Box>
        </Paper>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="primary" aria-label="Loading profile" />
          </Box>
        ) : loadError || !profile ? (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 3,
              border: `1px dashed ${theme.palette.divider}`,
            }}
          >
            <FsTypography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2 }}
              i18nKey="Failed to load profile"
            />
            <FsButton
              variant="text"
              color="primary"
              onClick={() => {
                setIsLoading(true);
                void loadProfile();
              }}
            >
              تلاش مجدد
            </FsButton>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <ProfileForm profile={profile} onSuccess={setProfile} />
            <PasswordForm />
            <AddressList
              addresses={profile.addresses ?? []}
              onUpdate={loadProfile}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
