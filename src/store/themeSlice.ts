import {DarkThemeConfig, ThemeBrand} from '@core/domain';
import type {StateCreator} from 'zustand';

import type {RootStoreState} from './types';

export interface ThemeSliceActions {
  setThemeBrand: (brand: ThemeBrand) => void;
  setDarkThemeConfig: (config: DarkThemeConfig) => void;
  setUseDynamicColor: (enabled: boolean) => void;
}

export const createThemeSlice: StateCreator<
  RootStoreState,
  [],
  [],
  Pick<RootStoreState, 'themeBrand' | 'darkThemeConfig' | 'useDynamicColor'> &
    ThemeSliceActions
> = set => ({
  themeBrand: ThemeBrand.Default,
  darkThemeConfig: DarkThemeConfig.FollowSystem,
  useDynamicColor: false,
  setThemeBrand: themeBrand => set({themeBrand}),
  setDarkThemeConfig: darkThemeConfig => set({darkThemeConfig}),
  setUseDynamicColor: useDynamicColor => set({useDynamicColor}),
});
