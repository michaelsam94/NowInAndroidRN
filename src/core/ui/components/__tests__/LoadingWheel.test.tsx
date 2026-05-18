import React from 'react';
import {screen} from '@testing-library/react-native';

import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import {LoadingWheel} from '../LoadingWheel';

describe('LoadingWheel', () => {
  it('exposes progressbar role and content description', () => {
    renderWithNiaTheme(<LoadingWheel contentDescription="Loading news" />);
    expect(screen.getByLabelText('Loading news')).toBeOnTheScreen();
    expect(screen.getByTestId('nia-loading-wheel')).toHaveProp(
      'accessibilityRole',
      'progressbar',
    );
  });
});
