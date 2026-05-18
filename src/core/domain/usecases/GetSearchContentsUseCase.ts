import type {UserSearchResult} from '../entities/UserSearchResult';
import type {Observable} from '../types/Observable';

export interface GetSearchContentsUseCase {
  invoke(searchQuery: string): Observable<UserSearchResult>;
}

/** Minimum trimmed query length before search runs (SearchViewModel parity). */
export const SEARCH_QUERY_MIN_LENGTH = 2;
