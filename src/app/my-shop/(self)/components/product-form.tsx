'use client';
import { FsButton, FsTypography } from '@fs/core';
import { FsFormProvider, FsInput, FsSelect } from '@fs/form';
import { Box, Switch, FormControlLabel, useTheme, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

type ProductFormData = {
  name: string;
  category: string;
  price: string;
  description: string;
  hasDiscount: boolean;
  discount: string;
  imageUrl: string;
};

type ProductFormProps = {
  productId?: number | null;
  onCancel: () => void;
  onSuccess: () => void;
};

const categories = [
  { value: 'الکترونیک', label: 'الکترونیک' },
  { value: 'پوشاک', label: 'پوشاک' },
  { value: 'غذا', label: 'غذا' },
  { value: 'کتاب', label: 'کتاب' },
  { value: 'ورزشی', label: 'ورزشی' },
  { value: 'خودرو', label: 'خودرو' },
];

export const ProductForm = ({
  productId,
  onCancel,
  onSuccess,
}: ProductFormProps) => {
  const theme = useTheme();
  const t = useTranslations();
  const methods = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      category: '',
      price: '',
      description: '',
      hasDiscount: false,
      discount: '',
      imageUrl: '',
    },
  });

  const hasDiscount = methods.watch('hasDiscount');

  const onSubmit = (data: ProductFormData) => {
    console.log('Product data:', data);
    onSuccess();
  };

  return (
    <Box>
      <FsTypography
        variant="h5"
        sx={{ mb: 4, fontWeight: 700, color: theme.palette.text.primary }}
        i18nKey={productId ? 'Edit Product' : 'Add Product'}
      />

      <FsFormProvider
        name="product-form"
        // @ts-expect-error - FsFormProvider expects FieldValues but we're using typed form
        methods={methods}
        formProps={{ onSubmit: methods.handleSubmit(onSubmit) }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Grid container spacing={3}>
            {/* Product Name - Full Width */}
            <Grid size={{ xs: 12 }}>
              <FsInput
                name="name"
                fullWidth
                required
                i18nKey="Product Name"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Category and Price - Side by Side */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FsSelect
                name="category"
                i18nKey="Category"
                items={categories}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FsInput
                name="price"
                type="number"
                fullWidth
                required
                i18nKey="Price"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Description - Full Width */}
            <Grid size={{ xs: 12 }}>
              <FsInput
                name="description"
                multiline
                rows={4}
                fullWidth
                i18nKey="Description"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Has Discount Switch - Full Width */}
            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor:
                    theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={hasDiscount}
                      onChange={(e) =>
                        methods.setValue('hasDiscount', e.target.checked)
                      }
                      color="primary"
                    />
                  }
                  label={t('Has Discount')}
                  sx={{
                    m: 0,
                    '& .MuiFormControlLabel-label': {
                      fontWeight: 600,
                    },
                  }}
                />
              </Paper>
            </Grid>

            {/* Discount Percentage - Conditional, Full Width on Mobile */}
            {hasDiscount && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsInput
                  name="discount"
                  i18nKey="Discount Percentage"
                  type="number"
                  fullWidth
                  required
                  inputProps={{ min: 0, max: 100 }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            )}

            {/* Image URL - Full Width */}
            <Grid size={{ xs: 12 }}>
              <FsInput
                name="imageUrl"
                fullWidth
                i18nKey="Image URL"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Action Buttons */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'flex-end',
                  mt: 2,
                  flexDirection: { xs: 'column-reverse', sm: 'row' },
                }}
              >
                <FsButton
                  variant="outlined"
                  onClick={onCancel}
                  fullWidth={false}
                  sx={{
                    minWidth: { xs: '100%', sm: 120 },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                  i18nKey="Cancel"
                />
                <FsButton
                  type="submit"
                  variant="contained"
                  fullWidth={false}
                  sx={{
                    minWidth: { xs: '100%', sm: 120 },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                  }}
                  i18nKey="Save"
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </FsFormProvider>
    </Box>
  );
};
