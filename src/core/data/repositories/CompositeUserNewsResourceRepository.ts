import {
  emptyNewsResourceQuery,
  mapToUserNewsResources,
  type NewsResourceQuery,
  type UserNewsResource,
  type UserNewsResourceRepository,
} from '@core/domain';
import type {Observable} from '@core/domain';

import type {NewsRepository} from '@core/domain/repositories/NewsRepository';
import type {UserDataRepository} from '@core/domain/repositories/UserDataRepository';
import {
  combineObservable,
  distinctObservable,
  mapObservable,
  switchObservable,
} from '../util/observable';

const emptyUserNewsResourcesObservable: Observable<readonly UserNewsResource[]> =
  emit => {
    emit([]);
    return () => undefined;
  };

export class CompositeUserNewsResourceRepository
  implements UserNewsResourceRepository
{
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly userDataRepository: UserDataRepository,
  ) {}

  observeAll(query: NewsResourceQuery = emptyNewsResourceQuery) {
    return combineObservable(
      this.newsRepository.getNewsResources(query),
      this.userDataRepository.userData,
      (newsResources, userData) =>
        mapToUserNewsResources(newsResources, userData),
    );
  }

  observeAllForFollowedTopics() {
    return switchObservable(
      distinctObservable(
        mapObservable(this.userDataRepository.userData, userData => [
          ...userData.followedTopics,
        ]),
        (previous, next) =>
          previous.length === next.length &&
          previous.every((id, index) => id === next[index]),
      ),
      followedTopics => {
        if (followedTopics.length === 0) {
          return emptyUserNewsResourcesObservable;
        }
        return this.observeAll({
          filterTopicIds: new Set(followedTopics),
          filterNewsIds: null,
        });
      },
    );
  }

  observeAllBookmarked() {
    return switchObservable(
      distinctObservable(
        mapObservable(
          this.userDataRepository.userData,
          userData => [...userData.bookmarkedNewsResources],
        ),
        (previous, next) =>
          previous.length === next.length &&
          previous.every((id, index) => id === next[index]),
      ),
      bookmarkedIds => {
        if (bookmarkedIds.length === 0) {
          return emptyUserNewsResourcesObservable;
        }
        return this.observeAll({
          filterTopicIds: null,
          filterNewsIds: new Set(bookmarkedIds),
        });
      },
    );
  }
}
