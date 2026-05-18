import React from 'react';
import {View} from 'react-native';

import {useNiaTheme} from '@core/ui/theme/ThemeContext';

export function TabUnreadBadge({visible}: {readonly visible: boolean}) {
  const {colors} = useNiaTheme();

  if (!visible) {
    return null;
  }

  return (
    <View
      accessibilityLabel="Unread content"
      className="absolute right-0 top-0 h-2 w-2 rounded-full"
      style={{backgroundColor: colors.tertiary}}
    />
  );
}
