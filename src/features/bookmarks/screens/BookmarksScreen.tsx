import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';

import {
  BookmarkNoteEditorDialog,
  BookmarkedNewsResourceCard,
  EmptyState,
  LoadingWheel,
  uiStrings,
} from '@core/ui';
import {useNiaTheme} from '@core/ui/theme/ThemeContext';

import type {BookmarksViewModelExtended} from '../hooks/useBookmarksViewModel';

interface BookmarksScreenProps {
  readonly viewModel: BookmarksViewModelExtended;
}

export function BookmarksScreen({viewModel: vm}: BookmarksScreenProps) {
  const {colors} = useNiaTheme();
  const {uiState} = vm;
  const editingResource = uiState.feed.find(
    item => item.id === vm.editingNoteResourceId,
  );
  const selectedCount = uiState.selectedIds.size;
  const isRemoveEnabled = selectedCount > 0;

  return (
    <View className="flex-1" style={{backgroundColor: colors.surface}}>
      {uiState.selectionMode ? (
        <View
          className="flex-row items-center justify-between px-4 py-2"
          testID="bookmarks:selection-bar">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={uiStrings.bookmarksCancel}
            onPress={vm.onExitSelectionMode}
            testID="bookmarks:exit-selection"
            className="min-w-[72px] py-1">
            <Text style={{color: colors.primary}}>{uiStrings.bookmarksCancel}</Text>
          </Pressable>
          <Text
            testID="bookmarks:selected-count"
            accessibilityRole="text"
            accessibilityLabel={uiStrings.bookmarksSelectedCount(selectedCount)}
            className="flex-1 text-center text-base font-medium"
            style={{color: colors.onSurface}}>
            {uiStrings.bookmarksSelectedCount(selectedCount)}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={uiStrings.bookmarksRemove}
            accessibilityState={{disabled: !isRemoveEnabled}}
            disabled={!isRemoveEnabled}
            onPress={vm.onBulkRemove}
            testID="bookmarks:bulk-remove"
            className="min-w-[72px] items-end py-1"
            style={{opacity: isRemoveEnabled ? 1 : 0.38}}>
            <Text style={{color: colors.error}}>{uiStrings.bookmarksRemove}</Text>
          </Pressable>
        </View>
      ) : null}
      {vm.showUndo ? (
        <View className="flex-row items-center justify-between bg-opacity-90 px-4 py-2">
          <Text style={{color: colors.onSurface}}>Bookmark removed</Text>
          <Pressable
            accessibilityRole="button"
            testID="bookmarks:undo"
            onPress={vm.onUndo}>
            <Text style={{color: colors.primary}}>Undo</Text>
          </Pressable>
        </View>
      ) : null}
      {uiState.feedState === 'Empty' ? (
        <EmptyState
          title="No saved articles"
          description="Articles you bookmark will appear here."
          testID="bookmarks:empty"
        />
      ) : uiState.feedState === 'Success' ? (
        <FlatList
          testID="bookmarks:feed"
          data={[...uiState.feed]}
          keyExtractor={item => item.id}
          contentContainerClassName="px-4 py-2"
          renderItem={({item}) => (
            <BookmarkedNewsResourceCard
              userNewsResource={item}
              isSelectionMode={uiState.selectionMode}
              isSelected={uiState.selectedIds.has(item.id)}
              onToggleBookmark={() => vm.onBookmarkRemove(item.id)}
              onOpenArticle={() => vm.onOpenArticle(item)}
              onToggleSelected={() => vm.onToggleSelection(item.id)}
              onEnterSelectionMode={() => vm.onLongPress(item.id)}
              onNoteClick={() => vm.onNoteClick(item)}
              onTopicPress={() => undefined}
            />
          )}
        />
      ) : (
        <LoadingWheel />
      )}
      <BookmarkNoteEditorDialog
        visible={vm.editingNoteResourceId !== null}
        initialNote={editingResource?.note ?? null}
        onDismiss={vm.dismissNoteEditor}
        onSave={vm.saveBookmarkNote}
        onDelete={vm.deleteBookmarkNote}
      />
    </View>
  );
}
