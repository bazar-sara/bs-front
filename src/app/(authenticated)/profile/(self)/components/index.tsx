'use client';
import { FsButton, FsTypography } from '@fs/core';
import { Box, CircularProgress, Container, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/app/common/hooks/use-auth';
import { getApiErrorMessage } from '@/app/common/services/auth/functions';
import { MainSiteChrome } from '@/app/(not-authenticated)/(self)/components/main-site-chrome';
import { getProfile, type ProfileUser } from '../services';
import { ProfileForm } from './profile-form';
import { PasswordForm } from './password-form';
import { AddressList } from './address-list';
import { GlassCard } from '@/app/(not-authenticated)/(self)/components/styled-components';

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
    <MainSiteChrome>
      <Container maxWidth="md" sx={{ mt: 3 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="primary" aria-label="Loading profile" />
          </Box>
        ) : loadError || !profile ? (
          <GlassCard
            sx={{
              p: { xs: 3, sm: 4 },
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
          </GlassCard>
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
    </MainSiteChrome>
  );
};

export default Profile;
