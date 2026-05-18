import React from 'react';
import {Pressable, View} from 'react-native';

import type {UserNewsResource} from '@core/domain';

import {uiStrings} from '../strings';
import {useNiaTheme} from '../theme/ThemeContext';
import {NewsResourceCardBody} from './newsResource/NewsResourceCardParts';

export interface NewsResourceCardProps {
  readonly userNewsResource: UserNewsResource;
  readonly isBookmarked: boolean;
  readonly hasBeenViewed: boolean;
  readonly isHighlighted?: boolean;
  readonly onToggleBookmark: () => void;
  readonly onPress: () => void;
  readonly onTopicPress: (topicId: string) => void;
}

export function NewsResourceCard({
  userNewsResource,
  isBookmarked,
  hasBeenViewed,
  isHighlighted = false,
  onToggleBookmark,
  onPress,
  onTopicPress,
}: NewsResourceCardProps) {
  const {colors} = useNiaTheme();

  return (
    <Pressable
      testID={`newsResourceCard:${userNewsResource.id}`}
      accessibilityRole="button"
      accessibilityLabel={`${userNewsResource.title}. ${uiStrings.cardTapAction}`}
      onPress={onPress}
      className="mb-3 overflow-hidden rounded-2xl"
      style={{
        backgroundColor: colors.surface,
        borderWidth: isHighlighted ? 2 : 0,
        borderColor: isHighlighted ? colors.primary : undefined,
      }}>
      <NewsResourceCardBody
        userNewsResource={{...userNewsResource, isSaved: isBookmarked}}
        hasBeenViewed={hasBeenViewed}
        onToggleBookmark={onToggleBookmark}
        onTopicPress={onTopicPress}
      />
    </Pressable>
  );
}
