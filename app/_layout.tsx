import '../global.css';

import {Stack, usePathname, useSegments} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import {installGlobalErrorLogging, niaLog} from '@core/ui/diagnostics/logger';
import {NiaErrorBoundary} from '@core/ui/diagnostics/NiaErrorBoundary';
import {AppProviders, useAppReady} from '@core/ui/providers/AppProviders';
import {useNiaTheme} from '@core/ui/theme/ThemeContext';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

installGlobalErrorLogging();
SplashScreen.preventAutoHideAsync().catch(error => {
  niaLog.warn('SplashScreen.preventAutoHideAsync failed', error);
});

const SPLASH_BACKGROUND = '#1C1B1F';

function BootstrapPlaceholder({message}: {readonly message: string}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: SPLASH_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      accessibilityRole="progressbar">
      <Text style={{color: '#E6E1E5', fontSize: 16}}>{message}</Text>
    </View>
  );
}

function RootNavigation() {
  const {isAppReady} = useAppReady();
  const {isDark} = useNiaTheme();
  const pathname = usePathname();
  const segments = useSegments();

  useEffect(() => {
    niaLog.info('Navigation state', {pathname, segments, isAppReady});
  }, [pathname, segments, isAppReady]);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync().catch(error => {
        niaLog.warn('SplashScreen.hideAsync failed', error);
      });
    }
  }, [isAppReady]);

  return (
    <View
      testID={isAppReady ? 'nia:app-ready' : 'nia:bootstrap-placeholder'}
      style={{flex: 1}}
      collapsable={false}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        initialRouteName="(tabs)"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen
          name="search"
          options={{title: 'Search', presentation: 'card', headerShown: true}}
        />
        <Stack.Screen
          name="topic/[id]"
          options={{title: 'Topic', headerShown: true}}
        />
        <Stack.Screen
          name="settings"
          options={{title: 'Settings', presentation: 'modal', headerShown: true}}
        />
        <Stack.Screen
          name="licenses"
          options={{title: 'Licenses', headerShown: true}}
        />
      </Stack>
      {!isAppReady ? (
        <View style={styles.bootstrapOverlay} pointerEvents="auto">
          <BootstrapPlaceholder message="Loading…" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bootstrapOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});

export default function RootLayout() {
  useEffect(() => {
    niaLog.info('RootLayout mounted');
  }, []);

  return (
    <NiaErrorBoundary label="root">
      <AppProviders>
        <NiaErrorBoundary label="navigation">
          <RootNavigation />
        </NiaErrorBoundary>
      </AppProviders>
    </NiaErrorBoundary>
  );
}
