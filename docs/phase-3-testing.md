# Phase 3 — TDD Test Harness

**Date:** 2026-05-18  
**Status:** Complete  
**Previous:** [phase-2-architecture.md](./phase-2-architecture.md)

---

## Deliverables

| Item | Location |
|------|----------|
| Jest + path aliases | `jest.config.js` |
| Global setup (MSW + matchers) | `test/setup.ts` |
| Observable test utilities | `test/utils/observable.ts` |
| Fake repositories | `test/fakes/TestUserDataRepository.ts`, `TestTopicsRepository.ts` |
| MMKV stand-in | `test/mmkv/InMemoryPreferencesStore.ts` |
| WatermelonDB Loki adapter | `test/watermelon/createTestDatabase.ts` |
| MSW prod API mocks | `test/msw/handlers.ts` |
| Conventions | [test/README.md](../test/README.md) |

---

## Test run summary

| Suite | Expected |
|-------|----------|
| `BookmarkNote.test.ts` | ✅ Green (domain implemented Phase 2) |
| `TestUserDataRepository.test.ts` | ✅ Green |
| `niaApiHandlers.test.ts` | ✅ Green |
| `createTestDatabase.test.ts` | ✅ Green |
| `InMemoryPreferencesStore.test.ts` | ✅ Green |
| `LoadingWheel.test.tsx` | ✅ Green (RNTL smoke) |
| `GetFollowableTopicsUseCase.test.ts` | 🔴 **RED** until Phase 6 |

Run: `npm test` (exit code **1** until Phase 6 — one intentional RED test)

---

## Phase 3 done criteria

- [x] `npm test` executes harness  
- [x] Fake repositories without `jest.mock` on domain  
- [x] MSW mirrors `/topics`, `/newsresources`, changelists  
- [x] WatermelonDB in-memory DB creates successfully  
- [x] One intentional RED use-case test documented  
- [x] RNTL configured with jest-native matchers  

**Next:** Phase 4 — Expo foundation, Router, theme, splash.
