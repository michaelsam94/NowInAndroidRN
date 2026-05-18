import {ForYouScreen, useForYouViewModel} from '@features/foryou';
import {defaultForYouDeps} from '@core/infrastructure/features/defaultFeatureDeps';

export default function ForYouRoute() {
  const viewModel = useForYouViewModel(defaultForYouDeps());
  return <ForYouScreen viewModel={viewModel} />;
}
