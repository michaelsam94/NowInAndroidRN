import {emptyNewsResourceQuery} from '@core/domain';

import {InMemoryLocalDataSource} from '../../datasources/local/InMemoryLocalDataSource';
import {CompositeUserNewsResourceRepository} from '../CompositeUserNewsResourceRepository';
import {OfflineFirstNewsRepository} from '../OfflineFirstNewsRepository';
import {
  TestNiaNetworkDataSource,
  TestSynchronizer,
  TestUserDataRepository,
  emptyUserData,
} from '../../../../../test/fakes';
import {UserPreferencesDataSource} from '../../datasources/mmkv/UserPreferencesDataSource';
import {InMemoryPreferencesStore} from '../../../../../test/mmkv/InMemoryPreferencesStore';
import {onceObservable} from '../../../../../test/utils/observable';

describe('CompositeUserNewsResourceRepository', () => {
  it('joins news resources with bookmark and viewed state', async () => {
    const local = new InMemoryLocalDataSource();
    const network = new TestNiaNetworkDataSource();
    const synchronizer = new TestSynchronizer();
    const preferences = new UserPreferencesDataSource(new InMemoryPreferencesStore());
    const newsRepository = new OfflineFirstNewsRepository(
      preferences,
      local,
      network,
    );

    await newsRepository.syncWith(synchronizer);

    const allNews = await onceObservable(
      newsRepository.getNewsResources(emptyNewsResourceQuery),
    );
    const target = allNews[0];
    expect(target).toBeDefined();

    const userDataRepository = new TestUserDataRepository();
    userDataRepository.setUserData({
      ...emptyUserData,
      bookmarkedNewsResources: new Set([target!.id]),
      viewedNewsResources: new Set([target!.id]),
      bookmarkNotes: {[target!.id]: 'Saved for later'},
    });

    const repository = new CompositeUserNewsResourceRepository(
      newsRepository,
      userDataRepository,
    );

    const result = await onceObservable(repository.observeAll());
    const joined = result.find(item => item.id === target!.id);

    expect(joined?.isSaved).toBe(true);
    expect(joined?.hasBeenViewed).toBe(true);
    expect(joined?.note).toBe('Saved for later');
  });
});
