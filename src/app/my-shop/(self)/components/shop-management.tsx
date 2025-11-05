'use client';
import { FsTypography } from '@fs/core';
import { Box, Container, Paper, Tab, Tabs, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ProductList } from './product-list';
import { ProductForm } from './product-form';
import { ShopHeader } from './shop-header';

type TabValue = 'products' | 'add-product';

export const ShopManagement = () => {
  const theme = useTheme();
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<TabValue>('products');
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: TabValue
  ) => {
    setActiveTab(newValue);
    setEditingProduct(null);
  };

  const handleEditProduct = (productId: number) => {
    setEditingProduct(productId);
    setActiveTab('add-product');
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setActiveTab('products');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : 'grey.50',
        pb: 4,
      }}
    >
      <ShopHeader />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box
          sx={{
            mb: 4,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}08)`,
            borderRadius: 4,
            p: 4,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <FsTypography
            variant="h3"
            component="h1"
            sx={{
              mb: 1.5,
              fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            i18nKey="Shop Management"
          />
          <FsTypography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: '1.1rem', maxWidth: 600, mx: 'auto' }}
            i18nKey="Manage your products and shop settings"
          />
        </Box>

        {/* Main Content Card */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: `0 4px 24px ${theme.palette.common.black}08`,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              backgroundColor:
                theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              '& .MuiTab-root': {
                minHeight: 72,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                px: 4,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                },
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          >
            <Tab
              label={t('Products')}
              value="products"
              sx={{ minWidth: { xs: 'auto', sm: 200 } }}
            />
            <Tab
              label={t('Add Product')}
              value="add-product"
              sx={{ minWidth: { xs: 'auto', sm: 200 } }}
            />
          </Tabs>

          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {activeTab === 'products' && (
              <ProductList onEdit={handleEditProduct} />
            )}
            {activeTab === 'add-product' && (
              <ProductForm
                productId={editingProduct}
                onCancel={handleCancelEdit}
                onSuccess={handleCancelEdit}
              />
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
