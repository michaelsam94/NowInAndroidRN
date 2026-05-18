import type {FollowableTopic} from '../../entities/FollowableTopic';
import type {Topic} from '../../entities/Topic';
import type {UserData} from '../../entities/UserData';
import type {TopicsRepository} from '../../repositories/TopicsRepository';
import type {UserDataRepository} from '../../repositories/UserDataRepository';
import type {Observable} from '../../types/Observable';
import type {GetFollowableTopicsUseCase} from '../GetFollowableTopicsUseCase';
import {TopicSortField} from '../TopicSortField';

export function createGetFollowableTopicsUseCase(
  topicsRepository: TopicsRepository,
  userDataRepository: UserDataRepository,
): GetFollowableTopicsUseCase {
  return {
    invoke(sortBy?: TopicSortField): Observable<readonly FollowableTopic[]> {
      return emit => {
        let userData: UserData | undefined;
        let topics: readonly Topic[] | undefined;

        const tryEmit = (): void => {
          if (userData === undefined || topics === undefined) {
            return;
          }

          let followableTopics: FollowableTopic[] = topics.map(topic => ({
            topic,
            isFollowed: userData!.followedTopics.has(topic.id),
          }));

          if (sortBy === TopicSortField.Name) {
            followableTopics = [...followableTopics].sort((left, right) =>
              left.topic.name.localeCompare(right.topic.name),
            );
          }

          emit(followableTopics);
        };

        const unsubscribeUser = userDataRepository.userData(value => {
          userData = value;
          tryEmit();
        });
        const unsubscribeTopics = topicsRepository.getTopics()(value => {
          topics = value;
          tryEmit();
        });

        return () => {
          unsubscribeUser?.();
          unsubscribeTopics?.();
        };
      };
    },
  };
}
