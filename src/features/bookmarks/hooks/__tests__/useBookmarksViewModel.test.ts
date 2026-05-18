import {act, renderHook, waitFor} from '@testing-library/react-native';

import {createGetUserNewsResourcesUseCase} from '@core/domain';

import {
  TestUserDataRepository,
  TestUserNewsResourceRepository,
  emptyUserData,
} from '../../../../../test/fakes';
import {sampleUserNewsWithNote} from '../../../../../test/fixtures/sampleUserNewsResources';
import {useBookmarksViewModel} from '../useBookmarksViewModel';

describe('useBookmarksViewModel', () => {
  it('enters selection mode on long press', async () => {
    const userDataRepository = new TestUserDataRepository();
    userDataRepository.setUserData({
      ...emptyUserData,
      bookmarkedNewsResources: new Set([sampleUserNewsWithNote.id]),
    });
    const userNewsRepository = new TestUserNewsResourceRepository();
    userNewsRepository.setBookmarked([sampleUserNewsWithNote]);

    const deps = {
      getUserNewsResources: createGetUserNewsResourcesUseCase(userNewsRepository),
      userDataRepository,
      openNewsArticle: jest.fn().mockResolvedValue(undefined),
      shareNewsArticle: jest.fn().mockResolvedValue(undefined),
    };

    const {result} = renderHook(() => useBookmarksViewModel(deps));

    await waitFor(() => {
      expect(result.current.uiState.feed.length).toBe(1);
    });

    act(() => {
      result.current.onLongPress(sampleUserNewsWithNote.id);
    });

    expect(result.current.uiState.selectionMode).toBe(true);
    expect(result.current.uiState.selectedIds.has(sampleUserNewsWithNote.id)).toBe(
      true,
    );
  });
});
