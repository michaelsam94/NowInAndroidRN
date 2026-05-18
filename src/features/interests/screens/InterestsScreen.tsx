import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';

import {TopicChip} from '@core/ui';
import {useNiaTheme} from '@core/ui/theme/ThemeContext';

import type {InterestsViewModel} from '../types';

interface InterestsScreenProps {
  readonly viewModel: InterestsViewModel;
}

export function InterestsScreen({viewModel: vm}: InterestsScreenProps) {
  const {colors} = useNiaTheme();
  const {uiState} = vm;

  return (
    <View className="flex-1 flex-row" style={{backgroundColor: colors.surface}}>
      <FlatList
        testID="interests:topics"
        className="w-2/5 border-r"
        style={{borderColor: colors.outline}}
        data={[...uiState.topics]}
        keyExtractor={item => item.topic.id}
        renderItem={({item}) => (
          <Pressable
            testID={`interests:topic:${item.topic.id}`}
            accessibilityRole="button"
            onPress={() => vm.onTopicClick(item.topic.id)}
            className="px-3 py-3"
            style={{
              backgroundColor:
                uiState.selectedTopicId === item.topic.id
                  ? colors.primaryContainer
                  : colors.surface,
            }}>
            <Text style={{color: colors.onSurface}}>{item.topic.name}</Text>
          </Pressable>
        )}
      />
      <View className="flex-1 p-4" testID="interests:detail">
        {uiState.selectedTopic !== null ? (
          <>
            <Text
              className="mb-2 text-xl font-semibold"
              style={{color: colors.onSurface}}
              accessibilityRole="header">
              {uiState.selectedTopic.name}
            </Text>
            <Text className="mb-4" style={{color: colors.onSurfaceVariant}}>
              {uiState.selectedTopic.longDescription}
            </Text>
            <TopicChip
              followableTopic={{
                topic: uiState.selectedTopic,
                isFollowed:
                  uiState.topics.find(
                    item => item.topic.id === uiState.selectedTopic?.id,
                  )?.isFollowed ?? false,
              }}
              onPress={topicId => {
                const followed =
                  uiState.topics.find(item => item.topic.id === topicId)
                    ?.isFollowed ?? false;
                vm.onFollowClick(topicId, !followed);
              }}
            />
          </>
        ) : (
          <Text style={{color: colors.onSurfaceVariant}}>
            Select a topic to see details.
          </Text>
        )}
      </View>
    </View>
  );
}
