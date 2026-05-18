import React, {useEffect, useState} from 'react';
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

export interface BookmarkNoteDialogProps {
  readonly visible: boolean;
  readonly onDismiss: () => void;
  readonly onConfirm: (note: string | null) => void;
}

export function BookmarkNoteDialog({
  visible,
  onDismiss,
  onConfirm,
}: BookmarkNoteDialogProps) {
  const {colors} = useNiaTheme();
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (visible) {
      setNoteText('');
    }
  }, [visible]);

  const charactersRemaining = BOOKMARK_NOTE_MAX_LENGTH - noteText.length;

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
            {uiStrings.bookmarkNoteDialogTitle}
          </Text>
          <TextInput
            testID="bookmarkNote:input"
            accessibilityLabel={uiStrings.bookmarkNoteDialogLabel}
            value={noteText}
            onChangeText={value =>
              setNoteText(value.slice(0, BOOKMARK_NOTE_MAX_LENGTH))
            }
            placeholder={uiStrings.bookmarkNoteDialogPlaceholder}
            placeholderTextColor={colors.onSurfaceVariant}
            multiline
            numberOfLines={3}
            className="mt-4 min-h-[88px] rounded-lg border px-3 py-2 text-base"
            style={{
              borderColor: colors.outline,
              color: colors.onSurface,
            }}
          />
          <Text
            testID="bookmarkNote:counter"
            className="mt-2 text-sm"
            style={{color: colors.onSurfaceVariant}}>
            {uiStrings.bookmarkNoteCharactersRemaining(charactersRemaining)}
          </Text>
          <View className="mt-4 flex-row justify-end gap-2">
            <Pressable
              testID="bookmarkNote:skip"
              accessibilityRole="button"
              onPress={onDismiss}
              className="px-3 py-2">
              <Text style={{color: colors.primary}}>
                {uiStrings.bookmarkNoteSkip}
              </Text>
            </Pressable>
            <Pressable
              testID="bookmarkNote:save"
              accessibilityRole="button"
              onPress={() => onConfirm(noteText.trim().length > 0 ? noteText.trim() : null)}
              className="px-3 py-2">
              <Text style={{color: colors.primary}}>
                {uiStrings.bookmarkNoteSave}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
