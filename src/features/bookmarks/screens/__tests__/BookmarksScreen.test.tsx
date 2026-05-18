import React from 'react';
import {act, fireEvent, screen, waitFor} from '@testing-library/react-native';

import {createGetUserNewsResourcesUseCase} from '@core/domain';
import {uiStrings} from '@core/ui';

import {
  TestUserDataRepository,
  TestUserNewsResourceRepository,
  emptyUserData,
} from '../../../../../test/fakes';
import {
  sampleUserNewsUnread,
  sampleUserNewsWithNote,
} from '../../../../../test/fixtures/sampleUserNewsResources';
import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import type {BookmarksViewModelDeps} from '../../types';
import {useBookmarksViewModel} from '../../hooks/useBookmarksViewModel';
import {BookmarksScreen} from '../BookmarksScreen';

function createDeps(
  bookmarked: readonly (typeof sampleUserNewsWithNote)[],
): BookmarksViewModelDeps {
  const userDataRepository = new TestUserDataRepository();
  userDataRepository.setUserData({
    ...emptyUserData,
    bookmarkedNewsResources: new Set(bookmarked.map(item => item.id)),
  });
  const userNewsRepository = new TestUserNewsResourceRepository();
  userNewsRepository.setBookmarked(bookmarked);

  return {
    getUserNewsResources: createGetUserNewsResourcesUseCase(userNewsRepository),
    userDataRepository,
    openNewsArticle: jest.fn().mockResolvedValue(undefined),
    shareNewsArticle: jest.fn().mockResolvedValue(undefined),
  };
}

function BookmarksHarness({deps}: {readonly deps: BookmarksViewModelDeps}) {
  const viewModel = useBookmarksViewModel(deps);
  return <BookmarksScreen viewModel={viewModel} />;
}

describe('BookmarksScreen selection bar', () => {
  it('shows how many items are selected', async () => {
    const deps = createDeps([sampleUserNewsWithNote, sampleUserNewsUnread]);

    renderWithNiaTheme(<BookmarksHarness deps={deps} />);

    await waitFor(() => {
      expect(screen.getByTestId('bookmarks:feed')).toBeOnTheScreen();
    });

    fireEvent(
      screen.getByTestId(`newsResourceCard:${sampleUserNewsWithNote.id}`),
      'onLongPress',
    );

    await waitFor(() => {
      expect(screen.getByTestId('bookmarks:selected-count')).toHaveTextContent(
        uiStrings.bookmarksSelectedCount(1),
      );
    });

    await act(async () => {
      fireEvent.press(
        screen.getByTestId(`newsResourceCard:${sampleUserNewsUnread.id}`),
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('bookmarks:selected-count')).toHaveTextContent(
        uiStrings.bookmarksSelectedCount(2),
      );
    });
  });
});
