# E2E tests (Maestro)

End-to-end flows for the demo build (`com.nowinandroidrn`). Mirrors Android instrumented scenarios from Phase 10 of `docs/CONVERSION_PLAN.md`.

## Prerequisites

1. [Maestro CLI](https://maestro.mobile.dev/getting-started/installing-maestro) installed (`curl -Ls https://get.maestro.mobile.dev | bash`)
2. Android emulator or device with a **development build** installed (not Expo Go):

```bash
npm install --legacy-peer-deps
npx expo run:android
```

3. App id must match `e2e/config.yaml` (`com.nowinandroidrn.demo` for demo builds).

## Run all flows

```bash
maestro test e2e/flows --config e2e/config.yaml
```

## Run a single flow

```bash
maestro test e2e/flows/onboarding-feed.yaml --config e2e/config.yaml
```

## Flows

| File | Scenario |
|------|----------|
| `onboarding-feed.yaml` | Fresh install → follow topic → feed visible |
| `bookmark-note.yaml` | Bookmark with note → appears on Saved |
| `edit-delete-note.yaml` | Edit bookmark note → delete note |
| `bulk-undo.yaml` | Multi-select remove → undo restores |
| `search-bookmark.yaml` | Search → bookmark result → Saved tab |
| `deeplink-highlight.yaml` | App link opens For You with article visible |

Shared setup lives in `e2e/subflows/` (not under `flows/` so Maestro does not run them as top-level tests).

## Tips

- Flows use `launchApp.clearState: true` for a clean MMKV/onboarding state.
- Shared setup: `e2e/subflows/wait-for-foryou-feed.yaml` waits for bootstrap, skips onboarding, and scrolls to `newsResourceCard:1` (do not tap `topicTag:1` during onboarding — bootstrap may already follow that topic).
- If taps miss, rerun on a cold emulator or increase `timeout` values.
- Deep links require the dev build with intent filters from `app.config.ts`.
- Maestro `deeplink-highlight` uses `nowinandroid://foryou/{id}` (not the HTTPS App Links host). Notification/production URIs still use `https://www.nowinandroid.apps.samples.google.com/foryou/...`.
- CI builds the **demo** package (`com.nowinandroidrn.demo`); run `EXPO_PUBLIC_FLAVOR=demo npx expo prebuild` before local `expo run:android` for Maestro.
