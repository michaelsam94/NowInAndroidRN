import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';

import {BOOKMARK_NOTE_MAX_LENGTH} from '@core/domain';

import {uiStrings} from '../../strings';
import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import {BookmarkNoteDialog} from '../BookmarkNoteDialog';

describe('BookmarkNoteDialog', () => {
  it('clears the note field each time the dialog opens', () => {
    const {rerender} = renderWithNiaTheme(
      <BookmarkNoteDialog
        visible={false}
        onDismiss={() => undefined}
        onConfirm={() => undefined}
      />,
    );

    rerender(
      <BookmarkNoteDialog
        visible
        onDismiss={() => undefined}
        onConfirm={() => undefined}
      />,
    );
    fireEvent.changeText(screen.getByTestId('bookmarkNote:input'), 'Old note');

    rerender(
      <BookmarkNoteDialog
        visible={false}
        onDismiss={() => undefined}
        onConfirm={() => undefined}
      />,
    );
    rerender(
      <BookmarkNoteDialog
        visible
        onDismiss={() => undefined}
        onConfirm={() => undefined}
      />,
    );

    expect(screen.getByTestId('bookmarkNote:input').props.value).toBe('');
  });

  it('enforces max note length', () => {
    renderWithNiaTheme(
      <BookmarkNoteDialog visible onDismiss={() => undefined} onConfirm={() => undefined} />,
    );

    fireEvent.changeText(
      screen.getByTestId('bookmarkNote:input'),
      'a'.repeat(BOOKMARK_NOTE_MAX_LENGTH + 50),
    );

    expect(
      screen.getByText(uiStrings.bookmarkNoteCharactersRemaining(0)),
    ).toBeOnTheScreen();
  });
});
