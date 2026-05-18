import type {
  DarkThemeConfig,
  ThemeBrand,
  UserDataRepository,
} from '@core/domain';

import type {UserPreferencesDataSource} from '../datasources/mmkv/UserPreferencesDataSource';

export class OfflineFirstUserDataRepository implements UserDataRepository {
  constructor(private readonly preferences: UserPreferencesDataSource) {}

  get userData() {
    return this.preferences.userData;
  }

  setFollowedTopicIds(followedTopicIds: ReadonlySet<string>): Promise<void> {
    return this.preferences.setFollowedTopicIds(followedTopicIds);
  }

  setTopicIdFollowed(followedTopicId: string, followed: boolean): Promise<void> {
    return this.preferences.setTopicIdFollowed(followedTopicId, followed);
  }

  setNewsResourceBookmarked(
    newsResourceId: string,
    bookmarked: boolean,
  ): Promise<void> {
    return this.preferences.setNewsResourceBookmarked(newsResourceId, bookmarked);
  }

  setBookmarkNote(newsResourceId: string, note: string | null): Promise<void> {
    return this.preferences.setBookmarkNote(newsResourceId, note);
  }

  setNewsResourceViewed(newsResourceId: string, viewed: boolean): Promise<void> {
    return this.preferences.setNewsResourceViewed(newsResourceId, viewed);
  }

  setThemeBrand(themeBrand: ThemeBrand): Promise<void> {
    return this.preferences.setThemeBrand(themeBrand);
  }

  setDarkThemeConfig(darkThemeConfig: DarkThemeConfig): Promise<void> {
    return this.preferences.setDarkThemeConfig(darkThemeConfig);
  }

  setDynamicColorPreference(useDynamicColor: boolean): Promise<void> {
    return this.preferences.setDynamicColorPreference(useDynamicColor);
  }

  setShouldHideOnboarding(shouldHideOnboarding: boolean): Promise<void> {
    return this.preferences.setShouldHideOnboarding(shouldHideOnboarding);
  }
}
