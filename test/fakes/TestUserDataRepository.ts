import {
  DarkThemeConfig,
  ThemeBrand,
  normalizeBookmarkNote,
  type UserData,
  type UserDataRepository,
} from '@core/domain';

import {createReplayObservable} from '../utils/observable';
import {emptyUserData} from './emptyUserData';

/**
 * In-memory UserDataRepository for unit tests (mirrors Android TestUserDataRepository).
 */
export class TestUserDataRepository implements UserDataRepository {
  private readonly subject = createReplayObservable<UserData>(emptyUserData);

  readonly userData = this.subject.observable;

  setUserData(userData: UserData): void {
    this.subject.emit(userData);
  }

  /** Test-only accessor (Android TestUserDataRepository.setUserData parity). */
  getUserData(): UserData {
    return this.subject.getValue();
  }

  private current(): UserData {
    return this.subject.getValue();
  }

  async setFollowedTopicIds(followedTopicIds: ReadonlySet<string>): Promise<void> {
    this.subject.emit({
      ...this.current(),
      followedTopics: new Set(followedTopicIds),
    });
  }

  async setTopicIdFollowed(
    followedTopicId: string,
    followed: boolean,
  ): Promise<void> {
    const current = this.current();
    const followedTopics = new Set(current.followedTopics);
    if (followed) {
      followedTopics.add(followedTopicId);
    } else {
      followedTopics.delete(followedTopicId);
    }
    this.subject.emit({...current, followedTopics});
  }

  async setNewsResourceBookmarked(
    newsResourceId: string,
    bookmarked: boolean,
  ): Promise<void> {
    const current = this.current();
    const bookmarkedNewsResources = new Set(current.bookmarkedNewsResources);
    let bookmarkNotes = {...current.bookmarkNotes};

    if (bookmarked) {
      bookmarkedNewsResources.add(newsResourceId);
    } else {
      bookmarkedNewsResources.delete(newsResourceId);
      const {[newsResourceId]: _removed, ...rest} = bookmarkNotes;
      bookmarkNotes = rest;
    }

    this.subject.emit({
      ...current,
      bookmarkedNewsResources,
      bookmarkNotes,
    });
  }

  async setBookmarkNote(
    newsResourceId: string,
    note: string | null,
  ): Promise<void> {
    const normalizedNote = normalizeBookmarkNote(note);
    const current = this.current();
    const bookmarkNotes = {...current.bookmarkNotes};

    if (normalizedNote === null) {
      delete bookmarkNotes[newsResourceId];
    } else {
      bookmarkNotes[newsResourceId] = normalizedNote;
    }

    this.subject.emit({...current, bookmarkNotes});
  }

  async setNewsResourceViewed(
    newsResourceId: string,
    viewed: boolean,
  ): Promise<void> {
    const current = this.current();
    const viewedNewsResources = new Set(current.viewedNewsResources);
    if (viewed) {
      viewedNewsResources.add(newsResourceId);
    } else {
      viewedNewsResources.delete(newsResourceId);
    }
    this.subject.emit({...current, viewedNewsResources});
  }

  async setThemeBrand(themeBrand: ThemeBrand): Promise<void> {
    this.subject.emit({...this.current(), themeBrand});
  }

  async setDarkThemeConfig(darkThemeConfig: DarkThemeConfig): Promise<void> {
    this.subject.emit({...this.current(), darkThemeConfig});
  }

  async setDynamicColorPreference(useDynamicColor: boolean): Promise<void> {
    this.subject.emit({...this.current(), useDynamicColor});
  }

  async setShouldHideOnboarding(shouldHideOnboarding: boolean): Promise<void> {
    this.subject.emit({...this.current(), shouldHideOnboarding});
  }
}
