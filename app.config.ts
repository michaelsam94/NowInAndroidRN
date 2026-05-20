import type {ExpoConfig} from 'expo/config';

const BASE_PACKAGE = 'com.nowinandroidrn';
const flavor = process.env.EXPO_PUBLIC_FLAVOR ?? 'demo';
const isDemo = flavor !== 'prod';

const androidPackage = isDemo ? `${BASE_PACKAGE}.demo` : BASE_PACKAGE;
const iosBundleId = isDemo ? `${BASE_PACKAGE}.demo` : BASE_PACKAGE;

const config: ExpoConfig = {
  name: isDemo ? 'Now in Android (Demo)' : 'Now in Android',
  slug: 'now-in-android-rn',
  owner: process.env.EXPO_OWNER ?? 'michaelsam00',
  version: '0.0.1',
  orientation: 'portrait',
  scheme: 'nowinandroid',
  userInterfaceStyle: 'automatic',
  // Fabric can be flaky on GitHub's x86_64 emulators; disable for Maestro CI bundles.
  newArchEnabled: process.env.EXPO_PUBLIC_E2E !== '1',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#1C1B1F',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: iosBundleId,
  },
  android: {
    package: androidPackage,
    edgeToEdgeEnabled: true,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#1C1B1F',
    },
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: 'www.nowinandroid.apps.samples.google.com',
            pathPrefix: '/foryou',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  plugins: ['expo-router', 'expo-asset', 'expo-font', 'expo-notifications'],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    flavor,
    // Demo + Maestro CI: show navigation while bootstrap runs (see AppProviders).
    e2e: isDemo || process.env.EXPO_PUBLIC_E2E === '1',
    apiBase: process.env.EXPO_PUBLIC_API_BASE ?? '',
    eas: {
      projectId:
        process.env.EAS_PROJECT_ID ?? '07f4bda3-bb1e-41f8-af22-8c0ce4db438a',
    },
  },
};

export default config;
