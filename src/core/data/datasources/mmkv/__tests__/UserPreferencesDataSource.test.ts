import {DarkThemeConfig, ThemeBrand, normalizeBookmarkNote} from '@core/domain';

import {InMemoryPreferencesStore} from '../../../../../../test/mmkv/InMemoryPreferencesStore';
import {onceObservable} from '../../../../../../test/utils/observable';
import {UserPreferencesDataSource} from '../UserPreferencesDataSource';

describe('UserPreferencesDataSource', () => {
  it('persists bookmark notes and follow state', async () => {
    const storage = new InMemoryPreferencesStore();
    const dataSource = new UserPreferencesDataSource(storage);

    await dataSource.setTopicIdFollowed('topic-compose', true);
    await dataSource.setNewsResourceBookmarked('news-1', true);
    await dataSource.setBookmarkNote('news-1', '  My note  ');

    const userData = await onceObservable(dataSource.userData);

    expect(userData.followedTopics.has('topic-compose')).toBe(true);
    expect(userData.bookmarkedNewsResources.has('news-1')).toBe(true);
    expect(userData.bookmarkNotes['news-1']).toBe(normalizeBookmarkNote('My note'));

    const restored = new UserPreferencesDataSource(storage);
    const restoredData = await onceObservable(restored.userData);
    expect(restoredData.bookmarkNotes['news-1']).toBe('My note');
  });

  it('stores theme preferences', async () => {
    const storage = new InMemoryPreferencesStore();
    const dataSource = new UserPreferencesDataSource(storage);

    await dataSource.setThemeBrand(ThemeBrand.Android);
    await dataSource.setDarkThemeConfig(DarkThemeConfig.Dark);
    await dataSource.setDynamicColorPreference(true);

    const userData = await onceObservable(dataSource.userData);
    expect(userData.themeBrand).toBe(ThemeBrand.Android);
    expect(userData.darkThemeConfig).toBe(DarkThemeConfig.Dark);
    expect(userData.useDynamicColor).toBe(true);
  });
});
