'use client';
import { styled } from '@mui/material/styles';
import { AppBar, Paper, Card, Chip } from '@mui/material';

/** Marketing page root: flat surface (no full-page gradient). */
export const TurquoiseGradient = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  position: 'relative',
}));

export const FloatingShapes = styled('div')({
  display: 'none',
});

export const GlassCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.paper,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(3),
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.divider}`,
}));

export const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.divider}`,
  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
  '&:hover': {
    boxShadow: theme.shadows[3],
    borderColor: theme.palette.primary.main,
  },
}));

export const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

export const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.divider}`,
  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
  overflow: 'hidden',
  '&:hover': {
    boxShadow: theme.shadows[2],
    borderColor: theme.palette.primary.main,
  },
}));

export const DiscountCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.divider}`,
  transition: 'box-shadow 0.2s ease',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, ${theme.palette.customColor.main}12, ${theme.palette.warning.main}10)`,
    zIndex: 1,
    pointerEvents: 'none',
  },
}));

export const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.customColor.main,
  color: '#fff',
  fontWeight: 700,
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, ${theme.palette.customColor.main}, ${theme.palette.warning.main})`,
    borderRadius: 'inherit',
    zIndex: -1,
  },
}));
