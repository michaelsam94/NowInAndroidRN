import React, {createContext, useContext, useMemo} from 'react';
import {useColorScheme} from 'react-native';

import {DarkThemeConfig, ThemeBrand} from '@core/domain';
import {useThemeStore} from '@store/index';
import {resolveThemeColors, type NiaColorScheme} from './tokens';

export type {NiaColorScheme};

interface ThemeContextValue {
  readonly colors: NiaColorScheme;
  readonly isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function NiaThemeProvider({children}: {children: React.ReactNode}) {
  const systemScheme = useColorScheme() ?? 'light';
  const {themeBrand, darkThemeConfig} = useThemeStore();

  const value = useMemo(() => {
    const colors = resolveThemeColors(
      themeBrand,
      darkThemeConfig,
      systemScheme,
    );
    const isDark =
      darkThemeConfig === DarkThemeConfig.Dark ||
      (darkThemeConfig === DarkThemeConfig.FollowSystem &&
        systemScheme === 'dark');
    return {colors, isDark};
  }, [themeBrand, darkThemeConfig, systemScheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useNiaTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useNiaTheme must be used within NiaThemeProvider');
  }
  return context;
}

/** Stable theme wrapper for Jest (avoids Zustand persist re-render loops). */
export function TestNiaThemeProvider({children}: {children: React.ReactNode}) {
  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: resolveThemeColors(
        ThemeBrand.Default,
        DarkThemeConfig.Light,
        'light',
      ),
      isDark: false,
    }),
    [],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
