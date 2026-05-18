import React from 'react';
import {screen} from '@testing-library/react-native';

import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import {OfflineSnackbar} from '../OfflineSnackbar';

describe('OfflineSnackbar', () => {
  it('is hidden when not visible', () => {
    renderWithNiaTheme(<OfflineSnackbar visible={false} />);
    expect(screen.queryByTestId('offline-snackbar')).toBeNull();
  });

  it('announces offline message when visible', () => {
    renderWithNiaTheme(<OfflineSnackbar visible />);
    expect(screen.getByTestId('offline-snackbar')).toBeOnTheScreen();
    expect(screen.getByLabelText("You're offline. Showing saved content.")).toBeTruthy();
  });
});
