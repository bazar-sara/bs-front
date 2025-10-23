'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, type Direction } from '@mui/material/styles';
import { themes } from './theme';
import { CacheProvider } from '@emotion/react';
import type {
  FsThemeContextProviderProps,
  Language,
  ThemeMode,
  ThemeTemplate,
} from './model';
import { FsThemeContext } from './hooks/useFsTheme';
import { cacheLtr, cacheRtl } from './directionCache';

const FsThemeContextProvider: React.FC<FsThemeContextProviderProps> = ({
  children,
}) => {
  const [themeTemplate, setThemeTemplateState] = useState<ThemeTemplate>(() => {
    return 'default';
  });
  const [mode, setModeState] = useState<ThemeMode>(() => {
    return 'light';
  });
  const [fontSize, setFontSizeState] = useState<number>(() => {
    return 16;
  });
  const [fontWeight, setFontWeightState] = useState<number>(() => {
    return 2;
  });
  const [language, setLanguageState] = useState<Language>('en');

  const setThemeTemplate = (name: ThemeTemplate) => {
    setThemeTemplateState(name);
  };

  const setMode = (mode: ThemeMode) => {
    setModeState(mode);
  };

  const setFontSize = (size: number) => {
    setFontSizeState(size);
  };

  const setFontWeight = (weight: number) => {
    setFontWeightState(weight);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const direction: Direction = language === 'fa' ? 'rtl' : 'ltr';

  const scaleTypography = (baseSize: number, weightLevel: number) => {
    const baseWeights: Record<number, number> = {
      1: 300,
      2: 400,
      3: 500,
      4: 700,
      5: 900,
    };
    const fontWeight = baseWeights[weightLevel] || 2;

    return {
      fontSize: baseSize,
      h1: { fontSize: baseSize * 2.5, fontWeight: fontWeight + 200 },
      h2: { fontSize: baseSize * 2.25, fontWeight: fontWeight + 150 },
      h3: { fontSize: baseSize * 2, fontWeight: fontWeight + 100 },
      h4: { fontSize: baseSize * 1.75, fontWeight: fontWeight },
      h5: { fontSize: baseSize * 1.5, fontWeight: fontWeight },
      h6: { fontSize: baseSize * 1.25, fontWeight: fontWeight },
      subtitle1: { fontSize: baseSize * 1.1, fontWeight: fontWeight },
      subtitle2: { fontSize: baseSize, fontWeight: fontWeight },
      body1: { fontSize: baseSize * 0.9, fontWeight: fontWeight },
      body2: { fontSize: baseSize * 0.8, fontWeight: fontWeight - 100 },
      caption: { fontSize: baseSize * 0.75, fontWeight: fontWeight - 100 },
      button: { fontSize: baseSize * 0.85, fontWeight: fontWeight + 100 },
      overline: { fontSize: baseSize * 0.7, fontWeight: fontWeight - 100 },
    };
  };

  const theme = useMemo(() => {
    const baseTheme = themes[themeTemplate][mode];
    return {
      ...baseTheme,
      typography: {
        ...baseTheme?.typography,
        ...scaleTypography(fontSize, fontWeight),
      },
      direction,
    };
  }, [themeTemplate, mode, direction, fontSize, fontWeight]);

  useEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  const cache = useMemo(
    () => (direction === 'rtl' ? cacheRtl : cacheLtr),
    [direction]
  );

  const contextValue = useMemo(
    () => ({
      themeTemplate,
      setThemeTemplate,
      mode,
      setMode,
      language,
      setLanguage,
      fontSize,
      setFontSize,
      fontWeight,
      setFontWeight,
    }),
    [themeTemplate, mode, language, fontSize, fontWeight]
  );

  return (
    <FsThemeContext.Provider value={contextValue}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </FsThemeContext.Provider>
  );
};

export default FsThemeContextProvider;
