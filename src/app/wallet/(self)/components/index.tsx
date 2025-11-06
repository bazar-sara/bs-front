'use client';
import { FsButton, FsTypography } from '@fs/core';
import { FsFormProvider, FsInput } from '@fs/form';
import {
  Box,
  Paper,
  Card,
  CardContent,
  useTheme,
  Divider,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  AccountBalanceWallet as WalletIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/auth-context';
import { useWallet, type Transaction } from '@/contexts/wallet-context';
import { toast } from 'sonner';

const GradientBackground = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `linear-gradient(-45deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  zIndex: -1,
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
}));

type ChargeFormData = {
  amount: string;
};

const Wallet = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { wallet, isLoading, chargeWallet, getTransactions } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [showChargeForm, setShowChargeForm] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const methods = useForm<ChargeFormData>();

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleCharge = async (data: ChargeFormData) => {
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('مبلغ نامعتبر است');
      return;
    }

    setIsCharging(true);
    try {
      await chargeWallet(amount);
      toast.success('کیف پول با موفقیت شارژ شد');
      methods.reset();
      setShowChargeForm(false);
    } catch (error) {
      toast.error('خطا در شارژ کیف پول');
      console.error('Charge error:', error);
    } finally {
      setIsCharging(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'charge':
        return <AddIcon sx={{ color: theme.palette.success.main }} />;
      case 'purchase':
        return <RemoveIcon sx={{ color: theme.palette.error.main }} />;
      case 'refund':
        return <AddIcon sx={{ color: theme.palette.info.main }} />;
      default:
        return <RemoveIcon sx={{ color: theme.palette.warning.main }} />;
    }
  };

  const getTransactionLabel = (type: Transaction['type']): string => {
    switch (type) {
      case 'charge':
        return 'شارژ';
      case 'purchase':
        return 'خرید';
      case 'refund':
        return 'بازگشت وجه';
      case 'withdrawal':
        return 'برداشت';
      default:
        return 'نامشخص';
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        p: { xs: 2, md: 4 },
        pt: { xs: 10, md: 12 },
      }}
    >
      {mounted && <GradientBackground />}

      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <FsTypography
          variant="h4"
          component="h1"
          align="center"
          sx={{ mb: 4, fontWeight: 700, color: 'text.primary' }}
          i18nKey="Wallet"
        />

        {/* Balance Card */}
        <Card
          elevation={8}
          sx={{
            mb: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <WalletIcon sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <FsTypography
                    variant="body2"
                    sx={{ opacity: 0.9, mb: 0.5 }}
                    i18nKey="Wallet Balance"
                  />
                  <FsTypography variant="h3" sx={{ fontWeight: 700 }}>
                    {formatCurrency(wallet?.balance || 0)}
                  </FsTypography>
                </Box>
              </Box>
              <FsButton
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowChargeForm(!showChargeForm)}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
                i18nKey="Charge Wallet"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Charge Form */}
        {showChargeForm && (
          <Card elevation={4} sx={{ mb: 4, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <FsTypography
                variant="h6"
                sx={{ mb: 2, fontWeight: 600 }}
                i18nKey="Charge Wallet"
              />
              <FsFormProvider
                name="charge"
                methods={methods}
                formProps={{ onSubmit: methods.handleSubmit(handleCharge) }}
              >
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <FsInput
                      name="amount"
                      fullWidth
                      type="number"
                      i18nKey="Amount (Toman)"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FsButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isCharging}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                      }}
                      i18nKey={isCharging ? 'Charging...' : 'Charge'}
                    />
                  </Grid>
                </Grid>
              </FsFormProvider>
            </CardContent>
          </Card>
        )}

        {/* Transaction History */}
        <Card elevation={4} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 3,
              }}
            >
              <HistoryIcon sx={{ color: theme.palette.primary.main }} />
              <FsTypography
                variant="h6"
                sx={{ fontWeight: 600 }}
                i18nKey="Transaction History"
              />
            </Box>

            {isLoading ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <FsTypography i18nKey="Loading..." variant="body2" />
              </Box>
            ) : getTransactions().length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <FsTypography
                  i18nKey="No transactions yet"
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {getTransactions().map((transaction) => (
                  <Paper
                    key={transaction.id}
                    elevation={1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      '&:hover': {
                        boxShadow: 2,
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          flex: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `${theme.palette.primary.main}10`,
                          }}
                        >
                          {getTransactionIcon(transaction.type)}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mb: 0.5,
                            }}
                          >
                            <FsTypography
                              variant="body1"
                              sx={{ fontWeight: 600 }}
                            >
                              {transaction.description}
                            </FsTypography>
                            <Chip
                              label={getTransactionLabel(transaction.type)}
                              size="small"
                              sx={{ height: 20 }}
                            />
                          </Box>
                          <FsTypography
                            variant="caption"
                            sx={{ color: 'text.secondary' }}
                          >
                            {formatDate(transaction.date)}
                          </FsTypography>
                        </Box>
                      </Box>
                      <FsTypography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color:
                            transaction.amount > 0
                              ? theme.palette.success.main
                              : theme.palette.error.main,
                        }}
                      >
                        {transaction.amount > 0
                          ? `+${formatCurrency(transaction.amount)}`
                          : formatCurrency(Math.abs(transaction.amount))}
                      </FsTypography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Wallet;

