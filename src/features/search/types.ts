import type {
  GetRecentSearchQueriesUseCase,
  GetSearchContentsUseCase,
  RecentSearchQuery,
  RecentSearchRepository,
  SearchContentsRepository,
  UserDataRepository,
  UserSearchResult,
} from '@core/domain';

export type SearchScreenState = 'Ready' | 'Loading' | 'Empty' | 'NotReady';

export interface SearchUiState {
  readonly screenState: SearchScreenState;
  readonly query: string;
  readonly result: UserSearchResult | null;
  readonly recentQueries: readonly RecentSearchQuery[];
}

export interface SearchViewModelDeps {
  readonly getSearchContents: GetSearchContentsUseCase;
  readonly getRecentSearchQueries: GetRecentSearchQueriesUseCase;
  readonly searchContentsRepository: SearchContentsRepository;
  readonly recentSearchRepository: RecentSearchRepository;
  readonly userDataRepository: UserDataRepository;
}

export interface SearchViewModel {
  readonly uiState: SearchUiState;
  onQueryChange(query: string): void;
  onSearch(query: string): void;
  onRecentSearchClick(query: string): void;
  onClearRecentSearches(): void;
  onBookmarkResult(newsResourceId: string): void;
}
