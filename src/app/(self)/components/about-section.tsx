'use client';
import { FsTypography } from '@fs/core';
import { Box, Container, Grid, CardContent, useTheme } from '@mui/material';
import {
  LocalGroceryStore as GroceryIcon,
  Storefront as StorefrontIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { FeatureCard } from './styled-components';
import { features } from './mock-data';

const AboutSection = () => {
  const theme = useTheme();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GroceryIcon':
        return (
          <GroceryIcon
            sx={{ fontSize: 40, color: theme.palette.primary.main }}
          />
        );
      case 'StorefrontIcon':
        return (
          <StorefrontIcon
            sx={{ fontSize: 40, color: theme.palette.primary.main }}
          />
        );
      case 'MoneyIcon':
        return (
          <MoneyIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
        );
      case 'TimeIcon':
        return (
          <TimeIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
        );
      default:
        return null;
    }
  };

  return (
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
                    {getIcon(feature.icon)}
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
  );
};

export default AboutSection;
