'use client';
import { styled } from '@mui/material/styles';

export const AnimatedBackground = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: 1,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    background:
      theme.palette.mode === 'dark'
        ? `conic-gradient(from 0deg, ${theme.palette.primary[500]}20, ${theme.palette.customColor.main}20, ${theme.palette.warning.main}20, ${theme.palette.primary[500]}20)`
        : 'transparent',
    animation:
      theme.palette.mode === 'dark' ? 'rotate 30s linear infinite' : 'none',
    filter: 'blur(2px)',
  },
  '&::before': {
    width: '600px',
    height: '600px',
    top: '-200px',
    left: '-200px',
    animationDelay: '0s',
  },
  '&::after': {
    width: '500px',
    height: '500px',
    bottom: '-150px',
    right: '-150px',
    animationDelay: '15s',
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

export const ParticleField = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: 1,
  '&::before, &::after, & > div': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    background:
      theme.palette.mode === 'dark'
        ? `${theme.palette.primary[400]}60`
        : `${theme.palette.primary[300]}40`,
    animation:
      theme.palette.mode === 'dark'
        ? 'particleFloat 25s ease-in-out infinite'
        : 'none',
  },
  '&::before': {
    width: '8px',
    height: '8px',
    top: '20%',
    left: '20%',
    animationDelay: '0s',
  },
  '&::after': {
    width: '12px',
    height: '12px',
    top: '60%',
    left: '70%',
    animationDelay: '8s',
  },
  '& > div:nth-of-type(1)': {
    width: '6px',
    height: '6px',
    top: '40%',
    left: '80%',
    animationDelay: '16s',
  },
  '& > div:nth-of-type(2)': {
    width: '10px',
    height: '10px',
    top: '80%',
    left: '30%',
    animationDelay: '12s',
  },
  '& > div:nth-of-type(3)': {
    width: '4px',
    height: '4px',
    top: '10%',
    left: '60%',
    animationDelay: '20s',
  },
  '@keyframes particleFloat': {
    '0%, 100%': {
      transform: 'translateY(0px) scale(1)',
      opacity: 0.6,
    },
    '25%': {
      transform: 'translateY(-20px) scale(1.2)',
      opacity: 1,
    },
    '50%': {
      transform: 'translateY(-10px) scale(0.8)',
      opacity: 0.8,
    },
    '75%': {
      transform: 'translateY(-30px) scale(1.1)',
      opacity: 0.9,
    },
  },
}));
