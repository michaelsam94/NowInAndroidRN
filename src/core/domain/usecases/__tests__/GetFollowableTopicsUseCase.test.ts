import {TopicSortField} from '../TopicSortField';
import {createGetFollowableTopicsUseCase} from '../implementations/createGetFollowableTopicsUseCase';
import {onceObservable} from '../../../../../test/utils/observable';
import {
  TestTopicsRepository,
  TestUserDataRepository,
  emptyUserData,
} from '../../../../../test/fakes';
import {
  sampleTopicCompose,
  sampleTopics,
} from '../../../../../test/fixtures/sampleTopics';

/**
 * RED (Phase 3): fails until Phase 6 implements stream combine + sort.
 */
describe('GetFollowableTopicsUseCase', () => {
  it('sorts topics by name when TopicSortField.Name is used', async () => {
    const userDataRepository = new TestUserDataRepository();
    userDataRepository.setUserData({
      ...emptyUserData,
      followedTopics: new Set([sampleTopicCompose.id]),
    });

    const topicsRepository = new TestTopicsRepository();
    topicsRepository.setTopics(sampleTopics);

    const useCase = createGetFollowableTopicsUseCase(
      topicsRepository,
      userDataRepository,
    );

    const result = await onceObservable(
      useCase.invoke(TopicSortField.Name),
    );

    expect(result.map(item => item.topic.name)).toEqual(['Compose', 'Kotlin']);
    expect(result.find(item => item.topic.id === sampleTopicCompose.id)
      ?.isFollowed).toBe(true);
  });
});
