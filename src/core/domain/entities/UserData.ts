import type {DarkThemeConfig} from './DarkThemeConfig';
import type {ThemeBrand} from './ThemeBrand';

export interface UserData {
  readonly bookmarkedNewsResources: ReadonlySet<string>;
  readonly bookmarkNotes: Readonly<Record<string, string>>;
  readonly viewedNewsResources: ReadonlySet<string>;
  readonly followedTopics: ReadonlySet<string>;
  readonly themeBrand: ThemeBrand;
  readonly darkThemeConfig: DarkThemeConfig;
  readonly useDynamicColor: boolean;
  readonly shouldHideOnboarding: boolean;
}
