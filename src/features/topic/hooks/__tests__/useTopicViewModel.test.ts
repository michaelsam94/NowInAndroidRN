import {act, renderHook, waitFor} from '@testing-library/react-native';

import {
  createGetFollowableTopicsUseCase,
  createGetUserNewsResourcesUseCase,
} from '@core/domain';

import {
  TestTopicsRepository,
  TestUserDataRepository,
  TestUserNewsResourceRepository,
} from '../../../../../test/fakes';
import {sampleUserNewsRead} from '../../../../../test/fixtures/sampleUserNewsResources';
import {sampleTopicCompose} from '../../../../../test/fixtures/sampleTopics';
import type {TopicViewModelDeps} from '../../types';
import {useTopicViewModel} from '../useTopicViewModel';

function createTopicDeps(
  topicsRepository: TestTopicsRepository,
  userDataRepository: TestUserDataRepository,
  userNewsRepository: TestUserNewsResourceRepository,
): TopicViewModelDeps {
  return {
    getUserNewsResources: createGetUserNewsResourcesUseCase(userNewsRepository),
    getFollowableTopics: createGetFollowableTopicsUseCase(
      topicsRepository,
      userDataRepository,
    ),
    topicsRepository,
    userDataRepository,
  };
}

describe('useTopicViewModel', () => {
  it('loads topic detail and filtered news', async () => {
    const topicsRepository = new TestTopicsRepository();
    topicsRepository.setTopics([sampleTopicCompose]);
    const userDataRepository = new TestUserDataRepository();
    const userNewsRepository = new TestUserNewsResourceRepository();
    userNewsRepository.setAll([sampleUserNewsRead]);

    const deps = createTopicDeps(
      topicsRepository,
      userDataRepository,
      userNewsRepository,
    );

    const {result} = renderHook(() =>
      useTopicViewModel(deps, sampleTopicCompose.id),
    );

    await waitFor(() => {
      expect(result.current.uiState.isLoading).toBe(false);
      expect(result.current.uiState.topic?.topic.id).toBe(sampleTopicCompose.id);
      expect(result.current.uiState.news.length).toBeGreaterThan(0);
    });
  });

  it('stays loading when the topic id is unknown', async () => {
    const topicsRepository = new TestTopicsRepository();
    topicsRepository.setTopics([sampleTopicCompose]);
    const deps = createTopicDeps(
      topicsRepository,
      new TestUserDataRepository(),
      new TestUserNewsResourceRepository(),
    );

    const {result} = renderHook(() =>
      useTopicViewModel(deps, 'unknown-topic'),
    );

    await waitFor(() => {
      expect(result.current.uiState.topic).toBeNull();
      expect(result.current.uiState.isLoading).toBe(true);
    });
  });

  it('marks a news resource as viewed', async () => {
    const topicsRepository = new TestTopicsRepository();
    topicsRepository.setTopics([sampleTopicCompose]);
    const userDataRepository = new TestUserDataRepository();
    const userNewsRepository = new TestUserNewsResourceRepository();
    userNewsRepository.setAll([sampleUserNewsRead]);

    const deps = createTopicDeps(
      topicsRepository,
      userDataRepository,
      userNewsRepository,
    );

    const {result} = renderHook(() =>
      useTopicViewModel(deps, sampleTopicCompose.id),
    );

    await waitFor(() => {
      expect(result.current.uiState.news.length).toBeGreaterThan(0);
    });

    act(() => {
      result.current.onNewsResourceViewed(sampleUserNewsRead.id);
    });

    await waitFor(() => {
      expect(
        userDataRepository.getUserData().viewedNewsResources.has(
          sampleUserNewsRead.id,
        ),
      ).toBe(true);
    });
  });
});
