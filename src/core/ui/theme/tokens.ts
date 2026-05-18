import {DarkThemeConfig, ThemeBrand} from '@core/domain';

/** Material Design 3 color roles (NIA-aligned). */
export const lightColors = {
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005D',
  surface: '#FFFBFE',
  onSurface: '#1C1B1F',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',
  tertiary: '#7D5260',
  error: '#B3261E',
  outline: '#79747E',
} as const;

export const darkColors = {
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  primaryContainer: '#4F378B',
  onPrimaryContainer: '#EADDFF',
  surface: '#1C1B1F',
  onSurface: '#E6E1E5',
  surfaceVariant: '#49454F',
  onSurfaceVariant: '#CAC4D0',
  tertiary: '#EFB8C8',
  error: '#F2B8B5',
  outline: '#938F99',
} as const;

export const androidBrandColors = {
  light: {
    ...lightColors,
    primary: '#3DDC84',
    onPrimary: '#003910',
    primaryContainer: '#74F4A8',
    onPrimaryContainer: '#002110',
  },
  dark: {
    ...darkColors,
    primary: '#74F4A8',
    onPrimary: '#003910',
    primaryContainer: '#00531A',
    onPrimaryContainer: '#74F4A8',
  },
} as const;

export type NiaColorScheme = {
  readonly [K in keyof typeof lightColors]: string;
};

export function resolveThemeColors(
  themeBrand: ThemeBrand,
  darkThemeConfig: DarkThemeConfig,
  systemScheme: 'light' | 'dark',
): NiaColorScheme {
  const isDark =
    darkThemeConfig === DarkThemeConfig.Dark ||
    (darkThemeConfig === DarkThemeConfig.FollowSystem &&
      systemScheme === 'dark');

  if (themeBrand === ThemeBrand.Android) {
    return isDark ? androidBrandColors.dark : androidBrandColors.light;
  }

  return isDark ? darkColors : lightColors;
}

export const layoutBreakpoints = {
  rail: 600,
  twoPane: 840,
} as const;
