'use client';
import { createContext, useContext } from 'react';
import type { FsThemeContextProps } from '../model';

export const FsThemeContext = createContext<FsThemeContextProps | undefined>(
  undefined
);

export const useFsTheme = () => {
  const context = useContext(FsThemeContext);
  if (!context) {
    throw new Error('useFsTheme must be used within a FsThemeContextProvider');
  }
  return context;
};
