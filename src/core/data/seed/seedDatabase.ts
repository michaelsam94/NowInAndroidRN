import type {
  NewsRepository,
  Synchronizer,
  TopicsRepository,
  UserDataRepository,
} from '@core/domain';
import {onceObservable} from '@core/domain';

import type {LocalDataSource} from '../datasources/local/LocalDataSource';
import {resetSyncVersions} from '../sync/resetSyncVersions';

/** Default topics to follow on first launch (Headlines, UI, Compose). */
export const DEFAULT_FOLLOWED_TOPIC_IDS = ['1', '2', '3'] as const;

export async function seedDatabaseIfEmpty(
  local: LocalDataSource,
  topicsRepository: TopicsRepository,
  newsRepository: NewsRepository,
  synchronizer: Synchronizer,
  userDataRepository?: UserDataRepository,
): Promise<void> {
  if (!(await local.isEmpty())) {
    return;
  }

  await resetSyncVersions(synchronizer);
  await topicsRepository.syncWith(synchronizer);
  await newsRepository.syncWith(synchronizer);

  if (userDataRepository !== undefined) {
    const userData = await onceObservable(userDataRepository.userData);
    if (userData.followedTopics.size === 0) {
      await userDataRepository.setFollowedTopicIds(
        new Set(DEFAULT_FOLLOWED_TOPIC_IDS),
      );
    }
  }
}
