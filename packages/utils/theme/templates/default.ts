import { createTheme } from '@mui/material';
import { defaultDarkColor, defaultLightColor } from './defaultColors';

/** Default marketplace theme: indigo primary, teal secondary, neutral surfaces (no legacy brand green/brown). */
export const defaultLightTheme = createTheme({
  spacing: (abs: number) => `${0.35 * abs}rem`,
  shape: { borderRadius: 12 },
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5',
      '50': '#eef2ff',
      '100': '#e0e7ff',
      '200': '#c7d2fe',
      '300': '#a5b4fc',
      '400': '#818cf8',
      '500': '#6366f1',
      '600': '#4f46e5',
      '700': '#4338ca',
      '800': '#3730a3',
      '900': '#312e81',
    },
    background: {
      default: '#f4f6fb',
      paper: '#ffffff',
    },
    ...defaultLightColor,
    customColor: {
      main: '#f97316',
      '100': '#ffedd5',
      gradient:
        'linear-gradient(90deg, rgba(79, 70, 229, 0.08) 0%, rgba(14, 165, 233, 0.1) 100%)',
    },
    customColor2: {
      main: '#334155',
    },
    customColorTable: {
      oddRow: '#6366f11A',
    },
  },
});

export const defaultDarkTheme = createTheme({
  spacing: (abs: number) => `${0.35 * abs}rem`,
  shape: { borderRadius: 12 },
  palette: {
    mode: 'dark',
    primary: {
      main: '#818cf8',
      '50': '#1e1b4b',
      '100': '#312e81',
      '200': '#3730a3',
      '300': '#4338ca',
      '400': '#4f46e5',
      '500': '#6366f1',
      '600': '#818cf8',
      '700': '#a5b4fc',
      '800': '#c7d2fe',
      '900': '#e0e7ff',
    },
    ...defaultDarkColor,
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    customColor: {
      main: '#fb923c',
      '100': '#7c2d12',
      gradient:
        'linear-gradient(90deg, rgba(129, 140, 248, 0.12) 0%, rgba(45, 212, 191, 0.08) 100%)',
    },
    customColor2: {
      main: '#cbd5e1',
    },
    customColorTable: {
      main: '#38bdf8',
      oddRow: '#334155',
    },
  },
});
