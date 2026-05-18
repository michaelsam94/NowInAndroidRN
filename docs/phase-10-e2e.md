# Phase 10 — E2E (Maestro)

## Delivered

| Flow | File |
|------|------|
| Onboarding → feed | `e2e/flows/onboarding-feed.yaml` |
| Bookmark + note | `e2e/flows/bookmark-note.yaml` |
| Edit/delete note | `e2e/flows/edit-delete-note.yaml` |
| Bulk remove + undo | `e2e/flows/bulk-undo.yaml` |
| Search → bookmark | `e2e/flows/search-bookmark.yaml` |
| Deep link highlight | `e2e/flows/deeplink-highlight.yaml` |

Shared subflow: `e2e/flows/subflows/complete-onboarding.yaml`

## Test IDs added for Maestro

- `nav:search` — header search button
- `bookmarks:undo` — undo snackbar action

## Run locally

See `e2e/README.md`. Requires Maestro CLI + `npx expo run:android` dev build.

```bash
npm run e2e
```

## CI (Phase 11)

Maestro will run on emulator in GitHub Actions after lint/unit tests.
