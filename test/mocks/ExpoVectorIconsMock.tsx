import React from 'react';
import {Text, type TextProps} from 'react-native';

type IconProps = TextProps & {
  readonly name?: string;
};

function MockIcon({name, testID, ...rest}: IconProps) {
  return (
    <Text testID={testID} {...rest}>
      {name ?? 'icon'}
    </Text>
  );
}

export const MaterialCommunityIcons = MockIcon;
export const Ionicons = MockIcon;
export const AntDesign = MockIcon;
