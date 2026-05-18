# Infrastructure (Phase 9)

| Subfolder | Android mapping |
|-----------|-----------------|
| `analytics/` | `core/analytics` — `AnalyticsHelper`, Firebase vs NoOp |
| `sync/` | `sync/work` — background fetch, `isSyncing` |
| `notifications/` | `core/notifications` — `Notifier`, deep link URIs |
| `network/` | `ConnectivityManagerNetworkMonitor` — NetInfo wrapper |

Wiring into app root happens in Phase 4/9.
