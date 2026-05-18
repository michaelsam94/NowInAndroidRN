# Domain layer

**Rules**

- No imports from `react`, `react-native`, `expo`, `src/core/data`, or `src/features`.
- Entities are plain TypeScript types; use cases depend on repository **interfaces** only.
- `normalizeBookmarkNote` and `mapToUserNewsResource` are pure domain functions.

**Android mapping:** `core/model`, `core/domain`, repository interfaces in `core/data/repository`.
