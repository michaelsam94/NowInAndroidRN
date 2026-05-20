import type {
  NewsResourceQuery,
  UserNewsResource,
  UserNewsResourceRepository,
} from '@core/domain';

import {createReplayObservable} from '../utils/observable';

function filterUserNewsResources(
  resources: readonly UserNewsResource[],
  query?: NewsResourceQuery,
): readonly UserNewsResource[] {
  if (query === undefined) {
    return resources;
  }
  return resources.filter(resource => {
    if (
      query.filterNewsIds !== null &&
      !query.filterNewsIds.has(resource.id)
    ) {
      return false;
    }
    if (query.filterTopicIds !== null) {
      const matchesTopic = resource.followableTopics.some(item =>
        query.filterTopicIds!.has(item.topic.id),
      );
      if (!matchesTopic) {
        return false;
      }
    }
    return true;
  });
}

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

  observeAll(query?: NewsResourceQuery) {
    return (emit: (value: readonly UserNewsResource[]) => void) =>
      this.allSubject.observable(resources =>
        emit(filterUserNewsResources(resources, query)),
      );
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
