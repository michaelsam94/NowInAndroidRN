import type {RecentSearchQuery} from '../entities/RecentSearchQuery';
import type {Observable} from '../types/Observable';

export interface GetRecentSearchQueriesUseCase {
  invoke(limit?: number): Observable<readonly RecentSearchQuery[]>;
}

export const DEFAULT_RECENT_SEARCH_LIMIT = 10;
