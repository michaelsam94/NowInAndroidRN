import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';

import {
  BookmarkNoteDialog,
  EmptyState,
  LoadingWheel,
  NewsResourceCard,
  TopicChip,
} from '@core/ui';
import {useNiaTheme} from '@core/ui/theme/ThemeContext';

import type {ForYouViewModelExtended} from '../hooks/useForYouViewModel';

interface ForYouScreenProps {
  readonly viewModel: ForYouViewModelExtended;
}

export function ForYouScreen({viewModel: vm}: ForYouScreenProps) {
  const {colors} = useNiaTheme();
  const {uiState} = vm;

  if (uiState.isOnboarding) {
    return (
      <View
        className="flex-1 px-4 py-6"
        style={{flex: 1, backgroundColor: colors.surface}}
        testID="foryou:onboarding">
        <Text
          className="mb-2 text-2xl font-semibold"
          style={{color: colors.onSurface}}
          accessibilityRole="header">
          What are you interested in?
        </Text>
        <Text className="mb-4 text-base" style={{color: colors.onSurfaceVariant}}>
          Follow at least one topic to personalize your feed.
        </Text>
        <View className="mb-6 flex-row flex-wrap">
          {vm.onboardingTopics.map(followableTopic => (
            <TopicChip
              key={followableTopic.topic.id}
              followableTopic={followableTopic}
              onPress={topicId =>
                vm.onTopicFollowClick(topicId, !followableTopic.isFollowed)
              }
            />
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Done"
          testID="foryou:onboarding-done"
          onPress={vm.onOnboardingDone}
          className="self-end rounded-full px-6 py-3"
          style={{backgroundColor: colors.primary}}>
          <Text style={{color: colors.onPrimary}}>Done</Text>
        </Pressable>
      </View>
    );
  }

  if (uiState.feedState === 'Empty') {
    return (
      <EmptyState
        title="No updates"
        description="Follow topics to see articles in your feed."
        testID="foryou:empty"
      />
    );
  }

  return (
    <View
      className="flex-1"
      style={{flex: 1, backgroundColor: colors.surface}}>
      {uiState.isSyncing ? (
        <Text
          className="px-4 py-2 text-center text-sm"
          style={{color: colors.onSurfaceVariant}}
          testID="foryou:syncing">
          Syncing…
        </Text>
      ) : null}
      {uiState.feedState === 'Success' ? (
        <FlatList
          testID="foryou:feed"
          data={[...uiState.feed]}
          keyExtractor={item => item.id}
          contentContainerClassName="px-4 py-2"
          renderItem={({item}) => (
            <NewsResourceCard
              userNewsResource={item}
              isBookmarked={item.isSaved}
              hasBeenViewed={item.hasBeenViewed}
              isHighlighted={uiState.deepLinkedNewsId === item.id}
              onToggleBookmark={() => vm.onBookmarkClick(item)}
              onPress={() => vm.onNewsResourcePress(item)}
              onTopicPress={() => undefined}
            />
          )}
        />
      ) : (
        <LoadingWheel contentDescription="Loading feed" />
      )}
      <BookmarkNoteDialog
        visible={vm.pendingBookmarkId !== null}
        onDismiss={vm.dismissPendingBookmark}
        onConfirm={vm.confirmPendingBookmark}
      />
    </View>
  );
}
