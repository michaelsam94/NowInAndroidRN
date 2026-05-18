import React from 'react';
import {View, type StyleProp, type ViewStyle} from 'react-native';

import {useNiaTheme} from '../theme/ThemeContext';

interface NiaDraggableScrollbarProps {
  /** 0–1 scroll progress along the track. */
  readonly progress: number;
  readonly visible?: boolean;
  readonly testID?: string;
  readonly style?: StyleProp<ViewStyle>;
}

/**
 * Simplified scrollbar thumb for long lists (full drag physics deferred).
 */
export function NiaDraggableScrollbar({
  progress,
  visible = true,
  testID = 'nia-draggable-scrollbar',
  style,
}: NiaDraggableScrollbarProps) {
  const {colors} = useNiaTheme();

  if (!visible) {
    return null;
  }

  const clampedProgress = Math.min(1, Math.max(0, progress));

  return (
    <View
      testID={testID}
      accessibilityLabel="Scroll position"
      pointerEvents="none"
      className="absolute bottom-2 right-1 top-2 w-1.5 rounded-full"
      style={[{backgroundColor: colors.surfaceVariant}, style]}>
      <View
        testID={`${testID}:thumb`}
        className="absolute left-0 right-0 h-8 rounded-full"
        style={{
          backgroundColor: colors.primary,
          top: `${clampedProgress * 100}%`,
        }}
      />
    </View>
  );
}
