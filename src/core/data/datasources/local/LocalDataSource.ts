import type {NewsResource, RecentSearchQuery, Topic} from '@core/domain';
import type {Observable} from '@core/domain';

export interface LocalDataSource {
  observeTopics(): Observable<readonly Topic[]>;

  observeTopic(id: string): Observable<Topic>;

  observeNewsResources(): Observable<readonly NewsResource[]>;

  observeRecentSearches(limit: number): Observable<readonly RecentSearchQuery[]>;

  upsertTopics(topics: readonly Topic[]): Promise<void>;

  deleteTopics(ids: readonly string[]): Promise<void>;

  upsertNewsResources(news: readonly NewsResource[]): Promise<void>;

  deleteNewsResources(ids: readonly string[]): Promise<void>;

  insertRecentSearch(query: string): Promise<void>;

  clearRecentSearches(): Promise<void>;

  searchNewsAndTopics(query: string): Promise<{
    topics: readonly Topic[];
    newsResources: readonly NewsResource[];
  }>;

  isEmpty(): Promise<boolean>;
}
