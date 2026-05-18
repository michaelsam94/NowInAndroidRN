import type {RecentSearchQuery, RecentSearchRepository} from '@core/domain';

import {createReplayObservable} from '../utils/observable';

export class TestRecentSearchRepository implements RecentSearchRepository {
  private readonly subject = createReplayObservable<readonly RecentSearchQuery[]>(
    [],
  );

  getRecentSearchQueries(_limit: number) {
    return this.subject.observable;
  }

  async insertOrReplaceRecentSearch(_searchQuery: string): Promise<void> {
    return undefined;
  }

  async clearRecentSearches(): Promise<void> {
    return undefined;
  }

  setRecentSearches(queries: readonly RecentSearchQuery[]): void {
    this.subject.emit(queries);
  }
}
