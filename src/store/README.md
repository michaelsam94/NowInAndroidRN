# Global Zustand store (Phase 4)

| Slice | Scope | Backed by |
|-------|--------|-----------|
| `theme` | App-wide | MMKV via `UserDataRepository` |
| `sync` | `isSyncing` overlay | Background fetch status |
| `navigation` | Tab unread dots | Derived from viewed IDs + feed |

Feature-local state (e.g. bookmarks selection) stays in `src/features/*/store/`.
