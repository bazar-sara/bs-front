'use client';
import { FsTypography } from '@fs/core';
import { CardContent, Box, useTheme, alpha } from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
} from '@mui/icons-material';
import { StyledCard } from './styled-components';

type UserTypeCardProps = {
  type: 'retail' | 'wholesale';
  isSelected: boolean;
  onClick: () => void;
};

export const UserTypeCard = ({
  type,
  isSelected,
  onClick,
}: UserTypeCardProps) => {
  const theme = useTheme();
  const isRetail = type === 'retail';

  return (
    <StyledCard
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        border: `2px solid ${isSelected ? theme.palette.primary.main : theme.palette.divider}`,
        backgroundColor: isSelected
          ? alpha(theme.palette.primary.main, 0.06)
          : 'transparent',
        boxShadow: isSelected ? theme.shadows[2] : 'none',
        transform: 'none',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          boxShadow: theme.shadows[2],
        },
      }}
    >
      <CardContent sx={{ p: 3, textAlign: 'center' }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: isSelected
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.1)})`
              : alpha(theme.palette.primary.main, 0.05),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            transition: 'all 0.3s ease',
          }}
        >
          {isRetail ? (
            <ShoppingCartIcon
              sx={{
                fontSize: 28,
                color: isSelected
                  ? theme.palette.primary.main
                  : 'text.secondary',
              }}
            />
          ) : (
            <StoreIcon
              sx={{
                fontSize: 28,
                color: isSelected
                  ? theme.palette.primary.main
                  : 'text.secondary',
              }}
            />
          )}
        </Box>
        {/* خریدار خرده‌فروش / تولیدکننده و عمده‌فروش — titles hidden per product request
        <FsTypography
          variant="subtitle1"
          sx={{
            fontWeight: isSelected ? 700 : 600,
            color: isSelected ? 'primary.main' : 'text.primary',
            mb: 0.5,
          }}
          i18nKey={isRetail ? 'Retail Buyer' : 'Producer & Wholesaler'}
        />
        */}
        <FsTypography
          variant="caption"
          sx={{
            fontSize: '0.75rem',
            lineHeight: 1.5,
          }}
          i18nKey={
            isRetail
              ? 'Retail buyer description'
              : 'Wholesale seller description'
          }
        />
      </CardContent>
    </StyledCard>
  );
};
