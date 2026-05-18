import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import {BOOKMARK_NOTE_MAX_LENGTH} from '@core/domain';

import {uiStrings} from '../strings';
import {useNiaTheme} from '../theme/ThemeContext';

export interface BookmarkNoteEditorDialogProps {
  readonly visible: boolean;
  readonly initialNote: string | null;
  readonly onDismiss: () => void;
  readonly onSave: (note: string | null) => void;
  readonly onDelete: () => void;
}

export function BookmarkNoteEditorDialog({
  visible,
  initialNote,
  onDismiss,
  onSave,
  onDelete,
}: BookmarkNoteEditorDialogProps) {
  const {colors} = useNiaTheme();
  const [noteText, setNoteText] = useState(initialNote ?? '');
  const charactersRemaining = BOOKMARK_NOTE_MAX_LENGTH - noteText.length;
  const hasExistingNote = (initialNote?.trim().length ?? 0) > 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}>
      <View
        className="flex-1 items-center justify-center px-6"
        style={{backgroundColor: 'rgba(0,0,0,0.45)'}}>
        <View
          className="w-full max-w-md rounded-2xl p-4"
          style={{backgroundColor: colors.surface}}>
          <Text
            className="text-xl font-semibold"
            style={{color: colors.onSurface}}
            accessibilityRole="header">
            {uiStrings.bookmarkNoteEditorTitle}
          </Text>
          <TextInput
            testID="bookmarkNoteEditor:input"
            accessibilityLabel={uiStrings.bookmarkNoteEditorLabel}
            value={noteText}
            onChangeText={value =>
              setNoteText(value.slice(0, BOOKMARK_NOTE_MAX_LENGTH))
            }
            multiline
            numberOfLines={3}
            className="mt-4 min-h-[88px] rounded-lg border px-3 py-2 text-base"
            style={{
              borderColor: colors.outline,
              color: colors.onSurface,
            }}
          />
          <Text
            testID="bookmarkNoteEditor:counter"
            className="mt-2 text-sm"
            style={{color: colors.onSurfaceVariant}}>
            {uiStrings.bookmarkNoteCharactersRemaining(charactersRemaining)}
          </Text>
          <View className="mt-4 flex-row flex-wrap justify-end gap-2">
            {hasExistingNote ? (
              <Pressable
                testID="bookmarkNoteEditor:delete"
                accessibilityRole="button"
                onPress={onDelete}
                className="px-3 py-2">
                <Text style={{color: colors.error}}>
                  {uiStrings.bookmarkNoteEditorDelete}
                </Text>
              </Pressable>
            ) : null}
            <Pressable
              testID="bookmarkNoteEditor:cancel"
              accessibilityRole="button"
              onPress={onDismiss}
              className="px-3 py-2">
              <Text style={{color: colors.primary}}>
                {uiStrings.bookmarkNoteEditorCancel}
              </Text>
            </Pressable>
            <Pressable
              testID="bookmarkNoteEditor:save"
              accessibilityRole="button"
              onPress={() => onSave(noteText.trim().length > 0 ? noteText.trim() : null)}
              className="px-3 py-2">
              <Text style={{color: colors.primary}}>
                {uiStrings.bookmarkNoteEditorSave}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
