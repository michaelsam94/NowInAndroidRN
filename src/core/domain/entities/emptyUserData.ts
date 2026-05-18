import {DarkThemeConfig} from './DarkThemeConfig';
import {ThemeBrand} from './ThemeBrand';
import type {UserData} from './UserData';

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
