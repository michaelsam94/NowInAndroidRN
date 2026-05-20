import {act, renderHook, waitFor} from '@testing-library/react-native';
import {Platform} from 'react-native';

import {DarkThemeConfig, ThemeBrand} from '@core/domain';
import {useAppStore} from '@store/index';

import {TestUserDataRepository, emptyUserData} from '../../../../../test/fakes';
import {useSettingsViewModel} from '../useSettingsViewModel';

describe('useSettingsViewModel', () => {
  beforeEach(() => {
    useAppStore.setState({
      themeBrand: ThemeBrand.Default,
      darkThemeConfig: DarkThemeConfig.FollowSystem,
      useDynamicColor: false,
    });
  });

  it('reflects theme preferences from user data', async () => {
    const userDataRepository = new TestUserDataRepository();
    userDataRepository.setUserData({
      ...emptyUserData,
      themeBrand: ThemeBrand.Android,
      darkThemeConfig: DarkThemeConfig.Dark,
      useDynamicColor: true,
    });

    const {result} = renderHook(() =>
      useSettingsViewModel({userDataRepository}),
    );

    await waitFor(() => {
      expect(result.current.uiState.themeBrand).toBe(ThemeBrand.Android);
      expect(result.current.uiState.darkThemeConfig).toBe(DarkThemeConfig.Dark);
      expect(result.current.uiState.useDynamicColor).toBe(true);
    });
  });

  it('updates dark theme in repository and zustand store', async () => {
    const userDataRepository = new TestUserDataRepository();
    const {result} = renderHook(() =>
      useSettingsViewModel({userDataRepository}),
    );

    await waitFor(() => {
      expect(result.current.uiState.darkThemeConfig).toBe(
        DarkThemeConfig.FollowSystem,
      );
    });

    act(() => {
      result.current.onDarkThemeConfigChange(DarkThemeConfig.Light);
    });

    await waitFor(() => {
      expect(result.current.uiState.darkThemeConfig).toBe(DarkThemeConfig.Light);
      expect(userDataRepository.getUserData().darkThemeConfig).toBe(
        DarkThemeConfig.Light,
      );
      expect(useAppStore.getState().darkThemeConfig).toBe(DarkThemeConfig.Light);
    });
  });

  it('exposes dynamic color availability on Android only', async () => {
    const userDataRepository = new TestUserDataRepository();
    const platform = Platform as {OS: string};

    platform.OS = 'android';
    const {result: androidResult} = renderHook(() =>
      useSettingsViewModel({userDataRepository}),
    );
    await waitFor(() => {
      expect(androidResult.current.uiState.dynamicColorAvailable).toBe(true);
    });

    platform.OS = 'ios';
    const {result: iosResult} = renderHook(() =>
      useSettingsViewModel({userDataRepository}),
    );
    await waitFor(() => {
      expect(iosResult.current.uiState.dynamicColorAvailable).toBe(false);
    });
  });
});
