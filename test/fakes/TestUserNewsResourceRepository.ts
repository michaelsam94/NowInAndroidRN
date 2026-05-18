import type {
  NewsResourceQuery,
  UserNewsResource,
  UserNewsResourceRepository,
} from '@core/domain';

import {createReplayObservable} from '../utils/observable';

export class TestUserNewsResourceRepository implements UserNewsResourceRepository {
  private readonly allSubject = createReplayObservable<readonly UserNewsResource[]>(
    [],
  );
  private readonly followedSubject = createReplayObservable<
    readonly UserNewsResource[]
  >([]);
  private readonly bookmarkedSubject = createReplayObservable<
    readonly UserNewsResource[]
  >([]);

  observeAll(_query?: NewsResourceQuery) {
    return this.allSubject.observable;
  }

  observeAllForFollowedTopics() {
    return this.followedSubject.observable;
  }

  observeAllBookmarked() {
    return this.bookmarkedSubject.observable;
  }

  setAll(resources: readonly UserNewsResource[]): void {
    this.allSubject.emit(resources);
  }

  setFollowed(resources: readonly UserNewsResource[]): void {
    this.followedSubject.emit(resources);
  }

  setBookmarked(resources: readonly UserNewsResource[]): void {
    this.bookmarkedSubject.emit(resources);
  }
}
