# Infrastructure (Phase 9)

| Subfolder | Android mapping |
|-----------|-----------------|
| `analytics/` | `AnalyticsHelper` — NoOp (demo) / Stub (prod) |
| `sync/` | `SyncManager` — changelist sync + `isSyncing` in Zustand |
| `notifications/` | `Notifier` (NoOp demo), deep link URIs, permission request |
| `network/` | NetInfo `NetworkMonitor` → offline snackbar |
| `browser/` | `expo-web-browser` article open |
| `share/` | React Native `Share` API |
| `bootstrap/` | Deep links, foreground sync, network subscription |

Wired from `AppProviders` via `useInfrastructureBootstrap` and `defaultFeatureDeps`.
