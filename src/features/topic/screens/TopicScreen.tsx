import React from 'react';
import {FlatList, Text, View} from 'react-native';

import {LoadingWheel, NewsResourceCard, TopicChip} from '@core/ui';
import {useNiaTheme} from '@core/ui/theme/ThemeContext';

import type {TopicViewModel} from '../types';

interface TopicScreenProps {
  readonly viewModel: TopicViewModel;
}

export function TopicScreen({viewModel: vm}: TopicScreenProps) {
  const {colors} = useNiaTheme();
  const {uiState} = vm;

  if (uiState.isLoading || uiState.topic === null) {
    return <LoadingWheel contentDescription="Loading topic" />;
  }

  return (
    <View className="flex-1" style={{backgroundColor: colors.surface}}>
      <View className="px-4 py-4">
        <Text
          className="mb-2 text-2xl font-semibold"
          style={{color: colors.onSurface}}
          accessibilityRole="header">
          {uiState.topic.topic.name}
        </Text>
        <Text className="mb-4" style={{color: colors.onSurfaceVariant}}>
          {uiState.topic.topic.longDescription}
        </Text>
        <TopicChip
          followableTopic={uiState.topic}
          onPress={() => vm.onFollowClick(!uiState.topic?.isFollowed)}
        />
      </View>
      <FlatList
        testID="topic:news"
        data={[...uiState.news]}
        keyExtractor={item => item.id}
        contentContainerClassName="px-4"
        renderItem={({item}) => (
          <NewsResourceCard
            userNewsResource={item}
            isBookmarked={item.isSaved}
            hasBeenViewed={item.hasBeenViewed}
            onToggleBookmark={() => undefined}
            onPress={() => vm.onNewsResourceViewed(item.id)}
            onTopicPress={() => undefined}
          />
        )}
      />
    </View>
  );
}
