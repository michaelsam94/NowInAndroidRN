import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import type {FollowableTopic, UserNewsResource} from '@core/domain';

import {uiStrings} from '../../strings';
import {useNiaTheme} from '../../theme/ThemeContext';
import {formatPublishDate} from '../../utils/formatPublishDate';
import {TopicChip} from '../TopicChip';

interface BookmarkButtonProps {
  readonly isBookmarked: boolean;
  readonly onPress: () => void;
}

export function BookmarkButton({isBookmarked, onPress}: BookmarkButtonProps) {
  const {colors} = useNiaTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        isBookmarked ? uiStrings.unbookmark : uiStrings.bookmark
      }
      onPress={onPress}
      hitSlop={8}
      testID="news-resource-bookmark">
      <MaterialCommunityIcons
        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
        size={24}
        color={colors.primary}
      />
    </Pressable>
  );
}

export function UnreadDot() {
  const {colors} = useNiaTheme();

  return (
    <View
      accessibilityLabel={uiStrings.unreadDot}
      className="mr-1.5 h-2 w-2 rounded-full"
      style={{backgroundColor: colors.tertiary}}
    />
  );
}

interface NewsResourceMetadataProps {
  readonly publishDate: string;
  readonly resourceType: string;
}

export function NewsResourceMetadata({
  publishDate,
  resourceType,
}: NewsResourceMetadataProps) {
  const {colors} = useNiaTheme();
  const formattedDate = formatPublishDate(publishDate);
  const metadataText =
    resourceType.trim().length > 0
      ? uiStrings.metadataWithType(formattedDate, resourceType)
      : formattedDate;

  return (
    <Text
      testID="news-resource-metadata"
      className="text-xs"
      style={{color: colors.onSurfaceVariant}}>
      {metadataText}
    </Text>
  );
}

interface NewsResourceTopicsRowProps {
  readonly topics: readonly FollowableTopic[];
  readonly onTopicPress: (topicId: string) => void;
}

export function NewsResourceTopicsRow({
  topics,
  onTopicPress,
}: NewsResourceTopicsRowProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {topics.map(followableTopic => (
        <TopicChip
          key={followableTopic.topic.id}
          followableTopic={followableTopic}
          onPress={onTopicPress}
        />
      ))}
    </ScrollView>
  );
}

interface NewsResourceCardBodyProps {
  readonly userNewsResource: UserNewsResource;
  readonly hasBeenViewed: boolean;
  readonly onToggleBookmark: () => void;
  readonly onTopicPress: (topicId: string) => void;
  readonly showBookmarkButton?: boolean;
  readonly headerAccessory?: React.ReactNode;
  readonly titleAccessory?: React.ReactNode;
  readonly belowTitle?: React.ReactNode;
}

export function NewsResourceCardBody({
  userNewsResource,
  hasBeenViewed,
  onToggleBookmark,
  onTopicPress,
  showBookmarkButton = true,
  headerAccessory,
  titleAccessory,
  belowTitle,
}: NewsResourceCardBodyProps) {
  const {colors} = useNiaTheme();

  return (
    <View className="p-4">
      {headerAccessory}
      <View className="mt-3 flex-row items-start">
        {titleAccessory}
        <Text
          className="flex-1 text-xl font-semibold"
          style={{color: colors.onSurface}}
          accessibilityRole="header">
          {userNewsResource.title}
        </Text>
        {showBookmarkButton ? (
          <BookmarkButton
            isBookmarked={userNewsResource.isSaved}
            onPress={onToggleBookmark}
          />
        ) : null}
      </View>
      {belowTitle}
      <View className="mt-3 flex-row items-center">
        {!hasBeenViewed ? <UnreadDot /> : null}
        <NewsResourceMetadata
          publishDate={userNewsResource.publishDate}
          resourceType={userNewsResource.type}
        />
      </View>
      <Text
        className="mt-3 text-base leading-6"
        style={{color: colors.onSurface}}>
        {userNewsResource.content}
      </Text>
      <View className="mt-3">
        <NewsResourceTopicsRow
          topics={userNewsResource.followableTopics}
          onTopicPress={onTopicPress}
        />
      </View>
    </View>
  );
}
