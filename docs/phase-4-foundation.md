# Phase 4 — Foundation & Tooling

**Date:** 2026-05-18  
**Status:** Complete  
**SDK:** Expo ~54 · React Native 0.81.5 · Expo Router ~6

---

## Migration decision (4.1)

| Before | After |
|--------|-------|
| Bare RN CLI 0.85.3 | **Expo SDK 54** + `expo-router/entry` |
| `react-native run-android` | `expo run:android` |
| `App.tsx` entry | `app/` file-based routes |

RN **0.85** is not yet supported by `install-expo-modules`; aligned to **0.81.5** (Expo 54 template) for stable Expo Router + native modules.

Run `npm run prebuild` after pulling if native folders drift.

---

## Installed stack (4.2)

| Package | Purpose |
|---------|---------|
| `expo-router` | File-based navigation |
| `nativewind` + `tailwindcss` | MD3-styled utility classes |
| `zustand` + `react-native-mmkv` | Global state + persistence |
| `@tanstack/react-query` | Server/async data (Phase 5+) |
| `@shopify/flash-list` | Performant lists (Phase 7+) |
| `@react-native-community/netinfo` | Offline monitoring (Phase 9) |
| `expo-splash-screen` | Splash gate |
| `expo-web-browser` | In-app browser (Phase 9) |

---

## Architecture added

| Path | Role |
|------|------|
| `app/_layout.tsx` | Providers, splash, root stack |
| `app/(tabs)/*` | For You, Saved, Interests |
| `app/search.tsx`, `app/topic/[id].tsx`, `app/settings.tsx` | Stack/modal routes |
| `src/core/ui/theme/tokens.ts` | MD3 color tokens |
| `src/core/ui/theme/ThemeContext.tsx` | Theme provider |
| `src/core/ui/providers/AppProviders.tsx` | Query + SafeArea + theme |
| `src/store/index.ts` | Zustand (theme, sync, unread) |
| `src/core/infrastructure/query/queryClient.ts` | TanStack Query defaults |

---

## Adaptive layout (4.5)

- `useAdaptiveLayout()` — `width >= 600` → navigation rail (`tabBarPosition: 'left'`)
- `width >= 840` → two-pane hint on Interests placeholder

---

## Splash (4.6)

`SplashScreen.preventAutoHideAsync()` until `AppProviders` sets `isAppReady` (~300ms stub; Phase 5 wires real data).

---

## Run commands

```bash
npm install
npx expo start
npm run android   # requires android/local.properties
```

---

## Done criteria

- [x] App boots to three tabs with placeholders  
- [x] Settings: theme brand + dark mode + dynamic color toggle  
- [x] MMKV-backed Zustand persist for theme prefs  
- [x] TanStack Query client at root  

**Next:** Phase 5 — data layer (TDD).
