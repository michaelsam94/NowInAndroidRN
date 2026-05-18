import type {Synchronizer, TopicsRepository} from '@core/domain';

import type {LocalDataSource} from '../datasources/local/LocalDataSource';
import type {NiaNetworkDataSource} from '../datasources/network/NiaNetworkDataSource';
import {mapTopicDto} from '../models/mappers';
import {changeListSync} from '../sync/changeListSync';

export class OfflineFirstTopicsRepository implements TopicsRepository {
  constructor(
    private readonly local: LocalDataSource,
    private readonly network: NiaNetworkDataSource,
  ) {}

  getTopics() {
    return this.local.observeTopics();
  }

  getTopic(id: string) {
    return this.local.observeTopic(id);
  }

  async syncWith(synchronizer: Synchronizer): Promise<boolean> {
    return changeListSync(synchronizer, {
      versionReader: versions => versions.topicChangeListVersion,
      changeListFetcher: currentVersion =>
        this.network.getTopicChangeList(currentVersion),
      versionUpdater: (versions, latestVersion) => ({
        ...versions,
        topicChangeListVersion: latestVersion,
      }),
      modelDeleter: ids => this.local.deleteTopics(ids),
      modelUpdater: async ids => {
        const networkTopics = await this.network.getTopics(ids);
        await this.local.upsertTopics(networkTopics.map(mapTopicDto));
      },
    });
  }
}
