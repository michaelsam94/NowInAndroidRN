import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';

import {BOOKMARK_NOTE_MAX_LENGTH} from '@core/domain';

import {uiStrings} from '../../strings';
import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import {BookmarkNoteDialog} from '../BookmarkNoteDialog';

describe('BookmarkNoteDialog', () => {
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
