import { styled } from '@mui/material/styles';
import { Card, Paper } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  borderRadius: Number(theme.shape.borderRadius),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[2],
  },
}));

export const AuthPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 520,
  borderRadius: Number(theme.shape.borderRadius) + 2,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));
