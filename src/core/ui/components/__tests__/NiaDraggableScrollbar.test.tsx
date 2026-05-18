import React from 'react';
import {screen} from '@testing-library/react-native';

import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import {NiaDraggableScrollbar} from '../NiaDraggableScrollbar';

describe('NiaDraggableScrollbar', () => {
  it('renders scrollbar thumb when visible', () => {
    renderWithNiaTheme(<NiaDraggableScrollbar progress={0.25} />);
    expect(screen.getByLabelText('Scroll position')).toBeOnTheScreen();
    expect(screen.getByTestId('nia-draggable-scrollbar:thumb')).toBeOnTheScreen();
  });

  it('renders nothing when hidden', () => {
    renderWithNiaTheme(<NiaDraggableScrollbar progress={0} visible={false} />);
    expect(screen.queryByTestId('nia-draggable-scrollbar')).toBeNull();
  });
});
