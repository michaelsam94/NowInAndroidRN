import {
  createGetFollowableTopicsUseCase,
  createGetRecentSearchQueriesUseCase,
  createGetSearchContentsUseCase,
  createGetUserNewsResourcesUseCase,
} from '@core/domain';

import {appRepositories} from '../data/createAppRepositories';

export const appUseCases = {
  getFollowableTopics: createGetFollowableTopicsUseCase(
    appRepositories.topics,
    appRepositories.userData,
  ),
  getUserNewsResources: createGetUserNewsResourcesUseCase(
    appRepositories.userNewsResources,
  ),
  getSearchContents: createGetSearchContentsUseCase(
    appRepositories.searchContents,
    appRepositories.userData,
  ),
  getRecentSearchQueries: createGetRecentSearchQueriesUseCase(
    appRepositories.recentSearch,
  ),
};
