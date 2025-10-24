'use client';
import { FsTypography } from '@fs/core';
import {
  Box,
  Container,
  Grid,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  LocalOffer as OfferIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import { DiscountCard, DiscountBadge } from './styled-components';
import { discountProducts } from './mock-data';

const DiscountProductsSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, backgroundColor: `${theme.palette.customColor.main}1A` }}>
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
          {discountProducts.map((product, index) => (
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
                    priority={index < 4}
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
  );
};

export default DiscountProductsSection;
