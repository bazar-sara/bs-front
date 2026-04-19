'use client';
import { FsButton } from '@fs/core';
import { useTheme, alpha } from '@mui/material';

type SubmitButtonProps = {
  isLoading: boolean;
  disabled: boolean;
  i18nKey: string;
};

export const SubmitButton = ({ isLoading, disabled, i18nKey }: SubmitButtonProps) => {
  const theme = useTheme();

  return (
    <FsButton
      type="submit"
      fullWidth
      variant="contained"
      disabled={disabled || isLoading}
      sx={{
        mt: 1,
        py: 1.5,
        borderRadius: 2,
        fontSize: '1rem',
        fontWeight: 600,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
        '&:hover': {
          boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
          transform: 'translateY(-2px)',
        },
        '&:disabled': {
          background: alpha(theme.palette.primary.main, 0.5),
        },
        transition: 'all 0.3s ease',
      }}
      i18nKey={i18nKey}
    />
  );
};

