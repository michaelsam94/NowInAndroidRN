import type {SearchContentsRepository, SearchResult} from '@core/domain';

import {createReplayObservable} from '../utils/observable';

export class TestSearchContentsRepository implements SearchContentsRepository {
  private readonly resultsByQuery = new Map<
    string,
    ReturnType<typeof createReplayObservable<SearchResult>>
  >();
  private readonly countSubject = createReplayObservable<number>(0);

  searchContents(searchQuery: string) {
    const normalized = searchQuery.trim().toLowerCase();
    let subject = this.resultsByQuery.get(normalized);
    if (subject === undefined) {
      subject = createReplayObservable<SearchResult>({
        topics: [],
        newsResources: [],
      });
      this.resultsByQuery.set(normalized, subject);
    }
    return subject.observable;
  }

  getSearchContentsCount() {
    return this.countSubject.observable;
  }

  async populateFtsData(): Promise<void> {
    return undefined;
  }

  setSearchResult(searchQuery: string, result: SearchResult): void {
    const normalized = searchQuery.trim().toLowerCase();
    let subject = this.resultsByQuery.get(normalized);
    if (subject === undefined) {
      subject = createReplayObservable<SearchResult>(result);
      this.resultsByQuery.set(normalized, subject);
    } else {
      subject.emit(result);
    }
  }

  setSearchContentsCount(count: number): void {
    this.countSubject.emit(count);
  }
}
