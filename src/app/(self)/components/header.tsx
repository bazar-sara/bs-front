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
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useState } from 'react';
import { Header } from './styled-components';

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
          <ListItem
            component="button"
            onClick={() => handleScrollToSection('home')}
          >
            <ListItemText primary="خانه" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => handleScrollToSection('about')}
          >
            <ListItemText primary="درباره ما" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => handleScrollToSection('products')}
          >
            <ListItemText primary="محصولات" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => handleScrollToSection('contact')}
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
    </>
  );
};

export default HeaderComponent;
