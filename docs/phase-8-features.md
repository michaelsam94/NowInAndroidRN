# Phase 8 — Feature screens (TDD)

## Delivered

| Feature | Hook | Screen | Route |
|---------|------|--------|-------|
| For You | `useForYouViewModel` | `ForYouScreen` | `app/(tabs)/foryou.tsx` |
| Bookmarks | `useBookmarksViewModel` | `BookmarksScreen` | `app/(tabs)/bookmarks.tsx` |
| Interests | `useInterestsViewModel` | `InterestsScreen` | `app/(tabs)/interests.tsx` |
| Search | `useSearchViewModel` | `SearchScreen` | `app/search.tsx` |
| Topic | `useTopicViewModel` | `TopicScreen` | `app/topic/[id].tsx` |
| Settings | `useSettingsViewModel` | `SettingsScreen` | `app/settings.tsx` |
| Nav shell | — | `NiaAppShell` | `app/(tabs)/_layout.tsx` |

## Architecture

- **Hooks** subscribe to domain `Observable` streams via `useObservable`.
- **Screens** are presentational; they receive a `viewModel` prop.
- **Routes** (`app/`) compose `default*Deps()` from `@core/infrastructure/features/defaultFeatureDeps` and wire hooks → screens (composition root).
- Bookmark note flows use `completeBookmark` / `removeBookmark` domain helpers.

## Tests

- `useForYouViewModel.test.ts` — onboarding, empty feed, bookmark + note
- `useBookmarksViewModel.test.ts` — selection mode
- `ForYouScreen.test.tsx` — onboarding and empty UI

## Deferred to Phase 9

- `expo-web-browser` article open, Share API, NetInfo offline snackbar, deep links, notifications, background sync driving `isSyncing`
