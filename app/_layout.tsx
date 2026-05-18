import '../global.css';

import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';

import {AppProviders, useAppReady} from '@core/ui/providers/AppProviders';
import {useNiaTheme} from '@core/ui/theme/ThemeContext';

SplashScreen.preventAutoHideAsync();

function RootNavigation() {
  const {isAppReady} = useAppReady();
  const {isDark} = useNiaTheme();

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen
          name="search"
          options={{title: 'Search', presentation: 'card'}}
        />
        <Stack.Screen name="topic/[id]" options={{title: 'Topic'}} />
        <Stack.Screen
          name="settings"
          options={{title: 'Settings', presentation: 'modal'}}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigation />
    </AppProviders>
  );
}
