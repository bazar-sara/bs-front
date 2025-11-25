'use client';
import { FsButton, FsTypography } from '@fs/core';
import { Box, useTheme, alpha } from '@mui/material';

type FooterLinkProps = {
  text: string;
  linkText: string;
  linkI18nKey: string;
  onClick: () => void;
};

export const FooterLink = ({ text, linkText, linkI18nKey, onClick }: FooterLinkProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 3,
        pt: 3,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        textAlign: 'center',
      }}
    >
      <FsTypography component="span" i18nKey={text} variant="body2" sx={{ color: 'text.secondary' }} />
      <FsButton
        variant="text"
        size="small"
        onClick={onClick}
        sx={{
          mx: 1,
          textTransform: 'none',
          fontWeight: 600,
          color: 'primary.main',
        }}
        i18nKey={linkI18nKey}
      />
    </Box>
  );
};

