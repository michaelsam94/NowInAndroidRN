import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {createNavigationSlice} from './navigationSlice';
import {zustandMmkvStorage} from './mmkvStorage';
import {createSyncSlice} from './syncSlice';
import {createThemeSlice} from './themeSlice';
import type {RootStoreState} from './types';

export const useAppStore = create<RootStoreState>()(
  persist(
    (...args) => ({
      ...createThemeSlice(...args),
      ...createSyncSlice(...args),
      ...createNavigationSlice(...args),
    }),
    {
      name: 'nia-app-store',
      storage: createJSONStorage(() => zustandMmkvStorage),
      partialize: state => ({
        themeBrand: state.themeBrand,
        darkThemeConfig: state.darkThemeConfig,
        useDynamicColor: state.useDynamicColor,
      }),
    },
  ),
);

export const useThemeStore = () =>
  useAppStore(state => ({
    themeBrand: state.themeBrand,
    darkThemeConfig: state.darkThemeConfig,
    useDynamicColor: state.useDynamicColor,
    setThemeBrand: state.setThemeBrand,
    setDarkThemeConfig: state.setDarkThemeConfig,
    setUseDynamicColor: state.setUseDynamicColor,
  }));
