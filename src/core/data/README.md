# Data layer (Phase 5)

Implements domain repository interfaces.

| Subfolder | Responsibility |
|-----------|----------------|
| `datasources/` | WatermelonDB, MMKV, HTTP API, demo JSON assets |
| `models/` | DB models, API DTOs, mappers to domain entities |
| `repositories/` | `OfflineFirst*` implementations |

**Rules:** May import `@core/domain` only (not feature modules).
