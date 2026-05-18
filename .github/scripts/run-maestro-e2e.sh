#!/usr/bin/env bash
# android-emulator-runner runs each script *line* in a fresh /bin/sh — use one bash entrypoint.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

cd "$ROOT/android"
./gradlew :app:assembleDebug :app:installDebug -PreactNativeArchitectures=x86_64 --no-daemon --build-cache

adb wait-for-device
adb shell pm list packages | grep -E 'nowinandroid'

curl -Ls "https://get.maestro.mobile.dev" | bash
export PATH="$PATH:$HOME/.maestro/bin"

cd "$ROOT"
maestro test e2e/flows --config e2e/config.yaml
