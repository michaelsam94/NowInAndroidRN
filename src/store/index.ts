import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {createDeepLinkSlice} from './deepLinkSlice';
import {createNavigationSlice} from './navigationSlice';
import {createNetworkSlice} from './networkSlice';
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
      ...createNetworkSlice(...args),
      ...createDeepLinkSlice(...args),
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

export const useThemeStore = () => ({
  themeBrand: useAppStore(state => state.themeBrand),
  darkThemeConfig: useAppStore(state => state.darkThemeConfig),
  useDynamicColor: useAppStore(state => state.useDynamicColor),
  setThemeBrand: useAppStore(state => state.setThemeBrand),
  setDarkThemeConfig: useAppStore(state => state.setDarkThemeConfig),
  setUseDynamicColor: useAppStore(state => state.setUseDynamicColor),
});
