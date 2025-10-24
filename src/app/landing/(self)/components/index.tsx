'use client';
import { FsButton, FsTypography } from '@fs/core';
import { FsFormProvider, FsInput } from '@fs/form';
import {
  AppBar,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
  Link as MuiLink,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Storefront as StorefrontIcon,
  LocalGroceryStore as GroceryIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  LocalOffer as OfferIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

const TurquoiseGradient = styled('div')(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary[600]} 50%, ${theme.palette.primary[700]} 100%)`,
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
}));

const FloatingShapes = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: 0,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    animation: 'float 20s linear infinite',
  },
  '&::before': {
    width: '300px',
    height: '300px',
    top: '10%',
    left: '10%',
    animationDelay: '0s',
  },
  '&::after': {
    width: '200px',
    height: '200px',
    bottom: '20%',
    right: '15%',
    animationDelay: '10s',
  },
  '@keyframes float': {
    '0%': { transform: 'translate(0, 0) rotate(0deg)' },
    '25%': { transform: 'translate(20px, -20px) rotate(90deg)' },
    '50%': { transform: 'translate(-10px, -30px) rotate(180deg)' },
    '75%': { transform: 'translate(-20px, 10px) rotate(270deg)' },
    '100%': { transform: 'translate(0, 0) rotate(360deg)' },
  },
}));

const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(64, 224, 208, 0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 30px rgba(64, 224, 208, 0.25)',
  },
}));

const Header = styled(AppBar)(({ theme }) => ({
  background: `${theme.palette.primary.main}95`,
  backdropFilter: 'blur(10px)',
  boxShadow: `0 2px 20px ${theme.palette.common.black}1A`,
  color: theme.palette.common.white,
}));

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: `0 4px 20px ${theme.palette.primary.main}26`,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 8px 30px ${theme.palette.primary.main}40`,
  },
}));

const DiscountCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: `0 4px 20px ${theme.palette.customColor.main}33`,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 8px 30px ${theme.palette.customColor.main}4D`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, ${theme.palette.customColor.main}1A, ${theme.palette.warning.main}1A)`,
    zIndex: 1,
    pointerEvents: 'none',
  },
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.customColor.main,
  color: theme.palette.common.white,
  fontWeight: 700,
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, ${theme.palette.customColor.main}, ${theme.palette.warning.main})`,
    borderRadius: 'inherit',
    zIndex: -1,
  },
}));

const Landing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const methods = useForm();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const features = [
    {
      icon: (
        <GroceryIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: 'محصولات تازه',
      description:
        'تازه‌ترین میوه‌ها، سبزیجات و محصولات لبنی را از ما دریافت کنید',
    },
    {
      icon: (
        <StorefrontIcon
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      title: 'کیفیت بالا',
      description:
        'تمام محصولات ما با بالاترین استانداردهای کیفیت انتخاب می‌شوند',
    },
    {
      icon: (
        <MoneyIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: 'قیمت مناسب',
      description: 'بهترین قیمت‌ها را با حفظ کیفیت ارائه می‌دهیم',
    },
    {
      icon: (
        <TimeIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: 'راحتی خرید',
      description: 'محیطی آرام و منظم برای تجربه خرید بهتر',
    },
  ];

  const products = [
    {
      id: 1,
      name: 'محصولات تازه',
      price: '۲۵۰,۰۰۰',
      image: '/images/delara/img3.jpg',
      category: 'تازه',
    },
    {
      id: 2,
      name: 'سبزیجات ارگانیک',
      price: '۱۸۰,۰۰۰',
      image: '/images/delara/img4.jpg',
      category: 'ارگانیک',
    },
    {
      id: 3,
      name: 'میوه‌های فصلی',
      price: '۳۲۰,۰۰۰',
      image: '/images/delara/img9.jpg',
      category: 'فصلی',
    },
    {
      id: 4,
      name: 'محصولات لبنی',
      price: '۱۵۰,۰۰۰',
      image: '/images/delara/img10.jpg',
      category: 'لبنی',
    },
    {
      id: 5,
      name: 'نان تازه',
      price: '۴۵,۰۰۰',
      image: '/images/delara/img15.jpg',
      category: 'نان',
    },
    {
      id: 6,
      name: 'گوشت تازه',
      price: '۵۸۰,۰۰۰',
      image: '/images/delara/img16.jpg',
      category: 'گوشت',
    },
    {
      id: 7,
      name: 'محصولات دریایی',
      price: '۴۲۰,۰۰۰',
      image: '/images/delara/img21.jpg',
      category: 'دریایی',
    },
    {
      id: 8,
      name: 'ادویه‌جات',
      price: '۹۵,۰۰۰',
      image: '/images/delara/img22.jpg',
      category: 'ادویه',
    },
  ];

  const discountProducts = [
    {
      id: 1,
      name: 'محصولات تخفیف دار',
      originalPrice: '۳۵۰,۰۰۰',
      discountPrice: '۲۸۰,۰۰۰',
      discount: '۲۰%',
      image: '/images/shahsavan/img103.jpg',
    },
    {
      id: 2,
      name: 'پیشنهاد ویژه',
      originalPrice: '۲۲۰,۰۰۰',
      discountPrice: '۱۷۶,۰۰۰',
      discount: '۲۰%',
      image: '/images/shahsavan/img104.jpg',
    },
    {
      id: 3,
      name: 'فروش ویژه',
      originalPrice: '۴۸۰,۰۰۰',
      discountPrice: '۳۸۴,۰۰۰',
      discount: '۲۰%',
      image: '/images/shahsavan/img111.jpg',
    },
    {
      id: 4,
      name: 'تخفیف آخر هفته',
      originalPrice: '۱۹۰,۰۰۰',
      discountPrice: '۱۵۲,۰۰۰',
      discount: '۲۰%',
      image: '/images/shahsavan/img112.jpg',
    },
  ];

  return (
    <TurquoiseGradient>
      <FloatingShapes />

      {/* Header */}
      <Header position="fixed" elevation={0}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2,
            }}
          >
            <FsTypography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
                textShadow: `2px 2px 4px ${theme.palette.common.black}4D`,
              }}
            >
              بازارسرا
            </FsTypography>

            {isMobile ? (
              <IconButton
                color="inherit"
                onClick={handleMobileMenuToggle}
                sx={{ color: '#fff' }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('home')}
                  sx={{
                    color: theme.palette.common.white,
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  خانه
                </MuiLink>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('about')}
                  sx={{
                    color: theme.palette.common.white,
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  درباره ما
                </MuiLink>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('products')}
                  sx={{
                    color: theme.palette.common.white,
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  محصولات
                </MuiLink>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('contact')}
                  sx={{
                    color: theme.palette.common.white,
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  تماس با ما
                </MuiLink>
                <FsButton
                  variant="outlined"
                  sx={{
                    borderColor: theme.palette.common.white,
                    color: theme.palette.common.white,
                    '&:hover': {
                      borderColor: theme.palette.common.white,
                      backgroundColor: `${theme.palette.common.white}1A`,
                    },
                  }}
                >
                  ورود/ثبت نام
                </FsButton>
              </Box>
            )}
          </Box>
        </Container>
      </Header>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: 'rgba(64, 224, 208, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FsTypography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
            بازارسرا
          </FsTypography>
          <IconButton onClick={handleMobileMenuToggle} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
        <List>
          <ListItem component="button" onClick={() => scrollToSection('home')}>
            <ListItemText primary="خانه" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem component="button" onClick={() => scrollToSection('about')}>
            <ListItemText primary="درباره ما" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => scrollToSection('products')}
          >
            <ListItemText primary="محصولات" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => scrollToSection('contact')}
          >
            <ListItemText primary="تماس با ما" sx={{ color: '#fff' }} />
          </ListItem>
        </List>
        <Box sx={{ p: 2 }}>
          <FsButton
            variant="outlined"
            fullWidth
            sx={{
              borderColor: '#fff',
              color: '#fff',
              '&:hover': {
                borderColor: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            ورود/ثبت نام
          </FsButton>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box id="home" sx={{ pt: 12, pb: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                <FsTypography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    color: theme.palette.common.white,
                    mb: 2,
                    textShadow: `2px 2px 4px ${theme.palette.common.black}4D`,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  به بازارسرا خوش آمدید
                </FsTypography>
                <FsTypography
                  variant="h5"
                  sx={{
                    color: `${theme.palette.common.white}E6`,
                    mb: 3,
                    fontWeight: 500,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                  }}
                >
                  هایپرمارکت مدرن و کامل شما
                </FsTypography>
                <FsTypography
                  variant="body1"
                  sx={{
                    color: `${theme.palette.common.white}CC`,
                    mb: 4,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.6,
                  }}
                >
                  بازارسرا با ارائه بهترین محصولات و خدمات، تجربه خرید متفاوتی
                  را برای شما فراهم می‌کند. از محصولات تازه تا کالاهای خانگی،
                  همه چیز را در یک مکان پیدا کنید.
                </FsTypography>
                <FsButton
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    boxShadow: `0 4px 20px ${theme.palette.common.black}33`,
                    '&:hover': {
                      backgroundColor: `${theme.palette.common.white}E6`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 25px ${theme.palette.common.black}40`,
                    },
                  }}
                >
                  شروع خرید
                </FsButton>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ textAlign: 'center' }}>
                <StorefrontIcon
                  sx={{
                    fontSize: { xs: 200, md: 300 },
                    color: 'rgba(255, 255, 255, 0.3)',
                    animation: 'pulse 3s ease-in-out infinite',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Discount Products Section */}
      <Box
        sx={{ py: 8, backgroundColor: `${theme.palette.customColor.main}1A` }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <FsTypography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
                mb: 2,
                textShadow: `2px 2px 4px ${theme.palette.common.black}4D`,
              }}
            >
              پیشنهادات ویژه
            </FsTypography>
            <FsTypography
              variant="h6"
              sx={{
                color: `${theme.palette.common.white}E6`,
                fontWeight: 400,
              }}
            >
              تخفیف‌های شگفت‌انگیز برای شما
            </FsTypography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {discountProducts.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <DiscountCard>
                  <DiscountBadge
                    label={`${product.discount} تخفیف`}
                    icon={<OfferIcon />}
                  />
                  <Box sx={{ position: 'relative', height: 200 }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </Box>
                  <CardContent sx={{ p: 2 }}>
                    <FsTypography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.customColor.main,
                        mb: 1,
                        fontSize: '1rem',
                        textAlign: 'center',
                      }}
                    >
                      {product.name}
                    </FsTypography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        mb: 1,
                        flexWrap: 'wrap',
                      }}
                    >
                      <FsTypography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          textDecoration: 'line-through',
                        }}
                      >
                        {product.originalPrice} تومان
                      </FsTypography>
                      <FsTypography
                        variant="h6"
                        sx={{
                          color: theme.palette.customColor.main,
                          fontWeight: 700,
                        }}
                      >
                        {product.discountPrice} تومان
                      </FsTypography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.customColor.main,
                          color: theme.palette.common.white,
                          '&:hover': {
                            backgroundColor: theme.palette.customColor[100],
                          },
                        }}
                      >
                        <ShoppingCartIcon fontSize="small" />
                      </IconButton>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            sx={{
                              fontSize: 14,
                              color: theme.palette.warning.main,
                            }}
                          />
                        ))}
                        <FsTypography
                          variant="caption"
                          sx={{ color: 'text.secondary', mr: 1 }}
                        >
                          (۴.۹)
                        </FsTypography>
                      </Box>
                    </Box>
                  </CardContent>
                </DiscountCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box
        id="about"
        sx={{ py: 8, backgroundColor: `${theme.palette.common.white}1A` }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <FsTypography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
                mb: 2,
                textShadow: `2px 2px 4px ${theme.palette.common.black}4D`,
              }}
            >
              درباره بازارسرا
            </FsTypography>
            <FsTypography
              variant="h6"
              sx={{
                color: `${theme.palette.common.white}E6`,
                fontWeight: 400,
              }}
            >
              چرا بازارسرا را انتخاب کنیم؟
            </FsTypography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <FeatureCard>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box
                      sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}
                    >
                      {feature.icon}
                    </Box>
                    <FsTypography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </FsTypography>
                    <FsTypography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </FsTypography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Products Section */}
      <Box id="products" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <FsTypography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
                mb: 2,
                textShadow: `2px 2px 4px ${theme.palette.common.black}4D`,
              }}
            >
              محصولات ما
            </FsTypography>
            <FsTypography
              variant="h6"
              sx={{
                color: `${theme.palette.common.white}E6`,
                fontWeight: 400,
              }}
            >
              بهترین محصولات با کیفیت عالی
            </FsTypography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <ProductCard>
                  <Box sx={{ position: 'relative', height: 200 }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 2 }}>
                    <FsTypography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 1,
                        fontSize: '1rem',
                        textAlign: 'center',
                      }}
                    >
                      {product.name}
                    </FsTypography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        mb: 2,
                        flexWrap: 'wrap',
                      }}
                    >
                      <FsTypography
                        variant="h6"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                        }}
                      >
                        {product.price} تومان
                      </FsTypography>
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.common.white,
                          '&:hover': {
                            backgroundColor: theme.palette.primary[600],
                          },
                        }}
                      >
                        <ShoppingCartIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0.5,
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          sx={{
                            fontSize: 16,
                            color: theme.palette.warning.main,
                          }}
                        />
                      ))}
                      <FsTypography
                        variant="caption"
                        sx={{ color: 'text.secondary', mr: 1 }}
                      >
                        (۴.۸)
                      </FsTypography>
                    </Box>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <FsTypography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
                mb: 2,
                textShadow: `2px 2px 4px ${theme.palette.common.black}4D`,
              }}
            >
              تماس با ما
            </FsTypography>
            <FsTypography
              variant="h6"
              sx={{
                color: `${theme.palette.common.white}E6`,
                fontWeight: 400,
              }}
            >
              ما اینجا هستیم تا به شما کمک کنیم
            </FsTypography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid size={{ xs: 12, lg: 5 }}>
              <GlassCard sx={{ p: 4, height: '100%' }}>
                <FsTypography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 3,
                  }}
                >
                  ارسال پیام
                </FsTypography>
                <FsFormProvider name="contact" methods={methods}>
                  <Stack spacing={3}>
                    <TextField
                      name="name"
                      fullWidth
                      label="نام و نام خانوادگی"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                    <TextField
                      name="email"
                      fullWidth
                      label="ایمیل"
                      variant="outlined"
                      type="email"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                    <TextField
                      name="phone"
                      fullWidth
                      label="شماره تلفن"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                    <TextField
                      name="message"
                      fullWidth
                      label="پیام شما"
                      variant="outlined"
                      multiline
                      rows={4}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
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
                        '&:hover': {
                          backgroundColor: theme.palette.primary[600],
                        },
                      }}
                    >
                      ارسال پیام
                    </FsButton>
                  </Stack>
                </FsFormProvider>
              </GlassCard>
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
              <GlassCard sx={{ p: 4, height: '100%' }}>
                <FsTypography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 3,
                  }}
                >
                  اطلاعات تماس
                </FsTypography>
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationIcon sx={{ color: theme.palette.primary.main }} />
                    <FsTypography variant="body1">
                      آدرس: تهران، خیابان ولیعصر، پلاک ۱۲۳
                    </FsTypography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PhoneIcon sx={{ color: theme.palette.primary.main }} />
                    <FsTypography variant="body1">
                      تلفن: ۰۲۱-۱۲۳۴۵۶۷۸
                    </FsTypography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EmailIcon sx={{ color: theme.palette.primary.main }} />
                    <FsTypography variant="body1">
                      ایمیل: info@bazaarsara.com
                    </FsTypography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TimeIcon sx={{ color: theme.palette.primary.main }} />
                    <FsTypography variant="body1">
                      ساعات کاری: ۸ صبح تا ۱۰ شب
                    </FsTypography>
                  </Box>
                </Stack>
              </GlassCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: `${theme.palette.common.black}CC`,
          color: theme.palette.common.white,
          py: 6,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} justifyContent="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <FsTypography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              >
                بازارسرا
              </FsTypography>
              <FsTypography
                variant="body2"
                sx={{
                  color: `${theme.palette.common.white}CC`,
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                بازارسرا - هایپرمارکت مدرن و کامل شما
              </FsTypography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton sx={{ color: theme.palette.primary.main }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: theme.palette.primary.main }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton sx={{ color: theme.palette.primary.main }}>
                  <TwitterIcon />
                </IconButton>
                <IconButton sx={{ color: theme.palette.primary.main }}>
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FsTypography
                variant="h6"
                component="h4"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.common.white,
                  mb: 2,
                }}
              >
                لینک‌های مفید
              </FsTypography>
              <Stack spacing={1}>
                <MuiLink
                  component="button"
                  onClick={() => scrollToSection('about')}
                  sx={{
                    color: `${theme.palette.common.white}CC`,
                    textDecoration: 'none',
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
                  }}
                >
                  تماس با ما
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    color: `${theme.palette.common.white}CC`,
                    textDecoration: 'none',
                  }}
                >
                  حریم خصوصی
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    color: `${theme.palette.common.white}CC`,
                    textDecoration: 'none',
                  }}
                >
                  قوانین و مقررات
                </MuiLink>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FsTypography
                variant="h6"
                component="h4"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.common.white,
                  mb: 2,
                }}
              >
                ما را در شبکه‌های اجتماعی دنبال کنید
              </FsTypography>
              <FsTypography
                variant="body2"
                sx={{
                  color: `${theme.palette.common.white}CC`,
                  lineHeight: 1.6,
                }}
              >
                با دنبال کردن ما در شبکه‌های اجتماعی، از آخرین اخبار و پیشنهادات
                ویژه مطلع شوید.
              </FsTypography>
            </Grid>
          </Grid>

          <Divider
            sx={{ borderColor: `${theme.palette.common.white}33`, my: 4 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <FsTypography
              variant="body2"
              sx={{
                color: `${theme.palette.common.white}99`,
              }}
            >
              تمام حقوق محفوظ است. بازارسرا © ۱۴۰۳
            </FsTypography>
          </Box>
        </Container>
      </Box>
    </TurquoiseGradient>
  );
};

export default Landing;
