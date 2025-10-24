'use client';
import { FsButton, FsTypography } from '@fs/core';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ShoppingBag as ShoppingBagIcon,
  ContactMail as ContactIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { Header } from './styled-components';
import ThemeToggle from './theme-toggle';

type HeaderComponentProps = {
  scrollToSection: (sectionId: string) => void;
};

const HeaderComponent = ({ scrollToSection }: HeaderComponentProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
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
            <Box display={{ xs: 'flex', md: undefined }}>
              {/* Logo/Title on the right for RTL */}
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
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Menu Icon on the left for RTL */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  onClick={handleMobileMenuToggle}
                  sx={{
                    width: 40,
                    height: 40,
                    color: theme.palette.common.white,
                    display: { xs: 'block', md: 'none' },
                    backgroundColor: `${theme.palette.common.white}10`,
                    '&:hover': {
                      backgroundColor: `${theme.palette.common.white}20`,
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {isMobile ? (
                <ThemeToggle />
              ) : (
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <MuiLink
                    component="button"
                    onClick={() => scrollToSection('home')}
                    sx={{
                      color: theme.palette.common.white,
                      textDecoration: 'none',
                      fontWeight: 500,
                      // FIX: Add hover effect to desktop links
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'underline',
                      },
                      transition: 'opacity 0.2s ease',
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
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'underline',
                      },
                      transition: 'opacity 0.2s ease',
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
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'underline',
                      },
                      transition: 'opacity 0.2s ease',
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
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'underline',
                      },
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    تماس با ما
                  </MuiLink>
                  <ThemeToggle />
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
            width: '100vw',
            maxWidth: 320,
            background:
              theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, 
                  ${theme.palette.primary[900]} 0%, 
                  ${theme.palette.primary[800]} 50%, 
                  ${theme.palette.common.black} 100%)`
                : `linear-gradient(135deg, 
                  ${theme.palette.common.black} 0%, 
                  ${theme.palette.primary[800]} 50%, 
                  ${theme.palette.primary[700]} 100%)`,
            backdropFilter: 'blur(15px)',
            // FIX: Change border/shadow for left anchor
            borderRight: `1px solid ${theme.palette.primary.main}40`,
            boxShadow: `10px 0 30px ${theme.palette.common.black}30`,
            borderLeft: 'none', // Remove conflicting left border
            // FIX: Adjust the radial gradient position
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                theme.palette.mode === 'dark'
                  ? `radial-gradient(circle at 20% 20%, ${theme.palette.customColor.main}10 0%, transparent 50%)` // Adjusted to 20%
                  : `radial-gradient(circle at 20% 20%, ${theme.palette.primary[500]}08 0%, transparent 50%)`, // Adjusted to 20%
              zIndex: 1,
            },
          },
          '& .MuiBackdrop-root': {
            backgroundColor: `${theme.palette.common.black}60`,
            backdropFilter: 'blur(5px)',
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
            borderBottom: `1px solid ${theme.palette.primary.main}30`,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}20, transparent)`,
          }}
        >
          {/* Close Icon on the right for a left-anchored Drawer in an RTL-friendly design */}
          <IconButton
            onClick={handleMobileMenuToggle}
            sx={{
              color: theme.palette.common.white,
              backgroundColor: `${theme.palette.common.white}10`,
              '&:hover': {
                backgroundColor: `${theme.palette.common.white}20`,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <CloseIcon />
          </IconButton>
          <FsTypography
            variant="h5"
            sx={{
              color: theme.palette.common.white,
              fontWeight: 800,
              textShadow:
                theme.palette.mode === 'dark'
                  ? `2px 2px 4px ${theme.palette.common.black}80`
                  : 'none',
            }}
          >
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
                backgroundColor: `${theme.palette.common.white}05`,
                border: `1px solid ${theme.palette.primary.main}20`,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}20`,
                  borderColor: theme.palette.primary.main,
                  transform: 'translateX(0)', // Remove 'translateX(-5px)' for centering
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
                  color: theme.palette.common.white,
                  textShadow:
                    theme.palette.mode === 'dark'
                      ? `1px 1px 2px ${theme.palette.common.black}60`
                      : 'none',
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
                backgroundColor: `${theme.palette.common.white}05`,
                border: `1px solid ${theme.palette.primary.main}20`,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}20`,
                  borderColor: theme.palette.primary.main,
                  transform: 'translateX(0)', // Remove 'translateX(-5px)'
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
                  color: theme.palette.common.white,
                  textShadow:
                    theme.palette.mode === 'dark'
                      ? `1px 1px 2px ${theme.palette.common.black}60`
                      : 'none',
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
                backgroundColor: `${theme.palette.common.white}05`,
                border: `1px solid ${theme.palette.primary.main}20`,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}20`,
                  borderColor: theme.palette.primary.main,
                  transform: 'translateX(0)', // Remove 'translateX(-5px)'
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
                  color: theme.palette.common.white,
                  textShadow:
                    theme.palette.mode === 'dark'
                      ? `1px 1px 2px ${theme.palette.common.black}60`
                      : 'none',
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
                backgroundColor: `${theme.palette.common.white}05`,
                border: `1px solid ${theme.palette.primary.main}20`,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}20`,
                  borderColor: theme.palette.primary.main,
                  transform: 'translateX(0)', // Remove 'translateX(-5px)'
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
                  color: theme.palette.common.white,
                  textShadow:
                    theme.palette.mode === 'dark'
                      ? `1px 1px 2px ${theme.palette.common.black}60`
                      : 'none',
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
            borderTop: `1px solid ${theme.palette.primary.main}30`,
            background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}10)`,
          }}
        >
          <FsButton
            variant="outlined"
            fullWidth
            sx={{
              borderColor: theme.palette.common.white,
              color: theme.palette.common.white,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              textShadow:
                theme.palette.mode === 'dark'
                  ? `1px 1px 2px ${theme.palette.common.black}60`
                  : 'none',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: `${theme.palette.primary.main}20`,
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            ورود/ثبت نام
          </FsButton>
        </Box>
      </Drawer>
    </>
  );
};

export default HeaderComponent;
