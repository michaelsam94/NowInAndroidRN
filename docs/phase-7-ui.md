# Phase 7 — Shared UI components (TDD)

## Delivered

| Component | Path | Tests |
|-----------|------|-------|
| `LoadingWheel` | `components/LoadingWheel.tsx` | ✅ |
| `EmptyState` | `components/EmptyState.tsx` | ✅ |
| `OfflineSnackbar` | `components/OfflineSnackbar.tsx` | ✅ |
| `TopicChip` | `components/TopicChip.tsx` | ✅ |
| `NewsResourceCard` | `components/NewsResourceCard.tsx` | ✅ |
| `BookmarkedNewsResourceCard` | `components/BookmarkedNewsResourceCard.tsx` | ✅ |
| `BookmarkNoteDialog` | `components/BookmarkNoteDialog.tsx` | ✅ |
| `BookmarkNoteEditorDialog` | `components/BookmarkNoteEditorDialog.tsx` | ✅ |
| `NiaDraggableScrollbar` | `components/NiaDraggableScrollbar.tsx` | ✅ (simplified thumb) |

Shared card building blocks live in `components/newsResource/NewsResourceCardParts.tsx`.

Public exports: `src/core/ui/index.ts` and `src/core/ui/components/index.ts`.

Test helper: `test/ui/renderWithNiaTheme.tsx` wraps `NiaThemeProvider`.

## Parity notes

- Android test tags preserved (`newsResourceCard:*`, `topicTag:*`, `bookmarkNote:*`, `bookmarks:*`).
- Feed cards do not surface bookmark notes (Bookmarks card does).
- `NiaDraggableScrollbar` is visual-only for now; drag-to-scroll comes with FlashList integration in Phase 8.

## Next (Phase 8)

Feature hooks + screens wired to `appUseCases` and these components.
