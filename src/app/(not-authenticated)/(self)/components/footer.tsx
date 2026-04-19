'use client';
import { FsTypography } from '@fs/core';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Link as MuiLink,
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

const footerLinkSx = {
  color: 'text.secondary',
  textDecoration: 'none',
  fontSize: '0.95rem',
  textAlign: 'left' as const,
  transition: 'color 0.2s ease',
  '&:hover': { color: 'primary.main' },
};

const sectionTitleSx = {
  fontWeight: 700,
  mb: 3,
  position: 'relative' as const,
  color: 'text.primary',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 30,
    height: 2,
    backgroundColor: 'primary.main',
    borderRadius: 1,
  },
};

const socialBtnSx = {
  color: 'primary.main',
  bgcolor: 'action.hover',
  border: '1px solid',
  borderColor: 'divider',
  '&:hover': {
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    borderColor: 'primary.main',
  },
  transition: 'background-color 0.2s ease, color 0.2s ease',
};

const Footer = ({ scrollToSection }: FooterProps) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderTop: 1,
        borderColor: 'divider',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 4 }}>
              <FsTypography
                variant="h4"
                component="h3"
                sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}
              >
                بازارسرا
              </FsTypography>
              <FsTypography
                variant="body1"
                sx={{ lineHeight: 1.8, mb: 3, color: 'text.secondary' }}
              >
                هایپرمارکت مدرن و کامل شما با ارائه بهترین محصولات و خدمات
              </FsTypography>
              <Box sx={{ mb: 3 }}>
                <FsTypography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
                >
                  ما را دنبال کنید
                </FsTypography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" sx={socialBtnSx} aria-label="Facebook">
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={socialBtnSx} aria-label="Instagram">
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={socialBtnSx} aria-label="Twitter">
                    <TwitterIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={socialBtnSx} aria-label="LinkedIn">
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 4 }}>
              <FsTypography variant="h6" component="h4" sx={sectionTitleSx}>
                لینک‌های سریع
              </FsTypography>
              <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
                <MuiLink
                  component="button"
                  type="button"
                  onClick={() => scrollToSection('home')}
                  sx={footerLinkSx}
                >
                  خانه
                </MuiLink>
                <MuiLink
                  component="button"
                  type="button"
                  onClick={() => scrollToSection('about')}
                  sx={footerLinkSx}
                >
                  درباره ما
                </MuiLink>
                <MuiLink
                  component="button"
                  type="button"
                  onClick={() => scrollToSection('products')}
                  sx={footerLinkSx}
                >
                  محصولات
                </MuiLink>
                <MuiLink
                  component="button"
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  sx={footerLinkSx}
                >
                  تماس با ما
                </MuiLink>
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 4 }}>
              <FsTypography variant="h6" component="h4" sx={sectionTitleSx}>
                اطلاعات تماس
              </FsTypography>
              <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <FsTypography variant="body2" color="text.secondary">
                    تهران، خیابان ولیعصر، پلاک ۱۲۳
                  </FsTypography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <FsTypography variant="body2" color="text.secondary">
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </FsTypography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EmailIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <FsTypography variant="body2" color="text.secondary">
                    info@bazaarsara.com
                  </FsTypography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TimeIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <FsTypography variant="body2" color="text.secondary">
                    ۸ صبح تا ۱۰ شب
                  </FsTypography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            pt: 4,
            mt: 4,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <FsTypography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: { xs: 'center', md: 'left' } }}
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
                  flexWrap: 'wrap',
                }}
              >
                <MuiLink href="#" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                  حریم خصوصی
                </MuiLink>
                <MuiLink href="#" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                  قوانین و مقررات
                </MuiLink>
                <MuiLink href="#" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
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
