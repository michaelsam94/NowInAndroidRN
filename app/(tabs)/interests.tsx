import {InterestsScreen, useInterestsViewModel} from '@features/interests';
import {defaultInterestsDeps} from '@core/infrastructure/features/defaultFeatureDeps';

export default function InterestsRoute() {
  const viewModel = useInterestsViewModel(defaultInterestsDeps());
  return <InterestsScreen viewModel={viewModel} />;
}
