import type {ExpoConfig} from 'expo/config';

const config: ExpoConfig = {
  name: 'Now in Android',
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
    bundleIdentifier: 'com.nowinandroidrn',
  },
  android: {
    package: 'com.nowinandroidrn',
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
  plugins: ['expo-router', 'expo-font'],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    flavor: process.env.EXPO_PUBLIC_FLAVOR ?? 'demo',
    apiBase: process.env.EXPO_PUBLIC_API_BASE ?? '',
  },
};

export default config;
