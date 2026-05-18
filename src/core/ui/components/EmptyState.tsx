import React from 'react';
import {Text, View, type StyleProp, type ViewStyle} from 'react-native';

import {uiStrings} from '../strings';
import {useNiaTheme} from '../theme/ThemeContext';

interface EmptyStateProps {
  readonly title?: string;
  readonly description?: string;
  readonly testID?: string;
  readonly style?: StyleProp<ViewStyle>;
}

export function EmptyState({
  title = uiStrings.emptyStateDefaultTitle,
  description = uiStrings.emptyStateDefaultDescription,
  testID = 'nia-empty-state',
  style,
}: EmptyStateProps) {
  const {colors} = useNiaTheme();

  return (
    <View
      testID={testID}
      accessibilityRole="text"
      className="flex-1 items-center justify-center px-4 py-8"
      style={style}>
      <Text
        className="text-center text-lg font-semibold"
        style={{color: colors.onSurface}}
        accessibilityRole="header">
        {title}
      </Text>
      <Text
        className="mt-2 text-center text-base"
        style={{color: colors.onSurfaceVariant}}>
        {description}
      </Text>
    </View>
  );
}
