import {
  DarkThemeConfig,
  ThemeBrand,
  type UserData,
} from '@core/domain';

export const emptyUserData: UserData = {
  bookmarkedNewsResources: new Set(),
  bookmarkNotes: {},
  viewedNewsResources: new Set(),
  followedTopics: new Set(),
  themeBrand: ThemeBrand.Default,
  darkThemeConfig: DarkThemeConfig.FollowSystem,
  useDynamicColor: false,
  shouldHideOnboarding: false,
};
