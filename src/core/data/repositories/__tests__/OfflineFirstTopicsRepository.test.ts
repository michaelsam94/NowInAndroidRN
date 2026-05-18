import {OfflineFirstTopicsRepository} from '../OfflineFirstTopicsRepository';
import {InMemoryLocalDataSource} from '../../datasources/local/InMemoryLocalDataSource';
import {
  CollectionType,
  TestNiaNetworkDataSource,
  TestSynchronizer,
} from '../../../../../test/fakes';
import {onceObservable} from '../../../../../test/utils/observable';

describe('OfflineFirstTopicsRepository', () => {
  it('streams topics from local storage after sync', async () => {
    const local = new InMemoryLocalDataSource();
    const network = new TestNiaNetworkDataSource();
    const synchronizer = new TestSynchronizer();
    const repository = new OfflineFirstTopicsRepository(local, network);

    await repository.syncWith(synchronizer);

    const topics = await onceObservable(repository.getTopics());
    const networkTopics = await network.getTopics();

    expect(topics.map(topic => topic.id)).toEqual(
      networkTopics.map(topic => topic.id),
    );
    expect((await synchronizer.getChangeListVersions()).topicChangeListVersion).toBe(
      network.latestChangeListVersion(CollectionType.Topics),
    );
  });

  it('incremental sync only fetches items after the stored version', async () => {
    const local = new InMemoryLocalDataSource();
    const network = new TestNiaNetworkDataSource();
    const synchronizer = new TestSynchronizer();
    const repository = new OfflineFirstTopicsRepository(local, network);

    await synchronizer.updateChangeListVersions(current => ({
      ...current,
      topicChangeListVersion: 10,
    }));

    await repository.syncWith(synchronizer);

    const topics = await onceObservable(repository.getTopics());
    const expectedIds = (await network.getTopics())
      .slice(11)
      .map(topic => topic.id);

    expect(topics.map(topic => topic.id)).toEqual(expectedIds);
  });
});
