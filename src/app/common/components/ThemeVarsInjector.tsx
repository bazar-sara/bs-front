'use client';

import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';

/**
 * Injects theme palette into CSS custom properties so globals.css and other
 * non-MUI styles can use theme colors (e.g. animations, focus rings).
 * Must be rendered inside MUI ThemeProvider.
 */
export function ThemeVarsInjector() {
  const theme = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    const p = theme.palette;
    const mode = theme.palette.mode;

    root.style.setProperty('--fs-primary-main', p.primary.main);
    root.style.setProperty('--fs-primary-light', p.primary.light ?? p.primary['300'] ?? p.primary.main);
    root.style.setProperty('--fs-primary-dark', p.primary.dark ?? p.primary['700'] ?? p.primary.main);
    root.style.setProperty('--fs-secondary-main', p.secondary.main);
    root.style.setProperty('--fs-secondary-light', p.secondary.light ?? p.secondary['300'] ?? p.secondary.main);
    root.style.setProperty('--fs-secondary-dark', p.secondary.dark ?? p.secondary['700'] ?? p.secondary.main);
    root.style.setProperty('--fs-error-main', p.error.main);
    root.style.setProperty('--fs-warning-main', p.warning.main);
    root.style.setProperty('--fs-info-main', p.info.main);
    root.style.setProperty('--fs-success-main', p.success.main);
    root.style.setProperty('--fs-background-default', p.background?.default ?? (mode === 'dark' ? '#121212' : '#fff'));
    root.style.setProperty('--fs-background-paper', p.background?.paper ?? (mode === 'dark' ? '#1e1e1e' : '#fff'));
    root.style.setProperty('--fs-common-white', p.common?.white ?? '#fff');
    root.style.setProperty('--fs-common-black', p.common?.black ?? '#000');
    if (p.customColor?.main) {
      root.style.setProperty('--fs-custom-main', p.customColor.main);
    }
  }, [theme]);

  return null;
}
