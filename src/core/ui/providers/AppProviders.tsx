import {QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {bootstrapAppData} from '@core/infrastructure/data/createAppRepositories';
import {createAppQueryClient} from '@core/infrastructure/query/queryClient';
import {NiaThemeProvider} from '@core/ui/theme/ThemeContext';

const queryClient = createAppQueryClient();

interface AppReadyContextValue {
  readonly isAppReady: boolean;
  readonly markAppReady: () => void;
}

const AppReadyContext = React.createContext<AppReadyContextValue | null>(null);

export function AppProviders({children}: {children: React.ReactNode}) {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    bootstrapAppData()
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) {
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
        <NiaThemeProvider>
          <AppReadyContext.Provider value={readyContext}>
            {children}
          </AppReadyContext.Provider>
        </NiaThemeProvider>
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
