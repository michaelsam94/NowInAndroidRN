import type {UserNewsResource} from '@core/domain';

export type BookmarksFeedState = 'Loading' | 'Success' | 'Empty';

export interface BookmarksUiState {
  readonly feedState: BookmarksFeedState;
  readonly feed: readonly UserNewsResource[];
  readonly selectionMode: boolean;
  readonly selectedIds: ReadonlySet<string>;
  readonly undoPayload: readonly UserNewsResource[] | null;
}

export interface BookmarksViewModel {
  readonly uiState: BookmarksUiState;
  onBookmarkRemove(newsResourceId: string): void;
  onNoteClick(newsResource: UserNewsResource): void;
  onLongPress(newsResourceId: string): void;
  onToggleSelection(newsResourceId: string): void;
  onSelectAll(): void;
  onBulkRemove(): void;
  onUndo(): void;
  onExitSelectionMode(): void;
  onShareTitle(newsResource: UserNewsResource): void;
}
