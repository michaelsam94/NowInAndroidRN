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
2. **e2e-maestro** — demo prebuild → Gradle debug APK → Maestro flows
3. **eas-demo-build** — `eas build --profile demo` on `main` push (requires `EXPO_TOKEN`)

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
| `EXPO_TOKEN` | EAS build job on `main` |

Create at [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens) and add to GitHub repo secrets.
