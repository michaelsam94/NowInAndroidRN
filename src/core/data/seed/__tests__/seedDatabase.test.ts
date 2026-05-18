import {InMemoryLocalDataSource} from '../../datasources/local/InMemoryLocalDataSource';
import {UserPreferencesDataSource} from '../../datasources/mmkv/UserPreferencesDataSource';
import {OfflineFirstNewsRepository} from '../../repositories/OfflineFirstNewsRepository';
import {OfflineFirstTopicsRepository} from '../../repositories/OfflineFirstTopicsRepository';
import {OfflineFirstUserDataRepository} from '../../repositories/OfflineFirstUserDataRepository';
import {resetSyncVersions} from '../../sync/resetSyncVersions';
import {DEFAULT_FOLLOWED_TOPIC_IDS, seedDatabaseIfEmpty} from '../seedDatabase';
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

  it('reloads when local is empty but sync versions are already advanced', async () => {
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

    await synchronizer.updateChangeListVersions(() => ({
      topicChangeListVersion: 999,
      newsResourceChangeListVersion: 999,
    }));

    await seedDatabaseIfEmpty(
      local,
      topicsRepository,
      newsRepository,
      synchronizer,
    );

    const news = await onceObservable(newsRepository.getNewsResources());
    expect(news.length).toBeGreaterThan(0);
  });

  it('follows default topics for an empty user profile', async () => {
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
    const userDataRepository = new OfflineFirstUserDataRepository(preferences);

    await seedDatabaseIfEmpty(
      local,
      topicsRepository,
      newsRepository,
      synchronizer,
      userDataRepository,
    );

    const userData = await onceObservable(userDataRepository.userData);
    expect(userData.followedTopics.size).toBe(DEFAULT_FOLLOWED_TOPIC_IDS.length);
    DEFAULT_FOLLOWED_TOPIC_IDS.forEach(id => {
      expect(userData.followedTopics.has(id)).toBe(true);
    });
  });
});

describe('resetSyncVersions', () => {
  it('resets changelist versions to force a full fetch', async () => {
    const synchronizer = new TestSynchronizer();
    await synchronizer.updateChangeListVersions(() => ({
      topicChangeListVersion: 50,
      newsResourceChangeListVersion: 50,
    }));

    await resetSyncVersions(synchronizer);

    await expect(synchronizer.getChangeListVersions()).resolves.toEqual({
      topicChangeListVersion: -1,
      newsResourceChangeListVersion: -1,
    });
  });
});
