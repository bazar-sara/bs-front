'use client';
import { FsButton, FsTypography } from '@fs/core';
import { FsFormProvider, FsInput } from '@fs/form';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import type { ProfileAddress } from '../services/models';

type AddressFormData = {
  title: string;
  street: string;
  no: string;
  postalCode: string;
  city: string;
  province: string;
};

type AddressFormProps = {
  initialData?: ProfileAddress;
  onSubmit: (payload: {
    street: string;
    postalCode: string;
    no?: string;
    city?: string;
    province?: string;
    title?: string;
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
};

export const AddressForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: AddressFormProps) => {
  const methods = useForm<AddressFormData>({
    defaultValues: {
      title: initialData?.title ?? '',
      street: initialData?.street ?? '',
      no: initialData?.no ?? '',
      postalCode: initialData?.postalCode ?? '',
      city: initialData?.city ?? '',
      province: initialData?.province ?? '',
    },
  });

  const handleSubmit = async (data: AddressFormData) => {
    const payload = {
      street: data.street.trim(),
      postalCode: data.postalCode.trim(),
      no: data.no?.trim() || undefined,
      city: data.city?.trim() || undefined,
      province: data.province?.trim() || undefined,
      title: data.title?.trim() || undefined,
    };
    await onSubmit(payload);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
      }}
    >
      <FsTypography
        variant="subtitle1"
        sx={{ mb: 2, fontWeight: 600 }}
        i18nKey={initialData ? 'Edit Address' : 'New Address'}
      />
      <FsFormProvider
        name="address-form"
        methods={methods}
        formProps={{ onSubmit: methods.handleSubmit(handleSubmit) }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FsInput
              name="title"
              fullWidth
              i18nKey="Title (e.g. Home, Office)"
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FsInput
              name="street"
              fullWidth
              required
              i18nKey="Street"
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FsInput
              name="no"
              fullWidth
              i18nKey="No."
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FsInput
              name="postalCode"
              fullWidth
              required
              i18nKey="Postal Code"
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FsInput
              name="city"
              fullWidth
              i18nKey="City"
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FsInput
              name="province"
              fullWidth
              i18nKey="Province"
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FsButton
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                i18nKey={isSubmitting ? 'Saving...' : 'Save'}
              />
              <FsButton variant="outlined" onClick={onCancel} i18nKey="Cancel" />
            </Box>
          </Grid>
        </Grid>
      </FsFormProvider>
    </Paper>
  );
};
