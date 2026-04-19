'use client';
/**
 * Cart line items are mocked in state until a cart API is wired (`(self)/services`).
 */
import { FsButton, FsTypography } from '@fs/core';
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { GlassCard } from '@/app/(not-authenticated)/(self)/components/styled-components';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  discount?: number;
  hasDiscount: boolean;
};

const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: 'محصول نمونه ۱',
    price: 1000000,
    quantity: 2,
    image: 'https://via.placeholder.com/300',
    discount: 15,
    hasDiscount: true,
  },
  {
    id: 2,
    name: 'محصول نمونه ۲',
    price: 500000,
    quantity: 1,
    image: 'https://via.placeholder.com/300',
    hasDiscount: false,
  },
];

export const CartContent = () => {
  const theme = useTheme();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  const handleRemoveItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateItemPrice = (item: CartItem): number => {
    if (item.hasDiscount && item.discount) {
      const discountedPrice = item.price - (item.price * item.discount) / 100;
      return discountedPrice * item.quantity;
    }
    return item.price * item.quantity;
  };

  const calculateTotalPrice = (): number => {
    return cartItems.reduce(
      (total, item) => total + calculateItemPrice(item),
      0
    );
  };

  const calculateOriginalTotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const totalDiscount = calculateOriginalTotal() - calculateTotalPrice();

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      {cartItems.length === 0 ? (
        <GlassCard
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            textAlign: 'center',
            borderRadius: 3,
          }}
        >
          <FsTypography
            variant="h5"
            sx={{ mb: 1.5, fontWeight: 900 }}
            i18nKey="Your shopping cart is empty"
          />
          <FsTypography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
            i18nKey="Go to Products"
          />
          <FsButton
            variant="contained"
            onClick={() => (window.location.href = '/')}
            sx={{
              px: 4,
              py: 1.25,
              borderRadius: 2,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              },
            }}
            i18nKey="Go to Products"
          />
        </GlassCard>
      ) : (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <GlassCard
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  px: { xs: 2, sm: 3 },
                  py: 2,
                  borderBottom: 1,
                  borderColor: 'divider',
                  bgcolor: 'background.default',
                }}
              >
                <FsTypography variant="h6" sx={{ fontWeight: 900 }}>
                  <FsTypography component="span" i18nKey="Products" /> (
                  {cartItems.length})
                </FsTypography>
              </Box>
              <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
                {cartItems.map((item, index) => (
                  <Box key={item.id}>
                    {index > 0 && <Divider sx={{ my: 2 }} />}
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        boxShadow: 'none',
                        backgroundColor: 'transparent',
                        borderRadius: 2.5,
                        border: `1px solid ${theme.palette.divider}`,
                        overflow: 'hidden',
                        transition:
                          'box-shadow 0.2s ease, border-color 0.2s ease',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          boxShadow: `0 6px 18px ${theme.palette.common.black}10`,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: { xs: '100%', sm: 150 },
                          height: { xs: 180, sm: 150 },
                          objectFit: 'cover',
                          borderRadius: {
                            xs: '8px 8px 0 0',
                            sm: '8px 0 0 8px',
                          },
                        }}
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          p: { xs: 2, sm: 3 },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <FsTypography
                              variant="h6"
                              component="h3"
                              sx={{ mb: 1.5, fontWeight: 700 }}
                            >
                              {item.name}
                            </FsTypography>
                            <Box
                              sx={{
                                display: 'flex',
                                gap: 2,
                                alignItems: 'center',
                                flexWrap: 'wrap',
                              }}
                            >
                              {item.hasDiscount && item.discount ? (
                                <>
                                  <FsTypography
                                    variant="body2"
                                    sx={{
                                      textDecoration: 'line-through',
                                    }}
                                  >
                                    {item.price.toLocaleString('fa-IR')} تومان
                                  </FsTypography>
                                  <FsTypography
                                    variant="h6"
                                    color="error"
                                    sx={{ fontWeight: 700 }}
                                  >
                                    {(
                                      item.price -
                                      (item.price * item.discount) / 100
                                    ).toLocaleString('fa-IR')}{' '}
                                    تومان
                                  </FsTypography>
                                  <Chip
                                    label={`${item.discount}% تخفیف`}
                                    color="error"
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                  />
                                </>
                              ) : (
                                <FsTypography
                                  variant="h6"
                                  sx={{ fontWeight: 700 }}
                                >
                                  {item.price.toLocaleString('fa-IR')} تومان
                                </FsTypography>
                              )}
                            </Box>
                          </Box>
                          <IconButton
                            onClick={() => handleRemoveItem(item.id)}
                            sx={{
                              color: 'error.main',
                              border: `1px solid ${theme.palette.error.main}30`,
                              '&:hover': {
                                backgroundColor: 'error.light',
                                color: 'error.contrastText',
                                transform: 'scale(1.1)',
                              },
                              transition: 'all 0.3s ease',
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mt: 'auto',
                            flexWrap: 'wrap',
                          }}
                        >
                          <FsTypography
                            variant="body2"
                            sx={{ fontWeight: 600 }}
                          >
                            تعداد:
                          </FsTypography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              border: `1px solid ${theme.palette.divider}`,
                              borderRadius: 2,
                              overflow: 'hidden',
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              sx={{
                                borderRadius: 0,
                                '&:hover': {
                                  backgroundColor: theme.palette.action.hover,
                                },
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <FsTypography
                              variant="body1"
                              sx={{
                                px: 2,
                                minWidth: 40,
                                textAlign: 'center',
                                fontWeight: 700,
                              }}
                            >
                              {item.quantity}
                            </FsTypography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              sx={{
                                borderRadius: 0,
                                '&:hover': {
                                  backgroundColor: theme.palette.action.hover,
                                },
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          <Box sx={{ mr: 'auto' }}>
                            <FsTypography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                              }}
                            >
                              {calculateItemPrice(item).toLocaleString('fa-IR')}{' '}
                              تومان
                            </FsTypography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </GlassCard>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <GlassCard
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                position: { md: 'sticky' },
                top: { md: 96 },
              }}
            >
              <FsTypography
                variant="h6"
                sx={{ mb: 2.5, fontWeight: 900 }}
                i18nKey="Order Summary"
              />
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                    pb: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <FsTypography variant="body1" i18nKey="Items" />
                  <FsTypography variant="body1" sx={{ fontWeight: 600 }}>
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </FsTypography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                    pb: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <FsTypography variant="body1" i18nKey="Subtotal" />
                  <FsTypography variant="body1" sx={{ fontWeight: 600 }}>
                    {calculateOriginalTotal().toLocaleString('fa-IR')} تومان
                  </FsTypography>
                </Box>
                {totalDiscount > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                      pb: 2,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <FsTypography
                      variant="body1"
                      color="error"
                      i18nKey="Discount"
                    />
                    <FsTypography
                      variant="body1"
                      color="error"
                      sx={{ fontWeight: 600 }}
                    >
                      -{totalDiscount.toLocaleString('fa-IR')} تومان
                    </FsTypography>
                  </Box>
                )}
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3,
                }}
              >
                <FsTypography
                  variant="h6"
                  sx={{ fontWeight: 700 }}
                  i18nKey="Total Amount"
                />
                <FsTypography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {calculateTotalPrice().toLocaleString('fa-IR')} تومان
                </FsTypography>
              </Box>
              <FsButton
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                }}
                i18nKey="Checkout and Place Order"
              />
            </GlassCard>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
