import type {Synchronizer} from '@core/domain';
import type {LocalDataSource} from '@core/data/datasources/local/LocalDataSource';
import {resetSyncVersions} from '@core/data/sync/resetSyncVersions';
import {niaLog} from '@core/ui/diagnostics/logger';

import type {SyncManager} from './SyncManager';

interface SyncRepositories {
  readonly topics: {syncWith(synchronizer: Synchronizer): Promise<boolean>};
  readonly news: {syncWith(synchronizer: Synchronizer): Promise<boolean>};
  readonly searchContents: {populateFtsData(): Promise<void>};
}

interface SyncManagerDeps {
  readonly repositories: SyncRepositories;
  readonly synchronizer: Synchronizer;
  readonly local: LocalDataSource;
  readonly setIsSyncing: (isSyncing: boolean) => void;
}

export function createAppSyncManager(deps: SyncManagerDeps): SyncManager {
  return {
    async sync() {
      deps.setIsSyncing(true);
      try {
        if (await deps.local.isEmpty()) {
          niaLog.warn('Local cache empty — forcing full sync');
          await resetSyncVersions(deps.synchronizer);
        }
        const topicsOk = await deps.repositories.topics.syncWith(deps.synchronizer);
        const newsOk = await deps.repositories.news.syncWith(deps.synchronizer);
        await deps.repositories.searchContents.populateFtsData();
        niaLog.info('Sync finished', {topicsOk, newsOk});
      } catch (error) {
        niaLog.error('Sync failed', error);
        throw error;
      } finally {
        deps.setIsSyncing(false);
      }
    },
  };
}
