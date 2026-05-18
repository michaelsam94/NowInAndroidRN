import React from 'react';
import {screen} from '@testing-library/react-native';

import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import {sampleUserNewsWithNote} from '../../../../../test/fixtures/sampleUserNewsResources';
import {BookmarkedNewsResourceCard} from '../BookmarkedNewsResourceCard';

const noop = () => undefined;

describe('BookmarkedNewsResourceCard', () => {
  it('shows note text and indicator outside selection mode', () => {
    renderWithNiaTheme(
      <BookmarkedNewsResourceCard
        userNewsResource={sampleUserNewsWithNote}
        isSelectionMode={false}
        isSelected={false}
        onToggleBookmark={noop}
        onOpenArticle={noop}
        onToggleSelected={noop}
        onEnterSelectionMode={noop}
        onNoteClick={noop}
        onTopicPress={noop}
      />,
    );

    expect(screen.getByText('Hidden on feed cards')).toBeOnTheScreen();
    expect(
      screen.getByTestId(`bookmarks:noteIndicator:${sampleUserNewsWithNote.id}`),
    ).toBeOnTheScreen();
  });

  it('shows selection checkbox in selection mode and hides note', () => {
    renderWithNiaTheme(
      <BookmarkedNewsResourceCard
        userNewsResource={sampleUserNewsWithNote}
        isSelectionMode
        isSelected
        onToggleBookmark={noop}
        onOpenArticle={noop}
        onToggleSelected={noop}
        onEnterSelectionMode={noop}
        onNoteClick={noop}
        onTopicPress={noop}
      />,
    );

    expect(
      screen.getByTestId(`bookmarks:checkbox:${sampleUserNewsWithNote.id}`),
    ).toBeOnTheScreen();
    expect(screen.queryByText('Hidden on feed cards')).toBeNull();
  });
});
