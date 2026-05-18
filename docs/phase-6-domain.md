# Phase 6 — Domain layer (TDD)

## Delivered

| Task | Status |
|------|--------|
| 6.1 `normalizeBookmarkNote` + tests | ✅ (Phase 3) |
| 6.2 `GetUserNewsResourcesUseCase` | ✅ |
| 6.3 `GetFollowableTopicsUseCase` | ✅ (+ `TopicSortField.None` test) |
| 6.4 `GetSearchContentsUseCase` | ✅ + `mapToUserSearchResult` |
| 6.5 `GetRecentSearchQueriesUseCase` | ✅ |
| 6.6 ViewModel hook contracts | ✅ `*ViewModelDeps` per feature |

## Use case factories

| Factory | File |
|---------|------|
| `createGetFollowableTopicsUseCase` | `usecases/implementations/createGetFollowableTopicsUseCase.ts` |
| `createGetUserNewsResourcesUseCase` | `usecases/implementations/createGetUserNewsResourcesUseCase.ts` |
| `createGetSearchContentsUseCase` | `usecases/implementations/createGetSearchContentsUseCase.ts` |
| `createGetRecentSearchQueriesUseCase` | `usecases/implementations/createGetRecentSearchQueriesUseCase.ts` |

App wiring: `src/core/infrastructure/domain/createAppUseCases.ts` (`appUseCases`).

## ViewModel dependencies (Phase 8)

Each `src/features/*/types.ts` exports `*ViewModelDeps` listing use cases and repositories the hook will receive. Hooks should default to `appUseCases` + `appRepositories` from infrastructure.

## Next (Phase 7)

Shared UI components with RNTL coverage (`NewsResourceCard`, bookmark dialogs, etc.).
