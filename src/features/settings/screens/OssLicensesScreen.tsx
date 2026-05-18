import React from 'react';
import {FlatList, Text, View} from 'react-native';

import {useNiaTheme} from '@core/ui/theme/ThemeContext';

import {ossLicenses} from '../data/ossLicenses';

export function OssLicensesScreen() {
  const {colors} = useNiaTheme();

  return (
    <FlatList
      testID="settings:licenses"
      data={[...ossLicenses]}
      keyExtractor={item => item.name}
      className="flex-1 px-4 py-4"
      style={{backgroundColor: colors.surface}}
      renderItem={({item}) => (
        <View className="mb-4 border-b pb-3" style={{borderColor: colors.outline}}>
          <Text
            className="text-base font-medium"
            style={{color: colors.onSurface}}
            accessibilityRole="header">
            {item.name}
          </Text>
          <Text className="text-sm" style={{color: colors.onSurfaceVariant}}>
            {item.license}
          </Text>
        </View>
      )}
    />
  );
}
