import {act, renderHook, waitFor} from '@testing-library/react-native';

import {createGetFollowableTopicsUseCase} from '@core/domain';

import {
  TestTopicsRepository,
  TestUserDataRepository,
  emptyUserData,
} from '../../../../../test/fakes';
import {sampleTopicCompose, sampleTopicKotlin} from '../../../../../test/fixtures/sampleTopics';
import type {InterestsViewModelDeps} from '../../types';
import {useInterestsViewModel} from '../useInterestsViewModel';

function createInterestsDeps(
  topicsRepository: TestTopicsRepository,
  userDataRepository: TestUserDataRepository,
): InterestsViewModelDeps {
  return {
    getFollowableTopics: createGetFollowableTopicsUseCase(
      topicsRepository,
      userDataRepository,
    ),
    userDataRepository,
  };
}

describe('useInterestsViewModel', () => {
  it('loads followable topics sorted by name', async () => {
    const topicsRepository = new TestTopicsRepository();
    topicsRepository.setTopics([sampleTopicCompose, sampleTopicKotlin]);
    const userDataRepository = new TestUserDataRepository();
    userDataRepository.setUserData({
      ...emptyUserData,
      followedTopics: new Set([sampleTopicKotlin.id]),
    });

    const deps = createInterestsDeps(topicsRepository, userDataRepository);
    const {result} = renderHook(() => useInterestsViewModel(deps));

    await waitFor(() => {
      expect(result.current.uiState.topics).toHaveLength(2);
      expect(result.current.uiState.topics[0]?.topic.name).toBe('Compose');
      expect(result.current.uiState.topics[1]?.topic.name).toBe('Kotlin');
      expect(
        result.current.uiState.topics.find(
          item => item.topic.id === sampleTopicKotlin.id,
        )?.isFollowed,
      ).toBe(true);
    });
  });

  it('toggles topic selection on click', async () => {
    const topicsRepository = new TestTopicsRepository();
    topicsRepository.setTopics([sampleTopicCompose]);
    const deps = createInterestsDeps(
      topicsRepository,
      new TestUserDataRepository(),
    );

    const {result} = renderHook(() =>
      useInterestsViewModel(deps, sampleTopicCompose.id),
    );

    await waitFor(() => {
      expect(result.current.uiState.selectedTopicId).toBe(sampleTopicCompose.id);
      expect(result.current.uiState.selectedTopic?.id).toBe(sampleTopicCompose.id);
    });

    act(() => {
      result.current.onTopicClick(sampleTopicCompose.id);
    });

    expect(result.current.uiState.selectedTopicId).toBeNull();
    expect(result.current.uiState.selectedTopic).toBeNull();
  });

  it('follows a topic via user data repository', async () => {
    const topicsRepository = new TestTopicsRepository();
    topicsRepository.setTopics([sampleTopicCompose]);
    const userDataRepository = new TestUserDataRepository();
    const deps = createInterestsDeps(topicsRepository, userDataRepository);

    const {result} = renderHook(() => useInterestsViewModel(deps));

    await waitFor(() => {
      expect(result.current.uiState.topics).toHaveLength(1);
    });

    act(() => {
      result.current.onFollowClick(sampleTopicCompose.id, true);
    });

    await waitFor(() => {
      expect(userDataRepository.getUserData().followedTopics.has(
        sampleTopicCompose.id,
      )).toBe(true);
    });
  });
});
