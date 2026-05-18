#!/usr/bin/env bash
# android-emulator-runner runs each script *line* in a fresh /bin/sh — use one bash entrypoint.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
export EXPO_PUBLIC_FLAVOR=demo
export MAESTRO_CLI_NO_ANALYTICS=1

cd "$ROOT/android"
./gradlew :app:assembleDebug :app:installDebug -PreactNativeArchitectures=x86_64 --no-daemon --build-cache

adb wait-for-device
if ! adb shell pm list packages | grep -q 'com.nowinandroidrn.demo'; then
  echo "::error::Expected demo package com.nowinandroidrn.demo after prebuild; found:"
  adb shell pm list packages | grep nowinandroid || true
  exit 1
fi

curl -Ls "https://get.maestro.mobile.dev" | bash
export PATH="$PATH:$HOME/.maestro/bin"

cd "$ROOT"
maestro test e2e/flows --config e2e/config.yaml
