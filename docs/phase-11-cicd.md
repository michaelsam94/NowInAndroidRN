# Phase 11 — CI/CD & build flavors

## Delivered

| Item | Location |
|------|----------|
| Demo / prod flavors | `app.config.ts` + `EXPO_PUBLIC_FLAVOR` |
| Demo package suffix | `com.nowinandroidrn.demo` (Android parity with NIA `.demo`) |
| EAS profiles | `eas.json` — `development`, `demo`, `prod` |
| GitHub Actions | `.github/workflows/ci.yml` |
| Env templates | `.env.demo`, `.env.prod.example` |
| Release checklist | `docs/RELEASE_CHECKLIST.md` |
| Network by flavor | `createAppRepositories` — demo assets vs `NiaApiDataSource` |

## CI pipeline

1. **lint-and-test** — `npm ci`, `lint`, `typecheck`, `test:ci`
2. **android-demo-assemble** — demo prebuild → Gradle `assembleDebug` on Ubuntu (no emulator)
3. **e2e-maestro** — Ubuntu + KVM + x86_64 emulator → install **release** APK (embedded JS bundle + `EXPO_PUBLIC_E2E=1`) → Maestro flows
4. **eas-demo-build** — `eas build --profile demo` on `main` push (requires `EXPO_TOKEN` in repo secrets; GitHub forbids `secrets` in `if` conditionals)

## Local commands

```bash
npm run typecheck
npm run build:demo    # EAS demo APK
npm run build:prod    # EAS prod
npm run prebuild:demo # Native project with demo package id
```

## Secrets

| Secret | Used for |
|--------|----------|
| `EXPO_TOKEN` | EAS CLI authentication on `main` |
| `EAS_PROJECT_ID` | Expo project UUID (`extra.eas.projectId`) for non-interactive builds |

1. Create an access token at [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens) → GitHub secret **`EXPO_TOKEN`**.
2. Locally run `eas login` then `eas init` in this repo → copy the **project ID** (UUID) into GitHub secret **`EAS_PROJECT_ID`**.

`app.config.ts` sets `owner` and reads `process.env.EAS_PROJECT_ID` for `extra.eas.projectId`; CI passes the secret into `eas build` only (no `eas init` — dynamic config cannot be auto-written in CI).
