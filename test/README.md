# Testing conventions

## File locations

| Type | Pattern | Example |
|------|---------|---------|
| Unit | `src/**/__tests__/*.test.ts(x)` | `BookmarkNote.test.ts` |
| Shared fakes | `test/fakes/` | `TestUserDataRepository.ts` |
| MSW | `test/msw/` | `handlers.ts`, `server.ts` |
| WatermelonDB | `test/watermelon/` | `createTestDatabase.ts` |
| MMKV stand-in | `test/mmkv/` | `InMemoryPreferencesStore.ts` |
| E2E (Phase 10) | `e2e/flows/*.yaml` | Maestro scripts |

## Commands

```bash
npm test              # all Jest tests
npm run test:watch    # watch mode
npm run test:ci       # CI with coverage
```

## TDD rules

1. **Red → Green → Refactor** for every unit of production code.
2. **No `jest.mock()`** on `@core/domain` or repository modules — use fakes in `test/fakes/`.
3. Domain tests must not import React or React Native.
4. MSW handlers mirror Android `RetrofitNiaNetwork` endpoints (`NetworkResponse<T>` wrapper).

## RED tests (intentional failures)

`GetFollowableTopicsUseCase.test.ts` fails until Phase 6 implements `createGetFollowableTopicsUseCase`.

## Setup

Global setup: `test/setup.ts` (jest-native matchers + MSW server lifecycle).
