import type {UserNewsResource} from '../entities/UserNewsResource';
import type {Observable} from '../types/Observable';
import type {NewsResourceQuery} from '../repositories/NewsResourceQuery';

/**
 * Combines news + user data into UserNewsResource stream (For You feed parity).
 */
export interface GetUserNewsResourcesUseCase {
  invoke(query?: NewsResourceQuery): Observable<readonly UserNewsResource[]>;

  observeForFollowedTopics(): Observable<readonly UserNewsResource[]>;

  observeBookmarked(): Observable<readonly UserNewsResource[]>;
}
