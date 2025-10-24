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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThemeToggle />
                <IconButton
                  color="inherit"
                  onClick={handleMobileMenuToggle}
                  sx={{ color: theme.palette.common.white }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
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
            background: `${theme.palette.primary.main}F2`,
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
          <FsTypography
            variant="h6"
            sx={{ color: theme.palette.common.white, fontWeight: 700 }}
          >
            بازارسرا
          </FsTypography>
          <IconButton
            onClick={handleMobileMenuToggle}
            sx={{ color: theme.palette.common.white }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: `${theme.palette.common.white}4D` }} />
        <List>
          <ListItem
            component="button"
            onClick={() => handleScrollToSection('home')}
          >
            <ListItemText
              primary="خانه"
              sx={{ color: theme.palette.common.white }}
            />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => handleScrollToSection('about')}
          >
            <ListItemText
              primary="درباره ما"
              sx={{ color: theme.palette.common.white }}
            />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => handleScrollToSection('products')}
          >
            <ListItemText
              primary="محصولات"
              sx={{ color: theme.palette.common.white }}
            />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => handleScrollToSection('contact')}
          >
            <ListItemText
              primary="تماس با ما"
              sx={{ color: theme.palette.common.white }}
            />
          </ListItem>
        </List>
        <Box sx={{ p: 2 }}>
          <FsButton
            variant="outlined"
            fullWidth
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
      </Drawer>
    </>
  );
};

export default HeaderComponent;
