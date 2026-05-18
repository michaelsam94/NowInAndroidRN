import React from 'react';
import {Text, View} from 'react-native';

import {useNiaTheme} from '@core/ui/theme/ThemeContext';

interface PlaceholderScreenProps {
  readonly title: string;
  readonly subtitle?: string;
}

export function PlaceholderScreen({title, subtitle}: PlaceholderScreenProps) {
  const {colors} = useNiaTheme();

  return (
    <View
      className="flex-1 items-center justify-center px-6"
      style={{backgroundColor: colors.surface}}>
      <Text
        className="text-2xl font-semibold"
        style={{color: colors.onSurface}}
        accessibilityRole="header">
        {title}
      </Text>
      {subtitle !== undefined ? (
        <Text
          className="mt-2 text-center text-base"
          style={{color: colors.onSurfaceVariant}}
          accessibilityRole="text">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
