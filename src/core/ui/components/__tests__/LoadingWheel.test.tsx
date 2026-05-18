import React from 'react';
import {Text} from 'react-native';
import {render, screen} from '@testing-library/react-native';

/** Minimal RNTL smoke component until LoadingWheel is built in Phase 7. */
function LoadingWheelPlaceholder() {
  return (
    <Text accessibilityRole="progressbar" accessibilityLabel="Loading">
      Loading
    </Text>
  );
}

describe('LoadingWheel placeholder (RNTL harness)', () => {
  it('exposes progressbar role for accessibility', () => {
    render(<LoadingWheelPlaceholder />);
    expect(screen.getByRole('progressbar')).toBeOnTheScreen();
    expect(screen.getByLabelText('Loading')).toBeTruthy();
  });
});
