import { styled, alpha } from '@mui/material/styles';
import { Card, Paper } from '@mui/material';

export const AnimatedBackground = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.95)} 0%, ${alpha(theme.palette.secondary.main, 0.95)} 50%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
  zIndex: -2,
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.common.white, 0.1)} 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, ${alpha(theme.palette.common.white, 0.08)} 0%, transparent 50%)`,
  },
}));

export const FloatingParticles = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: -1,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(100px)',
    opacity: 0.2,
    animation: 'float 20s ease-in-out infinite',
  },
  '&::before': {
    width: '500px',
    height: '500px',
    background: alpha(theme.palette.common.white, 0.15),
    top: '-100px',
    left: '-100px',
    animationDelay: '0s',
  },
  '&::after': {
    width: '400px',
    height: '400px',
    background: alpha(theme.palette.common.white, 0.1),
    bottom: '-50px',
    right: '-50px',
    animationDelay: '10s',
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
    '50%': { transform: 'translate(50px, 50px) scale(1.1)' },
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease',
  },
  '&:hover::before': {
    transform: 'scaleX(1)',
  },
}));

export const AuthPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  p: { xs: 4, sm: 5, md: 6 },
  borderRadius: 4,
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.95)})`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.15)}, 0 0 0 1px ${alpha(theme.palette.common.white, 0.05)} inset`,
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  maxHeight: '95vh',
  overflowY: 'auto',
}));

