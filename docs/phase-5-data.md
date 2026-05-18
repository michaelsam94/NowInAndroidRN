# Phase 5 — Data layer (TDD)

## Delivered

- **Local store:** `InMemoryLocalDataSource` (WatermelonDB + FTS deferred; same repository contracts)
- **User prefs:** `UserPreferencesDataSource` on MMKV-shaped `KeyValueStorage` (bookmark notes map, follow state, theme)
- **Network:** `DemoAssetDataSource` (bundled `assets/demo/*.json`) and `NiaApiDataSource` (prod-shaped REST)
- **Sync:** `changeListSync` + `MmkvSynchronizer` mirroring Android changelist flow
- **Repositories:** offline-first topics/news, composite user news, search, recent searches
- **Seed:** `seedDatabaseIfEmpty` on cold start via `bootstrapAppData()` in `AppProviders`
- **Tests:** repository + datasource unit tests (demo JSON); `GetFollowableTopicsUseCase` implemented (Phase 6 contract, enabled once repos exist)

## Key paths

| Piece | Path |
|-------|------|
| Public API | `src/core/data/index.ts` |
| App wiring | `src/core/infrastructure/data/createAppRepositories.ts` |
| Replay streams | `src/core/data/util/replayObservable.ts` |
| Demo assets | `assets/demo/topics.json`, `assets/demo/news.json` |

## Next (Phase 6)

- Remaining use cases (`GetUserNewsResourcesUseCase`, search/recent query use cases)
- ViewModel hook contracts per feature
- Optional: migrate `InMemoryLocalDataSource` → WatermelonDB + FTS5
