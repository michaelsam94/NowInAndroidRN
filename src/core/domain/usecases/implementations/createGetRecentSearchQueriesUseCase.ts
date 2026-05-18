import type {RecentSearchRepository} from '../../repositories/RecentSearchRepository';
import type {GetRecentSearchQueriesUseCase} from '../GetRecentSearchQueriesUseCase';
import {DEFAULT_RECENT_SEARCH_LIMIT} from '../GetRecentSearchQueriesUseCase';

export function createGetRecentSearchQueriesUseCase(
  recentSearchRepository: RecentSearchRepository,
): GetRecentSearchQueriesUseCase {
  return {
    invoke: (limit = DEFAULT_RECENT_SEARCH_LIMIT) =>
      recentSearchRepository.getRecentSearchQueries(limit),
  };
}
