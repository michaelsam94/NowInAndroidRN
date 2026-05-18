import {useMemo} from 'react';

import {defaultForYouDeps} from '@core/infrastructure/features/defaultFeatureDeps';
import {ForYouScreen, useForYouViewModel} from '@features/foryou';

export default function ForYouRoute() {
  const deps = useMemo(() => defaultForYouDeps(), []);
  const viewModel = useForYouViewModel(deps);
  return <ForYouScreen viewModel={viewModel} />;
}
