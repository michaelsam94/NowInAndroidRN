import {InMemoryLocalDataSource} from '../../datasources/local/InMemoryLocalDataSource';
import {UserPreferencesDataSource} from '../../datasources/mmkv/UserPreferencesDataSource';
import {OfflineFirstNewsRepository} from '../../repositories/OfflineFirstNewsRepository';
import {OfflineFirstTopicsRepository} from '../../repositories/OfflineFirstTopicsRepository';
import {seedDatabaseIfEmpty} from '../seedDatabase';
import {TestNiaNetworkDataSource, TestSynchronizer} from '../../../../../test/fakes';
import {InMemoryPreferencesStore} from '../../../../../test/mmkv/InMemoryPreferencesStore';
import {onceObservable} from '../../../../../test/utils/observable';

describe('seedDatabaseIfEmpty', () => {
  it('loads demo topics and news on first launch', async () => {
    const local = new InMemoryLocalDataSource();
    const network = new TestNiaNetworkDataSource();
    const synchronizer = new TestSynchronizer();
    const preferences = new UserPreferencesDataSource(new InMemoryPreferencesStore());
    const topicsRepository = new OfflineFirstTopicsRepository(local, network);
    const newsRepository = new OfflineFirstNewsRepository(
      preferences,
      local,
      network,
    );

    await seedDatabaseIfEmpty(
      local,
      topicsRepository,
      newsRepository,
      synchronizer,
    );

    const topics = await onceObservable(topicsRepository.getTopics());
    const news = await onceObservable(newsRepository.getNewsResources());

    expect(topics.length).toBeGreaterThan(0);
    expect(news.length).toBeGreaterThan(0);
    expect(await local.isEmpty()).toBe(false);
  });
});
