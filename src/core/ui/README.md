# Shared UI (Phase 7)

Reusable components and theme tokens. Import from `@core/ui`.

**Rules:** May import `@core/domain` types for props; no feature-specific logic.

## Components

- `NewsResourceCard`, `BookmarkedNewsResourceCard` — feed cards
- `TopicChip` — topic tags with follow styling
- `BookmarkNoteDialog`, `BookmarkNoteEditorDialog` — bookmark notes
- `LoadingWheel`, `EmptyState`, `OfflineSnackbar`
- `NiaDraggableScrollbar` — simplified list thumb (Phase 8 wires scroll)

## Testing

Use `test/ui/renderWithNiaTheme.tsx` (`TestNiaThemeProvider`) in RNTL tests.
