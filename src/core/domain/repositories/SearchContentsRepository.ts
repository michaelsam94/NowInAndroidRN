import type {SearchResult} from '../entities/SearchResult';
import type {Observable} from '../types/Observable';

export interface SearchContentsRepository {
  populateFtsData(): Promise<void>;

  searchContents(searchQuery: string): Observable<SearchResult>;

  getSearchContentsCount(): Observable<number>;
}
