import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

import type {UserNewsResource} from '@core/domain';

import {uiStrings} from '../strings';
import {useNiaTheme} from '../theme/ThemeContext';
import {NewsResourceCardBody} from './newsResource/NewsResourceCardParts';

export interface BookmarkedNewsResourceCardProps {
  readonly userNewsResource: UserNewsResource;
  readonly isSelectionMode: boolean;
  readonly isSelected: boolean;
  readonly onToggleBookmark: () => void;
  readonly onOpenArticle: () => void;
  readonly onToggleSelected: () => void;
  readonly onEnterSelectionMode: () => void;
  readonly onNoteClick: () => void;
  readonly onTopicPress: (topicId: string) => void;
}

export function BookmarkedNewsResourceCard({
  userNewsResource,
  isSelectionMode,
  isSelected,
  onToggleBookmark,
  onOpenArticle,
  onToggleSelected,
  onEnterSelectionMode,
  onNoteClick,
  onTopicPress,
}: BookmarkedNewsResourceCardProps) {
  const {colors} = useNiaTheme();
  const hasNote =
    !isSelectionMode && (userNewsResource.note?.trim().length ?? 0) > 0;

  return (
    <Pressable
      testID={`newsResourceCard:${userNewsResource.id}`}
      accessibilityRole={isSelectionMode ? 'checkbox' : 'button'}
      accessibilityState={
        isSelectionMode ? {checked: isSelected} : undefined
      }
      accessibilityLabel={
        isSelectionMode
          ? uiStrings.selectItem
          : `${userNewsResource.title}. ${uiStrings.cardTapAction}`
      }
      onPress={() => {
        if (isSelectionMode) {
          onToggleSelected();
        } else {
          onOpenArticle();
        }
      }}
      onLongPress={() => {
        if (!isSelectionMode) {
          onEnterSelectionMode();
        }
      }}
      className="mb-3 overflow-hidden rounded-2xl"
      style={{backgroundColor: colors.surface}}>
      <NewsResourceCardBody
        userNewsResource={userNewsResource}
        hasBeenViewed={userNewsResource.hasBeenViewed}
        onToggleBookmark={onToggleBookmark}
        onTopicPress={onTopicPress}
        showBookmarkButton={!isSelectionMode}
        titleAccessory={
          isSelectionMode ? (
            <Pressable
              testID={`bookmarks:checkbox:${userNewsResource.id}`}
              accessibilityRole="checkbox"
              accessibilityState={{checked: isSelected}}
              onPress={onToggleSelected}
              className="mr-2 pt-1">
              <MaterialCommunityIcons
                name={isSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={24}
                color={colors.primary}
              />
            </Pressable>
          ) : hasNote ? (
            <MaterialCommunityIcons
              testID={`bookmarks:noteIndicator:${userNewsResource.id}`}
              name="text-short"
              size={20}
              color={colors.primary}
              accessibilityLabel={uiStrings.bookmarkHasNote}
              style={{marginRight: 8, marginTop: 4}}
            />
          ) : null
        }
        belowTitle={
          hasNote ? (
            <Pressable
              testID={`bookmarks:note:${userNewsResource.id}`}
              accessibilityRole="button"
              accessibilityLabel={uiStrings.bookmarkNoteContentDescription}
              onPress={onNoteClick}
              className="mt-2">
              <Text
                className="text-sm"
                style={{color: colors.onSurfaceVariant}}>
                {userNewsResource.note}
              </Text>
            </Pressable>
          ) : null
        }
      />
    </Pressable>
  );
}
