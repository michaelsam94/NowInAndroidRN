import type {DarkThemeConfig} from '../entities/DarkThemeConfig';
import type {ThemeBrand} from '../entities/ThemeBrand';
import type {UserData} from '../entities/UserData';
import type {Observable} from '../types/Observable';

export interface UserDataRepository {
  readonly userData: Observable<UserData>;

  setFollowedTopicIds(followedTopicIds: ReadonlySet<string>): Promise<void>;

  setTopicIdFollowed(followedTopicId: string, followed: boolean): Promise<void>;

  setNewsResourceBookmarked(
    newsResourceId: string,
    bookmarked: boolean,
  ): Promise<void>;

  setBookmarkNote(newsResourceId: string, note: string | null): Promise<void>;

  setNewsResourceViewed(newsResourceId: string, viewed: boolean): Promise<void>;

  setThemeBrand(themeBrand: ThemeBrand): Promise<void>;

  setDarkThemeConfig(darkThemeConfig: DarkThemeConfig): Promise<void>;

  setDynamicColorPreference(useDynamicColor: boolean): Promise<void>;

  setShouldHideOnboarding(shouldHideOnboarding: boolean): Promise<void>;
}
