export const BOOKMARK_NOTE_MAX_LENGTH = 280;

/**
 * Returns a stored bookmark note, or null when input is null, blank, or whitespace-only.
 * @throws Error when trimmed note exceeds BOOKMARK_NOTE_MAX_LENGTH
 */
export function normalizeBookmarkNote(note: string | null | undefined): string | null {
  const trimmed = note?.trim() ?? null;
  if (trimmed === null || trimmed.length === 0) {
    return null;
  }
  if (trimmed.length > BOOKMARK_NOTE_MAX_LENGTH) {
    throw new Error(
      `Bookmark notes must be at most ${BOOKMARK_NOTE_MAX_LENGTH} characters`,
    );
  }
  return trimmed;
}
