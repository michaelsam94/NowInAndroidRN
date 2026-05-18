import {useCallback, useMemo, useState} from 'react';

import {emptyUserData, removeBookmark, type UserNewsResource} from '@core/domain';
import {useObservable} from '@core/ui/hooks/useObservable';

import type {
  BookmarksFeedState,
  BookmarksUiState,
  BookmarksViewModel,
  BookmarksViewModelDeps,
} from '../types';

export interface BookmarksViewModelExtended extends BookmarksViewModel {
  readonly editingNoteResourceId: string | null;
  readonly showUndo: boolean;
  dismissNoteEditor(): void;
  saveBookmarkNote(note: string | null): void;
  deleteBookmarkNote(): void;
  dismissUndo(): void;
}

export function useBookmarksViewModel(
  deps: BookmarksViewModelDeps,
): BookmarksViewModelExtended {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [undoPayload, setUndoPayload] = useState<readonly UserNewsResource[] | null>(
    null,
  );
  const [showUndo, setShowUndo] = useState(false);
  const [editingNoteResourceId, setEditingNoteResourceId] = useState<string | null>(
    null,
  );
  const [lastRemoved, setLastRemoved] = useState<UserNewsResource | null>(null);

  const feedObservable = useMemo(
    () => deps.getUserNewsResources.observeBookmarked(),
    [deps.getUserNewsResources],
  );
  const feed = useObservable(feedObservable, []);

  const feedState: BookmarksFeedState = feed.length === 0 ? 'Empty' : 'Success';

  const uiState: BookmarksUiState = useMemo(
    () => ({
      feedState,
      feed,
      selectionMode,
      selectedIds,
      undoPayload,
    }),
    [feed, feedState, selectionMode, selectedIds, undoPayload],
  );

  const onBookmarkRemove = useCallback(
    (newsResourceId: string) => {
      if (selectionMode) {
        return;
      }
      const resource = feed.find(item => item.id === newsResourceId);
      if (resource !== undefined) {
        setLastRemoved(resource);
        setShowUndo(true);
      }
      void removeBookmark(deps.userDataRepository, newsResourceId);
    },
    [deps.userDataRepository, feed, selectionMode],
  );

  const onNoteClick = useCallback(
    (_newsResource: UserNewsResource) => {
      if (!selectionMode) {
        setEditingNoteResourceId(_newsResource.id);
      }
    },
    [selectionMode],
  );

  const onLongPress = useCallback((newsResourceId: string) => {
    setSelectionMode(true);
    setSelectedIds(new Set([newsResourceId]));
  }, []);

  const onToggleSelection = useCallback((newsResourceId: string) => {
    setSelectedIds(current => {
      const next = new Set(current);
      if (next.has(newsResourceId)) {
        next.delete(newsResourceId);
      } else {
        next.add(newsResourceId);
      }
      return next;
    });
  }, []);

  const onSelectAll = useCallback(() => {
    setSelectedIds(new Set(feed.map(item => item.id)));
  }, [feed]);

  const onBulkRemove = useCallback(() => {
    const removed = feed.filter(item => selectedIds.has(item.id));
    if (removed.length > 0) {
      setUndoPayload(removed);
      setShowUndo(true);
    }
    removed.forEach(item => {
      void removeBookmark(deps.userDataRepository, item.id);
    });
    setSelectionMode(false);
    setSelectedIds(new Set());
  }, [deps.userDataRepository, feed, selectedIds]);

  const onUndo = useCallback(() => {
    const toRestore = undoPayload ?? (lastRemoved !== null ? [lastRemoved] : []);
    toRestore.forEach(item => {
      void deps.userDataRepository.setNewsResourceBookmarked(item.id, true);
      if (item.note !== null) {
        void deps.userDataRepository.setBookmarkNote(item.id, item.note);
      }
    });
    setUndoPayload(null);
    setLastRemoved(null);
    setShowUndo(false);
  }, [deps.userDataRepository, lastRemoved, undoPayload]);

  const onExitSelectionMode = useCallback(() => {
    setSelectionMode(false);
    setSelectedIds(new Set());
  }, []);

  const onShareTitle = useCallback(
    (newsResource: UserNewsResource) => {
      void deps.shareNewsArticle(newsResource.title, newsResource.url);
    },
    [deps],
  );

  const onOpenArticle = useCallback(
    (newsResource: UserNewsResource) => {
      void deps.openNewsArticle(newsResource.url);
    },
    [deps],
  );

  return {
    uiState,
    onBookmarkRemove,
    onNoteClick,
    onLongPress,
    onToggleSelection,
    onSelectAll,
    onBulkRemove,
    onUndo,
    onExitSelectionMode,
    onShareTitle,
    onOpenArticle,
    editingNoteResourceId,
    showUndo,
    dismissNoteEditor: () => setEditingNoteResourceId(null),
    saveBookmarkNote: (note: string | null) => {
      if (editingNoteResourceId === null) {
        return;
      }
      void deps.userDataRepository.setBookmarkNote(editingNoteResourceId, note);
      setEditingNoteResourceId(null);
    },
    deleteBookmarkNote: () => {
      if (editingNoteResourceId === null) {
        return;
      }
      void deps.userDataRepository.setBookmarkNote(editingNoteResourceId, null);
      setEditingNoteResourceId(null);
    },
    dismissUndo: () => {
      setShowUndo(false);
      setUndoPayload(null);
      setLastRemoved(null);
    },
  };
}
