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
  Collapse,
  ListItemButton,
  ListItemIcon,
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
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
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

const mobileDrawerItemSx = {
  mx: 1,
  mb: 0.5,
  borderRadius: 1.5,
  py: 0.75,
  px: 1.25,
  minHeight: 44,
  bgcolor: 'action.hover',
  border: '1px solid',
  borderColor: 'divider',
  '&:hover': {
    bgcolor: 'action.selected',
    borderColor: 'primary.main',
  },
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 1.25,
  textAlign: 'right',
} as const;

const HeaderComponent = ({ scrollToSection }: HeaderComponentProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);

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

  const handleMobileAccountToggle = () => {
    setMobileAccountOpen((v) => !v);
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
                  cursor: 'pointer',
                }}
                onClick={() => router.push('/')}
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
        SlideProps={{ timeout: 280 }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 'min(100vw, 300px)',
            maxWidth: 300,
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[8],
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowX: 'hidden',
          },
          '& .MuiBackdrop-root': {
            bgcolor: alpha(theme.palette.common.black, 0.45),
            backdropFilter: 'blur(4px)',
            transition: 'opacity 0.28s ease',
          },
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            px: 1.5,
            py: 1,
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
          <FsTypography
            variant="h5"
            sx={{ fontWeight: 800, color: 'primary.main' }}
          >
            بازارسرا
          </FsTypography>
        </Box>
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            px: 0.5,
            py: 1,
          }}
        >
          <List dense disablePadding sx={{ overflowX: 'hidden' }}>
            <ListItemButton
              onClick={() => handleScrollToSection('home')}
              sx={mobileDrawerItemSx}
            >
              <ListItemText
                primary="خانه"
                sx={{
                  color: 'text.primary',
                  '& .MuiListItemText-primary': {
                    fontWeight: 650,
                    fontSize: '0.95rem',
                    lineHeight: 1.3,
                    textAlign: 'right',
                  },
                }}
              />
              <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                <HomeIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton
              onClick={() => handleScrollToSection('about')}
              sx={mobileDrawerItemSx}
            >
              <ListItemText
                primary="درباره ما"
                sx={{
                  color: 'text.primary',
                  '& .MuiListItemText-primary': {
                    fontWeight: 650,
                    fontSize: '0.95rem',
                    lineHeight: 1.3,
                    textAlign: 'right',
                  },
                }}
              />
              <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                <InfoIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton
              onClick={() => handleScrollToSection('products')}
              sx={mobileDrawerItemSx}
            >
              <ListItemText
                primary="محصولات"
                sx={{
                  color: 'text.primary',
                  '& .MuiListItemText-primary': {
                    fontWeight: 650,
                    fontSize: '0.95rem',
                    lineHeight: 1.3,
                    textAlign: 'right',
                  },
                }}
              />
              <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                <ShoppingBagIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton
              onClick={() => handleScrollToSection('contact')}
              sx={mobileDrawerItemSx}
            >
              <ListItemText
                primary="تماس با ما"
                sx={{
                  color: 'text.primary',
                  '& .MuiListItemText-primary': {
                    fontWeight: 650,
                    fontSize: '0.95rem',
                    lineHeight: 1.3,
                    textAlign: 'right',
                  },
                }}
              />
              <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                <ContactIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            {user ? (
              <>
                <ListItemButton
                  onClick={handleMobileAccountToggle}
                  sx={mobileDrawerItemSx}
                >
                  <ListItemText
                    primary={user.name}
                    secondary={user.email || user.phoneNumber || ''}
                    sx={{
                      color: 'text.primary',
                      '& .MuiListItemText-primary': {
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        textAlign: 'right',
                      },
                      '& .MuiListItemText-secondary': {
                        textAlign: 'right',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      },
                    }}
                  />
                  <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                    <PersonIcon sx={{ fontSize: 20 }} />
                  </ListItemIcon>
                  {mobileAccountOpen ? (
                    <ExpandLessIcon
                      sx={{ fontSize: 20, color: 'text.secondary' }}
                    />
                  ) : (
                    <ExpandMoreIcon
                      sx={{ fontSize: 20, color: 'text.secondary' }}
                    />
                  )}
                </ListItemButton>

                <Collapse in={mobileAccountOpen} timeout="auto" unmountOnExit>
                  <Box sx={{ px: 1, pb: 0.5, overflowX: 'hidden' }}>
                    <List dense disablePadding>
                      <ListItemButton
                        onClick={handleProfile}
                        sx={{
                          ...mobileDrawerItemSx,
                          mx: 0.5,
                          bgcolor: 'transparent',
                          borderColor: 'transparent',
                          '&:hover': {
                            bgcolor: 'action.hover',
                            borderColor: 'transparent',
                          },
                        }}
                      >
                        <ListItemText
                          primary="پروفایل"
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              textAlign: 'right',
                            },
                          }}
                        />
                        <ListItemIcon
                          sx={{ minWidth: 32, color: 'text.secondary' }}
                        >
                          <PersonIcon sx={{ fontSize: 18 }} />
                        </ListItemIcon>
                      </ListItemButton>

                      {user.type === 'wholesale' ? (
                        <ListItemButton
                          onClick={handleMyShop}
                          sx={{
                            ...mobileDrawerItemSx,
                            mx: 0.5,
                            bgcolor: 'transparent',
                            borderColor: 'transparent',
                            '&:hover': {
                              bgcolor: 'action.hover',
                              borderColor: 'transparent',
                            },
                          }}
                        >
                          <ListItemText
                            primary="فروشگاه من"
                            sx={{
                              '& .MuiListItemText-primary': {
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                textAlign: 'right',
                              },
                            }}
                          />
                          <ListItemIcon
                            sx={{ minWidth: 32, color: 'text.secondary' }}
                          >
                            <StoreIcon sx={{ fontSize: 18 }} />
                          </ListItemIcon>
                        </ListItemButton>
                      ) : (
                        <>
                          <ListItemButton
                            onClick={handleShoppingCart}
                            sx={{
                              ...mobileDrawerItemSx,
                              mx: 0.5,
                              bgcolor: 'transparent',
                              borderColor: 'transparent',
                              '&:hover': {
                                bgcolor: 'action.hover',
                                borderColor: 'transparent',
                              },
                            }}
                            disabled
                          >
                            <ListItemText
                              primary="سبد خرید"
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontWeight: 600,
                                  fontSize: '0.9rem',
                                  textAlign: 'right',
                                },
                              }}
                            />
                            <ListItemIcon
                              sx={{ minWidth: 32, color: 'text.secondary' }}
                            >
                              <ShoppingCartIcon sx={{ fontSize: 18 }} />
                            </ListItemIcon>
                          </ListItemButton>
                          <ListItemButton
                            onClick={handleWallet}
                            disabled
                            sx={{
                              ...mobileDrawerItemSx,
                              mx: 0.5,
                              bgcolor: 'transparent',
                              borderColor: 'transparent',
                              '&:hover': {
                                bgcolor: 'action.hover',
                                borderColor: 'transparent',
                              },
                              opacity: 0.6,
                            }}
                          >
                            <ListItemText
                              primary="کیف پول"
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontWeight: 600,
                                  fontSize: '0.9rem',
                                  textAlign: 'right',
                                },
                              }}
                            />
                            <ListItemIcon
                              sx={{ minWidth: 32, color: 'text.secondary' }}
                            >
                              <WalletIcon sx={{ fontSize: 18 }} />
                            </ListItemIcon>
                          </ListItemButton>
                        </>
                      )}

                      <Divider sx={{ my: 0.75 }} />

                      <ListItemButton
                        onClick={handleLogout}
                        sx={{
                          ...mobileDrawerItemSx,
                          mx: 0.5,
                          bgcolor: 'transparent',
                          borderColor: 'transparent',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.error.main, 0.08),
                          },
                        }}
                      >
                        <ListItemText
                          primary="خروج"
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              textAlign: 'right',
                              color: 'error.main',
                            },
                          }}
                        />
                        <ListItemIcon
                          sx={{ minWidth: 32, color: 'error.main' }}
                        >
                          <LogoutIcon sx={{ fontSize: 18 }} />
                        </ListItemIcon>
                      </ListItemButton>
                    </List>
                  </Box>
                </Collapse>
              </>
            ) : (
              <Box sx={{ px: 1 }}>
                <FsButton
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleLoginClick}
                  sx={{
                    py: 1,
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    borderRadius: 1.5,
                  }}
                >
                  ورود/ثبت نام
                </FsButton>
              </Box>
            )}
          </List>
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
          <MenuItem onClick={handleMyShop} sx={{ py: 1.5 }} disabled>
            <StoreIcon sx={{ ml: 1.5, fontSize: 20 }} />
            <FsTypography variant="body2" i18nKey="My Shop" />
          </MenuItem>
        ) : (
          <Box>
            <MenuItem onClick={handleShoppingCart} sx={{ py: 1.5 }} disabled>
              <ShoppingCartIcon sx={{ ml: 1.5, fontSize: 20 }} />
              <FsTypography variant="body2" i18nKey="Shopping Cart" />
            </MenuItem>
            <MenuItem onClick={handleWallet} sx={{ py: 1.5 }} disabled>
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
