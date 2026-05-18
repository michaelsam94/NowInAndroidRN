import Constants from 'expo-constants';

import {NoOpAnalyticsHelper} from './NoOpAnalyticsHelper';
import {StubAnalyticsHelper} from './StubAnalyticsHelper';
import type {AnalyticsHelper} from './AnalyticsHelper';

export function createAnalyticsHelper(): AnalyticsHelper {
  const flavor =
    (Constants.expoConfig?.extra as {flavor?: string} | undefined)?.flavor ??
    'demo';

  return flavor === 'demo' ? new NoOpAnalyticsHelper() : new StubAnalyticsHelper();
}
