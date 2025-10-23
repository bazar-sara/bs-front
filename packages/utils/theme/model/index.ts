import { ReactNode } from 'react';
import { themes } from '../theme';

export type ThemeTemplate = keyof typeof themes;
export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'fa' | 'dev';

export interface FsThemeContextProviderProps {
  children: ReactNode;
}

export interface FsThemeContextProps {
  themeTemplate: ThemeTemplate;
  setThemeTemplate: (name: ThemeTemplate) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontWeight: number;
  setFontWeight: (weight: number) => void;
}
