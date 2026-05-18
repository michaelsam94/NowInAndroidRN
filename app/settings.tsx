import {SettingsScreen, useSettingsViewModel} from '@features/settings';
import {defaultSettingsDeps} from '@core/infrastructure/features/defaultFeatureDeps';

export default function SettingsRoute() {
  const viewModel = useSettingsViewModel(defaultSettingsDeps());
  return <SettingsScreen viewModel={viewModel} />;
}
