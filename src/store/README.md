# Global Zustand store (Phase 4)

| Slice | Scope | Backed by |
|-------|--------|-----------|
| `theme` | App-wide | MMKV via `UserDataRepository` |
| `sync` | `isSyncing` overlay | Changelist sync in progress |
| `network` | `isOffline` | NetInfo connectivity |
| `deepLink` | `deepLinkedNewsId` | Notification / App Link target article |
| `navigation` | Tab unread dots | Derived from viewed IDs + feed |

Feature-local state (e.g. bookmarks selection) stays in `src/features/*/store/`.
