import type {DarkThemeConfig, ThemeBrand} from '@core/domain';

/** Root Zustand state shape (slices composed in Phase 4). */
export interface ThemeSlice {
  readonly themeBrand: ThemeBrand;
  readonly darkThemeConfig: DarkThemeConfig;
  readonly useDynamicColor: boolean;
}

export interface SyncSlice {
  readonly isSyncing: boolean;
}

export interface NavigationSlice {
  readonly unreadForYou: boolean;
  readonly unreadBookmarks: boolean;
  readonly unreadInterests: boolean;
}

export type RootStoreState = ThemeSlice & SyncSlice & NavigationSlice;
