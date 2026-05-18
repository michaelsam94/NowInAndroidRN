/** Formats ISO instant strings for card metadata (locale-aware medium date). */
export function formatPublishDate(publishDate: string): string {
  const date = new Date(publishDate);
  if (Number.isNaN(date.getTime())) {
    return publishDate;
  }
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
