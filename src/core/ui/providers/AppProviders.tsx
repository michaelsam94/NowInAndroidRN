import {QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {onceObservable} from '@core/domain';
import {DEFAULT_FOLLOWED_TOPIC_IDS} from '@core/data';
import {useInfrastructureBootstrap} from '@core/infrastructure/bootstrap/useInfrastructureBootstrap';
import {appInfrastructure} from '@core/infrastructure/createAppInfrastructure';
import {appRepositories, bootstrapAppData} from '@core/infrastructure/data/createAppRepositories';
import {useAppStore} from '@store/index';
import {createAppQueryClient} from '@core/infrastructure/query/queryClient';
import {niaLog} from '@core/ui/diagnostics/logger';
import {NiaErrorBoundary} from '@core/ui/diagnostics/NiaErrorBoundary';
import {NiaThemeProvider} from '@core/ui/theme/ThemeContext';

const queryClient = createAppQueryClient();

interface AppReadyContextValue {
  readonly isAppReady: boolean;
  readonly markAppReady: () => void;
}

const AppReadyContext = React.createContext<AppReadyContextValue | null>(null);

function InfrastructureBootstrap({isAppReady}: {readonly isAppReady: boolean}) {
  useInfrastructureBootstrap(appInfrastructure, isAppReady);
  return null;
}

export function AppProviders({children}: {children: React.ReactNode}) {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    niaLog.info('Bootstrap started');

    bootstrapAppData()
      .then(async () => {
        niaLog.info('Bootstrap: seed/sync complete');
        const [topics, news] = await Promise.all([
          onceObservable(appRepositories.topics.getTopics()),
          onceObservable(appRepositories.news.getNewsResources()),
        ]);
        niaLog.info('Bootstrap: content loaded', {
          topicCount: topics.length,
          newsCount: news.length,
        });
        const userData = await onceObservable(appRepositories.userData.userData);
        if (userData.followedTopics.size === 0 && news.length > 0) {
          niaLog.info('Bootstrap: applying default followed topics');
          await appRepositories.userData.setFollowedTopicIds(
            new Set(DEFAULT_FOLLOWED_TOPIC_IDS),
          );
        }
        const hydratedUserData = await onceObservable(
          appRepositories.userData.userData,
        );
        niaLog.info('Bootstrap: user preferences loaded', {
          themeBrand: hydratedUserData.themeBrand,
          darkThemeConfig: hydratedUserData.darkThemeConfig,
          followedTopicCount: hydratedUserData.followedTopics.size,
        });
        const store = useAppStore.getState();
        store.setThemeBrand(hydratedUserData.themeBrand);
        store.setDarkThemeConfig(hydratedUserData.darkThemeConfig);
        store.setUseDynamicColor(hydratedUserData.useDynamicColor);
      })
      .catch(error => {
        niaLog.error('Bootstrap failed (app will still open)', error);
      })
      .finally(() => {
        if (!cancelled) {
          niaLog.info('Bootstrap finished, isAppReady=true');
          setIsAppReady(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const readyContext = React.useMemo(
    () => ({
      isAppReady,
      markAppReady: () => setIsAppReady(true),
    }),
    [isAppReady],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NiaErrorBoundary label="theme">
          <NiaThemeProvider>
            <AppReadyContext.Provider value={readyContext}>
              <InfrastructureBootstrap isAppReady={isAppReady} />
              {children}
            </AppReadyContext.Provider>
          </NiaThemeProvider>
        </NiaErrorBoundary>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export function useAppReady(): AppReadyContextValue {
  const context = React.useContext(AppReadyContext);
  if (context === null) {
    throw new Error('useAppReady must be used within AppProviders');
  }
  return context;
}
