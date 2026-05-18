import {
  buildNewsDeepLinkUri,
  parseNewsDeepLink,
} from '../deepLink';

describe('deepLink', () => {
  it('builds https foryou uri', () => {
    expect(buildNewsDeepLinkUri('news-1')).toBe(
      'https://www.nowinandroid.apps.samples.google.com/foryou/news-1',
    );
  });

  it('parses https foryou path', () => {
    expect(
      parseNewsDeepLink(
        'https://www.nowinandroid.apps.samples.google.com/foryou/news-1',
      ),
    ).toBe('news-1');
  });

  it('parses custom scheme', () => {
    expect(parseNewsDeepLink('nowinandroid://foryou/news-2')).toBe('news-2');
  });

  it('returns null for unrelated urls', () => {
    expect(parseNewsDeepLink('https://example.com/')).toBeNull();
    expect(parseNewsDeepLink(null)).toBeNull();
  });
});
