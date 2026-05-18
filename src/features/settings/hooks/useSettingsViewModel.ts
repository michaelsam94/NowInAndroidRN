import {useCallback, useMemo} from 'react';
import {Platform} from 'react-native';

import {DarkThemeConfig, emptyUserData, ThemeBrand} from '@core/domain';
import {useObservable} from '@core/ui/hooks/useObservable';
import {useThemeStore} from '@store/index';

import type {SettingsUiState, SettingsViewModel, SettingsViewModelDeps} from '../types';

export function useSettingsViewModel(deps: SettingsViewModelDeps): SettingsViewModel {
  const userData = useObservable(deps.userDataRepository.userData, emptyUserData);
  const {
    setThemeBrand: setStoreThemeBrand,
    setDarkThemeConfig: setStoreDarkThemeConfig,
    setUseDynamicColor: setStoreDynamicColor,
  } = useThemeStore();

  const uiState: SettingsUiState = useMemo(
    () => ({
      themeBrand: userData.themeBrand,
      darkThemeConfig: userData.darkThemeConfig,
      useDynamicColor: userData.useDynamicColor,
      dynamicColorAvailable: Platform.OS === 'android',
    }),
    [userData],
  );

  const onThemeBrandChange = useCallback(
    (brand: ThemeBrand) => {
      setStoreThemeBrand(brand);
      void deps.userDataRepository.setThemeBrand(brand);
    },
    [deps.userDataRepository, setStoreThemeBrand],
  );

  const onDarkThemeConfigChange = useCallback(
    (config: DarkThemeConfig) => {
      setStoreDarkThemeConfig(config);
      void deps.userDataRepository.setDarkThemeConfig(config);
    },
    [deps.userDataRepository, setStoreDarkThemeConfig],
  );

  const onDynamicColorChange = useCallback(
    (enabled: boolean) => {
      setStoreDynamicColor(enabled);
      void deps.userDataRepository.setDynamicColorPreference(enabled);
    },
    [deps.userDataRepository, setStoreDynamicColor],
  );

  return {
    uiState,
    onThemeBrandChange,
    onDarkThemeConfigChange,
    onDynamicColorChange,
  };
}
