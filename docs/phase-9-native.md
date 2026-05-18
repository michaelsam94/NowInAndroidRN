# Phase 9 — Native bridging

## Delivered

| Area | Implementation |
|------|----------------|
| Analytics | `NoOpAnalyticsHelper` (demo) / `StubAnalyticsHelper` (prod) |
| Deep links | `parseNewsDeepLink` + `expo-linking` bootstrap → Zustand `deepLinkedNewsId` |
| For You highlight | `NewsResourceCard` border when `deepLinkedNewsId` matches |
| In-app browser | `expo-web-browser` via `openNewsArticle` port |
| Share | `Share.share` via `shareNewsArticle` (Bookmarks) |
| Sync | `createAppSyncManager` — foreground + app-ready changelist sync, `isSyncing` |
| Offline | NetInfo `NetworkMonitor` → `isOffline` → `OfflineSnackbar` in `NiaAppShell` |
| Notifications | `NoOpNotifier` (demo); `requestNotificationPermission` on onboarding done |
| OSS licenses | `OssLicensesScreen` at `/licenses` |

## Architecture

- Infrastructure lives under `src/core/infrastructure/`; features receive ports via `default*Deps()`.
- `useInfrastructureBootstrap` runs from `AppProviders` after bootstrap.
- Deep link format: `https://www.nowinandroid.apps.samples.google.com/foryou/{newsId}` or `nowinandroid://foryou/{newsId}`.

## Tests

- `deepLink.test.ts`, `createAnalyticsHelper.test.ts`, `createAppSyncManager.test.ts`
- Existing feature hook/screen tests updated with infrastructure port fakes

## Deferred to Phase 10+

- `expo-background-fetch` (foreground `AppState` sync used instead)
- Firebase Analytics (prod uses Stub console logger)
- System tray notifications in prod flavor
- Maestro deep-link E2E flow
