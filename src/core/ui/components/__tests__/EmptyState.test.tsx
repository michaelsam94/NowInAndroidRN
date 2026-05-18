import React from 'react';
import {screen} from '@testing-library/react-native';

import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import {EmptyState} from '../EmptyState';

describe('EmptyState', () => {
  it('renders title and description', () => {
    renderWithNiaTheme(
      <EmptyState
        title="No bookmarks"
        description="Save articles to see them here"
        testID="bookmarks:empty"
      />,
    );

    expect(screen.getByTestId('bookmarks:empty')).toBeOnTheScreen();
    expect(screen.getByText('No bookmarks')).toBeOnTheScreen();
    expect(screen.getByText('Save articles to see them here')).toBeOnTheScreen();
  });
});
