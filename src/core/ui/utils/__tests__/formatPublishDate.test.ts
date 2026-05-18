import {formatPublishDate} from '../formatPublishDate';

describe('formatPublishDate', () => {
  it('formats valid ISO dates', () => {
    const formatted = formatPublishDate('2024-01-15T10:00:00Z');
    expect(formatted).toMatch(/2024/);
    expect(formatted).not.toBe('2024-01-15T10:00:00Z');
  });

  it('returns the original string for invalid input', () => {
    expect(formatPublishDate('not-a-date')).toBe('not-a-date');
  });
});
