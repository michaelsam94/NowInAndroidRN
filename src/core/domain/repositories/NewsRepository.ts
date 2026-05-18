import type {NewsResource} from '../entities/NewsResource';
import type {Observable} from '../types/Observable';
import type {NewsResourceQuery} from './NewsResourceQuery';
import type {Syncable} from './Syncable';

export interface NewsRepository extends Syncable {
  getNewsResources(query?: NewsResourceQuery): Observable<readonly NewsResource[]>;
}
