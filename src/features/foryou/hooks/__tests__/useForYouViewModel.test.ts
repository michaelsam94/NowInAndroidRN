import {act, renderHook, waitFor} from '@testing-library/react-native';

import {createGetFollowableTopicsUseCase, createGetUserNewsResourcesUseCase} from '@core/domain';

import {
  TestTopicsRepository,
  TestUserDataRepository,
  TestUserNewsResourceRepository,
  emptyUserData,
} from '../../../../../test/fakes';
import {sampleUserNewsRead} from '../../../../../test/fixtures/sampleUserNewsResources';
import type {ForYouViewModelDeps} from '../../types';
import {useForYouViewModel} from '../useForYouViewModel';

function createForYouDeps(
  userDataRepository: TestUserDataRepository,
  topicsRepository: TestTopicsRepository,
  userNewsRepository: TestUserNewsResourceRepository,
): ForYouViewModelDeps {
  return {
    getUserNewsResources: createGetUserNewsResourcesUseCase(userNewsRepository),
    getFollowableTopics: createGetFollowableTopicsUseCase(
      topicsRepository,
      userDataRepository,
    ),
    userDataRepository,
  };
}

describe('useForYouViewModel', () => {
  it('shows onboarding when shouldHideOnboarding is false', async () => {
    const userDataRepository = new TestUserDataRepository();
    const topicsRepository = new TestTopicsRepository();
    const userNewsRepository = new TestUserNewsResourceRepository();

    userNewsRepository.setFollowed([]);
    const deps = createForYouDeps(userDataRepository, topicsRepository, userNewsRepository);

    const {result} = renderHook(() => useForYouViewModel(deps));

    await waitFor(() => {
      expect(result.current.uiState.isOnboarding).toBe(true);
    });
  });

  it('marks feed empty when no followed topics', async () => {
    const userDataRepository = new TestUserDataRepository();
    userDataRepository.setUserData({
      ...emptyUserData,
      shouldHideOnboarding: true,
    });
    const topicsRepository = new TestTopicsRepository();
    const userNewsRepository = new TestUserNewsResourceRepository();
    userNewsRepository.setFollowed([]);
    const deps = createForYouDeps(userDataRepository, topicsRepository, userNewsRepository);

    const {result} = renderHook(() => useForYouViewModel(deps));

    await waitFor(() => {
      expect(result.current.uiState.feedState).toBe('Empty');
    });
  });

  it('bookmarks article after confirming note dialog', async () => {
    const userDataRepository = new TestUserDataRepository();
    userDataRepository.setUserData({
      ...emptyUserData,
      shouldHideOnboarding: true,
    });
    const topicsRepository = new TestTopicsRepository();
    const userNewsRepository = new TestUserNewsResourceRepository();
    userNewsRepository.setFollowed([sampleUserNewsRead]);
    const deps = createForYouDeps(userDataRepository, topicsRepository, userNewsRepository);

    const {result} = renderHook(() => useForYouViewModel(deps));

    await waitFor(() => {
      expect(result.current.uiState.feed.length).toBe(1);
    });

    act(() => {
      result.current.onBookmarkClick(sampleUserNewsRead);
    });
    expect(result.current.pendingBookmarkId).toBe(sampleUserNewsRead.id);

    await act(async () => {
      result.current.confirmPendingBookmark('My note');
    });

    await waitFor(() => {
      expect(userDataRepository.getUserData().bookmarkedNewsResources.has(
        sampleUserNewsRead.id,
      )).toBe(true);
    });
  });
});
