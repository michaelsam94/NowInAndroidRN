import type {FollowableTopic} from '../../entities/FollowableTopic';
import type {TopicsRepository} from '../../repositories/TopicsRepository';
import type {UserDataRepository} from '../../repositories/UserDataRepository';
import type {Observable} from '../../types/Observable';
import type {GetFollowableTopicsUseCase} from '../GetFollowableTopicsUseCase';
import type {TopicSortField} from '../TopicSortField';

/**
 * Phase 6 stub — intentionally incomplete (TDD RED).
 * Tests in GetFollowableTopicsUseCase.test.ts drive the real implementation.
 */
export function createGetFollowableTopicsUseCase(
  _topicsRepository: TopicsRepository,
  _userDataRepository: UserDataRepository,
): GetFollowableTopicsUseCase {
  return {
    invoke(_sortBy?: TopicSortField): Observable<readonly FollowableTopic[]> {
      return emit => {
        emit([]);
        return () => undefined;
      };
    },
  };
}
