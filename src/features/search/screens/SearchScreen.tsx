import React from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import {EmptyState, LoadingWheel, NewsResourceCard} from '@core/ui';
import {useNiaTheme} from '@core/ui/theme/ThemeContext';

import type {SearchViewModel} from '../types';

interface SearchScreenProps {
  readonly viewModel: SearchViewModel;
}

export function SearchScreen({viewModel: vm}: SearchScreenProps) {
  const {colors} = useNiaTheme();
  const {uiState} = vm;

  return (
    <View className="flex-1" style={{backgroundColor: colors.surface}}>
      <TextInput
        testID="search:input"
        accessibilityLabel="Search"
        value={uiState.query}
        onChangeText={vm.onQueryChange}
        onSubmitEditing={() => vm.onSearch(uiState.query)}
        placeholder="Search topics and news"
        placeholderTextColor={colors.onSurfaceVariant}
        className="mx-4 mt-4 rounded-lg border px-3 py-2 text-base"
        style={{borderColor: colors.outline, color: colors.onSurface}}
      />
      {uiState.screenState === 'NotReady' ? (
        <EmptyState
          title="Search is getting ready"
          description="Content is still loading."
        />
      ) : null}
      {uiState.recentQueries.length > 0 && uiState.query.length === 0 ? (
        <View className="px-4 py-2">
          <View className="mb-2 flex-row items-center justify-between">
            <Text style={{color: colors.onSurfaceVariant}}>Recent searches</Text>
            <Pressable accessibilityRole="button" onPress={vm.onClearRecentSearches}>
              <Text style={{color: colors.primary}}>Clear</Text>
            </Pressable>
          </View>
          {uiState.recentQueries.map(item => (
            <Pressable
              key={item.query}
              testID={`search:recent:${item.query}`}
              accessibilityRole="button"
              onPress={() => vm.onRecentSearchClick(item.query)}
              className="py-2">
              <Text style={{color: colors.onSurface}}>{item.query}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
      {uiState.screenState === 'Empty' ? (
        <EmptyState title="No results" description="Try a different search term." />
      ) : null}
      {uiState.result !== null ? (
        <FlatList
          testID="search:results"
          data={[...uiState.result.newsResources]}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            uiState.result.topics.length > 0 ? (
              <Text
                className="mb-2 px-4 font-semibold"
                style={{color: colors.onSurface}}>
                Topics
              </Text>
            ) : null
          }
          contentContainerClassName="px-4 py-2"
          renderItem={({item}) => (
            <NewsResourceCard
              userNewsResource={item}
              isBookmarked={item.isSaved}
              hasBeenViewed={item.hasBeenViewed}
              onToggleBookmark={() => vm.onBookmarkResult(item.id)}
              onPress={() => undefined}
              onTopicPress={() => undefined}
            />
          )}
        />
      ) : uiState.screenState === 'Loading' ? (
        <LoadingWheel />
      ) : null}
    </View>
  );
}
