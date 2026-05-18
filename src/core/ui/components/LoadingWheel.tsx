import React from 'react';
import {ActivityIndicator, type StyleProp, View, type ViewStyle} from 'react-native';

import {uiStrings} from '../strings';
import {useNiaTheme} from '../theme/ThemeContext';

interface LoadingWheelProps {
  readonly contentDescription?: string;
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
}

export function LoadingWheel({
  contentDescription = uiStrings.loading,
  style,
  testID = 'nia-loading-wheel',
}: LoadingWheelProps) {
  const {colors} = useNiaTheme();

  return (
    <View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel={contentDescription}
      className="items-center justify-center p-4"
      style={style}>
      <ActivityIndicator color={colors.tertiary} size="large" />
    </View>
  );
}
