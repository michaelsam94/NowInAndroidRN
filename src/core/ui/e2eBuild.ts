import Constants from 'expo-constants';

type ExpoExtra = {e2e?: boolean; flavor?: string} | undefined;

const extra = Constants.expoConfig?.extra as ExpoExtra;

/**
 * Demo/Maestro builds unlock navigation while bootstrap runs (see AppProviders).
 * Detect via embedded app.config (prebuild), demo flavor, or bundle-time env.
 */
export const isE2EBuild =
  extra?.e2e === true ||
  extra?.flavor === 'demo' ||
  process.env.EXPO_PUBLIC_E2E === '1';
