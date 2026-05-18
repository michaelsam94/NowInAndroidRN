import type {UserNewsResource} from '../entities/UserNewsResource';
import type {Observable} from '../types/Observable';
import type {NewsResourceQuery} from './NewsResourceQuery';

export interface UserNewsResourceRepository {
  observeAll(query?: NewsResourceQuery): Observable<readonly UserNewsResource[]>;

  observeAllForFollowedTopics(): Observable<readonly UserNewsResource[]>;

  observeAllBookmarked(): Observable<readonly UserNewsResource[]>;
}
