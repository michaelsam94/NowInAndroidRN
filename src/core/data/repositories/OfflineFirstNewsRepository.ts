import {
  emptyNewsResourceQuery,
  type NewsRepository,
  type NewsResourceQuery,
  type Synchronizer,
} from '@core/domain';

import type {LocalDataSource} from '../datasources/local/LocalDataSource';
import type {UserPreferencesDataSource} from '../datasources/mmkv/UserPreferencesDataSource';
import type {NiaNetworkDataSource} from '../datasources/network/NiaNetworkDataSource';
import {mapNewsResourceDto} from '../models/mappers';
import {filterNewsResources} from '../util/newsResourceQuery';
import {mapObservable} from '../util/observable';
import {snapshotObservable} from '../util/snapshotObservable';
import {changeListSync} from '../sync/changeListSync';

export class OfflineFirstNewsRepository implements NewsRepository {
  constructor(
    private readonly preferences: UserPreferencesDataSource,
    private readonly local: LocalDataSource,
    private readonly network: NiaNetworkDataSource,
  ) {}

  getNewsResources(query: NewsResourceQuery = emptyNewsResourceQuery) {
    return mapObservable(this.local.observeNewsResources(), newsResources =>
      filterNewsResources(newsResources, query),
    );
  }

  async syncWith(synchronizer: Synchronizer): Promise<boolean> {
    let isFirstSync = false;

    return changeListSync(synchronizer, {
      versionReader: versions => versions.newsResourceChangeListVersion,
      changeListFetcher: currentVersion => {
        isFirstSync = currentVersion < 0;
        return this.network.getNewsResourceChangeList(currentVersion);
      },
      versionUpdater: (versions, latestVersion) => ({
        ...versions,
        newsResourceChangeListVersion: latestVersion,
      }),
      modelDeleter: ids => this.local.deleteNewsResources(ids),
      modelUpdater: async ids => {
        const topics = await snapshotObservable(this.local.observeTopics());
        const topicsById = new Map(topics.map(topic => [topic.id, topic]));
        const networkNews = await this.network.getNewsResources(ids);
        const newsResources = networkNews.map(dto =>
          mapNewsResourceDto(dto, topicsById),
        );

        if (isFirstSync) {
          await this.preferences.setNewsResourcesViewed(ids, true);
        }

        await this.local.upsertNewsResources(newsResources);
      },
    });
  }
}
