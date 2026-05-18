import {createAnalyticsHelper} from './analytics/createAnalyticsHelper';
import type {AnalyticsHelper} from './analytics/AnalyticsHelper';
import {openNewsArticle} from './browser/openNewsArticle';
import {createNetInfoNetworkMonitor} from './network/createNetInfoNetworkMonitor';
import type {NetworkMonitor} from './network/NetworkMonitor';
import {NoOpNotifier} from './notifications/NoOpNotifier';
import type {Notifier} from './notifications/Notifier';
import {requestNotificationPermission} from './notifications/requestNotificationPermission';
import {shareNewsArticle} from './share/shareNewsArticle';
import {createAppSyncManager} from './sync/createAppSyncManager';
import type {SyncManager} from './sync/SyncManager';
import {appRepositories} from './data/createAppRepositories';
import {useAppStore} from '@store/index';

export interface AppInfrastructure {
  readonly analytics: AnalyticsHelper;
  readonly networkMonitor: NetworkMonitor;
  readonly syncManager: SyncManager;
  readonly notifier: Notifier;
  readonly openNewsArticle: typeof openNewsArticle;
  readonly shareNewsArticle: typeof shareNewsArticle;
  readonly requestNotificationPermission: typeof requestNotificationPermission;
}

export function createAppInfrastructure(): AppInfrastructure {
  return {
    analytics: createAnalyticsHelper(),
    networkMonitor: createNetInfoNetworkMonitor(),
    syncManager: createAppSyncManager({
      repositories: appRepositories,
      synchronizer: appRepositories.synchronizer,
      local: appRepositories.local,
      setIsSyncing: isSyncing => {
        useAppStore.getState().setIsSyncing(isSyncing);
      },
    }),
    notifier: new NoOpNotifier(),
    openNewsArticle,
    shareNewsArticle,
    requestNotificationPermission,
  };
}

export const appInfrastructure = createAppInfrastructure();
