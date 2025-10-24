'use client';
import { styled } from '@mui/material/styles';
import { AppBar, Paper, Card, Chip } from '@mui/material';

export const TurquoiseGradient = styled('div')(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary[600]} 50%, ${theme.palette.primary[700]} 100%)`,
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
}));

export const FloatingShapes = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: 0,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    animation: 'float 20s linear infinite',
  },
  '&::before': {
    width: '300px',
    height: '300px',
    top: '10%',
    left: '10%',
    animationDelay: '0s',
  },
  '&::after': {
    width: '200px',
    height: '200px',
    bottom: '20%',
    right: '15%',
    animationDelay: '10s',
  },
  '@keyframes float': {
    '0%': { transform: 'translate(0, 0) rotate(0deg)' },
    '25%': { transform: 'translate(20px, -20px) rotate(90deg)' },
    '50%': { transform: 'translate(-10px, -30px) rotate(180deg)' },
    '75%': { transform: 'translate(-20px, 10px) rotate(270deg)' },
    '100%': { transform: 'translate(0, 0) rotate(360deg)' },
  },
}));

export const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

export const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(64, 224, 208, 0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 30px rgba(64, 224, 208, 0.25)',
  },
}));

export const Header = styled(AppBar)(({ theme }) => ({
  background: `${theme.palette.primary.main}95`,
  backdropFilter: 'blur(10px)',
  boxShadow: `0 2px 20px ${theme.palette.common.black}1A`,
  color: theme.palette.common.white,
}));

export const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: `0 4px 20px ${theme.palette.primary.main}26`,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 8px 30px ${theme.palette.primary.main}40`,
  },
}));

export const DiscountCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: `0 4px 20px ${theme.palette.customColor.main}33`,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 8px 30px ${theme.palette.customColor.main}4D`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, ${theme.palette.customColor.main}1A, ${theme.palette.warning.main}1A)`,
    zIndex: 1,
    pointerEvents: 'none',
  },
}));

export const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.customColor.main,
  color: theme.palette.common.white,
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
