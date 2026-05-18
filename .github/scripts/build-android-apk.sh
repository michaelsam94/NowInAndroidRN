#!/usr/bin/env bash
# Build a demo-flavor Android APK after expo prebuild. Usage: build-android-apk.sh [debug|release]
set -euo pipefail

BUILD_TYPE="${1:-release}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

case "$BUILD_TYPE" in
  debug) GRADLE_TASK=":app:assembleDebug" ;;
  release) GRADLE_TASK=":app:assembleRelease" ;;
  *)
    echo "Usage: $0 [debug|release]" >&2
    exit 1
    ;;
esac

export EXPO_PUBLIC_FLAVOR=demo

cd "$ROOT"
npx expo prebuild --platform android --no-install
find android/app/src/main/res/mipmap-* -type f \( -name 'ic_launcher.png' -o -name 'ic_launcher_round.png' \) -delete

if [ -n "${RELEASE_VERSION_NAME:-}" ]; then
  sed -i "s/versionName \"[^\"]*\"/versionName \"${RELEASE_VERSION_NAME}\"/" android/app/build.gradle
fi

cd android
./gradlew "$GRADLE_TASK" --no-daemon --build-cache

case "$BUILD_TYPE" in
  debug) APK_PATH="app/build/outputs/apk/debug/app-debug.apk" ;;
  release) APK_PATH="app/build/outputs/apk/release/app-release.apk" ;;
esac

if [ ! -f "$APK_PATH" ]; then
  echo "::error::APK not found at android/${APK_PATH}" >&2
  exit 1
fi

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "apk_path=android/${APK_PATH}" >> "$GITHUB_OUTPUT"
fi
