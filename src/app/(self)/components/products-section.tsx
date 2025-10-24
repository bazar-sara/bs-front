'use client';
import { FsTypography } from '@fs/core';
import {
  Box,
  Container,
  Grid,
  CardContent,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import { ProductCard } from './styled-components';
import { products } from './mock-data';

const ProductsSection = () => {
  const theme = useTheme();

  return (
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
  );
};

export default ProductsSection;
