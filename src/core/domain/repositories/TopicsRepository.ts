import type {Topic} from '../entities/Topic';
import type {Observable} from '../types/Observable';
import type {Syncable} from './Syncable';

export interface TopicsRepository extends Syncable {
  getTopics(): Observable<readonly Topic[]>;

  getTopic(id: string): Observable<Topic>;
}
