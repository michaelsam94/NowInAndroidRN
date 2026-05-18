import * as Linking from 'expo-linking';
import {useEffect} from 'react';
import {AppState, type AppStateStatus} from 'react-native';

import {useAppStore} from '@store/index';

import type {AppInfrastructure} from '../createAppInfrastructure';
import {parseNewsDeepLink} from '../notifications/deepLink';

function applyDeepLinkUrl(
  url: string | null,
  setDeepLinkedNewsId: (id: string | null) => void,
): void {
  const newsId = parseNewsDeepLink(url);
  if (newsId !== null) {
    setDeepLinkedNewsId(newsId);
  }
}

/**
 * Subscribes to network status, deep links, and foreground sync after app bootstrap.
 */
export function useInfrastructureBootstrap(
  infrastructure: AppInfrastructure,
  isAppReady: boolean,
): void {
  const setIsOffline = useAppStore(state => state.setIsOffline);
  const setDeepLinkedNewsId = useAppStore(state => state.setDeepLinkedNewsId);

  useEffect(() => {
    return infrastructure.networkMonitor.subscribe(isOnline => {
      setIsOffline(!isOnline);
    });
  }, [infrastructure.networkMonitor, setIsOffline]);

  useEffect(() => {
    const handleUrl = (url: string | null) => {
      applyDeepLinkUrl(url, setDeepLinkedNewsId);
    };

    void Linking.getInitialURL().then(handleUrl);
    const subscription = Linking.addEventListener('url', event => {
      handleUrl(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, [setDeepLinkedNewsId]);

  useEffect(() => {
    if (!isAppReady) {
      return;
    }

    void infrastructure.syncManager.sync();

    const onAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        void infrastructure.syncManager.sync();
      }
    };

    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [infrastructure.syncManager, isAppReady]);
}
