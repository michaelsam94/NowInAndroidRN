#!/usr/bin/env bash
# android-emulator-runner runs each script *line* in a fresh /bin/sh — use one bash entrypoint.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
export EXPO_PUBLIC_FLAVOR=demo
export EXPO_PUBLIC_E2E=1
export NODE_ENV=production
export MAESTRO_CLI_NO_ANALYTICS=1

cd "$ROOT"

# Bundle-time env for Gradle (release embeds JS; debug expects Metro).
cat > .env <<'EOF'
EXPO_PUBLIC_FLAVOR=demo
EXPO_PUBLIC_E2E=1
EOF

cd android
# Avoid stale release bundles built without EXPO_PUBLIC_E2E / demo e2e flags.
rm -rf app/build/generated/assets/createBundleReleaseJsAndAssets 2>/dev/null || true
./gradlew :app:assembleRelease :app:installRelease -PreactNativeArchitectures=x86_64 --no-daemon --build-cache

APK="app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK" ]; then
  E2E_FLAG="$(unzip -p "$APK" assets/app.config 2>/dev/null | sed -n 's/.*"e2e":\([^,}]*\).*/\1/p' | head -1 || true)"
  echo "Embedded app.config e2e=${E2E_FLAG:-unknown}"
fi

adb wait-for-device
adb shell 'while [[ -z "$(getprop sys.boot_completed)" ]]; do sleep 1; done' 2>/dev/null || true
adb shell input keyevent 82 >/dev/null 2>&1 || true

if ! adb shell pm list packages | grep -q 'com.nowinandroidrn.demo'; then
  echo "::error::Expected demo package com.nowinandroidrn.demo after prebuild; found:"
  adb shell pm list packages | grep nowinandroid || true
  exit 1
fi

# Warm launch so the first Maestro flow is not paying cold-start on a slow emulator.
adb shell am force-stop com.nowinandroidrn.demo >/dev/null 2>&1 || true
adb shell monkey -p com.nowinandroidrn.demo -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1 || true
sleep 8
adb shell am force-stop com.nowinandroidrn.demo >/dev/null 2>&1 || true

curl -Ls "https://get.maestro.mobile.dev" | bash
export PATH="$PATH:$HOME/.maestro/bin"

cd "$ROOT"
FLOWS=(
  onboarding-feed
  bookmark-note
  edit-delete-note
  bulk-undo
  search-bookmark
  deeplink-highlight
)

FAILED=0
for flow in "${FLOWS[@]}"; do
  echo "=== Maestro: ${flow} ==="
  if ! maestro test "e2e/flows/${flow}.yaml" --config e2e/config.yaml; then
    FAILED=1
    echo "::error::Maestro flow failed: ${flow} — logcat tail:"
    adb logcat -d -t 400 2>/dev/null | tail -n 200 || true
    break
  fi
done

if [ "$FAILED" -ne 0 ]; then
  exit 1
fi
