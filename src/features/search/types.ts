import type {RecentSearchQuery, UserSearchResult} from '@core/domain';

export type SearchScreenState = 'Ready' | 'Loading' | 'Empty' | 'NotReady';

export interface SearchUiState {
  readonly screenState: SearchScreenState;
  readonly query: string;
  readonly result: UserSearchResult | null;
  readonly recentQueries: readonly RecentSearchQuery[];
}

export interface SearchViewModel {
  readonly uiState: SearchUiState;
  onQueryChange(query: string): void;
  onSearch(query: string): void;
  onRecentSearchClick(query: string): void;
  onClearRecentSearches(): void;
  onBookmarkResult(newsResourceId: string): void;
}
