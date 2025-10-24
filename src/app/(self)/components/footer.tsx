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
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, 
              ${theme.palette.primary[900]} 0%, 
              ${theme.palette.primary[800]} 25%, 
              ${theme.palette.common.black} 50%, 
              ${theme.palette.primary[700]} 75%, 
              ${theme.palette.primary[800]} 100%)`
            : `linear-gradient(135deg, 
              ${theme.palette.common.black} 0%, 
              ${theme.palette.primary[800]} 30%, 
              ${theme.palette.common.black} 70%, 
              ${theme.palette.primary[700]} 100%)`,
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
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === 'dark'
              ? `radial-gradient(circle at 30% 20%, ${theme.palette.customColor.main}15 0%, transparent 50%),
               radial-gradient(circle at 70% 80%, ${theme.palette.primary[500]}10 0%, transparent 50%)`
              : `radial-gradient(circle at 20% 30%, ${theme.palette.primary[500]}08 0%, transparent 50%),
               radial-gradient(circle at 80% 70%, ${theme.palette.primary[400]}06 0%, transparent 50%)`,
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
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
                  textShadow:
                    theme.palette.mode === 'dark'
                      ? `2px 2px 4px ${theme.palette.common.black}80, 0 0 8px ${theme.palette.primary.main}40`
                      : `2px 2px 4px ${theme.palette.common.black}4D`,
                }}
              >
                بازارسرا
              </FsTypography>
              <FsTypography
                variant="body1"
                sx={{
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.common.white
                      : `${theme.palette.common.white}F5`,
                  textShadow:
                    theme.palette.mode === 'dark'
                      ? `1px 1px 2px ${theme.palette.common.black}80`
                      : 'none',
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
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? `${theme.palette.primary[500]}20`
                          : `${theme.palette.common.white}30`,
                      border:
                        theme.palette.mode === 'light'
                          ? `1px solid ${theme.palette.primary.main}20`
                          : 'none',
                      '&:hover': {
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.customColor.main
                            : theme.palette.primary.main,
                        color: theme.palette.common.white,
                        transform: 'translateY(-2px) scale(1.05)',
                        boxShadow:
                          theme.palette.mode === 'dark'
                            ? `0 6px 16px ${theme.palette.customColor.main}50`
                            : `0 6px 16px ${theme.palette.primary.main}40`,
                        border:
                          theme.palette.mode === 'light'
                            ? `1px solid ${theme.palette.primary.main}`
                            : 'none',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? `${theme.palette.primary[500]}20`
                          : `${theme.palette.common.white}30`,
                      border:
                        theme.palette.mode === 'light'
                          ? `1px solid ${theme.palette.primary.main}20`
                          : 'none',
                      '&:hover': {
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.customColor.main
                            : theme.palette.primary.main,
                        color: theme.palette.common.white,
                        transform: 'translateY(-2px) scale(1.05)',
                        boxShadow:
                          theme.palette.mode === 'dark'
                            ? `0 6px 16px ${theme.palette.customColor.main}50`
                            : `0 6px 16px ${theme.palette.primary.main}40`,
                        border:
                          theme.palette.mode === 'light'
                            ? `1px solid ${theme.palette.primary.main}`
                            : 'none',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? `${theme.palette.primary[500]}20`
                          : `${theme.palette.common.white}30`,
                      border:
                        theme.palette.mode === 'light'
                          ? `1px solid ${theme.palette.primary.main}20`
                          : 'none',
                      '&:hover': {
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.customColor.main
                            : theme.palette.primary.main,
                        color: theme.palette.common.white,
                        transform: 'translateY(-2px) scale(1.05)',
                        boxShadow:
                          theme.palette.mode === 'dark'
                            ? `0 6px 16px ${theme.palette.customColor.main}50`
                            : `0 6px 16px ${theme.palette.primary.main}40`,
                        border:
                          theme.palette.mode === 'light'
                            ? `1px solid ${theme.palette.primary.main}`
                            : 'none',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: theme.palette.primary.main,
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? `${theme.palette.primary[500]}20`
                          : `${theme.palette.common.white}30`,
                      border:
                        theme.palette.mode === 'light'
                          ? `1px solid ${theme.palette.primary.main}20`
                          : 'none',
                      '&:hover': {
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.customColor.main
                            : theme.palette.primary.main,
                        color: theme.palette.common.white,
                        transform: 'translateY(-2px) scale(1.05)',
                        boxShadow:
                          theme.palette.mode === 'dark'
                            ? `0 6px 16px ${theme.palette.customColor.main}50`
                            : `0 6px 16px ${theme.palette.primary.main}40`,
                        border:
                          theme.palette.mode === 'light'
                            ? `1px solid ${theme.palette.primary.main}`
                            : 'none',
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
                  textShadow:
                    theme.palette.mode === 'dark'
                      ? `1px 1px 3px ${theme.palette.common.black}80`
                      : 'none',
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
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.common.white
                        : `${theme.palette.common.white}E6`,
                    textShadow:
                      theme.palette.mode === 'dark'
                        ? `1px 1px 2px ${theme.palette.common.black}60`
                        : 'none',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                      textShadow:
                        theme.palette.mode === 'dark'
                          ? `1px 1px 2px ${theme.palette.primary.main}80`
                          : 'none',
                    },
                  }}
                >
                  خانه
                </MuiLink>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('about')}
                  sx={{
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.common.white
                        : `${theme.palette.common.white}E6`,
                    textShadow:
                      theme.palette.mode === 'dark'
                        ? `1px 1px 2px ${theme.palette.common.black}60`
                        : 'none',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                      textShadow:
                        theme.palette.mode === 'dark'
                          ? `1px 1px 2px ${theme.palette.primary.main}80`
                          : 'none',
                    },
                  }}
                >
                  درباره ما
                </MuiLink>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('products')}
                  sx={{
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.common.white
                        : `${theme.palette.common.white}E6`,
                    textShadow:
                      theme.palette.mode === 'dark'
                        ? `1px 1px 2px ${theme.palette.common.black}60`
                        : 'none',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                      textShadow:
                        theme.palette.mode === 'dark'
                          ? `1px 1px 2px ${theme.palette.primary.main}80`
                          : 'none',
                    },
                  }}
                >
                  محصولات
                </MuiLink>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('contact')}
                  sx={{
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.common.white
                        : `${theme.palette.common.white}E6`,
                    textShadow:
                      theme.palette.mode === 'dark'
                        ? `1px 1px 2px ${theme.palette.common.black}60`
                        : 'none',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                      textShadow:
                        theme.palette.mode === 'dark'
                          ? `1px 1px 2px ${theme.palette.primary.main}80`
                          : 'none',
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
                  textShadow:
                    theme.palette.mode === 'dark'
                      ? `1px 1px 3px ${theme.palette.common.black}80`
                      : 'none',
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
                    sx={{
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.common.white
                          : `${theme.palette.common.white}CC`,
                      textShadow:
                        theme.palette.mode === 'dark'
                          ? `1px 1px 2px ${theme.palette.common.black}60`
                          : 'none',
                    }}
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
                    sx={{
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.common.white
                          : `${theme.palette.common.white}CC`,
                      textShadow:
                        theme.palette.mode === 'dark'
                          ? `1px 1px 2px ${theme.palette.common.black}60`
                          : 'none',
                    }}
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
                    sx={{
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.common.white
                          : `${theme.palette.common.white}CC`,
                      textShadow:
                        theme.palette.mode === 'dark'
                          ? `1px 1px 2px ${theme.palette.common.black}60`
                          : 'none',
                    }}
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
                    sx={{
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.common.white
                          : `${theme.palette.common.white}CC`,
                      textShadow:
                        theme.palette.mode === 'dark'
                          ? `1px 1px 2px ${theme.palette.common.black}60`
                          : 'none',
                    }}
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
                  color:
                    theme.palette.mode === 'dark'
                      ? `${theme.palette.common.white}E6`
                      : `${theme.palette.common.white}99`,
                  textShadow:
                    theme.palette.mode === 'dark'
                      ? `1px 1px 2px ${theme.palette.common.black}40`
                      : 'none',
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
                    color:
                      theme.palette.mode === 'dark'
                        ? `${theme.palette.common.white}E6`
                        : `${theme.palette.common.white}99`,
                    textShadow:
                      theme.palette.mode === 'dark'
                        ? `1px 1px 2px ${theme.palette.common.black}40`
                        : 'none',
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
                    color:
                      theme.palette.mode === 'dark'
                        ? `${theme.palette.common.white}E6`
                        : `${theme.palette.common.white}99`,
                    textShadow:
                      theme.palette.mode === 'dark'
                        ? `1px 1px 2px ${theme.palette.common.black}40`
                        : 'none',
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
                    color:
                      theme.palette.mode === 'dark'
                        ? `${theme.palette.common.white}E6`
                        : `${theme.palette.common.white}99`,
                    textShadow:
                      theme.palette.mode === 'dark'
                        ? `1px 1px 2px ${theme.palette.common.black}40`
                        : 'none',
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
