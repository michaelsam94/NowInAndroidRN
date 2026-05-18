import type {SyncManager} from './SyncManager';

interface SyncRepositories {
  readonly topics: {syncWith(synchronizer: unknown): Promise<boolean>};
  readonly news: {syncWith(synchronizer: unknown): Promise<boolean>};
  readonly searchContents: {populateFtsData(): Promise<void>};
}

interface SyncManagerDeps {
  readonly repositories: SyncRepositories;
  readonly synchronizer: unknown;
  readonly setIsSyncing: (isSyncing: boolean) => void;
}

export function createAppSyncManager(deps: SyncManagerDeps): SyncManager {
  return {
    async sync() {
      deps.setIsSyncing(true);
      try {
        await deps.repositories.topics.syncWith(deps.synchronizer);
        await deps.repositories.news.syncWith(deps.synchronizer);
        await deps.repositories.searchContents.populateFtsData();
      } finally {
        deps.setIsSyncing(false);
      }
    },
  };
}
