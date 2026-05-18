import React from 'react';
import {Pressable, Text} from 'react-native';

import type {FollowableTopic} from '@core/domain';

import {uiStrings} from '../strings';
import {useNiaTheme} from '../theme/ThemeContext';

interface TopicChipProps {
  readonly followableTopic: FollowableTopic;
  readonly onPress: (topicId: string) => void;
  readonly enabled?: boolean;
}

export function TopicChip({
  followableTopic,
  onPress,
  enabled = true,
}: TopicChipProps) {
  const {colors} = useNiaTheme();
  const {topic, isFollowed} = followableTopic;
  const label = topic.name.toUpperCase();
  const accessibilityLabel = isFollowed
    ? uiStrings.topicFollowed(topic.name)
    : uiStrings.topicNotFollowed(topic.name);

  const containerColor = isFollowed
    ? colors.primaryContainer
    : colors.surfaceVariant;
  const textColor = isFollowed ? colors.onPrimaryContainer : colors.onSurfaceVariant;

  return (
    <Pressable
      testID={`topicTag:${topic.id}`}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{disabled: !enabled}}
      disabled={!enabled}
      onPress={() => onPress(topic.id)}
      className="mr-1 rounded-full px-3 py-1"
      style={{
        backgroundColor: containerColor,
        opacity: enabled ? 1 : 0.5,
      }}>
      <Text className="text-xs font-medium" style={{color: textColor}}>
        {label}
      </Text>
    </Pressable>
  );
}
