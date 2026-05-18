import type {NewsRepository, Synchronizer, TopicsRepository} from '@core/domain';

import type {LocalDataSource} from '../datasources/local/LocalDataSource';

export async function seedDatabaseIfEmpty(
  local: LocalDataSource,
  topicsRepository: TopicsRepository,
  newsRepository: NewsRepository,
  synchronizer: Synchronizer,
): Promise<void> {
  if (await local.isEmpty()) {
    await topicsRepository.syncWith(synchronizer);
    await newsRepository.syncWith(synchronizer);
  }
}
