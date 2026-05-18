import {useWindowDimensions} from 'react-native';

import {layoutBreakpoints} from '@core/ui/theme/tokens';

export function useAdaptiveLayout() {
  const {width} = useWindowDimensions();

  return {
    width,
    showNavigationRail: width >= layoutBreakpoints.rail,
    showTwoPane: width >= layoutBreakpoints.twoPane,
  };
}
