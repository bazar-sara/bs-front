'use client';
import { FsButton, FsTypography } from '@fs/core';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  IconButton,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ShoppingBag as ShoppingBagIcon,
  ContactMail as ContactIcon,
  Store as StoreIcon,
  Logout as LogoutIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountBalanceWallet as WalletIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/common/hooks/use-auth';
import { Header } from './styled-components';
import { ThemeToggle } from '@/app/common/components';

type HeaderComponentProps = {
  scrollToSection: (sectionId: string) => void;
};

const navLinkSx = {
  color: 'text.secondary',
  textDecoration: 'none',
  fontWeight: 500,
  '&:hover': {
    color: 'primary.main',
    textDecoration: 'underline',
  },
  transition: 'color 0.2s ease',
} as const;

const HeaderComponent = ({ scrollToSection }: HeaderComponentProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 899);
    };

    // Check on mount
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyShop = () => {
    handleMenuClose();
    router.push('/my-shop');
  };

  const handleShoppingCart = () => {
    handleMenuClose();
    router.push('/cart');
  };

  const handleWallet = () => {
    handleMenuClose();
    router.push('/wallet');
  };

  const handleProfile = () => {
    handleMenuClose();
    router.push('/profile');
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    router.push('/');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <>
      <Header position="fixed" elevation={0}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1,
            }}
          >
            <Box
              sx={{
                display: { xs: 'flex', md: 'block' },
                alignItems: 'center',
                gap: { xs: 1.5, md: 0 },
              }}
            >
              {/* Menu Icon on the right for RTL */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  onClick={handleMobileMenuToggle}
                  sx={{
                    width: 40,
                    height: 40,
                    color: 'text.primary',
                    display: { xs: 'block', md: 'none' },
                    bgcolor: 'action.hover',
                    '&:hover': { bgcolor: 'action.selected' },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* Logo/Title on the right for RTL */}
              <FsTypography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                }}
              >
                بازارسرا
              </FsTypography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {isMobile ? (
                <ThemeToggle />
              ) : (
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <MuiLink
                    component="button"
                    onClick={() => scrollToSection('home')}
                    sx={navLinkSx}
                  >
                    خانه
                  </MuiLink>
                  <MuiLink
                    component="button"
                    onClick={() => scrollToSection('about')}
                    sx={navLinkSx}
                  >
                    درباره ما
                  </MuiLink>
                  <MuiLink
                    component="button"
                    onClick={() => scrollToSection('products')}
                    sx={navLinkSx}
                  >
                    محصولات
                  </MuiLink>
                  <MuiLink
                    component="button"
                    onClick={() => scrollToSection('contact')}
                    sx={navLinkSx}
                  >
                    تماس با ما
                  </MuiLink>
                  <ThemeToggle />
                  {user ? (
                    <IconButton
                      onClick={handleAvatarClick}
                      sx={{
                        p: 0,
                        ml: 2,
                        border: '2px solid',
                        borderColor: 'divider',
                        '&:hover': { borderColor: 'primary.main' },
                      }}
                    >
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        sx={{
                          width: 40,
                          height: 40,
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  ) : (
                    <FsButton
                      variant="outlined"
                      color="primary"
                      onClick={handleLoginClick}
                    >
                      ورود/ثبت نام
                    </FsButton>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Header>

      {/* Mobile Menu Drawer */}
      <Drawer
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        role="presentation"
        sx={{
          '& .MuiDrawer-paper': {
            width: '100vw',
            maxWidth: 320,
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[8],
          },
          '& .MuiBackdrop-root': {
            bgcolor: alpha(theme.palette.common.black, 0.45),
            backdropFilter: 'blur(4px)',
          },
        }}
      >
        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <IconButton
            onClick={handleMobileMenuToggle}
            sx={{
              color: 'text.secondary',
              bgcolor: 'action.hover',
              '&:hover': { bgcolor: 'action.selected' },
            }}
          >
            <CloseIcon />
          </IconButton>
          <FsTypography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
            بازارسرا
          </FsTypography>
        </Box>
        <Box
          sx={{ position: 'relative', zIndex: 2, flex: 1, overflow: 'hidden' }}
        >
          <List sx={{ py: 2, px: 1 }}>
            <ListItem
              component="button"
              onClick={() => handleScrollToSection('home')}
              sx={{
                mx: 'auto', // FIX 3: Center the ListItem horizontally by setting auto margins
                maxWidth: '90%', // Helps with centering
                mb: 1,
                borderRadius: 2,
                bgcolor: 'action.hover',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'action.selected',
                  borderColor: 'primary.main',
                },
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end', // Aligned content to the right (RTL standard)
                gap: 2,
                py: 2,
                px: 2,
                textAlign: 'right',
              }}
            >
              <ListItemText
                primary="خانه"
                sx={{
                  color: 'text.primary',
                  '& .MuiListItemText-primary': {
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textAlign: 'right',
                  },
                }}
              />
              <HomeIcon
                sx={{ color: theme.palette.primary.main, fontSize: 24 }}
              />
            </ListItem>
            <ListItem
              component="button"
              onClick={() => handleScrollToSection('about')}
              sx={{
                mx: 'auto', // FIX 3: Center the ListItem horizontally
                maxWidth: '90%', // Helps with centering
                mb: 1,
                borderRadius: 2,
                bgcolor: 'action.hover',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'action.selected',
                  borderColor: 'primary.main',
                },
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end', // Aligned content to the right
                gap: 2,
                py: 2,
                px: 2,
                textAlign: 'right',
              }}
            >
              <ListItemText
                primary="درباره ما"
                sx={{
                  color: 'text.primary',
                  '& .MuiListItemText-primary': {
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textAlign: 'right',
                  },
                }}
              />
              <InfoIcon
                sx={{ color: theme.palette.primary.main, fontSize: 24 }}
              />
            </ListItem>
            <ListItem
              component="button"
              onClick={() => handleScrollToSection('products')}
              sx={{
                mx: 'auto', // FIX 3: Center the ListItem horizontally
                maxWidth: '90%', // Helps with centering
                mb: 1,
                borderRadius: 2,
                bgcolor: 'action.hover',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'action.selected',
                  borderColor: 'primary.main',
                },
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end', // Aligned content to the right
                gap: 2,
                py: 2,
                px: 2,
                textAlign: 'right',
              }}
            >
              <ListItemText
                primary="محصولات"
                sx={{
                  color: 'text.primary',
                  '& .MuiListItemText-primary': {
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textAlign: 'right',
                  },
                }}
              />
              <ShoppingBagIcon
                sx={{ color: theme.palette.primary.main, fontSize: 24 }}
              />
            </ListItem>
            <ListItem
              component="button"
              onClick={() => handleScrollToSection('contact')}
              sx={{
                mx: 'auto', // FIX 3: Center the ListItem horizontally
                maxWidth: '90%', // Helps with centering
                mb: 1,
                borderRadius: 2,
                bgcolor: 'action.hover',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'action.selected',
                  borderColor: 'primary.main',
                },
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end', // Aligned content to the right
                gap: 2,
                py: 2,
                px: 2,
                textAlign: 'right',
              }}
            >
              <ListItemText
                primary="تماس با ما"
                sx={{
                  color: 'text.primary',
                  '& .MuiListItemText-primary': {
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textAlign: 'right',
                  },
                }}
              />
              <ContactIcon
                sx={{ color: theme.palette.primary.main, fontSize: 24 }}
              />
            </ListItem>
          </List>
        </Box>
        <Box
          sx={{
            p: 3,
            position: 'relative',
            zIndex: 2,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.default',
          }}
        >
          {user ? (
            <Box>
              <Box sx={{ px: 2, py: 1.5, mb: 1 }}>
                <FsTypography variant="body2" sx={{ fontWeight: 600 }}>
                  {user.name}
                </FsTypography>
                {user.email && (
                  <FsTypography variant="caption" sx={{ opacity: 0.8 }}>
                    {user.email}
                  </FsTypography>
                )}
                {!user.email && user.phoneNumber && (
                  <FsTypography variant="caption" sx={{ opacity: 0.8 }}>
                    {user.phoneNumber}
                  </FsTypography>
                )}
              </Box>
              <Divider sx={{ mb: 1 }} />
              <FsButton
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleProfile}
                sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, borderRadius: 2, mb: 1 }}
              >
                <PersonIcon sx={{ ml: 1, fontSize: 20 }} />
                <FsTypography variant="body2" i18nKey="Profile" />
              </FsButton>
              {user.type === 'wholesale' ? (
                <FsButton
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleMyShop}
                  sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, borderRadius: 2, mb: 1 }}
                >
                  <StoreIcon sx={{ ml: 1, fontSize: 20 }} />
                  <FsTypography variant="body2" i18nKey="My Shop" />
                </FsButton>
              ) : (
                <>
                  <FsButton
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleShoppingCart}
                    sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, borderRadius: 2, mb: 1 }}
                  >
                    <ShoppingCartIcon sx={{ ml: 1, fontSize: 20 }} />
                    <FsTypography variant="body2" i18nKey="Shopping Cart" />
                  </FsButton>
                  <FsButton
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleWallet}
                    sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, borderRadius: 2, mb: 1 }}
                  >
                    <WalletIcon sx={{ ml: 1, fontSize: 20 }} />
                    <FsTypography variant="body2" i18nKey="Wallet" />
                  </FsButton>
                </>
              )}
              <FsButton
                variant="outlined"
                color="error"
                fullWidth
                onClick={handleLogout}
                sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, borderRadius: 2 }}
              >
                <LogoutIcon sx={{ ml: 1, fontSize: 20 }} />
                <FsTypography variant="body2" i18nKey="Logout" />
              </FsButton>
            </Box>
          ) : (
            <FsButton
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleLoginClick}
              sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 600, borderRadius: 2 }}
            >
              ورود/ثبت نام
            </FsButton>
          )}
        </Box>
      </Drawer>

      {/* Avatar Menu for Colleagues */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          mt: 1.5,
          '& .MuiPaper-root': {
            minWidth: 200,
            borderRadius: 2,
            boxShadow: `0 4px 20px ${theme.palette.common.black}20`,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <FsTypography variant="body2" sx={{ fontWeight: 600 }}>
            {user?.name}
          </FsTypography>
          <FsTypography variant="caption">
            {user?.email || user?.phoneNumber}
          </FsTypography>
        </Box>
        <Divider />
        <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
          <PersonIcon sx={{ ml: 1.5, fontSize: 20 }} />
          <FsTypography variant="body2" i18nKey="Profile" />
        </MenuItem>
        {user?.type === 'wholesale' ? (
          <MenuItem onClick={handleMyShop} sx={{ py: 1.5 }}>
            <StoreIcon sx={{ ml: 1.5, fontSize: 20 }} />
            <FsTypography variant="body2" i18nKey="My Shop" />
          </MenuItem>
        ) : (
          <Box>
            <MenuItem onClick={handleShoppingCart} sx={{ py: 1.5 }}>
              <ShoppingCartIcon sx={{ ml: 1.5, fontSize: 20 }} />
              <FsTypography variant="body2" i18nKey="Shopping Cart" />
            </MenuItem>
            <MenuItem onClick={handleWallet} sx={{ py: 1.5 }}>
              <WalletIcon sx={{ ml: 1.5, fontSize: 20 }} />
              <FsTypography variant="body2" i18nKey="Wallet" />
            </MenuItem>
          </Box>
        )}
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
          <LogoutIcon sx={{ ml: 1.5, fontSize: 20 }} />
          <FsTypography variant="body2" i18nKey="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderComponent;
