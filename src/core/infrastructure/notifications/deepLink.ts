/** Mirrors Android `DEEP_LINK_*` in `SystemTrayNotifier.kt`. */
export const DEEP_LINK_NEWS_RESOURCE_ID_KEY = 'linkedNewsResourceId';

export const DEEP_LINK_SCHEME_AND_HOST =
  'https://www.nowinandroid.apps.samples.google.com';

export const DEEP_LINK_FOR_YOU_PATH = 'foryou';

export const DEEP_LINK_BASE_PATH = `${DEEP_LINK_SCHEME_AND_HOST}/${DEEP_LINK_FOR_YOU_PATH}`;

export function buildNewsDeepLinkUri(newsResourceId: string): string {
  return `${DEEP_LINK_BASE_PATH}/${newsResourceId}`;
}

/**
 * Extracts a news resource id from an NIA For You deep link (https or app scheme).
 */
export function parseNewsDeepLink(url: string | null | undefined): string | null {
  if (url === null || url === undefined || url.length === 0) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const path = parsed.pathname.replace(/^\/+/, '');
  const segments = path.split('/').filter(Boolean);

  if (segments.length >= 2 && segments[0] === DEEP_LINK_FOR_YOU_PATH) {
    return segments[1] ?? null;
  }

  if (segments.length === 1 && parsed.host === DEEP_LINK_FOR_YOU_PATH) {
    return segments[0] ?? null;
  }

  return null;
}
