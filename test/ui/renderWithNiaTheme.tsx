import React from 'react';
import {render, type RenderOptions} from '@testing-library/react-native';

import {TestNiaThemeProvider} from '@core/ui/theme/ThemeContext';

export function renderWithNiaTheme(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, {
    wrapper: ({children}) => (
      <TestNiaThemeProvider>{children}</TestNiaThemeProvider>
    ),
    ...options,
  });
}
