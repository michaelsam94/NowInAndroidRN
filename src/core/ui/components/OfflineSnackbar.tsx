import React from 'react';
import {Text, View} from 'react-native';

import {uiStrings} from '../strings';
import {useNiaTheme} from '../theme/ThemeContext';

interface OfflineSnackbarProps {
  readonly visible: boolean;
  readonly message?: string;
}

export function OfflineSnackbar({
  visible,
  message = uiStrings.offlineSnackbar,
}: OfflineSnackbarProps) {
  const {colors} = useNiaTheme();

  if (!visible) {
    return null;
  }

  return (
    <View
      testID="offline-snackbar"
      accessibilityRole="text"
      accessibilityLiveRegion="polite"
      accessibilityLabel={message}
      className="absolute bottom-0 left-0 right-0 px-4 py-3"
      style={{backgroundColor: colors.onSurface}}>
      <Text
        className="text-center text-sm"
        style={{color: colors.surface}}>
        {message}
      </Text>
    </View>
  );
}
