'use client';
import { FsTypography } from '@fs/core';
import { Box, Card, CardContent, CardMedia, IconButton, Chip, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useState } from 'react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  discount?: number;
  image: string;
  hasDiscount: boolean;
};

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'محصول نمونه ۱',
    category: 'الکترونیک',
    price: 1000000,
    discount: 15,
    image: 'https://via.placeholder.com/300',
    hasDiscount: true,
  },
  {
    id: 2,
    name: 'محصول نمونه ۲',
    category: 'پوشاک',
    price: 500000,
    image: 'https://via.placeholder.com/300',
    hasDiscount: false,
  },
];

type ProductListProps = {
  onEdit: (productId: number) => void;
};

export const ProductList = ({ onEdit }: ProductListProps) => {
  const theme = useTheme();
  const [products] = useState<Product[]>(mockProducts);

  const handleDelete = (productId: number) => {
    console.log('Delete product:', productId);
  };

  const calculateFinalPrice = (price: number, discount?: number): number => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  return (
    <Box>
      {products.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            color: 'text.secondary',
          }}
        >
          <FsTypography variant="h6" sx={{ mb: 2 }} i18nKey="No products added yet" />
          <FsTypography variant="body2" i18nKey="Go to Add Product tab to add new products" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease',
                  boxShadow: `0 2px 8px ${theme.palette.common.black}08`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => onEdit(product.id)}
                      sx={{
                        backgroundColor: 'background.paper',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(product.id)}
                      sx={{
                        backgroundColor: 'background.paper',
                        '&:hover': {
                          backgroundColor: 'error.main',
                          color: 'error.contrastText',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  {product.hasDiscount && (
                    <Chip
                      label={`${product.discount}% تخفیف`}
                      color="error"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                      }}
                    />
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <FsTypography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                    {product.name}
                  </FsTypography>
                  <FsTypography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    دسته‌بندی: {product.category}
                  </FsTypography>
                  <Box sx={{ mt: 'auto', display: 'flex', gap: 2, alignItems: 'center' }}>
                    {product.hasDiscount && product.discount ? (
                      <>
                        <FsTypography
                          variant="body2"
                          sx={{
                            textDecoration: 'line-through',
                            color: 'text.secondary',
                          }}
                        >
                          {product.price.toLocaleString('fa-IR')} تومان
                        </FsTypography>
                        <FsTypography variant="h6" color="error" sx={{ fontWeight: 700 }}>
                          {calculateFinalPrice(product.price, product.discount).toLocaleString(
                            'fa-IR'
                          )}{' '}
                          تومان
                        </FsTypography>
                      </>
                    ) : (
                      <FsTypography variant="h6" sx={{ fontWeight: 700 }}>
                        {product.price.toLocaleString('fa-IR')} تومان
                      </FsTypography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

