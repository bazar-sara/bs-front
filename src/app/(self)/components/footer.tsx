'use client';
import { FsTypography } from '@fs/core';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Link as MuiLink,
  useTheme,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

type FooterProps = {
  scrollToSection: (sectionId: string) => void;
};

const Footer = ({ scrollToSection }: FooterProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.common.black} 0%, ${theme.palette.common.black}CC 100%)`,
        color: theme.palette.common.white,
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main} 50%, transparent 100%)`,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 4 }}>
              <FsTypography
                variant="h4"
                component="h3"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.primary.main,
                  mb: 2,
                  textShadow: `2px 2px 4px ${theme.palette.common.black}4D`,
                }}
              >
                بازارسرا
              </FsTypography>
              <FsTypography
                variant="body1"
                sx={{
                  color: `${theme.palette.common.white}E6`,
                  lineHeight: 1.8,
                  mb: 3,
                }}
              >
                هایپرمارکت مدرن و کامل شما با ارائه بهترین محصولات و خدمات
              </FsTypography>

              {/* Social Media */}
              <Box sx={{ mb: 3 }}>
                <FsTypography
                  variant="subtitle2"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  ما را دنبال کنید
                </FsTypography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 4 }}>
              <FsTypography
                variant="h6"
                component="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.common.white,
                  mb: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    right: 0,
                    width: 30,
                    height: 2,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1,
                  },
                }}
              >
                لینک‌های سریع
              </FsTypography>
              <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('home')}
                  sx={{
                    color: `${theme.palette.common.white}CC`,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  خانه
                </MuiLink>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('about')}
                  sx={{
                    color: `${theme.palette.common.white}CC`,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  درباره ما
                </MuiLink>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('products')}
                  sx={{
                    color: `${theme.palette.common.white}CC`,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  محصولات
                </MuiLink>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('contact')}
                  sx={{
                    color: `${theme.palette.common.white}CC`,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  تماس با ما
                </MuiLink>
              </Stack>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 4 }}>
              <FsTypography
                variant="h6"
                component="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.common.white,
                  mb: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    right: 0,
                    width: 30,
                    height: 2,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1,
                  },
                }}
              >
                اطلاعات تماس
              </FsTypography>
              <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationIcon
                    sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                  />
                  <FsTypography
                    variant="body2"
                    sx={{ color: `${theme.palette.common.white}CC` }}
                  >
                    تهران، خیابان ولیعصر، پلاک ۱۲۳
                  </FsTypography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneIcon
                    sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                  />
                  <FsTypography
                    variant="body2"
                    sx={{ color: `${theme.palette.common.white}CC` }}
                  >
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </FsTypography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EmailIcon
                    sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                  />
                  <FsTypography
                    variant="body2"
                    sx={{ color: `${theme.palette.common.white}CC` }}
                  >
                    info@bazaarsara.com
                  </FsTypography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TimeIcon
                    sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                  />
                  <FsTypography
                    variant="body2"
                    sx={{ color: `${theme.palette.common.white}CC` }}
                  >
                    ۸ صبح تا ۱۰ شب
                  </FsTypography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.common.white}20`,
            pt: 4,
            mt: 4,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <FsTypography
                variant="body2"
                sx={{
                  color: `${theme.palette.common.white}99`,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                تمام حقوق محفوظ است. بازارسرا © ۱۴۰۳
              </FsTypography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  justifyContent: { xs: 'center', md: 'flex-end' },
                }}
              >
                <MuiLink
                  href="#"
                  sx={{
                    color: `${theme.palette.common.white}99`,
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  حریم خصوصی
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    color: `${theme.palette.common.white}99`,
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  قوانین و مقررات
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    color: `${theme.palette.common.white}99`,
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  شرایط استفاده
                </MuiLink>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
