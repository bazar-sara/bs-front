'use client';
import { FsButton, FsTypography } from '@fs/core';
import { FsFormProvider, FsInput } from '@fs/form';
import { Box, Container, Grid, Stack, useTheme } from '@mui/material';
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { GlassCard } from './styled-components';

const ContactSection = () => {
  const theme = useTheme();
  const methods = useForm();

  return (
    <Box
      id="contact"
      sx={{ py: 8, backgroundColor: `${theme.palette.common.white}0A` }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <FsTypography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            تماس با ما
          </FsTypography>
          <FsTypography
            variant="h6"
            sx={{
              fontWeight: 400,
              mb: 4,
            }}
          >
            ما اینجا هستیم تا به شما کمک کنیم
          </FsTypography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <GlassCard sx={{ p: 4, height: '100%', borderRadius: 3 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <FsTypography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  ارسال پیام
                </FsTypography>
                <FsTypography variant="body2">
                  پیام خود را برای ما ارسال کنید
                </FsTypography>
              </Box>
              <FsFormProvider name="contact" methods={methods}>
                <Stack spacing={3}>
                  <FsInput
                    name="name"
                    fullWidth
                    i18nKey="Contact full name"
                    variant="outlined"
                    clearButton={false}
                  />
                  <FsInput
                    name="email"
                    fullWidth
                    i18nKey="Contact email"
                    variant="outlined"
                    type="email"
                    clearButton={false}
                  />
                  <FsInput
                    name="phone"
                    fullWidth
                    i18nKey="Contact phone"
                    variant="outlined"
                    clearButton={false}
                  />
                  <FsInput
                    name="message"
                    fullWidth
                    i18nKey="Contact message"
                    variant="outlined"
                    multiline
                    rows={4}
                    clearButton={false}
                  />
                  <FsButton
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.common.white,
                      fontWeight: 600,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '1rem',
                      transition: theme.transitions.create(
                        ['background-color', 'box-shadow', 'transform'],
                        {
                          duration: theme.transitions.duration.shorter,
                          easing: theme.transitions.easing.easeInOut,
                        }
                      ),
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                        transform: 'translateY(-1px)',
                        boxShadow: `0 6px 20px ${theme.palette.primary.main}55`,
                      },
                    }}
                  >
                    ارسال پیام
                  </FsButton>
                </Stack>
              </FsFormProvider>
            </GlassCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <GlassCard sx={{ p: 4, height: '100%', borderRadius: 3 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <FsTypography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  اطلاعات تماس
                </FsTypography>
                <FsTypography variant="body2">
                  راه‌های ارتباط با ما
                </FsTypography>
              </Box>
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: `${theme.palette.common.white}1A`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: `${theme.palette.common.white}33`,
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <LocationIcon
                      sx={{ color: theme.palette.common.white, fontSize: 20 }}
                    />
                  </Box>
                  <Box>
                    <FsTypography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      آدرس
                    </FsTypography>
                    <FsTypography variant="body2">
                      تهران، خیابان ولیعصر، پلاک ۱۲۳
                    </FsTypography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: `${theme.palette.common.white}1A`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: `${theme.palette.common.white}33`,
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PhoneIcon
                      sx={{ color: theme.palette.common.white, fontSize: 20 }}
                    />
                  </Box>
                  <Box>
                    <FsTypography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      تلفن
                    </FsTypography>
                    <FsTypography variant="body2">۰۲۱-۱۲۳۴۵۶۷۸</FsTypography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: `${theme.palette.common.white}1A`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: `${theme.palette.common.white}33`,
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <EmailIcon
                      sx={{ color: theme.palette.common.white, fontSize: 20 }}
                    />
                  </Box>
                  <Box>
                    <FsTypography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      ایمیل
                    </FsTypography>
                    <FsTypography variant="body2">
                      info@bazaarsara.com
                    </FsTypography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: `${theme.palette.common.white}1A`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: `${theme.palette.common.white}33`,
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TimeIcon
                      sx={{ color: theme.palette.common.white, fontSize: 20 }}
                    />
                  </Box>
                  <Box>
                    <FsTypography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      ساعات کاری
                    </FsTypography>
                    <FsTypography variant="body2">۸ صبح تا ۱۰ شب</FsTypography>
                  </Box>
                </Box>
              </Stack>
            </GlassCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
