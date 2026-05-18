import type {RecentSearchRepository} from '@core/domain';

import type {LocalDataSource} from '../datasources/local/LocalDataSource';

export class DefaultRecentSearchRepository implements RecentSearchRepository {
  constructor(private readonly local: LocalDataSource) {}

  getRecentSearchQueries(limit: number) {
    return this.local.observeRecentSearches(limit);
  }

  insertOrReplaceRecentSearch(searchQuery: string): Promise<void> {
    return this.local.insertRecentSearch(searchQuery);
  }

  clearRecentSearches(): Promise<void> {
    return this.local.clearRecentSearches();
  }
}
