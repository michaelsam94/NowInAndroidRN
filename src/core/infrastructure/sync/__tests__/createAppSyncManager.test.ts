import {InMemoryLocalDataSource} from '@core/data';
import {TestSynchronizer} from '../../../../../test/fakes';

import {createAppSyncManager} from '../createAppSyncManager';

describe('createAppSyncManager', () => {
  it('sets syncing flag while repositories sync', async () => {
    const syncingFlags: boolean[] = [];
    const local = new InMemoryLocalDataSource();
    const repositories = {
      topics: {
        syncWith: jest.fn().mockImplementation(async () => {
          syncingFlags.push(true);
          return true;
        }),
      },
      news: {
        syncWith: jest.fn().mockResolvedValue(true),
      },
      searchContents: {
        populateFtsData: jest.fn().mockResolvedValue(undefined),
      },
    };

    const manager = createAppSyncManager({
      repositories,
      synchronizer: new TestSynchronizer(),
      local,
      setIsSyncing: isSyncing => {
        syncingFlags.push(isSyncing);
      },
    });

    await manager.sync();

    expect(repositories.topics.syncWith).toHaveBeenCalled();
    expect(repositories.news.syncWith).toHaveBeenCalled();
    expect(repositories.searchContents.populateFtsData).toHaveBeenCalled();
    expect(syncingFlags).toEqual([true, true, false]);
  });
});
