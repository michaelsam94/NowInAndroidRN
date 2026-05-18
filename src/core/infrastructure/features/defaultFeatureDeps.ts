import type {BookmarksViewModelDeps} from '@features/bookmarks';
import type {ForYouViewModelDeps} from '@features/foryou';
import type {InterestsViewModelDeps} from '@features/interests';
import type {SearchViewModelDeps} from '@features/search';
import type {SettingsViewModelDeps} from '@features/settings';
import type {TopicViewModelDeps} from '@features/topic';

import {appInfrastructure} from '../createAppInfrastructure';
import {appRepositories} from '../data/createAppRepositories';
import {appUseCases} from '../domain/createAppUseCases';

export const defaultForYouDeps = (): ForYouViewModelDeps => ({
  getUserNewsResources: appUseCases.getUserNewsResources,
  getFollowableTopics: appUseCases.getFollowableTopics,
  userDataRepository: appRepositories.userData,
  openNewsArticle: appInfrastructure.openNewsArticle,
  requestNotificationPermission: appInfrastructure.requestNotificationPermission,
  logAnalyticsEvent: event => {
    appInfrastructure.analytics.logEvent(event);
  },
});

export const defaultBookmarksDeps = (): BookmarksViewModelDeps => ({
  getUserNewsResources: appUseCases.getUserNewsResources,
  userDataRepository: appRepositories.userData,
  openNewsArticle: appInfrastructure.openNewsArticle,
  shareNewsArticle: appInfrastructure.shareNewsArticle,
});

export const defaultInterestsDeps = (): InterestsViewModelDeps => ({
  getFollowableTopics: appUseCases.getFollowableTopics,
  userDataRepository: appRepositories.userData,
});

export const defaultSearchDeps = (): SearchViewModelDeps => ({
  getSearchContents: appUseCases.getSearchContents,
  getRecentSearchQueries: appUseCases.getRecentSearchQueries,
  searchContentsRepository: appRepositories.searchContents,
  recentSearchRepository: appRepositories.recentSearch,
  userDataRepository: appRepositories.userData,
});

export const defaultSettingsDeps = (): SettingsViewModelDeps => ({
  userDataRepository: appRepositories.userData,
});

export const defaultTopicDeps = (): Omit<TopicViewModelDeps, 'topicsRepository'> & {
  topicsRepository: TopicViewModelDeps['topicsRepository'];
} => ({
  getUserNewsResources: appUseCases.getUserNewsResources,
  getFollowableTopics: appUseCases.getFollowableTopics,
  topicsRepository: appRepositories.topics,
  userDataRepository: appRepositories.userData,
});
