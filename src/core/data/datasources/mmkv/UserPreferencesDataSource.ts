import {
  DarkThemeConfig,
  ThemeBrand,
  normalizeBookmarkNote,
  type UserData,
} from '@core/domain';

import {createReplayObservable} from '../../util/replayObservable';

const STORAGE_KEY = 'nia.user_preferences.v1';

interface StoredUserPreferences {
  bookmarkedNewsResources: string[];
  bookmarkNotes: Record<string, string>;
  viewedNewsResources: string[];
  followedTopics: string[];
  themeBrand: ThemeBrand;
  darkThemeConfig: DarkThemeConfig;
  useDynamicColor: boolean;
  shouldHideOnboarding: boolean;
}

export interface KeyValueStorage {
  getString(key: string): string | undefined;
  set(key: string, value: string): void;
}

const defaultStoredPreferences = (): StoredUserPreferences => ({
  bookmarkedNewsResources: [],
  bookmarkNotes: {},
  viewedNewsResources: [],
  followedTopics: [],
  themeBrand: ThemeBrand.Default,
  darkThemeConfig: DarkThemeConfig.FollowSystem,
  useDynamicColor: false,
  shouldHideOnboarding: false,
});

function toUserData(stored: StoredUserPreferences): UserData {
  return {
    bookmarkedNewsResources: new Set(stored.bookmarkedNewsResources),
    bookmarkNotes: {...stored.bookmarkNotes},
    viewedNewsResources: new Set(stored.viewedNewsResources),
    followedTopics: new Set(stored.followedTopics),
    themeBrand: stored.themeBrand,
    darkThemeConfig: stored.darkThemeConfig,
    useDynamicColor: stored.useDynamicColor,
    shouldHideOnboarding: stored.shouldHideOnboarding,
  };
}

export class UserPreferencesDataSource {
  private readonly subject = createReplayObservable<UserData>(
    toUserData(defaultStoredPreferences()),
  );

  constructor(private readonly storage: KeyValueStorage) {
    const raw = storage.getString(STORAGE_KEY);
    if (raw !== undefined) {
      try {
        const parsed = JSON.parse(raw) as StoredUserPreferences;
        this.subject.emit(toUserData(parsed));
      } catch {
        this.persist(defaultStoredPreferences());
      }
    } else {
      this.persist(defaultStoredPreferences());
    }
  }

  readonly userData = this.subject.observable;

  getUserData(): UserData {
    return this.subject.getValue();
  }

  private persist(stored: StoredUserPreferences): void {
    this.storage.set(STORAGE_KEY, JSON.stringify(stored));
    this.subject.emit(toUserData(stored));
  }

  private update(mutator: (current: StoredUserPreferences) => StoredUserPreferences): void {
    const current = this.toStored(this.getUserData());
    this.persist(mutator(current));
  }

  private toStored(userData: UserData): StoredUserPreferences {
    return {
      bookmarkedNewsResources: [...userData.bookmarkedNewsResources],
      bookmarkNotes: {...userData.bookmarkNotes},
      viewedNewsResources: [...userData.viewedNewsResources],
      followedTopics: [...userData.followedTopics],
      themeBrand: userData.themeBrand,
      darkThemeConfig: userData.darkThemeConfig,
      useDynamicColor: userData.useDynamicColor,
      shouldHideOnboarding: userData.shouldHideOnboarding,
    };
  }

  async setFollowedTopicIds(followedTopicIds: ReadonlySet<string>): Promise<void> {
    this.update(current => ({
      ...current,
      followedTopics: [...followedTopicIds],
      shouldHideOnboarding:
        followedTopicIds.size > 0 ? true : current.shouldHideOnboarding,
    }));
  }

  async setTopicIdFollowed(followedTopicId: string, followed: boolean): Promise<void> {
    this.update(current => {
      const followedTopics = new Set(current.followedTopics);
      if (followed) {
        followedTopics.add(followedTopicId);
      } else {
        followedTopics.delete(followedTopicId);
      }
      return {
        ...current,
        followedTopics: [...followedTopics],
        shouldHideOnboarding:
          followedTopics.size > 0 ? true : current.shouldHideOnboarding,
      };
    });
  }

  async setNewsResourceBookmarked(
    newsResourceId: string,
    bookmarked: boolean,
  ): Promise<void> {
    this.update(current => {
      const bookmarkedNewsResources = new Set(current.bookmarkedNewsResources);
      const bookmarkNotes = {...current.bookmarkNotes};
      if (bookmarked) {
        bookmarkedNewsResources.add(newsResourceId);
      } else {
        bookmarkedNewsResources.delete(newsResourceId);
        delete bookmarkNotes[newsResourceId];
      }
      return {
        ...current,
        bookmarkedNewsResources: [...bookmarkedNewsResources],
        bookmarkNotes,
      };
    });
  }

  async setBookmarkNote(newsResourceId: string, note: string | null): Promise<void> {
    const normalized = normalizeBookmarkNote(note);
    this.update(current => {
      const bookmarkNotes = {...current.bookmarkNotes};
      if (normalized === null) {
        delete bookmarkNotes[newsResourceId];
      } else {
        bookmarkNotes[newsResourceId] = normalized;
      }
      return {...current, bookmarkNotes};
    });
  }

  async setNewsResourceViewed(newsResourceId: string, viewed: boolean): Promise<void> {
    await this.setNewsResourcesViewed([newsResourceId], viewed);
  }

  async setNewsResourcesViewed(
    newsResourceIds: readonly string[],
    viewed: boolean,
  ): Promise<void> {
    this.update(current => {
      const viewedNewsResources = new Set(current.viewedNewsResources);
      newsResourceIds.forEach(id => {
        if (viewed) {
          viewedNewsResources.add(id);
        } else {
          viewedNewsResources.delete(id);
        }
      });
      return {...current, viewedNewsResources: [...viewedNewsResources]};
    });
  }

  async setThemeBrand(themeBrand: ThemeBrand): Promise<void> {
    this.update(current => ({...current, themeBrand}));
  }

  async setDarkThemeConfig(darkThemeConfig: DarkThemeConfig): Promise<void> {
    this.update(current => ({...current, darkThemeConfig}));
  }

  async setDynamicColorPreference(useDynamicColor: boolean): Promise<void> {
    this.update(current => ({...current, useDynamicColor}));
  }

  async setShouldHideOnboarding(shouldHideOnboarding: boolean): Promise<void> {
    this.update(current => ({...current, shouldHideOnboarding}));
  }
}
