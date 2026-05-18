# Source layout

Clean Architecture scaffold for Now in Android (React Native).

| Path | Phase | Description |
|------|-------|-------------|
| `core/domain` | 2 ✅ | Entities, repository interfaces, use cases |
| `core/data` | 5 | WatermelonDB, MMKV, API |
| `core/ui` | 7 | Shared components + theme |
| `core/infrastructure` | 9 | Analytics, sync, notifications |
| `features/*` | 8 | Feature modules (hooks + screens) |
| `store` | 4 | Global Zustand slices |

See [docs/phase-2-architecture.md](../docs/phase-2-architecture.md).
