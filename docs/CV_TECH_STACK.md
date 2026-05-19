# Now in Android RN — Tech stack for CV (condensed)

Reference document listing **tools, libraries, platforms, and skills** used in this project. Copy sections into a resume, LinkedIn, or portfolio as needed.

**Detailed version (architecture, data flow, interview prep):** [CV_ARCHITECTURE_AND_TECH_STACK.md](./CV_ARCHITECTURE_AND_TECH_STACK.md)

**Project:** React Native port of Google’s [Now in Android](https://github.com/android/nowinandroid) sample (Kotlin/Compose reference app).  
**Repo:** [github.com/michaelsam94/NowInAndroidRN](https://github.com/michaelsam94/NowInAndroidRN)

---

## One-line summary (CV headline / project title)

**Now in Android (React Native)** — Expo app with clean architecture, offline-first data, Maestro E2E, and GitHub Actions + EAS CI/CD.

---

## Suggested CV bullets (pick 2–4)

- Built a **React Native / Expo** client mirroring Now in Android using **TypeScript**, **Clean Architecture**, and **TDD** (Jest, React Native Testing Library, Maestro).
- Implemented **offline-first** bookmarks and feed sync with **MMKV**, change-list sync, and demo/prod **build flavors** via EAS.
- Delivered **Material Design 3** UI with **NativeWind**, **FlashList**, and feature modules (For You, Bookmarks, Search, Interests, Settings).
- Set up **CI/CD**: GitHub Actions (lint, unit tests, Gradle APK, KVM Android emulator + Maestro), **EAS Build** for cloud APKs.

---

## Languages

| Language | Usage |
|----------|--------|
| **TypeScript** | App, domain, data, tests (strict) |
| **JavaScript** | Config (Babel, Jest, Metro, ESLint) |
| **Kotlin** | Android native shell (Gradle, `MainActivity`, prebuild output) |
| **YAML** | Maestro E2E flows, GitHub Actions |
| **Shell (Bash)** | CI scripts (e.g. Maestro on emulator) |
| **JSON** | Demo fixtures, Expo/EAS config |

*Reference (source app, not this repo):* Kotlin, Jetpack Compose, Room, Hilt — see conversion plan.

---

## Mobile & framework

| Technology | Version / notes |
|------------|-----------------|
| **React Native** | 0.81.x |
| **React** | 19.x |
| **Expo SDK** | ~54 (managed workflow + dev client / `expo prebuild`) |
| **Expo Router** | v6 — file-based navigation (`app/`) |
| **New Architecture** | Enabled (`newArchEnabled` in app config) |
| **Android** | Gradle 9.x, Kotlin 2.x, debug/release APK, adaptive icons |
| **iOS** | Xcode project via prebuild, CocoaPods |

---

## Architecture & patterns

- **Clean Architecture** — `core/domain`, `core/data`, `core/ui`, `core/infrastructure`, `features/*`
- **UDF / MVVM-style** — ViewModels (hooks) + `UiState` per feature screen
- **Repository pattern** — domain interfaces, offline-first implementations
- **Use cases** — explicit domain operations (e.g. get bookmarked news, search)
- **Constructor injection** — factory registry in `createAppRepositories` / `createAppInfrastructure` (Hilt-style, manual)
- **Reactive data** — custom `Observable` + `useObservable` (Kotlin Flow–like)
- **Change-list sync** — versioned sync with MMKV-backed changelist metadata
- **Build flavors** — `demo` vs `prod` via `EXPO_PUBLIC_FLAVOR` + EAS profiles
- **Feature modules** — public `index.ts` exports, ESLint layer boundaries

---

## Libraries & SDKs (production)

### UI & navigation

| Library | Purpose |
|---------|---------|
| **expo-router** | Tabs, stacks, deep links, typed routes |
| **@react-navigation/native** | Navigation primitives (via Expo) |
| **nativewind** v4 | Tailwind-style styling on RN |
| **tailwindcss** | Design tokens / utility classes |
| **@shopify/flash-list** | High-performance lists |
| **react-native-reanimated** | Animations |
| **react-native-gesture-handler** | Gestures |
| **react-native-safe-area-context** | Safe areas |
| **react-native-screens** | Native screen containers |
| **@expo/vector-icons** | Material-style icons |

### State & data

| Library | Purpose |
|---------|---------|
| **zustand** | Global slices (theme, sync, network, deep link, navigation) |
| **@tanstack/react-query** v5 | Server/async state (where used) |
| **react-native-mmkv** | Fast key-value persistence (prefs, cache, sync versions) |

### Expo modules

| Module | Purpose |
|--------|---------|
| **expo-constants** | App config / env |
| **expo-font** | Fonts |
| **expo-linking** | Deep links |
| **expo-notifications** | Push / local notifications |
| **expo-splash-screen** | Splash |
| **expo-status-bar** / **expo-system-ui** | System UI |
| **expo-web-browser** | In-app browser for articles |

### Networking & offline

| Approach | Purpose |
|----------|---------|
| **Demo JSON assets** | Bundled `assets/demo/` for offline demo |
| **REST API** (configurable) | `EXPO_PUBLIC_API_BASE` + `NiaApiDataSource` for prod |
| **@react-native-community/netinfo** | Connectivity / offline UX |

---

## Testing

| Tool | Purpose |
|------|---------|
| **Jest** | Unit & integration tests |
| **jest-expo** | Expo-aware Jest preset |
| **@testing-library/react-native** | Component & hook tests |
| **@testing-library/jest-native** | DOM-style matchers |
| **react-test-renderer** | Render trees in tests |
| **MSW** (Mock Service Worker) | HTTP mocking in tests |
| **Maestro** | E2E YAML flows (onboarding, bookmarks, search, deep links) |
| **@nozbe/watermelondb** + **lokijs** | Test DB adapter (LokiJS); planned for production SQLite/FTS per architecture |
| **In-memory fakes** | `test/fakes/*` repositories & observables |

**Practices:** TDD, `__tests__` colocation, CI coverage reports, `testID` for E2E.

---

## DevOps, CI/CD & tooling

| Tool | Purpose |
|------|---------|
| **GitHub Actions** | Lint, typecheck, Jest, Gradle `assembleDebug`, Maestro on emulator |
| **EAS (Expo Application Services)** | Cloud Android builds (`demo` / `prod` profiles) |
| **Gradle** | Native Android builds after `expo prebuild` |
| **android-emulator-runner** | Hardware-accelerated emulator on Ubuntu + KVM |
| **Node.js** | ≥ 22 (CI & local) |
| **npm** | Package manager |
| **ESLint** | Lint (`@react-native/eslint-config`) |
| **Prettier** | Formatting |
| **TypeScript** | `tsc --noEmit` in CI |
| **Babel** | `babel-preset-expo`, module resolver aliases (`@core`, `@features`) |
| **Metro** | RN bundler |

---

## Project structure (skills: organization)

```
app/                 # Expo Router routes
src/core/domain/     # Entities, repositories, use cases
src/core/data/       # Datasources, mappers, repo implementations, sync
src/core/ui/         # Shared components, theme, strings
src/core/infrastructure/  # DI wiring, sync manager, analytics, notifications
src/features/        # foryou, bookmarks, search, interests, topic, settings
src/store/           # Zustand global slices
e2e/flows/           # Maestro YAML
test/                # Fakes, MSW, setup, Watermelon test DB
.github/workflows/   # CI
```

---

## Skills keywords (ATS / LinkedIn)

Copy as a comma-separated block or pick subsets:

**Mobile:** React Native, Expo, Expo Router, Android, iOS, mobile development, cross-platform  

**Languages:** TypeScript, JavaScript, Kotlin (Android shell)  

**Architecture:** Clean Architecture, MVVM, repository pattern, offline-first, domain-driven design, dependency injection  

**State & data:** Zustand, TanStack Query, MMKV, SQLite (WatermelonDB — test/planned), REST API, JSON  

**UI:** NativeWind, Tailwind CSS, Material Design 3, FlashList, React Native Reanimated, responsive layout  

**Testing:** Jest, React Native Testing Library, TDD, Maestro, E2E testing, MSW, unit testing, test coverage  

**DevOps:** GitHub Actions, CI/CD, EAS Build, Gradle, Android emulator, KVM  

**Other:** Deep linking, push notifications, NetInfo, accessibility, monorepo-style modules, Git  

---

## Features implemented (domain skills)

- Onboarding & topic follow (For You)
- Personalized feed & news cards
- Bookmarks with notes, multi-select, bulk remove, undo
- Search & recent queries
- Interests / topics
- Topic detail screen
- Settings & OSS licenses
- Deep links (`nowinandroid://`, HTTPS App Links)
- Dark/light theme (MMKV-backed)
- Offline snackbar & demo seed data
- Analytics abstraction (stub / no-op for demo)

---

## Environment & config

| Variable / file | Role |
|-----------------|------|
| `EXPO_PUBLIC_FLAVOR` | `demo` \| `prod` |
| `EXPO_PUBLIC_API_BASE` | Optional API URL (prod) |
| `EAS_PROJECT_ID` | Expo project (CI secret) |
| `EXPO_TOKEN` | EAS CLI auth (CI secret) |
| `app.config.ts` | Dynamic Expo config (package id, owner, plugins) |
| `eas.json` | Build profiles |

---

## Documentation in repo

| Doc | Topic |
|-----|--------|
| `docs/CONVERSION_PLAN.md` | Full migration plan from Android |
| `docs/phase-1-audit.md` … `phase-11-cicd.md` | Phase deliverables |
| `docs/RELEASE_CHECKLIST.md` | Release & EAS checklist |
| `e2e/README.md` | Maestro local runs |

---

## Optional: reference Android stack (converted from)

Use if you want to show **migration** experience on your CV:

- **Kotlin**, **Jetpack Compose**, **Navigation Compose**
- **Room**, **DataStore (Proto)**, **Hilt**, **Retrofit**, **WorkManager**
- **Firebase** / FCM, **Gradle** product flavors (`demo` / `prod`)

---

*Last updated from `package.json` and project docs — May 2026.*
