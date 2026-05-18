import type {UserDataRepository} from '../repositories/UserDataRepository';
import {normalizeBookmarkNote} from '../entities/BookmarkNote';

export async function completeBookmark(
  userDataRepository: UserDataRepository,
  newsResourceId: string,
  note: string | null,
): Promise<void> {
  await userDataRepository.setNewsResourceBookmarked(newsResourceId, true);
  const normalized = normalizeBookmarkNote(note);
  if (normalized !== null) {
    await userDataRepository.setBookmarkNote(newsResourceId, normalized);
  }
}

export async function removeBookmark(
  userDataRepository: UserDataRepository,
  newsResourceId: string,
): Promise<void> {
  await userDataRepository.setNewsResourceBookmarked(newsResourceId, false);
}
