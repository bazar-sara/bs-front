'use client';
import { styled } from '@mui/material/styles';
import { AppBar, Paper, Card, Chip } from '@mui/material';

export const TurquoiseGradient = styled('div')(({ theme }) => ({
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, 
        ${theme.palette.primary[900]} 0%, 
        ${theme.palette.primary[800]} 25%, 
        ${theme.palette.primary.main} 50%, 
        ${theme.palette.customColor.main} 75%, 
        ${theme.palette.primary[700]} 100%)`
      : `linear-gradient(135deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.primary[600]} 50%, 
        ${theme.palette.primary[700]} 100%)`,
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      theme.palette.mode === 'dark'
        ? `radial-gradient(circle at 20% 80%, ${theme.palette.customColor.main}33 0%, transparent 50%),
         radial-gradient(circle at 80% 20%, ${theme.palette.primary[500]}33 0%, transparent 50%),
         radial-gradient(circle at 40% 40%, ${theme.palette.warning.main}22 0%, transparent 50%)`
        : `radial-gradient(circle at 20% 80%, ${theme.palette.primary[200]}40 0%, transparent 50%),
         radial-gradient(circle at 80% 20%, ${theme.palette.primary[300]}40 0%, transparent 50%)`,
    zIndex: 1,
    animation: 'backgroundShift 20s ease-in-out infinite',
  },
  '@keyframes backgroundShift': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.8 },
  },
}));

export const FloatingShapes = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: 2,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(45deg, ${theme.palette.primary[500]}40, ${theme.palette.customColor.main}40)`
        : `${theme.palette.common.white}1A`,
    animation: 'float 20s linear infinite',
    filter: theme.palette.mode === 'dark' ? 'blur(1px)' : 'none',
  },
  '&::before': {
    width: theme.palette.mode === 'dark' ? '400px' : '300px',
    height: theme.palette.mode === 'dark' ? '400px' : '300px',
    top: '10%',
    left: '10%',
    animationDelay: '0s',
  },
  '&::after': {
    width: theme.palette.mode === 'dark' ? '300px' : '200px',
    height: theme.palette.mode === 'dark' ? '300px' : '200px',
    bottom: '20%',
    right: '15%',
    animationDelay: '10s',
  },
  '@keyframes float': {
    '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
    '25%': { transform: 'translate(20px, -20px) rotate(90deg) scale(1.1)' },
    '50%': { transform: 'translate(-10px, -30px) rotate(180deg) scale(0.9)' },
    '75%': { transform: 'translate(-20px, 10px) rotate(270deg) scale(1.05)' },
    '100%': { transform: 'translate(0, 0) rotate(360deg) scale(1)' },
  },
}));

export const GlassCard = styled(Paper)(({ theme }) => ({
  background: `${theme.palette.background.paper}F2`,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(3),
  boxShadow: `0 8px 32px ${theme.palette.common.black}1A`,
  border: `1px solid ${theme.palette.divider}`,
}));

export const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: `0 4px 20px ${theme.palette.primary.main}26`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 8px 30px ${theme.palette.primary.main}40`,
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
