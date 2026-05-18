import React from 'react';
import {screen} from '@testing-library/react-native';

import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import {BookmarkNoteEditorDialog} from '../BookmarkNoteEditorDialog';

describe('BookmarkNoteEditorDialog', () => {
  it('shows delete when editing an existing note', () => {
    renderWithNiaTheme(
      <BookmarkNoteEditorDialog
        visible
        initialNote="Read later"
        onDismiss={() => undefined}
        onSave={() => undefined}
        onDelete={() => undefined}
      />,
    );

    expect(screen.getByTestId('bookmarkNoteEditor:delete')).toBeOnTheScreen();
  });

  it('hides delete when there is no existing note', () => {
    renderWithNiaTheme(
      <BookmarkNoteEditorDialog
        visible
        initialNote={null}
        onDismiss={() => undefined}
        onSave={() => undefined}
        onDelete={() => undefined}
      />,
    );

    expect(screen.queryByTestId('bookmarkNoteEditor:delete')).toBeNull();
  });
});
