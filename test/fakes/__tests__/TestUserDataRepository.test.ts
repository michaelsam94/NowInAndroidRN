import {TestUserDataRepository} from '../TestUserDataRepository';
import {emptyUserData} from '../emptyUserData';

describe('TestUserDataRepository', () => {
  it('emits updated bookmark state', async () => {
    const repository = new TestUserDataRepository();
    repository.setUserData(emptyUserData);

    await repository.setNewsResourceBookmarked('news-1', true);

    expect(repository.getUserData().bookmarkedNewsResources.has('news-1')).toBe(
      true,
    );
  });

  it('removes bookmark note when unbookmarking', async () => {
    const repository = new TestUserDataRepository();
    repository.setUserData({
      ...emptyUserData,
      bookmarkedNewsResources: new Set(['news-1']),
      bookmarkNotes: {'news-1': 'My note'},
    });

    await repository.setNewsResourceBookmarked('news-1', false);

    const userData = repository.getUserData();
    expect(userData.bookmarkedNewsResources.has('news-1')).toBe(false);
    expect(userData.bookmarkNotes['news-1']).toBeUndefined();
  });

  it('normalizes bookmark notes on set', async () => {
    const repository = new TestUserDataRepository();
    repository.setUserData(emptyUserData);

    await repository.setBookmarkNote('news-1', '  trimmed  ');

    expect(repository.getUserData().bookmarkNotes['news-1']).toBe('trimmed');
  });
});
