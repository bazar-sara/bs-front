'use client';
import { FsButton, FsTypography } from '@fs/core';
import { Box, Card, CardContent, Paper, useTheme } from '@mui/material';
import {
  LocationOn as LocationIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { toast } from 'sonner';
import type { ProfileAddress } from '../services/models';
import {
  createAddress,
  updateAddress,
  deleteAddress,
} from '../services';
import { AddressForm } from './address-form';
import { getApiErrorMessage } from '@/app/common/services/auth/functions';

type AddressListProps = {
  addresses: ProfileAddress[];
  onUpdate: () => void;
};

export const AddressList = ({ addresses, onUpdate }: AddressListProps) => {
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (payload: {
    street: string;
    postalCode: string;
    no?: string;
    city?: string;
    province?: string;
    title?: string;
  }) => {
    setIsSubmitting(true);
    try {
      await createAddress(payload);
      toast.success('آدرس با موفقیت اضافه شد');
      setShowForm(false);
      onUpdate();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'خطا در افزودن آدرس'));
      console.error('Create address error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (
    id: string,
    payload: {
      street?: string;
      postalCode?: string;
      no?: string;
      city?: string;
      province?: string;
      title?: string;
    }
  ) => {
    setIsSubmitting(true);
    try {
      await updateAddress(id, payload);
      toast.success('آدرس با موفقیت به‌روزرسانی شد');
      setEditingId(null);
      onUpdate();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'خطا در به‌روزرسانی آدرس'));
      console.error('Update address error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این آدرس را حذف کنید؟')) return;
    try {
      await deleteAddress(id);
      toast.success('آدرس حذف شد');
      onUpdate();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'خطا در حذف آدرس'));
      console.error('Delete address error:', error);
    }
  };

  const editingAddress = editingId
    ? addresses.find((a) => a.id === editingId)
    : null;

  return (
    <Card elevation={4} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationIcon sx={{ color: theme.palette.primary.main }} />
            <FsTypography variant="h6" sx={{ fontWeight: 600 }} i18nKey="Addresses" />
          </Box>
          {!showForm && !editingId && (
            <FsButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowForm(true)}
              sx={{ borderRadius: 2 }}
              i18nKey="Add Address"
            />
          )}
        </Box>

        {showForm && (
          <Box sx={{ mb: 3 }}>
            <AddressForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
              isSubmitting={isSubmitting}
            />
          </Box>
        )}

        {editingAddress && (
          <Box sx={{ mb: 3 }}>
            <AddressForm
              initialData={editingAddress}
              onSubmit={(payload) => handleUpdate(editingId!, payload)}
              onCancel={() => setEditingId(null)}
              isSubmitting={isSubmitting}
            />
          </Box>
        )}

        {addresses.length === 0 && !showForm ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <FsTypography variant="body2" i18nKey="No addresses yet" />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {addresses
              .filter((a) => a.id !== editingId)
              .map((addr) => (
                <Paper
                  key={addr.id}
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    '&:hover': { boxShadow: 2 },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      {addr.title && (
                        <FsTypography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {addr.title}
                        </FsTypography>
                      )}
                      <FsTypography variant="body2" color="text.secondary">
                        {[
                          addr.no,
                          addr.street,
                          addr.city,
                          addr.province,
                          addr.postalCode,
                        ]
                          .filter(Boolean)
                          .join('، ')}
                      </FsTypography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <FsButton
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => setEditingId(addr.id)}
                        i18nKey="Edit"
                      />
                      <FsButton
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(addr.id)}
                        i18nKey="Delete"
                      />
                    </Box>
                  </Box>
                </Paper>
              ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
