import type {FollowableTopic} from '../entities/FollowableTopic';
import type {Observable} from '../types/Observable';
import type {TopicSortField} from './TopicSortField';

/**
 * Returns topics with follow state (mirrors Android GetFollowableTopicsUseCase).
 * Implementation in Phase 6; contract only in Phase 2.
 */
export interface GetFollowableTopicsUseCase {
  invoke(sortBy?: TopicSortField): Observable<readonly FollowableTopic[]>;
}
