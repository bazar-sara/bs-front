import { createTheme } from '@mui/material';
import { defaultDarkColor, defaultLightColor } from './defaultColors';

export const defaultLightTheme = createTheme({
  spacing: (abs: number) => `${0.35 * abs}rem`,
  palette: {
    mode: 'light',
    primary: {
      main: '#2D7240',
      '50': '#F0F7F2',
      '100': '#D8EDE0',
      '200': '#B3DBC4',
      '300': '#8BC9A6',
      '400': '#5AB084',
      '500': '#3D8B5C',
      '600': '#2D7240',
      '700': '#225A2F',
      '800': '#1B4826',
      '900': '#15361E',
    },
    background: {
      default: '#FAFAF8',
      paper: '#FFFFFF',
    },
    ...defaultLightColor,
    customColor: {
      main: '#BC986A',
      100: '#E8D4BC',
      gradient:
        'linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(232, 212, 188, 0.35) 100%)',
    },
    customColor2: {
      main: '#6B4E2D',
    },
    customColorTable: {
      oddRow: '#0064A51A',
    },
  },
});

export const defaultDarkTheme = createTheme({
  spacing: (abs: number) => `${0.35 * abs}rem`,
  palette: {
    mode: 'dark',
    primary: {
      main: '#225A2F',
      '50': '#262626',
      '100': '#15361E',
      '200': '#1B4826',
      '300': '#225A2F',
      '400': '#2D7240',
      '500': '#479B60',
      '600': '#71B284',
      '700': '#225A2F',
      '800': '#9BC9A8',
      '900': '#225A2F1A',
    },
    ...defaultDarkColor,
    customColor: {
      main: '#BC986A',
      100: '#E8D4BC',
      gradient:
        'linear-gradient(90deg, rgba(25, 25, 25, 0.5) 0%, rgba(74, 54, 32, 0.4) 100%)',
    },
    customColor2: {
      main: '#E8D4BC',
    },
    customColorTable: {
      main: '#1A8DD8',
      oddRow: '#313b41',
    },
  },
});
