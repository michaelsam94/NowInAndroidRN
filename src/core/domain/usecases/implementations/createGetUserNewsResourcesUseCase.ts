import {emptyNewsResourceQuery} from '../../repositories/NewsResourceQuery';
import type {UserNewsResourceRepository} from '../../repositories/UserNewsResourceRepository';
import type {GetUserNewsResourcesUseCase} from '../GetUserNewsResourcesUseCase';

export function createGetUserNewsResourcesUseCase(
  userNewsResourceRepository: UserNewsResourceRepository,
): GetUserNewsResourcesUseCase {
  return {
    invoke: query =>
      userNewsResourceRepository.observeAll(query ?? emptyNewsResourceQuery),

    observeForFollowedTopics: () =>
      userNewsResourceRepository.observeAllForFollowedTopics(),

    observeBookmarked: () => userNewsResourceRepository.observeAllBookmarked(),
  };
}
