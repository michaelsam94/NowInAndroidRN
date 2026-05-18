import type {RecentSearchQuery} from '../entities/RecentSearchQuery';
import type {Observable} from '../types/Observable';

export interface RecentSearchRepository {
  getRecentSearchQueries(
    limit: number,
  ): Observable<readonly RecentSearchQuery[]>;

  insertOrReplaceRecentSearch(searchQuery: string): Promise<void>;

  clearRecentSearches(): Promise<void>;
}
