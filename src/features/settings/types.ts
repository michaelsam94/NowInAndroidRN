import type {DarkThemeConfig, ThemeBrand, UserDataRepository} from '@core/domain';

export interface SettingsUiState {
  readonly themeBrand: ThemeBrand;
  readonly darkThemeConfig: DarkThemeConfig;
  readonly useDynamicColor: boolean;
  readonly dynamicColorAvailable: boolean;
}

export interface SettingsViewModelDeps {
  readonly userDataRepository: UserDataRepository;
}

export interface SettingsViewModel {
  readonly uiState: SettingsUiState;
  onThemeBrandChange(brand: ThemeBrand): void;
  onDarkThemeConfigChange(config: DarkThemeConfig): void;
  onDynamicColorChange(enabled: boolean): void;
}
