import type {ExpoConfig} from 'expo/config';

const BASE_PACKAGE = 'com.nowinandroidrn';
const flavor = process.env.EXPO_PUBLIC_FLAVOR ?? 'demo';
const isDemo = flavor !== 'prod';

const androidPackage = isDemo ? `${BASE_PACKAGE}.demo` : BASE_PACKAGE;
const iosBundleId = isDemo ? `${BASE_PACKAGE}.demo` : BASE_PACKAGE;

const config: ExpoConfig = {
  name: isDemo ? 'Now in Android (Demo)' : 'Now in Android',
  slug: 'now-in-android-rn',
  version: '0.0.1',
  orientation: 'portrait',
  scheme: 'nowinandroid',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
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
  plugins: ['expo-router', 'expo-font', 'expo-notifications'],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    flavor,
    apiBase: process.env.EXPO_PUBLIC_API_BASE ?? '',
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
};

export default config;
