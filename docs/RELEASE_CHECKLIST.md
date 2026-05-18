# Release checklist

Use this before shipping a **demo** or **prod** build via EAS.

## Prerequisites

- [ ] [EAS CLI](https://docs.expo.dev/build/setup/) installed (`npm i -g eas-cli`)
- [ ] Logged in: `eas login`
- [ ] Project linked: `eas init` (sets `EAS_PROJECT_ID` in Expo dashboard)
- [ ] GitHub `EXPO_TOKEN` secret configured for CI EAS job (optional)

## Demo APK (internal / QA)

```bash
cp .env.demo .env   # or export EXPO_PUBLIC_FLAVOR=demo
eas build --profile demo --platform android
```

- [ ] Package id is `com.nowinandroidrn.demo`
- [ ] App title shows **Now in Android (Demo)**
- [ ] Feed loads offline from bundled demo JSON
- [ ] `npm run e2e` passes on emulator with demo build installed

## Production

```bash
cp .env.prod.example .env
# Edit EXPO_PUBLIC_API_BASE to your API host
eas build --profile prod --platform android
```

- [ ] Package id is `com.nowinandroidrn`
- [ ] API sync works against staging/production backend
- [ ] Push notifications configured (replace `NoOpNotifier` when ready)
- [ ] Analytics points to Firebase (replace `StubAnalyticsHelper`)

## CI verification

- [ ] `lint-and-test` job green on PR
- [ ] `e2e-maestro` job green (or investigated flake)
- [ ] `eas-demo-build` triggered on `main` when `EXPO_TOKEN` is set

## Version bump

- [ ] Update `version` in `app.config.ts`
- [ ] Tag release in git if distributing outside EAS
