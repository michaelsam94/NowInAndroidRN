# Now in Android → React Native — Conversion Plan

**Reference (Kotlin / Compose):** `../llm-android-test-michaelsam94`  
**Target (React Native):** `NowInAndroid RN` (this repo)  
**Remote:** [github.com/michaelsam94/NowInAndroidRN](https://github.com/michaelsam94/NowInAndroidRN)

**Method:** TDD-first (Red → Green → Refactor) · Clean Architecture · Phase-by-phase with explicit sign-off

---

## Tech stack (target)

| Area | Choice |
|------|--------|
| Setup | Expo managed workflow (SDK 51+) + dev client for native modules |
| Language | TypeScript (strict, no `any`) |
| Navigation | Expo Router v3 (file-based) |
| State | Zustand (one slice per feature) |
| Server data | TanStack Query v5 |
| Persistence | MMKV (user prefs) + WatermelonDB (news/topics/FTS) |
| Styling | NativeWind v4 + MD3 design tokens |
| Lists | FlashList (masonry where needed) |
| Testing | Jest + RNTL + Maestro E2E |

**Current baseline:** Bare React Native CLI 0.85.3 — migrated to Expo in **Phase 4**.

---

## Cross-cutting decisions

| Topic | Android source | RN target |
|-------|------------------|-----------|
| DI | Hilt | Factory registry + constructor injection in `core/infrastructure` |
| Structured DB | Room + FTS5 | WatermelonDB + SQLite FTS |
| User prefs | Proto DataStore | MMKV (JSON map for `bookmark_notes`) |
| Sync | WorkManager `SyncWorker` | `expo-background-fetch` + cold-start sync |
| Notifications | FCM + `SystemTrayNotifier` (prod) | `expo-notifications` |
| Deep links | App Links `https://www.nowinandroid.apps.samples.google.com/...` | Expo Router + Android intent filters |
| Flavors | `demo` / `prod` | EAS profiles + `EXPO_PUBLIC_FLAVOR` |

---

## Phase overview

| Phase | Goal | Deliverable | Status |
|-------|------|-------------|--------|
| **1** | Feature audit & mapping | `docs/phase-1-audit.md` | ✅ |
| **2** | Clean architecture & folders | `docs/phase-2-architecture.md` + scaffold | ✅ |
| **3** | TDD test harness | Jest/RNTL/MSW/WatermelonDB test setup | ✅ |
| **4** | Foundation & tooling | Expo, Router, NativeWind, theme, splash | ✅ |
| **5** | Data layer (TDD) | WatermelonDB, MMKV, repositories | ⬜ |
| **6** | Domain layer (TDD) | Entities, use cases, contracts | ⬜ |
| **7** | Shared UI (TDD) | Cards, dialogs, snackbar, etc. | ⬜ |
| **8** | Feature screens (TDD) | For You → Bookmarks → … → Settings | ⬜ |
| **9** | Native bridging | Push, deep links, sync, NetInfo, Share | ⬜ |
| **10** | E2E (Maestro) | `e2e/flows/*.yaml` | ⬜ |
| **11** | CI/CD & flavors | GitHub Actions + EAS demo/prod | ⬜ |

**Rule:** Complete each phase’s done-criteria before starting the next. User says **`continue`** to proceed after Phase 1 review.

---

## Phase 1 — Feature audit & mapping

| # | Sub-task |
|---|----------|
| 1.1 | Inventory NavKey destinations, tabs, stack, modal |
| 1.2 | Map screen composables → Expo Router routes |
| 1.3 | Document UDF per feature (UiState → ViewModel → repo) |
| 1.4 | List domain entities & repository interfaces |
| 1.5 | Map Room/FTS/DataStore → WatermelonDB/MMKV |
| 1.6 | Map Retrofit vs demo assets |
| 1.7 | Map sync, notifications, deep links, analytics, NetInfo |
| 1.8 | Document fork deltas (bookmark notes, multi-select, undo) |
| 1.9 | Feature → file mapping table |
| 1.10 | Native API gap matrix |

| Risks | Mitigation |
|-------|------------|
| Fork vs upstream NIA drift | `llm-android-test-michaelsam94/README.md` + `BookmarksViewModel` as truth |
| FTS parity | Spike in Phase 5; document schema in Phase 1 |

| Done criteria |
|---------------|
| `docs/phase-1-audit.md` complete; features 1–21 traced to Android files |

---

## Phase 2 — Clean architecture & folder structure

| # | Sub-task |
|---|----------|
| 2.1 | `src/core/{domain,data,ui,infrastructure}` + `src/features/*` |
| 2.2 | Domain entities mirroring `core/model` |
| 2.3 | Repository interfaces in `core/domain/repositories` |
| 2.4 | Use-case contracts in `core/domain/usecases` |
| 2.5 | Per-feature `index.ts` public API |
| 2.6 | Dependency rules + ESLint `import/no-restricted-paths` |
| 2.7 | Expo Router tree: `(tabs)`, `search`, `topic/[id]`, settings modal |
| 2.8 | Zustand root composition plan |

| Done criteria |
|---------------|
| `docs/phase-2-architecture.md`; empty scaffold; lint rules drafted |

---

## Phase 3 — TDD test harness

| # | Sub-task |
|---|----------|
| 3.1 | Jest + path aliases (`@core`, `@features`) |
| 3.2 | RNTL + jest-native matchers |
| 3.3 | MSW for prod API shapes |
| 3.4 | WatermelonDB in-memory test DB |
| 3.5 | MMKV test double |
| 3.6 | Fake repositories (no `jest.mock` on domain/data) |
| 3.7 | Conventions: `__tests__/*.test.ts(x)`, `e2e/flows/*.yaml` |
| 3.8 | One failing repo + use-case test proving harness |

| Done criteria |
|---------------|
| `npm test` runs; example RED tests documented |

---

## Phase 4 — Foundation & tooling

| # | Sub-task |
|---|----------|
| 4.1 | Expo migration decision (prebuild vs new app) |
| 4.2 | Install stack (Router, NativeWind, Zustand, Query, MMKV, WatermelonDB, FlashList, NetInfo, expo modules) |
| 4.3 | MD3 tokens + ThemeProvider |
| 4.4 | QueryClient + optional MMKV persister |
| 4.5 | Tab shell + rail (≥600dp) + two-pane (≥840dp) |
| 4.6 | Splash until theme + initial data ready |
| 4.7 | Edge-to-edge + safe areas |
| 4.8 | Strict ESLint/TS |

| Done criteria |
|---------------|
| App boots to placeholder tabs; theme toggle works |

---

## Phase 5 — Data layer (TDD)

| # | Sub-task |
|---|----------|
| 5.1 | WatermelonDB schema + FTS |
| 5.2 | MMKV `UserPreferencesDataSource` |
| 5.3 | `NiaApiDataSource` + `DemoAssetDataSource` |
| 5.4 | All repository implementations |
| 5.5 | Sync write path + FTS populate |
| 5.6 | Demo seed on first launch |
| 5.7 | Repository unit tests (RED first) |

| Done criteria |
|---------------|
| All repo tests green; demo loads feed offline |

---

## Phase 6 — Domain layer (TDD)

| # | Sub-task |
|---|----------|
| 6.1 | `normalizeBookmarkNote` + tests |
| 6.2 | `GetUserNewsResourcesUseCase` |
| 6.3 | `GetFollowableTopicsUseCase` |
| 6.4 | `GetSearchContentsUseCase` |
| 6.5 | `GetRecentSearchQueriesUseCase` |
| 6.6 | ViewModel/hook contracts |

| Done criteria |
|---------------|
| Domain tests green; zero React imports in `core/domain` |

---

## Phase 7 — Shared UI components (TDD)

| # | Component |
|---|-----------|
| 7.1 | `NewsResourceCard` |
| 7.2 | `BookmarkedNewsResourceCard` |
| 7.3 | `BookmarkNoteDialog` / `BookmarkNoteEditorDialog` |
| 7.4 | `TopicChip` |
| 7.5 | `LoadingWheel`, `EmptyState`, `OfflineSnackbar` |
| 7.6 | `NiaDraggableScrollbar` (simplified) |
| 7.7 | RNTL tests for all states |

| Done criteria |
|---------------|
| Shared component tests green; a11y on interactives |

---

## Phase 8 — Feature screens (TDD, sequential)

| Order | Feature | Android ViewModel |
|-------|---------|-------------------|
| 8.1 | For You | `ForYouViewModel` |
| 8.2 | Bookmarks | `BookmarksViewModel` |
| 8.3 | Interests | `InterestsViewModel` |
| 8.4 | Search | `SearchViewModel` |
| 8.5 | Topic | `TopicViewModel` |
| 8.6 | Settings | `SettingsViewModel` |
| 8.7 | Nav shell | `NiaAppState`, `MainActivityViewModel` |

Per feature: **RED** hook test → **GREEN** hook → **RED** screen test → **GREEN** screen → **REFACTOR**

| Done criteria |
|---------------|
| Parity with Android `*ViewModelTest` scenarios per feature |

---

## Phase 9 — Native bridging

| # | Area |
|---|------|
| 9.1 | `expo-notifications` / NoOp demo |
| 9.2 | Deep linking + For You highlight |
| 9.3 | `expo-web-browser` + mark viewed |
| 9.4 | `expo-background-fetch` + `isSyncing` |
| 9.5 | NetInfo → offline snackbar |
| 9.6 | Share API (long-press title) |
| 9.7 | POST_NOTIFICATIONS on For You |
| 9.8 | OSS licenses screen |
| 9.9 | `AnalyticsHelper` Firebase + NoOp |

| Done criteria |
|---------------|
| Deep link + offline snackbar verified on device |

---

## Phase 10 — E2E (Maestro)

| Flow | File |
|------|------|
| Onboarding → feed | `e2e/flows/onboarding-feed.yaml` |
| Bookmark + note | `e2e/flows/bookmark-note.yaml` |
| Edit/delete note | `e2e/flows/edit-delete-note.yaml` |
| Bulk remove + undo | `e2e/flows/bulk-undo.yaml` |
| Search → bookmark | `e2e/flows/search-bookmark.yaml` |
| Deep link highlight | `e2e/flows/deeplink-highlight.yaml` |

| Done criteria |
|---------------|
| All flows pass on demo profile / emulator |

---

## Phase 11 — CI/CD & build flavors

| # | Sub-task |
|---|----------|
| 11.1 | EAS `demo` vs `prod` profiles |
| 11.2 | GitHub Actions: lint → test → Maestro → EAS |
| 11.3 | `app.config.ts` per flavor |
| 11.4 | Demo package id suffix `.demo` parity |
| 11.5 | Release checklist |

| Done criteria |
|---------------|
| Green CI; installable demo build from EAS |

---

## Clean architecture layout (target)

```
src/
  core/
    domain/entities|repositories|usecases
    data/datasources|repositories|models
    ui/components|theme
    infrastructure/analytics|sync|notifications|network
  features/
    foryou|bookmarks|interests|search|topic|settings/
      components|hooks|screens|store|types.ts|index.ts
app/                    # Expo Router routes only
e2e/flows/              # Maestro YAML
docs/                   # Phase artifacts
```

**Rules:** Domain has zero RN imports; use cases depend on interfaces only; screens are thin; no `jest.mock` on domain/data (fake repos instead).

---

## Features checklist (parity)

1. For You — feed, onboarding, bookmark dialog, unread, overlay loading, deep link, notification permission  
2. Bookmarks — grid, notes, multi-select, bulk remove/undo, drag-to-share  
3. Interests — follow/unfollow, scrollbar, list-detail adaptive  
4. Search — FTS, recent searches, topic + news results  
5. Topic detail — hero, follow, news list  
6. Settings — theme brand, dynamic color, dark mode, links, OSS  
7. Navigation shell — tabs/rail, unread dots, splash gate  
8. Shared news card  
9. BookmarkNoteDialog (280 chars)  
10. Offline snackbar  
11. Background sync  
12. Theming (MD3)  
13. Analytics  
14. Adaptive layout  
15. Push notifications  
16. Deep linking  
17. In-app browser  
18. Share sheet  
19. Notification permission  
20. Network monitoring  
21. OSS licenses  

Details and Android file traces: **`docs/phase-1-audit.md`**.

---

## Implementation step output format

For each coding step after Phase 1:

1. Step title + phase  
2. TDD cycle: RED / GREEN / REFACTOR  
3. Full test file(s) first  
4. Full implementation file(s)  
5. Paths relative to project root  
6. 3–5 bullet rationale  
7. Follow-up steps unlocked  

No truncated files (`// ...`).

---

## References

- Android app README: `../llm-android-test-michaelsam94/README.md`
- Phase 1 audit: `docs/phase-1-audit.md`
- Google NIA: [developer.android.com/jetpack/compose](https://developer.android.com/jetpack/compose)
