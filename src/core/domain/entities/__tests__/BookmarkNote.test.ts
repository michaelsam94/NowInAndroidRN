import {
  BOOKMARK_NOTE_MAX_LENGTH,
  normalizeBookmarkNote,
} from '../BookmarkNote';

describe('normalizeBookmarkNote', () => {
  it('returns null for null, empty, or whitespace-only input', () => {
    expect(normalizeBookmarkNote(null)).toBeNull();
    expect(normalizeBookmarkNote(undefined)).toBeNull();
    expect(normalizeBookmarkNote('')).toBeNull();
    expect(normalizeBookmarkNote('   ')).toBeNull();
  });

  it('trims surrounding whitespace', () => {
    expect(normalizeBookmarkNote('  Hello  ')).toBe('Hello');
  });

  it('throws when trimmed note exceeds max length', () => {
    const tooLong = 'a'.repeat(BOOKMARK_NOTE_MAX_LENGTH + 1);
    expect(() => normalizeBookmarkNote(tooLong)).toThrow(
      `Bookmark notes must be at most ${BOOKMARK_NOTE_MAX_LENGTH} characters`,
    );
  });

  it('accepts a note at exactly max length', () => {
    const maxNote = 'a'.repeat(BOOKMARK_NOTE_MAX_LENGTH);
    expect(normalizeBookmarkNote(maxNote)).toBe(maxNote);
  });
});
