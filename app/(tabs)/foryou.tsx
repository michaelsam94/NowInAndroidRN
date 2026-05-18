import {useEffect, useMemo} from 'react';

import {defaultForYouDeps} from '@core/infrastructure/features/defaultFeatureDeps';
import {niaLog} from '@core/ui/diagnostics/logger';
import {ForYouScreen, useForYouViewModel} from '@features/foryou';

export default function ForYouRoute() {
  const deps = useMemo(() => defaultForYouDeps(), []);
  const viewModel = useForYouViewModel(deps);

  useEffect(() => {
    niaLog.info('ForYouRoute mounted', {
      isOnboarding: viewModel.uiState.isOnboarding,
      feedState: viewModel.uiState.feedState,
      feedCount: viewModel.uiState.feed.length,
    });
  }, [
    viewModel.uiState.feed.length,
    viewModel.uiState.feedState,
    viewModel.uiState.isOnboarding,
  ]);

  return <ForYouScreen viewModel={viewModel} />;
}
