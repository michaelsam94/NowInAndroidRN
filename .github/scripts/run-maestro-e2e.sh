#!/usr/bin/env bash
# android-emulator-runner runs each script *line* in a fresh /bin/sh — use one bash entrypoint.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
export EXPO_PUBLIC_FLAVOR=demo
export EXPO_PUBLIC_E2E=1
export MAESTRO_CLI_NO_ANALYTICS=1

cd "$ROOT/android"
# Debug APKs skip embedding the JS bundle (Metro expected). Release embeds the bundle for headless CI.
./gradlew :app:assembleRelease :app:installRelease -PreactNativeArchitectures=x86_64 --no-daemon --build-cache

adb wait-for-device
adb shell 'while [[ -z "$(getprop sys.boot_completed)" ]]; do sleep 1; done' 2>/dev/null || true
adb shell input keyevent 82 >/dev/null 2>&1 || true

if ! adb shell pm list packages | grep -q 'com.nowinandroidrn.demo'; then
  echo "::error::Expected demo package com.nowinandroidrn.demo after prebuild; found:"
  adb shell pm list packages | grep nowinandroid || true
  exit 1
fi

curl -Ls "https://get.maestro.mobile.dev" | bash
export PATH="$PATH:$HOME/.maestro/bin"

cd "$ROOT"
if ! maestro test e2e/flows --config e2e/config.yaml; then
  echo "::error::Maestro E2E failed — last logcat lines:"
  adb logcat -d -t 400 2>/dev/null | tail -n 200 || true
  exit 1
fi
